import supabase from "$lib/supabaseClient";

export async function load(){
    const {data, error } = await supabase.from('readingsamples').select('id, slug, text, book_id').order('created_at').limit(30)
    if(error){
        console.log('error while loading readingsamples');
    }
    else {
        return {leseproben: data}
    }
}