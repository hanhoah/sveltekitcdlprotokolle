
<script>
  import Book from './book.svelte';

    export let data;
  </script>

<h2>{data.title}</h2>

  <ul class="grid grid-cols-2 md:grid-cols-3">


    {#await data.streamed.books}
      Loading books ...
    {:then books} 
    {#each books as book}
      <li class="my-2"><Book book={{id: book.id,title: book.title,img: book.img}} /></li>
    {/each}
      
    {/await}

  </ul>

