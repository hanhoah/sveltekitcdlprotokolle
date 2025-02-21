<script>
	import '../app.pcss';
	import Footer from './Footer.svelte';
	import { page } from '$app/stores';
	import Navbar from './Navbar.svelte';
	import Icon from '@iconify/svelte';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import ScrollToTop from '$lib/components/scrollToTop.svelte';
	// Import the Analytics package, and the SvelteKit dev variable.
	import { dev } from '$app/environment';

	export let data;
	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});

	function getDescription($page) {
		try {
			return (
				$page.data.data.metaDescription ||
				$page.data.data.description.replace(/(<([^>]+)>)/gi, '').substring(0, 155)
			);
		} catch (error) {
			return 'Willkommen auf cdl-protokolle.com – Ihrer Quelle für hochwertige Gesundheitsinformationen und wertvolle Tipps für ein gesundes Leben! Entdecken Sie kostenlose Leseproben aus erstklassigen Gesundheitsbüchern und erhalten Sie zahlreiche Ratschläge zur Verbesserung Ihrer Gesundheit, ohne den Einsatz von Pharma-Medizin. Unsere Website entstand aus einer engagierten Telegram-Gruppe und bietet Ihnen organisierte Informationen sowie die Möglichkeit zum aktiven Austausch. Tauchen Sie ein in die Welt der ganzheitlichen Gesundheit und fördern Sie Ihr Wohlbefinden auf natürliche Weise. Starten Sie jetzt Ihren Weg zu einem gesünderen Lebensstil!';
		}
	}

	function getTitle($page) {
		try {
			return $page.data.data.title || $page.data.data.name;
		} catch (error) {
			return 'CDL Protokolle ';
		}
	}
</script>

<svelte:head>
	<title>{getTitle($page)}</title>
	<meta name="description" content={getDescription($page)} />
</svelte:head>

<!-- Display -->
<div class="bg-gray-50 max-w-screen-xl m-auto md:block justify-center items-center text-black">
	<div id="top" class="w-full mx-auto px-1">
		<!-- 1280w (800h)-->
		<Navbar></Navbar>
		<form class="flex border-2 px-2 justify-center items-center" method="get" action="/search">
			<input
				class="w-full border-0 border-collapse border-gray-400"
				type="text"
				name="q"
				placeholder="Wonach suchen Sie? (Bücher, Produkte, Inhaltsstoffe)"
			/>
			<button class="border-1 border-collapse border-gray-400 p-2" type="submit"
				><Icon width="24" icon="ion:search-outline"></Icon></button
			>
		</form>

		<!-- Debugging-Ausgabe für die SEO-Daten -->
		<div class="p-2 md:p-5">
			<slot />
		</div>
	</div>
	<Footer></Footer>
</div>

<ScrollToTop />
