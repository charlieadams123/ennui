
import React, { useState } from 'react';

interface CreateArticleModalProps {
  onClose: () => void;
  onSubmit: (prompt: string) => void;
}

export const CreateArticleModal: React.FC<CreateArticleModalProps> = ({ onClose, onSubmit }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt.trim());
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div 
        className="bg-brand-light p-8 rounded-lg shadow-xl w-full max-w-lg relative mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <h2 className="font-serif text-2xl mb-4">Generate a New Article</h2>
        <p className="text-brand-gray mb-6">Enter a topic or a brief idea, and our AI will craft a unique fashion article for ENNUI.</p>

        <form onSubmit={handleSubmit}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., The resurgence of 90s minimalism in streetwear..."
            className="w-full h-32 p-3 border border-brand-border bg-transparent focus:outline-none focus:ring-1 focus:ring-brand-dark transition resize-none"
            required
          />
          <button 
            type="submit"
            className="w-full mt-4 px-6 py-3 text-sm font-medium bg-transparent border border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-brand-light transition-colors duration-300 disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-200"
            disabled={!prompt.trim()}
          >
            Create Article
          </button>
        </form>
      </div>
    </div>
  );
};