import React from 'react';
import { Logo } from './Logo';

interface HeaderProps {
    onGoHome: () => void;
    onCreateArticle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onGoHome, onCreateArticle }) => {
  return (
    <header className="bg-brand-light/80 backdrop-blur-sm sticky top-0 z-50 border-b border-brand-border">
      <div className="container mx-auto px-4 md:px-8">
        <div className="relative flex justify-center items-center py-4">
          <div 
            className="cursor-pointer"
            onClick={onGoHome}
            aria-label="Go to homepage"
          >
            <Logo className="text-3xl" />
          </div>
          <nav className="absolute right-0 top-1/2 -translate-y-1/2">
            <button 
              onClick={onCreateArticle}
              className="px-4 py-2 text-sm font-medium border border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-brand-light transition-colors duration-300"
            >
              Generate Article
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
