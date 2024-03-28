import supabase from "$lib/supabaseClient";
import { fail } from "@sveltejs/kit";

interface productTag {
    product_tag: string
}

export async function countSamples():Promise<number|null>{
    const { count } = await supabase.from('readingsamples').select('*', { count: 'exact' })
    // console.log('');
    return count
}

export async function getProductTags():Promise<productTag[]>{
    const {data, error} = await supabase.from('readingsamplesproducttags').select().order('product_tag')
    if(error){
        fail(400)
        console.log('error samples.ts getProductTags()');
        return []
    }
    else{
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

export async function getReadingSamples(sample: string):Promise[{}]{
    const {data, error } = await supabase.from('readingsamples').select().ilike('product_tag', sample)
    if(error){
        console.log('error samples.ts getReadingSamples', sample);
        fail(400)
    }
    else{
        return data
    }
}