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
<div class="grid grid-cols-2 md:grid-cols-3">
  {#each products as product}
      <div class="my-2 relative">
          <!-- Beachte, dass wir das 'loading' Attribut dynamisch hinzufügen -->
          {@html getBadge(product.id)}
          <Product product={{id: product.id, name: product.name, img: product.image, price: product.price}} />
      </div>
  {/each}
</div>
