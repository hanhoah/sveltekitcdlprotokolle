<script>
	import C from '../../c.svelte';
	import E from '../../e.svelte';
	import R from '../../r.svelte';
	import Tab from '../tab.svelte';
	import Alltab from '../alltab.svelte';

	const name = 'CER';
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
				<li>Colitis ulcerosa</li>
				<li>Dickdarmkrebs</li>
				<li>Prostatitis</li>
			</ul>
		</div>
	</div>

	<div class="card bg-base-100 w-96 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Tipps zum {name}-Kombiprotokoll</h2>
			<div>
				<p>
					Nehmen Sie Artemisa anua-Aufgüsse und kochen Sie dreimal täglich einen Esslöffel für jede
					Tasse.
				</p>
				<p>
					Verzehren Sie täglich 15 g frische Blätter der Kalanchoe Daigremontana in Salaten oder
					Smoothies.
				</p>
				<p>
					<b> Prostatitis : </b>
				</p>
				<p>
					Beginnen Sie mit Protokoll C (10 ml CDS/1 l Wasser). Wenn jedoch keine Besserung eintritt,
					wenden Sie Protokoll C+ an.
				</p>
			</div>
		</div>
	</div>
</div>

<div class="divider divider-accent" />
<div role="tablist" class="tabs tabs-xs tabs-lifted">
	<Tab title="Protokoll C" checked><C /></Tab>
	<Tab title="Protokoll E"><E /></Tab>
	<Tab title="Protokoll R"><R /></Tab>
	<Alltab />
</div>

<div class="divider divider-accent" />

<style>
	.tab {
		min-width: 150px; /* Setze eine angemessene Breite */
	}
</style>
