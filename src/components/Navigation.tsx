'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const links = [
  { href: '/#diensten', label: 'Diensten' },
  { href: '/#resultaat', label: 'Resultaat' },
  { href: '/#over-mij', label: 'Over mij' },
  { href: '/faq', label: 'FAQ' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  // Menu sluiten met Escape en de pagina eronder niet laten meescrollen
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    const vorigeOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = vorigeOverflow;
    };
  }, [isOpen]);

  return (
    <nav className="wrap nav">
      <Link href="/" className="brand" onClick={closeMenu} aria-label="MH Cleaning, naar de homepage">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo website.jpg"
          alt="MH Cleaning"
          className="brand-logo"
          width={1280}
          height={426}
        />
      </Link>

      <button
        className="hamburger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Menu sluiten' : 'Menu openen'}
        aria-expanded={isOpen}
        aria-controls="hoofdmenu"
      >
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`} />
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`} />
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`} />
      </button>

      <div id="hoofdmenu" className={`nav-links ${isOpen ? 'open' : ''}`}>
        {links.map((link) => (
          <Link key={link.href} href={link.href} onClick={closeMenu}>
            {link.label}
          </Link>
        ))}
        {/* Alleen in het mobiele menu: op desktop staat de gouden knop ernaast */}
        <Link href="/contact" className="nav-link--mobile" onClick={closeMenu}>
          Offerte aanvragen
        </Link>
      </div>

      <Link href="/contact" className="btn btn--gold nav-cta">
        Offerte aanvragen
      </Link>

      {isOpen && <div className="nav-overlay" onClick={closeMenu} />}
    </nav>
  );
}
