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
    <div class="col columns-6 text-xs">
      {#each topHashTags as { tag, anzahl, hashtag_id }}
      <a href="/produkte/hashtag/{hashtag_id}">
        <div class="p-1 border-2 m-1 bg-red-50 border-red-300">{tag} ({anzahl})</div>
      </a>
      {/each}
    </div>
    <div>
      {#each topHashTags as { hashtag_id }}
        '/produkte/hashtag/{hashtag_id}', 

      {/each}
    </div>

  </div>
  