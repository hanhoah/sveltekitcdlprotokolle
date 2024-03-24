import supabase from "$lib/supabaseClient";
import { fail } from "@sveltejs/kit";

interface productTag {
    product_tag: string
}

export async function getProductTags():Promise<productTag[]>{
    const {data, error} = await supabase.from('readingsamplesproducttags').select()
    if(error){
        fail(400)
        console.log('error samples.ts getProductTags()');
        return []
    }
    else{
console.log('data', data);
        return data;
    } 
}

export async function getReadingSample(leseprobenId: string){
    // lade beschreibung der Leseprobe
    const {data, error} = await supabase.from('readingsamples').select('id, text, book_id, product_tag').eq('slug', leseprobenId).limit(1).single()
    if(error){
        console.log('fehler beim Laden der Leseprobe');
    }else{
        return data
    }
}

export async function getSimilarReadingSamples(sample: object){
    // lade ähnliche Leseproben
    const {data, error } = await supabase.from('readingsamples').select('id, slug, text, book_id').eq('product_tag', sample.product_tag).order('created_at').limit(30)
    if(error){
        console.log('fehler beim Laden der Leseprobe');
    }else{
        return data
    }
}