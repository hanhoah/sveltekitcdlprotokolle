import { c as create_ssr_component, f as escape, i as each, v as validate_component } from "../../../../../chunks/ssr.js";
import { g as getBadge, P as Product } from "../../../../../chunks/shops.js";
const css = {
  code: ".page-selector.svelte-ra8vou{margin-top:2.5rem;margin-bottom:2.5rem;display:flex;justify-content:center\n}.page-number.svelte-ra8vou{margin-left:1.25rem;cursor:pointer;border-width:2px;padding:0.5rem\n}.page-number.svelte-ra8vou:hover{--tw-bg-opacity:1;background-color:rgb(31 41 55 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));text-decoration-line:underline\n}.current-page.svelte-ra8vou{--tw-bg-opacity:1;background-color:rgb(63 131 248 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))\n}",
  map: null
};
const maxProductsPerPage = 50;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let pageproducts;
  let length;
  let category;
  let description;
  let totalPages;
  let { data } = $$props;
  console.log("catid: ", data.catid);
  function getPageProducts() {
    pageproducts = data.products.slice(0, 10);
    return pageproducts;
  }
  pageproducts = getPageProducts();
  let currentPage = 1;
  async function goToPage(page) {
    currentPage = page;
    const startIndex = (currentPage - 1) * maxProductsPerPage;
    const endIndex = startIndex + maxProductsPerPage;
    pageproducts = await data.products.slice(startIndex, endIndex);
    return pageproducts;
  }
  pageproducts = goToPage(1);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  pageproducts = data.products.slice(0, 10);
  length = data.products.length;
  category = data.category;
  description = data.description;
  totalPages = () => Math.ceil(length / maxProductsPerPage);
  return `<div class="w-full"><h2 class="text-center my-5 p-2">${escape(length)} Produkte in der Kategorie ${escape(category)} gefunden.</h2></div>  ${description ? `<div class="border-2 p-2 bg-slate-100">${escape(description)}</div>` : ``}  <ul class="grid grid-cols-2 md:grid-cols-3">${each(pageproducts, (product) => {
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
  })}</ul>  ${totalPages() > 1 ? `<div class="page-selector svelte-ra8vou">${each(Array.from({ length: totalPages() }).map((_, index) => index + 1), (page) => {
    return `${page == currentPage ? `<span class="page-number current-page svelte-ra8vou">${escape(page)}</span>` : `<a class="page-number svelte-ra8vou">${escape(page)}</a>`}`;
  })}</div>` : ``}`;
});
export {
  Page as default
};
