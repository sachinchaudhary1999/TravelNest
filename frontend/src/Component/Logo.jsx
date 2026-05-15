import React from "react";

function Logo({ className = "" }) {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* SVG Icon — house with location pin style */}
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer circle */}
        <circle cx="18" cy="18" r="18" fill="#FF385C" />

        {/* House shape */}
        <path
          d="M18 8L8 16.5V28H14.5V22H21.5V28H28V16.5L18 8Z"
          fill="white"
          opacity="0.15"
        />
        <path
          d="M18 9.5L9 17.5V27H15V21H21V27H27V17.5L18 9.5Z"
          fill="white"
        />

        {/* Door */}
        <rect x="15.5" y="21" width="5" height="6" rx="1" fill="#FF385C" />

        {/* Location pin dot */}
        <circle cx="18" cy="17" r="1.5" fill="#FF385C" />
      </svg>

      {/* Text */}
      <div className="flex items-baseline gap-0">
        <span className="text-xl font-black tracking-tight text-gray-900 dark:text-white">
          Travel
        </span>
        <span className="text-xl font-black tracking-tight text-[#FF385C]">
          Nest
        </span>
      </div>
    </div>
  );
}

export default Logo;