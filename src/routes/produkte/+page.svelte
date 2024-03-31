<script>
  export let data;
  import Product from './product.svelte';
  import { getBadge } from '$lib/functions/shops.ts';
</script>

<div class="px-2 m-2 border-2 ">
  <h2 >Produkte für die alternative Heilung</h2>
</div>
  <ul class="grid grid-cols-2 md:grid-cols-3 justify-around space-y-5">
    {#await data.streamed.products}
      Loading Products ...
      {:then products} 
      {#each products as product}
          <li class="my-2 relative">
            <div class="absolute right-10 md:right-28">
              {@html getBadge(product.image)}

            </div>
            <Product product={{id: product.id,name: product.name,img: product.image, price: product.price, slug: product.slug}} />
          </li>
        {/each}
    {/await}
  </ul>