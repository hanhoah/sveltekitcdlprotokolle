export const prerender = false;
import supabase from '$lib/supabaseClient.js';

async function getBooks(q: string) {
	// prüfen ob mehrere Suchbegriffe eingegeben wurden
	let anzahl = q.split(" ").length;
	// wenn mehr als ein begriff dann mit & verknüpfen
	if(anzahl > 1)
		q = q.split(" ").join(" & ")
	const { data } = await supabase.from('books').select().textSearch('fts', q, {config: 'german'}).limit(30);
	// const { data } = await supabase.from('books').select('id, title').eq('id', 4);
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

async function getProducts(q: string) {
	// prüfen ob mehrere Suchbegriffe eingegeben wurden
	let anzahl = q.split(" ").length;
	// wenn mehr als ein begriff dann mit & verknüpfen
	if(anzahl > 1)
		q = q.split(" ").join(" & ")
	const { data } = await supabase.from('products').select().textSearch('fts', q, {config: 'german'}).limit(30);
	// const { data } = await supabase.from('books').select('id, title').eq('id', 4);
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

export async function load({ params, url }) {
    let q = url.searchParams.get('q');
	const books = await getBooks(q);
	const products = await getProducts(q);
	return { q, books, products };
}

