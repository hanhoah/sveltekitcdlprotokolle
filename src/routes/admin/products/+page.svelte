<script>
    export let data
    let category = ""
</script>

<h2>Grab new Product</h2>
<form method="POST" action="?/addProduct" class="grid grid-cols-1">
        <input type="text" name="url" placeholder="Url" />
        <select name="category" placeholder="category" bind:value={category}>
            <option value="" selected disabled>Kategorie</option>
            {#each data.categories as category }
            <option value={category.id}>{category.name}</option>
                
            {/each}
        </select>
    <div>
        <button>Grab Product</button>
    </div>
</form>

<style>

    form{
        @apply space-y-5 m-10
    }

    button{@apply bg-slate-500 text-white p-3}
</style>