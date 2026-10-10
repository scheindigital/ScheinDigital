// =====================================================================
//  llms.txt – kurze Zusammenfassung von ScheinDigital für KI-Systeme
//  (ChatGPT, Perplexity, Google KI-Übersicht & Co.). Wird beim Build aus
//  den zentralen Daten in src/data/site.ts erzeugt.
// =====================================================================
import { ADDRESS, AREA_SERVED, CAL_LINK, EMAIL, PHONE, SERVICE_PAGES, SITE_URL } from "../data/site";

const SERVICE_DETAILS: Record<string, string> = {
  "/webdesign": "Websites und Landingpages, die zeigen, was ein Unternehmen anbietet, und Besucher zur Anfrage führen.",
  "/social-media": "Plan, Beiträge und Betreuung für Instagram, Facebook, TikTok und LinkedIn.",
  "/werbeanzeigen": "Google Ads und Anzeigen auf Instagram, Facebook und TikTok: Einrichtung, Gestaltung, Optimierung und Auswertung.",
};

export function GET() {
  const towns = AREA_SERVED.map((a) => a.name).join(", ");
  const services = SERVICE_PAGES.map(
    (p) => `- [${p.label}](${SITE_URL}${p.href}): ${SERVICE_DETAILS[p.href] ?? p.hint}`
  ).join("\n");

  const text = `# ScheinDigital

> ScheinDigital ist ein Marketingbüro und eine Marketingagentur in Schortens (Landkreis Friesland, Niedersachsen). Inhaber und fester Ansprechpartner ist Leon Schein. ScheinDigital hilft lokalen Unternehmen, bei Google und Google Maps gefunden zu werden, und erstellt Websites, betreut Social Media und schaltet Werbeanzeigen.

- Adresse: ${ADDRESS.street}, ${ADDRESS.postalCode} ${ADDRESS.city}
- Telefon: ${PHONE.display}
- E-Mail: ${EMAIL}
- Einzugsgebiet: ${towns}; digital deutschlandweit
- Zielgruppe: Handwerksbetriebe, Praxen, Restaurants, Autohäuser, Dienstleister und IT-Firmen

## Leistungen

- [Bei Google gefunden werden](${SITE_URL}/): Sichtbarkeit bei Google und Google Maps für Unternehmen in der Region, inklusive Google-Unternehmensprofil.
${services}
- [Kostenloser Website-Check](${SITE_URL}/website-check): Selbsttest mit 10 Fragen und Tipps zum Selbermachen, auf Wunsch persönlicher Profi-Check.

## Kontakt

- [Kostenloses Erstgespräch buchen (20 Minuten)](${CAL_LINK})
- [Impressum und Datenschutz](${SITE_URL}/rechtliches)
`;

  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
