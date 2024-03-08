import { c as create_ssr_component, g as add_attribute, f as escape } from "./ssr.js";
function getProductImg(filename) {
  let img = "";
  const path = `/images/products`;
  if (!filename)
    img = path + "no_cover.jpeg";
  else
    img = path + filename;
  return img;
}
const Product = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { product = { id: 0, img: "", name: "" } } = $$props;
  if ($$props.product === void 0 && $$bindings.product && product !== void 0)
    $$bindings.product(product);
  return `<div class="w-full h-[300px] "><div class="pt-2 overflow-auto"><a${add_attribute("href", `/produkte/${product.id}`, 0)}><img class="mx-auto" width="150"${add_attribute("src", getProductImg(product.img, product.id), 0)}${add_attribute("alt", product.name, 0)}></a> <div class="p-3"><a${add_attribute("href", `/produkte/${product.id}`, 0)}>${escape(product.name)}</a></div></div></div>`;
});
function getBadge(id) {
  let shopid = id.split("-")[0];
  let shop = "";
  let color = "";
  switch (shopid) {
    case "gvk":
      shop = "Kronenberg";
      color = "bg-amber-500";
      break;
    case "wk":
      shop = "Waldkraft";
      color = "bg-green-700";
      break;
    case "cw":
      shop = "Cellavita";
      color = "bg-lime-500";
      break;
    case "cv":
      shop = "Cellavita";
      color = "bg-lime-500";
      break;
    default:
      shop = "Unknown";
  }
  const badge = '<div class="border-2 absolute right-2 text-white rounded-md text-s p-1 text-center top-5 w-24 ' + color + ' opacity-65" large color="green">' + shop + "</div>";
  return badge;
}
export {
  Product as P,
  getProductImg as a,
  getBadge as g
};
