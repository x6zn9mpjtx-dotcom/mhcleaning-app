'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="container nav">
      <Link href="/" className="logo" onClick={closeMenu}>
        MH Cleaning
      </Link>

      {/* Hamburger button - alleen zichtbaar op mobile */}
      <button 
        className="hamburger" 
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
      </button>

      {/* Navigation links */}
      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
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
