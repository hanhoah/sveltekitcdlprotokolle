import supabase from '../../lib/supabaseClient.js';

export async function GET() {

  //getting books from database
  const { data: books, err } = await supabase.from('books').select('id').eq('active', true);
  
  if (err) {
    console.error('Fehler beim Abrufen der Produktdaten aus der Datenbank:', err);
    return new Response('Internal Server Error', { status: 500 });
  }

  // pages
  const pages = ["produkte", "buecher", "gutscheine", "cdl-protokolle"] //list of pages as a string ex. ["about", "blog", "contact"]


  //getting products from database
  const { data: products, error } = await supabase.from('products').select('id, updated_at');
  
  if (error) {
    console.error('Fehler beim Abrufen der Produktdaten aus der Datenbank:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
  
  const site = 'https://www.cdl-protokolle.com';
  
  const sitemapXml = generateSitemap(products, site, pages, books);
  
  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}

function generateSitemap(products, site, pages, books) {

  pages = pages.map(page => `
    <url>
      <loc>${site}/${page}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>
  `).join('');

  products = products.map(product => `
    <url>
      <loc>${site}/produkte/${product.id}</loc>
      <changefreq>weekly</changefreq>
      <lastmod>${product.updated_at}</lastmod>
      <priority>0.3</priority>
    </url>
  `).join('');

  books = books.map(book => `
    <url>
      <loc>${site}/buecher/${book.id}</loc>
      <changefreq>weekly</changefreq>
      <lastmod>2024-03-20</lastmod>
      <priority>0.4</priority>
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
      ${books}
      ${pages}
      ${products}
      
    </urlset>
  `.trim();
}
