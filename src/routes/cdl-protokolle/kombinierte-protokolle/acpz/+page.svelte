<script>
	import A from '../../a.svelte';
    import C from '../../c.svelte';
    import P from '../../p.svelte';
    import Z from '../../z.svelte';
    import Tab from '../tab.svelte';
    import Alltab from '../alltab.svelte';

    let name = 'ACPZ';

</script>

<svelte:head>
    <title>CDL/CDS kombiniertes Protokoll {name} </title>
    <meta name="description" content="Entdecken Sie CDL-Protokolle für Ihre Gesundheitsbedürfnisse. Optimieren Sie Ihre Selbstbehandlung mit CDL " />
</svelte:head>

<div class="flex flex-col md:flex-row space-y-5 md:space-x-5 ">
    <div class="card bg-base-100 w-96 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Mit dem kombinierten {name}-Protokoll zu behandelnde Erkrankungen:</h2>
            <ul>
                <li>Hyperthyreose</li>
            </ul>
        </div>
    </div>
    
    <div class="card bg-base-100 w-96 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Tipps zum {name}-Kombiprotokoll</h2>
            <div>
                Es beginnt mit Protokoll A, setzt sich mit Protokoll C fort und kombiniert die Protokolle P und Z. Hyperthyreose Wenden Sie nach Möglichkeit das Z Zapper-Protokoll an. Protokoll P wird empfohlen, wenn Sie bei der Anwendung von Protokoll C unter Angstzuständen oder Nervosität leiden.
            </div>
    
        </div>
    </div>

</div>

<div class="divider divider-accent"/>
<div role="tablist" class="tabs tabs-xs tabs-lifted">
    <Tab title="Protokoll A" checked ><A /></Tab>
    <Tab title="Protokoll C" ><C /></Tab>
    <Tab title="Protokoll P" ><P /></Tab>
    <Tab title="Protokoll Z" ><Z /></Tab>
    <Alltab />
</div>

  <div class="divider divider-accent"/>

  <style>
.tab {
    min-width: 150px; /* Setze eine angemessene Breite */
}
  </style>