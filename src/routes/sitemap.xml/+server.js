import supabase from '../../lib/supabaseClient.js';

export async function GET() {
  const { data: products, error } = await supabase.from('products').select('id, updated_at');
  
  if (error) {
    console.error('Fehler beim Abrufen der Produktdaten aus der Datenbank:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
  
  const site = 'https://www.cdl-protokolle.com'; // Ersetze dies durch deine tatsächliche Webseite
  
  const sitemapXml = generateSitemap(products, site);
  
  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}

function generateSitemap(products, site) {
  const urls = products.map(product => `
    <url>
      <loc>${site}/produkte/${product.id}</loc>
      <changefreq>weekly</changefreq>
      <lastmod>${product.updated_at}</lastmod>
      <priority>0.3</priority>
    </url>
  `).join('');
  
  return `
    <?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xhtml="https://www.w3.org/1999/xhtml"
      xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
      xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >
      ${urls}
    </urlset>
  `.trim();
}
