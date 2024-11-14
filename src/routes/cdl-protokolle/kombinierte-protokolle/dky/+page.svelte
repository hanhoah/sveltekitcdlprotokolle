<script>
	import D from '../../d.svelte';
	import K from '../../k.svelte';
	import Y from '../../y.svelte';

	import Tab from '../tab.svelte';
	import Alltab from '../alltab.svelte';

	const name = 'DKY';
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
				<li>Chagas</li>
				<li>Bisse</li>
				<li>Vitiligo</li>
			</ul>
		</div>
	</div>

	<div class="card bg-base-100 w-96 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Tipps zum {name}-Kombiprotokoll</h2>
			<div>
				<h2>Bisse, Chagas:</h2>
				<p>
					Bei Giftbissen Protokoll Y mit subkutaner Injektion anwenden oder das CDS in den Biss
					einführen, um das Toxin zu oxidieren.
				</p>
				<h2>Vitiligo:</h2>
				<p>
					Wenn diese Behandlung keine Ergebnisse bringt, kann das Injektionsprotokoll unter
					ärztlicher Aufsicht angewendet werden und es können UVB-Sitzungen auf den betroffenen
					Bereich angewendet werden.
				</p>
			</div>
		</div>
	</div>
</div>

<div class="divider divider-accent" />
<div role="tablist" class="tabs tabs-xs tabs-lifted">
	<Tab title="Protokoll D" checked><D /></Tab>
	<Tab title="Protokoll K"><K /></Tab>
	<Tab title="Protokoll Y"><Y /></Tab>
	<Alltab />
</div>

<div class="divider divider-accent" />

<style>
	.tab {
		min-width: 150px; /* Setze eine angemessene Breite */
	}
</style>
