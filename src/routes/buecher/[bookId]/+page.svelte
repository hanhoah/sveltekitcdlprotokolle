<script>
    import { Button } from 'flowbite-svelte';
    import { getImg } from '$lib/functions/getBookImg.ts';
    import { Spinner } from 'flowbite-svelte';
    import Book from '../book.svelte';
    import { Badge } from 'flowbite-svelte';
    import { nl2br } from '$lib/functions/nl2br.ts';

    export let data;
    let links = data.links;
    $: book = data.data
    $: title = book.title;
    $: img = getImg(book.img[0], book.id, "books")
    $: desc = book.desc;

    let similarBooks = data.similarBooks;


    const spc = '&#x20;'
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content="{desc}" />
</svelte:head>

<div class="w-full flex flex-row bg-gray-100 justify-center">
    <img class="py-10" width=400 alt="{title}" src="{img}" />
</div>


    <div class="bg-yellow-100">
        <h2 class=" bg-yellow-300 p-2 text-center">{title}</h2>
        <div class="p-5">
            {@html nl2br(desc)}

        </div>
        <div class="my-5 pb-10 flex flex-col items-center ">
            {#each links as link }
            <a href="{link.link}" target="_blank">
                <Button class="text-lg mt-3" color="green">{link.label} 🛒</Button>
            </a>
            {/each}
                
            <a href="https://www.amazon.de/gp/search?ie=UTF8&tag=jumex_online-21&linkCode=ur2&linkId=470bf27aa1feb315de9cb5f18b114f2f&camp=1638&creative=6742&index=books&keywords={title}" target="_blank">
                <Button class="text-lg mt-3" color="light"><img width="100" alt="Amazon Logo" src="/images/logos/Amazon.de-Logo.svg.png" /></Button>
                
            </a>
            

            <a href="https://www.ebay.de/sch/i.html?_from=R40&_trksid=p4432023.m570.l1313&_nkw={title}&_sacat=0" target="_blank">
                <Button class="text-lg mt-3" color="light"><img width="100" alt="Ebay Logo" src="/images/logos/EBay_logo.png" /></Button>
            </a>

        </div>
    </div>

    <div>
        <h2 class=" bg-gray-300 p-2 text-center">Ähnliche Bücher</h2>
        <ul class="grid grid-cols-2 md:grid-cols-3">
            {#each similarBooks as book}
            <li class="my-2"><Book book={{slug: book.slug, id: book.id,title: book.title,img: book.img}} /></li>
            {/each}
          </ul>
    </div>