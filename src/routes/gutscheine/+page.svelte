<script>
    import Gutschein from "./gutschein.svelte";
</script>
<svelte:head>
  <title>Gutscheine für alternative Heilmittel und Nahrungsergänzungsmittel</title>
  <meta name="description" content="Aktuelle Gutscheine von Online Shops die alternative Heilmittel anbieten wie Cellavita, Waldkraft, Graf von Kronenberg, Kopp Verlag. " />
</svelte:head>

<div class="p-2">
    <h2>Gutscheine für alternative Heilmittel und Nahrungsergänzungsmittel</h2>
    
    <!-- https://icon-sets.iconify.design/ -->

    <div class=" grid grid-cols-2 lg:grid-cols-4">
        <Gutschein icon="streamline:medical-cross-sign-healthcare-solid" href="https://www.bio-apo.de/product/kolloidales-silber-silberwasser-25-ppm.480898.html?p=1458807" color="lime" desc="15% Rabatt auf Kolloidales Silber" shop="bio-apo" code="CDL" gueltig="für immer" />
        <Gutschein icon="ph:tree-thin" href="https://www.waldkraft.bio/?sPartner=energiereich" color="red" desc="10% Rabatt auf erste Bestellung" shop="Waldkraft" code="energiereich" gueltig="einmalig" />
        <Gutschein icon="game-icons:medicine-pills" href="https://c.kopp-verlag.de/kopp,verlag_4.html?1=546&3=0&4=&5=&d=https%3A%2F%2Fwww.kopp-verlag.de%2Fa%2Fkopp-dmso-9990-ph.-eur.-dimethylsulfoxid-pharma-1-liter" color="orange" desc="10% Rabatt auf DMSO" shop="Kopp Verlag" code="DMSO10" gueltig="bis zum 31.3.2024" />
        <Gutschein icon="material-symbols:forest-rounded" href="https://edubily.de/collections/all/?ref=1jv8kbelnr" color="yellow" desc="5% auf alle Produkte" shop="Edubily" code="telegram5" gueltig="für immer" />
        <Gutschein icon="arcticons:harmony" href="https://pure-harmony.com/?a_aid=9dba9a7d&a_bid=9ce5e19f" color="yellow" desc="10% auf alle Produkte" shop="Pure Harmony" code="telegram" gueltig="für immer" />
        <Gutschein icon="mdi:dog" href="https://dog-native.de/shop/gelenkfit-fuer-hunde/?utm_source=selecdoo&utm_medium=CPO&a_aid=9dba9a7d&a_bid=419938b8" color="red" desc="10% auf alle Produkte" shop="Dog Native" code="gesundehaustiere" gueltig="für immer" />
        <Gutschein icon="arcticons:supervpn" href="https://supernaturals.eu/?utm_source=selecdoo&utm_medium=CPO&a_aid=9dba9a7d&a_bid=5d7d7d95" color="lime" desc="10% auf alle Produkte" shop="Supernaturals" code="CDL" gueltig="für immer" />
        <Gutschein icon="mingcute:love-fill" href="https://bitterliebe.com/?utm_source=selecdoo&utm_medium=affiliate&utm_campaign=9dba9a7d&a_aid=9dba9a7d&a_bid=11ea8dfd" color="teal" desc="10% auf alle Produkte" shop="Bitterliebe" code="CDL" gueltig="für immer" />
        <Gutschein icon="carbon:bee" href="https://bedrop.de/products/bee-cream-mit-bienengift?&utm_medium=CPO&utm_source=Selecdoo&a_aid=9dba9a7d&a_bid=bed5f00a" color="red" desc="10% auf alle Produkte" shop="Bedrop" code="cdlprotokoll10" gueltig="für immer" />
        <Gutschein icon="carbon:rain-drop" href="https://heilkraft.online/chlordioxid-trinkwasseraufbereitung?sPartner=cdl-protokoll" color="teal" desc="5% auf CDL Produkte" shop="Heilkraft" code="cdl protokoll" gueltig="für immer" />
        
    </div>

</div>