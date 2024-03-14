import { c as create_ssr_component, g as add_attribute, v as validate_component, f as escape, j as is_promise, n as noop, i as each } from "../../../../chunks/ssr.js";
import { B as Button } from "../../../../chunks/Button.js";
import { S as Spinner } from "../../../../chunks/Spinner.js";
import { a as getProductImg, g as getBadge, P as Product } from "../../../../chunks/shops.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let img;
  let name;
  let id;
  let desc;
  let link;
  let searchterm;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  img = getProductImg(data.data.image);
  name = data.data.name;
  id = data.data.id;
  desc = data.data.description;
  link = data.data.link;
  searchterm = data.searchterm;
  return `<div class="w-full flex flex-row bg-gray-100 justify-center relative"><!-- HTML_TAG_START -->${getBadge(id)}<!-- HTML_TAG_END --> <img class="py-10" width="400"${add_attribute("alt", name, 0)}${add_attribute("src", img, 0)}></div> <div class="my-5 pb-10 flex flex-col items-center top-0 sticky z-10"><a${add_attribute("href", link, 0)} target="_blank">${validate_component(Button, "Button").$$render($$result, { class: "text-lg mt-3", color: "green" }, {}, {
    default: () => {
      return `${escape(name)} 🛒`;
    }
  })}</a></div> <div class="bg-yellow-100"><h2 class="bg-yellow-300 p-2">${escape(name)}</h2> <div id="desc" class="p-5"><!-- HTML_TAG_START -->${desc}<!-- HTML_TAG_END --></div> <div id="links" class="w-5/6 m-auto bg-zinc-50 border-zinc-200 border-2 p-5"><div class="my-5 pb-10 flex flex-col items-center space-y-5"><a${add_attribute("href", link, 0)} target="_blank">${validate_component(Button, "Button").$$render($$result, { class: "text-lg mt-3", color: "green" }, {}, {
    default: () => {
      return `${escape(name)} 🛒`;
    }
  })}</a> <a href="${"https://www.amazon.de/gp/search?ie=UTF8&tag=jumex_online-21&linkCode=ur2&linkId=470bf27aa1feb315de9cb5f18b114f2f&camp=1638&creative=6742&index=books&keywords=" + escape(searchterm, true)}" target="_blank">${validate_component(Button, "Button").$$render($$result, { class: "text-lg mt-3", color: "light" }, {}, {
    default: () => {
      return `<img alt="amazon logo" width="100" src="/images/logos/Amazon.de-Logo.svg.png">`;
    }
  })}</a> <a href="${"https://www.ebay.de/sch/i.html?_from=R40&_trksid=p4432023.m570.l1313&_nkw=" + escape(searchterm, true) + "&_sacat=0"}" target="_blank">${validate_component(Button, "Button").$$render($$result, { class: "text-lg mt-3", color: "light" }, {}, {
    default: () => {
      return `<img alt="ebay logo" width="100" src="/images/logos/EBay_logo.png">`;
    }
  })}</a></div></div> <div id="abstand" class="h-5"></div></div> <div class="bg-lime-100"><div class="w-full my-5 bg-lime-300 p-3 text-lg font-bold text-center" data-svelte-h="svelte-g4vgml">Ähnliche Produkte:</div> <ul class="grid grid-cols-2 md:grid-cols-3">${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return ` <div class="loading">${validate_component(Spinner, "Spinner").$$render($$result, {}, {}, {})}
                Loading similar Products ...</div> `;
    }
    return function(similarProducts) {
      return ` ${each(similarProducts, (similarProduct) => {
        return `<li class="my-2 relative"><!-- HTML_TAG_START -->${getBadge(similarProduct.id)}<!-- HTML_TAG_END --> ${validate_component(Product, "Product").$$render(
          $$result,
          {
            product: {
              id: similarProduct.id,
              name: similarProduct.name,
              img: similarProduct.image
            }
          },
          {},
          {}
        )} </li>`;
      })} `;
    }(__value);
  }(data.streamed.similarProducts)}</ul></div>`;
});
export {
  Page as default
};
