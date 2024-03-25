import { getProductTags, getReadingSamples } from '$lib/functions/samples.js';

export async function load({params}){
    console.log('Leseproben der Kategorie: ', params);
    const product_tags = await getProductTags()
    const catid = params.catid
    const samples = await getReadingSamples(catid)

    return {
        catid, samples, product_tags
    }
}