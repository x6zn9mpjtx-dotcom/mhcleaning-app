'use client';

import { useState } from 'react';
import Link from 'next/link';
import Reveal from '@/components/Reveal';

const faqs = [
  {
    id: 1,
    question: 'Hoe vaak laat u uw ramen best wassen?',
    answer:
      'Voor de buitenkant raad ik om de twee maanden aan, voor de binnenkant om de vier maanden. Dat ritme leggen we samen vast: in de zomer mag het gerust wat korter, in de winter wat langer. Heeft u een vaste datum in gedachten, bijvoorbeeld voor een feest, dan plan ik dat er graag tussen.',
  },
  {
    id: 2,
    question: 'Hoe vaak moeten zonnepanelen gereinigd worden?',
    answer:
      'Ongeveer om de drie jaar. Stof en aanslag kosten rendement, en een reiniging verdient zichzelf doorgaans terug. Hoe snel panelen vuil worden hangt af van uw omgeving: dicht bij een drukke weg of veel bomen gaat dat sneller. Ik bekijk ter plaatse wat in uw situatie zinvol is.',
  },
  {
    id: 3,
    question: 'Moet u thuis zijn als ik langskom?',
    answer:
      'Dat hoeft niet, zolang ik aan alle ramen kan. De buitenkant doe ik dus gerust terwijl u weg bent. Toch is het prettig als er iemand thuis is, zeker de eerste keer — dan overlopen we samen wat er precies moet gebeuren.',
  },
  {
    id: 4,
    question: 'Hoe snel krijgt u antwoord op uw aanvraag?',
    answer:
      'Binnen de acht uur, via e-mail, telefoon of WhatsApp — wat u het beste uitkomt. Meestal hoort u sneller van mij.',
  },
];

export default function FAQPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <Reveal stagger>
            <span className="eyebrow">Veelgestelde vragen</span>
            <h1 className="display">Goed om te weten</h1>
            <p className="lede">
              Wat klanten mij het vaakst vragen, kort en duidelijk beantwoord.
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

      <section className="band band--cream cta-band">
        <div className="wrap">
          <Reveal stagger>
            <h2 className="h2">Staat uw vraag er niet bij?</h2>
            <p className="lede">
              Stuur gerust een bericht. U krijgt binnen de acht uur een
              antwoord.
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
