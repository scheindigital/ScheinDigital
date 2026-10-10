# ScheinDigital – Projektnotiz für Claude

Stand: 10. Oktober 2026. Ersetzt die alten Übergabe-Dateien.
Diese Datei liegt im öffentlichen Repo: keine Passwörter, Server-IPs, Zugangsdaten oder privaten E-Mail-Adressen eintragen.

## Kontext

- **Wer:** Leon Schein, Einzelunternehmer, ScheinDigital (Marketingbüro / Marketingagentur) in Schortens. Kontaktdaten stehen in `src/data/site.ts`.
- **Leon ist nicht technisch.** Änderungen in Alltagssprache erklären (was sich für Besucher/Google ändert), ihm sagen, was er sich anschauen soll. Er prüft visuell und gibt Feedback. Im Chat „du“.
- **Positionierung:** „Ich finde heraus, wo Ihnen online Kunden verloren gehen, und setze die passende Lösung um.“ Leistungen werden über Kundenprobleme präsentiert.
- **Ziel der Website:** Lead-Maschine. Primärer CTA = kostenloses Erstgespräch (Cal.com, **20 Minuten**), sekundär Newsletter.
- **SEO-Ziel:** Platz 1 in Schortens für „Marketingbüro Schortens“ / „Marketingagentur Schortens“. Die **Startseite ist die Local-SEO-Seite** (Hauptleistung „Bei Google gefunden werden“). Weitere Leistungen haben eigene Unterseiten.

## Technik

- **Astro 6.3.7** (Update auf Astro 7 bewusst noch nicht gemacht – Major-Update, separat mit Test).
- **Hosting:** eigener VPS, Deployment über **Coolify** (Nixpacks: `npm install` + `npm run build`, Auslieferung über nginx). Coolify deployt nur, was auf GitHub `main` liegt.
- **Repo:** `github.com/scheindigital/ScheinDigital`, Branch `main`, **öffentlich**.
- **Terminbuchung:** Cal.com, Event „Kostenloses Erstgespräch“ (20 Min., seit 10.10.2026 auch in Cal.com auf 20 gestellt).
- **Newsletter:** Formular → n8n-Webhook (self-hosted) → Brevo Double-Opt-In → Redirect `/?newsletter=bestaetigt` → Banner auf der Startseite.
- **Kein Tracking, keine Cookies** (so steht es in der Datenschutzerklärung). Kein YouTube/Vimeo/Instagram-Embed ohne DSE-Anpassung.

## Aufbau des Projekts

| Datei | Inhalt |
|---|---|
| `src/data/site.ts` | **Zentrale Daten:** Links (Cal.com, WhatsApp), E-Mail, Telefon, Adresse (NAP = identisch zum Google-Profil!), `AREA_SERVED`, `BUSINESS`-Schema, `SERVICE_PAGES` (Header-Menü „Leistungen“), `faqSchema()` |
| `src/layouts/BaseLayout.astro` | Grundgerüst jeder Seite: Head (Title, Description, Canonical, OG/Twitter, Schema), Header, `<main>`, Footer |
| `src/styles/global.css` | Globale Styles (Typo, Buttons, Sektionen, Karten, Hero-Grundgerüst, Pills) |
| `src/components/Header.astro` | Header mit Dropdown „Leistungen“ (Desktop) und ☰-Menü (Handy, ≤800px). Auf ≤520px nur Logo ohne Schriftzug |
| `src/components/Footer.astro` | Minimaler Footer (Marke, Kontakt, Impressum/Datenschutz). Keine Social-Links |
| `src/components/ServiceHero.astro` | Kopfbereich der Unterseiten (kleine H1, Aussage, Subline, Button, Häkchen-Liste) |
| `src/components/ProblemSection.astro` | „Woran es meistens hakt“: Problem-Zitat → Ursache → ein Satz |
| `src/components/ProcessSection.astro` | Ablauf in Schritten (01, 02, 03) |
| `src/components/FaqSection.astro` | Sichtbare FAQ (Schema erzeugt die Seite mit `faqSchema()` aus derselben Liste) |
| `src/components/CtaSection.astro` | Finaler CTA: Erstgespräch + WhatsApp |
| `src/pages/index.astro` | Startseite. `SERVICES` (Karten + `hasOfferCatalog`, optional `link` zur Unterseite), `FAQ`, `PROCESS` |
| `src/pages/webdesign.astro` | Unterseite Webdesign |
| `src/pages/social-media.astro` | Unterseite Social Media Marketing (Instagram, Facebook, TikTok, LinkedIn; keine Foto-/Videodrehs vor Ort) |
| `src/pages/werbeanzeigen.astro` | Unterseite Google Ads & Werbeanzeigen (Google, Meta, TikTok – kein LinkedIn; Werbebudget zahlt der Kunde direkt) |
| `src/pages/rechtliches.astro` | Impressum + Datenschutz (`noindex`). Rechtstexte nur nach Rücksprache ändern |
| `src/pages/sitemap.xml.ts` | Erzeugt `/sitemap.xml` automatisch aus allen Seiten in `src/pages` (außer `EXCLUDE`) |

Texte von Leistungen und FAQ immer **in den Daten-Listen oben in der jeweiligen Seite** ändern – dann bleiben sichtbarer Text und Schema identisch.

### Neue Leistungs-Unterseite anlegen

1. `src/pages/webdesign.astro` als Vorlage kopieren, Texte, `DESCRIPTION`, Schema (`Service`), `path` anpassen.
2. In `src/data/site.ts` → `SERVICE_PAGES` eintragen (erscheint dann im Header-Menü).
3. In `src/pages/index.astro` → `SERVICES` beim passenden Eintrag `link` setzen (Karten-Link + Schema-URL).
4. Sitemap passiert automatisch. Nach dem Deploy in der Search Console „Indexierung beantragen“.

