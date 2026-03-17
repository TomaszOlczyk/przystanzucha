"use client";

export default function FloatingToys() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden md:block">
      {/* Toy car — drives right to left, bottom area */}
      <div
        className="absolute animate-drive-across"
        style={{ bottom: "18%", opacity: 0.18 }}
      >
        <svg
          width="140"
          height="90"
          viewBox="0 0 140 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Car body */}
          <rect x="10" y="35" width="120" height="35" rx="8" fill="#ef4444" />
          {/* Car top / cabin */}
          <path
            d="M40 35 L55 10 L100 10 L115 35"
            fill="#f87171"
            stroke="#ef4444"
            strokeWidth="2"
          />
          {/* Windows */}
          <rect x="58" y="14" width="18" height="16" rx="3" fill="#bfdbfe" />
          <rect x="80" y="14" width="18" height="16" rx="3" fill="#bfdbfe" />
          {/* Headlight */}
          <circle cx="128" cy="48" r="5" fill="#fbbf24" />
          {/* Taillight */}
          <circle cx="12" cy="48" r="4" fill="#f97316" />
          {/* Bumper */}
          <rect x="5" y="62" width="130" height="5" rx="2" fill="#dc2626" />
          {/* Wheels */}
          <g className="origin-center animate-wheel-spin">
            <circle cx="35" cy="70" r="12" fill="#374151" />
            <circle cx="35" cy="70" r="6" fill="#6b7280" />
            <circle cx="35" cy="70" r="2" fill="#9ca3af" />
          </g>
          <g className="origin-center animate-wheel-spin">
            <circle cx="105" cy="70" r="12" fill="#374151" />
            <circle cx="105" cy="70" r="6" fill="#6b7280" />
            <circle cx="105" cy="70" r="2" fill="#9ca3af" />
          </g>
          {/* Speed lines */}
          <line x1="0" y1="42" x2="-12" y2="42" stroke="#ef4444" strokeWidth="2" opacity="0.5" />
          <line x1="0" y1="50" x2="-18" y2="50" stroke="#ef4444" strokeWidth="2" opacity="0.4" />
          <line x1="0" y1="58" x2="-10" y2="58" stroke="#ef4444" strokeWidth="2" opacity="0.3" />
        </svg>
      </div>

      {/* Doll / girl figure — walks right to left, upper-middle area */}
      <div
        className="absolute animate-walk-across"
        style={{ top: "55%", opacity: 0.15 }}
      >
        <div className="animate-walk-bounce">
          <svg
            width="70"
            height="110"
            viewBox="0 0 70 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Hair */}
            <ellipse cx="35" cy="18" rx="18" ry="20" fill="#92400e" />
            {/* Face */}
            <circle cx="35" cy="22" r="14" fill="#fde68a" />
            {/* Eyes */}
            <circle cx="30" cy="20" r="2" fill="#1e1b4b" />
            <circle cx="40" cy="20" r="2" fill="#1e1b4b" />
            {/* Smile */}
            <path d="M30 27 Q35 32 40 27" stroke="#1e1b4b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* Blush */}
            <circle cx="26" cy="25" r="3" fill="#fca5a5" opacity="0.5" />
            <circle cx="44" cy="25" r="3" fill="#fca5a5" opacity="0.5" />
            {/* Hair bangs */}
            <path d="M20 15 Q25 5 35 8 Q45 5 50 15" fill="#92400e" />
            {/* Hair sides */}
            <ellipse cx="19" cy="28" rx="5" ry="12" fill="#92400e" />
            <ellipse cx="51" cy="28" rx="5" ry="12" fill="#92400e" />
            {/* Dress */}
            <path d="M22 38 L18 75 L52 75 L48 38 Z" fill="#ec4899" />
            {/* Dress pattern — dots */}
            <circle cx="30" cy="50" r="2" fill="#f9a8d4" />
            <circle cx="40" cy="55" r="2" fill="#f9a8d4" />
            <circle cx="35" cy="65" r="2" fill="#f9a8d4" />
            {/* Arms */}
            <line x1="22" y1="42" x2="12" y2="58" stroke="#fde68a" strokeWidth="5" strokeLinecap="round" />
            <line x1="48" y1="42" x2="58" y2="58" stroke="#fde68a" strokeWidth="5" strokeLinecap="round" />
            {/* Legs */}
            <line x1="28" y1="75" x2="24" y2="98" stroke="#fde68a" strokeWidth="5" strokeLinecap="round" />
            <line x1="42" y1="75" x2="46" y2="98" stroke="#fde68a" strokeWidth="5" strokeLinecap="round" />
            {/* Shoes */}
            <ellipse cx="22" cy="100" rx="7" ry="4" fill="#a855f7" />
            <ellipse cx="48" cy="100" rx="7" ry="4" fill="#a855f7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
