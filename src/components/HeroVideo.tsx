'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

/* Dezelfde logo-animatie bestaat in twee kaders: liggend naast de tekst op
   een breed scherm, staand onder de tekst op gsm. We kiezen er één in plaats
   van allebei te plaatsen en er één te verbergen, want een verborgen video
   wordt vaak toch gedownload en dat kost een bezoeker 1,5 MB voor niets. */
const LIGGEND = '/images/hero_16x9.mp4';
const STAAND = '/images/hero_9x16.mp4';

type Keuze = 'liggend' | 'staand' | 'stil' | null;

function StilLogo({ alt }: { alt: string }) {
  return (
    <Image
      src="/images/logo goud vierkant.jpg"
      alt={alt}
      width={560}
      height={560}
      priority
    />
  );
}

export default function HeroVideo() {
  // null tot de eerste meting: op de server weten we de schermbreedte niet.
  const [keuze, setKeuze] = useState<Keuze>(null);
  const [speelt, setSpeelt] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const gsm = window.matchMedia('(max-width: 768px)');
    const rust = window.matchMedia('(prefers-reduced-motion: reduce)');

    const bepaal = () =>
      setKeuze(rust.matches ? 'stil' : gsm.matches ? 'staand' : 'liggend');

    bepaal();
    gsm.addEventListener('change', bepaal);
    rust.addEventListener('change', bepaal);
    return () => {
      gsm.removeEventListener('change', bepaal);
      rust.removeEventListener('change', bepaal);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    /* Safari op iPhone speelt een video enkel vanzelf af als ze echt stil
       staat én in de pagina zelf mag spelen. React zet "muted" alleen als
       eigenschap op het element, niet als attribuut in de HTML, en net naar
       dat attribuut kijkt iOS. Daarom zetten we het hier met de hand. */
    video.muted = true;
    video.setAttribute('muted', '');
    video.playsInline = true;
    video.setAttribute('playsinline', '');

    /* Een mislukte poging laten we stil voorbijgaan. We halen de video niet
       weg: zolang ze blijft staan, kan ze later alsnog starten. Tot dat moment
       ligt het stilstaande logo eroverheen, dus een bezoeker ziet nooit een
       zwart vlak. */
    const probeerTeSpelen = () => {
      const poging = video.play();
      if (poging) poging.catch(() => {});
    };

    const opSpelen = () => setSpeelt(true);
    const opStoppen = () => setSpeelt(false);

    video.addEventListener('playing', opSpelen);
    video.addEventListener('pause', opStoppen);
    video.addEventListener('canplay', probeerTeSpelen);

    // Starten zodra de animatie in beeld komt; op gsm staat ze onder de tekst.
    const waarnemer = new IntersectionObserver(
      ([stukje]) => {
        if (stukje.isIntersecting) probeerTeSpelen();
      },
      { threshold: 0.1 }
    );
    waarnemer.observe(video);

    /* Weigert iOS het automatisch starten, zoals in de energiebesparingsstand
       van een iPhone, dan mag het wél tijdens een aanraking. Bij de eerste tik
       ergens op de pagina proberen we het dus opnieuw. Scrollen telt voor iOS
       niet als aanraking, een tik of klik wel. */
    const bijAanraking = () => probeerTeSpelen();
    window.addEventListener('touchend', bijAanraking, { passive: true });
    window.addEventListener('pointerup', bijAanraking, { passive: true });

    probeerTeSpelen();

    return () => {
      waarnemer.disconnect();
      video.removeEventListener('playing', opSpelen);
      video.removeEventListener('pause', opStoppen);
      video.removeEventListener('canplay', probeerTeSpelen);
      window.removeEventListener('touchend', bijAanraking);
      window.removeEventListener('pointerup', bijAanraking);
    };
  }, [keuze]);

  if (keuze === null) return null;

  // Wie bewegende beelden heeft uitgezet in zijn systeeminstellingen, krijgt
  // het logo gewoon stil te zien.
  if (keuze === 'stil') return <StilLogo alt="MH Cleaning" />;

  return (
    <>
      <video
        key={keuze}
        ref={videoRef}
        className="hero-video"
        src={keuze === 'staand' ? STAAND : LIGGEND}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="MH Cleaning"
      />
      {/* Ligt eroverheen tot de animatie echt loopt. Decoratief: de video
          draagt de naam al. */}
      {!speelt && <StilLogo alt="" />}
    </>
  );
}
