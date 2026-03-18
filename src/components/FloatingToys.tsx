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
      {/* Sun — subtle float in upper right */}
      <div
        className="absolute animate-sun-float"
        style={{ top: "5%", right: "8%", opacity: 0.7 }}
      >
        <div className="animate-sun-glow">
          <svg
            width="100"
            height="100"
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

      {/* Pirate ship — sails across */}
      <div
        className="absolute animate-sail-across"
        style={{ bottom: "12%", opacity: 0.7 }}
      >
        <div className="animate-ship-bob">
          <svg
            width="200"
            height="140"
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
            {/* Hull stripe */}
            <path
              d="M25 100 L38 118 L162 118 L175 100 Z"
              fill="#A0522D"
            />
            {/* Hull planks */}
            <line x1="30" y1="105" x2="170" y2="105" stroke="#6B3410" strokeWidth="0.5" opacity="0.5" />
            <line x1="33" y1="112" x2="167" y2="112" stroke="#6B3410" strokeWidth="0.5" opacity="0.5" />
            {/* Porthole windows */}
            <circle cx="60" cy="108" r="4" fill="#87CEEB" stroke="#6B3410" strokeWidth="1" />
            <circle cx="100" cy="108" r="4" fill="#87CEEB" stroke="#6B3410" strokeWidth="1" />
            <circle cx="140" cy="108" r="4" fill="#87CEEB" stroke="#6B3410" strokeWidth="1" />
            {/* Mast */}
            <line x1="100" y1="95" x2="100" y2="15" stroke="#6B3410" strokeWidth="4" strokeLinecap="round" />
            {/* Crow's nest */}
            <rect x="90" y="18" width="20" height="6" rx="2" fill="#8B4513" />
            {/* Main sail */}
            <path
              d="M102 25 L102 80 L155 80 Q160 52 102 25"
              fill="#f5f0e8"
              stroke="#d4c5a9"
              strokeWidth="1"
            />
            {/* Sail cross */}
            <line x1="102" y1="52" x2="152" y2="52" stroke="#d4c5a9" strokeWidth="1" />
            {/* Skull on sail */}
            <circle cx="125" cy="50" r="8" fill="none" stroke="#374151" strokeWidth="1.5" />
            <circle cx="122" cy="48" r="1.5" fill="#374151" />
            <circle cx="128" cy="48" r="1.5" fill="#374151" />
            <path d="M121 53 L129 53" stroke="#374151" strokeWidth="1.5" />
            {/* Front sail */}
            <path
              d="M98 30 L98 75 L55 75 Q48 52 98 30"
              fill="#e8e0d0"
              stroke="#d4c5a9"
              strokeWidth="1"
            />
            {/* Pirate flag */}
            <line x1="100" y1="15" x2="100" y2="5" stroke="#6B3410" strokeWidth="2" />
            <g className="animate-flag-wave" style={{ transformOrigin: "100px 8px" }}>
              <rect x="100" y="2" width="22" height="14" rx="1" fill="#1f2937" />
              {/* Tiny skull on flag */}
              <circle cx="108" cy="7" r="3" fill="white" />
              <line x1="105" y1="12" x2="111" y2="12" stroke="white" strokeWidth="1" />
            </g>
            {/* Bow decoration */}
            <path d="M180 95 L192 90 L185 97" fill="#A0522D" />
            {/* Water splash at bow */}
            <path
              d="M185 100 Q190 95 195 100 Q200 105 195 108"
              fill="none"
              stroke="#93c5fd"
              strokeWidth="1.5"
              opacity="0.6"
            />
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
