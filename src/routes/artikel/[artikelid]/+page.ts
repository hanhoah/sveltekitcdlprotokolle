import { fetchPost } from "$lib/functions/posts.ts";
import { getProductsByIds } from "$lib/functions/products.ts"



export async function load({params, setHeaders}){
    const slug = params.artikelid
    setHeaders({
        "cache-control": "max-age=86400"
    })
    const data = await fetchPost(slug);

    console.log(typeof(data.products));
    console.log(Array.isArray(data.products)); // Sollte true sein, wenn es sich um ein Array handelt
    console.log(typeof data.products[0]); // Sollte 'string' sein, wenn es sich um einen String handelt

    const products = await getProductsByIds(data.products)

    console.log('products are: ', products);


    return {data}
}
