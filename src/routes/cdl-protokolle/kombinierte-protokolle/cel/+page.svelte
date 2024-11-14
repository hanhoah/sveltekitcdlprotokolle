<script>
	import C from '../../c.svelte';
	import E from '../../e.svelte';
	import L from '../../l.svelte';
	import Tab from '../tab.svelte';
	import Alltab from '../alltab.svelte';

	const name = 'CEL';
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
				<li>Hepatitis</li>
				<li>Schwermetalle</li>
			</ul>
		</div>
	</div>

	<div class="card bg-base-100 w-96 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Tipps zum {name}-Kombiprotokoll</h2>
			<div>
				<p>
					Machen Sie nach 3 Wochen eine Pause, um Vitamin C und Antioxidantien einzunehmen, und
					wiederholen Sie den Zyklus, bis sich Ihre Gesundheit verbessert.
				</p>
				<p>Kombinieren Sie es mit Einläufen im Wechsel mit Protokoll L „Waschen/Baden“.</p>
				<p>
					Algen enthalten Jod , stimulieren die Schilddrüse und liefern viel mehr Kalzium als Milch.
				</p>
				<p>Seetang beseitigt Schwermetalle , Kombu, Seetang, Nori, Wakame, ...</p>
			</div>
		</div>
	</div>
</div>

<div class="divider divider-accent" />
<div role="tablist" class="tabs tabs-xs tabs-lifted">
	<Tab title="Protokoll C" checked><C /></Tab>
	<Tab title="Protokoll E"><E /></Tab>
	<Tab title="Protokoll L"><L /></Tab>
	<Alltab />
</div>

<div class="divider divider-accent" />

<style>
	.tab {
		min-width: 150px; /* Setze eine angemessene Breite */
	}
</style>
