<script>
    export let data
    import { Button } from 'flowbite-svelte';

</script>

<div>
    <div>
        <nav>
            <div class="grid grid-cols-2 md:grid-cols-4 m-5 gap-3 ">
                {#each data.categories as category}
                <Button color="blue" pill>
                    <a href="/produkte/cat/{category.id}">{category.name}</a>
                </Button>
                {/each}
            </div>
        </nav>
    </div>
    <slot />
</div>

