<script lang="ts">
    import Product from '../produkte/product.svelte';
    import { Spinner } from 'flowbite-svelte';
    import { getBadge } from '$lib/functions/shops.ts';

    export let data
    $:  books = data.books
    $:  qtyBooks = data.books.length
    $:  products = data.products
    $:  qtyProducts = data.products.length
    $: q = data.q
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
{#if qtyProducts == 30 }
    <div class="bg-green-100">
        Hinweis: Aus Performance Gründen werden Suchergebnisse auf 30 Produkte limitiert. Falls Sie Ihr Produkt nicht finden, verfeinern Sie Ihre Suche mit einem weiteren Begriff.

    </div>
{/if}
{#if qtyBooks == 30 }
<div class="bg-red-100">
    Hinweis: Aus Performance Gründen werden Suchergebnisse auf 30 Bücher limitiert. Falls Sie Ihr Buch nicht finden, verfeinern Sie Ihre Suche mit einem weiteren Begriff.

</div>
{/if}

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

