
import { RESULTLIMIT } from "$lib/config";
import supabase from "$lib/supabaseClient";

export interface Post {
    title: string;
    created_at: string;
    slug: string;
    description: string;
    category: number
}

interface PostTitle{
    id: string;
    slug: string;
}


// render posts

export async function renderPostList(postTitles: PostTitle[] | null): Promise<string>{
    let postlist = "<ul>"
    if(postTitles !== null){
        // console.log('i am rendering the Post List', postTitles);
        postTitles.forEach((post: PostTitle)=>{
            postlist += `<a href="/artikel/${post.slug}"><li class="border-2 m-2 p-2 hover:bg-blue-800 hover:text-white">${post.id}</li></a>`
            // console.log('postlist ist ', postlist);
        })
        postlist += "</ul>"
    }
    return postlist
}

// fetches only the Title of all posts / for listing all available posts
export async function fetchPostsTitle(): Promise<PostTitle[] | null>{
    const {data, error } = await supabase.from('posts').select('id, slug')
    if(error){
        console.log('Error fetching fetchPostsTitle', error);
        return null 
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
        // console.log('fetchPost Data ist ', data);
        return data
    }

}
