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
            <li class="my-5 py-5 relative">
                <div class="absolute right-10">
                    {@html getBadge(product.id)}
        
                  </div>                
                <Product product={{id: product.id,name: product.name,img: product.image, price: product.price}} />
                
            </li>
        </div>
        {/each}
    </ul>

    <div class="mt-10">
        <h2>Nicht das passende hier gefunden? Versuchen Sie es mit Amazon oder Ebay</h2>
        <p>Ihren Suchtext haben wir bereits für Sie im Link eingebaut. </p>
        <div class="my-5 pb-10 flex flex-col items-center space-y-5">
            <a href="https://www.amazon.de/gp/search?ie=UTF8&tag=jumex_online-21&linkCode=ur2&linkId=470bf27aa1feb315de9cb5f18b114f2f&camp=1638&creative=6742&index=books&keywords={q}" target="_blank">
                <div class="text-lg mt-3" color="light"> <img alt="amazon logo" width="100" src="/images/logos/Amazon.de-Logo.svg.png" /> </div>
            </a>

            <a href="https://www.ebay.de/sch/i.html?_from=R40&_trksid=p4432023.m570.l1313&_nkw={q}&_sacat=0" target="_blank">
                <div class="text-lg mt-3" color="light"> <img alt="ebay logo" width="100" src="/images/logos/EBay_logo.png" /></div>
            </a>            

        </div>        
    </div>
</div>

