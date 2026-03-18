"use client";

export default function AnimatedWaves() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: "80px" }}>
      {/* Wave layer 1 — darker, slower */}
      <div className="absolute bottom-0 w-[200%] animate-wave-move" style={{ opacity: 0.35 }}>
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-[80px]"
        >
          <path
            d="M0,40 C120,65 240,10 360,40 C480,70 600,15 720,40 C840,65 960,10 1080,40 C1200,70 1320,15 1440,40 L1440,80 L0,80 Z"
            fill="#93c5fd"
          />
        </svg>
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-[80px] absolute top-0 left-full"
        >
          <path
            d="M0,40 C120,65 240,10 360,40 C480,70 600,15 720,40 C840,65 960,10 1080,40 C1200,70 1320,15 1440,40 L1440,80 L0,80 Z"
            fill="#93c5fd"
          />
        </svg>
      </div>

      {/* Wave layer 2 — lighter, faster */}
      <div
        className="absolute bottom-0 w-[200%]"
        style={{
          opacity: 0.25,
          animation: "wave-move 6s linear infinite",
          animationDelay: "-2s",
        }}
      >
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-[60px]"
        >
          <path
            d="M0,50 C180,20 360,70 540,40 C720,10 900,60 1080,35 C1260,10 1350,55 1440,45 L1440,80 L0,80 Z"
            fill="#60a5fa"
          />
        </svg>
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-[60px] absolute top-0 left-full"
        >
          <path
            d="M0,50 C180,20 360,70 540,40 C720,10 900,60 1080,35 C1260,10 1350,55 1440,45 L1440,80 L0,80 Z"
            fill="#60a5fa"
          />
        </svg>
      </div>

      {/* Wave layer 3 — front, most visible */}
      <div
        className="absolute bottom-0 w-[200%]"
        style={{
          opacity: 0.18,
          animation: "wave-move 10s linear infinite",
          animationDelay: "-4s",
        }}
      >
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-[50px]"
        >
          <path
            d="M0,45 C240,70 480,20 720,50 C960,80 1200,25 1440,50 L1440,80 L0,80 Z"
            fill="#3b82f6"
          />
        </svg>
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-[50px] absolute top-0 left-full"
        >
          <path
            d="M0,45 C240,70 480,20 720,50 C960,80 1200,25 1440,50 L1440,80 L0,80 Z"
            fill="#3b82f6"
          />
        </svg>
      </div>
    </div>
  );
}
