
<script>
    // import { COLOR } from '$env/static/private';
    import Product from '../../product.svelte';
    import { Spinner } from 'flowbite-svelte';
    export let data;
    $: catid = data.data.catid
    $: description = data.data.description
    import { getBadge } from '$lib/functions/shops.ts';



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
          <div class="">
          <li class="my-2 relative">
              {@html getBadge(product.id)}

              <Product product={{id: product.id,name: product.name,img: product.image}} />
              
            </li>
          </div>
          {/each}
      {/await}
    </ul>

