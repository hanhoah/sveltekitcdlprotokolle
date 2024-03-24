import { getBook } from '$lib/functions/books.js';
import { getProductTags, getReadingSample, getSimilarReadingSamples } from '$lib/functions/samples.js';
import { getBooklinks } from '../../buecher/[bookId]/bookDetails.js';

export async function load({params}){
    const leseprobenId = params.leseprobenId
        const sample = await getReadingSample(leseprobenId)
        const readingSamples = await getSimilarReadingSamples(sample)
        const book = await getBook(sample?.book_id)
        const links = await getBooklinks(book?.id)
        const product_tags = await getProductTags()
        console.log('from server: Leseprobe von ', book?.title);
        
        return {
            sample, readingSamples, book, links, product_tags
        }

}