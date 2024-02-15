<script>
	import { getImg } from '$lib/functions/getImg.ts';

    export let data;
    import { nl2br } from '$lib/functions/nl2br.ts';
    import { Button } from 'flowbite-svelte';
    let book = data.data;
    let desc = ""

    let img = getImg(book.img[0], book.id)

    if(book.desc)
        desc = nl2br(book.desc)
    else desc = "noch keine Beschreibung vorhanden."



</script>

<!-- Buch Detail {book.title}
Link: {book.link} -->
<img width=400 alt="{book.title}" src="{img}" />
<h2>Titel: {book.title}</h2>

<h2>
Beschreibung: 
</h2>

{@html desc}

<div>

    <a href="{book.link}" target="_blank">
        <Button color="green">Mehr</Button>
    </a>
</div>


