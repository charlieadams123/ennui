import React from 'react';
import type { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => {
  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="overflow-hidden mb-4">
        <img 
          src={article.imageUrl} 
          alt={article.title}
          className="w-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />
      </div>
      <h2 className="font-serif text-xl font-medium mb-2 group-hover:text-brand-gray transition-colors tracking-wide">
        {article.title}
      </h2>
      <p className="text-sm text-brand-gray">{article.author} &middot; {article.date}</p>
    </div>
  );
};