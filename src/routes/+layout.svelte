<script>
	import "../app.css";
	import Footer from "./Footer.svelte";
  import { page } from "$app/stores";
  import Navbar from "./Navbar.svelte";
  import { inject } from '@vercel/analytics'
  import Icon from "@iconify/svelte";

  </script>

<svelte:head>
  <title>{$page.data.title || 'CDL Protokolle '}</title>
  <meta name="description" content={$page.data.metaDescription || 'Willkommen auf cdl-protokolle.com – Ihrer Quelle für hochwertige Gesundheitsinformationen und wertvolle Tipps für ein gesundes Leben! Entdecken Sie kostenlose Leseproben aus erstklassigen Gesundheitsbüchern und erhalten Sie zahlreiche Ratschläge zur Verbesserung Ihrer Gesundheit, ohne den Einsatz von Pharma-Medizin. Unsere Website entstand aus einer engagierten Telegram-Gruppe und bietet Ihnen organisierte Informationen sowie die Möglichkeit zum aktiven Austausch. Tauchen Sie ein in die Welt der ganzheitlichen Gesundheit und fördern Sie Ihr Wohlbefinden auf natürliche Weise. Starten Sie jetzt Ihren Weg zu einem gesünderen Lebensstil!'} />
</svelte:head>

  <!-- mobile Display -->
  <div class="bg-white max-w-screen-md m-auto md:block justify-center items-center text-black">
    <div class="w-full mx-auto px-">
      <!-- 1280w (800h)-->
       <Navbar />
       <!--
         <form class="flex border-2 justify-center items-center" method="post" action="/search">
          <input class="w-full border-0 border-collapse border-gray-400" type="text" name="search" placeholder="Wonach suchen Sie?" />
          <button class="border-1 border-collapse border-gray-400 p-2" type="submit"><Icon width="24" icon="ion:search-outline" /></button>
        </form>
       -->
	   <div class=""/>
      <slot />
    </div>
    <Footer />
  </div>

