// =====================================================================
//  ScheinDigital – zentrale Daten für alle Seiten
//  Name, Adresse und Telefon (NAP) müssen exakt zum Google-Unternehmensprofil
//  passen. Hier ändern, dann stimmen Header, Footer, Standort und Schema
//  auf allen Seiten automatisch überein.
// =====================================================================
export const SITE_URL = "https://scheindigital.de";

export const CAL_LINK = "https://cal.com/leon-schein/erstgespraech";
export const WHATSAPP = "https://wa.me/4917641880516";
export const EMAIL = "leon@scheindigital.de";

export const PHONE = {
  display: "+49 176 41880516",
  href: "tel:+4917641880516",
  schema: "+4917641880516",
};

export const ADDRESS = {
  street: "Karl-Carstens-Str. 16",
  postalCode: "26419",
  city: "Schortens",
  region: "Niedersachsen",
  country: "DE",
};

// Leistungs-Unterseiten im Header-Menü "Leistungen".
// Neue Unterseite anlegen, dann hier eintragen.
export const SERVICE_PAGES = [
  { href: "/webdesign", label: "Webdesign", hint: "Websites & Landingpages" },
  { href: "/social-media", label: "Social Media", hint: "Instagram, Facebook, TikTok & LinkedIn" },
];

export const AREA_SERVED = [
  { "@type": "City", "name": "Schortens" },
  { "@type": "City", "name": "Jever" },
  { "@type": "City", "name": "Sande" },
  { "@type": "City", "name": "Wittmund" },
  { "@type": "City", "name": "Wilhelmshaven" },
  { "@type": "AdministrativeArea", "name": "Friesland" },
];

// Grunddaten des Unternehmens fürs Schema-Markup. Die Startseite ergänzt
// Beschreibung und Leistungskatalog, Unterseiten verweisen als "provider" darauf.
export const BUSINESS = {
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#business`,
  "name": "ScheinDigital",
  "url": `${SITE_URL}/`,
  "email": EMAIL,
  "telephone": PHONE.schema,
  "image": `${SITE_URL}/scheindigital-og.png`,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": ADDRESS.street,
    "postalCode": ADDRESS.postalCode,
    "addressLocality": ADDRESS.city,
    "addressRegion": ADDRESS.region,
    "addressCountry": ADDRESS.country,
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 53.535343,
    "longitude": 7.958019,
  },
  "areaServed": AREA_SERVED,
};

export type FaqItem = { q: string; a: string };

// Erzeugt das FAQPage-Schema aus denselben Fragen, die sichtbar auf der Seite stehen.
export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };
}
