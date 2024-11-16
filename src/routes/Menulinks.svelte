<script>
	let isOpen = false;

	function closeMenu() {
		isOpen = false;
	}
</script>

<li><a href="/buecher">Bücher</a></li>
<li>
	<details bind:open={isOpen}>
		<summary>CDL Protokolle</summary>
		<ul class="bg-base-100 rounded-t-none p-2 dropdown-content">
			<li><a href="/cdl-protokolle" on:click={closeMenu}>Basis Protokolle</a></li>
			<li>
				<a href="/cdl-protokolle/kombinierte-protokolle" on:click={closeMenu}
					>Kombinierte Protokolle</a
				>
			</li>
		</ul>
	</details>
</li>
<li><a href="/produkte">Produkte</a></li>
<li><a href="/gutscheine">Gutscheine</a></li>
<li><a href="/leseproben">Leseproben</a></li>
<li><a href="/krankheiten">Krankheiten</a></li>
<li><a href="/artikel">Blog (Neu)</a></li>

<style>
	.dropdown-content {
		z-index: 50; /* Setze einen hohen z-index-Wert */
	}
</style>
