/** Fala jako przejście między sekcjami. `fill` = kolor sekcji poniżej. Dekoracja — ukryta dla czytników. */
export default function Wave({ fill, animate = false, className = "" }: { fill: string; animate?: boolean; className?: string }) {
  const path = "M0 30 C 120 6 240 6 360 30 S 600 54 720 30 S 960 6 1080 30 S 1320 54 1440 30 V60 H0 Z";
  return (
    <div className={`relative h-[42px] md:h-[60px] overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 2880 60"
        preserveAspectRatio="none"
        className={`absolute bottom-0 left-0 h-full w-[200%] ${animate ? "animate-wave" : ""}`}
      >
        <path d={path} fill={fill} />
        <path d={path} fill={fill} transform="translate(1440 0)" />
      </svg>
    </div>
  );
}
