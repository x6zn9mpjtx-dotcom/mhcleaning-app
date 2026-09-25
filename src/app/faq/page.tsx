'use client';

import { useState } from 'react';
import Link from 'next/link';
import Reveal from '@/components/Reveal';

const faqs = [
  {
    id: 1,
    question: 'Hoe vaak moeten ramen gereinigd worden?',
    answer:
      'Voor de buitenzijde raad ik elke 2 maanden aan, de binnenzijde elke 4 maanden. Dat ritme passen we volledig aan uw voorkeur aan: in de zomer bijvoorbeeld om de 6 weken, in de winter om de 10 weken. Ook voor een specifieke datum, zoals voor een feest of evenement, maak ik graag een afspraak.',
  },
  {
    id: 2,
    question: 'Met welke frequentie dienen zonnepanelen gereinigd te worden?',
    answer:
      'Gemiddeld eens per 3 jaar. Zo behouden uw panelen hun rendement. De juiste frequentie hangt af van uw locatie, de omgeving en hoeveel stof er neerslaat. Ik bekijk dat graag samen met u.',
  },
  {
    id: 3,
    question: 'Hoe snel krijg ik antwoord op mijn offerteaanvraag?',
    answer:
      'U krijgt altijd binnen 8 uur een reactie, via e-mail, telefoon of WhatsApp, wat u het beste uitkomt. Meestal is dat een stuk sneller, maar 8 uur is wat ik garandeer.',
  },
];

export default function FAQPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Veelgestelde vragen</span>
            <h1 className="display">Goed om te weten</h1>
            <p className="lede">
              De vragen die ik het vaakst krijg, met een eerlijk antwoord.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="band band--cream">
        <div className="wrap wrap--narrow">
          <div className="faq-list">
            {faqs.map((faq) => {
              const open = expandedId === faq.id;
              return (
                <div key={faq.id} className="faq-item">
                  <button
                    className="faq-q"
                    onClick={() => setExpandedId(open ? null : faq.id)}
                    aria-expanded={open}
                    aria-controls={`faq-antwoord-${faq.id}`}
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`faq-sign ${open ? 'open' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                  {open && (
                    <div className="faq-a" id={`faq-antwoord-${faq.id}`}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="band band--sand cta-band">
        <div className="wrap">
          <Reveal>
            <h2 className="h2">Staat uw vraag er niet bij?</h2>
            <p className="lede">
              Stuur gerust een bericht. U krijgt binnen 8 uur een antwoord.
            </p>
            <div className="btn-row">
              <Link href="/contact" className="btn btn--gold">
                Stel uw vraag
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
