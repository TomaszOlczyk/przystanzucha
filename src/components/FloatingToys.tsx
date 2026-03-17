"use client";

import { useEffect, useRef } from "react";

export default function FloatingToys() {
  const dollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dollRef.current) return;
      const offset = Math.round(window.innerWidth * 0.05);
      const x = e.clientX + offset;
      const y = e.clientY - 80;
      dollRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden md:block">
      {/* Toy car — drives right to left */}
      <div
        className="absolute animate-drive-across"
        style={{ bottom: "15%", opacity: 0.75 }}
      >
        <svg
          width="160"
          height="80"
          viewBox="0 0 160 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Car body */}
          <rect x="8" y="30" width="144" height="24" rx="6" fill="#ef4444" />
          {/* Car cabin */}
          <path
            d="M45 30 L58 12 L112 12 L125 30"
            fill="#f87171"
            stroke="#dc2626"
            strokeWidth="1.5"
          />
          {/* Roof */}
          <rect x="58" y="10" width="54" height="4" rx="2" fill="#f87171" />
          {/* Windows */}
          <rect x="62" y="15" width="20" height="12" rx="2" fill="#bfdbfe" />
          <rect x="86" y="15" width="20" height="12" rx="2" fill="#bfdbfe" />
          {/* Window divider */}
          <line x1="84" y1="15" x2="84" y2="27" stroke="#dc2626" strokeWidth="1.5" />
          {/* Front headlight */}
          <rect x="148" y="34" width="8" height="6" rx="2" fill="#fbbf24" />
          {/* Rear taillight */}
          <rect x="4" y="34" width="6" height="6" rx="2" fill="#f97316" />
          {/* Front bumper */}
          <rect x="148" y="42" width="10" height="8" rx="2" fill="#b91c1c" />
          {/* Rear bumper */}
          <rect x="2" y="42" width="8" height="8" rx="2" fill="#b91c1c" />
          {/* Undercarriage */}
          <rect x="30" y="54" width="100" height="4" rx="2" fill="#991b1b" />
          {/* Front wheel */}
          <g style={{ transformOrigin: "125px 62px" }} className="animate-wheel-spin">
            <circle cx="125" cy="62" r="14" fill="#374151" />
            <circle cx="125" cy="62" r="10" fill="#4b5563" />
            <line x1="125" y1="52" x2="125" y2="72" stroke="#6b7280" strokeWidth="2" />
            <line x1="115" y1="62" x2="135" y2="62" stroke="#6b7280" strokeWidth="2" />
            <circle cx="125" cy="62" r="3" fill="#9ca3af" />
          </g>
          {/* Rear wheel */}
          <g style={{ transformOrigin: "40px 62px" }} className="animate-wheel-spin">
            <circle cx="40" cy="62" r="14" fill="#374151" />
            <circle cx="40" cy="62" r="10" fill="#4b5563" />
            <line x1="40" y1="52" x2="40" y2="72" stroke="#6b7280" strokeWidth="2" />
            <line x1="30" y1="62" x2="50" y2="62" stroke="#6b7280" strokeWidth="2" />
            <circle cx="40" cy="62" r="3" fill="#9ca3af" />
          </g>
          {/* Wheel arches */}
          <path d="M22 54 Q40 44 58 54" fill="#dc2626" />
          <path d="M107 54 Q125 44 143 54" fill="#dc2626" />
        </svg>
      </div>

      {/* Doll — follows mouse cursor and waves */}
      <div
        ref={dollRef}
        className="absolute top-0 left-0 transition-transform duration-300 ease-out"
        style={{ opacity: 0.75 }}
      >
        <svg
          width="80"
          height="120"
          viewBox="0 0 80 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Hair back */}
          <ellipse cx="40" cy="20" rx="20" ry="22" fill="#92400e" />
          {/* Face */}
          <circle cx="40" cy="24" r="16" fill="#fde68a" />
          {/* Eyes */}
          <circle cx="34" cy="22" r="2.5" fill="#1e1b4b" />
          <circle cx="46" cy="22" r="2.5" fill="#1e1b4b" />
          {/* Eye shine */}
          <circle cx="35" cy="21" r="1" fill="white" />
          <circle cx="47" cy="21" r="1" fill="white" />
          {/* Smile */}
          <path d="M34 29 Q40 35 46 29" stroke="#1e1b4b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Blush */}
          <circle cx="30" cy="27" r="3" fill="#fca5a5" opacity="0.5" />
          <circle cx="50" cy="27" r="3" fill="#fca5a5" opacity="0.5" />
          {/* Hair bangs */}
          <path d="M22 17 Q28 5 40 9 Q52 5 58 17" fill="#92400e" />
          {/* Hair pigtails */}
          <ellipse cx="18" cy="30" rx="6" ry="14" fill="#92400e" />
          <ellipse cx="62" cy="30" rx="6" ry="14" fill="#92400e" />
          {/* Hair ribbons */}
          <circle cx="18" cy="18" r="4" fill="#ec4899" />
          <circle cx="62" cy="18" r="4" fill="#ec4899" />
          {/* Dress */}
          <path d="M26 42 L20 82 L60 82 L54 42 Z" fill="#ec4899" />
          {/* Dress collar */}
          <ellipse cx="40" cy="42" rx="14" ry="4" fill="#f9a8d4" />
          {/* Dress pattern */}
          <circle cx="35" cy="55" r="2" fill="#f9a8d4" />
          <circle cx="45" cy="60" r="2" fill="#f9a8d4" />
          <circle cx="38" cy="72" r="2" fill="#f9a8d4" />
          {/* Left arm — static */}
          <line x1="26" y1="46" x2="14" y2="65" stroke="#fde68a" strokeWidth="5" strokeLinecap="round" />
          <circle cx="13" cy="66" r="4" fill="#fde68a" />
          {/* Right arm — waving */}
          <g className="animate-wave" style={{ transformOrigin: "54px 46px" }}>
            <line x1="54" y1="46" x2="68" y2="28" stroke="#fde68a" strokeWidth="5" strokeLinecap="round" />
            <circle cx="69" cy="26" r="4" fill="#fde68a" />
            <line x1="69" y1="26" x2="74" y2="20" stroke="#fde68a" strokeWidth="2" strokeLinecap="round" />
            <line x1="69" y1="26" x2="76" y2="24" stroke="#fde68a" strokeWidth="2" strokeLinecap="round" />
            <line x1="69" y1="26" x2="75" y2="28" stroke="#fde68a" strokeWidth="2" strokeLinecap="round" />
          </g>
          {/* Legs */}
          <line x1="32" y1="82" x2="28" y2="105" stroke="#fde68a" strokeWidth="5" strokeLinecap="round" />
          <line x1="48" y1="82" x2="52" y2="105" stroke="#fde68a" strokeWidth="5" strokeLinecap="round" />
          {/* Shoes */}
          <ellipse cx="26" cy="108" rx="8" ry="5" fill="#a855f7" />
          <ellipse cx="54" cy="108" rx="8" ry="5" fill="#a855f7" />
        </svg>
      </div>
    </div>
  );
}
