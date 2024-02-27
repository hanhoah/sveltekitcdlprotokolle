<script>
    import { getProductImg } from "$lib/functions/getProductImg";
    export let product = {id:0,img:"",name:""};
    // console.log('Book Komponenten Ausgabe ******************  book id ist ', book.id);
    // console.log(typeof(book.id));
</script>

<div class=" w-full h-[300px] ">

    <div  class=" pt-2 overflow-auto">
            <a href={`/produkte/${product.id}`}>
                <img class="mx-auto" width="150" src="{getProductImg(product.img, product.id, "products")}" alt="{product.name}" />
            </a>
            <div class="p-3">
                <a href={`/produkte/${product.id}`}>
                
                    {product.name}
                </a>
            </div>
        </div>
</div>