<script>

</script>

<h2>Add a new Book</h2>
<form method="POST" action="?/addBook" class="grid grid-cols-1">
        <input type="text" name="title" placeholder="Titel" />
        <input type="text" name="img"  placeholder="Bilder, kommasepariert" />
        <textarea name="desc" placeholder="Description" />
        <fieldset class="flex gap-5">
            <input name="label" type="text" placeholder="Label" class="w-1/4" />
            <input name="link" type="text" placeholder="Link" class="w-full" />
        </fieldset>
        <input name="tag" type="text" placeholder="hashtags, kommasepariert" />

        <fieldset>
            <input type="checkbox" id="gesundheit" name="category" value="1">
            <label for="gesundheit"> Gesundheit</label><br>
          
            <input type="checkbox" id="krisenvorsorge" name="category" value="2">
            <label for="gesundheit"> Krisenvorsorge</label><br>
            
            <input type="checkbox" id="medizinskandale" name="category" value="3">
            <label for="gesundheit"> Medizinskandale</label><br>
            
            <input type="checkbox" id="tiergesundheit" name="category" value="4">
            <label for="tiergesundheit"> Tiergesundheit</label><br>

        </fieldset>



    
    <div>
        <button>Add Book</button>

    </div>
</form>

<style>

    form{
        @apply space-y-5 m-10
    }

    button{@apply bg-slate-500 text-white p-3}
</style>