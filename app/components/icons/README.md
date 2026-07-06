# HeiNa Icon System

Ein modulares, typsicheres Icon-System für die HeiNa-App.

## 📁 Struktur

Das Icon-System ist in thematisch getrennte Module aufgeteilt:

```
app/components/icons/
├── types.ts              # Gemeinsame TypeScript Interfaces
├── NavigationIcons.tsx   # Navigation und Richtungspfeile
├── UserIcons.tsx         # Benutzer und Profil Icons
├── StatusIcons.tsx       # Status, Feedback und Meldungen
├── CalendarIcons.tsx     # Kalender und Event Icons
├── ActionIcons.tsx       # Aktionen (hinzufügen, bearbeiten, löschen)
├── RADhausIcons.tsx      # RADhaus-spezifische thematische Icons
├── index.ts              # Zentraler Export aller Icons
└── README.md             # Diese Dokumentation
```

## 🎯 Design-Prinzipien

- **Modular**: Icons sind in thematische Module aufgeteilt
- **Typsicher**: Vollständige TypeScript-Unterstützung
- **Konsistent**: Einheitliche Props und Styling-Ansätze
- **Tree-shaking**: Nur verwendete Icons werden gebündelt
- **Dokumentiert**: Jedes Icon ist dokumentiert und kategorisiert
  | -------------- | ------------- | ------------------------------------------ | --------------------- |
  | `CalendarIcon` | Event View | `EventView.tsx` | Kalender-Symbol |
  | `LocationIcon` | Event View | `EventView.tsx` | Standort-Pin |
  | `DocumentIcon` | Event View | `EventView.tsx` | Dokument/Beschreibung |
  | `EditIcon` | Event Actions | `EventView.tsx`, `MobileMenu.tsx` | Bearbeiten-Stift |
  | `DeleteIcon` | Event Actions | `DeleteConfirmModal.tsx`, `MobileMenu.tsx` | Papierkorb |

### ➕ Action Icons

| Icon             | Verwendung  | Ursprüngliche Datei  | Beschreibung    |
| ---------------- | ----------- | -------------------- | --------------- |
| `PlusIcon`       | Add Actions | `RadhausSection.tsx` | Plus-Zeichen    |
| `CloseModalIcon` | Modal Close | `EventModal.tsx`     | X zum Schließen |

### 🚲 RADhaus Theme Icons

| Icon                     | Verwendung        | Ursprüngliche Datei  | Beschreibung                             |
| ------------------------ | ----------------- | -------------------- | ---------------------------------------- |
| `BikeWheelIcon`          | RadhausSection    | `RadhausSection.tsx` | Fahrradrad mit Speichen                  |
| `AnimatedBicycleIcon`    | Hero Decoration   | `HeroSection.tsx`    | Komplettes Fahrrad mit animierten Rädern |
| `BicycleIcon`            | Static Display    | -                    | Statisches Fahrrad-Icon                  |
| `AnimatedBikeWheelIcon`  | Individual Wheel  | -                    | Einzelnes animiertes Rad                 |
| `GearIcon`               | Removed from Hero | -                    | Zahnrad für Mechanik-Thema               |
| `ChainLinkIcon`          | Removed from Hero | -                    | Kette für Verbindung                     |
| `CommunityHouseIcon`     | RadhausSection    | `RadhausSection.tsx` | Modernes RADhaus-Gebäude                 |
| `SustainabilityTreeIcon` | Removed from Hero | -                    | Baum für Nachhaltigkeit                  |
| `CommunityHeartIcon`     | Removed from Hero | -                    | Herz für Gemeinschaftsgefühl             |

## Verwendung

### Einzelne Icons importieren:

```tsx
import { CheckIcon, LoadingSpinnerIcon } from '@/components/icons';

<CheckIcon className="w-6 h-6 text-green-600" />
<LoadingSpinnerIcon className="w-5 h-5 text-white" />
```

### Icons-Object verwenden:

```tsx
import { Icons } from '@/components/icons';

<Icons.User className="w-4 h-4" />
<Icons.Calendar className="w-5 h-5 text-green-600" />
```

### Mit Standard-Import:

```tsx
import Icons from "@/components/icons";

<Icons.Check className="h-12 w-12 text-green-600" />;
```

## Vorteile der Zentralisierung

### ✅ Konsistenz

- Alle Icons haben einheitliche Props (`className`, `size`)
- Standardgrößen sind definiert
- Einheitlicher Stroke-Width (2)

### ✅ Wartbarkeit

- Icons sind an einem Ort gesammelt
- Einfache Änderungen für alle Verwendungen
- Bessere Übersicht über verwendete Icons

### ✅ Performance

- Wiederverwendbare Komponenten
- Keine doppelten SVG-Definitionen
- Tree-shaking möglich

### ✅ Typisierung

- TypeScript-Unterstützung
- Intellisense für Icon-Namen
- Sichere Props-Validierung

## Refactoring-Schritte

### Entfernte Icons (auf Anfrage):

1. **AuthSection**: Chevron-Down Pfeil entfernt ❌ **Einziges ungenutztes Icon**

### Zentralisierte Icons:

- **15 von 16 Icons werden aktiv verwendet** ✅
- Aus 12 verschiedenen Komponenten extrahiert
- Einheitliche Interface-Definition
- **94% Nutzungsrate** - sehr relevante Sammlung!

## Nächste Schritte

1. **Optional**: Bestehende Komponenten auf zentrale Icons umstellen
2. **Optional**: Zusätzliche Icons hinzufügen (z.B. Social Media, etc.)
3. **Optional**: Icon-Varianten erstellen (outline vs. filled)
4. **Optional**: Animierte Icon-Versionen hinzufügen

## 🎨 Recent Changes (Juli 2025)

### HeroSection Icon Refactoring

- **Entfernt**: Alle dekorativen Icons (Zahnräder, Herz, Baum, Kette, Haus-Symbol)
- **Hinzugefügt**: Ein einzelnes zentrales `AnimatedBicycleIcon` mit rotierenden Rädern
- **Animation**: Fahrradräder drehen sich kontinuierlich für eine lebendige, thematische Dekoration
- **Positionierung**: Zentriert im Hintergrund der HeroSection mit reduzierter Opazität

### Neue Animierte Icons

- `AnimatedBicycleIcon`: Vollständiges Fahrrad mit zwei separat animierten Rädern
- `BicycleIcon`: Statische Version des Fahrrads ohne Animation
- `AnimatedBikeWheelIcon`: Einzelnes animiertes Rad für modulare Verwendung

Die HeroSection ist jetzt visuell klarer und fokussiert sich auf das zentrale Fahrrad-Thema der RADhaus-Kultur.
