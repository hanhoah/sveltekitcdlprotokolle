
<script>
    import Book from '../../book.svelte';
    import { Spinner } from 'flowbite-svelte';
    export let data;
    $: catid = parseInt(data.data.catid)-1

    
</script>
  
<svelte:head>
  <title>{data.data.title}</title>
  <meta name="description" content="{data.data.metaDescription}" />
</svelte:head>

<div class="px-2 m-2 border-2 ">
    <h2>
        Bücher der Kategorie  {data.categories[catid].name}
    </h2>
    <div>
        {data.data.metaDescription}
    </div>
  
  </div>
  
    <ul class="grid grid-cols-2 md:grid-cols-3 bg-gray-100">
        {#await data.streamed.books}
        <div class="loading">
            <Spinner />
            Loading Books ...
        </div>
        {:then books}
            {#each books as book}
                <li class="my-2"><Book book={{slug: book.slug, id: book.id,title: book.title,img: book.img}} /></li>
            {/each}
        {/await}
    </ul>


  