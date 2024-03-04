
<script>
    // import { COLOR } from '$env/static/private';
    import Product from '../../product.svelte';
    import { Spinner } from 'flowbite-svelte';
    import {Badge} from 'flowbite-svelte';
    export let data;
    $: catid = data.data.catid

    function getBadge(id){
      let shopid = id.split('-')[0]
      let shop = ""

      switch(shopid){
        case "gvk":
          shop = "Kronenberg"
          break;
        case "wk":
          shop = "Waldkraft"
          break;
        default:
          shop = "Unknown"
      }
      let badge = '<div class="border-2 absolute right-2 text-white rounded-md text-s p-1 text-center top-5 w-24 bg-purple-700 opacity-65" large color="green">' + shop + '</div>'

      return badge
    }

</script>
  
<div class="px-2 m-2 border-2 ">
    <h2>
        {data.data.productQty} Produkte der Kategorie  {data.data.catname} gefunden
    </h2>

  </div>
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

