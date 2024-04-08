<script>
    export let data
    $: description = data.data.description
    $: title = data.data.title

</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={title} />
</svelte:head>

<div class="m-3 md:m-10 ">
    <h1>{title}</h1>
    {@html description}
</div>