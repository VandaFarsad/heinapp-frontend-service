# Calendar Feature

Vollständige Kalender-Anwendung mit CalDAV-Integration für die Heina Baugemeinschafts-App.

## 📋 Übersicht

Der Kalender ermöglicht es Benutzern, Events zu erstellen, zu bearbeiten und zu löschen. Alle Events werden über CalDAV synchronisiert und sind mit externen Kalender-Apps kompatibel. Wiederkehrende Termine werden über den RFC 5545 RRULE-Standard unterstützt.

## 🏗️ Struktur

```
app/calendar/
├── page.tsx                  # Haupt-Kalender-Seite
├── error.tsx                 # Error Boundary
├── components/
│   ├── index.ts              # Zentrale Exports
│   ├── CalendarComponent.tsx # FullCalendar Integration
│   ├── CalendarHeader.tsx    # Kalender-Header mit Actions
│   ├── calendar.css          # Custom FullCalendar Styles
│   ├── ErrorBanner.tsx       # Fehler-Anzeige Banner
│   └── EventModal/
│       ├── index.ts              # Modal Exports
│       ├── EventModal.tsx        # Container-Komponente
│       ├── EventView.tsx         # Event-Anzeige (inkl. Wiederholungstext)
│       ├── EventForm.tsx         # Event-Formular
│       ├── RecurrenceInput.tsx   # UI für Wiederholungsregeln
│       ├── DeleteConfirmModal.tsx # Lösch-Bestätigung
│       └── useEventModal.ts      # Hook für Modal-Logic
├── utils/
│   └── calendarHelpers.ts    # RRULE-Parsing, Datumskonvertierung, Raum-Farben
└── hooks/
    └── useCalendarEvents.ts  # Event-laden, -speichern und -löschen
```

Authentifizierung wird über `app/components/AuthGuard.tsx` geschützt (global, nicht calendar-spezifisch).

## 🚀 Features

### ✅ Event-Management

- **Event-Erstellung**: Klick auf freie Termine oder "Neuer Termin" Button
- **Event-Bearbeitung**: Klick auf bestehende Events
- **Event-Löschung**: Mit Sicherheitsabfrage
- **All-Day Events**: Support für ganztägige Termine
- **URL-Links**: Sichere Anzeige von Meeting-Links (Zoom, Teams, etc.)

### ✅ Wiederkehrende Termine (RRULE)

Unterstützt den RFC 5545 RRULE-Standard mit folgenden Mustern:

| Muster | Beispiel RRULE |
|---|---|
| Jeden Montag und Freitag | `FREQ=WEEKLY;BYDAY=MO,FR` |
| Jeden 2. Monat | `FREQ=MONTHLY;INTERVAL=2` |
| 10 mal täglich | `FREQ=DAILY;COUNT=10` |
| Bis zu einem Datum | `FREQ=WEEKLY;UNTIL=20261231T235959Z` |

Konfigurierbar über `RecurrenceInput`: Frequenz, Intervall, Wochentage (bei wöchentlich), Endoptionen (nie / nach N Terminen / bis Datum).

### ✅ CalDAV-Integration

- **Bidirektionale Synchronisation**: Events erscheinen in externen Kalender-Apps
- **iCal-Kompatibilität**: Standard-konforme Event-Serialisierung
- **Master-Events**: Backend speichert nur Master-Events (kein `expand`); FullCalendar expandiert wiederkehrende Termine client-seitig
- **UPSERT-Sync**: `bulk_create(update_conflicts=True)` verhindert Duplikate

### ✅ User Experience

- **Raumfarben**: Grün = Erdgeschoss, Blau = Dach, Grau = Sonstige (zentral in `ROOM_COLORS`)
- **Ganztägige Events**: Farbiger Hintergrund mit weißer Schrift
- **Nicht-ganztägige Events**: Farbiger Punkt + Uhrzeit + Titel (kein Hintergrund)
- **Vergangene Events**: Reduzierte Deckkraft (opacity 0.5)
- **Responsive Design**: Mobile und Desktop optimiert
- **Loading States**: Visuelles Feedback bei API-Calls
- **Error Handling**: Benutzerfreundliche Fehlermeldungen
- **Role-based Access**: Nur Members und Admins sehen den Kalender

