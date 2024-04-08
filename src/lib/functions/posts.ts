
import { RESULTLIMIT } from "$lib/config";
import supabase from "$lib/supabaseClient";

export interface Post {
    title: string;
    created_at: string;
    slug: string;
    description: string;
    category: number

}

// fetches only the Title of all posts / for listing all available posts
export async function fetchPostsTitle(): Promise<{title: string, slug: string}[] | null>{
    const {data, error } = await supabase.from('posts').select()
    if(error){
        console.log('Error fetching fetchPostsTitle', error);
    }else{
        return data
    }
}

// fetch a single Post
export async function fetchPost(slug: string): Promise<object>{
    const {data, error} = await supabase.from('posts').select().eq("slug", slug).single()
    if(error){
        console.log('There was an error fetching the Post, ', error);
    }else{
        console.log('fetchPost Data ist ', data);
        return data
    }

}
