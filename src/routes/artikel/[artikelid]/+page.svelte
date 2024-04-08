<script>
	import Product from "../../produkte/product.svelte";

    export let data
    $: description = data.data.description
    $: title = data.data.title
    const products =  data.products

</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={title} />
</svelte:head>

<div class="m-3 md:m-10 ">
    <h1>{title}</h1>
    {@html description}


    <h2 class="text-center">Zum Artikel passende Produkte: </h2>

    <div>

        <div class="grid grid-cols-3">
        {#each products as product }
            <div >
                <Product product={product} />
            </div>
            {/each}
        </div>
    </div>

    
</div>

