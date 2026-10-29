import React, { useState } from 'react';

interface LogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  size = 'md',
  className = '',
  showTagline = false
}) => {
  const [imgError, setImgError] = useState(false);
  const isLight = variant === 'light'; // Light text for dark backgrounds (footer)
  
  // User provided new logo image
  const logoUrl = 'https://i.imgur.com/w917zu6.png';

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-base tracking-[0.16em]',
    md: 'text-xl tracking-[0.18em]',
    lg: 'text-2xl tracking-[0.2em]'
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Brand Logo Symbol */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        {!imgError ? (
          <img
            src={logoUrl}
            alt="Mister Focus Logo Emblem"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-contain drop-shadow-xs transition-opacity duration-300"
          />
        ) : (
          /* Geometric Gold Skyscraper Architectural Symbol Fallback */
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-sm"
          >
            <path
              d="M14 42V18L24 8L34 18V42H28V24H20V42H14Z"
              fill="url(#logoGoldGrad)"
            />
            <path
              d="M24 6V18M24 18L20 22M24 18L28 22"
              stroke="#D4A017"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M8 42V26L14 20V42H8Z"
              fill="#B8860B"
              fillOpacity="0.85"
            />
            <path
              d="M34 42V20L40 26V42H34Z"
              fill="#C99818"
              fillOpacity="0.9"
            />
            <line x1="22" y1="28" x2="26" y2="28" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="22" y1="33" x2="26" y2="33" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="22" y1="38" x2="26" y2="38" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="6" y="42" width="36" height="2" rx="1" fill="#D4A017" />
            <defs>
              <linearGradient id="logoGoldGrad" x1="14" y1="8" x2="34" y2="42" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F7D46D" />
                <stop offset="0.4" stopColor="#D4A017" />
                <stop offset="1" stopColor="#A87B11" />
              </linearGradient>
            </defs>
          </svg>
        )}
      </div>

      {/* Typography Lockup */}
      <div className="flex flex-col">
        <span
          className={`font-semibold font-serif uppercase ${textSizes[size]} leading-none ${
            isLight ? 'text-white' : 'text-[#171717]'
          }`}
        >
          <span className="text-[#D4A017]">MISTER</span>{' '}
          <span className={isLight ? 'text-neutral-100' : 'text-[#171717]'}>FOCUS</span>
        </span>
        {showTagline && (
          <span className="text-[10px] tracking-[0.24em] uppercase text-[#D4A017] font-medium mt-1">
            Real Estate &amp; Construction
          </span>
        )}
      </div>
    </div>
  );
};
