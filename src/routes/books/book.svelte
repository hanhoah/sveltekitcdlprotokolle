<script>
    import { getImg } from "$lib/functions/getImg";
    export let book = {id:0,img:"",title:""};
</script>

<div class="bg-gray-200 w-full h-[300px] ">

    <a href="/books/{book.id}">
        <div  class=" pt-2 overflow-auto">

            <img class="mx-auto" width="150" src="{getImg(book.img, book.id)}" alt="{book.title}" />
            <div class="p-3">
                {book.title}
            </div>
        </div>
    </a>
</div>