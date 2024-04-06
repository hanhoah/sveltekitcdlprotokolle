import { countSamples, getProductTags } from "$lib/functions/samples";
import supabase from "$lib/supabaseClient";

export async function load({setHeaders}){
    setHeaders({
        "cache-control": "max-age=3600"
    })
    const counter = await countSamples();
    const product_tags = await getProductTags();
    const {data, error } = await supabase.from('readingsamples').select('id, slug, text, book_id').order('created_at').limit(10)
    if(error){
        console.log('error while loading readingsamples');
    }
    else {
        return {leseproben: data, product_tags, counter}
    }
}