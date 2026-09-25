import Link from 'next/link';
import Reveal from '@/components/Reveal';

export const metadata = {
  title: 'Privacyverklaring – MH Cleaning',
  description:
    'Welke gegevens MH Cleaning verzamelt via de website, waarvoor ze gebruikt worden en welke rechten u heeft.',
};

export default function PrivacyPage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <Reveal stagger>
            <span className="eyebrow">Privacy</span>
            <h1 className="display">Privacyverklaring</h1>
            <p className="lede">
              Wat er met uw gegevens gebeurt wanneer u het offerteformulier
              invult.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="band band--cream">
        <div className="wrap wrap--narrow prose">
          <h2>Wie verwerkt uw gegevens?</h2>
          <p>
            MH Cleaning, Maarten Hendrickx, Klotstraat 16, 3920 Lommel.
            Ondernemingsnummer BE 0717.970.343. U bereikt mij op{' '}
            <a href="mailto:info@mhcleaning.be">info@mhcleaning.be</a> of via
            WhatsApp op +32 495 78 31 10.
          </p>

          <h2>Welke gegevens en waarvoor?</h2>
          <p>
            Wanneer u het offerteformulier invult, verstuurt u uw naam,
            e-mailadres, telefoonnummer, uw bericht en eventueel foto&apos;s van
            uw woning. Die gegevens gebruik ik enkel om uw aanvraag te
            beantwoorden en een prijs op te maken. De foto&apos;s dienen om in
            te schatten om hoeveel werk het gaat.
          </p>
          <p>
            Ik gebruik uw gegevens niet voor reclame en geef ze niet door aan
            derden voor commerciële doeleinden.
          </p>

          <h2>Waar komen ze terecht?</h2>
          <p>
            Uw aanvraag wordt als e-mail verstuurd naar mijn mailbox en blijft
            daar bewaard. De website houdt zelf geen database bij: buiten die
            e-mail wordt er niets van uw gegevens opgeslagen. Voor het
            versturen van e-mail doe ik een beroep op Microsoft (Outlook).
          </p>
          <p>
            U ontvangt ook zelf een bevestigingsmail op het adres dat u opgaf,
            zodat u weet dat de aanvraag goed is aangekomen.
          </p>

          <h2>Hoe lang bewaar ik ze?</h2>
          <p>
            Wordt u klant, dan hou ik uw contactgegevens bij zolang we
            samenwerken, en daarna nog zolang de wet mij verplicht mijn
            boekhouding te bewaren. Komt er geen samenwerking uit, dan verwijder
            ik uw aanvraag en de bijhorende foto&apos;s binnen het jaar.
          </p>

          <h2>Beveiliging tegen misbruik</h2>
          <p>
            Om te vermijden dat het formulier door geautomatiseerde programma&apos;s
            wordt misbruikt, onthoudt de server tijdelijk uw IP-adres — maximaal
            een kwartier, enkel om te tellen hoeveel aanvragen er binnenkomen.
            Daarna verdwijnt het. Dat adres wordt nergens bewaard of aan uw
            aanvraag gekoppeld.
          </p>

          <h2>Cookies en meetprogramma&apos;s</h2>
          <p>
            Deze website plaatst geen cookies en gebruikt geen
            bezoekersstatistieken. Er wordt dus niet bijgehouden welke
            pagina&apos;s u bekijkt.
          </p>
          <p>
            De lettertypes van de site worden wel opgehaald bij Google Fonts.
            Daardoor komt uw IP-adres bij Google terecht op het moment dat u de
            pagina opent. Dat is nodig om de website weer te geven.
          </p>

          <h2>Uw rechten</h2>
          <p>
            U mag altijd vragen welke gegevens ik van u heb, ze laten
            verbeteren, of ze laten verwijderen. Eén bericht naar{' '}
            <a href="mailto:info@mhcleaning.be">info@mhcleaning.be</a> volstaat.
          </p>
          <p>
            Bent u niet tevreden over hoe ik met uw gegevens omga, dan kunt u
            klacht indienen bij de Gegevensbeschermingsautoriteit,
            Drukpersstraat 35, 1000 Brussel.
          </p>

          <p className="prose-meta">
            Laatst bijgewerkt op 25 september 2026.
          </p>
        </div>
      </section>

      <section className="band band--sand cta-band">
        <div className="wrap">
          <Reveal stagger>
            <h2 className="h2">Nog een vraag?</h2>
            <p className="lede">
              Stuur gerust een bericht, dan kijk ik er samen met u naar.
            </p>
            <div className="btn-row">
              <Link href="/contact" className="btn btn--gold">
                Neem contact op
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
