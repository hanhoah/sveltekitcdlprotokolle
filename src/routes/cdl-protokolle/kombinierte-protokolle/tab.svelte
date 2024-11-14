<script>
    export let title = 'Protokoll';
    export let checked = false; 
</script>

<input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label={title}  checked={checked}/>
<div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
    <slot></slot>
</div>


<style>
    .tab {
        min-width: 110px; /* Setze eine angemessene Breite */
    }
</style>