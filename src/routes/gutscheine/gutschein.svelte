<script>
    import Icon from "@iconify/svelte";
    export let shop = "mustershop";
    export let desc = "10% Rabatt";
    export let code = "CDLPROTOKOLLE";
    export let gueltig = "Immer";
    export let color = "blue";
    export let href = "";
    export let icon = "ph:tree-thin";
    // console.log('Book Komponenten Ausgabe ******************  book id ist ', book.id);
    // console.log(typeof(book.id));
</script>

<a href="{href}" target="_blank">
    <div class="w-48 h-44 mt-2 p-2 bg-{color}-200 text-{color}-800 relative">
        <Icon icon="{icon}" class="absolute z-10 opacity-60" height="160" color="white"/>
        <div class="border-[4px] h-full relative z-30 p-2 border-white border-dotted " >
            <div class="overflow-auto">
                <h2>
                    {shop}
                </h2>
                <h3>{desc}</h3>
                <div>
                    Code: <b>{code}</b>
                </div>
                <span>Gültig: {gueltig}</span>
            </div>
        </div>
    </div>
</a>