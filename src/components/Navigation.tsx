'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

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
    <nav className="container nav">
      <Link href="/" className="logo" onClick={closeMenu}>
        MH Cleaning
      </Link>

      {/* Hamburger button - alleen zichtbaar op mobile */}
      <button
        className="hamburger"
        onClick={toggleMenu}
        aria-label={isOpen ? 'Menu sluiten' : 'Menu openen'}
        aria-expanded={isOpen}
        aria-controls="hoofdmenu"
      >
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
      </button>

      {/* Navigation links */}
      <div id="hoofdmenu" className={`nav-links ${isOpen ? 'open' : ''}`}>
        <Link href="/" onClick={closeMenu}>Home</Link>
        <Link href="/diensten" onClick={closeMenu}>Diensten</Link>
        <Link href="/faq" onClick={closeMenu}>FAQ</Link>
        <Link href="/contact" onClick={closeMenu}>Contact</Link>
      </div>

      {/* Overlay voor mobile menu */}
      {isOpen && <div className="nav-overlay" onClick={closeMenu}></div>}
    </nav>
  );
}
