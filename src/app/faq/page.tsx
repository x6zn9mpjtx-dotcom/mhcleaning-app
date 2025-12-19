'use client';

import { useState } from 'react';

const faqs = [
  {
    id: 1,
    question: 'Hoe vaak moeten ramen gereinigd worden?',
    answer: 'We raden aan om de buitenzijde van uw ramen elke 2 maanden te laten reinigen voor optimaal onderhoud. De binnenzijde kan comfortabel elke 4 maanden gereinigd worden. Uiteraard kan dit volledig naar uw voorkeur worden aangepast. Bijvoorbeeld in het zomerseizoen elke 6 weken voor de buitenzijde, en in de winter om de 10 weken. Ook voor specifieke data (bijvoorbeeld voor een feestje of evenement) maken we graag afspraken.',
  },
  {
    id: 2,
    question: 'Met welke frequentie dienen zonnepanelen gereinigd te worden?',
    answer: 'Zonnepanelen moeten gemiddeld eens per 3 jaar professioneel worden gereinigd. Dit zorgt ervoor dat uw panelen optimaal functioneren en maximale energieopbrengst leveren. De frequentie kan variëren afhankelijk van uw locatie, klimaat en hoeveelheid stofafzetting. We adviseren u graag op basis van uw specifieke situatie.',
  },
  {
    id: 3,
    question: 'Hoe snel ontvangt u een antwoord op mijn offerte aanvraag?',
    answer: 'Klantenservice is voor ons erg belangrijk. U ontvangt altijd binnen 8 uur een reactie op uw offerte aanvraag. Dit kan via e-mail, telefoon of WhatsApp, al naar gelang uw voorkeur. We streven ernaar om dit nog sneller te doen, maar 8 uur is onze garantie.',
  },
];

export default function FAQPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div>
      {/* FAQ HERO */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">
            Veelgestelde
            <br />
            <span className="hero-highlight">Vragen</span>
          </h1>
          <p className="hero-sub">
            Antwoorden op de meest gestelde vragen over onze diensten
          </p>
        </div>
      </section>

      {/* FAQ CONTENT */}
      <section className="section section-drops">
        <div className="container">
          <div className="faq-container">
            {faqs.map((faq) => (
              <div key={faq.id} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(faq.id)}
                >
                  <span>{faq.question}</span>
                  <span className={`faq-icon ${expandedId === faq.id ? 'open' : ''}`}>
                    +
                  </span>
                </button>
                {expandedId === faq.id && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* EXTRA VRAAG SECTIE */}
          <div className="faq-extra">
            <h3>Kan uw vraag hier niet gevonden worden?</h3>
            <p>Neem gerust contact met ons op. We helpen u graag!</p>
            <a href="/contact" className="btn-primary">
              Stuur uw vraag
            </a>
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
