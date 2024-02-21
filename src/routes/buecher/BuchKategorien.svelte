<script>
    import { Spinner } from "flowbite-svelte";
    export let kategorien
</script>

<div class="bg-teal-100">
    <div class="p-2 w-full mt-5  bg-teal-300 text-lg font-bold text-center">alle Kategorien: </div>
    <div class="p-5 flex flex-row justify-center ">
        {#await kategorien}
        <div class="loading">
            <Spinner />
            Loading Categories ...
        </div>
        {:then categories}
            <ul>
                {#each categories as category}

                    <li><a href="/buecher/cat/{category.id}">{category.name}</a></li>
                {/each}
            </ul>
        {/await}
    </div>        
</div>