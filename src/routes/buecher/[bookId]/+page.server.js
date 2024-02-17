// Import der getBookDetails-Funktion aus der bookDetails-Datei
import { getBookDetails } from './bookDetails';

export async function load({ params }) {
	const id = params.bookId;

	// Buchdaten und Hashtags abrufen
	const { bookdata, hashtags, similarBooksIds } = await getBookDetails(id);

	return {
		bookdata,
		hashtags,
		similarBooksIds
	};
}
