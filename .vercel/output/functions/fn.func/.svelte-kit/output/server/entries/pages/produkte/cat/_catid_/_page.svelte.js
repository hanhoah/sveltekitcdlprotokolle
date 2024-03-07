import { c as create_ssr_component, f as escape, i as is_promise, n as noop, v as validate_component, h as each } from "../../../../../chunks/ssr.js";
import { p as page } from "../../../../../chunks/stores.js";
import { g as getBadge, P as Product } from "../../../../../chunks/shops.js";
import { S as Spinner } from "../../../../../chunks/Spinner.js";
const css = {
  code: ".page-selector.svelte-18pvoj2{margin-top:2.5rem;margin-bottom:2.5rem;display:flex;justify-content:center\n}.page-number.svelte-18pvoj2{margin-left:1.25rem;cursor:pointer;border-width:2px;padding:0.5rem\n}.page-number.svelte-18pvoj2:hover{--tw-bg-opacity:1;background-color:rgb(31 41 55 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));text-decoration-line:underline\n}.current-page.svelte-18pvoj2{--tw-bg-opacity:1;background-color:rgb(63 131 248 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))\n}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let catid;
  let description;
  let qty;
  let currentpage;
  console.log(page);
  let { data } = $$props;
  function getPageSelector(qty2) {
    if (qty2 > 50) {
      let numPages = Math.ceil(qty2 / 50);
      return Array.from({ length: numPages }, (_, i) => i + 1);
    } else {
      return null;
    }
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  catid = data.data.catid;
  description = data.data.description;
  qty = data.data.productQty;
  currentpage = data.data.page;
  return `<div class="px-2 m-2 border-2 "><h2>${escape(data.data.productQty)} Produkte der Kategorie  ${escape(data.data.catname)} gefunden</h2></div> ${description ? `<div id="description">${escape(description)}</div>` : ``} <ul class="grid grid-cols-2 md:grid-cols-3">${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return ` ${validate_component(Spinner, "Spinner").$$render($$result, {}, {}, {})}
          Lade Produkte ...
        `;
    }
    return function(products) {
      return ` ${each(products, (product) => {
        return `<div class="lazy-load"><li class="my-2 relative"> <!-- HTML_TAG_START -->${getBadge(product.id)}<!-- HTML_TAG_END --> ${validate_component(Product, "Product").$$render(
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
        )}</li> </div>`;
      })} `;
    }(__value);
  }(data.streamed.products)}</ul> ${getPageSelector(qty) ? `<div class="page-selector svelte-18pvoj2">${each(getPageSelector(qty), (pageNumber) => {
    return `${pageNumber == currentpage ? `<span class="page-number current-page svelte-18pvoj2">${escape(pageNumber)}</span>` : `<a href="${"/produkte/cat/" + escape(catid, true) + "?page=" + escape(pageNumber, true)}" class="page-number svelte-18pvoj2">${escape(pageNumber)}</a>`}`;
  })}</div>` : ``}`;
});
export {
  Page as default
};
