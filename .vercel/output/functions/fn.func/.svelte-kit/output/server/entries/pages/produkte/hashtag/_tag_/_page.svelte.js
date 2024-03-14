import { c as create_ssr_component, f as escape, i as each, v as validate_component } from "../../../../../chunks/ssr.js";
import { g as getBadge, P as Product } from "../../../../../chunks/shops.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let hashtag;
  let products;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  hashtag = data.hashtag;
  products = data.products;
  return `<div class="w-full"><h2 class="text-center my-5 p-2">Produkte mit dem Hashtag ${escape(hashtag)} gefunden.</h2></div>  <div class="grid grid-cols-2 md:grid-cols-3">${each(products, (product) => {
    return `<div class="my-2 relative"> <!-- HTML_TAG_START -->${getBadge(product.id)}<!-- HTML_TAG_END --> ${validate_component(Product, "Product").$$render(
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
    )} </div>`;
  })}</div>`;
});
export {
  Page as default
};
