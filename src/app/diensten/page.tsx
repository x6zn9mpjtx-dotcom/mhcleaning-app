import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';

export const metadata = {
  title: 'Diensten – MH Cleaning',
  description:
    'Ramen, veranda’s, afdaken, zonnepanelen en rolluiken. Vakkundig gereinigd in Lommel en omgeving.',
};

const services = [
  {
    title: 'Ramen binnen & buiten',
    description:
      'Traditioneel gewassen met wisser en ladder, streepvrij afgewerkt. Kaders en vensterbanken worden meegenomen, zodat het geheel er verzorgd uitziet.',
    image: '/images/ramen wassen.jpg',
    detail: 'Streepvrij · Binnen en buiten · Alle raamtypes',
  },
  {
    title: "Veranda's & afdaken",
    description:
      'Glas en profielen grondig gereinigd, met de nodige voorzichtigheid. Ook de moeilijk bereikbare delen worden meegenomen.',
    image: '/images/afdak1.jpg',
    detail: 'Veilig op hoogte · Glas en profielen · Langere levensduur',
  },
  {
    title: 'Zonnepanelen',
    description:
      'Zacht gereinigd zonder krassen, zodat uw panelen weer volop zonlicht opvangen en hun rendement behouden.',
    image: '/images/zon1.jpg',
    detail: 'Hoger rendement · Zacht gereinigd · Periodiek onderhoud',
  },
  {
    title: 'Rolluiken',
    description:
      'Lamellen en geleiders proper, in dezelfde beurt als uw ramen. Zo blijft alles gelijkmatig onderhouden.',
    image: null,
    detail: 'Lamellen en geleiders · Samen met de ramen',
  },
];

export default function DienstenPage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Diensten</span>
            <h1 className="display">Waar ik voor zorg</h1>
            <p className="lede">
              Van ramen tot zonnepanelen. Alles wat glas is rond uw woning of
              bedrijf, vakkundig onderhouden.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="band band--sand">
        <div className="wrap">
          <div className="svc-grid">
            {services.map((service, i) => (
              <Reveal key={service.title} className="svc-card" delay={i * 0.1}>
                <div className="svc-media">
                  {service.image ? (
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 25vw"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="photo-ph" style={{ height: '100%' }}>
                      Foto volgt
                    </div>
                  )}
                </div>
                <div className="svc-body">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <p className="svc-detail">{service.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="band band--cream cta-band">
        <div className="wrap">
          <Reveal>
            <h2 className="h2">Benieuwd wat het voor u kost?</h2>
            <p className="lede">
              Stuur een bericht met een paar foto&apos;s van uw woning, dan
              krijgt u een vrijblijvende prijs.
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
