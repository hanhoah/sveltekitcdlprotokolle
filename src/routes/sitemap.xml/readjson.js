import fs from 'fs';

try {
  // Dateiinhalt lesen und in einer Variablen speichern
  const data = fs.readFileSync('./products.json', 'utf8');

  // JSON-Daten in ein JavaScript-Objekt konvertieren
  const products = JSON.parse(data);

  // Ausgabe der Produkte auf der Konsole
  console.log('Produkte:');
  console.log(products);
} catch (error) {
  // Fehlerbehandlung, falls das Lesen der Datei fehlschlägt
  console.error('Fehler beim Lesen der Datei:', error);
}
