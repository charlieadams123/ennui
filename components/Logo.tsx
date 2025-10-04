import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <span className={`font-serif tracking-[0.2em] uppercase ${className}`}>
      ENNUI
    </span>
  );
};
