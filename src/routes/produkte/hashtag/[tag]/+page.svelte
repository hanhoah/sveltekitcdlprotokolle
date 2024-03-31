<script>
export let data
import Product from '../../product.svelte';
import { getBadge } from '$lib/functions/shops.ts';

$: hashtag = data.hashtag
$: products = data.products
</script>

<svelte:head>
  <title>Der Preisvergleich für {hashtag} Produkte</title>
  <meta name="description" content="Entdecken Sie eine Vielzahl natürlicher Produkte der alternativen Medizin und vergleichen Sie Preise mit unserer Preisvergleichs-Maschine. Unsere Produktgruppe bietet eine breite Auswahl an alternativen Naturprodukten, die darauf abzielen, die Gesundheit auf ganzheitliche Weise zu unterstützen, ohne auf pharmazeutische Medikamente zurückzugreifen. Finden Sie die besten Angebote für alternative Medizinprodukte und nutzen Sie unsere Plattform für transparente Preisvergleiche.  " />
</svelte:head>

<div class="w-full"><h2 class="text-center my-5 p-2">Produkte mit dem Hashtag {hashtag} gefunden.</h2></div>

<!-- Hier zeigst du die Produkte an -->
<div class="grid grid-cols-2 md:grid-cols-3 space-y-5">
  {#each products as product}
  <div class="lazy-load">
    <li class="my-2 relative">
        <!-- Beachte, dass wir das 'loading' Attribut dynamisch hinzufügen -->
        <div class="absolute right-10 md:right-28">
          {@html getBadge(product.image)}

        </div>
        <Product product={{id: product.id, name: product.name, img: product.image, price: product.price, slug: product.slug}} />
    </li>
</div>
  {/each}
</div>

<style>

  li{
    list-style-type: none

  }
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