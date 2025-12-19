import Image from "next/image";
import { WeeklyPlanningDemo } from "@/components/WeeklyPlanningDemo";

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          {/* Tekst */}
          <div>
            <h1 className="hero-title">
              MH Cleaning
              <br />
              <span className="hero-highlight">Ramenwasser</span> Maarten
              Hendrickx
            </h1>

            <p className="hero-sub">
              Glazenwasser in Lommel en omgeving voor ramen, rolluiken,
              veranda’s en zonnepanelen.
            </p>

            <ul className="hero-list">
              <li>Steeds netjes afgewerkt met oog voor detail</li>
              <li>Snelle communicatie via WhatsApp</li>
              <li>Correcte prijs & duidelijke afspraken</li>
              <li>Altijd vriendelijk</li>
            </ul>

            <div className="hero-buttons">
              <a href="/contact" className="btn-primary">
                Vrijblijvende offerte
              </a>
              <a
                href="https://wa.me/32495783110"
                className="btn-outline-gold"
              >
                WhatsApp sturen
              </a>
            </div>
          </div>

          {/* Foto */}
          <div className="hero-image">
            <Image 
              src="/images/ramen wassen.jpg" 
              alt="MH Cleaning ramenwasser"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* REGIO – witte/goud balk met druppel-achtergrond */}
      <section className="section section-drops">
        <div className="container">
          <h2 className="section-title-left">
            Ramenwasser in Lommel en omgeving
          </h2>
          <p className="section-text">
            Ik werk voornamelijk in Lommel en omgeving. Hierdoor kan ik
            efficiënt werken en correcte prijzen aanbieden.
          </p>
        </div>
      </section>

      {/* WAAROM MH CLEANING – donkere band */}
      <section className="section section-light">
        <div className="container">
          <h2 className="section-title">Waarom kiezen voor MH Cleaning?</h2>

          <div className="usp-grid">
            {[
              {
                title: "Propere afwerking",
                text: "Steeds netjes afgewerkt met oog voor detail—binnen én buiten.",
              },
              {
                title: "Snelle communicatie",
                text: "Altijd snel antwoord via WhatsApp of e-mail.",
              },
              {
                title: "Correcte prijs",
                text: "Duidelijke, eerlijke prijzen zonder verrassingen en zonder verplichtingen.",
              },
              {
                title: "Altijd vriendelijk",
                text: "Een vaste, vriendelijke ramenwasser die je kent en vertrouwt.",
              },
            ].map((u) => (
              <div key={u.title} className="card">
                <h3 className="card-title">{u.title}</h3>
                <p className="card-text">{u.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
