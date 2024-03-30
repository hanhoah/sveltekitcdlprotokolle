import supabase from "$lib/supabaseClient";

export async function getAllVideos(){
    const {data, error} = await supabase.from('videos').select('id, slug, embed')
    if(error){
        console.log('error in videos.ts > getAllVideos()');
        return false
    }
    return data
}