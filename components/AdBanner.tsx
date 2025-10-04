
import React from 'react';

export const AdBanner: React.FC = () => {
  return (
    <div className="border border-dashed border-gray-300 p-4 text-center text-brand-gray">
      <a href="#" className="block group">
        <div className="overflow-hidden">
            <img 
                src="https://picsum.photos/seed/ad1/900/200" 
                alt="Advertisement"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
        </div>
        <p className="text-xs uppercase tracking-widest mt-4">Advertisement</p>
        <h4 className="font-serif text-lg text-brand-dark mt-1 group-hover:underline">Discover the new collection from [Brand Name]</h4>
      </a>
    </div>
  );
};
