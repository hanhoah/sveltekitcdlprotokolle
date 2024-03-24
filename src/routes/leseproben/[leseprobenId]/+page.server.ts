import supabase from '$lib/supabaseClient.js';

async function getReadingSample(leseprobenId: string){
    // lade beschreibung der Leseprobe
    const {data, error} = await supabase.from('readingsamples').select('id, text, book_id, product_tag').eq('slug', leseprobenId).limit(1).single()
    if(error){
        console.log('fehler beim Laden der Leseprobe');
    }else{
        return data
    }
}

async function getSimilarReadingSamples(sample: object){
    // lade ähnliche Leseproben
    const {data, error } = await supabase.from('readingsamples').select('id, slug, text, book_id').eq('product_tag', sample.product_tag).order('created_at').limit(30)
    if(error){
        console.log('fehler beim Laden der Leseprobe');
    }else{
        return data
    }
}

export async function load({params}){
    const leseprobenId = params.leseprobenId
        const sample = await getReadingSample(leseprobenId)
        const readingSamples = await getSimilarReadingSamples(sample)
        return {
            sample, readingSamples
        }

}