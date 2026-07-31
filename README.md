# Rechnungslauf – eigenständige App

Diese App läuft komplett unabhängig von Claude in deinem Browser – auf dem Windows-PC
und auf dem Android-Handy. Sie besteht aus 4 Dateien: `index.html`, `manifest.webmanifest`,
`sw.js`, `icon.svg`. Alle vier gehören zusammen und müssen im selben Ordner liegen.

## 1. Kostenlos hosten (nötig für Kamera, Installation & Ordner-Zugriff)

Kamera-Zugriff, "Als App installieren" und die Ordner-Verknüpfung funktionieren im
Browser nur über eine sichere Verbindung (HTTPS). Ein einfaches Doppelklicken der
`index.html` reicht dafür nicht. Am einfachsten geht das kostenlos über **GitHub Pages**:

1. Kostenlosen Account auf github.com anlegen (falls noch nicht vorhanden)
2. Neues **öffentliches** Repository erstellen, z. B. `rechnungslauf`
3. Die 4 Dateien hochladen ("Add file" → "Upload files")
4. Unter **Settings → Pages** die Quelle auf den `main`-Branch stellen und speichern
5. Nach ein bis zwei Minuten erreichbar unter:
   `https://DEIN-BENUTZERNAME.github.io/rechnungslauf/`

**Wichtig:** Das Repository ist öffentlich – der Programmcode ist für jeden einsehbar.
Deine tatsächlichen Rechnungsdaten sind davon nicht betroffen, da sie ausschließlich in
deinem eigenen OneDrive/Drive liegen, niemals im Code. Aus genau diesem Grund enthält
der Code auch **keine echten Namen** – Personen und ihre Versicherungs-Einstellungen
trägst du selbst in der App unter dem Tab "Personen" ein, sie landen mit den übrigen
Daten in deinem Cloud-Ordner.

## 2. App-Passwort (Zugangssperre, keine Verschlüsselung)

Bewusste Design-Entscheidung: Die App verschlüsselt die Daten **nicht** – Scans und
`rechnungen.json` liegen als normale, lesbare Dateien in deinem OneDrive/Drive, genau
wie wenn du direkt über die OneDrive-eigene Scan-Funktion fotografierst. Das App-Passwort
ist stattdessen eine reine **Zugangssperre pro Gerät**: Sie verhindert, dass jemand, der
dein entsperrtes Handy oder deinen PC kurz in die Hand nimmt, beim Öffnen der App sofort
die komplette Übersicht sieht.

- Beim ersten Öffnen auf einem Gerät legst du ein Passwort fest (mind. 4 Zeichen)
- Bei jedem weiteren Öffnen musst du es erneut eingeben
- **Passwort vergessen?** Über "Hier zurücksetzen" im Sperrbildschirm setzt du nur die
  Gerätesperre zurück – deine Rechnungsdaten in OneDrive/Drive sind davon nicht betroffen
- Das Passwort wird nur als Hashwert lokal auf dem jeweiligen Gerät gespeichert (nicht
  synchronisiert) – du kannst auf jedem Gerät dasselbe oder auch unterschiedliche
  Passwörter verwenden

**Was das NICHT schützt:** Wer direkt über die OneDrive-/Drive-App oder den Datei-Explorer
in deinen Cloud-Ordner schaut (statt über diese App), sieht die Dateien trotzdem – das ist
eine bewusst akzeptierte Einschränkung, siehe Gespräch zur Datenschutz-Abwägung.

## 3. Als App installieren

- **Windows (Chrome/Edge):** Adresse öffnen → Symbol "App installieren" in der
  Adressleiste → erscheint als eigenes Fenster/Icon
- **Android (Chrome):** Adresse öffnen → Menü (drei Punkte) → "Zum Startbildschirm hinzufügen"

## 4. OneDrive/Google-Drive-Ordner vorbereiten

Lege in deinem synchronisierten OneDrive- oder Google-Drive-Ordner einen Ordner an, z. B.:

```
OneDrive/Rechnungslauf/
```

