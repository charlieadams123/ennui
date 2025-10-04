import React from 'react';
import type { Article } from '../types';
import { ArticleCard } from '../components/ArticleCard';

interface HomePageProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ articles, onSelectArticle }) => {
  const heroArticle = articles[0];
  const otherArticles = articles.slice(1);

  return (
    <div className="space-y-16">
      {heroArticle && (
        <section 
          className="group cursor-pointer"
          onClick={() => onSelectArticle(heroArticle)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="overflow-hidden">
              <img 
                src={heroArticle.imageUrl} 
                alt={heroArticle.title}
                className="w-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500 ease-in-out" 
              />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="font-serif text-3xl md:text-5xl font-medium leading-tight mb-4 group-hover:text-brand-gray transition-colors tracking-wide">
                {heroArticle.title}
              </h1>
              <p className="text-brand-gray text-base md:text-lg mb-4">
                {heroArticle.excerpt}
              </p>
              <p className="text-sm text-brand-gray">{heroArticle.author} &middot; {heroArticle.date}</p>
            </div>
          </div>
        </section>
      )}

      {otherArticles.length > 0 && (
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherArticles.map((article) => (
              <ArticleCard 
                key={article.id} 
                article={article} 
                onClick={() => onSelectArticle(article)} 
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};