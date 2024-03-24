<script>
	import { capitalize } from '$lib/functions/helper.ts';

    export let data
    let category = capitalize(data.catid)
</script>

<h2>Leseproben der Kategory {category}  </h2>

{#each data.samples as leseprobe }
    <a href="/leseproben/{leseprobe.slug}">
        <div class="border-2 m-2 p-2">
            {leseprobe.id}
        </div>
    </a>

{/each}