Die App legt darin bei Bedarf automatisch diese Unterordner an:
- `eingang/` – neue Scans vom Handy, bis sie am PC importiert werden
- `scans/` – die Original-Rechnungsfotos, benannt nach `JJJJ-MM-TT_arzt-name_id_sN.jpg`
- `pdfs/` – Einzel-PDFs pro Rechnung/Rezept (siehe Punkt 8)
- `erstattungen/` – importierte Erstattungsvermerke der Versicherungen (siehe Punkt 9)
- `versand/` – Versand-Ordner mit den Einzeldateien für Versicherung 2 (siehe Punkt 9)
- `sammelexport/` – optionale Sammel-PDFs fürs eigene Archiv (siehe Punkt 10)

## 5. Personen einrichten

Bevor du scannst, im Tab **"⚙️ Personen"**:
1. "+ Person hinzufügen" – Name eintragen
2. Für jede Person festlegen: Läuft eine **Rechnung** über 1 oder 2 Versicherungen?
   Läuft ein **Rezept** über 1 oder 2 Versicherungen? (kann sich unterscheiden – z. B.
   Rechnungen über 2, Rezepte nur über 1 Versicherung)
3. "Personen speichern"

Das bestimmt automatisch, ob eine Rechnung/ein Rezept eine 3-stufige Pipeline
(Neu → Versicherung → Erledigt) oder 4-stufige Pipeline (Neu → Vers. 1 → Vers. 2 →
Erledigt) durchläuft. Bei Bedarf lässt sich das pro einzelnem Vorgang in dessen
Detail-Ansicht manuell überschreiben.

## 6. Einrichtung am PC

1. App öffnen, App-Passwort festlegen bzw. eingeben
2. Tab **"Verwalten"** → **"Ordner verknüpfen"** → den `Rechnungslauf`-Ordner auswählen
3. Fertig – Chrome/Edge fragt bei jedem Neustart einmal kurz nach der Zugriffsbestätigung,
   das ist normal

## 7. Nutzung am Handy

1. App öffnen, Passwort eingeben
2. Tab "Scannen" (auf dem Handy automatisch aktiv)
3. Person und Typ (Rechnung/Rezept) auswählen
4. Foto-Feld antippen → fotografieren; bei mehrseitigen Belegen "+ Weitere Seite
   fotografieren" wiederholt antippen
5. OCR liest Seite 1 aus und schlägt Datum/Betrag vor – bitte prüfen, Arzt ergänzen
6. **"Speichern & an OneDrive/Drive senden"** → im Freigabedialog OneDrive/Drive wählen →
   Ordner `Rechnungslauf/eingang` auswählen und bestätigen

## 8. Einzel-PDF je Rechnung/Rezept

Direkt in der Zeile jedes Vorgangs (Tab "Verwalten") gibt es ein 📄-Symbol – ein Klick
erzeugt sofort ein PDF genau dieser einen Rechnung (alle fotografierten Seiten enthalten)
und legt es unter `pdfs/` ab. Kein Häkchen-Setzen nötig. Der Pfad wird in der
Detail-Ansicht des Vorgangs angezeigt (Zeile antippen zum Aufklappen).

## 9. Erstattungsabgleich & Versand an Versicherung 2

Kernstück für den eigentlichen Zweck der App:

1. Erstattungsvermerk von Versicherung 1 erhalten (Scan oder Portal-Download)
2. Im Panel **"Erstattungsvermerk zuordnen"**: Ziel "Versicherung 1" wählen, Beleg
   hochladen, **"Vorgänge laden"** klicken – zeigt alle Vorgänge, die aktuell im Status
   "Vers. 1" stehen
3. Pro Zeile den erstatteten Betrag eintragen (der Beleg dient dir dabei als Referenz),
   nicht betroffene Zeilen per Häkchen abwählen
4. **"Erstattungen speichern"** – die Beträge landen an der jeweiligen Rechnung, die
   Differenz zum Rechnungsbetrag wird automatisch in der Detail-Ansicht berechnet
5. Direkt im Anschluss: **"Ausgewählte für Versicherung 2 exportieren & versenden"**
   (erscheint nur, wenn diese Vorgänge laut Personen-Einstellung auch über Versicherung 2
   laufen) – erzeugt **einzelne PDF-Dateien** (eine je Rechnung) plus eine Kopie des
   Erstattungsvermerks, alle gemeinsam in einem Ordner `versand/JJJJ-MM-TT_Vers2/`.
   Diesen Ordner öffnest du im Versicherungsportal und lädst alle Dateien einzeln hoch
   (kein Sammel-PDF, da manche Portale das nicht akzeptieren)
