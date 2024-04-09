<script>
	import Product from "../../produkte/product.svelte";

    export let data
    $: description = data.data.description
    $: title = data.data.id
    console.log('blogpost: ', title);
    $: metadescription = data.data.metadescription
    $: products =  data.products
    $: moreposts = data.moreposts

</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={metadescription} />
</svelte:head>

<div class="m-3 md:m-10 ">
    <h1>{title}</h1>
    {@html description}


    
    <div class="md:grid md:grid-cols-2">
        
        <div>
            <h2 class="text-center">Zum Artikel passende Produkte: </h2>
            <div class="grid grid-cols-2">
                {#each products as product }
                    <div >
                        <Product product={product} />
                    </div>
                {/each}
            </div>
        </div>
        <div>
            <h2 class="text-center">Weitere spannende Blog Beiträge</h2>
            <div>
                <ul>
                    {@html moreposts}
                </ul>
            </div>
        </div>


    </div>

    
</div>

