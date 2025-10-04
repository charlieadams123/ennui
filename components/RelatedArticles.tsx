import React from 'react';
import type { Article } from '../types';
import { ArticleCard } from './ArticleCard';

interface RelatedArticlesProps {
    currentArticleId: string;
    allArticles: Article[];
    onSelectArticle: (article: Article) => void;
}

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({ currentArticleId, allArticles, onSelectArticle }) => {
    const related = allArticles
        .filter(article => article.id !== currentArticleId)
        .slice(0, 3);

    if (related.length === 0) {
        return null;
    }

    return (
        <section>
            <h2 className="text-center font-serif text-3xl mb-8">Read More</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {related.map(article => (
                    <ArticleCard 
                        key={article.id}
                        article={article}
                        onClick={() => onSelectArticle(article)}
                    />
                ))}
            </div>
        </section>
    );
};