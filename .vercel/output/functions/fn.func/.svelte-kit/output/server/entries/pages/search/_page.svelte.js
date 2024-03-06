import { c as create_ssr_component, f as escape, i as each, v as validate_component } from "../../../chunks/ssr.js";
import { g as getBadge, P as Product } from "../../../chunks/shops.js";
import { B as Book } from "../../../chunks/book.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  const books = form?.books;
  const qtyBooks = books?.length;
  const products = form?.products;
  const qtyProducts = products?.length;
  const q = form?.q;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  return `<div class="p-5 mt-5 border-2 "><div class="">Zu Ihrer Suche nach 
    <span class="bg-yellow-300 px-2">${escape(q)}</span>
    
    wurden 
    <span class="bg-yellow-300 px-2">${escape(qtyBooks)} Bücher</span>
    und 
    <span class="bg-yellow-300 px-2">${escape(qtyProducts)} Produkte</span>
    gefunden.</div> <ul class="grid grid-cols-2 md:grid-cols-3">${each(books, (book) => {
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
  })}</ul></div>`;
});
export {
  Page as default
};
