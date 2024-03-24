<script>
    export let data
    $: currentsample = data.sample
    $: samples = data.readingSamples
</script>

<div class="grid grid-cols-3 text-xs">
    <!-- weitere Leseprobem mit dem gleichen product_tag-->
    {#each samples as sample }
    {#if currentsample.id == sample.id }
    <div class="border-2 m-1 p-1 bg-lime-400"> 
        {sample.id}
    </div>
    {:else}
    <div>
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
<div class="m-2 p-2">
    <h2>{currentsample.id}</h2>
    {@html currentsample.text}
</div>