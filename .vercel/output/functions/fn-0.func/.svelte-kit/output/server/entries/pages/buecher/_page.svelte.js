import { c as create_ssr_component, f as escape, j as is_promise, n as noop, v as validate_component, i as each } from "../../../chunks/ssr.js";
import { B as Book } from "../../../chunks/book.js";
import { S as Spinner } from "../../../chunks/Spinner.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="px-2 m-2 border-2 "><h2>${escape(data.title)}</h2></div> <ul class="grid grid-cols-2 md:grid-cols-3">${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return ` ${validate_component(Spinner, "Spinner").$$render($$result, {}, {}, {})} loading books ...
      `;
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