## Deployment-Workflow

1. Änderungen machen, `npm run build` muss fehlerfrei durchlaufen.
2. Optisch prüfen (Desktop, Tablet ~900px, Handy 375px und 320px). Bei Umbauten: vorher/nachher vergleichen, dass nichts ungewollt anders aussieht.
3. **Commit und Push nur nach Leons ausdrücklichem Okay** („pushen“).
4. Danach Leon erinnern: Coolify → Anwendung → **Redeploy** → auf **Success** warten → scheindigital.de mit **Strg+F5** laden. Nach dem Deploy die Live-Seite prüfen (Status, Sitemap, Canonical, Schema, CSS).
5. Zurückrollen: auf GitHub den Commit öffnen → „Revert“, dann Redeploy.

## Technische Stolperfallen

- **Astro-Scoped-CSS greift nicht für per JavaScript eingefügte Elemente** → `:global(...)` (z. B. `.video-player :global(video)` für das Hero-Video).
- Seiten-Styles sind scoped und schlagen globale Styles. Abstands-Modifier wie `.contact-section` / `.newsletter-section` stehen bewusst in `global.css`, damit die Handy-Regel von `.section` sie wieder überschreibt.
- Astro komprimiert HTML: Ein Zeilenumbruch direkt vor einem Inline-Link kann das Leerzeichen schlucken → Text und `<a>` auf dieselbe Zeile.
- Interaktive Elemente nicht in einen `<button>` verschachteln.
- **Windows:** Beendete `npm run dev`-Prozesse laufen manchmal als verwaiste Node-Prozesse weiter und liefern veraltetes CSS aus (neuer Server weicht dann auf 4322/4323 aus). Ports prüfen und alte Prozesse beenden; im Zweifel mit `npm run build` + `npm run preview` testen.
- Canonicals ohne Schrägstrich am Ende (`/webdesign`), der Server liefert beide Varianten aus.

## Arbeitsregeln für Texte

- Kundentexte mit **„Sie“**, Perspektive **„ich“** (Solo-Unternehmer, persönlicher Ansprechpartner).
- **Keine Emojis**, **keine Fachbegriffe** für Kunden („bei Google gefunden werden“ statt „Local SEO“).
- **Keine erfundenen Zahlen, Referenzen oder Versprechen.** Aussagen über Leons Angebot nur, wenn er sie bestätigt hat – im Zweifel nachfragen und in der Zusammenfassung zur Prüfung markieren.
- **Kein versteckter Text / Cloaking.** Keywords nur in Title, Meta, Schema, Alt-Texten und sichtbarem Text. Schreibweise immer „Marketingagentur“.
- **Weniger Text, mehr Action** (Business-Mastery-Checkliste): kurze Sätze, starke Headline, nichts ablenken, jede Sektion führt zum Erstgespräch, am Ende CTA mit kostenlosem Mehrwert.
- **Bewusste Abweichungen von der Checkliste:** Telefonnummer sichtbar (NAP fürs Map Pack, aber kein Haupt-Button); minimaler Footer unter dem CTA (Impressum/Datenschutz Pflicht); kurzer Ansprechpartner-Block auf der Startseite.
- Design-Änderungen nur innerhalb von Astro (kein Wechsel zu Framer o. ä.).

## Google-Unternehmensprofil & Search Console

- Profilname nur „ScheinDigital“. Beschreibung ohne URLs/Telefonnummern, Leistungsname max. 120 Zeichen.
- Leistungen im Profil: Website-Erstellung & -Bearbeitung, Landingpages & Onepager, Logo- & Grafikdesign, Marketingberatung, Bei Google gefunden werden, Google Ads. **„Social Media Marketing“ fehlt noch:** Am 10.10.2026 lehnte Google das Speichern mehrfach mit „Es gab ein Problem“ ab (mit und ohne VPN, unter zwei Kategorien).
- Google meldet im Dashboard „Ihre Unternehmenskategorie wurde von Google aktualisiert“ – „Werbeagentur“ fehlt in der aktuellen Kategorienliste. Klären.
- Search Console: Domain-Property. Am 10.10.2026 Indexierung für `/webdesign`, `/social-media`, `/werbeanzeigen` beantragt und `sitemap.xml` neu eingereicht.

## Wettbewerb & Case Study

- Juni 2026: Map Pack „marketingbüro schortens“ → erster organischer Eintrag direkt unter zwei Anzeigen. Korrekt formulieren: „Erster organischer Eintrag im Google Map Pack für ‚Marketingbüro Schortens‘, direkt unter den bezahlten Anzeigen“ – **nicht** „Rank 1 organisch“.
- Case Study erst veröffentlichen, wenn der Verlauf dokumentiert ist: wöchentlich Map-Pack-Position, GSC-Werte, Bewertungen, **Cal.com-Buchungen pro Woche** (Vergleich vorher/nachher ab 9. Oktober 2026).

## Offene Punkte

1. Google-Profil: „Social Media Marketing“ als Leistung ergänzen (siehe oben) und Kategorie „Werbeagentur“ prüfen.
2. **Bewertungen sammeln** – wichtigster Hebel fürs Map Pack. Nur echte Kunden, auf jede Bewertung antworten.
3. Wöchentlich ein Google-Beitrag (Muster: Problem → Tipp → Erstgespräch) und wöchentliche Case-Study-Dokumentation.
4. Später: Case Study als Sektion/Seite, Brevo-Willkommensmail, Footer-Spalte „Leistungen“ (interne Links), Astro-7-Update separat mit Test.
5. Rechtliches: DSE einmal mit einem Generator gegenprüfen; IONOS-AVV ablegen; USt-IdNr. ins Impressum, falls vorhanden.
