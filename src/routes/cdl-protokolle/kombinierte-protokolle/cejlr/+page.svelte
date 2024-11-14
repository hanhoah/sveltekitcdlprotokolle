<script>
	import C from '../../c.svelte';
	import E from '../../e.svelte';
	import J from '../../j.svelte';
	import L from '../../l.svelte';
	import R from '../../r.svelte';

	import Tab from '../tab.svelte';
	import Alltab from '../alltab.svelte';

	const name = 'CEJLR';
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
				<li>Leberkrebs</li>
				<li>Zungenkrebs</li>
				<li>Lyme-Borreliose</li>
				<li>Prostatakrebs</li>
				<li>Nierenkrebs</li>
				<li>Divertikulitis</li>
				<li>Morbus Crohn</li>
			</ul>
		</div>
	</div>

	<div class="card bg-base-100 w-96 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Tipps zum {name}-Kombiprotokoll</h2>
			<div>
				<h2>Zur Behandlung von Krebs:</h2>
				<p>Wenden Sie das R-Protokoll zwischen 3 und 6 Monaten an.</p>
				<p>
					Kombinieren Sie das Enemas-Protokoll zur Entgiftung der Leber im Wechsel mit dem
					L-Protokoll (Waschen/Baden).
				</p>
				<p>
					Nehmen Sie Artemisa anua-Aufgüsse und kochen Sie dreimal täglich einen Esslöffel für jede
					Tasse.
				</p>
				<p>
					Verzehren Sie täglich 15 g frische Blätter der Kalanchoe Daigremontana in Salaten oder
					Smoothies.
				</p>
			</div>
			<div>
				<h2>Divertikulitis:</h2>
				<p>Wenden Sie nach der Evakuierung das Perilla-Protokoll an.</p>
			</div>
			<div>
				<h2>Lyme-Borreliose:</h2>
				<p>
					Die Behandlung mit Terpentin für den menschlichen Verzehr von Dr. Jennifer Daniels wird
					empfohlen.
				</p>
			</div>
		</div>
	</div>
</div>

<div class="divider divider-accent" />
<div role="tablist" class="tabs tabs-xs tabs-lifted">
	<Tab title="Protokoll C" checked><C /></Tab>
	<Tab title="Protokoll E"><E /></Tab>
	<Tab title="Protokoll J"><J /></Tab>
	<Tab title="Protokoll L"><L /></Tab>
	<Tab title="Protokoll R"><R /></Tab>
	<Alltab />
</div>

<div class="divider divider-accent" />

<style>
	.tab {
		min-width: 150px; /* Setze eine angemessene Breite */
	}
</style>
