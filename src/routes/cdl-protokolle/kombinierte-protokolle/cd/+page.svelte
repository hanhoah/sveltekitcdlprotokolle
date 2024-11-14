<script>
	import C from '../../c.svelte';
	import D from '../../d.svelte';
	import Tab from '../tab.svelte';
	import Alltab from '../alltab.svelte';

	const name = 'CD';
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
				<li>Akne</li>
				<li>Kahlheit</li>
				<li>Schuppen</li>
				<li>Hautausschläge</li>
				<li>Wunde</li>
				<li>Fußpilz</li>
				<li>Sarkoidose</li>
			</ul>
		</div>
	</div>

	<div class="card bg-base-100 w-96 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Tipps zum {name}-Kombiprotokoll</h2>
			<div>
				<h2>Wunden</h2>
				<li>Mild: D</li>
				<li>Ernsthaft: C + D, je nach Kriterien kann auch das K-Protokoll angewendet werden.</li>

				<h2>Fußpilz</h2>
				<li>
					C 8 Dosen täglich + D 2 oder 3 mal täglich, 3 Wochen lang + Protokoll L an die Füße
					angepasst.
				</li>
			</div>
		</div>
	</div>
</div>

<div class="divider divider-accent" />
<div role="tablist" class="tabs tabs-xs tabs-lifted">
	<Tab title="Protokoll C" checked><C /></Tab>
	<Tab title="Protokoll D"><D /></Tab>
	<Alltab />
</div>

<div class="divider divider-accent" />

<style>
	.tab {
		min-width: 150px; /* Setze eine angemessene Breite */
	}
</style>
