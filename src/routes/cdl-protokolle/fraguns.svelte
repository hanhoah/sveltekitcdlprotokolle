<script>
    export let link;
    import telegram from '$lib/images/logos/telegram.webp';

</script>

<div class="card bg-base-100 w-96 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Frage die Community!</h2>
      <div>
          Hast du eine Frage zu diesem Protokoll. Klicke auf das Telegram Logo um diese an unserer Telegram Community zu stellen. Nach dem Klick auf den Link öffnet dieses Protokoll in Telegram und du kannst deine Frage direkt an unsere hilfreichen Mitglieder stellen. 

      </div>
      <div class="card-actions justify-end">
        <a target="_blank" href={link}><img src={telegram} width="100" alt="Image" /></a>
      </div>
    </div>
  </div>