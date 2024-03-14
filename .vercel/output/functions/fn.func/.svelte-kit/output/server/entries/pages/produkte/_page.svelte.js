import { c as create_ssr_component, j as is_promise, n as noop, i as each, v as validate_component } from "../../../chunks/ssr.js";
import { g as getBadge, P as Product } from "../../../chunks/shops.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="px-2 m-2 border-2 " data-svelte-h="svelte-1abrevb"><h2>Produkte für die alternative Heilung</h2></div> <ul class="grid grid-cols-2 md:grid-cols-3">${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return `
      Loading Products ...
      `;
    }
    return function(products) {
      return ` ${each(products, (product) => {
        return `<li class="my-2 relative"><!-- HTML_TAG_START -->${getBadge(product.id)}<!-- HTML_TAG_END --> ${validate_component(Product, "Product").$$render(
          $$result,
          {
            product: {
              id: product.id,
              name: product.name,
              img: product.image
            }
          },
          {},
          {}
        )} </li>`;
      })} `;
    }(__value);
  }(data.streamed.products)}</ul>`;
});
export {
  Page as default
};
