import React from 'react';

const WeatherProLogo = (props: any) => (
  <svg
    width="200"
    height="60"
    viewBox="0 0 300 60"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <defs>
      <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#00dc72', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#009e42', stopOpacity: 1 }} />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="none" />
    
    {/* Sun icon */}
    <circle cx="35" cy="30" r="15" fill="#FFD700" filter="url(#glow)" />
    <circle cx="35" cy="30" r="10" fill="#FFA500" />
    
    {/* Cloud icon */}
    <path d="M70 35 Q80 25 90 35 Q100 20 110 35 Q120 30 125 35 Q130 25 140 35 L140 45 L70 45 Z" fill="#F0F0F0" stroke="#CCCCCC" strokeWidth="1" />
    
    <text
      x="75"
      y="40"
      fontFamily="Arial, Helvetica, sans-serif"
      fontSize="34"
      fill="url(#textGradient)"
      fontWeight="bold"
      letterSpacing="1"
      filter="url(#glow)"
    >
      Weather
    </text>
    <text
      x="225"
      y="40"
      fontFamily="Arial, Helvetica, sans-serif"
      fontSize="28"
      fill="url(#textGradient)"
      fontWeight="bold"
      letterSpacing="1"
      filter="url(#glow)"
    >
      Pro
    </text>
    
    {/* Raindrop */}
    <path d="M275 25 Q280 15 285 25 L282 35 Q280 37 278 35 Z" fill="#4FC3F7" />
  </svg>
);

export default WeatherProLogo;