import { getBook } from '$lib/functions/books.js';
import { getProductsByName } from '$lib/functions/products.js';
import { getProductTags, getReadingSample, getSimilarReadingSamples } from '$lib/functions/samples.js';
import { getBooklinks } from '../../buecher/[bookId]/bookDetails.js';

export async function load({params, setHeaders}){
    const leseprobenId = params.leseprobenId
    setHeaders({
        "cache-control": "max-age=86400"
    })
    const sample = await getReadingSample(leseprobenId)
    const readingSamples = await getSimilarReadingSamples(sample)
    const book = await getBook(sample?.book_id)
    console.log('from server: Leseprobe von ', book?.title);
        const links = await getBooklinks(book?.id)
        const product_tags = await getProductTags()

        const products = await getProductsByName(sample?.product_tag)
        
        return {
            sample, readingSamples, book, links, product_tags, products
        }

}