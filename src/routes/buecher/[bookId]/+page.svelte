<script>
	import { getImg } from '$lib/functions/getImg.ts';
    import Book from '../book.svelte';

    export let data;
    import { nl2br } from '$lib/functions/nl2br.ts';
    import { Button } from 'flowbite-svelte';
    let book = data.bookdata;
    let hashtags = data.hashtags;
    let similarBooks = data.similarBooks;
    let desc = ""
    let img = getImg(book.img[0], book.id)
    if(book.desc)
        desc = nl2br(book.desc)
    else desc = "noch keine Beschreibung vorhanden."
    const spc = '&#x20;'

</script>

<!-- Buch Detail {book.title}
Link: {book.link} -->
<img width=400 alt="{book.title}" src="{img}" />

<div class="p-3">
    <h2 class="mb-3">Titel: {book.title}</h2>
    <h2 class="mb-3">Beschreibung: </h2>
        {@html desc}
    <div class="mt-5">
    <a href="{book.link}" target="_blank">
        <Button color="green">Mehr</Button>
    </a>
    
    </div>
    <div>Stichwörter:
        {#each hashtags as hashtag }
            #{hashtag.tag} {@html spc}
        {/each}

    </div>

    <div>Ähnliche Bücher: </div>
    
    <ul class="grid grid-cols-2 md:grid-cols-3">
        {#each similarBooks as similarbook}
          <li class="my-2"><Book book={{id: similarbook.id,title: similarbook.title,img: similarbook.img}} /></li>
        {/each}
      </ul>
       
</div>
    
    
    