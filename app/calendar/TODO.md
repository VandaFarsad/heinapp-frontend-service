# Calendar Feature TODOs

## Recurring Events: "This and Following" Scope

**Priority:** Medium  
**Complexity:** High  
**Standard:** Industry Best Practice (Google Calendar, Outlook, Apple Calendar)

### Current State

When editing a recurring event occurrence, users can choose:

- ✅ **Nur dieser Termin** (This occurrence only - creates exception)
- ✅ **Alle Termine** (All occurrences - modifies entire series including past)

### Missing Feature

- ❌ **Dieser und alle zukünftigen** (This and following occurrences)

### Why This Matters

1. **Past events = History**: Should not be retroactively changed
2. **Future events = Planning**: Should be modifiable (new time, location, etc.)
3. **"All" is edge case**: Only for corrections (typos) or complete reorganization

### Technical Implementation

#### Frontend Changes

**File:** `app/calendar/components/EventModal/EventModal.tsx`

Add third scope option:

```typescript
type Scope = "this" | "following" | "all";
```

#### Backend Changes

**File:** `calendar_app/caldav/client.py`

For "following" scope:

1. **End old series:** Add UNTIL to RRULE (set to day before occurrence)
2. **Create new series:** New VEVENT with DTSTART=occurrence date and modified properties
3. **Handle edge cases:**
   - EXDATE entries before split date stay with old series
   - New series starts fresh without EXDATE

#### API Changes

**Endpoint:** `PUT /api/calendar/events/{id}/`

Add new parameter:

```json
{
  "scope": "following",
  "occurrence_start": "2026-04-08T18:00:00Z"
}
```

### Example Flow

```
Original Series:
- DTSTART: 2026-04-01T18:00 (Tuesday)
- RRULE: FREQ=WEEKLY
- Duration: 2 hours

User edits occurrence on 2026-04-08, changes time to 19:00, selects "This and following"

Result:
OLD SERIES:
- DTSTART: 2026-04-01T18:00
- RRULE: FREQ=WEEKLY;UNTIL=20260407
- Occurrences: Apr 1 (18:00)

NEW SERIES:
- DTSTART: 2026-04-08T19:00
- RRULE: FREQ=WEEKLY
- Occurrences: Apr 8, 15, 22, ... (19:00)
```

### Challenges

1. **Two separate VEVENTs**: Need to manage lifecycle of both
2. **UI/UX**: Need to show relationship between split series
3. **CalDAV sync**: Ensure both series sync correctly
4. **Exception handling**: What happens to exceptions created before split?
5. **Performance**: Additional write operations to CalDAV server

### References

- RFC 5545 (iCalendar): Section 3.8.5.3 (Recurrence Rule)
- Google Calendar API: https://developers.google.com/calendar/api/v3/reference/events/update
- CalDAV spec: RFC 4791

### Dependencies

- Backend: `caldav` library, `icalendar` library
- Frontend: `rrule` library for date calculations

---

## Other TODOs

### EXDATE Timezone Handling

- **Priority:** Low
- **Issue:** EXDATE timestamps might need timezone consideration
- **Current:** Uses naive datetime conversion with time_diff

### German RRule Text Improvements

- **Priority:** Low
- **Status:** Implemented basic translation
- **Future:** Add more sophisticated plural handling, grammar rules
