<script>
    import { Button } from 'flowbite-svelte';
    import { getImg } from '$lib/functions/getImg.ts';
    import { Spinner } from 'flowbite-svelte';
    import Book from '../book.svelte';

    export let data;
    $: book = data.data
    $: title = book.title;
    $: img = getImg(book.img[0], book.id)
    $: desc = book.desc;

    const spc = '&#x20;'
</script>

<div class="w-full flex flex-row bg-gray-100 justify-center">
    <img class="py-10" width=400 alt="{title}" src="{img}" />
</div>


    <div class="bg-yellow-100">
        <h2 class=" bg-yellow-300 p-2">{book.title}</h2>
        <div class="p-5">
            {@html desc}

        </div>
        <div class="my-5 pb-10 flex flex-col items-center ">
            {#await data.streamed.links}
            <div class="loading">
                <Spinner />
                Loading Shops ...
            </div>
            {:then links} 
            {#each links as link }
            <a href="{link.link}" target="_blank">
                <Button class="text-lg mt-3" color="green">{link.label} 🛒</Button>
            </a>
            {/each}
                
            {/await}
        </div>
    </div>

    <div class="bg-teal-100">
        <div class="p-2 w-full mt-5  bg-teal-300 text-lg font-bold text-center">Stichwörter: </div>
        <div class="p-5 flex flex-row justify-center ">
            {#await data.streamed.hashtags}
                <div class="loading">
                    <Spinner />
                    Loading hashtags ...
                </div>
                {:then hashtags}
                    {#each hashtags as hashtag}
                        #{hashtag.tag} {@html spc}
                    {/each}
            {/await}
        </div>        
    </div>

    <div class="bg-lime-100">
        <div class="w-full my-5 bg-lime-300 p-3 text-lg font-bold text-center">Ähnliche Bücher: </div>
        <ul class="grid grid-cols-2 md:grid-cols-3">
        {#await data.streamed.similarBooks}
        <div class="loading">
            <Spinner />
            Loading similar books ...
        </div>
            {:then similarBooks}
                {#each similarBooks as similarbook}
                    <li class="my-2"><Book book={{id: similarbook.id,title: similarbook.title,img: similarbook.img}} /></li>
                {/each}
        {/await}
        </ul>
    </div>
    
    