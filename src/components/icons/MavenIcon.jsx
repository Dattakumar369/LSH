import React from 'react';

const MavenIcon = ({ size = 24, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Maven Logo - Official Design */}
      {/* Background circle */}
      <circle cx="12" cy="12" r="11" fill="#C71A36" />
      {/* Stylized "M" letter - Maven logo */}
      <path
        d="M7 8L7 16L9 16L9 11L12 13L15 11L15 16L17 16L17 8L15 8L12 10L9 8L7 8Z"
        fill="white"
      />
    </svg>
  );
};

export default MavenIcon;