## 🔧 Technische Details

### Event Interface (`types/calendar.ts`)

```typescript
interface CalendarEvent {
  id: string;         // = uid vom Backend
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  description?: string;
  location?: string;
  url?: string;
  rrule?: string;     // RFC 5545 Wiederholungsregel
  exdate?: string;    // Ausnahme-Daten (komma-separierte ISO-Strings)
}
```

### RRULE-Rendering in FullCalendar

FullCalendar's `rrulePlugin` expandiert wiederkehrende Termine automatisch. Wichtig: `dtstart` und `UNTIL` werden als **floating local time** (ohne Z-Suffix) übergeben, damit die Uhrzeit in der lokalen Zeitzone korrekt angezeigt wird:

```typescript
// utils/calendarHelpers.ts exportiert die Hilfsfunktionen
import { toLocalFloatingDateString, parseRRuleString } from "../utils/calendarHelpers";

eventObj.rrule = {
  dtstart: toLocalFloatingDateString(event.start), // z.B. "2026-04-16T10:00:00"
  ...parseRRuleString(event.rrule),
};
eventObj.duration = { milliseconds: end - start };
```

### Hauptfunktionen

- `handleSaveEvent`: Event-Speicherung mit Backend-Sync
- `handleDeleteEvent`: Event-Löschung mit Bestätigung
- `handleEventClick`: Event-Klick Handler für Anzeige/Bearbeitung
- `handleDateSelect`: Datums-Auswahl für neue Events

## 🔄 Datenfluss

### Backend → Frontend (Laden)

1. `useCalendarEvents` ruft `/api/calendar/events` auf
2. Backend-Proxy ruft `heinapp-backend` auf und startet CalDAV-Sync falls nötig
3. Django gibt nur **Master-Events** zurück (`recurrence_id IS NULL`)
4. Frontend mappt `start_date`/`end_date` zu `Date`-Objekten, `uid` wird als `id` genutzt
5. `CalendarComponent` rendert Events; bei `rrule`-Feld übernimmt FullCalendar die Expansion

### Frontend → Backend (Speichern)

1. Benutzer konfiguriert Event (inkl. Wiederholung) in `EventForm` / `RecurrenceInput`
2. `RecurrenceInput` generiert RRULE-String mit `rrule.js`
3. `useCalendarEvents` sendet Event-Daten an `/api/calendar/events`
4. Django speichert Event und schreibt es per CalDAV auf den CalDAV-Server

## 🔐 Authentifizierung & Berechtigungen

- `AuthGuard` (in `app/components/`) schützt die gesamte Kalender-Seite
- Session Management über NextAuth.js
- Kalender sichtbar für Rollen `member` und `admin`

## 🚨 URL-Handling

URLs werden sicher als klickbare Links angezeigt:

- `target="_blank"` (neuer Tab)
- `rel="noopener noreferrer"`
- `stopPropagation()` verhindert Event-Click beim Link-Klick

## 🔧 Development

```bash
# Frontend starten
pnpm dev

# Backend (Docker) muss parallel laufen für CalDAV-Integration
cd ../heinapp-backend-service && docker compose up
```

## Dependencies

**Frontend:**
- `rrule@2.8.1`: RRULE-Generierung und -Parsing in `RecurrenceInput` / `EventView`
- `@fullcalendar/rrule@6.1.20`: FullCalendar-Plugin für client-seitige Expansion

**Backend:**
- `icalendar`: Natives RRULE-Handling in iCalendar-Events
- `caldav`: CalDAV-Client-Bibliothek

## 🧪 Manuelle Testszenarien

- [ ] Einmaliger Termin erstellen, bearbeiten, löschen
- [ ] Täglich wiederkehrender Termin
- [ ] Wöchentlicher Termin an mehreren Wochentagen
- [ ] Monatlicher Termin mit Enddatum
- [ ] Termin mit "nach N Wiederholungen" Ende
- [ ] Kalenderansicht wechseln (Monat / Woche / Tag / Liste)
- [ ] Sync mit externem CalDAV-Client prüfen (z.B. Thunderbird)

---

_Letztes Update: April 2026_
