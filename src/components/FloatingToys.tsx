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
      {/* Sun — subtle float center-left */}
      <div
        className="absolute animate-sun-float"
        style={{ top: "12%", left: "42%", opacity: 0.75 }}
      >
        <div className="animate-sun-glow">
          <svg
            width="176"
            height="176"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Sun rays */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
              (angle) => (
                <line
                  key={angle}
                  x1="50"
                  y1="50"
                  x2={50 + 42 * Math.cos((angle * Math.PI) / 180)}
                  y2={50 + 42 * Math.sin((angle * Math.PI) / 180)}
                  stroke="#fbbf24"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.6"
                />
              )
            )}
            {/* Sun body */}
            <circle cx="50" cy="50" r="22" fill="#fbbf24" />
            <circle cx="50" cy="50" r="18" fill="#fcd34d" />
            {/* Sun face */}
            <circle cx="43" cy="47" r="2.5" fill="#92400e" />
            <circle cx="57" cy="47" r="2.5" fill="#92400e" />
            <path
              d="M43 55 Q50 61 57 55"
              stroke="#92400e"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            {/* Cheeks */}
            <circle cx="38" cy="53" r="3" fill="#f59e0b" opacity="0.5" />
            <circle cx="62" cy="53" r="3" fill="#f59e0b" opacity="0.5" />
          </svg>
        </div>
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
          <path
            d="M34 29 Q40 35 46 29"
            stroke="#1e1b4b"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
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
          <line
            x1="26"
            y1="46"
            x2="14"
            y2="65"
            stroke="#fde68a"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="13" cy="66" r="4" fill="#fde68a" />
          {/* Right arm — waving */}
          <g
            className="animate-wave-anim"
            style={{ transformOrigin: "54px 46px" }}
          >
            <line
              x1="54"
              y1="46"
              x2="68"
              y2="28"
              stroke="#fde68a"
              strokeWidth="5"
              strokeLinecap="round"
            />
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
