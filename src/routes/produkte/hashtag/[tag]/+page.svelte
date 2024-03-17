<script>
export let data
import Product from '../../product.svelte';
import { getBadge } from '$lib/functions/shops.ts';

$: hashtag = data.hashtag
$: products = data.products
</script>

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
