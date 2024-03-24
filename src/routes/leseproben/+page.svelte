<h2>
    Leseproben
</h2>
<p>
    Hier finden Sie informative Leseproben aus Büchern die wir Ihnen in der Bücher Rubrik empfehlen. Denken Sie daran dass die Leseproben nur einen minimalen Bruchteil der Informationsfülle aus dem Buch enthalten und diese nicht vollständig sind. 
</p>
<p>
    Im folgenden sehen sie die Titel der letzten 30 neu hinzugekommenen Leseproben. Beim Klick auf den Titel kommen Sie an die eigentliche Leseprobe. 
</p>
<p>
    Übrigens: Wenn Sie die Suche nutzen werden Ihnen als Suchergebnis auch passende Leseproben geliefert. 
</p>


{#each data.leseproben as leseprobe }
    <a href="/leseproben/{leseprobe.slug}">
        <div class="border-2 m-2 p-2">
            {leseprobe.id}
        </div>
    </a>

{/each}

<script>
    export let data
</script>