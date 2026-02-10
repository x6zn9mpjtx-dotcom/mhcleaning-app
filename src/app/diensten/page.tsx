import Image from 'next/image';

const services = [
  {
    id: 1,
    title: 'Reinigen van Ramen',
    description: 'Professionele ramenreiniging voor huizen en bedrijven. We zorgen voor glashelder en streepvrij resultaat. Met speciale aandacht voor zowel binnen- als buitenzijden.',
    image: '/images/ramen wassen.jpg',
    details: 'Streepvrij schoon • Zowel binnen als buiten • Voor alle raamtypen',
  },
  {
    id: 2,
    title: 'Reinigen van Zonnepanelen',
    description: 'Zonnepanelen worden regelmatig vuil. Wij zorgen ervoor dat jouw panels optimaal werken en meer energie opbrengen door professionele reiniging.',
    image: '/images/zon1.jpg',
    details: 'Verhoogde efficiency • Veilig en professioneel • Regelmatig onderhoud',
  },
  {
    id: 3,
    title: 'Reinigen van Afdaken',
    description: 'Afdaken en overkappingen verdienen goed onderhoud. Wij reinigen deze oppervlakken professioneel, voorzichtig en effectief.',
    image: '/images/afdak1.jpg',
     details: 'Voorkomen van vervuiling • Veilig werken op hoogte • Langere levensduur',
  },
];

export default function DientenPage() {

  return (
    <div>
      {/* DIENSTEN HERO */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">
            Onze
            <br />
            <span className="hero-highlight">Diensten</span>
          </h1>
          <p className="hero-sub">
            Professioneel schoonmaakwerk voor alle soorten glazen oppervlakken
          </p>
        </div>
      </section>

      {/* DIENSTEN GRID */}
      <section className="section section-drops">
        <div className="container">
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-image-wrapper">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                <div className="service-content">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <p className="service-details">✓ {service.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Klaar voor een offerte?</h2>
          <p className="cta-text">
            Neem contact met ons op voor een vrijblijvende offerte
          </p>
          <div className="cta-buttons">
            <a href="/contact" className="btn-primary">
              Offerte aanvragen
            </a>
            <a href="https://wa.me/32495783110" className="btn-outline-gold">
              WhatsApp sturen
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
