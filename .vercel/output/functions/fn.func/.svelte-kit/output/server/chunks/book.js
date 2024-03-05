import { c as create_ssr_component, i as add_attribute, f as escape } from "./ssr.js";
function getImg(filename, id, folder) {
  let img = "";
  const path = `/images/${folder}/`;
  if (!filename)
    img = path + "no_cover.jpeg";
  else
    img = path + id + "/" + filename;
  return img;
}
const Book = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { book = { id: 0, img: "", title: "" } } = $$props;
  if ($$props.book === void 0 && $$bindings.book && book !== void 0)
    $$bindings.book(book);
  return `<div class="w-full h-[300px] "><div class="pt-2 overflow-auto"><a${add_attribute("href", `/buecher/${book.id}`, 0)}><img class="mx-auto" width="150"${add_attribute("src", getImg(book.img, book.id, "books"), 0)}${add_attribute("alt", book.title, 0)}></a> <div class="p-3"><a${add_attribute("href", `/buecher/${book.id}`, 0)}>${escape(book.title)}</a></div></div></div>`;
});
export {
  Book as B,
  getImg as g
};
