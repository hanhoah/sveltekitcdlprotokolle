
<script>
    // import { COLOR } from '$env/static/private';
    import Product from '../../product.svelte';
    import { Spinner } from 'flowbite-svelte';
    export let data;
    $: catid = data.data.catid
    $: description = data.data.description
    $: qty = data.data.productQty
    import { getBadge } from '$lib/functions/shops.ts';
    import { setupLazyLoading } from '$lib/functions/lazyload.js';
  	import { onMount } from 'svelte';

    onMount(() => {
        setupLazyLoading(); // Rufe die Funktion auf
    });

    function getPageSelector(qty) {
        if (qty > 50) {
            let numPages = Math.ceil(qty / 50);
            return Array.from({ length: numPages }, (_, i) => i + 1);
        } else {
            return null;
        }
    }

    function getClass(page) {
        return page === currentPage ? 'page-number current-page' : 'page-number';
    }

</script>
  
<div class="px-2 m-2 border-2 ">
    <h2>
        {data.data.productQty} Produkte der Kategorie  {data.data.catname} gefunden
    </h2>

  </div>

  {#if description}
  <div id="description">
    {description}
  </div>
  {/if}



    <ul class="grid grid-cols-2 md:grid-cols-3">
      {#await data.streamed.products}
        <Spinner />
          Lade Produkte ...
        {:then products} 
          {#each products as product}
          <div class="lazy-load">
          <li class="my-2 relative">
            <!-- Beachte, dass wir das 'loading' Attribut dynamisch hinzufügen -->
              {@html getBadge(product.id)}
              <Product product={{id: product.id,name: product.name,img: product.image}} />
            </li>
          </div>
          {/each}
      {/await}
    </ul>

    {#if getPageSelector(qty)}
    <div class="page-selector">
        {#each getPageSelector(qty) as page}
            <span class="page-number">{page} </span>
        {/each}
    </div>
{/if}


<style>
  .page-selector {
    @apply my-10 flex justify-center
  }

  .page-number {
    @apply p-2 ml-5 border-2 cursor-pointer
  }

  .page-number:hover { @apply underline bg-gray-800 text-white
  
  }

  .current-page {
        @apply bg-blue-500 text-white; 
    }
</style>