import React from 'react';
import type { Article } from '../types';
import { AdBanner } from '../components/AdBanner';
import { NewsletterSignup } from '../components/NewsletterSignup';
import { RelatedArticles } from '../components/RelatedArticles';
import { marked } from 'marked';

interface ArticlePageProps {
  article: Article;
  allArticles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({ article, allArticles, onSelectArticle }) => {
  const parsedContent = marked.parse(article.content);

  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8 md:mb-12 text-center">
        <h1 className="font-serif text-4xl md:text-6xl font-medium leading-tight mb-4 tracking-wide">
          {article.title}
        </h1>
        <p className="text-brand-gray">
          By {article.author} &middot; {article.date}
        </p>
      </header>

      <div className="mb-8 md:mb-12">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-auto object-cover aspect-[16/9]" 
        />
      </div>

      <div 
        className="prose prose-lg lg:prose-xl max-w-none mx-auto text-brand-dark space-y-6"
        dangerouslySetInnerHTML={{ __html: parsedContent }}
      />
      
      <div className="my-12">
        <AdBanner />
      </div>

      <div className="my-12">
        <NewsletterSignup />
      </div>

      <div className="my-12">
        <RelatedArticles 
          currentArticleId={article.id}
          allArticles={allArticles}
          onSelectArticle={onSelectArticle}
        />
      </div>

    </article>
  );
};