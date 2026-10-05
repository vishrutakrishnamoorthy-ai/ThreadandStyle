import React from 'react';

interface SilhouetteProps {
  type: string;
  className?: string;
  color?: string;
  accentColor?: string;
}

export const GarmentIllustration: React.FC<SilhouetteProps> = ({
  type,
  className = 'w-full h-full',
  color = '#6B1D2F',
  accentColor = '#C5A059',
}) => {
  const normType = type.toLowerCase();

  if (normType.includes('blouse')) {
    return (
      <svg viewBox="0 0 400 480" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="blouseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor="#3E0E18" />
          </linearGradient>
          <pattern id="zariPattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke={accentColor} strokeWidth="0.7" opacity="0.35" />
          </pattern>
        </defs>
        {/* Soft background glow */}
        <circle cx="200" cy="240" r="170" fill="#F4EDE4" />
        
        {/* Mannequin neck and stand */}
        <path d="M185 40 L215 40 L220 90 L180 90 Z" fill="#D8CFBF" />
        <path d="M200 90 L200 440" stroke="#8C8275" strokeWidth="4" strokeLinecap="round" />
        <path d="M160 440 L240 440" stroke="#8C8275" strokeWidth="5" strokeLinecap="round" />

        {/* Blouse Body */}
        <path
          d="M140 100 Q200 135 260 100 L305 145 L290 220 L255 200 L250 280 L150 280 L145 200 L110 220 L95 145 Z"
          fill="url(#blouseGrad)"
        />
        {/* Fabric pattern overlay */}
        <path
          d="M140 100 Q200 135 260 100 L305 145 L290 220 L255 200 L250 280 L150 280 L145 200 L110 220 L95 145 Z"
          fill="url(#zariPattern)"
        />

        {/* Neckline embroidery / Boat neck */}
        <path
          d="M140 100 Q200 135 260 100"
          stroke={accentColor}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M142 108 Q200 143 258 108"
          stroke="#FFF2D6"
          strokeWidth="2"
          strokeDasharray="4 3"
        />

        {/* Princess line darts */}
        <path d="M175 140 Q180 200 185 280" stroke="#460F1B" strokeWidth="2" strokeDasharray="3 3" />
        <path d="M225 140 Q220 200 215 280" stroke="#460F1B" strokeWidth="2" strokeDasharray="3 3" />

        {/* Sleeve borders with heavy zari */}
        <path d="M95 145 L110 220" stroke={accentColor} strokeWidth="5" strokeLinecap="round" />
        <path d="M305 145 L290 220" stroke={accentColor} strokeWidth="5" strokeLinecap="round" />
        <rect x="94" y="210" width="18" height="10" fill={accentColor} rx="2" transform="rotate(-15 103 215)" />
        <rect x="288" y="210" width="18" height="10" fill={accentColor} rx="2" transform="rotate(15 297 215)" />

        {/* Waist hem border */}
        <path d="M150 280 L250 280" stroke={accentColor} strokeWidth="6" strokeLinecap="round" />
        <path d="M150 284 L250 284" stroke="#FFF2D6" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Latkan dori tassel at back (subtle accent) */}
        <path d="M200 135 Q190 220 180 320" stroke={accentColor} strokeWidth="1.5" strokeDasharray="2 2" />
        <circle cx="180" cy="325" r="5" fill={accentColor} />
        <path d="M176 325 L180 345 L184 325 Z" fill={color} stroke={accentColor} strokeWidth="1" />
      </svg>
    );
  }

  if (normType.includes('lehenga') || normType.includes('bridal')) {
    return (
      <svg viewBox="0 0 400 480" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lehengaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor="#410A14" />
          </linearGradient>
          <pattern id="kalidarZari" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="1.5" fill={accentColor} />
            <path d="M12 4 L14 10 L20 12 L14 14 L12 20 L10 14 L4 12 L10 10 Z" fill="none" stroke={accentColor} strokeWidth="0.5" opacity="0.3" />
          </pattern>
        </defs>
        <circle cx="200" cy="240" r="170" fill="#F7F1E8" />
        
        {/* Mannequin stand */}
        <path d="M190 30 L210 30 L215 70 L185 70 Z" fill="#D8CFBF" />
        <path d="M200 70 L200 440" stroke="#8C8275" strokeWidth="4" />

        {/* Choli (Top) */}
        <path
          d="M150 80 Q200 100 250 80 L275 110 L260 160 L235 150 L235 190 L165 190 L165 150 L140 160 L125 110 Z"
          fill="url(#lehengaGrad)"
        />
        <path d="M150 80 Q200 105 250 80" stroke={accentColor} strokeWidth="4" />
        <path d="M165 190 L235 190" stroke={accentColor} strokeWidth="4" />

        {/* Midriff space */}
        {/* Grand Kalidar Skirt */}
        <path
          d="M170 215 L230 215 L325 410 Q200 435 75 410 Z"
          fill="url(#lehengaGrad)"
        />
        <path
          d="M170 215 L230 215 L325 410 Q200 435 75 410 Z"
          fill="url(#kalidarZari)"
        />

        {/* Kali Seams radiating downwards */}
        <path d="M185 215 L125 415" stroke={accentColor} strokeWidth="1" opacity="0.5" />
        <path d="M195 215 L175 422" stroke={accentColor} strokeWidth="1" opacity="0.5" />
        <path d="M205 215 L225 422" stroke={accentColor} strokeWidth="1" opacity="0.5" />
        <path d="M215 215 L275 415" stroke={accentColor} strokeWidth="1" opacity="0.5" />

        {/* Waistband (Kamarbandh) */}
        <rect x="168" y="210" width="64" height="8" rx="2" fill={accentColor} />

        {/* Grand Hem Zari Border */}
        <path d="M75 410 Q200 435 325 410" stroke={accentColor} strokeWidth="16" />
        <path d="M75 398 Q200 423 325 398" stroke="#FFE9B8" strokeWidth="2" strokeDasharray="4 3" />
        <path d="M75 416 Q200 441 325 416" stroke="#FFE9B8" strokeWidth="2" strokeDasharray="4 3" />

        {/* Hanging Bridal Latkans */}
        <path d="M175 220 Q160 260 162 310" stroke={accentColor} strokeWidth="1.5" />
        <circle cx="162" cy="315" r="6" fill={accentColor} />
        <path d="M158 315 L162 335 L166 315 Z" fill={color} stroke={accentColor} />
      </svg>
    );
  }

  if (normType.includes('kurti') || normType.includes('angrakha')) {
    return (
      <svg viewBox="0 0 400 480" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="kurtiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor="#4A1220" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="240" r="170" fill="#F6EFE6" />
        
        {/* Kurti Body */}
        <path
          d="M150 90 L250 90 L295 130 L275 240 L240 220 L270 410 L130 410 L160 220 L125 240 L105 130 Z"
          fill="url(#kurtiGrad)"
        />
        {/* Angrakha wrap line */}
        <path d="M165 90 Q180 160 240 220" stroke={accentColor} strokeWidth="4" />
        <circle cx="180" cy="130" r="3.5" fill={accentColor} />
        <circle cx="200" cy="165" r="3.5" fill={accentColor} />
        <circle cx="220" cy="195" r="3.5" fill={accentColor} />
        <circle cx="238" cy="220" r="4.5" fill={accentColor} />

        {/* Neckline */}
        <path d="M175 90 Q200 125 225 90" stroke={accentColor} strokeWidth="3" />

        {/* Sleeves cuff */}
        <path d="M105 130 L125 240" stroke={accentColor} strokeWidth="1.5" />
        <path d="M295 130 L275 240" stroke={accentColor} strokeWidth="1.5" />
        <rect x="110" y="232" width="20" height="8" rx="2" fill={accentColor} transform="rotate(35 120 236)" />
        <rect x="270" y="232" width="20" height="8" rx="2" fill={accentColor} transform="rotate(-35 280 236)" />

        {/* Hem & Side Slits */}
        <path d="M130 410 L270 410" stroke={accentColor} strokeWidth="8" />
        <path d="M130 330 L130 410" stroke="#FFF2D6" strokeWidth="2" strokeDasharray="3 3" />
        <path d="M270 330 L270 410" stroke="#FFF2D6" strokeWidth="2" strokeDasharray="3 3" />
      </svg>
    );
  }

  if (normType.includes('gown')) {
    return (
      <svg viewBox="0 0 400 480" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor="#250810" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="240" r="170" fill="#F8F3EC" />
        
        {/* Evening Gown silhouette with cowl & flared train */}
        <path
          d="M165 75 Q200 110 235 75 L250 115 L225 180 L220 220 L310 425 Q200 445 90 425 L180 220 L175 180 L150 115 Z"
          fill="url(#gownGrad)"
        />
        {/* Cowl / Corset lines */}
        <path d="M165 75 Q200 120 235 75" stroke={accentColor} strokeWidth="3" />
        <path d="M170 125 Q200 155 230 125" stroke={accentColor} strokeWidth="2" opacity="0.6" />
        <path d="M175 160 Q200 180 225 160" stroke={accentColor} strokeWidth="1.5" opacity="0.6" />

        {/* Fitted waist cincher */}
        <path d="M178 215 Q200 220 222 215" stroke={accentColor} strokeWidth="4" />

        {/* Flared micro-pleats */}
        <path d="M185 220 Q160 320 135 428" stroke="#FFE9B8" strokeWidth="0.8" opacity="0.4" />
        <path d="M195 220 Q180 320 175 432" stroke="#FFE9B8" strokeWidth="0.8" opacity="0.4" />
        <path d="M205 220 Q220 320 225 432" stroke="#FFE9B8" strokeWidth="0.8" opacity="0.4" />
        <path d="M215 220 Q240 320 265 428" stroke="#FFE9B8" strokeWidth="0.8" opacity="0.4" />

        {/* Hemline horsehair finish */}
        <path d="M90 425 Q200 445 310 425" stroke={accentColor} strokeWidth="4" />
      </svg>
    );
  }

  // Default Salwar / Custom Dress
  return (
    <svg viewBox="0 0 400 480" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="customGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#4A1220" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="240" r="170" fill="#F5EEE5" />
      
      {/* Kameez / Suit */}
      <path
        d="M150 85 L250 85 L285 130 L270 230 L235 210 L255 370 L145 370 L165 210 L130 230 L115 130 Z"
        fill="url(#customGrad)"
      />
      {/* Salwar trousers showing at bottom */}
      <path d="M165 370 L160 435 L190 435 L195 370 Z" fill="#D9C7B2" stroke={accentColor} strokeWidth="1" />
      <path d="M205 370 L210 435 L240 435 L235 370 Z" fill="#D9C7B2" stroke={accentColor} strokeWidth="1" />

      {/* Placket with handcrafted buttons */}
      <path d="M200 95 L200 180" stroke={accentColor} strokeWidth="3" />
      <circle cx="200" cy="115" r="3" fill="#FFF2D6" />
      <circle cx="200" cy="135" r="3" fill="#FFF2D6" />
      <circle cx="200" cy="155" r="3" fill="#FFF2D6" />
      <circle cx="200" cy="175" r="3" fill="#FFF2D6" />

      {/* Hem lace */}
      <path d="M145 370 L255 370" stroke={accentColor} strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
};
