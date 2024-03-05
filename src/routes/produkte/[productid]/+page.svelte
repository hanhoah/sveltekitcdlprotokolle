<script>
    import { Button } from 'flowbite-svelte';
    import { getProductImg } from '$lib/functions/getProductImg.ts';
    import { Spinner } from 'flowbite-svelte';
    import Product from '../product.svelte';
    import { Badge } from 'flowbite-svelte';
	import { getBadge } from '$lib/functions/shops.ts';
    export let data;

    $: img = getProductImg(data.data.image) 
    $: name = data.data.name
    $: id = data.data.id
    $: desc = data.data.description
    $: link = data.data.link
    $: searchterm = data.searchterm


    const spc = '&#x20;'

</script>

<div class="w-full flex flex-row bg-gray-100 justify-center relative">
    {@html getBadge(id)}
    <img class="py-10" width=400 alt="{name}" src="{img}" />
</div>

<div class="my-5 pb-10 flex flex-col items-center top-0 sticky ">
    <a href="{link}" target="_blank">
        <Button class="text-lg mt-3" color="green">{name} 🛒</Button>
    </a>
</div>

    <div class="bg-yellow-100">
        <h2 class=" bg-yellow-300 p-2">{name}</h2>
        <div id="desc" class="p-5">
            {@html desc}
        </div>
        <div id="links" class="w-5/6 m-auto bg-zinc-50 border-zinc-200 border-2 p-5">

            <div class="my-5 pb-10 flex flex-col items-center space-y-5">
                <a href="{link}" target="_blank">
                    <Button class="text-lg mt-3" color="green">{name} 🛒</Button>
                </a>
    
                <a href="https://www.amazon.de/gp/search?ie=UTF8&tag=jumex_online-21&linkCode=ur2&linkId=470bf27aa1feb315de9cb5f18b114f2f&camp=1638&creative=6742&index=books&keywords={searchterm}" target="_blank">
                    <Button class="text-lg mt-3" color="light"> <img alt="amazon logo" width="100" src="/images/logos/Amazon.de-Logo.svg.png" /> </Button>
                </a>
    
                <a href="https://www.ebay.de/sch/i.html?_from=R40&_trksid=p4432023.m570.l1313&_nkw={searchterm}&_sacat=0" target="_blank">
                    <Button class="text-lg mt-3" color="light"> <img alt="ebay logo" width="100" src="/images/logos/EBay_logo.png" /></Button>
                </a>            
    
            </div>
        </div>
        <div id="abstand" class="h-5"></div>
        
    </div>


    <div class="bg-lime-100">
        <div class="w-full my-5 bg-lime-300 p-3 text-lg font-bold text-center">Ähnliche Produkte: </div>
        <ul class="grid grid-cols-2 md:grid-cols-3">
            {#await data.streamed.similarProducts}
            <div class="loading">
                <Spinner />
                Loading similar Products ...
            </div>
                {:then similarProducts}
                    {#each similarProducts as similarProduct}
                            <li class="my-2"><Product product={{id: similarProduct.id,name: similarProduct.name,img: similarProduct.image}} /></li>
                    {/each}
            {/await}
            </ul>    


    </div>
    
    