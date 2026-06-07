import React from 'react';

export const CinemaCameraIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="200"
    height="200"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="camBody" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2a2e39" />
        <stop offset="100%" stopColor="#15181e" />
      </linearGradient>
      <linearGradient id="lensGrad" x1="50" y1="50" x2="150" y2="150" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ff0055" stopOpacity="0.9" />
        <stop offset="50%" stopColor="#7700ff" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#00d2ff" stopOpacity="0.9" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* Tripod Plate / Mount */}
    <path d="M75 145 L125 145 L115 155 L85 155 Z" fill="#3a3f4d" stroke="#15181e" strokeWidth="1.5" />
    
    {/* Camera Body */}
    <rect x="50" y="70" width="90" height="75" rx="16" fill="url(#camBody)" stroke="#3a3f4d" strokeWidth="2" />
    
    {/* Lens Base Connection */}
    <rect x="130" y="82" width="15" height="50" rx="4" fill="#3a3f4d" />
    
    {/* Lens Tube (Red Dragon Style) */}
    <path d="M145 87 L175 82 L175 132 L145 127 Z" fill="url(#lensGrad)" stroke="#535c70" strokeWidth="2" />
    <ellipse cx="175" cy="107" rx="5" ry="25" fill="#0c0c0c" stroke="#ff0055" strokeWidth="1.5" />
    
    {/* Matte Box / Lens Hood */}
    <path d="M175 82 L195 67 L195 147 L175 132 Z" fill="#181a20" stroke="#3a3f4d" strokeWidth="1.5" />
    
    {/* Top Handle */}
    <path d="M65 70 L65 48 L125 48 L125 65 L110 65 L110 56 L80 56 L80 70 Z" fill="#2a2e39" stroke="#3a3f4d" strokeWidth="2" />
    <rect x="85" y="45" width="30" height="4" rx="2" fill="#ff0055" />
    
    {/* Side Monitor (Tilted Open) */}
    <path d="M85 75 L85 105 L50 120 L50 90 Z" fill="#1a1c23" stroke="#3a3f4d" strokeWidth="1.5" />
    <path d="M80 80 L80 102 L53 114 L53 92 Z" fill="#0c0c0c" />
    <circle cx="66" cy="98" r="3" fill="#00ff66" filter="url(#glow)" />
    <path d="M59 105 L72 100" stroke="#ff0055" strokeWidth="2" />
    
    {/* RED Glowing Tally Light */}
    <circle cx="135" cy="80" r="4" fill="#ff0000" filter="url(#glow)" />
    
    {/* Extra controls */}
    <circle cx="105" cy="95" r="5" fill="#15181e" stroke="#535c70" strokeWidth="1" />
    <circle cx="105" cy="95" r="2" fill="#ff9900" />
    <rect x="100" y="115" width="25" height="15" rx="4" fill="#0f1115" />
    <line x1="105" y1="120" x2="120" y2="120" stroke="#535c70" strokeWidth="2" />
    <line x1="105" y1="126" x2="115" y2="126" stroke="#ff0055" strokeWidth="2" />
  </svg>
);

