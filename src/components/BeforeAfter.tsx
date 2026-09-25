'use client';

import Photo from '@/components/Photo';
import { useState } from 'react';

type BeforeAfterProps = {
  /** Foto van de situatie vóór het wassen */
  before?: string;
  /** Foto van hetzelfde raam na het wassen */
  after?: string;
  alt?: string;
};

export default function BeforeAfter({ before, after, alt = '' }: BeforeAfterProps) {
  const [position, setPosition] = useState(50);
  const hasPhotos = Boolean(before && after);

  return (
    <figure className="ba">
      <div className="ba-frame">
        {/* Onderste laag: na */}
        <div className="ba-layer">
          {hasPhotos ? (
            <Photo src={after!} alt={alt} fill sizes="(max-width: 960px) 100vw, 1160px" />
          ) : (
            <div className="photo-ph ba-fill">Foto na</div>
          )}
        </div>

        {/* Bovenste laag: voor, afgesneden op de schuifpositie */}
        <div
          className="ba-layer ba-layer--top"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          {hasPhotos ? (
            <Photo src={before!} alt={alt} fill sizes="(max-width: 960px) 100vw, 1160px" />
          ) : (
            <div className="photo-ph ba-fill ba-fill--before">Foto voor</div>
          )}
        </div>

        <span className="ba-tag ba-tag--left">Voor</span>
        <span className="ba-tag ba-tag--right">Na</span>

        {/* Scheidingslijn met greep */}
        <div className="ba-divider" style={{ left: `${position}%` }} aria-hidden="true">
          <span className="ba-grip" />
        </div>

        {/* De schuifregelaar zelf: werkt met muis, vinger en pijltjestoetsen */}
        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          className="ba-range"
          aria-label="Schuif om het verschil tussen voor en na te zien"
        />
      </div>
      <figcaption className="ba-caption">
        Sleep de knop om het verschil te zien
      </figcaption>
    </figure>
  );
}
