<script>
    export let data

</script>

<div class="w-full  p-3 text-xs bg-yellow-200  hover:bg-lime-300">{data.count} Produkte in der Datenbank gefunden. Bitte wählen Sie eine Kategorie aus um Ihr Produkt schneller zu finden.</div>
<div>
    <div>
        <nav>
            <div class="grid grid-cols-4 md:grid-cols-6 m-5 gap-3 ">
                {#each data.categories as category}
                <a href="/produkte/cat/{category.id}">
                <div class="w-full  p-1 text-xs bg-green-100  hover:bg-yellow-300">
                        {category.name}
                    </div>
                </a>
                {/each}
            </div>
        </nav>
    </div>
    <slot />
</div>

