'use client';

import Image, { type ImageProps } from 'next/image';
import { useCallback, useState } from 'react';

/** Foto die zacht invaadt zodra ze geladen is, in plaats van hard te verschijnen. */
export default function Photo({ alt, className = '', ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  // Een foto uit de cache is soms al klaar voordat React de handler koppelt.
  // Deze controle bij het aankoppelen voorkomt dat ze onzichtbaar blijft staan.
  const checkIfAlreadyLoaded = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete) setLoaded(true);
  }, []);

  return (
    <Image
      {...props}
      alt={alt}
      ref={checkIfAlreadyLoaded}
      className={`photo-fade ${loaded ? 'is-loaded' : ''} ${className}`.trim()}
      onLoad={() => setLoaded(true)}
    />
  );
}
