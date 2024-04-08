import { fetchPostsTitle } from "$lib/functions/posts";

export async function load(){
    const posts = await fetchPostsTitle()
    console.log('posts are ', posts);
    return {
        posts
    }
}