
<script>
  import Book from './book.svelte';

    export let data;
  </script>

  <ul class="grid grid-cols-2 md:grid-cols-3">
    {#each data.books as book}
      <li class="my-2"><Book book={{id: book.id,title: book.title,img: book.img}} /></li>
    {/each}
  </ul>

