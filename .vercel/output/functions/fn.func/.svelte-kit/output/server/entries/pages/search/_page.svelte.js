import { c as create_ssr_component, f as escape, i as each, v as validate_component } from "../../../chunks/ssr.js";
import { g as getBadge, P as Product } from "../../../chunks/shops.js";
import { B as Book } from "../../../chunks/book.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let books;
  let qtyBooks;
  let products;
  let qtyProducts;
  let q;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  books = data.books;
  qtyBooks = data.books.length;
  products = data.products;
  qtyProducts = data.products.length;
  q = data.q;
  return `<div class="p-5 mt-5 border-2 "><div class="">Zu Ihrer Suche nach 
    <span class="bg-yellow-300 px-2">${escape(q)}</span>
    
    wurden 
    <span class="bg-yellow-300 px-2">${escape(qtyBooks)} Bücher</span>
    und 
    <span class="bg-yellow-300 px-2">${escape(qtyProducts)} Produkte</span>
    gefunden.</div> ${qtyProducts == 30 ? `<div class="bg-green-100" data-svelte-h="svelte-nvrfyp">Hinweis: Aus Performance Gründen werden Suchergebnisse auf 30 Produkte limitiert. Falls Sie Ihr Produkt nicht finden, verfeinern Sie Ihre Suche mit einem weiteren Begriff.</div>` : ``} ${qtyBooks == 30 ? `<div class="bg-red-100" data-svelte-h="svelte-ynsik0">Hinweis: Aus Performance Gründen werden Suchergebnisse auf 30 Bücher limitiert. Falls Sie Ihr Buch nicht finden, verfeinern Sie Ihre Suche mit einem weiteren Begriff.</div>` : ``} <ul class="grid grid-cols-2 md:grid-cols-3">${each(books, (book) => {
    return `<li class="my-2">${validate_component(Book, "Book").$$render(
      $$result,
      {
        book: {
          id: book.id,
          title: book.title,
          img: book.img
        }
      },
      {},
      {}
    )}</li>`;
  })}</ul> <ul class="grid grid-cols-2 md:grid-cols-3">${each(products, (product) => {
    return `<div class=""><li class="my-2 relative"><!-- HTML_TAG_START -->${getBadge(product.id)}<!-- HTML_TAG_END --> ${validate_component(Product, "Product").$$render(
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
  })}</ul> <div class="mt-10"><h2 data-svelte-h="svelte-1f5j7l5">Nicht das passende hier gefunden? Versuchen Sie es mit Amazon oder Ebay</h2> <p data-svelte-h="svelte-iclnsj">Ihren Suchtext haben wir bereits für Sie im Link eingebaut.</p> <div class="my-5 pb-10 flex flex-col items-center space-y-5"><a href="${"https://www.amazon.de/gp/search?ie=UTF8&tag=jumex_online-21&linkCode=ur2&linkId=470bf27aa1feb315de9cb5f18b114f2f&camp=1638&creative=6742&index=books&keywords=" + escape(q, true)}" target="_blank"><div class="text-lg mt-3" color="light" data-svelte-h="svelte-1ov1sdi"><img alt="amazon logo" width="100" src="/images/logos/Amazon.de-Logo.svg.png"></div></a> <a href="${"https://www.ebay.de/sch/i.html?_from=R40&_trksid=p4432023.m570.l1313&_nkw=" + escape(q, true) + "&_sacat=0"}" target="_blank"><div class="text-lg mt-3" color="light" data-svelte-h="svelte-17b32z5"><img alt="ebay logo" width="100" src="/images/logos/EBay_logo.png"></div></a></div></div></div>`;
});
export {
  Page as default
};
