<script>
    import { Button } from 'flowbite-svelte';
    import { getProductImg } from '$lib/functions/getProductImg.ts';
    import { Spinner } from 'flowbite-svelte';
    import Product from '../product.svelte';
    import { Badge } from 'flowbite-svelte';

    export let data;

    console.log('data in +page ist ', data);
    $: pid = data.data.id
    $: img = getProductImg(data.data.image) 
    $: name = data.data.name
    $: desc = data.data.description
    $: link = data.data.link
    let title = "test"
    const spc = '&#x20;'
</script>

<div class="w-full flex flex-row bg-gray-100 justify-center">
    <img class="py-10" width=400 alt="{title}" src="{img}" />
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
        <div class="my-5 pb-10 flex flex-col items-center ">
            <a href="{link}" target="_blank">
                <Button class="text-lg mt-3" color="green">{name} 🛒</Button>
            </a>
        </div>
    </div>


    <div class="bg-lime-100">
        <div class="w-full my-5 bg-lime-300 p-3 text-lg font-bold text-center">Ähnliche Produkte: </div>
        <ul class="grid grid-cols-2 md:grid-cols-3">

        </ul>
    </div>
    
    