import { getReadingSamples } from '$lib/functions/samples.js';

export async function load({params}){
    console.log('Leseproben der Kategorie: ', params);
    const catid = params.catid
    const samples = await getReadingSamples(catid)

    return {
        catid, samples
    }
}