<script>
    import { Button } from 'flowbite-svelte';
    import { getImg } from '$lib/functions/getImg.ts';
    import Book from '../book.svelte';


export let data;
//console.log('data ', data);
$: book = data.data
$: title = book.title;
$: img = getImg(book.img[0], book.id)
$: desc = book.desc;
$: similarBooks = data.similarBooks;
$: hashtags = data.hashtags;

console.log(hashtags);
const spc = '&#x20;'

    // $: post = data.post;
    // console.log('post.bookDetails.bookdata', post.bookDetails.bookdata);
</script>


<!-- Buch Detail {book.title}
Link: {book.link} -->
<img width=400 alt="{title}" src="{img}" />

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
    
    