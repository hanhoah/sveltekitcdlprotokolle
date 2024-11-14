<script>
	import C from '../../c.svelte';
	import F from '../../f.svelte';
	import O from '../../o.svelte';
	import Z from '../../z.svelte';
	import Tab from '../tab.svelte';
	import Alltab from '../alltab.svelte';

	const name = 'CFOZ';
</script>

<svelte:head>
	<title>CDL/CDS kombiniertes Protokoll {name}</title>
	<meta
		name="description"
		content="Entdecken Sie CDL-Protokolle für Ihre Gesundheitsbedürfnisse. Optimieren Sie Ihre Selbstbehandlung mit CDL "
	/>
</svelte:head>

<div class="flex flex-col md:flex-row space-y-5 md:space-x-5">
	<div class="card bg-base-100 w-96 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Mit dem kombinierten {name}-Protokoll zu behandelnde Erkrankungen:</h2>
			<ul>
				<li>Grippe</li>
				<li>Erkältung</li>
			</ul>
		</div>
	</div>

	<div class="card bg-base-100 w-96 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Tipps zum {name}-Kombiprotokoll</h2>
			<div>
				<p>
					Beginnen Sie mit dem Häufigkeitsprotokoll und fahren Sie je nach Schweregrad mit Protokoll
					C fort.
				</p>
				<p>Bei Ohrenbeschwerden Protokoll O anwenden.</p>
				<p>Das Zapper-Protokoll liefert gute Ergebnisse gegen Viruserkrankungen.</p>
			</div>
		</div>
	</div>
</div>

<div class="divider divider-accent" />
<div role="tablist" class="tabs tabs-xs tabs-lifted">
	<Tab title="Protokoll C" checked><C /></Tab>
	<Tab title="Protokoll F"><F /></Tab>
	<Tab title="Protokoll O"><O /></Tab>
	<Tab title="Protokoll Z"><Z /></Tab>
	<Alltab />
</div>

<div class="divider divider-accent" />

<style>
	.tab {
		min-width: 150px; /* Setze eine angemessene Breite */
	}
</style>
