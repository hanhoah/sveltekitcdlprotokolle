<script>
	import E from '../../e.svelte';
	import K from '../../k.svelte';
	import N from '../../n.svelte';
	import U from '../../u.svelte';

	import Tab from '../tab.svelte';
	import Alltab from '../alltab.svelte';

	const name = 'EKNU';
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
				<li>Durchfall</li>
			</ul>
		</div>
	</div>

	<div class="card bg-base-100 w-96 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Tipps zum {name}-Kombiprotokoll</h2>
			<div>
				<p>
					Wenden Sie bei einem Erwachsenen zunächst das Dringlichkeitsprotokoll U an oder passen Sie
					die Dosis an das Protokoll N an, wenn es sich um einen Minderjährigen handelt.
				</p>
				<p>
					Je nach Schweregrad kann es mit dem Enema-Protokoll und dem K-Protokoll mit DMSO im
					Bauchbereich kombiniert werden.
				</p>
			</div>
		</div>
	</div>
</div>

<div class="divider divider-accent" />
<div role="tablist" class="tabs tabs-xs tabs-lifted">
	<Tab title="Protokoll E" checked><E /></Tab>
	<Tab title="Protokoll K"><K /></Tab>
	<Tab title="Protokoll N"><N /></Tab>
	<Tab title="Protokoll U"><U /></Tab>
	<Alltab />
</div>

<div class="divider divider-accent" />

<style>
	.tab {
		min-width: 150px; /* Setze eine angemessene Breite */
	}
</style>
