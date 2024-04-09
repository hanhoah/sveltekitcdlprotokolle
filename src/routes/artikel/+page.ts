import { fetchPostsTitle, renderPostList } from "$lib/functions/posts";

export async function load(){
    const postsData = await fetchPostsTitle();
    const posts = await renderPostList(postsData);
    return {
        posts
    };
}
