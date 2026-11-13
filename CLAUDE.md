# CLAUDE.md – Rechnungslauf

Kontext für Claude Code zu diesem Projekt. Bitte vor dem Arbeiten lesen.

## Was ist das?

Rechnungslauf ist eine **reine Vanilla-HTML/CSS/JS-PWA** (kein Build-Schritt, kein
npm, keine Framework-Abhängigkeiten) zum Scannen, Verfolgen und Weiterleiten von
Arztrechnungen und Rezepten an Versicherung 1 und 2 (Beihilfe & PKV).
Konzept: **am Handy scannen, am PC verwalten** – verbunden über einen
OneDrive-/Google-Drive-Ordner des Nutzers (kein eigener Server).

## Dateien

- `index.html` – die **gesamte** App: Markup, CSS im `<head>` und das komplette
  JavaScript als ein großer Inline-`<script>`-Block am Ende.
- `sw.js`, `manifest.webmanifest`, `icon.svg` – die PWA-Shell.
- `README.md` – ausführliche Nutzer-Dokumentation (bei neuen Funktionen nachziehen).

Externe Libraries (Tesseract.js für OCR, jsPDF für PDFs) werden **zur Laufzeit per
jsdelivr-CDN** geladen, nicht lokal eingebunden.

## Hosting & Deploy

- GitHub (öffentlich): https://github.com/AGips1895/rechnungslauf
- Live (GitHub Pages, Branch `main`, Pfad `/`): https://agips1895.github.io/rechnungslauf/
- **Deployen = Datei ändern → committen → `git push`.** GitHub Pages baut
  automatisch neu (~1 Minute). Kein manueller Build-Schritt.

## WICHTIG: Service-Worker-Cache beim Ändern der Shell

`sw.js` liefert die App-Shell (`index.html`, `manifest.webmanifest`, `icon.svg`)
über einen Service Worker aus – **network-first** (online immer die aktuelle
Version, offline Rückfall auf den Cache).

➡️ **Bei jeder Änderung an einer Shell-Datei die `CACHE`-Konstante oben in `sw.js`
hochzählen** (z. B. `rechnungslauf-v9` → `v10`). Zur Zeit steht sie bei `v9`.
Das ist die saubere Absicherung, damit niemand eine veraltete gecachte Version sieht.

## Harte Regeln

- **Niemals echte Personennamen, Versicherungs- oder Gesundheitsdaten in den Code
  schreiben.** Das Repo ist öffentlich. Der Nutzer trägt solche Daten ausschließlich
  zur Laufzeit in der App ein; sie landen in `rechnungen.json` in seinem Cloud-Ordner,
  nie im Repository.
- JS-Änderungen **vor dem Ausliefern auf Syntax prüfen** (den Inline-`<script>`-Block
  extrahieren und z. B. mit `node --check` / `vm.Script` testen).
- Nach dem Push **verifizieren, dass die Änderung live ist** (die Datei von der
  Pages-URL abrufen und auf den erwarteten Inhalt prüfen).

## Datenmodell (liegt in `rechnungen.json` beim Nutzer, NICHT im Repo)

- `invoices[]` – Felder u. a.: `person`, `typ` (`'rechnung'` | `'rezept'`),
  `status` (`'neu'` | `'vers1'` | `'vers2'` | `'erledigt'`), `stageDates{}`,
  `manualPipeline`, `bezahlt`, `erstattungVers1` / `erstattungVers2`, `pdfPath`,
  `versandHistorie[]`, `deletedAt`.
- `settings` – `threshold` (Überfällig-Schwelle in Tagen) und `people[]` mit
  `name`, `rechnungVersicherungen` (fest 2), `rezeptVersicherungen` (1 oder 2).

## Technische Besonderheiten

- **Speichern nur mit verknüpftem Ordner:** Daten werden über die File System Access
  API gespeichert (nur Chrome/Edge Desktop). Ohne verknüpften Ordner zeigt die App
  oben einen Warnbanner und speichert nichts.
- **App-Passwort** = reine Zugangssperre pro Gerät (SHA-256-Hash in `localStorage`),
  **bewusst keine Verschlüsselung** der Daten – siehe README, Punkt 2.
- Rechnungen laufen bei allen Personen fest über 2 Versicherungen; nur bei Rezepten
  ist 1 oder 2 pro Person einstellbar.
