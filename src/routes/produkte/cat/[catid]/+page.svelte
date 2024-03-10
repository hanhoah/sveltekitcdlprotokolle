<script>
  // Configuration
  const maxProductsPerPage = 50;

  import { getBadge } from '$lib/functions/shops.ts';
  import Product from '../../../produkte/product.svelte';

  export let data;
  console.log('catid: ', data.catid);
  $: pageproducts = data.products.slice(0,10)

  function getPageProducts(){
      pageproducts = data.products.slice(0,10)
      return pageproducts;
  }

  pageproducts = getPageProducts();

  $: length = data.products.length
  let currentPage = 1;
  $: category = data.category;
  $: description = data.description;
  
  $: totalPages = () => Math.ceil(length / maxProductsPerPage);
  
  // Funktion zum Wechseln der Seite
  async function goToPage(page) {
      currentPage = page;
      // Produkte der aktuellen Seite anzeigen
      const startIndex = (currentPage - 1) * maxProductsPerPage;
      const endIndex = startIndex + maxProductsPerPage;
      pageproducts = await data.products.slice(startIndex,endIndex)
      return pageproducts
  }
  pageproducts = goToPage(1);
</script>

<div class="w-full"><h2 class="text-center my-5 p-2">{length} Produkte in der Kategorie {category} gefunden.</h2></div>

<!-- Kategorie Beschreibung wenn vorhanden -->
{#if description }
<div class="border-2 p-2 bg-slate-100">{description}</div>
  
{/if}

<!-- Hier zeigst du die Produkte an -->
<ul class="grid grid-cols-2 md:grid-cols-3">
  {#each pageproducts as product}
  <div class="lazy-load">
      <li class="my-2 relative">
          <!-- Beachte, dass wir das 'loading' Attribut dynamisch hinzufügen -->
          {@html getBadge(product.id)}
          <Product product={{id: product.id, name: product.name, img: product.image}} />
      </li>
  </div>
  {/each}
</ul>

<!-- Hier die Pagination-Steuerung -->
{#if totalPages() > 1}
<div class="page-selector">
  {#each Array.from({ length: totalPages() }).map((_, index) => index + 1) as page}
  {#if page == currentPage}
      <span class="page-number current-page">{page}</span>
  {:else}
      <a on:click={()=>goToPage(page)} class="page-number">{page}</a>
  {/if}
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

.page-number:hover {
  @apply underline bg-gray-800 text-white
}

.current-page {
  @apply bg-blue-500 text-white; 
}
</style>