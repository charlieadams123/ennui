
import React, { useState, useCallback } from 'react';
import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import type { Article } from './types';
import { MOCK_ARTICLES } from './constants';
import { CreateArticleModal } from './components/CreateArticleModal';
import { generateArticleContent, generateArticleImage } from './services/geminiService';
import { LoadingSpinner } from './components/LoadingSpinner';

type View = {
  name: 'home';
} | {
  name: 'article';
  article: Article;
};

const App: React.FC = () => {
  const [view, setView] = useState<View>({ name: 'home' });
  const [articles, setArticles] = useState<Article[]>(MOCK_ARTICLES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const handleSelectArticle = useCallback((article: Article) => {
    window.scrollTo(0, 0);
    setView({ name: 'article', article });
  }, []);

  const handleGoHome = useCallback(() => {
    window.scrollTo(0, 0);
    setView({ name: 'home' });
  }, []);

  const handleCreateArticle = async (prompt: string) => {
    setIsModalOpen(false);
    setIsLoading(true);
    try {
      setLoadingMessage('Crafting the narrative...');
      const { title, content, imagePrompt } = await generateArticleContent(prompt);
      
      setLoadingMessage('Generating visual inspiration...');
      const image = await generateArticleImage(imagePrompt);
      
      const newArticle: Article = {
        id: `art-${Date.now()}`,
        title,
        author: 'Gemini AI',
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        imageUrl: image,
        content,
        excerpt: content.split('\n\n')[0]
      };
      
      setArticles(prev => [newArticle, ...prev]);
      handleGoHome();
    } catch (error) {
      console.error("Failed to create article:", error);
      alert("There was an error generating the article. Please check the console for details.");
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  const renderView = () => {
    switch (view.name) {
      case 'article':
        return <ArticlePage article={view.article} />;
      case 'home':
      default:
        return <HomePage articles={articles} onSelectArticle={handleSelectArticle} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-brand-dark bg-brand-light">
      <Header onGoHome={handleGoHome} onCreateArticle={() => setIsModalOpen(true)} />
      <main className="flex-grow container mx-auto px-4 md:px-8 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-96">
            <LoadingSpinner />
            <p className="mt-4 text-lg text-brand-gray">{loadingMessage}</p>
          </div>
        ) : (
          renderView()
        )}
      </main>
      <Footer onGoHome={handleGoHome} />
      {isModalOpen && (
        <CreateArticleModal 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleCreateArticle} 
        />
      )}
    </div>
  );
};

export default App;