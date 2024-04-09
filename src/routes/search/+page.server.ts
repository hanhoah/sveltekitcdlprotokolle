export const prerender = false;
import supabase from '$lib/supabaseClient.js';
import { RESULTLIMIT } from '$lib/config.js';
import { kv } from '@vercel/kv';
import { renderPostList } from '$lib/functions/posts.js';

function prepareStatement(q:string){
    // prüfen ob mehrere Suchbegriffe eingegeben wurden
	let anzahl = q.split(" ").length;
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
    const cached = await kv.get(`books-${q}`)
    if(cached){
        // console.log('Cache hit!', `books-${q}`);
        return cached
    }
    // if not cached fetch data from database
    // console.log('Cache miss!', `books-${q}`);
	const { data } = await supabase.from('books').select().textSearch('fts', q, {config: 'german'}).limit(RESULTLIMIT);
    // Überprüfe, ob das Ergebnis nicht null ist, bevor du darüber iterierst
    if (data !== null && typeof data !== 'undefined') {
        kv.set(`books-${q}`, JSON.stringify(data))
        return data;
    } else {
        return [];
    }
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
    if (data !== null && typeof data !== 'undefined') {
        kv.set(`products-${q}`, JSON.stringify(data))
        return data;
    } else {
        return [];
    }
}

async function searchSamples(q: string){
    q = prepareStatement(q)
        // Vercel KV Cache
        const cached = await kv.get(`samples-${q}`)
        if(cached){
            // console.log('Cache hit!', `samples-${q}`);
            return cached
        }
        // if not cached fetch data from database
        // console.log('Cache miss!', `samples-${q}`);
	const { data } = await supabase.from('readingsamples').select().textSearch('fts', q, {config: 'german'}).limit(RESULTLIMIT);
    // Überprüfe, ob das Ergebnis nicht null ist, bevor du darüber iterierst
    if (data !== null && typeof data !== 'undefined') {
        kv.set(`samples-${q}`, JSON.stringify(data))
        return data;
    } else {
        return [];
    }
}

async function searchArticles(q: string){
    q = prepareStatement(q)
        // Vercel KV Cache
        const cached = await kv.get(`posts-${q}`)
        if(cached){
            // console.log('Cache hit!', `samples-${q}`);
            return cached
        }
        // if not cached fetch data from database
        // console.log('Cache miss!', `samples-${q}`);
	const { data } = await supabase.from('posts').select('id, slug').textSearch('fts', q, {config: 'german'}).limit(RESULTLIMIT);
    // Überprüfe, ob das Ergebnis nicht null ist, bevor du darüber iterierst
    if (data !== null && typeof data !== 'undefined') {
        kv.set(`samples-${q}`, JSON.stringify(data))
        return data;
    } else {
        return [];
    }
}

async function searchVideos(q: string){
    q = prepareStatement(q)
        // Vercel KV Cache
        const cached = await kv.get(`videos-${q}`)
        if(cached){
            console.log('Cache hit!', `videos-${q}`);
            return cached
        }
        // if not cached fetch data from database
        console.log('Cache miss!', `videos-${q}`);
	const { data } = await supabase.from('videos').select().textSearch('fts', q, {config: 'german'}).limit(RESULTLIMIT);
    console.log('searchVideos', data);
    // Überprüfe, ob das Ergebnis nicht null ist, bevor du darüber iterierst
    if (data !== null && typeof data !== 'undefined') {
        kv.set(`videos-${q}`, JSON.stringify(data))
        // Wenn das Ergebnis vorhanden ist, gib es zurück
        return data;
    } else {
        return [];
    }
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

	return { q, books, products, samples, videos, articles, posts };
}
 

