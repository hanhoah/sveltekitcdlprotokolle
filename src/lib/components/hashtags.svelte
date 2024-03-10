<script>
    import { getTopHashTags } from "$lib/functions/getHashtags";
    import { onMount } from 'svelte';
  
    let topHashTags = [];
  
    onMount(async () => {
      try {
        topHashTags = await getTopHashTags(3);
        console.log('TopHashTags are: ', topHashTags);
      } catch (error) {
        console.error('Fehler beim Laden der Top-Hashtags:', error.message);
      }
    });
  </script>
  
  <div class="bg-red-200 mt-10 p-3">
    <h2>Nicht das passende Produkt gefunden? Wähle einen der folgenden beliebten Hashtags:</h2>
    <div class="col columns-3 md:columns-6 text-xs">
      {#each topHashTags as { tag, anzahl, hashtag_id }}
      <a href="/produkte/hashtag/{hashtag_id}">
        <div class=" border-2 mt-1 md:p-1 md:m-1 bg-red-50 border-red-300">{tag} ({anzahl})</div>
      </a>
      {/each}
    </div>
  </div>
  