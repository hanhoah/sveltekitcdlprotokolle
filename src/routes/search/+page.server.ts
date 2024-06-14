export const prerender = false;
import supabase from '$lib/supabaseClient.js';
import { RESULTLIMIT } from '$lib/config.js';
import { renderPostList } from '$lib/functions/posts.js';

function prepareStatement(q:string){
    // prüfen ob mehrere Suchbegriffe eingegeben wurden
	const anzahl = q.split(" ").length;
	// wenn mehr als ein begriff dann mit & verknüpfen
	if(anzahl > 1)
		q = q.split(" ").join(" & ")
    return q
}

// async function getCache(key: string){

//     return 
// }

async function searchBooks(q: string) {
    q = prepareStatement(q)
    // Vercel KV Cache
    // const cached = await kv.get(`books-${q}`)
    // if(cached){
    //     // console.log('Cache hit!', `books-${q}`);
    //     return cached
    // }
    // if not cached fetch data from database
    // console.log('Cache miss!', `books-${q}`);
	const { data } = await supabase.from('books').select().textSearch('fts', q, {config: 'german'}).limit(RESULTLIMIT);
    // Überprüfe, ob das Ergebnis nicht null ist, bevor du darüber iterierst
    console.log('q is ', q);
    console.log('books are ', data);
    return data;
}

async function searchProducts(q: string) {
    q = prepareStatement(q)
        // Vercel KV Cache
        // const cached = await kv.get(`products-${q}`)
        // if(cached){
        //     // console.log('Cache hit!', `products-${q}`);
        //     return cached
        // }
        // if not cached fetch data from database
        // console.log('Cache miss!', `products-${q}`);
	const { data } = await supabase.from('products').select().textSearch('fts', q, {config: 'german'}).limit(RESULTLIMIT);
        return data;
}

async function searchSamples(q: string){
    q = prepareStatement(q)
        // Vercel KV Cache
        // const cached = await kv.get(`samples-${q}`)
        // if(cached){
        //     // console.log('Cache hit!', `samples-${q}`);
        //     return cached
        // }
        // if not cached fetch data from database
        // console.log('Cache miss!', `samples-${q}`);
	const { data } = await supabase.from('readingsamples').select().textSearch('fts', q, {config: 'german'}).limit(RESULTLIMIT);
    // Überprüfe, ob das Ergebnis nicht null ist, bevor du darüber iterierst
        return data;
}

async function searchArticles(q: string){
    q = prepareStatement(q)
        // Vercel KV Cache
        // const cached = await kv.get(`posts-${q}`)
        // if(cached){
        //     // console.log('Cache hit!', `samples-${q}`);
        //     return cached
        // }
        // if not cached fetch data from database
        // console.log('Cache miss!', `samples-${q}`);
	const { data } = await supabase.from('posts').select('id, slug').textSearch('fts', q, {config: 'german'}).limit(RESULTLIMIT);
    // Überprüfe, ob das Ergebnis nicht null ist, bevor du darüber iterierst
        return data;
}

async function searchVideos(q: string){
    q = prepareStatement(q)
        // Vercel KV Cache
        // const cached = await kv.get(`videos-${q}`)
        // if(cached){
        //     console.log('Cache hit!', `videos-${q}`);
        //     return cached
        // }
        // if not cached fetch data from database
	const { data } = await supabase.from('videos').select().textSearch('fts', q, {config: 'german'}).limit(RESULTLIMIT);
    // Überprüfe, ob das Ergebnis nicht null ist, bevor du darüber iterierst
        return data;
}

export async function load({ url, setHeaders }) {
    let q = url.searchParams.get('q');

    // if(cached){
    //     console.log('Cache hit!');
    //     return JSON.parse(cached)
    // }

    // adding browser caching
    setHeaders({
        "cache-control": "max-age=3600"
    })
	const books = await searchBooks(q);
	const products = await searchProducts(q);
    // console.log('products are ', products);
    const samples = await searchSamples(q);
    const videos = await searchVideos(q);
    const articles = await searchArticles(q);
    //posts are the rendered articles
    const posts = await renderPostList(articles)
    console.log('posts from search inside server are ', posts);

	return { q, books, products, samples, videos, articles, posts };
}
 

