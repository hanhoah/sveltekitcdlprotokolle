import { supabase } from '$lib/supabaseClient';

export async function getCategoryNameById(catid: number): Promise<string> {
	console.log('getCategoryNameById: ', catid);
	const { data, error } = await supabase.from('categories').select('name').eq('id', catid).single();
	return data?.name;
}

export async function getCategoryDescription(catid: number): Promise<string | null> {
	// Debugging
	// console.log('getCategoryDescription');
	// console.log('description ist ', data?.description);

	// Daten von Supabase abrufen, nur das Feld 'description' auswählen und sicherstellen, dass nur ein Objekt zurückgegeben wird
	const { data, error } = await supabase
		.from('categories')
		.select('description')
		.eq('id', catid)
		.single();

	try {
		// Überprüfen, ob Daten vorhanden sind und ob die Beschreibung vorhanden ist
		if (data && data.description) {
			// Die Beschreibung der Kategorie zurückgeben
			return data.description;
		} else {
			// Wenn keine Daten oder keine Beschreibung gefunden wurde, gib null zurück
			return null;
		}
	} catch (error) {
		return null;
	}
}
