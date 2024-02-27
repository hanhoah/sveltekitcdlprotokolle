
<script>
    import Product from '../../product.svelte';
    import { Spinner } from 'flowbite-svelte';
    export let data;
    $: catid = data.data.catid

    
</script>
  

<div class="px-2 m-2 border-2 ">
    <h2>
        Produkte der Kategorie  {data.data.catname}
    </h2>
</div>
    <ul class="grid grid-cols-2 md:grid-cols-3">
      {#await data.streamed.products}
        Loading Products ...
        {:then products} 
          {#each products as product}
          <li class="my-2"><Product product={{id: product.id,name: product.name,img: product.image}} /></li>
          {/each}
      {/await}
    </ul>