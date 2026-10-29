import React from 'react';

export type VisualScene =
  | 'hero-residence'
  | 'about-facade'
  | 'promo-estate'
  | 'why-choose'
  | 'modern-villa'
  | 'family-residence'
  | 'elegant-home'
  | 'category-villa'
  | 'category-family'
  | 'category-contemporary'
  | 'category-development'
  | 'category-construction'
  | 'category-custom';

interface ArchitecturalVisualProps {
  scene: VisualScene;
  className?: string;
  alt?: string;
}

export const ArchitecturalVisual: React.FC<ArchitecturalVisualProps> = ({
  scene,
  className = '',
  alt = 'Mister Focus Modern Architectural Concept'
}) => {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative overflow-hidden select-none bg-[#141414] ${className}`}
    >
      {scene === 'hero-residence' && (
        <svg
          viewBox="0 0 1600 900"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Twilight Sky */}
            <linearGradient id="twilightSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0B132B" />
              <stop offset="35%" stopColor="#1C2541" />
              <stop offset="70%" stopColor="#3A3B58" />
              <stop offset="85%" stopColor="#7E5245" />
              <stop offset="100%" stopColor="#C98B53" />
            </linearGradient>

            {/* Warm Interior Glow */}
            <radialGradient id="interiorGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFE8B5" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#F4BE6C" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#D4A017" stopOpacity="0.4" />
            </radialGradient>

            {/* Accent Gold Lighting */}
            <linearGradient id="uplightBeam" x1="50%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="#F9D776" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#D4A017" stopOpacity="0" />
            </linearGradient>

            {/* Concrete & Stone Textures */}
            <linearGradient id="stoneWall" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#323338" />
              <stop offset="50%" stopColor="#25262B" />
              <stop offset="100%" stopColor="#1A1B1F" />
            </linearGradient>

            <linearGradient id="cedarWood" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9E5D32" />
              <stop offset="50%" stopColor="#7B4220" />
              <stop offset="100%" stopColor="#5D3014" />
            </linearGradient>

            <linearGradient id="glassBalcony" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#99D5E8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#4A7B8E" stopOpacity="0.2" />
            </linearGradient>

            <linearGradient id="pavedDriveway" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22242B" />
              <stop offset="100%" stopColor="#121316" />
            </linearGradient>
          </defs>

          {/* Sky Backdrop */}
          <rect width="1600" height="900" fill="url(#twilightSky)" />

          {/* Distant Mountainous & Tree Horizon Silhouettes */}
          <path d="M0 640 Q240 580 480 610 T960 590 T1440 620 L1600 600 L1600 700 L0 700 Z" fill="#131929" />
          <path d="M0 650 C300 620 600 640 900 630 C1200 620 1450 635 1600 640 L1600 760 L0 760 Z" fill="#0E121E" />

          {/* Modern Architectural House - Cantilevered Two-Storey Structure */}
          
          {/* Ground Floor Main Structural Block */}
          <rect x="360" y="440" width="880" height="280" rx="2" fill="url(#stoneWall)" stroke="#171717" strokeWidth="2" />

          {/* Ground Floor Luxury Living Room Glass Walls (Floor-to-Ceiling) */}
          <rect x="420" y="480" width="360" height="230" fill="url(#interiorGlow)" />
          {/* Modern Window Mullions */}
          <line x1="540" y1="480" x2="540" y2="710" stroke="#1F1F1F" strokeWidth="6" />
          <line x1="660" y1="480" x2="660" y2="710" stroke="#1F1F1F" strokeWidth="6" />
          <line x1="420" y1="620" x2="780" y2="620" stroke="#1F1F1F" strokeWidth="4" />
          {/* Subtle interior pendant lights */}
          <circle cx="500" cy="530" r="14" fill="#FFF2D6" />
          <circle cx="600" cy="530" r="14" fill="#FFF2D6" />
          <circle cx="700" cy="530" r="14" fill="#FFF2D6" />

          {/* Ground Floor Right Wing - Textured Cedar Louver Feature */}
          <rect x="820" y="470" width="380" height="250" fill="url(#cedarWood)" />
          {/* Louver Slat Lines */}
          {[...Array(14)].map((_, i) => (
            <line key={`slat-${i}`} x1="820" y1={470 + i * 18} x2="1200" y2={470 + i * 18} stroke="#3D1D09" strokeWidth="3" />
          ))}
          {/* Vertical Architectural Light Ribbon on Cedar */}
          <rect x="880" y="470" width="16" height="250" fill="#FFE59E" fillOpacity="0.4" />

          {/* Second Floor Cantilevered Volume (Modern Floating Design) */}
          <polygon points="260,260 1200,260 1200,450 260,450" fill="#25262B" stroke="#111" strokeWidth="2" />
          
          {/* Second Floor Cedar Inset Panel */}
          <rect x="290" y="280" width="220" height="150" fill="url(#cedarWood)" />
          {[...Array(8)].map((_, i) => (
            <line key={`cslat-${i}`} x1="290" y1={280 + i * 18} x2="510" y2={280 + i * 18} stroke="#3D1D09" strokeWidth="2" />
          ))}

          {/* Second Floor Master Bedroom Glass & Balcony */}
          <rect x="540" y="280" width="580" height="150" fill="url(#interiorGlow)" />
          {/* Glass Mullions */}
          <line x1="720" y1="280" x2="720" y2="430" stroke="#171717" strokeWidth="6" />
          <line x1="920" y1="280" x2="920" y2="430" stroke="#171717" strokeWidth="6" />

          {/* Cantilevered Glass Balcony Railing */}
          <rect x="520" y="380" width="640" height="65" fill="url(#glassBalcony)" stroke="#B8D7E3" strokeWidth="1.5" />
          <line x1="520" y1="380" x2="1160" y2="380" stroke="#E2EFF5" strokeWidth="3" />
          <line x1="680" y1="380" x2="680" y2="445" stroke="#7BA8B8" strokeWidth="2" />
          <line x1="840" y1="380" x2="840" y2="445" stroke="#7BA8B8" strokeWidth="2" />
          <line x1="1000" y1="380" x2="1000" y2="445" stroke="#7BA8B8" strokeWidth="2" />

          {/* Architectural Roof Overhang with Recessed Gold Downlights */}
          <polygon points="230,240 1240,240 1220,260 250,260" fill="#151619" />
          {[320, 480, 640, 800, 960, 1120].map((x, i) => (
            <g key={`dlight-${i}`}>
              <circle cx={x} cy="256" r="4" fill="#FFEAA7" />
              <polygon points={`${x - 25},260 ${x + 25},260 ${x + 45},380 ${x - 45},380`} fill="url(#uplightBeam)" opacity="0.3" />
            </g>
          ))}

          {/* Ground Landscaped Gardens & Paved Driveway */}
          <polygon points="0,720 1600,720 1600,900 0,900" fill="url(#pavedDriveway)" />
          
          {/* Paved Stone Joint Lines */}
          {[...Array(12)].map((_, i) => (
            <line key={`pave-${i}`} x1={i * 140} y1="720" x2={i * 170 - 100} y2="900" stroke="#2D3039" strokeWidth="2" />
          ))}
          <line x1="0" y1="780" x2="1600" y2="780" stroke="#2D3039" strokeWidth="1.5" />
          <line x1="0" y1="840" x2="1600" y2="840" stroke="#2D3039" strokeWidth="1.5" />

          {/* Manicured Landscaping & Garden Beds */}
          <path d="M120 720 C220 700 300 710 380 720 L380 750 L120 750 Z" fill="#1C3829" />
          <path d="M1180 720 C1280 705 1380 710 1480 720 L1480 750 L1180 750 Z" fill="#1C3829" />

          {/* Modern Bollard Garden Uplighting */}
          {[200, 320, 1240, 1380].map((x, i) => (
            <g key={`bollard-${i}`}>
              <rect x={x - 4} y="695" width="8" height="25" fill="#333" />
              <circle cx={x} cy="695" r="4" fill="#F4BE6C" />
              <polygon points={`${x - 15},695 ${x + 15},695 ${x + 35},640 ${x - 35},640`} fill="url(#uplightBeam)" opacity="0.4" />
            </g>
          ))}
        </svg>
      )}

      {scene === 'about-facade' && (
        <svg
          viewBox="0 0 800 600"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="aboutSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E2A38" />
              <stop offset="100%" stopColor="#4A3B32" />
            </linearGradient>
            <linearGradient id="warmWood" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A46435" />
              <stop offset="50%" stopColor="#8C4E24" />
              <stop offset="100%" stopColor="#6E3A18" />
            </linearGradient>
            <linearGradient id="honedConcrete" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#42454D" />
              <stop offset="100%" stopColor="#28292E" />
            </linearGradient>
          </defs>

          <rect width="800" height="600" fill="url(#aboutSky)" />

          {/* Honed Concrete Geometric Wall */}
          <polygon points="50,100 480,60 480,560 50,560" fill="url(#honedConcrete)" />
          {/* Concrete Formwork Imprint Lines & Ties */}
          <line x1="50" y1="220" x2="480" y2="180" stroke="#1D1E22" strokeWidth="2" strokeDasharray="6,4" />
          <line x1="50" y1="360" x2="480" y2="320" stroke="#1D1E22" strokeWidth="2" strokeDasharray="6,4" />
          <circle cx="120" cy="180" r="4" fill="#151618" />
          <circle cx="280" cy="160" r="4" fill="#151618" />
          <circle cx="420" cy="140" r="4" fill="#151618" />

          {/* Dramatic Cedar Louver Screen */}
          <polygon points="440,40 760,100 760,560 440,560" fill="url(#warmWood)" opacity="0.95" />
          {[...Array(20)].map((_, i) => (
            <line
              key={`ab-louver-${i}`}
              x1="440"
              y1={50 + i * 26}
              x2="760"
              y2={110 + i * 24}
              stroke="#43220E"
              strokeWidth="4"
            />
          ))}

          {/* Recessed Glass Entrance with Warm Glow */}
          <rect x="220" y="280" width="220" height="280" fill="#FCE5B3" opacity="0.9" />
          <line x1="330" y1="280" x2="330" y2="560" stroke="#171717" strokeWidth="8" />
          <rect x="345" y="410" width="10" height="40" rx="2" fill="#D4A017" />

          {/* Architectural Floating Planter & Tropical Plants */}
          <rect x="0" y="520" width="800" height="80" fill="#1A1C20" />
          <path d="M30 520 C90 460 140 480 200 520 Z" fill="#244532" />
          <path d="M120 520 C180 430 240 450 300 520 Z" fill="#1D3929" />
          <path d="M520 520 C600 440 680 450 750 520 Z" fill="#244532" />
        </svg>
      )}

      {scene === 'promo-estate' && (
        <svg
          viewBox="0 0 800 600"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="promoSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#141824" />
              <stop offset="70%" stopColor="#2E2838" />
              <stop offset="100%" stopColor="#5E4334" />
            </linearGradient>
            <radialGradient id="promoWarmth" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFDC96" />
              <stop offset="100%" stopColor="#C98B28" />
            </radialGradient>
          </defs>

          <rect width="800" height="600" fill="url(#promoSky)" />

          {/* Symmetrical Contemporary Villa Wing */}
          <polygon points="100,200 700,200 650,480 150,480" fill="#222329" stroke="#111" strokeWidth="3" />
          
          {/* Central Golden Glass Atrium */}
          <rect x="250" y="240" width="300" height="240" fill="url(#promoWarmth)" opacity="0.9" />
          <line x1="400" y1="240" x2="400" y2="480" stroke="#171717" strokeWidth="6" />
          <line x1="250" y1="360" x2="550" y2="360" stroke="#171717" strokeWidth="4" />

          {/* Cantilever Roof Line */}
          <polygon points="60,180 740,180 720,205 80,205" fill="#0D0E11" />
          <line x1="80" y1="202" x2="720" y2="202" stroke="#D4A017" strokeWidth="2" />

          {/* Reflecting Pool at Dusk */}
          <polygon points="0,480 800,480 800,600 0,600" fill="#121620" />
          {/* Water reflection of the glowing atrium */}
          <polygon points="260,480 540,480 500,560 300,560" fill="#D4A017" opacity="0.3" filter="blur(4px)" />
        </svg>
      )}

      {scene === 'why-choose' && (
        <svg
          viewBox="0 0 1200 700"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="whySky" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B0D13" />
              <stop offset="60%" stopColor="#171B26" />
              <stop offset="100%" stopColor="#2E201B" />
            </linearGradient>
            <linearGradient id="goldBeam" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E5B537" />
              <stop offset="100%" stopColor="#8A630A" />
            </linearGradient>
          </defs>

          <rect width="1200" height="700" fill="url(#whySky)" />

          {/* Clean Geometric Lines of Architectural Masterpiece */}
          <polygon points="200,500 450,220 950,220 1050,500" fill="#1C1D24" stroke="#D4A017" strokeWidth="1.5" strokeOpacity="0.4" />
          <polygon points="320,500 500,260 880,260 960,500" fill="#252733" />
          
          {/* Glass Ribbons */}
          <polygon points="420,500 550,300 820,300 860,500" fill="#FAD683" opacity="0.85" />
          <line x1="640" y1="300" x2="640" y2="500" stroke="#171717" strokeWidth="5" />

          {/* Precision Architectural Grid Lines */}
          <line x1="0" y1="500" x2="1200" y2="500" stroke="#D4A017" strokeWidth="2" strokeOpacity="0.8" />
          {[...Array(12)].map((_, i) => (
            <line
              key={`grid-${i}`}
              x1={i * 100}
              y1="500"
              x2={i * 120 - 100}
              y2="700"
              stroke="#262832"
              strokeWidth="1"
            />
          ))}

          {/* Accent Gold Crest on the Pavilion */}
          <polygon points="640,160 690,220 590,220" fill="url(#goldBeam)" />
        </svg>
      )}

      {/* Featured Projects Cards */}
      {scene === 'modern-villa' && (
        <svg viewBox="0 0 600 420" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="420" fill="#191B24" />
          {/* Floating Terrace Villa */}
          <polygon points="80,140 520,140 520,320 80,320" fill="#2B2D38" />
          <rect x="140" y="180" width="320" height="140" fill="#F9DDA2" opacity="0.9" />
          <line x1="300" y1="180" x2="300" y2="320" stroke="#171717" strokeWidth="6" />
          {/* Glass terrace balustrade */}
          <rect x="60" y="270" width="480" height="50" fill="#7FA9BA" opacity="0.35" stroke="#D3E5ED" strokeWidth="1" />
          <rect x="0" y="320" width="600" height="100" fill="#111216" />
          <line x1="0" y1="320" x2="600" y2="320" stroke="#D4A017" strokeWidth="2" />
        </svg>
      )}

      {scene === 'family-residence' && (
        <svg viewBox="0 0 600 420" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="420" fill="#1B1C22" />
          {/* Pitched contemporary roof line with warm cedar front */}
          <polygon points="120,200 300,100 480,200 480,340 120,340" fill="#2C2E38" />
          <polygon points="150,210 300,125 450,210 450,340 150,340" fill="#6A3B1B" />
          {/* Warm arched window + front entrance */}
          <rect x="250" y="220" width="100" height="120" rx="6" fill="#F8DE9F" />
          <line x1="300" y1="220" x2="300" y2="340" stroke="#171717" strokeWidth="4" />
          <rect x="0" y="340" width="600" height="80" fill="#121317" />
          <line x1="0" y1="340" x2="600" y2="340" stroke="#D4A017" strokeWidth="2" />
        </svg>
      )}

      {scene === 'elegant-home' && (
        <svg viewBox="0 0 600 420" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="420" fill="#16181F" />
          {/* Asymmetric Cantilever Box Architecture */}
          <polygon points="60,120 380,120 380,280 60,280" fill="#3A3C4A" />
          <rect x="100" y="150" width="240" height="130" fill="#FCE5B3" opacity="0.9" />
          {/* Connected stone volume */}
          <polygon points="340,160 540,160 540,340 340,340" fill="#25262E" stroke="#111" strokeWidth="2" />
          <rect x="380" y="200" width="120" height="140" fill="#E8B550" opacity="0.8" />
          <rect x="0" y="340" width="600" height="80" fill="#0E1014" />
          <line x1="0" y1="340" x2="600" y2="340" stroke="#D4A017" strokeWidth="2" />
        </svg>
      )}

      {/* Property Categories (6 cards) */}
      {scene === 'category-villa' && (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="#1C1E26" />
          <polygon points="40,80 360,80 340,220 60,220" fill="#2C2E3B" />
          <rect x="90" y="110" width="220" height="110" fill="#FCE3A6" opacity="0.88" />
          <line x1="200" y1="110" x2="200" y2="220" stroke="#171717" strokeWidth="4" />
          <rect x="0" y="220" width="400" height="80" fill="#111216" />
          <line x1="0" y1="220" x2="400" y2="220" stroke="#D4A017" strokeWidth="2" />
        </svg>
      )}

      {scene === 'category-family' && (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="#181A22" />
          <polygon points="80,140 200,60 320,140 320,230 80,230" fill="#323542" />
          <rect x="150" y="140" width="100" height="90" fill="#FBD88F" opacity="0.9" />
          <line x1="200" y1="140" x2="200" y2="230" stroke="#171717" strokeWidth="3" />
          <rect x="0" y="230" width="400" height="70" fill="#0E1015" />
          <line x1="0" y1="230" x2="400" y2="230" stroke="#D4A017" strokeWidth="2" />
        </svg>
      )}

      {scene === 'category-contemporary' && (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="#161820" />
          <polygon points="40,90 280,70 280,230 40,230" fill="#7A421D" />
          <polygon points="260,110 360,110 360,230 260,230" fill="#242630" />
          <rect x="80" y="120" width="160" height="110" fill="#FEE7B5" opacity="0.85" />
          <rect x="0" y="230" width="400" height="70" fill="#0F1014" />
          <line x1="0" y1="230" x2="400" y2="230" stroke="#D4A017" strokeWidth="2" />
        </svg>
      )}

      {scene === 'category-development' && (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="#171A24" />
          {/* Multiple row houses / enclave masterplan */}
          <polygon points="30,120 130,70 130,220 30,220" fill="#2E303E" />
          <polygon points="140,110 250,60 250,220 140,220" fill="#3D4052" />
          <polygon points="260,120 370,70 370,220 260,220" fill="#2E303E" />
          <rect x="170" y="120" width="50" height="70" fill="#F7DC98" opacity="0.9" />
          <rect x="0" y="220" width="400" height="80" fill="#111216" />
          <line x1="0" y1="220" x2="400" y2="220" stroke="#D4A017" strokeWidth="2" />
        </svg>
      )}

      {scene === 'category-construction' && (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="#191B24" />
          {/* Structural framing, precision steel & foundation beams */}
          <polygon points="60,70 340,70 340,230 60,230" fill="none" stroke="#D4A017" strokeWidth="3" />
          <line x1="60" y1="150" x2="340" y2="150" stroke="#D4A017" strokeWidth="2" />
          <line x1="150" y1="70" x2="150" y2="230" stroke="#D4A017" strokeWidth="2" />
          <line x1="250" y1="70" x2="250" y2="230" stroke="#D4A017" strokeWidth="2" />
          <line x1="60" y1="70" x2="340" y2="230" stroke="#D4A017" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="4,4" />
          <rect x="160" y="160" width="80" height="70" fill="#F9DE9C" opacity="0.6" />
          <rect x="0" y="230" width="400" height="70" fill="#101116" />
        </svg>
      )}

      {scene === 'category-custom' && (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="#1A1C25" />
          {/* Architectural drafting compass / blueprints */}
          <polygon points="80,100 200,40 320,100 200,160" fill="#2E3242" stroke="#D4A017" strokeWidth="2" />
          <polygon points="80,100 200,160 200,240 80,180" fill="#1F222E" />
          <polygon points="320,100 200,160 200,240 320,180" fill="#252838" />
          <circle cx="200" cy="130" r="15" fill="#FCE5B3" opacity="0.8" />
          <rect x="0" y="240" width="400" height="60" fill="#101217" />
          <line x1="0" y1="240" x2="400" y2="240" stroke="#D4A017" strokeWidth="2" />
        </svg>
      )}

      {/* Subtle Luxury Gold Border Shimmer */}
      <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10" />
    </div>
  );
};
