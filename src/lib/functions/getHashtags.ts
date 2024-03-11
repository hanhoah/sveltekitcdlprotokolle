import supabase from '$lib/supabaseClient';

let cachedTopHashTags = null;

export async function getTopHashTags(minappearance: number): object[] {
	// Überprüfe ob das Ergebnis bereits im Cache gespeichert ist

	if(cachedTopHashTags){
		console.log('Getting Top Hash Tags from cache');
		return cachedTopHashTags;
	}

	console.log('Getting Top Hash Tags from supabase');
	const { data, error } = await supabase
		.from('hashtags_qty_view')
		.select('tag, anzahl, hashtag_id')
		.order('tag')
		.gte('anzahl', minappearance);

	if (error) {
		throw new Error('Fehler beim Abrufen der Top Hash Tags: ' + error.message);
	}

	console.log('Speichern des Ergebnis im Cache um zukünftige Abfragen zu beschleunigen');
	cachedTopHashTags = data;

	return data;
}

export async function getHashtag(id: number): string{
	const {data, error } = await supabase.from('hashtags').select('tag').eq('id', id).limit(1).single()
	if (error){
		throw new Error('Fehler beim Abrufen des Hashtag Namens: ' + error.message)
	}

	return data;
}

export async function getHashtagIds(bookId: number) {
	// Hashtags für das Buch abrufen
	const { data: hashtagsData, error } = await supabase
		.from('books_hashtags')
		.select('hashtag_id')
		.eq('book_id', bookId);

	if (error) {
		throw new Error('Fehler beim Abrufen der Hashtags: ' + error.message);
	}

	// Extrahiere die Hashtag-IDs aus dem Ergebnis
	const hashtagIds = hashtagsData.map((row) => row.hashtag_id);

	return hashtagIds;
}

export async function hashtagIdsToText(hashtagIds: number[]) {
	// Abfrage, um die Hashtags als Klartext zu erhalten
	const { data: hashtags, error: hashtagError } = await supabase
		.from('hashtags')
		.select('tag')
		.in('id', hashtagIds);

	if (hashtagError) {
		throw new Error('Fehler beim Abrufen der Hashtags: ' + hashtagError.message);
	}

	return hashtags;
}
