import supabase from '$lib/supabaseClient'

const {data: products, error } = await supabase.from('products').select(`id, updated_at`)
if (error)
    console.log('error getting products data from database ', error);
else console.log('data ist ', products);


// const products = [{

// }] //list of posts containing a slug [{title: "Test title", slug: "test-title", updatedAt: "2023-01-01"}]

const pages = ["buecher", "cdl-protokolle", "gutscheine", "produkte"] //list of pages as a string ex. ["about", "blog", "contact"]

const site = 'https://www.cdl-protokolle.com'

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  const body = sitemap(products, pages)
  const response = new Response(body)
  response.headers.set('Cache-Control', 'max-age=0, s-maxage=3600')
  response.headers.set('Content-Type', 'application/xml')
  return response
}

const sitemap = (products, pages) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
  <url>
    <loc>${site}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${site}/${page}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  `,
    )
    .join('')}
  ${products
    .map((product) =>
`
  <url>
    <loc>${site}/produkte/${product.id}</loc>
    <changefreq>monthly</changefreq>
    <lastmod>${product.updated_at.split("T")[0]}</lastmod>
    <priority>0.5</priority>
  </url>
  `,
    )
    .join('')}
</urlset>`