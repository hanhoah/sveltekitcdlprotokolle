<script>
    import { Button } from 'flowbite-svelte';
    import { getImg } from '$lib/functions/getImg.ts';
    import Book from '../book.svelte';

    export let data;
    $: book = data.data
    $: title = book.title;
    $: img = getImg(book.img[0], book.id)
    $: desc = book.desc;
    const spc = '&#x20;'
</script>

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
    <div>
    <div class="w-full my-5 bg-teal-200 p-3 text-lg font-bold text-center">Stichwörter: </div>
            
    {#await data.streamed.hashtags}
    Loading...
    {:then hashtags}
        {#each hashtags as hashtag}
            #{hashtag.tag} {@html spc}
        {/each}
    {/await}

    </div>
    <div class="w-full my-5 bg-yellow-300 p-3 text-lg font-bold text-center">Ähnliche Bücher: </div>
    <ul class="grid grid-cols-2 md:grid-cols-3">
    {#await data.streamed.similarBooks}
        Loading...
        {:then similarBooks}
            {#each similarBooks as similarbook}
                <li class="my-2"><Book book={{id: similarbook.id,title: similarbook.title,img: similarbook.img}} /></li>
            {/each}
    {/await}
    </ul>
</div>
    
    