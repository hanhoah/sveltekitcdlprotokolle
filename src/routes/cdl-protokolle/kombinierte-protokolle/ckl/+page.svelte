<script>
	import C from '../../c.svelte';
	import K from '../../k.svelte';
	import L from '../../l.svelte';

	import Tab from '../tab.svelte';
	import Alltab from '../alltab.svelte';

	const name = 'CKL';
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
				<li>Magenkrebs</li>
				<li>Speiseröhrenkrebs</li>
				<li>Ischias</li>
				<li>Schilddrüsenkrebs</li>
			</ul>
		</div>
	</div>

	<div class="card bg-base-100 w-96 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Tipps zum {name}-Kombiprotokoll</h2>
			<div>
				<p>
					Nehmen Sie Artemisia annua -Aufgüsse und kochen Sie dreimal täglich einen Esslöffel für
					jede Tasse.
				</p>
				<p>
					Verzehren Sie täglich 15 g frische Blätter der Kalanchoe Daigremontana in Salaten oder
					Smoothies.
				</p>
			</div>
		</div>
	</div>
</div>

<div class="divider divider-accent" />
<div role="tablist" class="tabs tabs-xs tabs-lifted">
	<Tab title="Protokoll C" checked><C /></Tab>
	<Tab title="Protokoll K"><K /></Tab>
	<Tab title="Protokoll L"><L /></Tab>
	<Alltab />
</div>

<div class="divider divider-accent" />

<style>
	.tab {
		min-width: 150px; /* Setze eine angemessene Breite */
	}
</style>