6. Status der Vorgänge springt automatisch auf "Vers. 2"
7. Kommt der Erstattungsvermerk von Versicherung 2: gleicher Ablauf, Ziel "Versicherung 2"
   wählen, Beträge zuordnen, **"Ausgewählte als erledigt markieren"** setzt den
   Abschluss-Status

Vorgänge, die laut Personen-Einstellung nur über eine Versicherung laufen (z. B. Rezepte
von Person 1), zeigen nach der Erstattungs-Zuordnung direkt den Button "Als erledigt
markieren" statt des Versand-Buttons, da für sie kein zweiter Schritt nötig ist.

## 10. Weitere Übersicht

- **Filter:** nach Status, nach Person, nach Bezahlt-Status kombinierbar
- **"Bezahlt"-Kennzeichnung:** Pille in jeder Zeile, per Klick umschaltbar – unabhängig
  vom Versicherungs-Status, da du ja unabhängig davon zahlst
- **CSV-Export:** Button "Als CSV exportieren" – exportiert die aktuell gefilterte
  Liste inkl. Summenzeile, öffnbar in Excel; enthält auch Erstattungsbeträge und
  berechnete Differenz je Zeile
- **Sammel-PDF fürs eigene Archiv:** weiterhin per Checkbox + "Sammel-PDF erstellen"
  möglich, für Fälle, in denen du selbst mehrere Belege in einer Datei zusammenfassen
  möchtest (landet in `sammelexport/`)
- **Pfad-Transparenz:** jede Zeile lässt sich antippen (auf Arzt/Notiz klicken) und zeigt
  dann den Pfad des Einzel-PDFs sowie die Versand-Historie als Text zum Nachschlagen –
  ein direkter Klick-Link zum Datei-Explorer ist aus Browser-Sicherheitsgründen nicht
  möglich

## 11. Papierkorb

Ein Vorgang löschen (🗑 in der Zeile) verschiebt ihn zunächst nur in den Tab
**"🗑 Papierkorb"** – nichts geht sofort verloren:

- **Wiederherstellen (↺):** der Vorgang erscheint wieder ganz normal in der Übersicht,
  mit allen bisherigen Daten (Status, Erstattungen, Scans etc.)
- **Endgültig löschen (🗑 im Papierkorb):** entfernt den Eintrag wirklich – dabei werden
  auch die zugehörigen Scan-Bilder (`scans/`) und ein eventuell erzeugtes Einzel-PDF
  (`pdfs/`) aus dem Ordner gelöscht. Das lässt sich **nicht** rückgängig machen
- **"Papierkorb komplett leeren":** macht dasselbe auf einmal für alle Einträge im
  Papierkorb

Solange ein Vorgang nur im Papierkorb liegt (nicht endgültig gelöscht), taucht er in
keiner Statistik, keinem Filter und keinem Export der normalen Übersicht mehr auf.

## Grenzen, die du kennen solltest

- **Browser-Voraussetzung:** Die Ordner-Verknüpfung (File System Access API)
  funktioniert nur in Chrome/Edge auf dem Desktop, nicht in Firefox oder Safari.
- **OCR-Genauigkeit:** Tesseract.js läuft lokal, ist aber nicht so genau wie
  Cloud-Dienste. Erkannte Werte sind ein Entwurf, kein Endergebnis.
- **Kein Echtzeit-Sync:** Die Verbindung läuft über die normale Synchronisierung von
  OneDrive/Google Drive, nicht in Echtzeit.
- **Ein Nutzer, mehrere Personen, ein Gerätepaar:** Die App ist dafür gebaut, dass eine
  Person die Verwaltung für mehrere Angehörige übernimmt – nicht dafür, dass mehrere
  Personen unabhängig voneinander gleichzeitig an derselben Datei arbeiten.
- **Manuelle Erstattungs-Zuordnung:** Bewusst keine automatische Texterkennung der
  Erstattungsvermerke, da Formulare je Versicherung unterschiedlich aussehen und eine
  automatische Zuordnung fehleranfällig wäre – die Beträge werden manuell eingetragen,
  mit dem importierten Beleg als Referenz daneben.
- **Keine Verschlüsselung:** wie unter Punkt 2 beschrieben, eine bewusste Entscheidung
  angesichts des Ziels, dass Einzel-PDFs ohnehin offen in OneDrive liegen sollen.
