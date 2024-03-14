import { c as create_ssr_component, f as escape, j as is_promise, n as noop, v as validate_component, i as each } from "../../../../../chunks/ssr.js";
import { B as Book } from "../../../../../chunks/book.js";
import { S as Spinner } from "../../../../../chunks/Spinner.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let catid;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  catid = parseInt(data.data.catid) - 1;
  return `<div class="px-2 m-2 border-2 "><h2>Bücher der Kategorie  ${escape(data.categories[catid].name)}</h2></div> <ul class="grid grid-cols-2 md:grid-cols-3 bg-gray-100">${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return ` <div class="loading">${validate_component(Spinner, "Spinner").$$render($$result, {}, {}, {})}
            Loading Books ...</div> `;
    }
    return function(books) {
      return ` ${each(books, (book) => {
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
      })} `;
    }(__value);
  }(data.streamed.books)}</ul>`;
});
export {
  Page as default
};
