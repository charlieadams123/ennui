
import React from 'react';
import { Logo } from './Logo';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-brand-gray hover:text-brand-dark transition-colors"
        aria-label={`Visit us on ${href.split('.')[1]}`}
    >
        {children}
    </a>
);

interface FooterProps {
    onGoHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onGoHome }) => {
  return (
    <footer className="border-t border-brand-border bg-brand-light mt-16">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col items-center text-center space-y-6">
          <div>
            <div 
              onClick={onGoHome} 
              className="cursor-pointer inline-block"
              aria-label="Go to homepage"
            >
              <Logo className="text-2xl" />
            </div>
            <p className="text-sm text-brand-gray mt-2">The Future of Fashion Journalism.</p>
          </div>
          <div className="flex space-x-6">
            <SocialIcon href="https://www.instagram.com">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </SocialIcon>
             <SocialIcon href="https://www.youtube.com">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a1.62 1.62 0 0 0-1.16-1.16C19.92 4.5 12 4.5 12 4.5s-7.92 0-9.38.76a1.62 1.62 0 0 0-1.16 1.16C.7 7.88 0 12 0 12s.7 4.12 1.46 5.58a1.62 1.62 0 0 0 1.16 1.16c1.46.76 9.38.76 9.38.76s7.92 0 9.38-.76a1.62 1.62 0 0 0 1.16-1.16c.76-1.46 1.46-5.58 1.46-5.58s-.7-4.12-1.46-5.58z"></path><polygon points="9.5 15.5 15.5 12 9.5 8.5 9.5 15.5"></polygon></svg>
            </SocialIcon>
             <SocialIcon href="https://www.facebook.com">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </SocialIcon>
          </div>
          <p className="text-sm text-brand-gray">&copy; {new Date().getFullYear()} ENNUI Media. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
