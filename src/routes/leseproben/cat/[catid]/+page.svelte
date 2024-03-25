<script>
	import { capitalize } from '$lib/functions/helper.ts';

    export let data
    let category = capitalize(data.catid)
    const product_tags = data.product_tags
</script>

<h2>Leseproben der Kategory {category}  </h2>

{#each data.samples as leseprobe }
    <a href="/leseproben/{leseprobe.slug}">
        <div class="border-2 m-2 p-2 hover:bg-blue-800 hover:text-white">
            {leseprobe.id}
        </div>
    </a>

{/each}

<div class="bg-blue-300 p-5 ">
    Wähle faszinierende Leseproben aus folgenden Produkten 
    <div class="grid grid-cols-3 md:grid-cols-4">
        {#each product_tags as tag }
            <a href="/leseproben/cat/{tag.product_tag.toLowerCase()}">
                <div class="border-2 border-blue-100 m-1 md:m-2 p-1 md:p-2 hover:bg-blue-800 hover:text-white">
                    {tag.product_tag}
                </div>
            </a>
        {/each}

    </div>
</div>