import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Photo from '@/components/Photo';
import BeforeAfter from '@/components/BeforeAfter';

const pillars = [
  {
    title: 'Oog voor detail',
    text: 'Kaders, hoeken en randen horen erbij. Streepvrij, ook in tegenlicht.',
    icon: (
      <path d="M1 11S4.5 4.5 11 4.5 21 11 21 11s-3.5 6.5-10 6.5S1 11 1 11Zm10 2.75a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5Z" />
    ),
  },
  {
    title: 'Een vaste ramenwasser',
    text: 'U krijgt telkens dezelfde vakman, op een vast ritme dat bij uw woning past.',
    icon: (
      <path d="M4 3.5h14a1.5 1.5 0 0 1 1.5 1.5v13A1.5 1.5 0 0 1 18 19.5H4A1.5 1.5 0 0 1 2.5 18V5A1.5 1.5 0 0 1 4 3.5Zm-1.5 5h17M7 1.5v4m8-4v4m-8 9 2.5 2.5L16 11" />
    ),
  },
  {
    title: 'Lokaal sinds 2019',
    text: 'Ik werk in Lommel en de directe omgeving. Korte afstanden, vaste routes.',
    icon: (
      <path d="M11 20.5s7.5-6.4 7.5-11.75A7.5 7.5 0 0 0 3.5 8.75C3.5 14.1 11 20.5 11 20.5Zm0-8.75a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    ),
  },
  {
    title: 'Persoonlijk contact',
    text: 'Een vraag of een afspraak tussendoor? Eén bericht via WhatsApp volstaat.',
    icon: (
      <path d="M20.5 10.5c0 4.14-4.25 7.5-9.5 7.5a11.4 11.4 0 0 1-2.86-.36L2.5 19.5l1.68-4.2A6.93 6.93 0 0 1 1.5 10.5C1.5 6.36 5.75 3 11 3s9.5 3.36 9.5 7.5Z" />
    ),
  },
];

const services = [
  {
    title: 'Ramen binnen & buiten',
    text: 'Traditioneel gewassen met de raamwisser, streepvrij afgewerkt. Ook de kaders worden meegenomen, zodat het geheel er verzorgd uitziet.',
    image: '/images/ramen wassen1.jpg',
    detail: 'Streepvrij · Binnen en buiten · Alle raamtypes',
  },
  {
    title: "Veranda's & afdaken",
    text: 'Glas en profielen grondig gereinigd, met de nodige voorzichtigheid. Ook de moeilijk bereikbare delen worden meegenomen.',
    image: '/images/afdak1.jpg',
    detail: 'Veilig op hoogte · Glas en profielen · Langere levensduur',
  },
  {
    title: 'Zonnepanelen',
    text: 'Zacht gereinigd met osmosewater, zodat er geen kalkvlekken achterblijven en uw panelen weer volop zonlicht opvangen.',
    image: '/images/zon1.jpg',
    detail: 'Hoger rendement · Osmosewater · Periodiek onderhoud',
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="wrap hero-grid">
          <Reveal stagger>
            <span className="eyebrow">Ramenwasser in Lommel · sinds 2019</span>
            <h1 className="display">
              Het verschil
              <br />
              zie je.
            </h1>
            <p className="lede">
              Vaste ramenwasser voor woningen en bedrijven in Lommel en
              omgeving. Persoonlijk opgevolgd, met oog voor elk detail.
            </p>
            <div className="btn-row">
              <Link href="/contact" className="btn btn--gold">
                Vraag een offerte
              </Link>
              <a
                href="https://wa.me/32495783110"
                className="btn btn--ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
            <p className="hero-hint">
              Stuur een paar foto&apos;s van uw woning mee, dan krijgt u sneller
              een correcte prijs.
            </p>
            <p className="hero-note">
              Beperkt aantal nieuwe vaste klanten per seizoen
            </p>
          </Reveal>

          <Reveal delay={0.15} className="hero-figure">
            <Image
              src="/images/logo goud vierkant.jpg"
              alt="MH Cleaning"
              width={560}
              height={560}
              priority
            />
          </Reveal>
        </div>
      </section>

      {/* WAAROM */}
      <section className="band band--cream">
        <div className="wrap">
          <Reveal stagger className="section-head">
            <span className="eyebrow">Waarom MH Cleaning</span>
            <h2 className="h2">Vakwerk, geen haastwerk.</h2>
          </Reveal>

          <div className="pillars">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} className="pillar" delay={i * 0.1}>
                <svg
                  className="pillar-icon"
                  viewBox="0 0 22 22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {pillar.icon}
                </svg>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DIENSTEN */}
      <section className="band band--sand" id="diensten">
        <div className="wrap">
          <Reveal stagger className="section-head">
            <span className="eyebrow">Diensten</span>
            <h2 className="h2">Waar ik voor zorg</h2>
          </Reveal>

          <div className="svc-grid">
            {services.map((service, i) => (
              <Reveal key={service.title} className="svc-card" delay={i * 0.1}>
                <div className="svc-media">
                  <Photo
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="svc-body">
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <p className="svc-detail">{service.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTAAT */}
      <section className="band band--ink" id="resultaat">
        <div className="wrap">
          <Reveal stagger className="section-head">
            <span className="eyebrow">Resultaat</span>
            <h2 className="h2">Voor en na</h2>
          </Reveal>

          <Reveal>
            <BeforeAfter
              before="/images/ramen wassen voor.jpg"
              after="/images/ramen wassen na.jpg"
              alt="Hetzelfde raam voor en na het wassen"
            />
          </Reveal>
        </div>
      </section>

      {/* OVER MIJ */}
      <section className="band band--cream" id="over-mij">
        <div className="wrap about-grid">
          <Reveal className="about-figure">
            <Photo
              src="/images/ramen wassen.jpg"
              alt="Maarten Hendrickx aan het werk"
              fill
              sizes="(max-width: 960px) 100vw, 420px"
              style={{ objectFit: 'cover' }}
            />
          </Reveal>

          <Reveal stagger className="about-text">
            <span className="eyebrow">Over mij</span>
            <h2 className="h2">Maarten Hendrickx</h2>
            <p className="body-text">
              Ik ben zelfstandig ramenwasser en werk onder de naam MH Cleaning.
              Sinds 2019 zorg ik voor blinkende ramen bij particulieren en
              bedrijven in Lommel en de directe omgeving.
            </p>
            <p className="body-text">
              Ik werk met vaste klanten die ik op regelmatige basis bezoek. Zo
              ken ik uw woning, weet ik waar ik op moet letten en hoeft u zelf
              niet telkens te bellen.
            </p>
            <p className="body-text">
              Omdat ik elke klant persoonlijk bedien, neem ik maar een beperkt
              aantal nieuwe klanten aan.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="band band--sand cta-band">
        <div className="wrap">
          <Reveal stagger>
            <h2 className="h2">Een vaste ramenwasser in Lommel?</h2>
            <p className="lede">
              Vul het formulier in en voeg een paar foto&apos;s van uw woning
              toe. Zo zie ik meteen waar het om gaat en krijgt u een correcte
              prijs, zonder dat u iets hoeft op te meten.
            </p>
            <div className="btn-row">
              <Link href="/contact" className="btn btn--gold">
                Vraag een offerte
              </Link>
              <a
                href="https://wa.me/32495783110"
                className="btn btn--ink"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
