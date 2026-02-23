import "./globals.css";
import Navigation from "@/components/Navigation";
import WaterDrops from "@/components/WaterDrops";

export const metadata = {
  title: "MH Cleaning \u2013 Ramenwasser Maarten Hendrickx",
  description:
    "Professionele ramenwasser in Lommel en omgeving. MH Cleaning biedt propere afwerking, correcte prijs en snelle communicatie.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body>
        {/* Waterdruppels op alle pagina's */}
        <WaterDrops />

        {/* HEADER */}
        <header className="header">
          <Navigation />
        </header>

        {/* PAGINA-INHOUD */}
        <main className="main">{children}</main>

        {/* FOOTER */}
        <footer className="footer">
          <div className="container">
            <h3 className="footer-title">MH Cleaning</h3>
            <p className="footer-text">
              Ramenwasser Maarten Hendrickx
              <br />
              Lommel en omgeving
            </p>
            <p className="footer-copy">
              © {new Date().getFullYear()} MH Cleaning — Alle rechten
              voorbehouden.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
