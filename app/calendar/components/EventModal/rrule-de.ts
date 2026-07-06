// rrule-de.ts - Deutsche Sprachdefinition und Übersetzungsfunktion für RRule

import { RRule } from "rrule";
import { Language } from "rrule/dist/esm/nlp/i18n";
import { normalizeRRuleForParsing } from "./icalUtils";

// Deutsche Sprachdefinition für RRule
export const GERMAN: Language = {
    dayNames: [
        "Sonntag",
        "Montag",
        "Dienstag",
        "Mittwoch",
        "Donnerstag",
        "Freitag",
        "Samstag",
    ],
    monthNames: [
        "Januar",
        "Februar",
        "März",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember",
    ],
    tokens: {
        SKIP: /^[ \r\n\t]+|^\.$/,
        number: /^[1-9][0-9]*/,
        numberAsText: /^(eins|zwei|drei)/i,
        every: /^jede[ns]?/i,
        "day(s)": /^tag(e)?/i,
        "weekday(s)": /^wochentag(e)?/i,
        "week(s)": /^woche(n)?/i,
        "hour(s)": /^stunde(n)?/i,
        "minute(s)": /^minute(n)?/i,
        "month(s)": /^monat(e)?/i,
        "year(s)": /^jahr(e)?/i,
        on: /^(am|im)/i,
        at: /^(um)/i,
        the: /^(der|die|das)/i,
        first: /^erste[ns]?/i,
        second: /^zweite[ns]?/i,
        third: /^dritte[ns]?/i,
        nth: /^([1-9][0-9]*)\./i,
        last: /^letzte[ns]?/i,
        for: /^für/i,
        "time(s)": /^mal(e)?/i,
        until: /^bis/i,
        monday: /^mo(n(tag)?)?/i,
        tuesday: /^di(e(n(stag)?)?)?/i,
        wednesday: /^mi(t(t(woch)?)?)?/i,
        thursday: /^do(n(n(erstag)?)?)?/i,
        friday: /^fr(e(i(tag)?)?)?/i,
        saturday: /^sa(m(stag)?)?/i,
        sunday: /^so(n(ntag)?)?/i,
        january: /^jan(uar)?/i,
        february: /^feb(ruar)?/i,
        march: /^mär(z)?/i,
        april: /^apr(il)?/i,
        may: /^mai/i,
        june: /^juni?/i,
        july: /^juli?/i,
        august: /^aug(ust)?/i,
        september: /^sep(t(ember)?)?/i,
        october: /^okt(ober)?/i,
        november: /^nov(ember)?/i,
        december: /^dez(ember)?/i,
        comma: /^(,\s*|(und|oder)\s*)+/i,
    },
};

// gettext-Funktion für RRule-Übersetzung
export const gettext = (
    id: string | number | { toString: () => string }
): string => {
    // Konvertiere id zu String
    const key = id.toString();

    const translations: Record<string, string> = {
        every: "jeden",
        until: "bis",
        for: "für",
        time: "Mal",
        times: "Mal",
        hour: "Stunde",
        hours: "Stunden",
        minute: "Minute",
        minutes: "Minuten",
        day: "Tag",
        days: "Tage",
        weekday: "Wochentag",
        weekdays: "Wochentage",
        week: "Woche",
        weeks: "Wochen",
        month: "Monat",
        months: "Monate",
        year: "Jahr",
        years: "Jahre",
        on: "am",
        "on the": "am",
        in: "im",
        at: "um",
        the: "den",
        last: "letzten",
        and: "und",
        or: "oder",
        st: ".",
        nd: ".",
        rd: ".",
        th: ".",
        "(~ approximate)": "(~ ungefähr)",
        "RRule error: Unable to fully convert this rrule to text":
            "RRule-Fehler: Diese Regel kann nicht vollständig in Text umgewandelt werden",
    };

    return translations[key] || key;
};

// Formatiert einen RRule-String in lesbaren deutschen Text
export const formatRecurrence = (rruleStr: string, startDate: Date): string => {
    try {
        const rruleString = normalizeRRuleForParsing(rruleStr, startDate);
        const rrule = RRule.fromString(rruleString);
        let text = rrule.toText(gettext, GERMAN);

        // Verbessere Formulierung: "für X Mal" → ", insgesamt X Mal"
        text = text.replace(/\s+für\s+(\d+)\s+Mal/g, ", insgesamt $1 Mal");

        return text.charAt(0).toUpperCase() + text.slice(1);
    } catch {
        return "Wiederkehrender Termin";
    }
};
