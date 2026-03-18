"use client";

export default function AnimatedWaves() {
  return (
    <div className="relative w-full hidden md:block" style={{ height: "140px", zIndex: 50 }}>
      {/* Pirate ship — sails across on the waves */}
      <div
        className="absolute animate-sail-across"
        style={{ bottom: "10px", opacity: 0.8, zIndex: 60 }}
      >
        <div className="animate-ship-bob">
          <svg
            width="180"
            height="120"
            viewBox="0 0 200 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Hull */}
            <path
              d="M20 95 L35 120 L165 120 L180 95 Z"
              fill="#8B4513"
              stroke="#6B3410"
              strokeWidth="2"
            />
            <path d="M25 100 L38 118 L162 118 L175 100 Z" fill="#A0522D" />
            <line x1="30" y1="105" x2="170" y2="105" stroke="#6B3410" strokeWidth="0.5" opacity="0.5" />
            <line x1="33" y1="112" x2="167" y2="112" stroke="#6B3410" strokeWidth="0.5" opacity="0.5" />
            {/* Portholes */}
            <circle cx="60" cy="108" r="4" fill="#87CEEB" stroke="#6B3410" strokeWidth="1" />
            <circle cx="100" cy="108" r="4" fill="#87CEEB" stroke="#6B3410" strokeWidth="1" />
            <circle cx="140" cy="108" r="4" fill="#87CEEB" stroke="#6B3410" strokeWidth="1" />
            {/* Mast */}
            <line x1="100" y1="95" x2="100" y2="15" stroke="#6B3410" strokeWidth="4" strokeLinecap="round" />
            <rect x="90" y="18" width="20" height="6" rx="2" fill="#8B4513" />
            {/* Main sail */}
            <path d="M102 25 L102 80 L155 80 Q160 52 102 25" fill="#f5f0e8" stroke="#d4c5a9" strokeWidth="1" />
            <line x1="102" y1="52" x2="152" y2="52" stroke="#d4c5a9" strokeWidth="1" />
            {/* Skull on sail */}
            <circle cx="125" cy="50" r="8" fill="none" stroke="#374151" strokeWidth="1.5" />
            <circle cx="122" cy="48" r="1.5" fill="#374151" />
            <circle cx="128" cy="48" r="1.5" fill="#374151" />
            <path d="M121 53 L129 53" stroke="#374151" strokeWidth="1.5" />
            {/* Front sail */}
            <path d="M98 30 L98 75 L55 75 Q48 52 98 30" fill="#e8e0d0" stroke="#d4c5a9" strokeWidth="1" />
            {/* Flag */}
            <line x1="100" y1="15" x2="100" y2="5" stroke="#6B3410" strokeWidth="2" />
            <g className="animate-flag-wave" style={{ transformOrigin: "100px 8px" }}>
              <rect x="100" y="2" width="22" height="14" rx="1" fill="#1f2937" />
              <circle cx="108" cy="7" r="3" fill="white" />
              <line x1="105" y1="12" x2="111" y2="12" stroke="white" strokeWidth="1" />
            </g>
            {/* Bow */}
            <path d="M180 95 L192 90 L185 97" fill="#A0522D" />
          </svg>
        </div>
      </div>

      {/* Wave layer 1 — darker, slower */}
      <div className="absolute bottom-0 w-[200%] animate-wave-move" style={{ opacity: 0.35 }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-[100px]">
          <path d="M0,40 C120,65 240,10 360,40 C480,70 600,15 720,40 C840,65 960,10 1080,40 C1200,70 1320,15 1440,40 L1440,80 L0,80 Z" fill="#93c5fd" />
        </svg>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-[80px] absolute top-0 left-full">
          <path d="M0,40 C120,65 240,10 360,40 C480,70 600,15 720,40 C840,65 960,10 1080,40 C1200,70 1320,15 1440,40 L1440,80 L0,80 Z" fill="#93c5fd" />
        </svg>
      </div>

      {/* Wave layer 2 — lighter, faster */}
      <div
        className="absolute bottom-0 w-[200%]"
        style={{ opacity: 0.25, animation: "wave-move 6s linear infinite", animationDelay: "-2s" }}
      >
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-[80px]">
          <path d="M0,50 C180,20 360,70 540,40 C720,10 900,60 1080,35 C1260,10 1350,55 1440,45 L1440,80 L0,80 Z" fill="#60a5fa" />
        </svg>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-[60px] absolute top-0 left-full">
          <path d="M0,50 C180,20 360,70 540,40 C720,10 900,60 1080,35 C1260,10 1350,55 1440,45 L1440,80 L0,80 Z" fill="#60a5fa" />
        </svg>
      </div>

      {/* Wave layer 3 — front */}
      <div
        className="absolute bottom-0 w-[200%]"
        style={{ opacity: 0.18, animation: "wave-move 10s linear infinite", animationDelay: "-4s" }}
      >
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-[65px]">
          <path d="M0,45 C240,70 480,20 720,50 C960,80 1200,25 1440,50 L1440,80 L0,80 Z" fill="#3b82f6" />
        </svg>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-[50px] absolute top-0 left-full">
          <path d="M0,45 C240,70 480,20 720,50 C960,80 1200,25 1440,50 L1440,80 L0,80 Z" fill="#3b82f6" />
        </svg>
      </div>
    </div>
  );
}
