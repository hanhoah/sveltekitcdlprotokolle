export const prerender = false;
import supabase from '$lib/supabaseClient.js';
import { RESULTLIMIT } from '$lib/config.js';

async function searchBooks(q: string) {
	// prüfen ob mehrere Suchbegriffe eingegeben wurden
	let anzahl = q.split(" ").length;
	// wenn mehr als ein begriff dann mit & verknüpfen
	if(anzahl > 1)
		q = q.split(" ").join(" & ")
	const { data } = await supabase.from('books').select().textSearch('fts', q, {config: 'german'}).limit(RESULTLIMIT);
    // Überprüfe, ob das Ergebnis nicht null ist, bevor du darüber iterierst
    if (data !== null && typeof data !== 'undefined') {
        // Wenn das Ergebnis vorhanden ist, gib es zurück
        return data;
    } else {
        // Wenn das Ergebnis null oder undefiniert ist, gib ein leeres Array zurück oder handle den Fehler entsprechend
        console.log('Die Buchsuche ergab kein Ergebnis.');
        return [];
    }
}

async function searchProducts(q: string) {
	// prüfen ob mehrere Suchbegriffe eingegeben wurden
	const anzahl = q.split(" ").length;
	// wenn mehr als ein begriff dann mit & verknüpfen
	if(anzahl > 1)
		q = q.split(" ").join(" & ")
	const { data } = await supabase.from('products').select().textSearch('fts', q, {config: 'german'}).limit(RESULTLIMIT);
    // Überprüfe, ob das Ergebnis nicht null ist, bevor du darüber iterierst
    if (data !== null && typeof data !== 'undefined') {
        // Wenn das Ergebnis vorhanden ist, gib es zurück
        return data;
    } else {
        // Wenn das Ergebnis null oder undefiniert ist, gib ein leeres Array zurück oder handle den Fehler entsprechend
        console.log('Die Produktsuche ergab kein Ergebnis.');
        return [];
    }
}

async function searchSamples(q: string){
	// prüfen ob mehrere Suchbegriffe eingegeben wurden
	let anzahl = q.split(" ").length;
	// wenn mehr als ein begriff dann mit & verknüpfen
	if(anzahl > 1)
		q = q.split(" ").join(" & ")
	const { data } = await supabase.from('readingsamples').select().textSearch('fts', q, {config: 'german'}).limit(RESULTLIMIT);
    // Überprüfe, ob das Ergebnis nicht null ist, bevor du darüber iterierst
    if (data !== null && typeof data !== 'undefined') {
        // Wenn das Ergebnis vorhanden ist, gib es zurück
        console.log('data from samples ist ', data);
        return data;
    } else {
        // Wenn das Ergebnis null oder undefiniert ist, gib ein leeres Array zurück oder handle den Fehler entsprechend
        console.log('Die Informationssuche (readingsamples) ergab kein Ergebnis.');
        return [];
    }

}


async function searchVideos(q: string){
	// prüfen ob mehrere Suchbegriffe eingegeben wurden
	let anzahl = q.split(" ").length;
	// wenn mehr als ein begriff dann mit & verknüpfen
	if(anzahl > 1)
		q = q.split(" ").join(" & ")
	const { data } = await supabase.from('videos').select().textSearch('fts', q, {config: 'german'}).limit(RESULTLIMIT);
    // Überprüfe, ob das Ergebnis nicht null ist, bevor du darüber iterierst
    if (data !== null && typeof data !== 'undefined') {
        // Wenn das Ergebnis vorhanden ist, gib es zurück
        console.log('q ist ', q);
        console.log('data from videos ist ', data);
        return data;
    } else {
        // Wenn das Ergebnis null oder undefiniert ist, gib ein leeres Array zurück oder handle den Fehler entsprechend
        console.log('Die Suche nach passenden Videos ergab kein Ergebnis.');
        return [];
    }

}


export async function load({ params, url }) {
    let q = url.searchParams.get('q');
	const books = await searchBooks(q);
	const products = await searchProducts(q);
    const samples = await searchSamples(q);
    const videos = await searchVideos(q);
	return { q, books, products, samples, videos };
}

