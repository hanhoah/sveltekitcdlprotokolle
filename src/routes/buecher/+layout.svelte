<script>
    export let data
    console.log('data', data);
    import { Button } from 'flowbite-svelte';
    import { inject } from '@vercel/analytics'
</script>

<div>
    <div>
        <nav>
            <div class="grid grid-cols-2 md:grid-cols-4 m-5 gap-3 ">
                {#each data.categories as category}
                <Button color="blue" pill>
                    <a href="/buecher/cat/{category.id}">{category.name}</a>
                </Button>
                {/each}
            </div>
        </nav>
    </div>
    <slot />
</div>
