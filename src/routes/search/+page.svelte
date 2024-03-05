<script lang="ts">
    import Product from '../produkte/product.svelte';
    import { Spinner } from 'flowbite-svelte';
    import { getBadge } from '$lib/functions/shops.ts';

    export let form
    const books = form?.books
    const qtyBooks = books?.length
    const products = form?.products
    const qtyProducts = products?.length
    const q = form?.q
    import Book from '../buecher/book.svelte';
    
    
</script>

<div class="p-5 mt-5 border-2 ">
<div class="">
    Zu Ihrer Suche nach 
    <span class="bg-yellow-300 px-2">
        {q} 
    </span>
    
    wurden 
    <span class="bg-yellow-300 px-2">
        {qtyBooks} Bücher 
    </span>
    und 
    <span class="bg-yellow-300 px-2">
        {qtyProducts} Produkte 

    </span>
    gefunden. 

</div>

    <ul class="grid grid-cols-2 md:grid-cols-3">
        {#each books as book}
        <li class="my-2"><Book book={{id: book.id,title: book.title,img: book.img}} /></li>
    {/each}
    </ul>

    <ul class="grid grid-cols-2 md:grid-cols-3">
        {#each products as product}
        <div class="">
            <li class="my-2 relative">
                {@html getBadge(product.id)}
                
                <Product product={{id: product.id,name: product.name,img: product.image}} />
                
            </li>
        </div>
        {/each}
    </ul>
</div>

