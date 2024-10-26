<script lang="ts">
    import { getProductImg } from "$lib/functions/getProductImg";
    import type { Product } from "$lib/types/product";
    import { getBadge } from '$lib/functions/shops.ts';
    export let product: Product;
</script>

<div class="my-10 w-48 relative">
    <div class="absolute -right-10">
        {@html getBadge(product.img)}
      </div>      
    <a href={`/produkte/${product.slug}`} >
        <div class="h-[280px] my-2">
            <div  class=" pt-2 overflow-auto bg-white w-44 ">
                <img class="mx-auto" width="150" src={getProductImg(product.img) || '/images/products/no_cover.jpeg'} alt={product.name} />
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
    </div>
