<script>
	import A from '../../a.svelte';
    import C from '../../c.svelte';
    import Tab from '../tab.svelte';
    import Alltab from '../alltab.svelte';
</script>

<svelte:head>
    <title>CDL/CDS kombiniertes Protokoll AC </title>
    <meta name="description" content="Entdecken Sie CDL-Protokolle für Ihre Gesundheitsbedürfnisse. Optimieren Sie Ihre Selbstbehandlung mit CDL " />
</svelte:head>

<div class="flex flex-col md:flex-row space-y-5 md:space-x-5 ">
    <div class="card bg-base-100 w-96 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Mit dem kombinierten AC-Protokoll zu behandelnde Erkrankungen:</h2>
            <ul>
                <li>GN Poststrep- Glomerulonephritis.</li>
            </ul>
        </div>
    </div>
    
    <div class="card bg-base-100 w-96 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Tipps zum AC-Kombiprotokoll</h2>
            <div>
                Sobald Protokoll A abgeschlossen ist, beginnen wir mit C.
            </div>
    
        </div>
    </div>

</div>

<div class="divider divider-accent"/>
<div role="tablist" class="tabs tabs-xs tabs-lifted">
    <Tab title="Protokoll A" checked><A /></Tab>
    <Tab title="Protokoll C" ><C /></Tab>
    <Alltab />
</div>

  <div class="divider divider-accent"/>
