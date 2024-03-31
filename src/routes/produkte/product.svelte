<script>
    import { getProductImg } from "$lib/functions/getProductImg";
    export let product = {id:0,img:"",name:"", price:"", slug:""};
</script>

<a href={`/produkte/${product.slug}`}>
<div class=" w-full h-[280px] my-2">
    <div  class=" pt-2 overflow-auto bg-white w-44 ">
                <img class="mx-auto" width="150" src="{getProductImg(product.img)}" alt="{product.name}" />
            <div class="p-3 text-sm">
                    {product.name}
            </div>
            <div class="p-3 text-lg font-bold text-center">
                    {new Intl.NumberFormat('de-DE', {
                        style: 'currency',
                        currency: 'EUR',
                    }).format(product.price)}
            </div>
        </div>
    </div>
</a>