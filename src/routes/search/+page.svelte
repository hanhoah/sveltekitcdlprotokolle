<script lang="ts">
    import Product from '../produkte/product.svelte';
    import { getBadge } from '$lib/functions/shops.ts';

    export let data
    $:  books = data.books
    $:  qtyBooks = data.books.length
    $:  products = data.products
    $:  qtyProducts = data.products.length
    $:  samples = data.samples
    $:  qtySamples = data.samples.length
    $: q = data.q
    import Book from '../buecher/book.svelte';

    import { RESULTLIMIT } from '$lib/config.js';

    

</script>

<div class="p-2 mt-5 border-2 ">
<div class="mb-5">
    Zu Ihrer Suche nach 
    <span class="bg-yellow-200 px-2">
        {q} 
    </span>
    
    wurden 
    <span class="books">
        {qtyBooks} Bücher 
    </span>
    und 
    <span class="products">
        {qtyProducts} Produkte 

    </span>
    und 
    <span class="samples">
        {qtySamples} Informationen aus Leseproben 

    </span>    
    gefunden. 
</div>

    <div>Wir empfehlen Ihnen die Ergebnisse in einem neuen Tab zu öffnen, damit das Suchergebnis bestehen bleibt. </div>
    <div class="md:hidden">Wenn Sie ein Smartphone benutzen einfach einen Link gedrückt halten. </div>
    <div class="hidden md:block">Wenn Sie ein PC benutzen: 1. Rechts klick 2. Link in neuem Tab öffnen.</div>

{#if qtyProducts == RESULTLIMIT }
    <div class="products">
        Hinweis: Aus Performance Gründen werden Suchergebnisse auf {RESULTLIMIT} Produkte limitiert. Falls Sie Ihr Produkt nicht finden, verfeinern Sie Ihre Suche mit einem weiteren Begriff.

    </div>
{/if}
{#if qtyBooks == RESULTLIMIT }
<div class="books">
    Hinweis: Aus Performance Gründen werden Suchergebnisse auf {RESULTLIMIT} Bücher limitiert. Falls Sie Ihr Buch nicht finden, verfeinern Sie Ihre Suche mit einem weiteren Begriff.

</div>
{/if}
{#if qtySamples == RESULTLIMIT }
<div class="samples">
    Hinweis: Aus Performance Gründen werden Suchergebnisse auf {RESULTLIMIT} Informationen limitiert. Falls Sie nicht die passende Information finden, verfeinern Sie Ihre Suche mit einem weiteren Begriff.

</div>
{/if}

    <div class="samples w-full text-center my-5"> <h2> Ergebnisse Informationen aus Leseproben: </h2></div>
    <ul class="grid grid-cols-2 md:grid-cols-3">
        {#each samples as sample}
        <a href="/leseproben/{sample.slug}">
            <div class="hover:bg-blue-800 hover:text-white border-2 m-2 p-2 hlink">
                {sample.id}
            </div>
        </a>
        {/each}
    </ul>


    <div class="books w-full text-center my-5"> <h2> Ergebnisse Bücher: </h2></div>
    <ul class="grid grid-cols-2 md:grid-cols-3">
        {#each books as book}
        <li class="my-2"><Book book={{id: book.id,title: book.title,img: book.img}} /></li>
    {/each}
    </ul>

    <div class="products w-full text-center my-5"> <h2> Ergebnisse Produkte: </h2></div>
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

<style>
    .books{
        @apply bg-red-300 px-2
    }
    .products{
        @apply bg-blue-300 px-2
    }
    .samples{
        @apply bg-green-300 px-2
    }
</style>