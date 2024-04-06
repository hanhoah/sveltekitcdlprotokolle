export const prerender = false;
import supabase from '$lib/supabaseClient.js';
import { RESULTLIMIT } from '$lib/config.js';
import { redis } from '$lib/server/redis.js';


function prepareStatement(q:string){
    // prüfen ob mehrere Suchbegriffe eingegeben wurden
	let anzahl = q.split(" ").length;
	// wenn mehr als ein begriff dann mit & verknüpfen
	if(anzahl > 1)
		q = q.split(" ").join(" & ")
    return q
}

async function searchBooks(q: string) {
    q = prepareStatement(q)
    //redis
    const cached = await redis.get(`books-${q}`)
    if(cached){
        console.log('Cache hit!', `books-${q}`);
        return JSON.parse(cached)
    }
    // if not cached fetch data from database
    console.log('Cache miss!', `books-${q}`);
	const { data } = await supabase.from('books').select().textSearch('fts', q, {config: 'german'}).limit(RESULTLIMIT);
    // Überprüfe, ob das Ergebnis nicht null ist, bevor du darüber iterierst
    if (data !== null && typeof data !== 'undefined') {
        redis.set(`books-${q}`, JSON.stringify(data), "EX", 7200)
        return data;
    } else {
        return [];
    }
}

async function searchProducts(q: string) {
    q = prepareStatement(q)
	const { data } = await supabase.from('products').select().textSearch('fts', q, {config: 'german'}).limit(RESULTLIMIT);
    if (data !== null && typeof data !== 'undefined') {
        return data;
    } else {
        return [];
    }
}

async function searchSamples(q: string){
    q = prepareStatement(q)
	const { data } = await supabase.from('readingsamples').select().textSearch('fts', q, {config: 'german'}).limit(RESULTLIMIT);
    // Überprüfe, ob das Ergebnis nicht null ist, bevor du darüber iterierst
    if (data !== null && typeof data !== 'undefined') {
        return data;
    } else {
        return [];
    }
}


async function searchVideos(q: string){
    q = prepareStatement(q)
	const { data } = await supabase.from('videos').select().textSearch('fts', q, {config: 'german'}).limit(RESULTLIMIT);
    // Überprüfe, ob das Ergebnis nicht null ist, bevor du darüber iterierst
    if (data !== null && typeof data !== 'undefined') {
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
    const samples = await searchSamples(q);
    const videos = await searchVideos(q);

	return { q, books, products, samples, videos };
}
 

