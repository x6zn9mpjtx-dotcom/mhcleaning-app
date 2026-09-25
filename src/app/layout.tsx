import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'MH Cleaning – Ramenwasser in Lommel',
  description:
    'Vaste ramenwasser voor woningen en bedrijven in Lommel en omgeving. Persoonlijk opgevolgd, met oog voor elk detail.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <header className="site-header">
          <Navigation />
        </header>

        <main className="main">{children}</main>

        <footer className="site-footer">
          <div className="wrap">
            <div className="footer-grid">
              <div>
                <div className="brand">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/logo goud rond.jpg"
                    alt=""
                    className="brand-mark"
                    width={38}
                    height={38}
                  />
                  <span className="brand-name">MH Cleaning</span>
                </div>
                <p className="footer-tag">
                  Ramenwasser in Lommel en omgeving. Vaste klanten, vaste
                  routes, persoonlijk opgevolgd.
                </p>
              </div>

              <div className="footer-col">
                <h4>Contact</h4>
                <p>
                  <a href="https://wa.me/32495783110">
                    +32 495 78 31 10 (WhatsApp)
                  </a>
                </p>
                <p>
                  <a href="mailto:info@mhcleaning.be">info@mhcleaning.be</a>
                </p>
              </div>

              <div className="footer-col">
                <h4>Onderneming</h4>
                <p>MH Cleaning — Maarten Hendrickx</p>
                <p>Lommel</p>
              </div>
            </div>

            <div className="footer-bottom">
              <span>© {new Date().getFullYear()} MH Cleaning</span>
              <div className="footer-social">
                <a href="/faq">Veelgestelde vragen</a>
                <a href="/contact">Offerte aanvragen</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
