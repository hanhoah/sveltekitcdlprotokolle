<script>
    import Hashtags from '$lib/components/hashtags.svelte';
    export let data
</script>

<svelte:head>
  <title>Produkte der alternativen Medizin - Die Preis und Suchmaschine für alternative Medizin.</title>
  <meta name="description" content="Entdecken Sie eine Vielzahl natürlicher Produkte der alternativen Medizin und vergleichen Sie Preise mit unserer Preisvergleichs-Maschine. Unsere Produktgruppe bietet eine breite Auswahl an alternativen Naturprodukten, die darauf abzielen, die Gesundheit auf ganzheitliche Weise zu unterstützen, ohne auf pharmazeutische Medikamente zurückzugreifen. Finden Sie die besten Angebote für alternative Medizinprodukte und nutzen Sie unsere Plattform für transparente Preisvergleiche." />
</svelte:head>

<div class="w-full  p-3 text-xs bg-yellow-200  hover:bg-lime-300">{data.count} Produkte in der Datenbank gefunden. Bitte wählen Sie eine Kategorie aus um Ihr Produkt schneller zu finden.</div>
<div class="mb-5">
    <div>
        <nav>
            <div class="grid grid-cols-4 md:grid-cols-6 m-5 gap-3 ">
                {#each data.categories as category}
                <a href="/produkte/cat/{category.category_id}">
                <div class="w-full  p-1 text-xs bg-green-100  hover:bg-yellow-300">
                    {#if category.name ==='Oele'}
                        Öle
                    {:else}
                        {category.name}
                    {/if}
                    </div>
                </a>
                {/each}
            </div>
        </nav>
    </div>
    <slot />
    <Hashtags />
</div>

