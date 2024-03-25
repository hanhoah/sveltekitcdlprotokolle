<script>
    export let data

    const product_tags = data.product_tags
</script>

<h2>
    Leseproben
</h2>
<p>
    Hier finden Sie informative Leseproben aus Büchern die wir Ihnen in der Bücher Rubrik empfehlen. Denken Sie daran dass die Leseproben nur einen minimalen Bruchteil der Informationsfülle aus dem Buch enthalten und diese nicht vollständig sind. 
</p>
<p>
    Im folgenden sehen sie die Titel der letzten 10 neu hinzugekommenen Leseproben. Beim Klick auf den Titel kommen Sie an die eigentliche Leseprobe. 
</p>
<p>
    Übrigens: Wenn Sie die Suche nutzen werden Ihnen als Suchergebnis auch passende Leseproben geliefert. 
</p>


{#each data.leseproben as leseprobe }
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

