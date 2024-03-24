<script>
	import { getImg } from '$lib/functions/getBookImg.ts';
    import { Button } from 'flowbite-svelte';



    export let data
    $: currentsample = data.sample
    $: samples = data.readingSamples
    $: book = data.book
    $: links = data.links
    const product_tags = data.product_tags
    
</script>

<svelte:head>
	<title>{currentsample?.id}</title>
	<meta name="description" content={currentsample?.text} />
</svelte:head>


<div class="grid grid-cols-3 text-xs border-2 bg-gray-200">
    <!-- weitere Leseprobem mit dem gleichen product_tag-->
    {#each samples as sample }
    {#if currentsample.id == sample.id }
    <div class="border-2 border-lime-700 m-1 p-2 bg-lime-400"> 
        {sample.id}
    </div>
    {:else}
    <div class="">
        <a href="/leseproben/{sample.slug}">
            <div class="border-2 m-1 p-1 "> 
                {sample.id}
            </div>
        </a>
        
    </div>
    {/if}
    {/each}
</div>
    
    <!-- die ausgewählte Leseprobe -->
<div class="grid grid-cols-1 md:grid-cols-2 md:m-2 md:p-2">
    <div class="p-2 md:pr-10">
        <h2>{currentsample.id}</h2>
        {@html currentsample.text}
        
    </div>
    
    <div class="p-2">
        <h2>
            <span class="md:hidden">Das war eine </span>Leseprobe aus dem Buch<br> {book?.title}

        </h2>
        <div>
            <img src={getImg(book?.img, book?.id, "books")} alt={book?.title}>
        </div>
        <!-- Book Links -->
        <div class="my-5 pb-10 flex flex-col items-center ">
            {#each links as link }
            <a href={link.link} target="_blank">
                <Button class="text-lg mt-3" color="green">{link.label} 🛒</Button>
            </a>
            {/each}
            <a href="https://www.amazon.de/gp/search?ie=UTF8&tag=jumex_online-21&linkCode=ur2&linkId=470bf27aa1feb315de9cb5f18b114f2f&camp=1638&creative=6742&index=books&keywords={book.title}" target="_blank">
                <Button class="text-lg mt-3" color="light"><img width="100" alt="Amazon Logo" src="/images/logos/Amazon.de-Logo.svg.png" /></Button>
                
            </a>
            <a href="https://www.ebay.de/sch/i.html?_from=R40&_trksid=p4432023.m570.l1313&_nkw={book.title}&_sacat=0" target="_blank">
                <Button class="text-lg mt-3" color="light"><img width="100" alt="Ebay Logo" src="/images/logos/EBay_logo.png" /></Button>
            </a>

        </div>        
    </div>
</div>

<div class="bg-blue-300 p-5 ">
    Weitere Leseproben zu folgenden Produkten 
    <div class="grid grid-cols-3 md:grid-cols-4">
        {#each product_tags as tag }
            <a href="/leseproben/cat/{tag.product_tag.toLowerCase()}">
                <div class="border-2 border-blue-100 m-1 md:m-2 p-1 md:p-2">
                    {tag.product_tag}
                </div>
            </a>
        {/each}

    </div>
</div>