export const ClapperboardIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="200"
    height="200"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="clapBody" x1="0" y1="0" x2="0" y2="200" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#232731" />
        <stop offset="100%" stopColor="#0f1115" />
      </linearGradient>
      <linearGradient id="neonGlow" x1="0" y1="0" x2="200" y2="200">
        <stop offset="0%" stopColor="#00f0ff" />
        <stop offset="100%" stopColor="#ff0077" />
      </linearGradient>
      <filter id="clapGlow">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* Main Board Body */}
    <rect x="40" y="80" width="120" height="85" rx="12" fill="url(#clapBody)" stroke="#3a3f4d" strokeWidth="2.5" />
    
    {/* Board Grid Lines */}
    <line x1="45" y1="105" x2="155" y2="105" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="1.5" />
    <line x1="80" y1="105" x2="80" y2="165" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="1.5" />
    <line x1="120" y1="105" x2="120" y2="165" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="1.5" />
    
    {/* Chalkboard Texts */}
    <text x="50" y="100" fill="#ffffff" fillOpacity="0.6" fontSize="8" fontFamily="monospace" fontWeight="bold">SCENE</text>
    <text x="90" y="100" fill="#ffffff" fillOpacity="0.6" fontSize="8" fontFamily="monospace" fontWeight="bold">TAKE</text>
    <text x="130" y="100" fill="#ffffff" fillOpacity="0.6" fontSize="8" fontFamily="monospace" fontWeight="bold">ROLL</text>
    
    <text x="52" y="125" fill="#ffffff" fontSize="16" fontFamily="sans-serif" fontWeight="900">08</text>
    <text x="92" y="125" fill="#ff0077" fontSize="16" fontFamily="sans-serif" fontWeight="900" filter="url(#clapGlow)">12</text>
    <text x="128" y="125" fill="#00f0ff" fontSize="16" fontFamily="sans-serif" fontWeight="900" filter="url(#clapGlow)">A3</text>

    <text x="50" y="150" fill="#ffffff" fillOpacity="0.4" fontSize="8" fontFamily="sans-serif">DIR: T. KAPOOR</text>
    
    {/* Hinge Joint */}
    <circle cx="45" cy="74" r="5" fill="#535c70" />
    
    {/* Tilted Clapstick (Top part, tilted open at -15 deg) */}
    <g transform="rotate(-15 45 74)">
      <rect x="40" y="60" width="120" height="15" rx="4" fill="#181a20" stroke="#3a3f4d" strokeWidth="1.5" />
      <path d="M55 60 L65 60 L55 75 L45 75 Z" fill="#ffffff" />
      <path d="M80 60 L90 60 L80 75 L70 75 Z" fill="#ffffff" />
      <path d="M105 60 L115 60 L105 75 L95 75 Z" fill="#ffffff" />
      <path d="M130 60 L140 60 L130 75 L120 75 Z" fill="#ffffff" />
    </g>

    {/* Horizontal Clapstick Base */}
    <rect x="40" y="74" width="120" height="15" rx="4" fill="#181a20" stroke="#3a3f4d" strokeWidth="1.5" />
    <path d="M50 74 L60 74 L50 89 L40 89 Z" fill="#ffffff" />
    <path d="M75 74 L85 74 L75 89 L65 89 Z" fill="#ffffff" />
    <path d="M100 74 L110 74 L100 89 L90 89 Z" fill="#ffffff" />
    <path d="M125 74 L135 74 L125 89 L115 89 Z" fill="#ffffff" />
    <path d="M150 74 L160 74 L150 89 L140 89 Z" fill="#ffffff" />
  </svg>
);

