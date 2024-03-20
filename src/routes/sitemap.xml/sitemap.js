// sitemap.js

import fs from 'fs';

export function generateSitemap() {
  const site = 'https://www.cdl-protokolle.com';
  const pages = ["buecher", "cdl-protokolle", "gutscheine", "produkte"];

  let products = [];
  try {
    products = JSON.parse(fs.readFileSync('./products.json', 'utf8'));
  } catch (error) {
    console.error('Fehler beim Lesen der Produktdaten aus der JSON-Datei', error);
  }

  // Generiere die XML-Sitemap mit den Produktdaten und den Seiten
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
      xmlns:xhtml="https://www.w3.org/1999/xhtml"
      xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >
      <!-- Hier den XML-Sitemap-Inhalt einfügen -->
    </urlset>`;

  return sitemapXml;
}
