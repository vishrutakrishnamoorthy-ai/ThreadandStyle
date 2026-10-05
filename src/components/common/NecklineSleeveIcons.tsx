import React from 'react';

export const NecklineIcon: React.FC<{ type: string; className?: string; selected?: boolean }> = ({
  type,
  className = 'w-12 h-12',
  selected = false,
}) => {
  const norm = type.toLowerCase();
  const stroke = selected ? '#6B1D2F' : '#6B6258';
  const fill = selected ? '#F6ECEE' : '#FAF6F0';

  if (norm.includes('boat')) {
    return (
      <svg viewBox="0 0 80 60" className={className} fill="none">
        <path d="M15 15 C30 25, 50 25, 65 15 L65 45 C50 50, 30 50, 15 45 Z" fill={fill} stroke={stroke} strokeWidth="2.5" />
        <path d="M15 15 C30 25, 50 25, 65 15" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (norm.includes('sweetheart')) {
    return (
      <svg viewBox="0 0 80 60" className={className} fill="none">
        <path d="M18 15 C26 30, 40 38, 40 38 C40 38, 54 30, 62 15 L62 45 L18 45 Z" fill={fill} stroke={stroke} strokeWidth="2.5" />
        <path d="M18 15 C28 28, 38 28, 40 34 C42 28, 52 28, 62 15" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (norm.includes('v-neck') || norm.includes('v neck') || norm.includes('v-')) {
    return (
      <svg viewBox="0 0 80 60" className={className} fill="none">
        <path d="M18 15 L40 42 L62 15 L62 48 L18 48 Z" fill={fill} stroke={stroke} strokeWidth="2.5" />
        <path d="M18 15 L40 42 L62 15" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (norm.includes('square')) {
    return (
      <svg viewBox="0 0 80 60" className={className} fill="none">
        <path d="M22 15 L22 36 L58 36 L58 15 L64 48 L16 48 Z" fill={fill} stroke={stroke} strokeWidth="2.5" />
        <path d="M22 15 L22 36 L58 36 L58 15" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (norm.includes('high')) {
    return (
      <svg viewBox="0 0 80 60" className={className} fill="none">
        <path d="M26 10 C34 10, 46 10, 54 10 L58 48 L22 48 Z" fill={fill} stroke={stroke} strokeWidth="2.5" />
        <rect x="25" y="8" width="30" height="12" rx="2" fill={selected ? '#EAD6DB' : '#EDE6DC'} stroke={stroke} strokeWidth="2.5" />
        <path d="M40 10 L40 20" stroke={stroke} strokeWidth="2" />
      </svg>
    );
  }
  // Default Round
  return (
    <svg viewBox="0 0 80 60" className={className} fill="none">
      <path d="M18 15 C18 38, 62 38, 62 15 L65 48 L15 48 Z" fill={fill} stroke={stroke} strokeWidth="2.5" />
      <path d="M18 15 C20 40, 60 40, 62 15" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
};

export const SleeveIcon: React.FC<{ type: string; className?: string; selected?: boolean }> = ({
  type,
  className = 'w-12 h-12',
  selected = false,
}) => {
  const norm = type.toLowerCase();
  const stroke = selected ? '#6B1D2F' : '#6B6258';
  const fill = selected ? '#F6ECEE' : '#FAF6F0';

  if (norm.includes('sleeveless')) {
    return (
      <svg viewBox="0 0 80 60" className={className} fill="none">
        <path d="M24 15 C30 20, 50 20, 56 15 L56 48 L24 48 Z" fill={fill} stroke={stroke} strokeWidth="2.5" />
        <path d="M24 15 C24 30, 24 35, 24 48" stroke={stroke} strokeWidth="3" strokeDasharray="3 3" />
        <path d="M56 15 C56 30, 56 35, 56 48" stroke={stroke} strokeWidth="3" strokeDasharray="3 3" />
      </svg>
    );
  }
  if (norm.includes('puff')) {
    return (
      <svg viewBox="0 0 80 60" className={className} fill="none">
        <path d="M25 15 C32 20, 48 20, 55 15 L55 45 L25 45 Z" fill={fill} stroke={stroke} strokeWidth="2.5" />
        <ellipse cx="16" cy="24" rx="8" ry="12" fill={fill} stroke={stroke} strokeWidth="2.5" />
        <ellipse cx="64" cy="24" rx="8" ry="12" fill={fill} stroke={stroke} strokeWidth="2.5" />
        <path d="M10 32 L22 32" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M58 32 L70 32" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (norm.includes('bell')) {
    return (
      <svg viewBox="0 0 80 60" className={className} fill="none">
        <path d="M25 15 C32 20, 48 20, 55 15 L55 45 L25 45 Z" fill={fill} stroke={stroke} strokeWidth="2.5" />
        <path d="M25 15 L18 30 L8 44 L18 44 L25 32" fill={fill} stroke={stroke} strokeWidth="2.5" />
        <path d="M55 15 L62 30 L72 44 L62 44 L55 32" fill={fill} stroke={stroke} strokeWidth="2.5" />
      </svg>
    );
  }
  if (norm.includes('full')) {
    return (
      <svg viewBox="0 0 80 60" className={className} fill="none">
        <path d="M25 15 C32 20, 48 20, 55 15 L55 45 L25 45 Z" fill={fill} stroke={stroke} strokeWidth="2.5" />
        <path d="M25 15 L15 32 L12 55 L18 55 L25 35" fill={fill} stroke={stroke} strokeWidth="2.5" />
        <path d="M55 15 L65 32 L68 55 L62 55 L55 35" fill={fill} stroke={stroke} strokeWidth="2.5" />
      </svg>
    );
  }
  if (norm.includes('three') || norm.includes('3/4') || norm.includes('elbow')) {
    return (
      <svg viewBox="0 0 80 60" className={className} fill="none">
        <path d="M25 15 C32 20, 48 20, 55 15 L55 45 L25 45 Z" fill={fill} stroke={stroke} strokeWidth="2.5" />
        <path d="M25 15 L16 35 L22 36 L25 25" fill={fill} stroke={stroke} strokeWidth="2.5" />
        <path d="M55 15 L64 35 L58 36 L55 25" fill={fill} stroke={stroke} strokeWidth="2.5" />
      </svg>
    );
  }
  // Short
  return (
    <svg viewBox="0 0 80 60" className={className} fill="none">
      <path d="M25 15 C32 20, 48 20, 55 15 L55 45 L25 45 Z" fill={fill} stroke={stroke} strokeWidth="2.5" />
      <path d="M25 15 L17 24 L22 26 L25 20" fill={fill} stroke={stroke} strokeWidth="2.5" />
      <path d="M55 15 L63 24 L58 26 L55 20" fill={fill} stroke={stroke} strokeWidth="2.5" />
    </svg>
  );
};