export const FilmReelIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="200"
    height="200"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="reelMetal" x1="0" y1="0" x2="200" y2="200">
        <stop offset="0%" stopColor="#8e9eab" />
        <stop offset="50%" stopColor="#eef2f3" />
        <stop offset="100%" stopColor="#5a6875" />
      </linearGradient>
      <linearGradient id="filmGlow" x1="0" y1="0" x2="200" y2="200">
        <stop offset="0%" stopColor="#ff00cc" />
        <stop offset="100%" stopColor="#3300ff" />
      </linearGradient>
      <filter id="filmLight">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* Winding Film Strip (Showreel) */}
    <path
      d="M60 140 C 60 170, 140 180, 180 150 C 200 130, 170 80, 130 90"
      stroke="url(#filmGlow)"
      strokeWidth="12"
      strokeLinecap="round"
      fill="none"
      opacity="0.85"
      filter="url(#filmLight)"
    />
    <path
      d="M60 140 C 60 170, 140 180, 180 150 C 200 130, 170 80, 130 90"
      stroke="#ffffff"
      strokeWidth="10"
      strokeDasharray="2 3"
      strokeLinecap="round"
      fill="none"
      opacity="0.6"
    />

    {/* Main Metallic Film Reel */}
    <circle cx="100" cy="100" r="65" fill="url(#reelMetal)" stroke="#2c3e50" strokeWidth="4" />
    <circle cx="100" cy="100" r="55" fill="none" stroke="#2c3e50" strokeWidth="1" strokeDasharray="6 3" />
    
    {/* Center Core */}
    <circle cx="100" cy="100" r="18" fill="#1a1c23" stroke="#2c3e50" strokeWidth="3" />
    <circle cx="100" cy="100" r="8" fill="#eef2f3" />
    
    {/* Spokes/Cutouts */}
    <path d="M100 45 A 55 55 0 0 0 65 65 L 85 85 A 18 18 0 0 1 100 82 Z" fill="#0f1115" stroke="#2c3e50" strokeWidth="1.5" />
    <path d="M155 100 A 55 55 0 0 0 135 65 L 115 85 A 18 18 0 0 1 118 100 Z" fill="#0f1115" stroke="#2c3e50" strokeWidth="1.5" />
    <path d="M100 155 A 55 55 0 0 0 135 135 L 115 115 A 18 18 0 0 1 100 118 Z" fill="#0f1115" stroke="#2c3e50" strokeWidth="1.5" />
    <path d="M45 100 A 55 55 0 0 0 65 135 L 85 115 A 18 18 0 0 1 82 100 Z" fill="#0f1115" stroke="#2c3e50" strokeWidth="1.5" />

    {/* Rim Rivets */}
    <circle cx="100" cy="62" r="3" fill="#eef2f3" />
    <circle cx="138" cy="100" r="3" fill="#eef2f3" />
    <circle cx="100" cy="138" r="3" fill="#eef2f3" />
    <circle cx="62" cy="100" r="3" fill="#eef2f3" />
  </svg>
);

export const MegaphoneIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="200"
    height="200"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="megaBody" x1="0" y1="0" x2="200" y2="200">
        <stop offset="0%" stopColor="#ff9900" />
        <stop offset="50%" stopColor="#ff5500" />
        <stop offset="100%" stopColor="#990000" />
      </linearGradient>
      <linearGradient id="chromeGrad" x1="0" y1="0" x2="200" y2="200">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="50%" stopColor="#8e9eab" />
        <stop offset="100%" stopColor="#434343" />
      </linearGradient>
      <filter id="soundwave">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* Megaphone Handle */}
    <path d="M85 115 L70 145 C67 150, 75 155, 78 150 L93 120 Z" fill="url(#chromeGrad)" stroke="#1a1c23" strokeWidth="2" />
    
    {/* Main Megaphone Cone */}
    <path d="M60 95 L145 60 L165 130 L80 115 Z" fill="url(#megaBody)" stroke="#1a1c23" strokeWidth="2" />
    
    {/* Mouthpiece */}
    <path d="M55 90 C50 90, 48 100, 52 105 L62 108 L60 95 Z" fill="url(#chromeGrad)" stroke="#1a1c23" strokeWidth="2" />
    
    {/* Chrome Front Ring */}
    <ellipse cx="155" cy="95" rx="10" ry="35" transform="rotate(11.3 155 95)" fill="url(#chromeGrad)" stroke="#1a1c23" strokeWidth="2" />
    <ellipse cx="155" cy="95" rx="5" ry="28" transform="rotate(11.3 155 95)" fill="#0f1115" />
    
    {/* Sound Waves Emitted */}
    <path d="M175 80 C185 85, 185 105, 175 110" stroke="#ff5500" strokeWidth="3" strokeLinecap="round" filter="url(#soundwave)" />
    <path d="M185 70 C200 80, 200 110, 185 120" stroke="#ff9900" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.8" filter="url(#soundwave)" />
    
    {/* Strap Cord */}
    <path d="M52 98 C40 102, 38 125, 55 125" stroke="#ff5500" strokeWidth="2.5" fill="none" strokeDasharray="4 2" />
  </svg>
);
