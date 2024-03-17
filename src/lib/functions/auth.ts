import supabase from '$lib/supabaseClient.js';

export async function getSession(){
    console.log('start get session');
    const { data, error } = await supabase.auth.getSession()
    if(error){
        console.log('error getSession');
        return false
    } else{
        console.log('session from getSessioin is ', data.session);
        return data.session
      }
    }
