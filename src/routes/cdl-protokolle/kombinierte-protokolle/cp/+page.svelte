<script>
	import C from '../../c.svelte';
	import P from '../../p.svelte';
	import Z from '../../z.svelte';
	import Tab from '../tab.svelte';
	import Alltab from '../alltab.svelte';

	const name = 'CP';
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
				<li>Diabetes</li>
				<li>Viruswarzen</li>
				<li>Schizophrenie</li>
			</ul>
		</div>
	</div>

	<div class="card bg-base-100 w-96 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Tipps zum {name}-Kombiprotokoll</h2>
			<div>
				<h2>Diabetes I</h2>
				<p>6 Monate lang jeden Monat entwurmen .</p>
				<h2>Diabetes I und II</h2>
				<p>Nehmen Sie 1 Teelöffel natürliches Stevia und 15 g. frische Kalanchoe pro Tag.</p>
				<p>
					Überprüfen Sie die Medikation nach 5 Monaten auf eine mögliche Remission der Krankheit.
				</p>
				<h2>Schizophrenie</h2>
				<p>Protokoll C für 3 Wochen, gefolgt von einer intensiven Entwurmung .</p>
				<h2>Viruswarzen</h2>
				<p>
					Um resistente Warzen zu behandeln, feilen Sie die Warze leicht ab und tragen Sie 1 Tropfen
					Natriumchlorit (NaCLO 2 ) einmal auf die Warze auf, ohne die Haut zu berühren. Nach 21
					Tagen trocknet die Warze aus.
				</p>
			</div>
		</div>
	</div>
</div>

<div class="divider divider-accent" />
<div role="tablist" class="tabs tabs-xs tabs-lifted">
	<Tab title="Protokoll C" checked><C /></Tab>
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
