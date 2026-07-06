// components/workshop/WorkshopInfo.tsx
export default function WorkshopInfo() {
  return (
    <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
      <h2 className="mb-2 text-lg font-semibold text-blue-900">Wichtige Informationen</h2>
      <ul className="space-y-1 text-blue-800">
        <li>• Werkstatt ist jeden Samstag von 10:00 bis 13:00 Uhr für Gäste geöffnet</li>
        <li>• Jeder Gast kann einmal pro Woche einen Slot buchen</li>
        <li>• Slots sind jeweils 1 Stunde lang</li>
        <li>• Werkzeuge und Grundausstattung sind vorhanden</li>
        <li>• Ersatzteile können am Automaten erworben werden</li>
      </ul>
    </div>
  );
}
