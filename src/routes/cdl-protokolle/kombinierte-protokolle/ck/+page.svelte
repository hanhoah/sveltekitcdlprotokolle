<script>
	import C from '../../c.svelte';
	import K from '../../k.svelte';

	import Tab from '../tab.svelte';
	import Alltab from '../alltab.svelte';

	const name = 'CK';
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
				<li>Rheumatoide Arthritis RA</li>
				<li>Arthrose</li>
				<li>Schleimbeutelentzündung</li>
				<li>Gallenstein</li>
				<li>Nierenstein</li>
				<li>Erektile Dysfunktion oder Impotenz</li>
				<li>Fallen</li>
				<li>Hernie</li>
				<li>Nephritis</li>
				<li>Zysten</li>
				<li>TVT-Venenthrombose</li>
				<li>Diabetische Gefäßgeschwüre</li>
				<li>Krampfadern</li>
			</ul>
		</div>
	</div>

	<div class="card bg-base-100 w-96 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Tipps zum {name}-Kombiprotokoll</h2>
			<div>
				<h2>Rheumatoide Arthritis, Osteoarthritis, Gicht, Krampfadern ;</h2>
				<p>Behalten Sie die beiden Protokolle 3 Monate lang bei</p>

				<h2>Schleimbeutelentzündung</h2>
				<p>3 Wochen lang behandeln.</p>

				<h2>Gallenstein</h2>
				<p>
					Bevor Sie mit dem CK-Chlordioxid-Protokoll beginnen, empfehlen wir, eine Woche lang eine
					natürliche Leberreinigung durchzuführen, um Giftstoffe zu reinigen , damit das CDS besser
					funktionieren kann.
				</p>

				<h2>Nierenstein</h2>

				<p>
					Behandeln Sie es 3 Wochen lang und trinken Sie dreimal täglich einen Aufguss von „ Stone
					Breaker “ (Lepidium Latifolium).
				</p>

				<p>Wenden Sie das CK-Protokoll zusammen mit den „Rompe piedra“-Infusionen an.</p>

				<h2>Erektile Dysfunktion</h2>
				<p>Behalten Sie das Protokoll 1 Monat lang bei.</p>
				<h2>Hernie, Nephritis, Zysten</h2>
				<p>So lange wie nötig behandeln.</p>
			</div>
		</div>
	</div>
</div>

<div class="divider divider-accent" />
<div role="tablist" class="tabs tabs-xs tabs-lifted">
	<Tab title="Protokoll C" checked><C /></Tab>
	<Tab title="Protokoll K"><K /></Tab>
	<Alltab />
</div>

<div class="divider divider-accent" />

<style>
	.tab {
		min-width: 150px; /* Setze eine angemessene Breite */
	}
</style>
