'use client';

export default function WaterDrops() {
  return (
    <div className="water-drops-container" aria-hidden="true">
      {Array.from({ length: 35 }).map((_, i) => (
        <div
          key={i}
          className="water-drop"
          style={{
            left: `${2 + (i * 2.8) % 96}%`,
            animationDuration: `${2.5 + (i % 6) * 1.2}s`,
            animationDelay: `${(i * 0.5) % 7}s`,
            opacity: 0.08 + (i % 5) * 0.04,
            width: `${4 + (i % 4) * 2.5}px`,
          }}
        />
      ))}
    </div>
  );
}
