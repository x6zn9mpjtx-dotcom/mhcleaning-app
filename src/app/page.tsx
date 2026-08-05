'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useCallback } from "react";

export default function HomePage() {

  // ── Scroll-triggered animations via Intersection Observer ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.scroll-animate').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // ── Water ripple effect on buttons ──
  // De ripple is puur decoratief: de link doet gewoon zijn eigen werk, zodat
  // ctrl+klik, middenklik en snelle navigatie blijven werken.
  const handleRipple = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2.5;

    // Bij toetsenbordbediening is er geen muispositie; start dan vanuit het midden
    const originX = e.clientX || rect.left + rect.width / 2;
    const originY = e.clientY || rect.top + rect.height / 2;

    const ripple = document.createElement('span');
    ripple.className = 'water-ripple';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${originX - rect.left - size / 2}px`;
    ripple.style.top = `${originY - rect.top - size / 2}px`;
    ripple.addEventListener('animationend', () => ripple.remove());

    button.appendChild(ripple);
  }, []);

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
              veranda&apos;s en zonnepanelen.
            </p>

            <ul className="hero-list">
              <li>Steeds netjes afgewerkt met oog voor detail</li>
              <li>Snelle communicatie via WhatsApp</li>
              <li>Correcte prijs &amp; duidelijke afspraken</li>
              <li>Altijd vriendelijk</li>
            </ul>

            <div className="hero-buttons">
              <Link href="/contact" className="btn-primary ripple-btn" onClick={handleRipple}>
                Vrijblijvende offerte
              </Link>
              <a
                href="https://wa.me/32495783110"
                className="btn-outline-gold ripple-btn"
                onClick={handleRipple}
                target="_blank"
                rel="noopener noreferrer"
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

      {/* REGIO – scroll-triggered */}
      <section className="section section-drops scroll-animate">
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

      {/* WAAROM MH CLEANING – scroll-triggered */}
      <section className="section section-light scroll-animate">
        <div className="container">
          <h2 className="section-title">Waarom kiezen voor MH Cleaning?</h2>

          <div className="usp-grid">
            {[
              {
                icon: "✨",
                title: "Propere afwerking",
                text: "Steeds netjes afgewerkt met oog voor detail—binnen én buiten.",
              },
              {
                icon: "💬",
                title: "Snelle communicatie",
                text: "Altijd snel antwoord via WhatsApp of e-mail.",
              },
              {
                icon: "💰",
                title: "Correcte prijs",
                text: "Duidelijke, eerlijke prijzen zonder verrassingen en zonder verplichtingen.",
              },
              {
                icon: "😊",
                title: "Altijd vriendelijk",
                text: "Een vaste, vriendelijke ramenwasser die je kent en vertrouwt.",
              },
            ].map((u, index) => (
              <div 
                key={u.title} 
                className="card scroll-animate"
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                <div className="card-icon">{u.icon}</div>
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
