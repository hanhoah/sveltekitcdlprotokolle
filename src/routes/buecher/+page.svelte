<script>
  import Book from './book.svelte';
  import { Spinner } from 'flowbite-svelte';
  export let data;
</script>

<svelte:head>
  <title>Buchempfehlungen für Bücher der Gesundheit und alternativen Medizin</title>
  <meta name="description" content="Die Bestseller aus der Medizin die die Pharma verbieten möchte. Die Titel sprechen für sich. 'Gesundheit verboten'. 'Codex Humanus - Das Buch der Menschlichkeit', 'Zahnarztlügen'. Tauchen Sie ein in die Welt der 'Medizinskandale' und nehmen Sie Ihre Gesundheit in die eigene Hand. Niemand weiss besser als Sie was Ihr Körper braucht. Das notwendige Know-How zur Selbsthilfe finden Sie bei uns. " />
</svelte:head>


<div class="px-2 m-2 border-2 ">
  <h2 >{data.title}</h2>
</div>
  <ul class="grid grid-cols-2 md:grid-cols-3">
    {#await data.streamed.books}
    <Spinner /> loading books ...
      {:then books} 
        {#each books as book}
        <li class="my-2"><Book book={{slug: book.slug, id: book.id,title: book.title,img: book.img}} /></li>
        {/each}
    {/await}
  </ul>