'use client';

import { useEffect, useRef, useState } from 'react';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Vertraging in seconden, om items in een rij na elkaar te laten verschijnen */
  delay?: number;
  /** Laat de directe kinderen één voor één verschijnen in plaats van het blok als geheel */
  stagger?: boolean;
  as?: 'div' | 'section' | 'article' | 'li';
};

export default function Reveal({
  children,
  className = '',
  delay = 0,
  stagger = false,
  as: Tag = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // Pas starten wanneer het blok echt in beeld komt. Met een drempel op de
      // hoogte van het element zelf begon de animatie op gsm al onderaan het
      // scherm, waardoor ze voorbij was voor je erbij was.
      { threshold: 0, rootMargin: '0px 0px -18% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const base = stagger ? 'reveal-stagger' : 'reveal';

  return (
    <Tag
      ref={ref as React.RefObject<never>}
      className={`${base} ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
