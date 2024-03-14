import { k as identity, c as create_ssr_component, l as compute_rest_props, b as createEventDispatcher, v as validate_component, h as getContext, a as spread, p as escape_attribute_value, e as escape_object, f as escape, g as add_attribute, j as is_promise, n as noop, i as each } from "../../../../chunks/ssr.js";
import { F as Frame } from "../../../../chunks/Frame.js";
import { t as twMerge } from "../../../../chunks/bundle-mjs.js";
import { B as Button } from "../../../../chunks/Button.js";
import { S as Spinner } from "../../../../chunks/Spinner.js";
import { g as getImg, B as Book } from "../../../../chunks/book.js";
function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
  const o = +getComputedStyle(node).opacity;
  return {
    delay,
    duration,
    easing,
    css: (t) => `opacity: ${t * o}`
  };
}
const TransitionFrame = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["transition", "params", "open", "dismissable"]);
  let { transition = fade } = $$props;
  let { params = {} } = $$props;
  let { open = true } = $$props;
  let { dismissable = false } = $$props;
  const dispatch = createEventDispatcher();
  function close(ev) {
    if (ev?.stopPropagation)
      ev.stopPropagation();
    open = false;
  }
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  if ($$props.params === void 0 && $$bindings.params && params !== void 0)
    $$bindings.params(params);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.dismissable === void 0 && $$bindings.dismissable && dismissable !== void 0)
    $$bindings.dismissable(dismissable);
  {
    dispatch(open ? "open" : "close");
  }
  return `${dismissable ? `${open ? `<div>${validate_component(Frame, "Frame").$$render($$result, Object.assign({}, $$restProps), {}, {
    default: () => {
      return `${slots.default ? slots.default({ close }) : ``}`;
    }
  })}</div>` : ``}` : `${open ? `${validate_component(Frame, "Frame").$$render($$result, Object.assign({}, $$restProps), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}` : ``}`} `;
});
const ToolbarButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["color", "name", "ariaLabel", "size", "href"]);
  const background = getContext("background");
  let { color = "default" } = $$props;
  let { name = void 0 } = $$props;
  let { ariaLabel = void 0 } = $$props;
  let { size = "md" } = $$props;
  let { href = void 0 } = $$props;
  const colors = {
    dark: "text-gray-500 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600",
    gray: "text-gray-500 focus:ring-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300",
    red: "text-red-500 focus:ring-red-400 hover:bg-red-200 dark:hover:bg-red-800 dark:hover:text-red-300",
    yellow: "text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-800 dark:hover:text-yellow-300",
    green: "text-green-500 focus:ring-green-400 hover:bg-green-200 dark:hover:bg-green-800 dark:hover:text-green-300",
    indigo: "text-indigo-500 focus:ring-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800 dark:hover:text-indigo-300",
    purple: "text-purple-500 focus:ring-purple-400 hover:bg-purple-200 dark:hover:bg-purple-800 dark:hover:text-purple-300",
    pink: "text-pink-500 focus:ring-pink-400 hover:bg-pink-200 dark:hover:bg-pink-800 dark:hover:text-pink-300",
    blue: "text-blue-500 focus:ring-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 dark:hover:text-blue-300",
    primary: "text-primary-500 focus:ring-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800 dark:hover:text-primary-300",
    default: "focus:ring-gray-400"
  };
  const sizing = {
    xs: "m-0.5 rounded-sm focus:ring-1 p-0.5",
    sm: "m-0.5 rounded focus:ring-1 p-0.5",
    md: "m-0.5 rounded-lg focus:ring-2 p-1.5",
    lg: "m-0.5 rounded-lg focus:ring-2 p-2.5"
  };
  let buttonClass;
  const svgSizes = {
    xs: "w-3 h-3",
    sm: "w-3.5 h-3.5",
    md: "w-5 h-5",
    lg: "w-5 h-5"
  };
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  buttonClass = twMerge(
    "focus:outline-none whitespace-normal",
    sizing[size],
    colors[color],
    color === "default" && (background ? "hover:bg-gray-100 dark:hover:bg-gray-600" : "hover:bg-gray-100 dark:hover:bg-gray-700"),
    $$props.class
  );
  return `${href ? `<a${spread(
    [
      { href: escape_attribute_value(href) },
      escape_object($$restProps),
      {
        class: escape_attribute_value(buttonClass)
      },
      {
        "aria-label": escape_attribute_value(ariaLabel ?? name)
      }
    ],
    {}
  )}>${name ? `<span class="sr-only">${escape(name)}</span>` : ``} ${slots.default ? slots.default({ svgSize: svgSizes[size] }) : ``}</a>` : `<button${spread(
    [
      { type: "button" },
      escape_object($$restProps),
      {
        class: escape_attribute_value(buttonClass)
      },
      {
        "aria-label": escape_attribute_value(ariaLabel ?? name)
      }
    ],
    {}
  )}>${name ? `<span class="sr-only">${escape(name)}</span>` : ``} ${slots.default ? slots.default({ svgSize: svgSizes[size] }) : ``}</button>`} `;
});
const CloseButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["name"]);
  let { name = "Close" } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  return `${validate_component(ToolbarButton, "ToolbarButton").$$render($$result, Object.assign({}, { name }, $$restProps, { class: twMerge("ms-auto", $$props.class) }), {}, {
    default: ({ svgSize }) => {
      return `<svg${add_attribute("class", svgSize, 0)} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>`;
    }
  })} `;
});
const baseClass = "font-medium inline-flex items-center justify-center px-2.5 py-0.5";
const Badge = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["color", "large", "dismissable"]);
  let { color = "primary" } = $$props;
  let { large = false } = $$props;
  let { dismissable = false } = $$props;
  const colors = {
    primary: "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300",
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    dark: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    gray: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    indigo: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
    purple: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    pink: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
    none: ""
  };
  const borderedColors = {
    primary: "bg-primary-100 text-primary-800 dark:bg-gray-700 dark:text-primary-400 border-primary-400 dark:border-primary-400",
    blue: "bg-blue-100 text-blue-800 dark:bg-gray-700 dark:text-blue-400 border-blue-400 dark:border-blue-400",
    dark: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400 border-gray-500 dark:border-gray-500",
    red: "bg-red-100 text-red-800 dark:bg-gray-700 dark:text-red-400 border-red-400 dark:border-red-400",
    green: "bg-green-100 text-green-800 dark:bg-gray-700 dark:text-green-400 border-green-400 dark:border-green-400",
    yellow: "bg-yellow-100 text-yellow-800 dark:bg-gray-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-300",
    indigo: "bg-indigo-100 text-indigo-800 dark:bg-gray-700 dark:text-indigo-400 border-indigo-400 dark:border-indigo-400",
    purple: "bg-purple-100 text-purple-800 dark:bg-gray-700 dark:text-purple-400 border-purple-400 dark:border-purple-400",
    pink: "bg-pink-100 text-pink-800 dark:bg-gray-700 dark:text-pink-400 border-pink-400 dark:border-pink-400",
    none: ""
  };
  const hoverColors = {
    primary: "hover:bg-primary-200",
    blue: "hover:bg-blue-200",
    dark: "hover:bg-gray-200",
    red: "hover:bg-red-200",
    green: "hover:bg-green-200",
    yellow: "hover:bg-yellow-200",
    indigo: "hover:bg-indigo-200",
    purple: "hover:bg-purple-200",
    pink: "hover:bg-pink-200",
    none: ""
  };
  let badgeClass;
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.large === void 0 && $$bindings.large && large !== void 0)
    $$bindings.large(large);
  if ($$props.dismissable === void 0 && $$bindings.dismissable && dismissable !== void 0)
    $$bindings.dismissable(dismissable);
  badgeClass = twMerge(
    baseClass,
    large ? "text-sm" : "text-xs",
    $$restProps.border ? `border ${borderedColors[color]}` : colors[color],
    $$restProps.href && hoverColors[color],
    $$restProps.rounded ? "rounded-full" : "rounded",
    $$props.class
  );
  return `${validate_component(TransitionFrame, "TransitionFrame").$$render($$result, Object.assign({}, { dismissable }, $$restProps, { class: badgeClass }), {}, {
    default: ({ close }) => {
      return `${slots.default ? slots.default({}) : ``} ${dismissable ? `${slots["close-button"] ? slots["close-button"]({ close }) : ` ${validate_component(CloseButton, "CloseButton").$$render(
        $$result,
        {
          color,
          size: large ? "sm" : "xs",
          name: "Remove badge",
          class: "ms-1.5 -me-1.5"
        },
        {},
        {}
      )} `}` : ``}`;
    }
  })} `;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let book;
  let title;
  let img;
  let desc;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  book = data.data;
  title = book.title;
  img = getImg(book.img[0], book.id, "books");
  desc = book.desc;
  return `<div class="w-full flex flex-row bg-gray-100 justify-center"><img class="py-10" width="400"${add_attribute("alt", title, 0)}${add_attribute("src", img, 0)}></div> <div class="bg-yellow-100"><h2 class="bg-yellow-300 p-2">${escape(title)}</h2> <div class="p-5"><!-- HTML_TAG_START -->${desc}<!-- HTML_TAG_END --></div> <div class="my-5 pb-10 flex flex-col items-center ">${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return ` <div class="loading">${validate_component(Spinner, "Spinner").$$render($$result, {}, {}, {})}
                Loading Shops ...</div> `;
    }
    return function(links) {
      return ` ${each(links, (link) => {
        return `<a${add_attribute("href", link.link, 0)} target="_blank">${validate_component(Button, "Button").$$render($$result, { class: "text-lg mt-3", color: "green" }, {}, {
          default: () => {
            return `${escape(link.label)} 🛒`;
          }
        })} </a>`;
      })} `;
    }(__value);
  }(data.streamed.links)} <a href="${"https://www.amazon.de/gp/search?ie=UTF8&tag=jumex_online-21&linkCode=ur2&linkId=470bf27aa1feb315de9cb5f18b114f2f&camp=1638&creative=6742&index=books&keywords=" + escape(title, true)}" target="_blank"><img width="100" alt="Amazon Logo" src="/images/logos/Amazon.de-Logo.svg.png"></a> <a href="${"https://www.ebay.de/sch/i.html?_from=R40&_trksid=p4432023.m570.l1313&_nkw=" + escape(title, true) + "&_sacat=0"}" target="_blank"><img width="100" alt="Ebay Logo" src="/images/logos/EBay_logo.png"></a></div></div> <div class="bg-teal-100"><div class="p-2 w-full mt-5 bg-teal-300 text-lg font-bold text-center" data-svelte-h="svelte-ooggy2">Stichwörter:</div> <div class="p-5 flex flex-row justify-center ">${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return ` <div class="loading">${validate_component(Spinner, "Spinner").$$render($$result, {}, {}, {})}
                    Loading hashtags ...</div> `;
    }
    return function(hashtags) {
      return ` ${each(hashtags, (hashtag) => {
        return `${validate_component(Badge, "Badge").$$render(
          $$result,
          {
            class: "mx-3",
            border: true,
            color: "yellow"
          },
          {},
          {
            default: () => {
              return `#${escape(hashtag.tag)}`;
            }
          }
        )}`;
      })} `;
    }(__value);
  }(data.streamed.hashtags)}</div></div> <div class="bg-lime-100"><div class="w-full my-5 bg-lime-300 p-3 text-lg font-bold text-center" data-svelte-h="svelte-nfoxyh">Ähnliche Bücher:</div> <ul class="grid grid-cols-2 md:grid-cols-3">${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return ` <div class="loading">${validate_component(Spinner, "Spinner").$$render($$result, {}, {}, {})}
            Loading similar books ...</div> `;
    }
    return function(similarBooks) {
      return ` ${each(similarBooks, (similarbook) => {
        return `<li class="my-2">${validate_component(Book, "Book").$$render(
          $$result,
          {
            book: {
              id: similarbook.id,
              title: similarbook.title,
              img: similarbook.img
            }
          },
          {},
          {}
        )}</li>`;
      })} `;
    }(__value);
  }(data.streamed.similarBooks)}</ul></div>`;
});
export {
  Page as default
};
