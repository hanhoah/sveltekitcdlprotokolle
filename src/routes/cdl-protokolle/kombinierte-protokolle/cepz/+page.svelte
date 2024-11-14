<script>
	import C from '../../c.svelte';
	import E from '../../e.svelte';
	import P from '../../p.svelte';
	import Z from '../../z.svelte';
	import Tab from '../tab.svelte';
	import Alltab from '../alltab.svelte';

	const name = 'CEPZ';
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
				<li>Fibromyalgie</li>
			</ul>
		</div>
	</div>

	<div class="card bg-base-100 w-96 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Tipps zum {name}-Kombiprotokoll</h2>
			<div>
				<p>
					Kombinieren Sie die Protokolle C und E, um die Entgiftung zu unterstützen, bis es Ihnen
					besser geht, führen Sie dann eine intensive Entwurmung durch und fahren Sie dann für
					weitere 3 Monate mit Protokoll C für eine gründliche Reinigung fort, da Parasiten mit
					dieser Art von Krankheit zusammenhängen.
				</p>
				<p>
					<b> Der Verzehr von Mandeln hilft bei der Behandlung von Fibromyalgie . </b>
				</p>
				<p>Mandeln enthalten Kalzium, Magnesium, viele Proteine, Omega 9 und Vitamin E.</p>
			</div>
		</div>
	</div>
</div>

<div class="divider divider-accent" />
<div role="tablist" class="tabs tabs-xs tabs-lifted">
	<Tab title="Protokoll C" checked><C /></Tab>
	<Tab title="Protokoll E"><E /></Tab>
	<Tab title="Protokoll P"><P /></Tab>
	<Tab title="Protokoll Z"><Z /></Tab>
	<Alltab />
</div>

<div class="divider divider-accent" />

<style>
	.tab {
		min-width: 150px; /* Setze eine angemessene Breite */
	}
</style>
