import { fetchPost } from "$lib/functions/posts.ts";
import { getProductsByIds } from "$lib/functions/products.ts"



export async function load({params, setHeaders}){
    const slug = params.artikelid
    setHeaders({
        "cache-control": "max-age=86400"
    })
    const data = await fetchPost(slug);

    const products = await getProductsByIds(data.products)



    return {data, products}
}
