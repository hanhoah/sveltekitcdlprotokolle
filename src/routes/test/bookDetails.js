import { supabase } from '$lib/supabaseClient';

export async function getBookDetails() {
	const { data, error } = await supabase
		.from('books')
		.select(
			`
            *,
            hashtags (
                tag
            )
        `
		)
		.eq('id', 24);

	if (error) {
		return {
			status: 500,
			error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'
		};
	}

	if (!data || data.length === 0) {
		return {
			status: 404,
			error: `Buch mit der ID 24 wurde nicht gefunden.`
		};
	}

	return {
		status: 200,
		body: data[0]
	};
}
