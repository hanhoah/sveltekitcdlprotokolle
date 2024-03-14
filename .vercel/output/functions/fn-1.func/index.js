globalThis.global = globalThis;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __publicField = (obj, key2, value) => {
  __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// .svelte-kit/output/server/chunks/ssr.js
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    for (const callback of callbacks) {
      callback(void 0);
    }
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function compute_rest_props(props, keys) {
  const rest = {};
  keys = new Set(keys);
  for (const k in props)
    if (!keys.has(k) && k[0] !== "$")
      rest[k] = props[k];
  return rest;
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
  return new CustomEvent(type, { detail, bubbles, cancelable });
}
function set_current_component(component4) {
  current_component = component4;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
  const component4 = get_current_component();
  return (type, detail, { cancelable = false } = {}) => {
    const callbacks = component4.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(
        /** @type {string} */
        type,
        detail,
        { cancelable }
      );
      callbacks.slice().forEach((fn) => {
        fn.call(component4, event);
      });
      return !event.defaultPrevented;
    }
    return true;
  };
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function getContext(key2) {
  return get_current_component().$$.context.get(key2);
}
function spread(args, attrs_to_add) {
  const attributes = Object.assign({}, ...args);
  if (attrs_to_add) {
    const classes_to_add = attrs_to_add.classes;
    const styles_to_add = attrs_to_add.styles;
    if (classes_to_add) {
      if (attributes.class == null) {
        attributes.class = classes_to_add;
      } else {
        attributes.class += " " + classes_to_add;
      }
    }
    if (styles_to_add) {
      if (attributes.style == null) {
        attributes.style = style_object_to_string(styles_to_add);
      } else {
        attributes.style = style_object_to_string(
          merge_ssr_styles(attributes.style, styles_to_add)
        );
      }
    }
  }
  let str = "";
  Object.keys(attributes).forEach((name2) => {
    if (invalid_attribute_name_character.test(name2))
      return;
    const value = attributes[name2];
    if (value === true)
      str += " " + name2;
    else if (boolean_attributes.has(name2.toLowerCase())) {
      if (value)
        str += " " + name2;
    } else if (value != null) {
      str += ` ${name2}="${value}"`;
    }
  });
  return str;
}
function merge_ssr_styles(style_attribute, style_directive) {
  const style_object = {};
  for (const individual_style of style_attribute.split(";")) {
    const colon_index = individual_style.indexOf(":");
    const name2 = individual_style.slice(0, colon_index).trim();
    const value = individual_style.slice(colon_index + 1).trim();
    if (!name2)
      continue;
    style_object[name2] = value;
  }
  for (const name2 in style_directive) {
    const value = style_directive[name2];
    if (value) {
      style_object[name2] = value;
    } else {
      delete style_object[name2];
    }
  }
  return style_object;
}
function escape(value, is_attr = false) {
  const str = String(value);
  const pattern2 = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern2.lastIndex = 0;
  let escaped2 = "";
  let last = 0;
  while (pattern2.test(str)) {
    const i = pattern2.lastIndex - 1;
    const ch = str[i];
    escaped2 += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped2 + str.substring(last);
}
function escape_attribute_value(value) {
  const should_escape = typeof value === "string" || value && typeof value === "object";
  return should_escape ? escape(value, true) : value;
}
function escape_object(obj) {
  const result = {};
  for (const key2 in obj) {
    result[key2] = escape_attribute_value(obj[key2]);
  }
  return result;
}
function validate_component(component4, name2) {
  if (!component4 || !component4.$$render) {
    if (name2 === "svelte:component")
      name2 += " this={...}";
    throw new Error(
      `<${name2}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name2}>.`
    );
  }
  return component4;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      // these will be immediately discarded
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css3) => css3.code).join("\n"),
          map: null
          // TODO
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name2, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  const assignment = boolean && value === true ? "" : `="${escape(value, true)}"`;
  return ` ${name2}${assignment}`;
}
function style_object_to_string(style_object) {
  return Object.keys(style_object).filter((key2) => style_object[key2]).map((key2) => `${key2}: ${escape_attribute_value(style_object[key2])};`).join(" ");
}
var current_component, _boolean_attributes, boolean_attributes, invalid_attribute_name_character, ATTR_REGEX, CONTENT_REGEX, missing_component, on_destroy;
var init_ssr = __esm({
  ".svelte-kit/output/server/chunks/ssr.js"() {
    _boolean_attributes = /** @type {const} */
    [
      "allowfullscreen",
      "allowpaymentrequest",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "defer",
      "disabled",
      "formnovalidate",
      "hidden",
      "inert",
      "ismap",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "selected"
    ];
    boolean_attributes = /* @__PURE__ */ new Set([..._boolean_attributes]);
    invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
    ATTR_REGEX = /[&"]/g;
    CONTENT_REGEX = /[&<]/g;
    missing_component = {
      $$render: () => ""
    };
  }
});

// .svelte-kit/output/server/chunks/exports.js
function resolve(base2, path) {
  if (path[0] === "/" && path[1] === "/")
    return path;
  let url = new URL(base2, internal);
  url = new URL(path, url);
  return url.protocol === internal.protocol ? url.pathname + url.search + url.hash : url.href;
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_pathname(pathname) {
  return pathname.split("%25").map(decodeURI).join("%25");
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = decodeURIComponent(params[key2]);
  }
  return params;
}
function make_trackable(url, callback, search_params_callback) {
  const tracked = new URL(url);
  Object.defineProperty(tracked, "searchParams", {
    value: new Proxy(tracked.searchParams, {
      get(obj, key2) {
        if (key2 === "get" || key2 === "getAll" || key2 === "has") {
          return (param) => {
            search_params_callback(param);
            return obj[key2](param);
          };
        }
        callback();
        const value = Reflect.get(obj, key2);
        return typeof value === "function" ? value.bind(obj) : value;
      }
    }),
    enumerable: true,
    configurable: true
  });
  for (const property of tracked_url_properties) {
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return url[property];
      },
      enumerable: true,
      configurable: true
    });
  }
  {
    tracked[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url, opts);
    };
  }
  {
    disable_hash(tracked);
  }
  return tracked;
}
function disable_hash(url) {
  allow_nodejs_console_log(url);
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead"
      );
    }
  });
}
function disable_search(url) {
  allow_nodejs_console_log(url);
  for (const property of ["search", "searchParams"]) {
    Object.defineProperty(url, property, {
      get() {
        throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
      }
    });
  }
}
function allow_nodejs_console_log(url) {
  {
    url[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(new URL(url), opts);
    };
  }
}
function has_data_suffix(pathname) {
  return pathname.endsWith(DATA_SUFFIX) || pathname.endsWith(HTML_DATA_SUFFIX);
}
function add_data_suffix(pathname) {
  if (pathname.endsWith(".html"))
    return pathname.replace(/\.html$/, HTML_DATA_SUFFIX);
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
function strip_data_suffix(pathname) {
  if (pathname.endsWith(HTML_DATA_SUFFIX)) {
    return pathname.slice(0, -HTML_DATA_SUFFIX.length) + ".html";
  }
  return pathname.slice(0, -DATA_SUFFIX.length);
}
function validator(expected) {
  function validate(module, file) {
    if (!module)
      return;
    for (const key2 in module) {
      if (key2[0] === "_" || expected.has(key2))
        continue;
      const values = [...expected.values()];
      const hint = hint_for_supported_files(key2, file?.slice(file.lastIndexOf("."))) ?? `valid exports are ${values.join(", ")}, or anything with a '_' prefix`;
      throw new Error(`Invalid export '${key2}'${file ? ` in ${file}` : ""} (${hint})`);
    }
  }
  return validate;
}
function hint_for_supported_files(key2, ext = ".js") {
  const supported_files = [];
  if (valid_layout_exports.has(key2)) {
    supported_files.push(`+layout${ext}`);
  }
  if (valid_page_exports.has(key2)) {
    supported_files.push(`+page${ext}`);
  }
  if (valid_layout_server_exports.has(key2)) {
    supported_files.push(`+layout.server${ext}`);
  }
  if (valid_page_server_exports.has(key2)) {
    supported_files.push(`+page.server${ext}`);
  }
  if (valid_server_exports.has(key2)) {
    supported_files.push(`+server${ext}`);
  }
  if (supported_files.length > 0) {
    return `'${key2}' is a valid export in ${supported_files.slice(0, -1).join(", ")}${supported_files.length > 1 ? " or " : ""}${supported_files.at(-1)}`;
  }
}
var internal, tracked_url_properties, DATA_SUFFIX, HTML_DATA_SUFFIX, valid_layout_exports, valid_page_exports, valid_layout_server_exports, valid_page_server_exports, valid_server_exports, validate_layout_exports, validate_page_exports, validate_layout_server_exports, validate_page_server_exports, validate_server_exports;
var init_exports = __esm({
  ".svelte-kit/output/server/chunks/exports.js"() {
    internal = new URL("sveltekit-internal://");
    tracked_url_properties = /** @type {const} */
    [
      "href",
      "pathname",
      "search",
      "toString",
      "toJSON"
    ];
    DATA_SUFFIX = "/__data.json";
    HTML_DATA_SUFFIX = ".html__data.json";
    valid_layout_exports = /* @__PURE__ */ new Set([
      "load",
      "prerender",
      "csr",
      "ssr",
      "trailingSlash",
      "config"
    ]);
    valid_page_exports = /* @__PURE__ */ new Set([...valid_layout_exports, "entries"]);
    valid_layout_server_exports = /* @__PURE__ */ new Set([...valid_layout_exports]);
    valid_page_server_exports = /* @__PURE__ */ new Set([...valid_layout_server_exports, "actions", "entries"]);
    valid_server_exports = /* @__PURE__ */ new Set([
      "GET",
      "POST",
      "PATCH",
      "PUT",
      "DELETE",
      "OPTIONS",
      "HEAD",
      "fallback",
      "prerender",
      "trailingSlash",
      "config",
      "entries"
    ]);
    validate_layout_exports = validator(valid_layout_exports);
    validate_page_exports = validator(valid_page_exports);
    validate_layout_server_exports = validator(valid_layout_server_exports);
    validate_page_server_exports = validator(valid_page_server_exports);
    validate_server_exports = validator(valid_server_exports);
  }
});

// .svelte-kit/output/server/chunks/index.js
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set, update) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
var subscriber_queue;
var init_chunks = __esm({
  ".svelte-kit/output/server/chunks/index.js"() {
    init_ssr();
    subscriber_queue = [];
  }
});

// node_modules/.pnpm/@vercel+analytics@1.2.2/node_modules/@vercel/analytics/dist/index.mjs
function isBrowser() {
  return typeof window !== "undefined";
}
function detectEnvironment() {
  try {
    const env = "development";
    if (env === "development" || env === "test") {
      return "development";
    }
  } catch (e) {
  }
  return "production";
}
function setMode(mode = "auto") {
  if (mode === "auto") {
    window.vam = detectEnvironment();
    return;
  }
  window.vam = mode;
}
function getMode() {
  const mode = isBrowser() ? window.vam : detectEnvironment();
  return mode || "production";
}
function isDevelopment() {
  return getMode() === "development";
}
function inject(props = {
  debug: true
}) {
  var _a;
  if (!isBrowser())
    return;
  setMode(props.mode);
  initQueue();
  if (props.beforeSend) {
    (_a = window.va) == null ? void 0 : _a.call(window, "beforeSend", props.beforeSend);
  }
  const src = props.scriptSrc || (isDevelopment() ? DEV_SCRIPT_URL : PROD_SCRIPT_URL);
  if (document.head.querySelector(`script[src*="${src}"]`))
    return;
  const script = document.createElement("script");
  script.src = src;
  script.defer = true;
  script.dataset.sdkn = name + (props.framework ? `/${props.framework}` : "");
  script.dataset.sdkv = version;
  if (props.disableAutoTrack) {
    script.dataset.disableAutoTrack = "1";
  }
  if (props.endpoint) {
    script.dataset.endpoint = props.endpoint;
  }
  if (props.dsn) {
    script.dataset.dsn = props.dsn;
  }
  script.onerror = () => {
    const errorMessage = isDevelopment() ? "Please check if any ad blockers are enabled and try again." : "Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.";
    console.log(
      `[Vercel Web Analytics] Failed to load script from ${src}. ${errorMessage}`
    );
  };
  if (isDevelopment() && props.debug === false) {
    script.dataset.debug = "false";
  }
  document.head.appendChild(script);
}
var name, version, initQueue, DEV_SCRIPT_URL, PROD_SCRIPT_URL;
var init_dist = __esm({
  "node_modules/.pnpm/@vercel+analytics@1.2.2/node_modules/@vercel/analytics/dist/index.mjs"() {
    name = "@vercel/analytics";
    version = "1.2.2";
    initQueue = () => {
      if (window.va)
        return;
      window.va = function a(...params) {
        (window.vaq = window.vaq || []).push(params);
      };
    };
    DEV_SCRIPT_URL = "https://va.vercel-scripts.com/v1/script.debug.js";
    PROD_SCRIPT_URL = "/_vercel/insights/script.js";
  }
});

// .svelte-kit/output/server/entries/pages/_layout.js
var layout_exports = {};
__export(layout_exports, {
  config: () => config
});
var config;
var init_layout = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.js"() {
    init_dist();
    inject({ mode: "production" });
    config = {};
  }
});

// .svelte-kit/output/server/chunks/stores.js
function get(key2, parse2 = JSON.parse) {
  try {
    return parse2(sessionStorage[key2]);
  } catch {
  }
}
var SNAPSHOT_KEY, SCROLL_KEY, getStores, page;
var init_stores = __esm({
  ".svelte-kit/output/server/chunks/stores.js"() {
    init_ssr();
    init_exports();
    SNAPSHOT_KEY = "sveltekit:snapshot";
    SCROLL_KEY = "sveltekit:scroll";
    get(SCROLL_KEY) ?? {};
    get(SNAPSHOT_KEY) ?? {};
    getStores = () => {
      const stores = getContext("__svelte__");
      return {
        /** @type {typeof page} */
        page: {
          subscribe: stores.page.subscribe
        },
        /** @type {typeof navigating} */
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        /** @type {typeof updated} */
        updated: stores.updated
      };
    };
    page = {
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
  }
});

// .svelte-kit/output/server/entries/pages/_layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => Layout
});
function mergeIconTransformations(obj1, obj2) {
  const result = {};
  if (!obj1.hFlip !== !obj2.hFlip) {
    result.hFlip = true;
  }
  if (!obj1.vFlip !== !obj2.vFlip) {
    result.vFlip = true;
  }
  const rotate = ((obj1.rotate || 0) + (obj2.rotate || 0)) % 4;
  if (rotate) {
    result.rotate = rotate;
  }
  return result;
}
function mergeIconData(parent, child) {
  const result = mergeIconTransformations(parent, child);
  for (const key2 in defaultExtendedIconProps) {
    if (key2 in defaultIconTransformations) {
      if (key2 in parent && !(key2 in result)) {
        result[key2] = defaultIconTransformations[key2];
      }
    } else if (key2 in child) {
      result[key2] = child[key2];
    } else if (key2 in parent) {
      result[key2] = parent[key2];
    }
  }
  return result;
}
function getIconsTree(data, names) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  const resolved = /* @__PURE__ */ Object.create(null);
  function resolve2(name2) {
    if (icons[name2]) {
      return resolved[name2] = [];
    }
    if (!(name2 in resolved)) {
      resolved[name2] = null;
      const parent = aliases[name2] && aliases[name2].parent;
      const value = parent && resolve2(parent);
      if (value) {
        resolved[name2] = [parent].concat(value);
      }
    }
    return resolved[name2];
  }
  (names || Object.keys(icons).concat(Object.keys(aliases))).forEach(resolve2);
  return resolved;
}
function internalGetIconData(data, name2, tree) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  let currentProps = {};
  function parse2(name22) {
    currentProps = mergeIconData(
      icons[name22] || aliases[name22],
      currentProps
    );
  }
  parse2(name2);
  tree.forEach(parse2);
  return mergeIconData(data, currentProps);
}
function parseIconSet(data, callback) {
  const names = [];
  if (typeof data !== "object" || typeof data.icons !== "object") {
    return names;
  }
  if (data.not_found instanceof Array) {
    data.not_found.forEach((name2) => {
      callback(name2, null);
      names.push(name2);
    });
  }
  const tree = getIconsTree(data);
  for (const name2 in tree) {
    const item = tree[name2];
    if (item) {
      callback(name2, internalGetIconData(data, name2, item));
      names.push(name2);
    }
  }
  return names;
}
function checkOptionalProps(item, defaults) {
  for (const prop in defaults) {
    if (prop in item && typeof item[prop] !== typeof defaults[prop]) {
      return false;
    }
  }
  return true;
}
function quicklyValidateIconSet(obj) {
  if (typeof obj !== "object" || obj === null) {
    return null;
  }
  const data = obj;
  if (typeof data.prefix !== "string" || !obj.icons || typeof obj.icons !== "object") {
    return null;
  }
  if (!checkOptionalProps(obj, optionalPropertyDefaults)) {
    return null;
  }
  const icons = data.icons;
  for (const name2 in icons) {
    const icon = icons[name2];
    if (!name2.match(matchIconName) || typeof icon.body !== "string" || !checkOptionalProps(
      icon,
      defaultExtendedIconProps
    )) {
      return null;
    }
  }
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  for (const name2 in aliases) {
    const icon = aliases[name2];
    const parent = icon.parent;
    if (!name2.match(matchIconName) || typeof parent !== "string" || !icons[parent] && !aliases[parent] || !checkOptionalProps(
      icon,
      defaultExtendedIconProps
    )) {
      return null;
    }
  }
  return data;
}
function newStorage(provider, prefix) {
  return {
    provider,
    prefix,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function getStorage(provider, prefix) {
  const providerStorage = dataStorage[provider] || (dataStorage[provider] = /* @__PURE__ */ Object.create(null));
  return providerStorage[prefix] || (providerStorage[prefix] = newStorage(provider, prefix));
}
function addIconSet(storage2, data) {
  if (!quicklyValidateIconSet(data)) {
    return [];
  }
  return parseIconSet(data, (name2, icon) => {
    if (icon) {
      storage2.icons[name2] = icon;
    } else {
      storage2.missing.add(name2);
    }
  });
}
function addIconToStorage(storage2, name2, icon) {
  try {
    if (typeof icon.body === "string") {
      storage2.icons[name2] = { ...icon };
      return true;
    }
  } catch (err) {
  }
  return false;
}
function allowSimpleNames(allow) {
  if (typeof allow === "boolean") {
    simpleNames = allow;
  }
  return simpleNames;
}
function getIconData(name2) {
  const icon = typeof name2 === "string" ? stringToIcon(name2, true, simpleNames) : name2;
  if (icon) {
    const storage2 = getStorage(icon.provider, icon.prefix);
    const iconName = icon.name;
    return storage2.icons[iconName] || (storage2.missing.has(iconName) ? null : void 0);
  }
}
function addIcon(name2, data) {
  const icon = stringToIcon(name2, true, simpleNames);
  if (!icon) {
    return false;
  }
  const storage2 = getStorage(icon.provider, icon.prefix);
  return addIconToStorage(storage2, icon.name, data);
}
function addCollection(data, provider) {
  if (typeof data !== "object") {
    return false;
  }
  if (typeof provider !== "string") {
    provider = data.provider || "";
  }
  if (simpleNames && !provider && !data.prefix) {
    let added = false;
    if (quicklyValidateIconSet(data)) {
      data.prefix = "";
      parseIconSet(data, (name2, icon) => {
        if (icon && addIcon(name2, icon)) {
          added = true;
        }
      });
    }
    return added;
  }
  const prefix = data.prefix;
  if (!validateIconName({
    provider,
    prefix,
    name: "a"
  })) {
    return false;
  }
  const storage2 = getStorage(provider, prefix);
  return !!addIconSet(storage2, data);
}
function calculateSize(size, ratio, precision) {
  if (ratio === 1) {
    return size;
  }
  precision = precision || 100;
  if (typeof size === "number") {
    return Math.ceil(size * ratio * precision) / precision;
  }
  if (typeof size !== "string") {
    return size;
  }
  const oldParts = size.split(unitsSplit);
  if (oldParts === null || !oldParts.length) {
    return size;
  }
  const newParts = [];
  let code = oldParts.shift();
  let isNumber2 = unitsTest.test(code);
  while (true) {
    if (isNumber2) {
      const num = parseFloat(code);
      if (isNaN(num)) {
        newParts.push(code);
      } else {
        newParts.push(Math.ceil(num * ratio * precision) / precision);
      }
    } else {
      newParts.push(code);
    }
    code = oldParts.shift();
    if (code === void 0) {
      return newParts.join("");
    }
    isNumber2 = !isNumber2;
  }
}
function splitSVGDefs(content, tag = "defs") {
  let defs = "";
  const index4 = content.indexOf("<" + tag);
  while (index4 >= 0) {
    const start = content.indexOf(">", index4);
    const end = content.indexOf("</" + tag);
    if (start === -1 || end === -1) {
      break;
    }
    const endEnd = content.indexOf(">", end);
    if (endEnd === -1) {
      break;
    }
    defs += content.slice(start + 1, end).trim();
    content = content.slice(0, index4).trim() + content.slice(endEnd + 1);
  }
  return {
    defs,
    content
  };
}
function mergeDefsAndContent(defs, content) {
  return defs ? "<defs>" + defs + "</defs>" + content : content;
}
function wrapSVGContent(body2, start, end) {
  const split = splitSVGDefs(body2);
  return mergeDefsAndContent(split.defs, start + split.content + end);
}
function iconToSVG(icon, customisations) {
  const fullIcon = {
    ...defaultIconProps,
    ...icon
  };
  const fullCustomisations = {
    ...defaultIconCustomisations,
    ...customisations
  };
  const box = {
    left: fullIcon.left,
    top: fullIcon.top,
    width: fullIcon.width,
    height: fullIcon.height
  };
  let body2 = fullIcon.body;
  [fullIcon, fullCustomisations].forEach((props) => {
    const transformations = [];
    const hFlip = props.hFlip;
    const vFlip = props.vFlip;
    let rotation = props.rotate;
    if (hFlip) {
      if (vFlip) {
        rotation += 2;
      } else {
        transformations.push(
          "translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")"
        );
        transformations.push("scale(-1 1)");
        box.top = box.left = 0;
      }
    } else if (vFlip) {
      transformations.push(
        "translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")"
      );
      transformations.push("scale(1 -1)");
      box.top = box.left = 0;
    }
    let tempValue;
    if (rotation < 0) {
      rotation -= Math.floor(rotation / 4) * 4;
    }
    rotation = rotation % 4;
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top;
        transformations.unshift(
          "rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
      case 2:
        transformations.unshift(
          "rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")"
        );
        break;
      case 3:
        tempValue = box.width / 2 + box.left;
        transformations.unshift(
          "rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
    }
    if (rotation % 2 === 1) {
      if (box.left !== box.top) {
        tempValue = box.left;
        box.left = box.top;
        box.top = tempValue;
      }
      if (box.width !== box.height) {
        tempValue = box.width;
        box.width = box.height;
        box.height = tempValue;
      }
    }
    if (transformations.length) {
      body2 = wrapSVGContent(
        body2,
        '<g transform="' + transformations.join(" ") + '">',
        "</g>"
      );
    }
  });
  const customisationsWidth = fullCustomisations.width;
  const customisationsHeight = fullCustomisations.height;
  const boxWidth = box.width;
  const boxHeight = box.height;
  let width;
  let height;
  if (customisationsWidth === null) {
    height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
    width = calculateSize(height, boxWidth / boxHeight);
  } else {
    width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
    height = customisationsHeight === null ? calculateSize(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
  }
  const attributes = {};
  const setAttr = (prop, value) => {
    if (!isUnsetKeyword(value)) {
      attributes[prop] = value.toString();
    }
  };
  setAttr("width", width);
  setAttr("height", height);
  const viewBox = [box.left, box.top, boxWidth, boxHeight];
  attributes.viewBox = viewBox.join(" ");
  return {
    attributes,
    viewBox,
    body: body2
  };
}
function replaceIDs(body2, prefix = randomPrefix) {
  const ids = [];
  let match;
  while (match = regex.exec(body2)) {
    ids.push(match[1]);
  }
  if (!ids.length) {
    return body2;
  }
  const suffix = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  ids.forEach((id) => {
    const newID = typeof prefix === "function" ? prefix(id) : prefix + (counter++).toString();
    const escapedID = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    body2 = body2.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + escapedID + ')([")]|\\.[a-z])', "g"),
      "$1" + newID + suffix + "$3"
    );
  });
  body2 = body2.replace(new RegExp(suffix, "g"), "");
  return body2;
}
function setAPIModule(provider, item) {
  storage[provider] = item;
}
function getAPIModule(provider) {
  return storage[provider] || storage[""];
}
function createAPIConfig(source) {
  let resources;
  if (typeof source.resources === "string") {
    resources = [source.resources];
  } else {
    resources = source.resources;
    if (!(resources instanceof Array) || !resources.length) {
      return null;
    }
  }
  const result = {
    // API hosts
    resources,
    // Root path
    path: source.path || "/",
    // URL length limit
    maxURL: source.maxURL || 500,
    // Timeout before next host is used.
    rotate: source.rotate || 750,
    // Timeout before failing query.
    timeout: source.timeout || 5e3,
    // Randomise default API end point.
    random: source.random === true,
    // Start index
    index: source.index || 0,
    // Receive data after time out (used if time out kicks in first, then API module sends data anyway).
    dataAfterTimeout: source.dataAfterTimeout !== false
  };
  return result;
}
function addAPIProvider(provider, customConfig) {
  const config3 = createAPIConfig(customConfig);
  if (config3 === null) {
    return false;
  }
  configStorage[provider] = config3;
  return true;
}
function getAPIConfig(provider) {
  return configStorage[provider];
}
function calculateMaxLength(provider, prefix) {
  const config3 = getAPIConfig(provider);
  if (!config3) {
    return 0;
  }
  let result;
  if (!config3.maxURL) {
    result = 0;
  } else {
    let maxHostLength = 0;
    config3.resources.forEach((item) => {
      const host = item;
      maxHostLength = Math.max(maxHostLength, host.length);
    });
    const url = prefix + ".json?icons=";
    result = config3.maxURL - maxHostLength - config3.path.length - url.length;
  }
  return result;
}
function shouldAbort(status) {
  return status === 404;
}
function getPath(provider) {
  if (typeof provider === "string") {
    const config3 = getAPIConfig(provider);
    if (config3) {
      return config3.path;
    }
  }
  return "/";
}
function sortIcons(icons) {
  const result = {
    loaded: [],
    missing: [],
    pending: []
  };
  const storage2 = /* @__PURE__ */ Object.create(null);
  icons.sort((a, b) => {
    if (a.provider !== b.provider) {
      return a.provider.localeCompare(b.provider);
    }
    if (a.prefix !== b.prefix) {
      return a.prefix.localeCompare(b.prefix);
    }
    return a.name.localeCompare(b.name);
  });
  let lastIcon = {
    provider: "",
    prefix: "",
    name: ""
  };
  icons.forEach((icon) => {
    if (lastIcon.name === icon.name && lastIcon.prefix === icon.prefix && lastIcon.provider === icon.provider) {
      return;
    }
    lastIcon = icon;
    const provider = icon.provider;
    const prefix = icon.prefix;
    const name2 = icon.name;
    const providerStorage = storage2[provider] || (storage2[provider] = /* @__PURE__ */ Object.create(null));
    const localStorage = providerStorage[prefix] || (providerStorage[prefix] = getStorage(provider, prefix));
    let list;
    if (name2 in localStorage.icons) {
      list = result.loaded;
    } else if (prefix === "" || localStorage.missing.has(name2)) {
      list = result.missing;
    } else {
      list = result.pending;
    }
    const item = {
      provider,
      prefix,
      name: name2
    };
    list.push(item);
  });
  return result;
}
function removeCallback(storages, id) {
  storages.forEach((storage2) => {
    const items = storage2.loaderCallbacks;
    if (items) {
      storage2.loaderCallbacks = items.filter((row) => row.id !== id);
    }
  });
}
function updateCallbacks(storage2) {
  if (!storage2.pendingCallbacksFlag) {
    storage2.pendingCallbacksFlag = true;
    setTimeout(() => {
      storage2.pendingCallbacksFlag = false;
      const items = storage2.loaderCallbacks ? storage2.loaderCallbacks.slice(0) : [];
      if (!items.length) {
        return;
      }
      let hasPending = false;
      const provider = storage2.provider;
      const prefix = storage2.prefix;
      items.forEach((item) => {
        const icons = item.icons;
        const oldLength = icons.pending.length;
        icons.pending = icons.pending.filter((icon) => {
          if (icon.prefix !== prefix) {
            return true;
          }
          const name2 = icon.name;
          if (storage2.icons[name2]) {
            icons.loaded.push({
              provider,
              prefix,
              name: name2
            });
          } else if (storage2.missing.has(name2)) {
            icons.missing.push({
              provider,
              prefix,
              name: name2
            });
          } else {
            hasPending = true;
            return true;
          }
          return false;
        });
        if (icons.pending.length !== oldLength) {
          if (!hasPending) {
            removeCallback([storage2], item.id);
          }
          item.callback(
            icons.loaded.slice(0),
            icons.missing.slice(0),
            icons.pending.slice(0),
            item.abort
          );
        }
      });
    });
  }
}
function storeCallback(callback, icons, pendingSources) {
  const id = idCounter++;
  const abort = removeCallback.bind(null, pendingSources, id);
  if (!icons.pending.length) {
    return abort;
  }
  const item = {
    id,
    icons,
    callback,
    abort
  };
  pendingSources.forEach((storage2) => {
    (storage2.loaderCallbacks || (storage2.loaderCallbacks = [])).push(item);
  });
  return abort;
}
function listToIcons(list, validate = true, simpleNames2 = false) {
  const result = [];
  list.forEach((item) => {
    const icon = typeof item === "string" ? stringToIcon(item, validate, simpleNames2) : item;
    if (icon) {
      result.push(icon);
    }
  });
  return result;
}
function sendQuery(config3, payload, query, done) {
  const resourcesCount = config3.resources.length;
  const startIndex = config3.random ? Math.floor(Math.random() * resourcesCount) : config3.index;
  let resources;
  if (config3.random) {
    let list = config3.resources.slice(0);
    resources = [];
    while (list.length > 1) {
      const nextIndex = Math.floor(Math.random() * list.length);
      resources.push(list[nextIndex]);
      list = list.slice(0, nextIndex).concat(list.slice(nextIndex + 1));
    }
    resources = resources.concat(list);
  } else {
    resources = config3.resources.slice(startIndex).concat(config3.resources.slice(0, startIndex));
  }
  const startTime = Date.now();
  let status = "pending";
  let queriesSent = 0;
  let lastError;
  let timer = null;
  let queue = [];
  let doneCallbacks = [];
  if (typeof done === "function") {
    doneCallbacks.push(done);
  }
  function resetTimer() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function abort() {
    if (status === "pending") {
      status = "aborted";
    }
    resetTimer();
    queue.forEach((item) => {
      if (item.status === "pending") {
        item.status = "aborted";
      }
    });
    queue = [];
  }
  function subscribe2(callback, overwrite) {
    if (overwrite) {
      doneCallbacks = [];
    }
    if (typeof callback === "function") {
      doneCallbacks.push(callback);
    }
  }
  function getQueryStatus() {
    return {
      startTime,
      payload,
      status,
      queriesSent,
      queriesPending: queue.length,
      subscribe: subscribe2,
      abort
    };
  }
  function failQuery() {
    status = "failed";
    doneCallbacks.forEach((callback) => {
      callback(void 0, lastError);
    });
  }
  function clearQueue() {
    queue.forEach((item) => {
      if (item.status === "pending") {
        item.status = "aborted";
      }
    });
    queue = [];
  }
  function moduleResponse(item, response, data) {
    const isError = response !== "success";
    queue = queue.filter((queued) => queued !== item);
    switch (status) {
      case "pending":
        break;
      case "failed":
        if (isError || !config3.dataAfterTimeout) {
          return;
        }
        break;
      default:
        return;
    }
    if (response === "abort") {
      lastError = data;
      failQuery();
      return;
    }
    if (isError) {
      lastError = data;
      if (!queue.length) {
        if (!resources.length) {
          failQuery();
        } else {
          execNext();
        }
      }
      return;
    }
    resetTimer();
    clearQueue();
    if (!config3.random) {
      const index4 = config3.resources.indexOf(item.resource);
      if (index4 !== -1 && index4 !== config3.index) {
        config3.index = index4;
      }
    }
    status = "completed";
    doneCallbacks.forEach((callback) => {
      callback(data);
    });
  }
  function execNext() {
    if (status !== "pending") {
      return;
    }
    resetTimer();
    const resource = resources.shift();
    if (resource === void 0) {
      if (queue.length) {
        timer = setTimeout(() => {
          resetTimer();
          if (status === "pending") {
            clearQueue();
            failQuery();
          }
        }, config3.timeout);
        return;
      }
      failQuery();
      return;
    }
    const item = {
      status: "pending",
      resource,
      callback: (status2, data) => {
        moduleResponse(item, status2, data);
      }
    };
    queue.push(item);
    queriesSent++;
    timer = setTimeout(execNext, config3.rotate);
    query(resource, payload, item.callback);
  }
  setTimeout(execNext);
  return getQueryStatus;
}
function initRedundancy(cfg) {
  const config3 = {
    ...defaultConfig,
    ...cfg
  };
  let queries = [];
  function cleanup() {
    queries = queries.filter((item) => item().status === "pending");
  }
  function query(payload, queryCallback, doneCallback) {
    const query2 = sendQuery(
      config3,
      payload,
      queryCallback,
      (data, error) => {
        cleanup();
        if (doneCallback) {
          doneCallback(data, error);
        }
      }
    );
    queries.push(query2);
    return query2;
  }
  function find(callback) {
    return queries.find((value) => {
      return callback(value);
    }) || null;
  }
  const instance = {
    query,
    find,
    setIndex: (index4) => {
      config3.index = index4;
    },
    getIndex: () => config3.index,
    cleanup
  };
  return instance;
}
function emptyCallback$1() {
}
function getRedundancyCache(provider) {
  if (!redundancyCache[provider]) {
    const config3 = getAPIConfig(provider);
    if (!config3) {
      return;
    }
    const redundancy = initRedundancy(config3);
    const cachedReundancy = {
      config: config3,
      redundancy
    };
    redundancyCache[provider] = cachedReundancy;
  }
  return redundancyCache[provider];
}
function sendAPIQuery(target, query, callback) {
  let redundancy;
  let send2;
  if (typeof target === "string") {
    const api = getAPIModule(target);
    if (!api) {
      callback(void 0, 424);
      return emptyCallback$1;
    }
    send2 = api.send;
    const cached = getRedundancyCache(target);
    if (cached) {
      redundancy = cached.redundancy;
    }
  } else {
    const config3 = createAPIConfig(target);
    if (config3) {
      redundancy = initRedundancy(config3);
      const moduleKey = target.resources ? target.resources[0] : "";
      const api = getAPIModule(moduleKey);
      if (api) {
        send2 = api.send;
      }
    }
  }
  if (!redundancy || !send2) {
    callback(void 0, 424);
    return emptyCallback$1;
  }
  return redundancy.query(query, send2, callback)().abort;
}
function getStoredItem(func, key2) {
  try {
    return func.getItem(key2);
  } catch (err) {
  }
}
function setStoredItem(func, key2, value) {
  try {
    func.setItem(key2, value);
    return true;
  } catch (err) {
  }
}
function removeStoredItem(func, key2) {
  try {
    func.removeItem(key2);
  } catch (err) {
  }
}
function setBrowserStorageItemsCount(storage2, value) {
  return setStoredItem(storage2, browserCacheCountKey, value.toString());
}
function getBrowserStorageItemsCount(storage2) {
  return parseInt(getStoredItem(storage2, browserCacheCountKey)) || 0;
}
function setBrowserStorageStatus(status) {
  browserStorageStatus = status;
}
function getBrowserStorage(key2) {
  const attr = key2 + "Storage";
  try {
    if (_window && _window[attr] && typeof _window[attr].length === "number") {
      return _window[attr];
    }
  } catch (err) {
  }
  browserStorageConfig[key2] = false;
}
function iterateBrowserStorage(key2, callback) {
  const func = getBrowserStorage(key2);
  if (!func) {
    return;
  }
  const version2 = getStoredItem(func, browserCacheVersionKey);
  if (version2 !== browserCacheVersion) {
    if (version2) {
      const total2 = getBrowserStorageItemsCount(func);
      for (let i = 0; i < total2; i++) {
        removeStoredItem(func, browserCachePrefix + i.toString());
      }
    }
    setStoredItem(func, browserCacheVersionKey, browserCacheVersion);
    setBrowserStorageItemsCount(func, 0);
    return;
  }
  const minTime = Math.floor(Date.now() / browserStorageHour) - browserStorageCacheExpiration;
  const parseItem = (index4) => {
    const name2 = browserCachePrefix + index4.toString();
    const item = getStoredItem(func, name2);
    if (typeof item !== "string") {
      return;
    }
    try {
      const data = JSON.parse(item);
      if (typeof data === "object" && typeof data.cached === "number" && data.cached > minTime && typeof data.provider === "string" && typeof data.data === "object" && typeof data.data.prefix === "string" && // Valid item: run callback
      callback(data, index4)) {
        return true;
      }
    } catch (err) {
    }
    removeStoredItem(func, name2);
  };
  let total = getBrowserStorageItemsCount(func);
  for (let i = total - 1; i >= 0; i--) {
    if (!parseItem(i)) {
      if (i === total - 1) {
        total--;
        setBrowserStorageItemsCount(func, total);
      } else {
        browserStorageEmptyItems[key2].add(i);
      }
    }
  }
}
function initBrowserStorage() {
  if (browserStorageStatus) {
    return;
  }
  setBrowserStorageStatus(true);
  for (const key2 in browserStorageConfig) {
    iterateBrowserStorage(key2, (item) => {
      const iconSet = item.data;
      const provider = item.provider;
      const prefix = iconSet.prefix;
      const storage2 = getStorage(
        provider,
        prefix
      );
      if (!addIconSet(storage2, iconSet).length) {
        return false;
      }
      const lastModified = iconSet.lastModified || -1;
      storage2.lastModifiedCached = storage2.lastModifiedCached ? Math.min(storage2.lastModifiedCached, lastModified) : lastModified;
      return true;
    });
  }
}
function updateLastModified(storage2, lastModified) {
  const lastValue = storage2.lastModifiedCached;
  if (
    // Matches or newer
    lastValue && lastValue >= lastModified
  ) {
    return lastValue === lastModified;
  }
  storage2.lastModifiedCached = lastModified;
  if (lastValue) {
    for (const key2 in browserStorageConfig) {
      iterateBrowserStorage(key2, (item) => {
        const iconSet = item.data;
        return item.provider !== storage2.provider || iconSet.prefix !== storage2.prefix || iconSet.lastModified === lastModified;
      });
    }
  }
  return true;
}
function storeInBrowserStorage(storage2, data) {
  if (!browserStorageStatus) {
    initBrowserStorage();
  }
  function store(key2) {
    let func;
    if (!browserStorageConfig[key2] || !(func = getBrowserStorage(key2))) {
      return;
    }
    const set = browserStorageEmptyItems[key2];
    let index4;
    if (set.size) {
      set.delete(index4 = Array.from(set).shift());
    } else {
      index4 = getBrowserStorageItemsCount(func);
      if (index4 >= browserStorageLimit || !setBrowserStorageItemsCount(func, index4 + 1)) {
        return;
      }
    }
    const item = {
      cached: Math.floor(Date.now() / browserStorageHour),
      provider: storage2.provider,
      data
    };
    return setStoredItem(
      func,
      browserCachePrefix + index4.toString(),
      JSON.stringify(item)
    );
  }
  if (data.lastModified && !updateLastModified(storage2, data.lastModified)) {
    return;
  }
  if (!Object.keys(data.icons).length) {
    return;
  }
  if (data.not_found) {
    data = Object.assign({}, data);
    delete data.not_found;
  }
  if (!store("local")) {
    store("session");
  }
}
function emptyCallback() {
}
function loadedNewIcons(storage2) {
  if (!storage2.iconsLoaderFlag) {
    storage2.iconsLoaderFlag = true;
    setTimeout(() => {
      storage2.iconsLoaderFlag = false;
      updateCallbacks(storage2);
    });
  }
}
function loadNewIcons(storage2, icons) {
  if (!storage2.iconsToLoad) {
    storage2.iconsToLoad = icons;
  } else {
    storage2.iconsToLoad = storage2.iconsToLoad.concat(icons).sort();
  }
  if (!storage2.iconsQueueFlag) {
    storage2.iconsQueueFlag = true;
    setTimeout(() => {
      storage2.iconsQueueFlag = false;
      const { provider, prefix } = storage2;
      const icons2 = storage2.iconsToLoad;
      delete storage2.iconsToLoad;
      let api;
      if (!icons2 || !(api = getAPIModule(provider))) {
        return;
      }
      const params = api.prepare(provider, prefix, icons2);
      params.forEach((item) => {
        sendAPIQuery(provider, item, (data) => {
          if (typeof data !== "object") {
            item.icons.forEach((name2) => {
              storage2.missing.add(name2);
            });
          } else {
            try {
              const parsed = addIconSet(
                storage2,
                data
              );
              if (!parsed.length) {
                return;
              }
              const pending = storage2.pendingIcons;
              if (pending) {
                parsed.forEach((name2) => {
                  pending.delete(name2);
                });
              }
              storeInBrowserStorage(storage2, data);
            } catch (err) {
              console.error(err);
            }
          }
          loadedNewIcons(storage2);
        });
      });
    });
  }
}
function mergeCustomisations(defaults, item) {
  const result = {
    ...defaults
  };
  for (const key2 in item) {
    const value = item[key2];
    const valueType = typeof value;
    if (key2 in defaultIconSizeCustomisations) {
      if (value === null || value && (valueType === "string" || valueType === "number")) {
        result[key2] = value;
      }
    } else if (valueType === typeof result[key2]) {
      result[key2] = key2 === "rotate" ? value % 4 : value;
    }
  }
  return result;
}
function flipFromString(custom, flip) {
  flip.split(separator).forEach((str) => {
    const value = str.trim();
    switch (value) {
      case "horizontal":
        custom.hFlip = true;
        break;
      case "vertical":
        custom.vFlip = true;
        break;
    }
  });
}
function rotateFromString(value, defaultValue = 0) {
  const units = value.replace(/^-?[0-9.]*/, "");
  function cleanup(value2) {
    while (value2 < 0) {
      value2 += 4;
    }
    return value2 % 4;
  }
  if (units === "") {
    const num = parseInt(value);
    return isNaN(num) ? 0 : cleanup(num);
  } else if (units !== value) {
    let split = 0;
    switch (units) {
      case "%":
        split = 25;
        break;
      case "deg":
        split = 90;
    }
    if (split) {
      let num = parseFloat(value.slice(0, value.length - units.length));
      if (isNaN(num)) {
        return 0;
      }
      num = num / split;
      return num % 1 === 0 ? cleanup(num) : 0;
    }
  }
  return defaultValue;
}
function iconToHTML(body2, attributes) {
  let renderAttribsHTML = body2.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const attr in attributes) {
    renderAttribsHTML += " " + attr + '="' + attributes[attr] + '"';
  }
  return '<svg xmlns="http://www.w3.org/2000/svg"' + renderAttribsHTML + ">" + body2 + "</svg>";
}
function encodeSVGforURL(svg) {
  return svg.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function svgToData(svg) {
  return "data:image/svg+xml," + encodeSVGforURL(svg);
}
function svgToURL(svg) {
  return 'url("' + svgToData(svg) + '")';
}
function fixSize(value) {
  return value + (value.match(/^[-0-9.]+$/) ? "px" : "");
}
function render(icon, props) {
  const customisations = mergeCustomisations(defaultExtendedIconCustomisations, props);
  const mode = props.mode || "svg";
  const componentProps = mode === "svg" ? { ...svgDefaults } : {};
  if (icon.body.indexOf("xlink:") === -1) {
    delete componentProps["xmlns:xlink"];
  }
  let style = typeof props.style === "string" ? props.style : "";
  for (let key2 in props) {
    const value = props[key2];
    if (value === void 0) {
      continue;
    }
    switch (key2) {
      case "icon":
      case "style":
      case "onLoad":
      case "mode":
        break;
      case "inline":
      case "hFlip":
      case "vFlip":
        customisations[key2] = value === true || value === "true" || value === 1;
        break;
      case "flip":
        if (typeof value === "string") {
          flipFromString(customisations, value);
        }
        break;
      case "color":
        style = style + (style.length > 0 && style.trim().slice(-1) !== ";" ? ";" : "") + "color: " + value + "; ";
        break;
      case "rotate":
        if (typeof value === "string") {
          customisations[key2] = rotateFromString(value);
        } else if (typeof value === "number") {
          customisations[key2] = value;
        }
        break;
      case "ariaHidden":
      case "aria-hidden":
        if (value !== true && value !== "true") {
          delete componentProps["aria-hidden"];
        }
        break;
      default:
        if (key2.slice(0, 3) === "on:") {
          break;
        }
        if (defaultExtendedIconCustomisations[key2] === void 0) {
          componentProps[key2] = value;
        }
    }
  }
  const item = iconToSVG(icon, customisations);
  const renderAttribs = item.attributes;
  if (customisations.inline) {
    style = "vertical-align: -0.125em; " + style;
  }
  if (mode === "svg") {
    Object.assign(componentProps, renderAttribs);
    if (style !== "") {
      componentProps.style = style;
    }
    let localCounter = 0;
    let id = props.id;
    if (typeof id === "string") {
      id = id.replace(/-/g, "_");
    }
    return {
      svg: true,
      attributes: componentProps,
      body: replaceIDs(item.body, id ? () => id + "ID" + localCounter++ : "iconifySvelte")
    };
  }
  const { body: body2, width, height } = icon;
  const useMask = mode === "mask" || (mode === "bg" ? false : body2.indexOf("currentColor") !== -1);
  const html = iconToHTML(body2, {
    ...renderAttribs,
    width: width + "",
    height: height + ""
  });
  const url = svgToURL(html);
  const styles = {
    "--svg": url
  };
  const size = (prop) => {
    const value = renderAttribs[prop];
    if (value) {
      styles[prop] = fixSize(value);
    }
  };
  size("width");
  size("height");
  Object.assign(styles, commonProps, useMask ? monotoneProps : coloredProps);
  let customStyle = "";
  for (const key2 in styles) {
    customStyle += key2 + ": " + styles[key2] + ";";
  }
  componentProps.style = customStyle + style;
  return {
    svg: false,
    attributes: componentProps
  };
}
function checkIconState(icon, state, mounted, callback, onload) {
  function abortLoading() {
    if (state.loading) {
      state.loading.abort();
      state.loading = null;
    }
  }
  if (typeof icon === "object" && icon !== null && typeof icon.body === "string") {
    state.name = "";
    abortLoading();
    return { data: { ...defaultIconProps, ...icon } };
  }
  let iconName;
  if (typeof icon !== "string" || (iconName = stringToIcon(icon, false, true)) === null) {
    abortLoading();
    return null;
  }
  const data = getIconData(iconName);
  if (!data) {
    if (mounted && (!state.loading || state.loading.name !== icon)) {
      abortLoading();
      state.name = "";
      state.loading = {
        name: icon,
        abort: loadIcons([iconName], callback)
      };
    }
    return null;
  }
  abortLoading();
  if (state.name !== icon) {
    state.name = icon;
    if (onload && !state.destroyed) {
      onload(icon);
    }
  }
  const classes = ["iconify"];
  if (iconName.prefix !== "") {
    classes.push("iconify--" + iconName.prefix);
  }
  if (iconName.provider !== "") {
    classes.push("iconify--" + iconName.provider);
  }
  return { data, classes };
}
function generateIcon(icon, props) {
  return icon ? render({
    ...defaultIconProps,
    ...icon
  }, props) : null;
}
function getDescription($page) {
  try {
    return $page.data.data.metaDescription || $page.data.data.description.replace(/(<([^>]+)>)/gi, "").substring(0, 155);
  } catch (error) {
    return "Willkommen auf cdl-protokolle.com \u2013 Ihrer Quelle f\xFCr hochwertige Gesundheitsinformationen und wertvolle Tipps f\xFCr ein gesundes Leben! Entdecken Sie kostenlose Leseproben aus erstklassigen Gesundheitsb\xFCchern und erhalten Sie zahlreiche Ratschl\xE4ge zur Verbesserung Ihrer Gesundheit, ohne den Einsatz von Pharma-Medizin. Unsere Website entstand aus einer engagierten Telegram-Gruppe und bietet Ihnen organisierte Informationen sowie die M\xF6glichkeit zum aktiven Austausch. Tauchen Sie ein in die Welt der ganzheitlichen Gesundheit und f\xF6rdern Sie Ihr Wohlbefinden auf nat\xFCrliche Weise. Starten Sie jetzt Ihren Weg zu einem ges\xFCnderen Lebensstil!";
  }
}
function getTitle($page) {
  try {
    return $page.data.data.title || $page.data.data.name;
  } catch (error) {
    return "CDL Protokolle ";
  }
}
var matchIconName, stringToIcon, validateIconName, defaultIconDimensions, defaultIconTransformations, defaultIconProps, defaultExtendedIconProps, optionalPropertyDefaults, dataStorage, simpleNames, defaultIconSizeCustomisations, defaultIconCustomisations, unitsSplit, unitsTest, isUnsetKeyword, regex, randomPrefix, counter, storage, configStorage, fallBackAPISources, fallBackAPI, detectFetch, fetchModule, prepare, send, fetchAPIModule, idCounter, defaultConfig, redundancyCache, browserCacheVersion, browserCachePrefix, browserCacheCountKey, browserCacheVersionKey, browserStorageHour, browserStorageCacheExpiration, browserStorageLimit, browserStorageConfig, browserStorageEmptyItems, browserStorageStatus, _window, loadIcons, separator, defaultExtendedIconCustomisations, svgDefaults, commonProps, monotoneProps, coloredProps, propsToAdd, propsToAddTo, Icon, Logo, Footer, css, Navbar, Layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.svelte.js"() {
    init_ssr();
    init_stores();
    matchIconName = /^[a-z0-9]+(-[a-z0-9]+)*$/;
    stringToIcon = (value, validate, allowSimpleName, provider = "") => {
      const colonSeparated = value.split(":");
      if (value.slice(0, 1) === "@") {
        if (colonSeparated.length < 2 || colonSeparated.length > 3) {
          return null;
        }
        provider = colonSeparated.shift().slice(1);
      }
      if (colonSeparated.length > 3 || !colonSeparated.length) {
        return null;
      }
      if (colonSeparated.length > 1) {
        const name22 = colonSeparated.pop();
        const prefix = colonSeparated.pop();
        const result = {
          // Allow provider without '@': "provider:prefix:name"
          provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
          prefix,
          name: name22
        };
        return validate && !validateIconName(result) ? null : result;
      }
      const name2 = colonSeparated[0];
      const dashSeparated = name2.split("-");
      if (dashSeparated.length > 1) {
        const result = {
          provider,
          prefix: dashSeparated.shift(),
          name: dashSeparated.join("-")
        };
        return validate && !validateIconName(result) ? null : result;
      }
      if (allowSimpleName && provider === "") {
        const result = {
          provider,
          prefix: "",
          name: name2
        };
        return validate && !validateIconName(result, allowSimpleName) ? null : result;
      }
      return null;
    };
    validateIconName = (icon, allowSimpleName) => {
      if (!icon) {
        return false;
      }
      return !!((icon.provider === "" || icon.provider.match(matchIconName)) && (allowSimpleName && icon.prefix === "" || icon.prefix.match(matchIconName)) && icon.name.match(matchIconName));
    };
    defaultIconDimensions = Object.freeze(
      {
        left: 0,
        top: 0,
        width: 16,
        height: 16
      }
    );
    defaultIconTransformations = Object.freeze({
      rotate: 0,
      vFlip: false,
      hFlip: false
    });
    defaultIconProps = Object.freeze({
      ...defaultIconDimensions,
      ...defaultIconTransformations
    });
    defaultExtendedIconProps = Object.freeze({
      ...defaultIconProps,
      body: "",
      hidden: false
    });
    optionalPropertyDefaults = {
      provider: "",
      aliases: {},
      not_found: {},
      ...defaultIconDimensions
    };
    dataStorage = /* @__PURE__ */ Object.create(null);
    simpleNames = false;
    defaultIconSizeCustomisations = Object.freeze({
      width: null,
      height: null
    });
    defaultIconCustomisations = Object.freeze({
      // Dimensions
      ...defaultIconSizeCustomisations,
      // Transformations
      ...defaultIconTransformations
    });
    unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
    unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
    isUnsetKeyword = (value) => value === "unset" || value === "undefined" || value === "none";
    regex = /\sid="(\S+)"/g;
    randomPrefix = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
    counter = 0;
    storage = /* @__PURE__ */ Object.create(null);
    configStorage = /* @__PURE__ */ Object.create(null);
    fallBackAPISources = [
      "https://api.simplesvg.com",
      "https://api.unisvg.com"
    ];
    fallBackAPI = [];
    while (fallBackAPISources.length > 0) {
      if (fallBackAPISources.length === 1) {
        fallBackAPI.push(fallBackAPISources.shift());
      } else {
        if (Math.random() > 0.5) {
          fallBackAPI.push(fallBackAPISources.shift());
        } else {
          fallBackAPI.push(fallBackAPISources.pop());
        }
      }
    }
    configStorage[""] = createAPIConfig({
      resources: ["https://api.iconify.design"].concat(fallBackAPI)
    });
    detectFetch = () => {
      let callback;
      try {
        callback = fetch;
        if (typeof callback === "function") {
          return callback;
        }
      } catch (err) {
      }
    };
    fetchModule = detectFetch();
    prepare = (provider, prefix, icons) => {
      const results = [];
      const maxLength = calculateMaxLength(provider, prefix);
      const type = "icons";
      let item = {
        type,
        provider,
        prefix,
        icons: []
      };
      let length = 0;
      icons.forEach((name2, index4) => {
        length += name2.length + 1;
        if (length >= maxLength && index4 > 0) {
          results.push(item);
          item = {
            type,
            provider,
            prefix,
            icons: []
          };
          length = name2.length;
        }
        item.icons.push(name2);
      });
      results.push(item);
      return results;
    };
    send = (host, params, callback) => {
      if (!fetchModule) {
        callback("abort", 424);
        return;
      }
      let path = getPath(params.provider);
      switch (params.type) {
        case "icons": {
          const prefix = params.prefix;
          const icons = params.icons;
          const iconsList = icons.join(",");
          const urlParams = new URLSearchParams({
            icons: iconsList
          });
          path += prefix + ".json?" + urlParams.toString();
          break;
        }
        case "custom": {
          const uri = params.uri;
          path += uri.slice(0, 1) === "/" ? uri.slice(1) : uri;
          break;
        }
        default:
          callback("abort", 400);
          return;
      }
      let defaultError = 503;
      fetchModule(host + path).then((response) => {
        const status = response.status;
        if (status !== 200) {
          setTimeout(() => {
            callback(shouldAbort(status) ? "abort" : "next", status);
          });
          return;
        }
        defaultError = 501;
        return response.json();
      }).then((data) => {
        if (typeof data !== "object" || data === null) {
          setTimeout(() => {
            if (data === 404) {
              callback("abort", data);
            } else {
              callback("next", defaultError);
            }
          });
          return;
        }
        setTimeout(() => {
          callback("success", data);
        });
      }).catch(() => {
        callback("next", defaultError);
      });
    };
    fetchAPIModule = {
      prepare,
      send
    };
    idCounter = 0;
    defaultConfig = {
      resources: [],
      index: 0,
      timeout: 2e3,
      rotate: 750,
      random: false,
      dataAfterTimeout: false
    };
    redundancyCache = /* @__PURE__ */ Object.create(null);
    browserCacheVersion = "iconify2";
    browserCachePrefix = "iconify";
    browserCacheCountKey = browserCachePrefix + "-count";
    browserCacheVersionKey = browserCachePrefix + "-version";
    browserStorageHour = 36e5;
    browserStorageCacheExpiration = 168;
    browserStorageLimit = 50;
    browserStorageConfig = {
      local: true,
      session: true
    };
    browserStorageEmptyItems = {
      local: /* @__PURE__ */ new Set(),
      session: /* @__PURE__ */ new Set()
    };
    browserStorageStatus = false;
    _window = typeof window === "undefined" ? {} : window;
    loadIcons = (icons, callback) => {
      const cleanedIcons = listToIcons(icons, true, allowSimpleNames());
      const sortedIcons = sortIcons(cleanedIcons);
      if (!sortedIcons.pending.length) {
        let callCallback = true;
        if (callback) {
          setTimeout(() => {
            if (callCallback) {
              callback(
                sortedIcons.loaded,
                sortedIcons.missing,
                sortedIcons.pending,
                emptyCallback
              );
            }
          });
        }
        return () => {
          callCallback = false;
        };
      }
      const newIcons = /* @__PURE__ */ Object.create(null);
      const sources = [];
      let lastProvider, lastPrefix;
      sortedIcons.pending.forEach((icon) => {
        const { provider, prefix } = icon;
        if (prefix === lastPrefix && provider === lastProvider) {
          return;
        }
        lastProvider = provider;
        lastPrefix = prefix;
        sources.push(getStorage(provider, prefix));
        const providerNewIcons = newIcons[provider] || (newIcons[provider] = /* @__PURE__ */ Object.create(null));
        if (!providerNewIcons[prefix]) {
          providerNewIcons[prefix] = [];
        }
      });
      sortedIcons.pending.forEach((icon) => {
        const { provider, prefix, name: name2 } = icon;
        const storage2 = getStorage(provider, prefix);
        const pendingQueue = storage2.pendingIcons || (storage2.pendingIcons = /* @__PURE__ */ new Set());
        if (!pendingQueue.has(name2)) {
          pendingQueue.add(name2);
          newIcons[provider][prefix].push(name2);
        }
      });
      sources.forEach((storage2) => {
        const { provider, prefix } = storage2;
        if (newIcons[provider][prefix].length) {
          loadNewIcons(storage2, newIcons[provider][prefix]);
        }
      });
      return callback ? storeCallback(callback, sortedIcons, sources) : emptyCallback;
    };
    separator = /[\s,]+/;
    defaultExtendedIconCustomisations = {
      ...defaultIconCustomisations,
      inline: false
    };
    svgDefaults = {
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      "aria-hidden": true,
      "role": "img"
    };
    commonProps = {
      display: "inline-block"
    };
    monotoneProps = {
      "background-color": "currentColor"
    };
    coloredProps = {
      "background-color": "transparent"
    };
    propsToAdd = {
      image: "var(--svg)",
      repeat: "no-repeat",
      size: "100% 100%"
    };
    propsToAddTo = {
      "-webkit-mask": monotoneProps,
      "mask": monotoneProps,
      "background": coloredProps
    };
    for (const prefix in propsToAddTo) {
      const list = propsToAddTo[prefix];
      for (const prop in propsToAdd) {
        list[prefix + "-" + prop] = propsToAdd[prop];
      }
    }
    allowSimpleNames(true);
    setAPIModule("", fetchAPIModule);
    if (typeof document !== "undefined" && typeof window !== "undefined") {
      initBrowserStorage();
      const _window2 = window;
      if (_window2.IconifyPreload !== void 0) {
        const preload = _window2.IconifyPreload;
        const err = "Invalid IconifyPreload syntax.";
        if (typeof preload === "object" && preload !== null) {
          (preload instanceof Array ? preload : [preload]).forEach((item) => {
            try {
              if (
                // Check if item is an object and not null/array
                typeof item !== "object" || item === null || item instanceof Array || // Check for 'icons' and 'prefix'
                typeof item.icons !== "object" || typeof item.prefix !== "string" || // Add icon set
                !addCollection(item)
              ) {
                console.error(err);
              }
            } catch (e) {
              console.error(err);
            }
          });
        }
      }
      if (_window2.IconifyProviders !== void 0) {
        const providers = _window2.IconifyProviders;
        if (typeof providers === "object" && providers !== null) {
          for (let key2 in providers) {
            const err = "IconifyProviders[" + key2 + "] is invalid.";
            try {
              const value = providers[key2];
              if (typeof value !== "object" || !value || value.resources === void 0) {
                continue;
              }
              if (!addAPIProvider(key2, value)) {
                console.error(err);
              }
            } catch (e) {
              console.error(err);
            }
          }
        }
      }
    }
    Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      const state = {
        // Last icon name
        name: "",
        // Loading status
        loading: null,
        // Destroyed status
        destroyed: false
      };
      let mounted = false;
      let data;
      const onLoad = (icon) => {
        if (typeof $$props.onLoad === "function") {
          $$props.onLoad(icon);
        }
        const dispatch = createEventDispatcher();
        dispatch("load", { icon });
      };
      function loaded() {
      }
      onDestroy(() => {
        state.destroyed = true;
        if (state.loading) {
          state.loading.abort();
          state.loading = null;
        }
      });
      {
        {
          const iconData = checkIconState($$props.icon, state, mounted, loaded, onLoad);
          data = iconData ? generateIcon(iconData.data, $$props) : null;
          if (data && iconData.classes) {
            data.attributes["class"] = (typeof $$props["class"] === "string" ? $$props["class"] + " " : "") + iconData.classes.join(" ");
          }
        }
      }
      return `${data ? `${data.svg ? `<svg${spread([escape_object(data.attributes)], {})}><!-- HTML_TAG_START -->${data.body}<!-- HTML_TAG_END --></svg>` : `<span${spread([escape_object(data.attributes)], {})}></span>`}` : ``}`;
    });
    Logo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<a href="/" class="flex items-center justify-center md:justify-left space-x-3 rtl:space-x-reverse m-2">${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          icon: "solar:health-outline",
          width: "40",
          height: "40",
          color: "569099"
        },
        {},
        {}
      )} <div class="text-cyan-700 text-3xl font-black" data-svelte-h="svelte-opud5g">CDL Protokolle</div> </a>`;
    });
    Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<template><div class="w-full h-26 bg-lime-200 flex flex-col md:flex-row space-x-20 md:p-16 text-left"><div>${validate_component(Logo, "Logo").$$render($$result, {}, {}, {})}</div></div></template>`;
    });
    css = {
      code: ".menuitem.svelte-bx22ob.svelte-bx22ob:hover{font-weight:700;text-decoration-line:underline}a.svelte-bx22ob.svelte-bx22ob:active{--tw-bg-opacity:1;background-color:rgb(134 239 172 / var(--tw-bg-opacity));text-decoration-line:underline;text-decoration-color:#27272a}.navbar-mobile.svelte-bx22ob.svelte-bx22ob{position:relative;display:flex;width:100%;align-items:center;justify-content:space-between;--tw-bg-opacity:1;background-color:rgb(217 249 157 / var(--tw-bg-opacity))}.navbar-desktop.svelte-bx22ob.svelte-bx22ob{position:relative;display:none;width:100%;align-items:center;justify-content:space-between;--tw-bg-opacity:1;background-color:rgb(217 249 157 / var(--tw-bg-opacity))}@media(min-width: 768px){.navbar-desktop.svelte-bx22ob.svelte-bx22ob{display:flex}}nav.svelte-bx22ob.svelte-bx22ob{display:none}nav.open.svelte-bx22ob.svelte-bx22ob{position:absolute;top:100%;left:0px;display:block;width:100%;--tw-bg-opacity:1;background-color:rgb(253 224 71 / var(--tw-bg-opacity));text-align:center}ul.svelte-bx22ob.svelte-bx22ob{margin-top:1.25rem;margin-bottom:1.25rem;display:grid;row-gap:1rem}.burger.svelte-bx22ob.svelte-bx22ob{margin-right:0.5rem;height:1.75rem;width:1.75rem;border-radius:0.25rem;border-width:2px;--tw-border-opacity:1;border-color:rgb(14 116 144 / var(--tw-border-opacity));background-color:transparent;padding-left:0.25rem}.burger.svelte-bx22ob>div.svelte-bx22ob{position:absolute;height:2px;width:14px;--tw-bg-opacity:1;background-color:rgb(14 116 144 / var(--tw-bg-opacity))}.bar-1.svelte-bx22ob.svelte-bx22ob{--tw-translate-y:5px;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.bar-3.svelte-bx22ob.svelte-bx22ob{--tw-translate-y:-5px;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}",
      map: null
    };
    Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css);
      return ` <div class="md:hidden"><div class="navbar-mobile svelte-bx22ob"><div class=""><a href="/" class="svelte-bx22ob">${validate_component(Logo, "Logo").$$render($$result, {}, {}, {})}</a></div> <div class="dropdownmenu"><nav class="${["svelte-bx22ob", ""].join(" ").trim()}"><ul class="svelte-bx22ob"><li><a href="/buecher" class="svelte-bx22ob" data-svelte-h="svelte-1p7qgmo">B\xFCcher</a></li> <li><a href="/cdl-protokolle" class="svelte-bx22ob" data-svelte-h="svelte-1o47wwz">CDL Protokolle</a></li> <li><a href="/produkte" class="svelte-bx22ob" data-svelte-h="svelte-1a5b1wg">Produkte</a></li> </ul></nav></div> <button class="burger svelte-bx22ob" data-svelte-h="svelte-1ddgedt"><div class="bar-1 svelte-bx22ob"></div> <div class="bar-2 svelte-bx22ob"></div> <div class="bar-3 svelte-bx22ob"></div></button></div></div>  <div class="hidden md:block"><div class="navbar-desktop space-x-20 svelte-bx22ob"><a class="w-full svelte-bx22ob" href="/">${validate_component(Logo, "Logo").$$render($$result, {}, {}, {})}</a> <div id="desktopmenu" class="flex flex-row w-full space-x-5" data-svelte-h="svelte-1d1hipj"><a class="menuitem svelte-bx22ob" href="/buecher">B\xFCcher</a> <a class="menuitem svelte-bx22ob" href="/cdl-protokolle">CDL Protokolle</a> <a class="menuitem svelte-bx22ob" href="/produkte">Produkte</a></div></div> </div>`;
    });
    Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      $$unsubscribe_page();
      return `${$$result.head += `<!-- HEAD_svelte-17vvv3l_START -->${$$result.title = `<title>${escape(getTitle($page))}</title>`, ""}<meta name="description"${add_attribute("content", getDescription($page), 0)}><!-- HEAD_svelte-17vvv3l_END -->`, ""}  <div class="bg-white max-w-screen-md m-auto md:block justify-center items-center text-black"><div class="w-full mx-auto px-"> ${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})} <form class="flex border-2 justify-center items-center" method="get" action="/search"><input class="w-full border-0 border-collapse border-gray-400" type="text" name="q" placeholder="Wonach suchen Sie? (B\xFCcher, Produkte, Inhaltsstoffe)"> <button class="border-1 border-collapse border-gray-400 p-2" type="submit">${validate_component(Icon, "Icon").$$render($$result, { width: "24", icon: "ion:search-outline" }, {}, {})}</button></form>  ${slots.default ? slots.default({}) : ``}</div> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  component: () => component,
  fonts: () => fonts,
  imports: () => imports,
  index: () => index,
  stylesheets: () => stylesheets,
  universal: () => layout_exports,
  universal_id: () => universal_id
});
var index, component_cache, component, universal_id, imports, stylesheets, fonts;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    init_layout();
    index = 0;
    component = async () => component_cache ?? (component_cache = (await Promise.resolve().then(() => (init_layout_svelte(), layout_svelte_exports))).default);
    universal_id = "src/routes/+layout.js";
    imports = ["_app/immutable/nodes/0.DoMioAAU.js", "_app/immutable/chunks/scheduler.DfuChs2G.js", "_app/immutable/chunks/index.BnyCCVNm.js", "_app/immutable/chunks/spread.CgU5AtxT.js", "_app/immutable/chunks/stores.or7Ypc1L.js", "_app/immutable/chunks/entry.B8L6UBeC.js", "_app/immutable/chunks/index.DEpSfGhY.js"];
    stylesheets = ["_app/immutable/assets/0.BHl-HPRx.css"];
    fonts = [];
  }
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error2
});
var Error2;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    init_ssr();
    init_stores();
    Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      $$unsubscribe_page();
      return `<h1>${escape($page.status)}</h1> <p>${escape($page.error?.message)}</p>`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  component: () => component2,
  fonts: () => fonts2,
  imports: () => imports2,
  index: () => index2,
  stylesheets: () => stylesheets2
});
var index2, component_cache2, component2, imports2, stylesheets2, fonts2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    index2 = 1;
    component2 = async () => component_cache2 ?? (component_cache2 = (await Promise.resolve().then(() => (init_error_svelte(), error_svelte_exports))).default);
    imports2 = ["_app/immutable/nodes/1.C1g8vBv3.js", "_app/immutable/chunks/scheduler.DfuChs2G.js", "_app/immutable/chunks/index.BnyCCVNm.js", "_app/immutable/chunks/stores.or7Ypc1L.js", "_app/immutable/chunks/entry.B8L6UBeC.js", "_app/immutable/chunks/index.DEpSfGhY.js"];
    stylesheets2 = [];
    fonts2 = [];
  }
});

// .svelte-kit/output/server/entries/pages/cdl-protokolle/_page.js
var page_exports = {};
__export(page_exports, {
  config: () => config2
});
var config2;
var init_page = __esm({
  ".svelte-kit/output/server/entries/pages/cdl-protokolle/_page.js"() {
    config2 = {
      runtime: "edge"
    };
  }
});

// .svelte-kit/output/server/chunks/names.js
function is_void(name2) {
  return void_element_names.test(name2) || name2.toLowerCase() === "!doctype";
}
var void_element_names;
var init_names = __esm({
  ".svelte-kit/output/server/chunks/names.js"() {
    void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
  }
});

// .svelte-kit/output/server/chunks/bundle-mjs.js
function createClassUtils(config3) {
  const classMap = createClassMap(config3);
  const {
    conflictingClassGroups,
    conflictingClassGroupModifiers
  } = config3;
  function getClassGroupId(className) {
    const classParts = className.split(CLASS_PART_SEPARATOR);
    if (classParts[0] === "" && classParts.length !== 1) {
      classParts.shift();
    }
    return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
  }
  function getConflictingClassGroupIds(classGroupId, hasPostfixModifier) {
    const conflicts = conflictingClassGroups[classGroupId] || [];
    if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
      return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]];
    }
    return conflicts;
  }
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
}
function getGroupRecursive(classParts, classPartObject) {
  if (classParts.length === 0) {
    return classPartObject.classGroupId;
  }
  const currentClassPart = classParts[0];
  const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  const classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : void 0;
  if (classGroupFromNextClassPart) {
    return classGroupFromNextClassPart;
  }
  if (classPartObject.validators.length === 0) {
    return void 0;
  }
  const classRest = classParts.join(CLASS_PART_SEPARATOR);
  return classPartObject.validators.find(({
    validator: validator2
  }) => validator2(classRest))?.classGroupId;
}
function getGroupIdForArbitraryProperty(className) {
  if (arbitraryPropertyRegex.test(className)) {
    const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
    const property = arbitraryPropertyClassName?.substring(0, arbitraryPropertyClassName.indexOf(":"));
    if (property) {
      return "arbitrary.." + property;
    }
  }
}
function createClassMap(config3) {
  const {
    theme,
    prefix
  } = config3;
  const classMap = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  const prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config3.classGroups), prefix);
  prefixedClassGroupEntries.forEach(([classGroupId, classGroup]) => {
    processClassesRecursively(classGroup, classMap, classGroupId, theme);
  });
  return classMap;
}
function processClassesRecursively(classGroup, classPartObject, classGroupId, theme) {
  classGroup.forEach((classDefinition) => {
    if (typeof classDefinition === "string") {
      const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
      classPartObjectToEdit.classGroupId = classGroupId;
      return;
    }
    if (typeof classDefinition === "function") {
      if (isThemeGetter(classDefinition)) {
        processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
        return;
      }
      classPartObject.validators.push({
        validator: classDefinition,
        classGroupId
      });
      return;
    }
    Object.entries(classDefinition).forEach(([key2, classGroup2]) => {
      processClassesRecursively(classGroup2, getPart(classPartObject, key2), classGroupId, theme);
    });
  });
}
function getPart(classPartObject, path) {
  let currentClassPartObject = classPartObject;
  path.split(CLASS_PART_SEPARATOR).forEach((pathPart) => {
    if (!currentClassPartObject.nextPart.has(pathPart)) {
      currentClassPartObject.nextPart.set(pathPart, {
        nextPart: /* @__PURE__ */ new Map(),
        validators: []
      });
    }
    currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
  });
  return currentClassPartObject;
}
function isThemeGetter(func) {
  return func.isThemeGetter;
}
function getPrefixedClassGroupEntries(classGroupEntries, prefix) {
  if (!prefix) {
    return classGroupEntries;
  }
  return classGroupEntries.map(([classGroupId, classGroup]) => {
    const prefixedClassGroup = classGroup.map((classDefinition) => {
      if (typeof classDefinition === "string") {
        return prefix + classDefinition;
      }
      if (typeof classDefinition === "object") {
        return Object.fromEntries(Object.entries(classDefinition).map(([key2, value]) => [prefix + key2, value]));
      }
      return classDefinition;
    });
    return [classGroupId, prefixedClassGroup];
  });
}
function createLruCache(maxCacheSize) {
  if (maxCacheSize < 1) {
    return {
      get: () => void 0,
      set: () => {
      }
    };
  }
  let cacheSize = 0;
  let cache = /* @__PURE__ */ new Map();
  let previousCache = /* @__PURE__ */ new Map();
  function update(key2, value) {
    cache.set(key2, value);
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = /* @__PURE__ */ new Map();
    }
  }
  return {
    get(key2) {
      let value = cache.get(key2);
      if (value !== void 0) {
        return value;
      }
      if ((value = previousCache.get(key2)) !== void 0) {
        update(key2, value);
        return value;
      }
    },
    set(key2, value) {
      if (cache.has(key2)) {
        cache.set(key2, value);
      } else {
        update(key2, value);
      }
    }
  };
}
function createSplitModifiers(config3) {
  const separator2 = config3.separator;
  const isSeparatorSingleCharacter = separator2.length === 1;
  const firstSeparatorCharacter = separator2[0];
  const separatorLength = separator2.length;
  return function splitModifiers(className) {
    const modifiers = [];
    let bracketDepth = 0;
    let modifierStart = 0;
    let postfixModifierPosition;
    for (let index4 = 0; index4 < className.length; index4++) {
      let currentCharacter = className[index4];
      if (bracketDepth === 0) {
        if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index4, index4 + separatorLength) === separator2)) {
          modifiers.push(className.slice(modifierStart, index4));
          modifierStart = index4 + separatorLength;
          continue;
        }
        if (currentCharacter === "/") {
          postfixModifierPosition = index4;
          continue;
        }
      }
      if (currentCharacter === "[") {
        bracketDepth++;
      } else if (currentCharacter === "]") {
        bracketDepth--;
      }
    }
    const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
    const hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
    const baseClassName = hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier;
    const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
    return {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    };
  };
}
function sortModifiers(modifiers) {
  if (modifiers.length <= 1) {
    return modifiers;
  }
  const sortedModifiers = [];
  let unsortedModifiers = [];
  modifiers.forEach((modifier) => {
    const isArbitraryVariant = modifier[0] === "[";
    if (isArbitraryVariant) {
      sortedModifiers.push(...unsortedModifiers.sort(), modifier);
      unsortedModifiers = [];
    } else {
      unsortedModifiers.push(modifier);
    }
  });
  sortedModifiers.push(...unsortedModifiers.sort());
  return sortedModifiers;
}
function createConfigUtils(config3) {
  return {
    cache: createLruCache(config3.cacheSize),
    splitModifiers: createSplitModifiers(config3),
    ...createClassUtils(config3)
  };
}
function mergeClassList(classList, configUtils) {
  const {
    splitModifiers,
    getClassGroupId,
    getConflictingClassGroupIds
  } = configUtils;
  const classGroupsInConflict = /* @__PURE__ */ new Set();
  return classList.trim().split(SPLIT_CLASSES_REGEX).map((originalClassName) => {
    const {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    } = splitModifiers(originalClassName);
    let classGroupId = getClassGroupId(maybePostfixModifierPosition ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
    let hasPostfixModifier = Boolean(maybePostfixModifierPosition);
    if (!classGroupId) {
      if (!maybePostfixModifierPosition) {
        return {
          isTailwindClass: false,
          originalClassName
        };
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        return {
          isTailwindClass: false,
          originalClassName
        };
      }
      hasPostfixModifier = false;
    }
    const variantModifier = sortModifiers(modifiers).join(":");
    const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    return {
      isTailwindClass: true,
      modifierId,
      classGroupId,
      originalClassName,
      hasPostfixModifier
    };
  }).reverse().filter((parsed) => {
    if (!parsed.isTailwindClass) {
      return true;
    }
    const {
      modifierId,
      classGroupId,
      hasPostfixModifier
    } = parsed;
    const classId = modifierId + classGroupId;
    if (classGroupsInConflict.has(classId)) {
      return false;
    }
    classGroupsInConflict.add(classId);
    getConflictingClassGroupIds(classGroupId, hasPostfixModifier).forEach((group) => classGroupsInConflict.add(modifierId + group));
    return true;
  }).reverse().map((parsed) => parsed.originalClassName).join(" ");
}
function twJoin() {
  let index4 = 0;
  let argument;
  let resolvedValue;
  let string = "";
  while (index4 < arguments.length) {
    if (argument = arguments[index4++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
}
function toValue(mix) {
  if (typeof mix === "string") {
    return mix;
  }
  let resolvedValue;
  let string = "";
  for (let k = 0; k < mix.length; k++) {
    if (mix[k]) {
      if (resolvedValue = toValue(mix[k])) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
}
function createTailwindMerge(createConfigFirst, ...createConfigRest) {
  let configUtils;
  let cacheGet;
  let cacheSet;
  let functionToCall = initTailwindMerge;
  function initTailwindMerge(classList) {
    const config3 = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
    configUtils = createConfigUtils(config3);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  }
  function tailwindMerge(classList) {
    const cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    const result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  }
  return function callTailwindMerge() {
    return functionToCall(twJoin.apply(null, arguments));
  };
}
function fromTheme(key2) {
  const themeGetter = (theme) => theme[key2] || [];
  themeGetter.isThemeGetter = true;
  return themeGetter;
}
function isLength(value) {
  return isNumber(value) || stringLengths.has(value) || fractionRegex.test(value);
}
function isArbitraryLength(value) {
  return getIsArbitraryValue(value, "length", isLengthOnly);
}
function isNumber(value) {
  return Boolean(value) && !Number.isNaN(Number(value));
}
function isArbitraryNumber(value) {
  return getIsArbitraryValue(value, "number", isNumber);
}
function isInteger(value) {
  return Boolean(value) && Number.isInteger(Number(value));
}
function isPercent(value) {
  return value.endsWith("%") && isNumber(value.slice(0, -1));
}
function isArbitraryValue(value) {
  return arbitraryValueRegex.test(value);
}
function isTshirtSize(value) {
  return tshirtUnitRegex.test(value);
}
function isArbitrarySize(value) {
  return getIsArbitraryValue(value, sizeLabels, isNever);
}
function isArbitraryPosition(value) {
  return getIsArbitraryValue(value, "position", isNever);
}
function isArbitraryImage(value) {
  return getIsArbitraryValue(value, imageLabels, isImage);
}
function isArbitraryShadow(value) {
  return getIsArbitraryValue(value, "", isShadow);
}
function isAny() {
  return true;
}
function getIsArbitraryValue(value, label, testValue) {
  const result = arbitraryValueRegex.exec(value);
  if (result) {
    if (result[1]) {
      return typeof label === "string" ? result[1] === label : label.has(result[1]);
    }
    return testValue(result[2]);
  }
  return false;
}
function isLengthOnly(value) {
  return lengthUnitRegex.test(value) && !colorFunctionRegex.test(value);
}
function isNever() {
  return false;
}
function isShadow(value) {
  return shadowRegex.test(value);
}
function isImage(value) {
  return imageRegex.test(value);
}
function getDefaultConfig() {
  const colors = fromTheme("colors");
  const spacing = fromTheme("spacing");
  const blur = fromTheme("blur");
  const brightness = fromTheme("brightness");
  const borderColor = fromTheme("borderColor");
  const borderRadius = fromTheme("borderRadius");
  const borderSpacing = fromTheme("borderSpacing");
  const borderWidth = fromTheme("borderWidth");
  const contrast = fromTheme("contrast");
  const grayscale = fromTheme("grayscale");
  const hueRotate = fromTheme("hueRotate");
  const invert = fromTheme("invert");
  const gap = fromTheme("gap");
  const gradientColorStops = fromTheme("gradientColorStops");
  const gradientColorStopPositions = fromTheme("gradientColorStopPositions");
  const inset = fromTheme("inset");
  const margin = fromTheme("margin");
  const opacity = fromTheme("opacity");
  const padding = fromTheme("padding");
  const saturate = fromTheme("saturate");
  const scale = fromTheme("scale");
  const sepia = fromTheme("sepia");
  const skew = fromTheme("skew");
  const space = fromTheme("space");
  const translate = fromTheme("translate");
  const getOverscroll = () => ["auto", "contain", "none"];
  const getOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"];
  const getSpacingWithAutoAndArbitrary = () => ["auto", isArbitraryValue, spacing];
  const getSpacingWithArbitrary = () => [isArbitraryValue, spacing];
  const getLengthWithEmptyAndArbitrary = () => ["", isLength, isArbitraryLength];
  const getNumberWithAutoAndArbitrary = () => ["auto", isNumber, isArbitraryValue];
  const getPositions = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"];
  const getLineStyles = () => ["solid", "dashed", "dotted", "double", "none"];
  const getBlendModes = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity", "plus-lighter"];
  const getAlign = () => ["start", "end", "center", "between", "around", "evenly", "stretch"];
  const getZeroAndEmpty = () => ["", "0", isArbitraryValue];
  const getBreaks = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  const getNumber = () => [isNumber, isArbitraryNumber];
  const getNumberAndArbitrary = () => [isNumber, isArbitraryValue];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [isAny],
      spacing: [isLength, isArbitraryLength],
      blur: ["none", "", isTshirtSize, isArbitraryValue],
      brightness: getNumber(),
      borderColor: [colors],
      borderRadius: ["none", "", "full", isTshirtSize, isArbitraryValue],
      borderSpacing: getSpacingWithArbitrary(),
      borderWidth: getLengthWithEmptyAndArbitrary(),
      contrast: getNumber(),
      grayscale: getZeroAndEmpty(),
      hueRotate: getNumberAndArbitrary(),
      invert: getZeroAndEmpty(),
      gap: getSpacingWithArbitrary(),
      gradientColorStops: [colors],
      gradientColorStopPositions: [isPercent, isArbitraryLength],
      inset: getSpacingWithAutoAndArbitrary(),
      margin: getSpacingWithAutoAndArbitrary(),
      opacity: getNumber(),
      padding: getSpacingWithArbitrary(),
      saturate: getNumber(),
      scale: getNumber(),
      sepia: getZeroAndEmpty(),
      skew: getNumberAndArbitrary(),
      space: getSpacingWithArbitrary(),
      translate: getSpacingWithArbitrary()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", isArbitraryValue]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isTshirtSize]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": getBreaks()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": getBreaks()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...getPositions(), isArbitraryValue]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: getOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": getOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": getOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: getOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": getOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": getOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [inset]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [inset]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [inset]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [inset]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [inset]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [inset]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [inset]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [inset]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [inset]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", isInteger, isArbitraryValue]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: getSpacingWithAutoAndArbitrary()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: getZeroAndEmpty()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: getZeroAndEmpty()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", isInteger, isArbitraryValue]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [isAny]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", isInteger, isArbitraryValue]
        }, isArbitraryValue]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [isAny]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [isInteger, isArbitraryValue]
        }, isArbitraryValue]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", isArbitraryValue]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", isArbitraryValue]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [gap]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [gap]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [gap]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...getAlign()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...getAlign(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...getAlign(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [padding]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [padding]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [padding]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [padding]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [padding]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [padding]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [padding]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [padding]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [padding]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [margin]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [margin]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [margin]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [margin]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [margin]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [margin]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [margin]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [margin]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [margin]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [space]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [space]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", isArbitraryValue, spacing]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [isArbitraryValue, spacing, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [isArbitraryValue, spacing, "none", "full", "min", "max", "fit", "prose", {
          screen: [isTshirtSize]
        }, isTshirtSize]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [isArbitraryValue, spacing, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [isArbitraryValue, spacing, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [isArbitraryValue, spacing, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [isArbitraryValue, spacing, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", isTshirtSize, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", isArbitraryNumber]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [isAny]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", isArbitraryValue]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", isNumber, isArbitraryNumber]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", isLength, isArbitraryValue]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", isArbitraryValue]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [colors]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [opacity]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [colors]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [opacity]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...getLineStyles(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", isLength, isArbitraryLength]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", isLength, isArbitraryValue]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [colors]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: getSpacingWithArbitrary()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryValue]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", isArbitraryValue]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [opacity]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...getPositions(), isArbitraryPosition]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", isArbitrarySize]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, isArbitraryImage]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [colors]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [gradientColorStops]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [borderRadius]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [borderRadius]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [borderRadius]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [borderRadius]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [borderRadius]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [borderRadius]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [borderRadius]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [borderRadius]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [borderRadius]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [borderRadius]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [borderRadius]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [borderRadius]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [borderRadius]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [borderRadius]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [borderRadius]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [borderWidth]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [borderWidth]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [borderWidth]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [borderWidth]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [borderWidth]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [borderWidth]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [borderWidth]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [borderWidth]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [borderWidth]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [opacity]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...getLineStyles(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [borderWidth]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [borderWidth]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [opacity]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: getLineStyles()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [borderColor]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [borderColor]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [borderColor]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [borderColor]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [borderColor]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [borderColor]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [borderColor]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [borderColor]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...getLineStyles()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [isLength, isArbitraryValue]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [isLength, isArbitraryLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [colors]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: getLengthWithEmptyAndArbitrary()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [colors]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [opacity]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [isLength, isArbitraryLength]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [colors]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", isTshirtSize, isArbitraryShadow]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [isAny]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [opacity]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": getBlendModes()
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": getBlendModes()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [blur]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [brightness]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [contrast]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", isTshirtSize, isArbitraryValue]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [grayscale]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [hueRotate]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [invert]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [saturate]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [sepia]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [blur]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [brightness]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [contrast]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [grayscale]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [hueRotate]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [invert]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [opacity]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [saturate]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [sepia]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [borderSpacing]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [borderSpacing]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [borderSpacing]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", isArbitraryValue]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: getNumberAndArbitrary()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: getNumberAndArbitrary()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", isArbitraryValue]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [scale]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [scale]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [scale]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [isInteger, isArbitraryValue]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [translate]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [translate]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [skew]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [skew]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", isArbitraryValue]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", colors]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryValue]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [colors]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", isArbitraryValue]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [colors, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [isLength, isArbitraryLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [colors, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}
var CLASS_PART_SEPARATOR, arbitraryPropertyRegex, IMPORTANT_MODIFIER, SPLIT_CLASSES_REGEX, arbitraryValueRegex, fractionRegex, stringLengths, tshirtUnitRegex, lengthUnitRegex, colorFunctionRegex, shadowRegex, imageRegex, sizeLabels, imageLabels, twMerge;
var init_bundle_mjs = __esm({
  ".svelte-kit/output/server/chunks/bundle-mjs.js"() {
    CLASS_PART_SEPARATOR = "-";
    arbitraryPropertyRegex = /^\[(.+)\]$/;
    IMPORTANT_MODIFIER = "!";
    SPLIT_CLASSES_REGEX = /\s+/;
    arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i;
    fractionRegex = /^\d+\/\d+$/;
    stringLengths = /* @__PURE__ */ new Set(["px", "full", "screen"]);
    tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
    lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
    colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/;
    shadowRegex = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
    imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
    sizeLabels = /* @__PURE__ */ new Set(["length", "size", "percentage"]);
    imageLabels = /* @__PURE__ */ new Set(["image", "url"]);
    twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);
  }
});

// .svelte-kit/output/server/chunks/Frame.js
var Frame;
var init_Frame = __esm({
  ".svelte-kit/output/server/chunks/Frame.js"() {
    init_ssr();
    init_names();
    init_bundle_mjs();
    Frame = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["tag", "color", "rounded", "border", "shadow", "node", "use", "options", "role"]);
      const noop2 = () => {
      };
      setContext("background", true);
      let { tag = $$restProps.href ? "a" : "div" } = $$props;
      let { color = "default" } = $$props;
      let { rounded = false } = $$props;
      let { border = false } = $$props;
      let { shadow = false } = $$props;
      let { node = void 0 } = $$props;
      let { use = noop2 } = $$props;
      let { options: options2 = {} } = $$props;
      let { role = void 0 } = $$props;
      const bgColors = {
        gray: "bg-gray-50 dark:bg-gray-800",
        red: "bg-red-50 dark:bg-gray-800",
        yellow: "bg-yellow-50 dark:bg-gray-800 ",
        green: "bg-green-50 dark:bg-gray-800 ",
        indigo: "bg-indigo-50 dark:bg-gray-800 ",
        purple: "bg-purple-50 dark:bg-gray-800 ",
        pink: "bg-pink-50 dark:bg-gray-800 ",
        blue: "bg-blue-50 dark:bg-gray-800 ",
        light: "bg-gray-50 dark:bg-gray-700",
        dark: "bg-gray-50 dark:bg-gray-800",
        default: "bg-white dark:bg-gray-800",
        dropdown: "bg-white dark:bg-gray-700",
        navbar: "bg-white dark:bg-gray-900",
        navbarUl: "bg-gray-50 dark:bg-gray-800",
        form: "bg-gray-50 dark:bg-gray-700",
        primary: "bg-primary-50 dark:bg-gray-800 ",
        orange: "bg-orange-50 dark:bg-orange-800",
        none: ""
      };
      const textColors = {
        gray: "text-gray-800 dark:text-gray-300",
        red: "text-red-800 dark:text-red-400",
        yellow: "text-yellow-800 dark:text-yellow-300",
        green: "text-green-800 dark:text-green-400",
        indigo: "text-indigo-800 dark:text-indigo-400",
        purple: "text-purple-800 dark:text-purple-400",
        pink: "text-pink-800 dark:text-pink-400",
        blue: "text-blue-800 dark:text-blue-400",
        light: "text-gray-700 dark:text-gray-300",
        dark: "text-gray-700 dark:text-gray-300",
        default: "text-gray-500 dark:text-gray-400",
        dropdown: "text-gray-700 dark:text-gray-200",
        navbar: "text-gray-700 dark:text-gray-200",
        navbarUl: "text-gray-700 dark:text-gray-400",
        form: "text-gray-900 dark:text-white",
        primary: "text-primary-800 dark:text-primary-400",
        orange: "text-orange-800 dark:text-orange-400",
        none: ""
      };
      const borderColors = {
        gray: "border-gray-300 dark:border-gray-800 divide-gray-300 dark:divide-gray-800",
        red: "border-red-300 dark:border-red-800 divide-red-300 dark:divide-red-800",
        yellow: "border-yellow-300 dark:border-yellow-800 divide-yellow-300 dark:divide-yellow-800",
        green: "border-green-300 dark:border-green-800 divide-green-300 dark:divide-green-800",
        indigo: "border-indigo-300 dark:border-indigo-800 divide-indigo-300 dark:divide-indigo-800",
        purple: "border-purple-300 dark:border-purple-800 divide-purple-300 dark:divide-purple-800",
        pink: "border-pink-300 dark:border-pink-800 divide-pink-300 dark:divide-pink-800",
        blue: "border-blue-300 dark:border-blue-800 divide-blue-300 dark:divide-blue-800",
        light: "border-gray-500 divide-gray-500",
        dark: "border-gray-500 divide-gray-500",
        default: "border-gray-200 dark:border-gray-700 divide-gray-200 dark:divide-gray-700",
        dropdown: "border-gray-100 dark:border-gray-600 divide-gray-100 dark:divide-gray-600",
        navbar: "border-gray-100 dark:border-gray-700 divide-gray-100 dark:divide-gray-700",
        navbarUl: "border-gray-100 dark:border-gray-700 divide-gray-100 dark:divide-gray-700",
        form: "border-gray-300 dark:border-gray-700 divide-gray-300 dark:divide-gray-700",
        primary: "border-primary-500 dark:border-primary-200  divide-primary-500 dark:divide-primary-200 ",
        orange: "border-orange-300 dark:border-orange-800 divide-orange-300 dark:divide-orange-800",
        none: ""
      };
      let divClass;
      if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
        $$bindings.tag(tag);
      if ($$props.color === void 0 && $$bindings.color && color !== void 0)
        $$bindings.color(color);
      if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
        $$bindings.rounded(rounded);
      if ($$props.border === void 0 && $$bindings.border && border !== void 0)
        $$bindings.border(border);
      if ($$props.shadow === void 0 && $$bindings.shadow && shadow !== void 0)
        $$bindings.shadow(shadow);
      if ($$props.node === void 0 && $$bindings.node && node !== void 0)
        $$bindings.node(node);
      if ($$props.use === void 0 && $$bindings.use && use !== void 0)
        $$bindings.use(use);
      if ($$props.options === void 0 && $$bindings.options && options2 !== void 0)
        $$bindings.options(options2);
      if ($$props.role === void 0 && $$bindings.role && role !== void 0)
        $$bindings.role(role);
      color = color ?? "default";
      {
        setContext("color", color);
      }
      divClass = twMerge(bgColors[color], textColors[color], rounded && "rounded-lg", border && "border", borderColors[color], shadow && "shadow-md", $$props.class);
      return `${((tag$1) => {
        return tag$1 ? `<${tag}${spread(
          [
            { role: escape_attribute_value(role) },
            escape_object($$restProps),
            { class: escape_attribute_value(divClass) }
          ],
          {}
        )}${add_attribute("this", node, 0)}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
      })(tag)} `;
    });
  }
});

// .svelte-kit/output/server/entries/pages/cdl-protokolle/_page.svelte.js
var page_svelte_exports = {};
__export(page_svelte_exports, {
  default: () => Page
});
var Accordion, AccordionItem, telegram, Fraguns, css$r, A, css$q, Ai, css$p, B, css$o, C, css$n, D, css$m, E, css$l, F, css$k, G, css$j, H, css$i, I, css$h, J, css$g, K, css$f, L, css$e, M, css$d, N, css$c, O, css$b, P, css$a, Pzwei, css$9, Q, css$8, R, css$7, S, css$6, T, css$5, U, css$4, V, css$3, W, css$2, X, css$1, Y, css2, Z, Page;
var init_page_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/cdl-protokolle/_page.svelte.js"() {
    init_ssr();
    init_chunks();
    init_Frame();
    init_bundle_mjs();
    Accordion = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["multiple", "flush", "activeClass", "inactiveClass", "defaultClass"]);
      let { multiple = false } = $$props;
      let { flush = false } = $$props;
      let { activeClass = "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800" } = $$props;
      let { inactiveClass = "text-gray-500 dark:text-gray-400 hover:bg-gray-100 hover:dark:bg-gray-800" } = $$props;
      let { defaultClass = "text-gray-500 dark:text-gray-400" } = $$props;
      const ctx = {
        flush,
        activeClass: twMerge(activeClass, $$props.classActive),
        inactiveClass: twMerge(inactiveClass, $$props.classInactive),
        selected: multiple ? void 0 : writable()
      };
      setContext("ctx", ctx);
      let frameClass;
      if ($$props.multiple === void 0 && $$bindings.multiple && multiple !== void 0)
        $$bindings.multiple(multiple);
      if ($$props.flush === void 0 && $$bindings.flush && flush !== void 0)
        $$bindings.flush(flush);
      if ($$props.activeClass === void 0 && $$bindings.activeClass && activeClass !== void 0)
        $$bindings.activeClass(activeClass);
      if ($$props.inactiveClass === void 0 && $$bindings.inactiveClass && inactiveClass !== void 0)
        $$bindings.inactiveClass(inactiveClass);
      if ($$props.defaultClass === void 0 && $$bindings.defaultClass && defaultClass !== void 0)
        $$bindings.defaultClass(defaultClass);
      frameClass = twMerge(defaultClass, $$props.class);
      return `${validate_component(Frame, "Frame").$$render($$result, Object.assign({}, $$restProps, { class: frameClass }, { color: "none" }), {}, {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      })} `;
    });
    AccordionItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let contentClass;
      let $$unsubscribe_selected;
      let { open = false } = $$props;
      let { activeClass = void 0 } = $$props;
      let { inactiveClass = void 0 } = $$props;
      let { defaultClass = "flex items-center justify-between w-full font-medium text-left group-first:rounded-t-xl border-gray-200 dark:border-gray-700" } = $$props;
      let { transitionType = "slide" } = $$props;
      let { transitionParams = {} } = $$props;
      let { paddingFlush = "py-5" } = $$props;
      let { paddingDefault = "p-5" } = $$props;
      let { textFlushOpen = "text-gray-900 dark:text-white" } = $$props;
      let { textFlushDefault = "text-gray-500 dark:text-gray-400" } = $$props;
      let { borderClass = "border-s border-e group-first:border-t" } = $$props;
      let { borderOpenClass = "border-s border-e" } = $$props;
      let { borderBottomClass = "border-b" } = $$props;
      let { borderSharedClass = "border-gray-200 dark:border-gray-700" } = $$props;
      let { classActive = void 0 } = $$props;
      let { classInactive = void 0 } = $$props;
      let activeCls = twMerge(activeClass, classActive);
      let inactiveCls = twMerge(inactiveClass, classInactive);
      const ctx = getContext("ctx") ?? {};
      const selected = ctx.selected ?? writable();
      $$unsubscribe_selected = subscribe(selected, (value) => value);
      open = false;
      let buttonClass;
      if ($$props.open === void 0 && $$bindings.open && open !== void 0)
        $$bindings.open(open);
      if ($$props.activeClass === void 0 && $$bindings.activeClass && activeClass !== void 0)
        $$bindings.activeClass(activeClass);
      if ($$props.inactiveClass === void 0 && $$bindings.inactiveClass && inactiveClass !== void 0)
        $$bindings.inactiveClass(inactiveClass);
      if ($$props.defaultClass === void 0 && $$bindings.defaultClass && defaultClass !== void 0)
        $$bindings.defaultClass(defaultClass);
      if ($$props.transitionType === void 0 && $$bindings.transitionType && transitionType !== void 0)
        $$bindings.transitionType(transitionType);
      if ($$props.transitionParams === void 0 && $$bindings.transitionParams && transitionParams !== void 0)
        $$bindings.transitionParams(transitionParams);
      if ($$props.paddingFlush === void 0 && $$bindings.paddingFlush && paddingFlush !== void 0)
        $$bindings.paddingFlush(paddingFlush);
      if ($$props.paddingDefault === void 0 && $$bindings.paddingDefault && paddingDefault !== void 0)
        $$bindings.paddingDefault(paddingDefault);
      if ($$props.textFlushOpen === void 0 && $$bindings.textFlushOpen && textFlushOpen !== void 0)
        $$bindings.textFlushOpen(textFlushOpen);
      if ($$props.textFlushDefault === void 0 && $$bindings.textFlushDefault && textFlushDefault !== void 0)
        $$bindings.textFlushDefault(textFlushDefault);
      if ($$props.borderClass === void 0 && $$bindings.borderClass && borderClass !== void 0)
        $$bindings.borderClass(borderClass);
      if ($$props.borderOpenClass === void 0 && $$bindings.borderOpenClass && borderOpenClass !== void 0)
        $$bindings.borderOpenClass(borderOpenClass);
      if ($$props.borderBottomClass === void 0 && $$bindings.borderBottomClass && borderBottomClass !== void 0)
        $$bindings.borderBottomClass(borderBottomClass);
      if ($$props.borderSharedClass === void 0 && $$bindings.borderSharedClass && borderSharedClass !== void 0)
        $$bindings.borderSharedClass(borderSharedClass);
      if ($$props.classActive === void 0 && $$bindings.classActive && classActive !== void 0)
        $$bindings.classActive(classActive);
      if ($$props.classInactive === void 0 && $$bindings.classInactive && classInactive !== void 0)
        $$bindings.classInactive(classInactive);
      buttonClass = twMerge([
        defaultClass,
        ctx.flush || borderClass,
        borderBottomClass,
        borderSharedClass,
        ctx.flush ? paddingFlush : paddingDefault,
        open && (ctx.flush ? textFlushOpen : activeCls || ctx.activeClass),
        !open && (ctx.flush ? textFlushDefault : inactiveCls || ctx.inactiveClass),
        $$props.class
      ]);
      contentClass = twMerge([
        ctx.flush ? paddingFlush : paddingDefault,
        ctx.flush ? "" : borderOpenClass,
        borderBottomClass,
        borderSharedClass
      ]);
      $$unsubscribe_selected();
      return `<h2 class="group"><button type="button"${add_attribute("class", buttonClass, 0)}${add_attribute("aria-expanded", open, 0)}>${slots.header ? slots.header({}) : ``} ${open ? `${slots.arrowup ? slots.arrowup({}) : ` <svg class="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"></path></svg> `}` : `${slots.arrowdown ? slots.arrowdown({}) : ` <svg class="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"></path></svg> `}`}</button></h2> ${open ? `<div><div${add_attribute("class", contentClass, 0)}>${slots.default ? slots.default({}) : ``}</div></div>` : `<div class="hidden"><div${add_attribute("class", contentClass, 0)}>${slots.default ? slots.default({}) : ``}</div></div>`} `;
    });
    telegram = "/_app/immutable/assets/telegram.DBFgt6jX.webp";
    Fraguns = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { link } = $$props;
      if ($$props.link === void 0 && $$bindings.link && link !== void 0)
        $$bindings.link(link);
      return `<div class="border-2 p-3 m-3 bg-teal-200">Hast du eine Frage zu diesem Protokoll. Klicke auf das Telegram Logo <a target="_blank"${add_attribute("href", link, 0)}><img${add_attribute("src", telegram, 0)} width="100" alt="Image"></a> um diese an unserer Telegram Community zu stellen. Nach dem Klick auf den Link \xF6ffnet dieses Protokoll in Telegram und du kannst deine Frage direkt an unsere hilfreichen Mitglieder stellen.</div>`;
    });
    css$r = {
      code: "div.svelte-1xqtbil{margin-top:1.25rem;margin-bottom:1.25rem\n}",
      map: null
    };
    A = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$r);
      return `<div class="svelte-1xqtbil" data-svelte-h="svelte-1fcdjur">Die erste Einnahme besteht aus drei aktivierten Tropfen (im Verh\xE4ltnis 1:1), zu denen man 200ml Wasser gibt. Am ersten Behandlungstag nehmen Sie diese vor dem Schlafen ein. Am zweiten Tag nehmen Sie eine Stunde nach dem Fr\xFChst\xFCck drei weitere aktivierte Tropfen mit 200ml Wasser ein und wiederum drei weitere aktivierte Tropfen mit 200ml Wasser vor dem Schlafengehen. Am dritten Tag nehmen Sie die zwei vorherigen Dosen nach dem Fr\xFChst\xFCck und vor dem Schlafengehen ein und f\xFCgen eine weitere Dosis eine Stunde nach dem Essen
    hinzu. Danach geht es mit den gleichen drei Dosen weiter, eine Stunde nach dem Fr\xFChst\xFCck, dem Essen und vor dem Schlafengehen, solange die Behandlung notwendig ist und bis Sie sich wieder erholt haben.</div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/8" }, {}, {})}`;
    });
    css$q = {
      code: "div.svelte-1xqtbil{margin-top:1.25rem;margin-bottom:1.25rem\n}",
      map: null
    };
    Ai = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$q);
      return `<div class="svelte-1xqtbil" data-svelte-h="svelte-1z0ip5e"><h2>AI Protokoll (Anti Impf Protokoll)</h2> <ul><li><a target="_blank" href="https://t.me/cdl_protokolle/14896">\u{1F449} Allgemeine Empfehlungen</a></li> <li><a target="_blank" href="https://t.me/cdl_protokolle/14898">\u{1F449} VOR der Impfung</a></li> <li><a target="_blank" href="https://t.me/cdl_protokolle/14903">\u{1F449} DIREKT NACH der Impfung</a></li> <li><a target="_blank" href="https://t.me/cdl_protokolle/14909">\u{1F449} T\xE4gliche Pflege 3-6 Monate NACH der Impfung</a></li> <li><a target="_blank" href="https://t.me/cdl_protokolle/14915">\u{1F449} Erg\xE4nzende Therapien</a></li> <li><a target="_blank" href="https://t.me/cdl_protokolle/14793">\u{1F449} AI Protokoll als PDF</a></li></ul></div> ${validate_component(Fraguns, "Fraguns").$$render(
        $$result,
        {
          link: "https://t.me/cdl_protokolle/14923"
        },
        {},
        {}
      )}`;
    });
    css$p = {
      code: "div.svelte-1xqtbil{margin-top:1.25rem;margin-bottom:1.25rem\n}",
      map: null
    };
    B = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$p);
      return `<div class="svelte-1xqtbil" data-svelte-h="svelte-15ur6hk"><div class="svelte-1xqtbil">Normalerweise f\xE4ngt man in den ersten 3 Tagen mit einer niedrigen Dosis von 6 aktivierten Tropfen t\xE4glich an, die man in eine Flasche mit 1 bis 1,5 Liter Wasser gibt. Danach erh\xF6ht man die Dosis auf 12 aktivierte Tropfen und gibt sie in eine Flasche mit 1 bis 1,5 Liter Wasser die n\xE4chsten 4 Tage lang. Anschlie\xDFend sind es 7 Tage lang bis zu 18 Tropfen t\xE4glich, die man in eine Flasche mit 1 bis 1,5 Liter Wasser gibt, und schlie\xDFlich weitere 7 Tage bis zu 24 Tropfen, die man in eine Flasche mit 1 bis 1,5 Liter Wasser gibt. Die t\xE4gliche Dosis muss immer im Laufe des Tages genommen und in 8 bis 12 Einnahmen aufgeteilt werden (man kann die Einteilung mit Strichen an der Flasche markieren).</div> <div class="svelte-1xqtbil">Es ist empfehlenswert, die t\xE4gliche Dosis am Morgen des jeweiligen Tages zu aktivieren, und sie in eine Flasche mit 1 bis 1,5 Liter Wasser zu geben. Anschlie\xDFend trinken Sie jede Stunde ein bisschen f\xFCr den Rest der Behandlung, die regul\xE4r 3 Wochen betr\xE4gt oder \xFCber die notwendige Behandlungszeit hinweg, bis Sie sich wieder gesund f\xFChlen. Das Ziel ist, auf eine angenehme Art eine Dosis von 3 aktivierten Tropfen pro Stunde \xFCber 8 Stunden lang einzunehmen und die Dosis langsam zu steigern.</div></div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/9" }, {}, {})}`;
    });
    css$o = {
      code: "div.svelte-1xqtbil{margin-top:1.25rem;margin-bottom:1.25rem\n}",
      map: null
    };
    C = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$o);
      return `<div class="svelte-1xqtbil" data-svelte-h="svelte-1uw88gp"><div class="svelte-1xqtbil">Das Protokoll 101 CDS wird f\xFCr die Behandlung der meisten Krankheiten, und auch f\xFCr eine allgemeine Reinigung von Giftstoffen und \u201CDetox\u201D, genutzt. Es handelt sich dabei auch um ein Entgiftungsverfahren, wahrscheinlich das wirksamste, das bekannt ist. Bis jetzt gibt es keine Probleme mit Nebenwirkungen oder unerw\xFCnschte Wechselwirkungen und es verursacht normalerweise keinen Durchfall. Wenn Sie andere Medikamente einnehmen, sollten Sie einen vern\xFCnftigen Zeitabschnitt von ein bis zwei Stunden einhalten, damit die Wirkung des CDS nicht verloren geht. Im Falle eines niedrigen Mineralspiegels kann man 1\u20444 Meerwasser hinzuf\xFCgen.</div> <ul><li>\u{1F449}Das Protokoll CDS 101 ist ein allgemeing\xFCltiges Protokoll, das f\xFCr die meisten Behandlungen geeignet und einfach auszuf\xFChren ist. Es beinhaltet praktisch keine unerw\xFCnschten Nebenwirkungen hat.</li> <li>\u{1F449}Das Protokoll 101 besteht aus der Einnahme von 1ml 0,3%igem CDS (=3000 ppm), das in Wasser verd\xFCnnt wird, einmal in der Stunde, 10 mal am Tag. (Daher wird es manchmal auch Protokoll 110 genannt.)</li> <li>\u{1F449}10ml CDS 3000ppm (oder 100ml CDS 300ppm) + 1 Liter Wasser pro Tag.</li></ul></div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/10" }, {}, {})}`;
    });
    css$n = {
      code: "div.svelte-1xqtbil{margin-top:1.25rem;margin-bottom:1.25rem\n}",
      map: null
    };
    D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$n);
      return `<div class="svelte-1xqtbil" data-svelte-h="svelte-sjvtuq"><div class="svelte-1xqtbil">Man f\xFCllt ein Spr\xFChger\xE4t mit 0,3 %igem CDS (3000ppm) und wendet es an der betroffenen Stelle an. Im Fall von Wunden, Verbrennungen und anderen Hautproblemen wird es direkt auf die Haut aufgetragen. Die L\xF6sung sollte kein Hitzeempfinden oder Brennen verursachen, sondern eher den Schmerz und die Blutung stillen. Man kann diesen Vorgang mehrmals am Tag wiederholen (bis zu einmal pro Stunde). An einigen empfindlichen Stellen, wie bei den Schleimh\xE4uten, kann es notwendig sein, die Konzentration mit ein bisschen Wasser zu reduzieren.</div> <div class="svelte-1xqtbil">Falls es doch vorkommen sollte, dass Sie ein Brennen oder Hitze versp\xFCren, wird empfohlen die Stelle mit Wasser abzuwaschen.</div></div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/12" }, {}, {})}`;
    });
    css$m = {
      code: "div.svelte-1xqtbil{margin-top:1.25rem;margin-bottom:1.25rem\n}",
      map: null
    };
    E = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$m);
      return `<div class="svelte-1xqtbil" data-svelte-h="svelte-1h0q4ua"><div class="svelte-1xqtbil">Eines der wirkungsvollsten Protokolle, abgesehen von der oralen Einnahme, ist das Einlaufprotokoll, da es die Aufnahme des Chlordioxids \xFCber die W\xE4nde des Dickdarms
	erm\xF6glicht. Diese bef\xF6rdern es \xFCber die Pfortader direkt zur Leber. Daher ist es f\xFCr alle Leberprobleme, chronische Krankheiten, Vergiftungen, Divertikulitis, Ausscheidung von
	Parasiten und sch\xE4dliche Darmschleime sehr passend.</div> <div class="svelte-1xqtbil">\u{1F4A7} Die Tropfen werden immer im Verh\xE4ltnis 1:1 aktiviert.<br>
	\u{1F4A7}  10 aktivierte Tropfen CD pro Liter lauem Wasser oder als Alternative 10ml CDS pro Liter lauem Wasser. <br></div> <div class="svelte-1xqtbil">Dieses Protokoll ist grundlegend f\xFCr chronische Lebererkrankungen, Parasitose, Autismus und andere Magen-Darm-Krankheiten.</div> <div class="svelte-1xqtbil">Je nach Krankheitsgrad und Verfassung des Patienten wird es normalerweise bis zu einmal am Tag, am besten abends vor dem Schlafengehen durchgef\xFChrt. Als Faustregel gilt, es alle zwei oder drei Tage f\xFCr ein oder zwei Wochen anzuwenden. Es gibt Berichte von Personen, die dieses Protokoll bis zu zweimal am Tag f\xFCr eine l\xE4ngere Zeit bei schweren Krankheiten verwendet haben, ohne dass sie in den meisten F\xE4llen negative Nebenwirkungen erfahren haben. Die Anwendung muss immer individuell auf die zu behandelnde Person zugeschnitten werden.</div> <div class="svelte-1xqtbil">Die beste Position ist es, sich auf die linke Seite zu legen, um das Eindringen des Wassers zu erleichtern. Wenn sich die Klappe \xF6ffnet, f\xFCllt sich der Dickdarm. Es ist m\xF6glich, das in
	mehreren kleinen Serien oder auch auf einmal abzuwickeln, je nach der Verfassung und dem Wohlbefinden der Person. Eine leichte Massage des Unterleibs beg\xFCnstigt den Prozess.</div> <div class="svelte-1xqtbil">Man sollte versuchen, die Fl\xFCssigkeit vor dem Entleeren 3 Minuten lang ein zu behalten, um die Wirkung zu erh\xF6hen. Mehr als f\xFCnf Minuten sind nicht notwendig. Man kann auch
	Meerwasser beigeben: 1 Teil Meerwasser + 3 Teile S\xFC\xDFwasser.F\xFCr viele Leute hat sich das System YOGUI als sehr hilfreich herausgestellt:</div> <ul><li>\u{1F4A7} 3 N\xE4chte hintereinander</li> <li>\u{1F4A7} 3 N\xE4chte: abwechselnd anwenden und pausieren</li> <li>\u{1F4A7} 3 N\xE4chte: alle 3 Tage</li> <li>\u{1F4A7} 3 N\xE4chte, einmal pro Woche</li></ul> <div class="svelte-1xqtbil">Verwenden Sie 10 Tropfen aktiviertes CD (oder 10ml CDS f\xFCr empfindliche F\xE4lle) pro Liter lauem Wasser (K\xF6rpertemperatur). Darmirrigatoren fassen normalerweise ungef\xE4hr 2 Liter.
	Man f\xFCllt den Irrigator mit Wasser und bereitet die Tropfen in einem separaten Glas vor. Nach der Aktivierung mischt man sie mit dem Wasser des Irrigators. Auf die Spitze tr\xE4gt man ein bisschen Vaseline oder Creme auf, w\xE4hrend man ihn in den After einf\xFChrt.</div></div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/14" }, {}, {})}`;
    });
    css$l = {
      code: "div.svelte-1xqtbil{margin-top:1.25rem;margin-bottom:1.25rem\n}",
      map: null
    };
    F = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$l);
      return `<div class="svelte-1xqtbil" data-svelte-h="svelte-16p3gpx">1 Dosis: 1ml CDS alle 15 Minuten 1 Stunde und 45 Minuten lang mit acht Einnahmen = 8ml CDS in einem Liter Wasser. Man kann 8ml 0,3 %iges CDS in eine Flasche mit einem Liter Wasser (destilliertes oder Mineralwasser) geben, die Flasche in 8 gleiche Teile einteilen und diese mit Linien markieren, um alle f\xFCnfzehn Minuten bis zu einer Markierung zu trinken.</div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/15" }, {}, {})}`;
    });
    css$k = {
      code: "div.svelte-a0cypm{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-a0cypm{font-weight:500;--tw-text-opacity:1;color:rgb(37 99 235 / var(--tw-text-opacity))\n}a.svelte-a0cypm:hover{text-decoration-line:underline\n}@media(prefers-color-scheme: dark){a.svelte-a0cypm{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n    }}",
      map: null
    };
    G = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$k);
      return `<div class="svelte-a0cypm" data-svelte-h="svelte-1mxaq1k">Dieses Protokoll kann man auf verschiedene Arten f\xFCr gro\xDFe und kleine Fl\xE4chen benutzen:

	<div class="svelte-a0cypm">\u{1F449} <a class="link svelte-a0cypm" href="https://t.me/cdl_protokolle/19">1. Gasprotokoll</a> bei einer kleinen Fl\xE4che: Man kann die Substanz in einem Glas aktivieren, um kleine Fl\xE4chen zu behandeln oder Teile des K\xF6rpers zu desinfizieren.</div> <div class="svelte-a0cypm">\u{1F449} <a href="https://t.me/cdl_protokolle/20" class="svelte-a0cypm">2. Sackprotokoll</a> bei gro\xDFen Fl\xE4chen: Man kann es in einem Gef\xE4\xDF in einem gro\xDFen Sack aktivieren, um gro\xDFe Hautfl\xE4chen oder sogar den ganzen K\xF6rper zu behandeln.</div></div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/16" }, {}, {})}`;
    });
    css$j = {
      code: "div.svelte-1xqtbil{margin-top:1.25rem;margin-bottom:1.25rem\n}",
      map: null
    };
    H = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$j);
      return `<div class="svelte-1xqtbil" data-svelte-h="svelte-11j2bva">Das Hausprotokoll zur Verhinderung von Ansteckung und Lungenleiden: Man aktiviert 6-12 Tropfen, je nach der Gr\xF6\xDFe des Zimmers zu Hause, in einem trockenen Glas ohne Wasser und stellt es ins Schlafzimmer, wo es langsam verdampft. Seine Wirkung ist sehr hilfreich gegen Ansteckungen des Partners, wenn dieser neben Ihnen schl\xE4ft oder mehr als 1 Kind im gleichen Zimmer schl\xE4ft. Stellen Sie das CD in 2 Metern Entfernung zur kranken Person auf. Je hei\xDFer es im Zimmer ist, umso schneller verdampft es. Wenn man die Verdampfung verlangsamen m\xF6chte, kann man einen Essl\xF6ffel Wasser zur Mischung geben.</div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "" }, {}, {})}`;
    });
    css$i = {
      code: "div.svelte-a0cypm{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-a0cypm{font-weight:500;--tw-text-opacity:1;color:rgb(37 99 235 / var(--tw-text-opacity))\n}a.svelte-a0cypm:hover{text-decoration-line:underline\n}@media(prefers-color-scheme: dark){a.svelte-a0cypm{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n    }}",
      map: null
    };
    I = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$i);
      return `<div class="svelte-a0cypm" data-svelte-h="svelte-jsjowu">Dieses Protokoll hat der Autor Andreas Kalcker leider nicht f\xFCr die Online Publikation freigegeben. 
Sie finden dieses und viele andere wertvolle Informationen in seinem Buch <a href="/buecher/4" class="svelte-a0cypm">\u{1F4D5} Gesundheit verboten</a>. 

</div>`;
    });
    css$h = {
      code: "div.svelte-1xqtbil{margin-top:1.25rem;margin-bottom:1.25rem\n}",
      map: null
    };
    J = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$h);
      return `<div class="svelte-1xqtbil" data-svelte-h="svelte-wa9yrh">Dosis: 10ml CDS in einem Glas mit 200ml Wasser. Sp\xFClen Sie anfangs den Mund aus und gurgeln Sie 3 Minuten lang 3- bis 4-mal am Tag, sp\xE4ter nur einmal am Tag. Eine
    Vorgehensweise ist, mit der Zahnb\xFCrste die Z\xE4hne zu putzen und das Zahnfleisch zu massieren. Bei tiefen Entz\xFCndungen gibt man 1ml DMSO (siehe weiter unten) in die Mischung.
    Zum Schluss ist es wichtig den Mund mit Wasser auszusp\xFClen.</div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/22" }, {}, {})}`;
    });
    css$g = {
      code: "div.svelte-1bhw60t{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-1bhw60t{font-weight:500;--tw-text-opacity:1;color:rgb(37 99 235 / var(--tw-text-opacity))\n}a.svelte-1bhw60t:hover{text-decoration-line:underline\n}@media(prefers-color-scheme: dark){a.svelte-1bhw60t{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n    }}",
      map: null
    };
    K = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$g);
      return `<div class="svelte-1bhw60t" data-svelte-h="svelte-11nyutj"><div class="svelte-1bhw60t">Anwendungsprotokoll: Bei fast allen Hautkrankheiten wie Akne, Schuppenflechte, Ausschlag, Fu\xDFpilz, Wunden usw., wendet man aktiviertes CD normalerweise direkt auf der Haut an und anschlie\xDFend <a href="https://bit.ly/3zwb7Gp" class="svelte-1bhw60t">\u{1F449} DMSO</a>  st\xFCndlich bis zu 10-mal am Tag. Hierzu mischt man 20 Tropfen aktiviertes CD mit 50ml Wasser in einer Spr\xFChflasche. Diese stabilen L\xF6sungen halten mehrere Tage, bis zu einer Woche und l\xE4nger, wenn man sie k\xFChl und im Dunkeln aufbewahrt, in Kristallbeh\xE4ltern sogar Monate. Anschlie\xDFend werden drei Teel\xF6ffel DMSO + ein Teel\xF6ffel Wasser in ein kleines Glas gegeben. Es sollten keine ABS- oder PET-Plastikflaschen oder Gummihandschuhe verwendet werden, da sich diese durch das DMSO aufl\xF6sen k\xF6nnten und so \xFCber die Haut aufgenommen werden! PE- oder HDPE-Flaschen sind richtig. CD wird bis zu maximal 10-mal am Tag angewendet. Man spr\xFCht es dazu auf die Haut und reibt das verd\xFCnnte DMSO danach mit der Hand ein. Bei einer weitl\xE4ufigeren Behandlung wechselt man jede Stunde den Teil der Haut, der behandelt wird. Dieser Vorgang wird 3 Tage die Woche durchgef\xFChrt und anschlie\xDFend gibt man der Haut 4 Tage, um sich zu regenerieren. Sollte die Haut \xFCberm\xE4\xDFig aus-trocknen, muss man die L\xF6sungen st\xE4rker verd\xFCnnen oder die Haut mit Aloe Vera oder nativem Oliven\xF6l einreiben, um sie zu beruhigen. Sollte die Haut zu trocken sein und ein Ausschlag auftreten, reduzieren Sie die Dosis oder unterbrechen Sie die Behandlung.</div> <div class="svelte-1bhw60t">DMSO sollte auf keinen Fall in Flaschen mit einer Gummiaufsatz aufbewahrt werden, da es diesen aufl\xF6st und die L\xF6sung verunreinigt.</div> <div class="svelte-1bhw60t">Man benutzt es nicht f\xFCr Einl\xE4ufe, da ansonsten die vorhandenen Giftstoffe im Darm reabsorbiert w\xFCrden.</div></div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/23" }, {}, {})}`;
    });
    css$f = {
      code: "div.svelte-1xqtbil{margin-top:1.25rem;margin-bottom:1.25rem\n}",
      map: null
    };
    L = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$f);
      return `<div class="svelte-1xqtbil" data-svelte-h="svelte-r3jn81">Vorgehensweise:
    
    <div class="svelte-1xqtbil">1. Die Badewanne gut putzen. Man darf keine Seife oder andere chemische Produkte in das Wasser geben.</div> <div class="svelte-1xqtbil">2. 30-60 Tropfen CD mit 4 %igem HCl Aktivator in einem Glas aktivieren, je nachdem, wie viel Wasser man benutzt. Je mehr Wasser, umso mehr Chlordioxid.</div> <div class="svelte-1xqtbil">3. Die Badewanne mit Wasser in K\xF6rpertemperatur f\xFCllen. Weder Seife, Parf\xFCm, Shampoo noch Kinderspielzeuge hinzugeben und f\xFCr eine gute Bel\xFCftung des Badezimmers sorgen.</div> <div class="svelte-1xqtbil">4. Das aktivierte CD in die Wanne geben und mischen, damit es sich gut verteilt. Die Menge des Wassers verringert nicht die Menge des ClO2 Gases, das freigesetzt wird.</div> <div class="svelte-1xqtbil">5. Beim Bad wird der ganze K\xF6rper befeuchtet, einschlie\xDFlich des Kopfes und der Kopfhaut. Man braucht sich keine Sorgen zu machen, falls Wasser in die Augen kommt, da CD in dieser verd\xFCnnten Dosis nicht sch\xE4dlich ist.</div> <div class="svelte-1xqtbil">6. Anschlie\xDFend kann man mehr warmes Wasser hinzuf\xFCgen, da die W\xE4rme die Poren \xF6ffnet und der Organismus aufnahmef\xE4higer wird.</div></div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/24" }, {}, {})}`;
    });
    css$e = {
      code: "div.svelte-1xrz5wz{margin-top:1.25rem;margin-bottom:1.25rem\n}li.svelte-1xrz5wz{list-style-type:none\n}",
      map: null
    };
    M = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$e);
      return `<div class="svelte-1xrz5wz" data-svelte-h="svelte-110c3gd">Anleitung: 

    <div class="svelte-1xrz5wz">Die Vorgehensweise bei akuter Malaria bei Erwachsenen besteht darin, lediglich zwei hohe Dosen mit je 15 Tropfen aktiviertem CD mit ein bis zwei Stunden Abstand zu
        nehmen. Die meisten Symptome sollten etwa drei Stunden nach der zweiten Dosis verschwunden sein. Falls die Symptome anhalten, werden danach 3 Tropfen pro Stunde
        angewendet. Bei \xDCbelkeit wird die Dosis reduziert. Die Be-handlung wird mit nicht mehr als 3 Tropfen pro Stunde fortgesetzt. Bei Kindern nimmt man bis zu einem Tropfen je 4 Kilo
        K\xF6rpergewicht. Falls der erwachsene Patient sehr geschw\xE4cht ist, kann man auch ein alternatives, weiterentwickeltes Protokoll anwenden:</div> <ul></ul> <li class="svelte-1xrz5wz">\u{1F4A7}8 Tropfen MMS bei der ersten Einnahme</li> <li class="svelte-1xrz5wz">\u{1F4A7}5 Tropfen MMS in der zweiten Stunde</li> <li class="svelte-1xrz5wz">\u{1F4A7}5 Tropfen MMS in der vierten Stunde</li> <li class="svelte-1xrz5wz">\u{1F4A7}6 Tropfen MMS in der sechsten Stunde</li> <li class="svelte-1xrz5wz">\u{1F4A7}8 Tropfen MMS in der achten Stunden</li> <li class="svelte-1xrz5wz">\u{1F4A7}8 Tropfen MMS zum Schlafengehen</li> <div class="svelte-1xrz5wz">Am Tag insgesamt: 40 Tropfen. Falls der Patient nach dieser Anwendung immer noch krank ist, liegt es nicht an Malaria, sondern an einer anderen Krankheit. Denguefieber wird oft mit Malaria verwechselt, da auch dies von Moskitos \xFCbertragen wird. W\xE4hrend es sich bei Malaria jedoch um einen Parasiten handelt, ist die Ursache von Dengue ein Virus und das passende Protokoll ist das Protokoll F (Das h\xE4ufige Protokoll, das alte CDS 115.)</div></div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "" }, {}, {})}`;
    });
    css$d = {
      code: "div.svelte-1xqtbil{margin-top:1.25rem;margin-bottom:1.25rem\n}",
      map: null
    };
    N = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$d);
      return `<div class="svelte-1xqtbil" data-svelte-h="svelte-mco4lj"><div class="svelte-1xqtbil"><ul><li>\u{1F4A7}Das Protokoll \u201EWie Kinder und Jugendliche\u201C basiert auf Erfahrungen und Zeugenberichten vieler M\xFCtter.</li> <li>\u{1F4A7}CDS wird normalmalerweise besser vertragen und man benutzt 1ml pro Jahr des Kindes 0,3 %iges CDS (3000ppm) auf 1Liter Wasser am Auf den Tag auf 6 -10 Dosen verteilt .</li> <li>\u{1F4A7}Bevor wir mit irgendeinem Protokoll anfangen, \xFCberpr\xFCfen wir zun\xE4chst die Kompatibilit\xE4t, um Nebenwirkungen zu vermeiden.</li> <li>\u{1F4A7}Die Tropfen werden immer im Verh\xE4ltnis 1:1 aktiviert, indem man 100 bis 200ml Wasser hinzugibt.</li> <li>\u{1F4A7}Man muss das Verhalten des Minderj\xE4hrigen im Auge behalten, falls M\xFCdigkeit, \xDCbelkeit, Bauchschmerzen, Erbrechen usw. auftreten, damit die Dosis nach Bedarf angepasst werden kann.</li> <li>\u{1F4A7}Man kann die L\xF6sung mit Reismilch mischen.</li> <li>\u{1F4A7}Normalerweise gilt, dass es am besten ist, keinerlei Medikamente oder Behandlungen bis zum ersten Lebensjahr zuzulassen, wenn diese nicht zwingend n\xF6tig sind.</li> <li>\u{1F4A7}Antioxidationsmittel und Vitamin C vermeiden.</li> <li>\u{1F4A7}Die Produkte m\xFCssen f\xFCr Kinder unzug\xE4nglich aufbewahrt werden.</li> <li>\u{1F4A7}Beh\xE4lter mit Schraubverschl\xFCssen mit Kindersicherung sind zu bevorzugen.</li></ul></div> <div class="svelte-1xqtbil">Anleitung von aktivierten CD Tropfen:
    <ul><li>K\xF6rpergewicht von 5 Kilo \u2013 3 Tropfen am Tag auf 10 Einnahmen verteilt.</li> <li>K\xF6rpergewicht von 15 Kilo \u2013 6 Tropfen am Tag auf 10 Einnahmen verteilt.</li> <li>K\xF6rpergewicht von 30 Kilo \u2013 8 Tropfen am Tag auf 10 Einnahmen verteilt.</li> <li>K\xF6rpergewicht von 40 Kilo \u2013 12 Tropfen am Tag auf 10 Einnahmen verteilt.</li> <li>K\xF6rpergewicht von 60 Kilo \u2013 Erwachsenendosis</li></ul></div></div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/26" }, {}, {})}`;
    });
    css$c = {
      code: "div.svelte-1xqtbil{margin-top:1.25rem;margin-bottom:1.25rem\n}",
      map: null
    };
    O = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$c);
      return `<div class="svelte-1xqtbil" data-svelte-h="svelte-1mbc650">Anleitung: <br><br> <ul><li>\u{1F4A7}50ml isotonische Kochsalzl\xF6sung</li> <li>\u{1F4A7}5ml CDS</li> <li>\u{1F4A7}3ml DMSO</li></ul> <div class="svelte-1xqtbil">Man wendet alle zwei Stunden 5 Tropfen im betroffenen Auge an.</div></div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/27" }, {}, {})}`;
    });
    css$b = {
      code: "div.svelte-12kvwf5{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-12kvwf5{font-weight:500;--tw-text-opacity:1;color:rgb(37 99 235 / var(--tw-text-opacity))\n}a.svelte-12kvwf5:hover{text-decoration-line:underline\n}@media(prefers-color-scheme: dark){a.svelte-12kvwf5{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n    }}",
      map: null
    };
    P = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$b);
      return `<div class="svelte-12kvwf5" data-svelte-h="svelte-9hzc2v"><div class="svelte-12kvwf5">Behandlung:</div> <div class="svelte-12kvwf5">Hinweis: Diese Behandlung verwendet keine systemischen Medikamente gegen Parasiten, die vom K\xF6rper aufgenommen werden. Hierf\xFCr ist ein hochkar\xE4tiger Zapper wie der Biotrohn\xAE besser, da er die Parasiten im Blut ohne Vergiftungen beseitigt. Dieses Protokoll wurde entwickelt, um auch bei Kindern aufgrund der Dauer und Dosis Anwendung zu finden, ohne eine \xFCberm\xE4\xDFige toxische Ladung im Blut oder im K\xF6rper zu verursachen. Man darf Mebendazol nicht mit Albendazol (Albenza) verwechseln, da dieses sehr wohl systemisch eingesetzt wird und eine \xE4rztliche Verschreibung ben\xF6tigt. Wenn Sie von einem eindeutigen Parasitenbefall im Blut ausgehen, sollten Sie das zur Best\xE4tigung mit einem Arzt besprechen, und nur dann die systemischen Anti-Parasitenmittel anwenden, die \u2013 je nach Einsch\xE4tzung des Arztes \u2013 vom Blut aufgenommen werden w\xFCrden.</div> <div class="svelte-12kvwf5"><div class="svelte-12kvwf5">Tag 1</div> <ul><li>\u{1F4A7}Pyrantel-Pamoat (eine einzige Dosis morgens) 10mg/kg, die in einer einzigen Einnahme mit irgendeiner Fl\xFCssigkeit verabreicht wird. Falls es in fl\xFCssiger Form vorhanden ist, enth\xE4lt ein Teel\xF6ffel mit 5ml 250mg (f\xFCr 60kg 3 Teel\xF6ffel mit 5ml). In Form von Pillen nimmt man 3 bei 60kg.</li> <li>\u{1F4A7}Kieselalgenerde (zwei Dosen): Ein Teel\xF6ffel zweimal am Tag mit dem Essen, am besten fl\xFCssig. Morgens und nachmittags.</li></ul></div> <div class="svelte-12kvwf5"><p>Tag 2</p> <ul><li>\u{1F4A7}Mebendazol (zwei Dosen) 100mg alle 12 Stunden. Eine Pille morgens und eine abends.</li> <li>\u{1F4A7}Kieselalgenerde (zwei Dosen): Ein Teel\xF6ffel zweimal am Tag mit dem Essen, am besten fl\xFCssig. Morgens und nachmittags.</li> <li>\u{1F4A7}Einlauf: Zus\xE4tzliche Ausstattung erforderlich (2 Liter Einlauf)</li></ul></div> <div class="svelte-12kvwf5"><p>Tag 3</p> <ul><li>\u{1F4A7} <a href="https://www.kopp-verlag.de/a/kopp-vital-rizinusoel-nativ-ph.-eur.-250-ml-3?&6=28189485&otpcytokenid=28189485" class="svelte-12kvwf5">\u{1F449} Rizinus\xF6l</a>, 2 Suppenl\xF6ffel (geschmacklos aus der Apotheke) auf n\xFCchternen Magen.</li> <li>\u{1F4A7}Mebendazol (2 Dosen) 100mg alle 12 Stunden. Eine Pille morgens und eine abends.</li> <li>\u{1F4A7}Kieselalgenerde (zwei Dosen): Ein Teel\xF6ffel zweimal am Tag mit dem Essen, am besten fl\xFCssig morgens und nachmittags.</li> <li>\u{1F4A7}Einlauf.</li></ul></div> <div class="svelte-12kvwf5"><p>Tag 4</p> <ul><li>\u{1F4A7}Mebendazol (zwei Dosen) 100mg alle 12 Stunden. Eine Pille morgens und eine abends.</li> <li>\u{1F4A7}Kieselalgenerde (2 Dosen): Ein Teel\xF6ffel zweimal am Tag mit dem Essen, am besten fl\xFCssig morgens und nachmittags.</li> <li>\u{1F4A7}Einlauf.</li></ul></div> <div class="svelte-12kvwf5"><p>Tag 5</p> <ul><li>\u{1F4A7}Pyrantel-Pamoat (eine einzige Dosis) 10mg/kg, die in einer einzigen Einnahme mit irgendeiner Fl\xFCssigkeit verabreicht wird. Falls es in fl\xFCssiger Form vorhanden ist, enth\xE4lt ein Teel\xF6ffel mit 5ml 250mgr (f\xFCr 60kg 3 Teel\xF6ffel mit 5ml). In Form von Pillen nimmt man 3 bei 60kg.</li> <li>\u{1F4A7}Kieselalgenerde (2 Dosen): Ein Teel\xF6ffel zweimal am Tag mit dem Essen, am besten fl\xFCssig morgens und nachmittags.</li> <li>\u{1F4A7}Einlauf</li></ul></div> <div class="svelte-12kvwf5"><p>Tag 6</p> <ul><li>\u{1F4A7} <a href="https://www.kopp-verlag.de/a/kopp-vital-rizinusoel-nativ-ph.-eur.-250-ml-3?&6=28189485&otpcytokenid=28189485" class="svelte-12kvwf5">\u{1F449} Rizinus\xF6l</a>, 2 Suppenl\xF6ffel (geschmacklos aus der Apotheke) auf n\xFCchternen Magen.</li> <li>\u{1F4A7}Mebendazol (2 Dosen) 100mg alle 12 Stunden. Eine Pille morgens und eine abends.</li> <li>\u{1F4A7}Kieselalgenerde (zwei Dosen): Ein Teel\xF6ffel zweimal am Tag mit dem Essen, am besten fl\xFCssig morgens und nachmittags.</li> <li>\u{1F4A7}Einlauf.</li></ul></div> <div class="svelte-12kvwf5"><p>Tag 7</p> <ul><li>\u{1F4A7}Mebendazol 100mg alle 12 Stunden. Eine Pille morgens und eine abends.</li> <li>\u{1F4A7}Kieselalgenerde: Ein Teel\xF6ffel zweimal am Tag mit dem Essen, am besten fl\xFCssig morgens und nachmittags.</li> <li>\u{1F4A7}Einlauf.</li></ul></div> <div class="svelte-12kvwf5"><p>Tag 8</p> <ul><li>\u{1F4A7}Mebendazol 100mg alle 12 Stunden. Eine Pille morgens und eine abends.</li> <li>\u{1F4A7}Kieselalgenerde: Ein Teel\xF6ffel zweimal am Tag mit dem Essen, am besten fl\xFCssig morgens und nachmittags.</li> <li>\u{1F4A7}Einlauf.</li></ul></div> <div class="svelte-12kvwf5"><p>Tag 9 bis 18 (Erster Monat)</p> <ul><li>\u{1F4A7} <a href="https://www.kopp-verlag.de/a/kopp-vital-rizinusoel-nativ-ph.-eur.-250-ml-3?&6=28189485&otpcytokenid=28189485" class="svelte-12kvwf5">\u{1F449} Rizinus\xF6l</a>, 2 Suppenl\xF6ffel (geschmacklos aus der Apotheke) auf n\xFCchternen Magen.  Je nach Bedarf der einzelnen Person wiederholen. Bei ununterbrochenem Durchfall auslassen.</li> <li>\u{1F4A7}Kieselalgenerde: Ein Teel\xF6ffel zweimal am Tag mit dem Essen, am besten fl\xFCssig morgens und nachmittags.</li> <li>\u{1F4A7}Niemaufguss (Azadirachta Indica) (9 Tage). 3 gestrichene Teel\xF6ffel in einem Liter Wasser. 5 Minuten lang kochen und den ganzen Tag \xFCber trinken. Sie k\xF6nnen auch Niemkapseln benutzen, da der Aufguss sehr bitter ist.</li> <li>\u{1F4A7}Einl\xE4ufe so ununterbrochen wie m\xF6glich</li></ul></div></div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/28" }, {}, {})}`;
    });
    css$a = {
      code: "div.svelte-12kvwf5{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-12kvwf5{font-weight:500;--tw-text-opacity:1;color:rgb(37 99 235 / var(--tw-text-opacity))\n}a.svelte-12kvwf5:hover{text-decoration-line:underline\n}@media(prefers-color-scheme: dark){a.svelte-12kvwf5{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n    }}",
      map: null
    };
    Pzwei = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$a);
      return `<div class="svelte-12kvwf5" data-svelte-h="svelte-1lvkqrx"><div class="svelte-12kvwf5">Tag 9 bis 18 (Zweiter Monat)</div> <div class="svelte-12kvwf5"><ul><li>\u{1F4A7} <a href="https://www.kopp-verlag.de/a/kopp-vital-rizinusoel-nativ-ph.-eur.-250-ml-3?&6=28189485&otpcytokenid=28189485" class="svelte-12kvwf5">\u{1F449} Rizinus\xF6l</a> , 2 Suppenl\xF6ffel (geschmacklos aus der Apotheke) auf n\xFCchternen Magen.</li> <li>\u{1F4A7}Je nach Bedarf der einzelnen Person wiederholen. Bei ununterbrochenem Durchfall auslassen.</li> <li>\u{1F4A7}Kieselalgenerde: Ein Teel\xF6ffel zweimal am Tag mit dem Essen, am besten fl\xFCssig morgens und nachmittags.</li> <li>\u{1F4A7}Epazotenaufguss (Dysphania ambrosioides/Mexikanischer Dr\xFCseng\xE4nsfu\xDF) (3 Tage). 1 oder 2 Essl\xF6ffel der Bl\xE4tter in einem Liter Wasser 10 Minuten lang kochen, ziehen lassen und filtern. 1 Tasse auf n\xFCchternen Magen 3 aufeinander folgende Tage lang trinken.</li> <li>\u{1F4A7}Die restlichen Tage Aloe Vera Gel mit Saft oder Wasser auf n\xFCchternen Magen trinken.</li> <li>\u{1F4A7}Einl\xE4ufe so ununterbrochen wie m\xF6glich.</li></ul></div> <div class="svelte-12kvwf5"><div class="svelte-12kvwf5">Tag 9 bis 18 (Dritter Monat)</div> <ul><li>\u{1F4A7}<a href="https://www.kopp-verlag.de/a/kopp-vital-rizinusoel-nativ-ph.-eur.-250-ml-3?&6=28189485&otpcytokenid=28189485" class="svelte-12kvwf5">\u{1F449} Rizinus\xF6l</a>, 2 Suppenl\xF6ffel (geschmacklos aus der Apotheke) auf n\xFCchternen Magen. Je nach Bedarf der einzelnen Person wiederholen. Bei ununterbro-chenem Durchfall auslassen.</li> <li>\u{1F4A7}Kieselalgenerde: Ein Teel\xF6ffel zweimal am Tag mit dem Essen, am besten fl\xFCssig morgens und nachmittags.</li> <li>\u{1F4A7}Niemaufguss. 9 Tage lang oder ein alternativer Anti-Parasitentee.</li> <li>\u{1F4A7}Einl\xE4ufe so ununterbrochen wie m\xF6glich.</li> <li>\u{1F4A7}Falls nach dem dritten Monat immer noch Parasiten oder gro\xDFe Mengen an Schleim ausgeschieden werden, kann man mit dem Protokoll fortfahren und nochmal bei Monat 2 anfangen.</li></ul></div> <div class="svelte-12kvwf5"><p>\u2757\uFE0FBeachten Sie folgende Hinweise:</p> <p class="m-5">Mebendazol (Vermox) zeigt keine Wechselwirkungen mit Chlordioxid, aber wohl mit den folgenden Arzneimitteln:</p> <ul class="list-disc mt-5 ml-20"><li>Tagamet (Cimetidin)</li> <li>Ethotoin</li> <li>Penizillin</li> <li>Zithromax (Azithromycin)</li> <li>Amoxicillin</li> <li>Mephenytoin</li> <li>Carbamazepin</li> <li>Flagyl (Metronidazol)</li></ul></div></div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/30" }, {}, {})}`;
    });
    css$9 = {
      code: "div.svelte-1xqtbil{margin-top:1.25rem;margin-bottom:1.25rem\n}",
      map: null
    };
    Q = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$9);
      return `<div class="svelte-1xqtbil" data-svelte-h="svelte-1huka7c"><div class="svelte-1xqtbil">Protokoll Q: Wie Quaddel, Brandwunden, Verbrennungen und Sonnenbrand</div> <div class="svelte-1xqtbil">Anleitung mit Chlordioxid: Es gibt zwei Behandlungsm\xF6glichkeiten: Wenn es sich um schwere Verbrennungen handelt, wendet man am besten 0,3 %iges CD (3000 ppm) direkt inForm von Spray auf der Verbrennung an. Normalerweise sp\xFCrt man schon durch diese Anwendung sofortige Linderung. Man kann auch ein Tuch in CDS tr\xE4nken und es auf der
    betroffenen Stelle liegen lassen. Der Vorteil hierbei ist, dass man diesen Vorgang mehrmals wiederholen kann und es nicht erforderlich ist, sich danach zu waschen, da die Substanz
    keine chemische Verbrennung durch den pH-Wert ausl\xF6st.</div></div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/31" }, {}, {})}`;
    });
    css$8 = {
      code: "div.svelte-1xqtbil{margin-top:1.25rem;margin-bottom:1.25rem\n}",
      map: null
    };
    R = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$8);
      return `<div class="svelte-1xqtbil" data-svelte-h="svelte-1bf0iai"><div class="svelte-1xqtbil">Protokoll R: Wie Rektal</div> <p>Anleitung: Man aktiviert 6 Tropfen CD in einem Wasserglas und gibt 150ml Wasser mit K\xF6rpertemperatur hinzu. Mit eine Birnspritze saugt man es auf, entfernt die Luft im Inneren
        und tr\xE4gt Vaseline oder ein Gleitmittel an der Spitze auf. Anschlie\xDFend f\xFChrt man sie in den After ein und leert die Spritze ganz. Die Fl\xFCssigkeit sollte ungef\xE4hr 3 Minuten einbehalten
        werden, bevor sie ausgeschieden wird.</p></div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/32" }, {}, {})}`;
    });
    css$7 = {
      code: "div.svelte-1xqtbil{margin-top:1.25rem;margin-bottom:1.25rem\n}",
      map: null
    };
    S = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$7);
      return `<div class="svelte-1xqtbil" data-svelte-h="svelte-fwi7u9"><h2>Protokoll S: Wie Sensibel, leichte Dosierungen nach und nach</h2> <p>Anleitung: Hierzu nimmt man 1ml CDS auf 500ml Wasser auf den ersten Tag verteilt. Am zweiten Tag nimmt man 2ml CDS in 1 Liter Wasser. Sollte es keine Zwischenf\xE4lle geben (und
        normalerweise ist das auch nicht der Fall), kann man die Dosis von hieran jeden Tag auf 1ml zus\xE4tzlich pro Liter erh\xF6hen, bis man 10ml CDS pro Liter Wasser erreicht hat.</p></div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/33" }, {}, {})}`;
    });
    css$6 = {
      code: "div.svelte-a0cypm{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-a0cypm{font-weight:500;--tw-text-opacity:1;color:rgb(37 99 235 / var(--tw-text-opacity))\n}a.svelte-a0cypm:hover{text-decoration-line:underline\n}@media(prefers-color-scheme: dark){a.svelte-a0cypm{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n    }}",
      map: null
    };
    T = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$6);
      return `<div class="svelte-a0cypm" data-svelte-h="svelte-jsjowu">Dieses Protokoll hat der Autor Andreas Kalcker leider nicht f\xFCr die Online Publikation freigegeben. 
Sie finden dieses und viele andere wertvolle Informationen in seinem Buch <a href="/buecher/4" class="svelte-a0cypm">\u{1F4D5} Gesundheit verboten</a>. 

</div>`;
    });
    css$5 = {
      code: "div.svelte-a0cypm{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-a0cypm{font-weight:500;--tw-text-opacity:1;color:rgb(37 99 235 / var(--tw-text-opacity))\n}a.svelte-a0cypm:hover{text-decoration-line:underline\n}@media(prefers-color-scheme: dark){a.svelte-a0cypm{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n    }}",
      map: null
    };
    U = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$5);
      return `<div class="svelte-a0cypm" data-svelte-h="svelte-jsjowu">Dieses Protokoll hat der Autor Andreas Kalcker leider nicht f\xFCr die Online Publikation freigegeben. 
Sie finden dieses und viele andere wertvolle Informationen in seinem Buch <a href="/buecher/4" class="svelte-a0cypm">\u{1F4D5} Gesundheit verboten</a>. 

</div>`;
    });
    css$4 = {
      code: "div.svelte-a0cypm{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-a0cypm{font-weight:500;--tw-text-opacity:1;color:rgb(37 99 235 / var(--tw-text-opacity))\n}a.svelte-a0cypm:hover{text-decoration-line:underline\n}@media(prefers-color-scheme: dark){a.svelte-a0cypm{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n    }}",
      map: null
    };
    V = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$4);
      return `<div class="svelte-a0cypm" data-svelte-h="svelte-jsjowu">Dieses Protokoll hat der Autor Andreas Kalcker leider nicht f\xFCr die Online Publikation freigegeben. 
Sie finden dieses und viele andere wertvolle Informationen in seinem Buch <a href="/buecher/4" class="svelte-a0cypm">\u{1F4D5} Gesundheit verboten</a>. 

</div>`;
    });
    css$3 = {
      code: "div.svelte-a0cypm{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-a0cypm{font-weight:500;--tw-text-opacity:1;color:rgb(37 99 235 / var(--tw-text-opacity))\n}a.svelte-a0cypm:hover{text-decoration-line:underline\n}@media(prefers-color-scheme: dark){a.svelte-a0cypm{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n    }}",
      map: null
    };
    W = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$3);
      return `<div class="svelte-a0cypm" data-svelte-h="svelte-jsjowu">Dieses Protokoll hat der Autor Andreas Kalcker leider nicht f\xFCr die Online Publikation freigegeben. 
Sie finden dieses und viele andere wertvolle Informationen in seinem Buch <a href="/buecher/4" class="svelte-a0cypm">\u{1F4D5} Gesundheit verboten</a>. 

</div>`;
    });
    css$2 = {
      code: "div.svelte-a0cypm{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-a0cypm{font-weight:500;--tw-text-opacity:1;color:rgb(37 99 235 / var(--tw-text-opacity))\n}a.svelte-a0cypm:hover{text-decoration-line:underline\n}@media(prefers-color-scheme: dark){a.svelte-a0cypm{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n    }}",
      map: null
    };
    X = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$2);
      return `<div class="svelte-a0cypm" data-svelte-h="svelte-jsjowu">Dieses Protokoll hat der Autor Andreas Kalcker leider nicht f\xFCr die Online Publikation freigegeben. 
Sie finden dieses und viele andere wertvolle Informationen in seinem Buch <a href="/buecher/4" class="svelte-a0cypm">\u{1F4D5} Gesundheit verboten</a>. 

</div>`;
    });
    css$1 = {
      code: "div.svelte-a0cypm{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-a0cypm{font-weight:500;--tw-text-opacity:1;color:rgb(37 99 235 / var(--tw-text-opacity))\n}a.svelte-a0cypm:hover{text-decoration-line:underline\n}@media(prefers-color-scheme: dark){a.svelte-a0cypm{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n    }}",
      map: null
    };
    Y = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$1);
      return `<div class="svelte-a0cypm" data-svelte-h="svelte-jsjowu">Dieses Protokoll hat der Autor Andreas Kalcker leider nicht f\xFCr die Online Publikation freigegeben. 
Sie finden dieses und viele andere wertvolle Informationen in seinem Buch <a href="/buecher/4" class="svelte-a0cypm">\u{1F4D5} Gesundheit verboten</a>. 

</div>`;
    });
    css2 = {
      code: "div.svelte-a0cypm{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-a0cypm{font-weight:500;--tw-text-opacity:1;color:rgb(37 99 235 / var(--tw-text-opacity))\n}a.svelte-a0cypm:hover{text-decoration-line:underline\n}@media(prefers-color-scheme: dark){a.svelte-a0cypm{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n    }}",
      map: null
    };
    Z = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css2);
      return `<div class="svelte-a0cypm" data-svelte-h="svelte-jsjowu">Dieses Protokoll hat der Autor Andreas Kalcker leider nicht f\xFCr die Online Publikation freigegeben. 
Sie finden dieses und viele andere wertvolle Informationen in seinem Buch <a href="/buecher/4" class="svelte-a0cypm">\u{1F4D5} Gesundheit verboten</a>. 

</div>`;
    });
    Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${validate_component(Accordion, "Accordion").$$render($$result, { activeClass: "bg-white" }, {}, {
        default: () => {
          return `${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
            header: () => {
              return `<span slot="header" data-svelte-h="svelte-go5fba">Protokoll A: Wie Amateur, f\xFCr alle Anf\xE4nger</span>`;
            },
            default: () => {
              return `<div>${validate_component(A, "A").$$render($$result, {}, {}, {})}</div>`;
            }
          })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
            header: () => {
              return `<span slot="header" data-svelte-h="svelte-95nshk">\u{1F4E2} NEU! AI-Protokoll  der Comusav</span>`;
            },
            default: () => {
              return `<div>${validate_component(Ai, "AI").$$render($$result, {}, {}, {})}</div>`;
            }
          })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
            header: () => {
              return `<span slot="header" data-svelte-h="svelte-1ajj5i">Protokoll B: Wie Basis, entspricht dem alten Protokoll 1000</span>`;
            },
            default: () => {
              return `<div>${validate_component(B, "B").$$render($$result, {}, {}, {})}</div>`;
            }
          })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
            header: () => {
              return `<span slot="header" data-svelte-h="svelte-ps7f42">Protokoll C: Wie CDS, das alte Protokoll 101</span>`;
            },
            default: () => {
              return `<div>${validate_component(C, "C").$$render($$result, {}, {}, {})}</div>`;
            }
          })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
            header: () => {
              return `<span slot="header" data-svelte-h="svelte-1pybp8">Protokoll D: Wie Dermatologisch, f\xFCr die Haut</span>`;
            },
            default: () => {
              return `<div>${validate_component(D, "D").$$render($$result, {}, {}, {})}</div>`;
            }
          })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
            header: () => {
              return `<span slot="header" data-svelte-h="svelte-nfgn4q">Protokoll E: Wie Einlauf</span>`;
            },
            default: () => {
              return `<div>${validate_component(E, "E").$$render($$result, {}, {}, {})}</div>`;
            }
          })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
            header: () => {
              return `<span slot="header" data-svelte-h="svelte-1p9toeg">Protokoll F: Wie Frequente Anwendung, virales Protokoll 115 CDS</span>`;
            },
            default: () => {
              return `<div>${validate_component(F, "F").$$render($$result, {}, {}, {})}</div>`;
            }
          })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
            header: () => {
              return `<span slot="header" data-svelte-h="svelte-1jqgxfc">Protokoll G: Wie Gas, bei dem man nur das Dioxidgas verwendet</span>`;
            },
            default: () => {
              return `<div>${validate_component(G, "G").$$render($$result, {}, {}, {})}</div>`;
            }
          })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
            header: () => {
              return `<span slot="header" data-svelte-h="svelte-1upm6c3">Protokoll H: Wie zu Hause, um Ansteckung zu verhindern</span>`;
            },
            default: () => {
              return `<div>${validate_component(H, "H").$$render($$result, {}, {}, {})}</div>`;
            }
          })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
            header: () => {
              return `<span slot="header" data-svelte-h="svelte-iyt61s">Protokoll I: Wie Insekten und Stiche  (Seite. 151)</span>`;
            },
            default: () => {
              return `<div>${validate_component(I, "I").$$render($$result, {}, {}, {})}</div>`;
            }
          })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
            header: () => {
              return `<span slot="header" data-svelte-h="svelte-19nh9l3">Protokoll J: Wie die Jeweilige Mundhygiene</span>`;
            },
            default: () => {
              return `<div>${validate_component(J, "J").$$render($$result, {}, {}, {})}</div>`;
            }
          })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
            header: () => {
              return `<span slot="header" data-svelte-h="svelte-14ul9bk">Protokoll K: Wie Kombination mit DMSO</span>`;
            },
            default: () => {
              return `<div>${validate_component(K, "K").$$render($$result, {}, {}, {})}</div>`;
            }
          })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
            header: () => {
              return `<span slot="header" data-svelte-h="svelte-1kk5pfw">Protokoll L: Wie Linderndes Bad</span>`;
            },
            default: () => {
              return `<div>${validate_component(L, "L").$$render($$result, {}, {}, {})}</div>`;
            }
          })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
            header: () => {
              return `<span slot="header" data-svelte-h="svelte-130zd6s">Protokoll M: Wie Malaria mit hohen Dosierungen</span>`;
            },
            default: () => {
              return `<div>${validate_component(M, "M").$$render($$result, {}, {}, {})}</div>`;
            }
          })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
            header: () => {
              return `<span slot="header" data-svelte-h="svelte-1o9x3z8">Protokoll N: Wie Nachwuchs oder Kinder</span>`;
            },
            default: () => {
              return `<div>${validate_component(N, "N").$$render($$result, {}, {}, {})}</div>`;
            }
          })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
            header: () => {
              return `<span slot="header" data-svelte-h="svelte-sxty4s">Protokoll O: Wie Ophtalmologie, sprich Augenheilkunde</span>`;
            },
            default: () => {
              return `<div>${validate_component(O, "O").$$render($$result, {}, {}, {})}</div>`;
            }
          })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
            header: () => {
              return `<span slot="header" data-svelte-h="svelte-98gnwo">Protokoll P: Wie Parasiten, intensives Protokoll</span>`;
            },
            default: () => {
              return `<div>${validate_component(P, "P").$$render($$result, {}, {}, {})}</div>`;
            }
          })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
            header: () => {
              return `<span slot="header" data-svelte-h="svelte-19r8rhe">Protokoll P (zweiter Monat): Wie Parasiten</span>`;
            },
            default: () => {
              return `<div>${validate_component(Pzwei, "Pzwei").$$render($$result, {}, {}, {})}</div>`;
            }
          })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
            header: () => {
              return `<span slot="header" data-svelte-h="svelte-1hyd9d7">Protokoll Q: Wie Quaddel und Brandwunden</span>`;
            },
            default: () => {
              return `<div>${validate_component(Q, "Q").$$render($$result, {}, {}, {})}</div>`;
            }
          })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
            header: () => {
              return `<span slot="header" data-svelte-h="svelte-19mgmd2">Protokoll R: Wie Rektal</span>`;
            },
            default: () => {
              return `<div>${validate_component(R, "R").$$render($$result, {}, {}, {})}</div>`;
            }
          })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
            header: () => {
              return `<span slot="header" data-svelte-h="svelte-1gvqc0f">Protokoll S: Wie Sensibel, leichte Dosierungen nach und nach</span>`;
            },
            default: () => {
              return `<div>${validate_component(S, "S").$$render($$result, {}, {}, {})}</div>`;
            }
          })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
            header: () => {
              return `<span slot="header" data-svelte-h="svelte-77q34q">Protokoll T: Wie Terminale Erkrankungen   (Seite. 176)</span>`;
            },
            default: () => {
              return `<div>${validate_component(T, "T").$$render($$result, {}, {}, {})}</div>`;
            }
          })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
            header: () => {
              return `<span slot="header" data-svelte-h="svelte-1jajw9m">Protokoll U: Wie Urgency , das alte \u201CClaras 6+6 Protokoll\u201D   (Seite. 176)</span>`;
            },
            default: () => {
              return `<div>${validate_component(U, "U").$$render($$result, {}, {}, {})}</div>`;
            }
          })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
            header: () => {
              return `<span slot="header" data-svelte-h="svelte-1xi5v0y">Protokoll V: Wie Vaginalsp\xFClung   (Seite. 177)</span>`;
            },
            default: () => {
              return `<div>${validate_component(V, "V").$$render($$result, {}, {}, {})}</div>`;
            }
          })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
            header: () => {
              return `<span slot="header" data-svelte-h="svelte-1dw2syw">Protokoll W: Wie Wau, kann auch f\xFCr ... verwendet werden   (Seite. 178)</span>`;
            },
            default: () => {
              return `<div>${validate_component(W, "W").$$render($$result, {}, {}, {})}</div>`;
            }
          })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
            header: () => {
              return `<span slot="header" data-svelte-h="svelte-opwju8">Protokoll X: Wie DetoX, also f\xFCr die Entgiftung von Schwermetalle   (Seite. 179)</span>`;
            },
            default: () => {
              return `<div>${validate_component(X, "X").$$render($$result, {}, {}, {})}</div>`;
            }
          })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
            header: () => {
              return `<span slot="header" data-svelte-h="svelte-1c34ybl">Protokoll Y: Wie DioxY-injizieren   (Seite. 180)</span>`;
            },
            default: () => {
              return `<div>${validate_component(Y, "Y").$$render($$result, {}, {}, {})}</div>`;
            }
          })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
            header: () => {
              return `<span slot="header" data-svelte-h="svelte-1lxioak">Protokoll Z: Wie Zapper Frequenztherapie nach Dr. Rife   (Seite. 181)</span>`;
            },
            default: () => {
              return `<div>${validate_component(Z, "Z").$$render($$result, {}, {}, {})}</div>`;
            }
          })}`;
        }
      })}`;
    });
  }
});

// .svelte-kit/output/server/nodes/8.js
var __exports3 = {};
__export(__exports3, {
  component: () => component3,
  fonts: () => fonts3,
  imports: () => imports3,
  index: () => index3,
  stylesheets: () => stylesheets3,
  universal: () => page_exports,
  universal_id: () => universal_id2
});
var index3, component_cache3, component3, universal_id2, imports3, stylesheets3, fonts3;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/8.js"() {
    init_page();
    index3 = 8;
    component3 = async () => component_cache3 ?? (component_cache3 = (await Promise.resolve().then(() => (init_page_svelte(), page_svelte_exports))).default);
    universal_id2 = "src/routes/cdl-protokolle/+page.js";
    imports3 = ["_app/immutable/nodes/8.BxSWBl81.js", "_app/immutable/chunks/scheduler.DfuChs2G.js", "_app/immutable/chunks/index.BnyCCVNm.js", "_app/immutable/chunks/spread.CgU5AtxT.js", "_app/immutable/chunks/index.DEpSfGhY.js", "_app/immutable/chunks/index.DrucrQ_l.js", "_app/immutable/chunks/bundle-mjs.BTwrKG5i.js"];
    stylesheets3 = ["_app/immutable/assets/8.CVKeBncW.css"];
    fonts3 = [];
  }
});

// .svelte-kit/output/server/chunks/internal.js
init_ssr();
var base = "";
var assets = base;
var initial = { base, assets };
function override(paths) {
  base = paths.base;
  assets = paths.assets;
}
function reset() {
  base = initial.base;
  assets = initial.assets;
}
var public_env = {};
var safe_public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
function set_safe_public_env(environment) {
  safe_public_env = environment;
}
function afterUpdate() {
}
var prerendering = false;
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { constructors } = $$props;
  let { components = [] } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  let { data_2 = null } = $$props;
  {
    setContext("__svelte__", stores);
  }
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.constructors === void 0 && $$bindings.constructors && constructors !== void 0)
    $$bindings.constructors(constructors);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0)
    $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0)
    $$bindings.data_1(data_1);
  if ($$props.data_2 === void 0 && $$bindings.data_2 && data_2 !== void 0)
    $$bindings.data_2(data_2);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      stores.page.set(page2);
    }
    $$rendered = `  ${constructors[1] ? `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${constructors[2] ? `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {
              default: () => {
                return `${validate_component(constructors[2] || missing_component, "svelte:component").$$render(
                  $$result,
                  { data: data_2, form, this: components[2] },
                  {
                    this: ($$value) => {
                      components[2] = $$value;
                      $$settled = false;
                    }
                  },
                  {}
                )}`;
              }
            }
          )}` : `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, form, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {}
          )}`}`;
        }
      }
    )}` : `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, form, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {}
    )}`} ${``}`;
  } while (!$$settled);
  return $$rendered;
});
var options = {
  app_dir: "_app",
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root: Root,
  service_worker: false,
  templates: {
    app: ({ head, body: body2, assets: assets2, nonce, env }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="' + assets2 + '/favicon.png" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		' + head + '\n	</head>\n	<body data-sveltekit-preload-data="hover">\n		<div style="display: contents">' + body2 + "</div>\n	</body>\n</html>\n",
    error: ({ status, message }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "c1f3pt"
};
async function get_hooks() {
  return {};
}

// .svelte-kit/output/server/index.js
init_exports();
init_chunks();
var DEV = false;
var SVELTE_KIT_ASSETS = "/_svelte_kit_assets";
var ENDPOINT_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"];
var PAGE_METHODS = ["GET", "POST", "HEAD"];
function negotiate(accept, types) {
  const parts = [];
  accept.split(",").forEach((str, i) => {
    const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      parts.push({ type, subtype, q: +q, i });
    }
  });
  parts.sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex(
      (part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*")
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function is_content_type(request, ...types) {
  const type = request.headers.get("content-type")?.split(";", 1)[0].trim() ?? "";
  return types.includes(type.toLowerCase());
}
function is_form_content_type(request) {
  return is_content_type(
    request,
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
  );
}
var HttpError = class {
  /**
   * @param {number} status
   * @param {{message: string} extends App.Error ? (App.Error | string | undefined) : App.Error} body
   */
  constructor(status, body2) {
    this.status = status;
    if (typeof body2 === "string") {
      this.body = { message: body2 };
    } else if (body2) {
      this.body = body2;
    } else {
      this.body = { message: `Error: ${status}` };
    }
  }
  toString() {
    return JSON.stringify(this.body);
  }
};
var Redirect = class {
  /**
   * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308} status
   * @param {string} location
   */
  constructor(status, location) {
    this.status = status;
    this.location = location;
  }
};
var SvelteKitError = class extends Error {
  /**
   * @param {number} status
   * @param {string} text
   * @param {string} message
   */
  constructor(status, text2, message) {
    super(message);
    this.status = status;
    this.text = text2;
  }
};
var ActionFailure = class {
  /**
   * @param {number} status
   * @param {T} data
   */
  constructor(status, data) {
    this.status = status;
    this.data = data;
  }
};
function json(data, init2) {
  const body2 = JSON.stringify(data);
  const headers2 = new Headers(init2?.headers);
  if (!headers2.has("content-length")) {
    headers2.set("content-length", encoder$3.encode(body2).byteLength.toString());
  }
  if (!headers2.has("content-type")) {
    headers2.set("content-type", "application/json");
  }
  return new Response(body2, {
    ...init2,
    headers: headers2
  });
}
var encoder$3 = new TextEncoder();
function text(body2, init2) {
  const headers2 = new Headers(init2?.headers);
  if (!headers2.has("content-length")) {
    const encoded = encoder$3.encode(body2);
    headers2.set("content-length", encoded.byteLength.toString());
    return new Response(encoded, {
      ...init2,
      headers: headers2
    });
  }
  return new Response(body2, {
    ...init2,
    headers: headers2
  });
}
function coalesce_to_error(err) {
  return err instanceof Error || err && /** @type {any} */
  err.name && /** @type {any} */
  err.message ? (
    /** @type {Error} */
    err
  ) : new Error(JSON.stringify(err));
}
function normalize_error(error) {
  return (
    /** @type {import('../runtime/control.js').Redirect | HttpError | SvelteKitError | Error} */
    error
  );
}
function get_status(error) {
  return error instanceof HttpError || error instanceof SvelteKitError ? error.status : 500;
}
function get_message(error) {
  return error instanceof SvelteKitError ? error.text : "Internal Error";
}
function method_not_allowed(mod, method) {
  return text(`${method} method not allowed`, {
    status: 405,
    headers: {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: allowed_methods(mod).join(", ")
    }
  });
}
function allowed_methods(mod) {
  const allowed = ENDPOINT_METHODS.filter((method) => method in mod);
  if ("GET" in mod || "HEAD" in mod)
    allowed.push("HEAD");
  return allowed;
}
function static_error_page(options2, status, message) {
  let page2 = options2.templates.error({ status, message });
  return text(page2, {
    headers: { "content-type": "text/html; charset=utf-8" },
    status
  });
}
async function handle_fatal_error(event, options2, error) {
  error = error instanceof HttpError ? error : coalesce_to_error(error);
  const status = get_status(error);
  const body2 = await handle_error_and_jsonify(event, options2, error);
  const type = negotiate(event.request.headers.get("accept") || "text/html", [
    "application/json",
    "text/html"
  ]);
  if (event.isDataRequest || type === "application/json") {
    return json(body2, {
      status
    });
  }
  return static_error_page(options2, status, body2.message);
}
async function handle_error_and_jsonify(event, options2, error) {
  if (error instanceof HttpError) {
    return error.body;
  }
  const status = get_status(error);
  const message = get_message(error);
  return await options2.hooks.handleError({ error, event, status, message }) ?? { message };
}
function redirect_response(status, location) {
  const response = new Response(void 0, {
    status,
    headers: { location }
  });
  return response;
}
function clarify_devalue_error(event, error) {
  if (error.path) {
    return `Data returned from \`load\` while rendering ${event.route.id} is not serializable: ${error.message} (data${error.path})`;
  }
  if (error.path === "") {
    return `Data returned from \`load\` while rendering ${event.route.id} is not a plain object`;
  }
  return error.message;
}
function stringify_uses(node) {
  const uses = [];
  if (node.uses && node.uses.dependencies.size > 0) {
    uses.push(`"dependencies":${JSON.stringify(Array.from(node.uses.dependencies))}`);
  }
  if (node.uses && node.uses.search_params.size > 0) {
    uses.push(`"search_params":${JSON.stringify(Array.from(node.uses.search_params))}`);
  }
  if (node.uses && node.uses.params.size > 0) {
    uses.push(`"params":${JSON.stringify(Array.from(node.uses.params))}`);
  }
  if (node.uses?.parent)
    uses.push('"parent":1');
  if (node.uses?.route)
    uses.push('"route":1');
  if (node.uses?.url)
    uses.push('"url":1');
  return `"uses":{${uses.join(",")}}`;
}
async function render_endpoint(event, mod, state) {
  const method = (
    /** @type {import('types').HttpMethod} */
    event.request.method
  );
  let handler = mod[method] || mod.fallback;
  if (method === "HEAD" && mod.GET && !mod.HEAD) {
    handler = mod.GET;
  }
  if (!handler) {
    return method_not_allowed(mod, method);
  }
  const prerender = mod.prerender ?? state.prerender_default;
  if (prerender && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
    throw new Error("Cannot prerender endpoints that have mutative methods");
  }
  if (state.prerendering && !prerender) {
    if (state.depth > 0) {
      throw new Error(`${event.route.id} is not prerenderable`);
    } else {
      return new Response(void 0, { status: 204 });
    }
  }
  try {
    let response = await handler(
      /** @type {import('@sveltejs/kit').RequestEvent<Record<string, any>>} */
      event
    );
    if (!(response instanceof Response)) {
      throw new Error(
        `Invalid response from route ${event.url.pathname}: handler should return a Response object`
      );
    }
    if (state.prerendering) {
      response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(response.headers)
      });
      response.headers.set("x-sveltekit-prerender", String(prerender));
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      return new Response(void 0, {
        status: e.status,
        headers: { location: e.location }
      });
    }
    throw e;
  }
}
function is_endpoint_request(event) {
  const { method, headers: headers2 } = event.request;
  if (ENDPOINT_METHODS.includes(method) && !PAGE_METHODS.includes(method)) {
    return true;
  }
  if (method === "POST" && headers2.get("x-sveltekit-action") === "true")
    return false;
  const accept = event.request.headers.get("accept") ?? "*/*";
  return negotiate(accept, ["*", "text/html"]) !== "text/html";
}
function compact(arr) {
  return arr.filter(
    /** @returns {val is NonNullable<T>} */
    (val) => val != null
  );
}
var escaped = {
  "<": "\\u003C",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var DevalueError = class extends Error {
  /**
   * @param {string} message
   * @param {string[]} keys
   */
  constructor(message, keys) {
    super(message);
    this.name = "DevalueError";
    this.path = keys.join("");
  }
};
function is_primitive(thing) {
  return Object(thing) !== thing;
}
var object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(
  Object.prototype
).sort().join("\0");
function is_plain_object(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function get_escaped_char(char) {
  switch (char) {
    case '"':
      return '\\"';
    case "<":
      return "\\u003C";
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "	":
      return "\\t";
    case "\b":
      return "\\b";
    case "\f":
      return "\\f";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return char < " " ? `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
  }
}
function stringify_string(str) {
  let result = "";
  let last_pos = 0;
  const len = str.length;
  for (let i = 0; i < len; i += 1) {
    const char = str[i];
    const replacement = get_escaped_char(char);
    if (replacement) {
      result += str.slice(last_pos, i) + replacement;
      last_pos = i + 1;
    }
  }
  return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}
var chars$1 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafe_chars = /[<\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
function uneval(value, replacer) {
  const counts = /* @__PURE__ */ new Map();
  const keys = [];
  const custom = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (!is_primitive(thing)) {
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      if (replacer) {
        const str2 = replacer(thing);
        if (typeof str2 === "string") {
          custom.set(thing, str2);
          return;
        }
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach((value2, i) => {
            keys.push(`[${i}]`);
            walk(value2);
            keys.pop();
          });
          break;
        case "Set":
          Array.from(thing).forEach(walk);
          break;
        case "Map":
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive$1(key2) : "..."})`
            );
            walk(value2);
            keys.pop();
          }
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          for (const key2 in thing) {
            keys.push(`.${key2}`);
            walk(thing[key2]);
            keys.pop();
          }
      }
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a, b) => b[1] - a[1]).forEach((entry, i) => {
    names.set(entry[0], get_name(i));
  });
  function stringify2(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (is_primitive(thing)) {
      return stringify_primitive$1(thing);
    }
    if (custom.has(thing)) {
      return custom.get(thing);
    }
    const type = get_type(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify2(thing.valueOf())})`;
      case "RegExp":
        return `new RegExp(${stringify_string(thing.source)}, "${thing.flags}")`;
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = (
          /** @type {any[]} */
          thing.map(
            (v, i) => i in thing ? stringify2(v) : ""
          )
        );
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify2).join(",")}])`;
      default:
        const obj = `{${Object.keys(thing).map((key2) => `${safe_key(key2)}:${stringify2(thing[key2])}`).join(",")}}`;
        const proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? `Object.assign(Object.create(null),${obj})` : `Object.create(null)`;
        }
        return obj;
    }
  }
  const str = stringify2(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name2, thing) => {
      params.push(name2);
      if (custom.has(thing)) {
        values.push(
          /** @type {string} */
          custom.get(thing)
        );
        return;
      }
      if (is_primitive(thing)) {
        values.push(stringify_primitive$1(thing));
        return;
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify2(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i) => {
            statements.push(`${name2}[${i}]=${stringify2(v)}`);
          });
          break;
        case "Set":
          values.push(`new Set`);
          statements.push(
            `${name2}.${Array.from(thing).map((v) => `add(${stringify2(v)})`).join(".")}`
          );
          break;
        case "Map":
          values.push(`new Map`);
          statements.push(
            `${name2}.${Array.from(thing).map(([k, v]) => `set(${stringify2(k)}, ${stringify2(v)})`).join(".")}`
          );
          break;
        default:
          values.push(
            Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}"
          );
          Object.keys(thing).forEach((key2) => {
            statements.push(
              `${name2}${safe_prop(key2)}=${stringify2(thing[key2])}`
            );
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(
      ";"
    )}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function get_name(num) {
  let name2 = "";
  do {
    name2 = chars$1[num % chars$1.length] + name2;
    num = ~~(num / chars$1.length) - 1;
  } while (num >= 0);
  return reserved.test(name2) ? `${name2}0` : name2;
}
function escape_unsafe_char(c) {
  return escaped[c] || c;
}
function escape_unsafe_chars(str) {
  return str.replace(unsafe_chars, escape_unsafe_char);
}
function safe_key(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escape_unsafe_chars(JSON.stringify(key2));
}
function safe_prop(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? `.${key2}` : `[${escape_unsafe_chars(JSON.stringify(key2))}]`;
}
function stringify_primitive$1(thing) {
  if (typeof thing === "string")
    return stringify_string(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  const str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  if (typeof thing === "bigint")
    return thing + "n";
  return str;
}
var UNDEFINED = -1;
var HOLE = -2;
var NAN = -3;
var POSITIVE_INFINITY = -4;
var NEGATIVE_INFINITY = -5;
var NEGATIVE_ZERO = -6;
function stringify(value, reducers) {
  const stringified = [];
  const indexes = /* @__PURE__ */ new Map();
  const custom = [];
  for (const key2 in reducers) {
    custom.push({ key: key2, fn: reducers[key2] });
  }
  const keys = [];
  let p = 0;
  function flatten(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (indexes.has(thing))
      return indexes.get(thing);
    if (thing === void 0)
      return UNDEFINED;
    if (Number.isNaN(thing))
      return NAN;
    if (thing === Infinity)
      return POSITIVE_INFINITY;
    if (thing === -Infinity)
      return NEGATIVE_INFINITY;
    if (thing === 0 && 1 / thing < 0)
      return NEGATIVE_ZERO;
    const index22 = p++;
    indexes.set(thing, index22);
    for (const { key: key2, fn } of custom) {
      const value2 = fn(thing);
      if (value2) {
        stringified[index22] = `["${key2}",${flatten(value2)}]`;
        return index22;
      }
    }
    let str = "";
    if (is_primitive(thing)) {
      str = stringify_primitive(thing);
    } else {
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          str = `["Object",${stringify_primitive(thing)}]`;
          break;
        case "BigInt":
          str = `["BigInt",${thing}]`;
          break;
        case "Date":
          str = `["Date","${thing.toISOString()}"]`;
          break;
        case "RegExp":
          const { source, flags } = thing;
          str = flags ? `["RegExp",${stringify_string(source)},"${flags}"]` : `["RegExp",${stringify_string(source)}]`;
          break;
        case "Array":
          str = "[";
          for (let i = 0; i < thing.length; i += 1) {
            if (i > 0)
              str += ",";
            if (i in thing) {
              keys.push(`[${i}]`);
              str += flatten(thing[i]);
              keys.pop();
            } else {
              str += HOLE;
            }
          }
          str += "]";
          break;
        case "Set":
          str = '["Set"';
          for (const value2 of thing) {
            str += `,${flatten(value2)}`;
          }
          str += "]";
          break;
        case "Map":
          str = '["Map"';
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive(key2) : "..."})`
            );
            str += `,${flatten(key2)},${flatten(value2)}`;
          }
          str += "]";
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          if (Object.getPrototypeOf(thing) === null) {
            str = '["null"';
            for (const key2 in thing) {
              keys.push(`.${key2}`);
              str += `,${stringify_string(key2)},${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "]";
          } else {
            str = "{";
            let started = false;
            for (const key2 in thing) {
              if (started)
                str += ",";
              started = true;
              keys.push(`.${key2}`);
              str += `${stringify_string(key2)}:${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "}";
          }
      }
    }
    stringified[index22] = str;
    return index22;
  }
  const index4 = flatten(value);
  if (index4 < 0)
    return `${index4}`;
  return `[${stringified.join(",")}]`;
}
function stringify_primitive(thing) {
  const type = typeof thing;
  if (type === "string")
    return stringify_string(thing);
  if (thing instanceof String)
    return stringify_string(thing.toString());
  if (thing === void 0)
    return UNDEFINED.toString();
  if (thing === 0 && 1 / thing < 0)
    return NEGATIVE_ZERO.toString();
  if (type === "bigint")
    return `["BigInt","${thing}"]`;
  return String(thing);
}
function is_action_json_request(event) {
  const accept = negotiate(event.request.headers.get("accept") ?? "*/*", [
    "application/json",
    "text/html"
  ]);
  return accept === "application/json" && event.request.method === "POST";
}
async function handle_action_json_request(event, options2, server2) {
  const actions = server2?.actions;
  if (!actions) {
    const no_actions_error = new SvelteKitError(
      405,
      "Method Not Allowed",
      "POST method not allowed. No actions exist for this page"
    );
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, no_actions_error)
      },
      {
        status: no_actions_error.status,
        headers: {
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
          // "The server must generate an Allow header field in a 405 status code response"
          allow: "GET"
        }
      }
    );
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return action_json({
        type: "failure",
        status: data.status,
        // @ts-expect-error we assign a string to what is supposed to be an object. That's ok
        // because we don't use the object outside, and this way we have better code navigation
        // through knowing where the related interface is used.
        data: stringify_action_response(
          data.data,
          /** @type {string} */
          event.route.id
        )
      });
    } else {
      return action_json({
        type: "success",
        status: data ? 200 : 204,
        // @ts-expect-error see comment above
        data: stringify_action_response(
          data,
          /** @type {string} */
          event.route.id
        )
      });
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return action_json_redirect(err);
    }
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, check_incorrect_fail_use(err))
      },
      {
        status: get_status(err)
      }
    );
  }
}
function check_incorrect_fail_use(error) {
  return error instanceof ActionFailure ? new Error('Cannot "throw fail()". Use "return fail()"') : error;
}
function action_json_redirect(redirect) {
  return action_json({
    type: "redirect",
    status: redirect.status,
    location: redirect.location
  });
}
function action_json(data, init2) {
  return json(data, init2);
}
function is_action_request(event) {
  return event.request.method === "POST";
}
async function handle_action_request(event, server2) {
  const actions = server2?.actions;
  if (!actions) {
    event.setHeaders({
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: "GET"
    });
    return {
      type: "error",
      error: new SvelteKitError(
        405,
        "Method Not Allowed",
        "POST method not allowed. No actions exist for this page"
      )
    };
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return {
        type: "failure",
        status: data.status,
        data: data.data
      };
    } else {
      return {
        type: "success",
        status: 200,
        // @ts-expect-error this will be removed upon serialization, so `undefined` is the same as omission
        data
      };
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return {
        type: "redirect",
        status: err.status,
        location: err.location
      };
    }
    return {
      type: "error",
      error: check_incorrect_fail_use(err)
    };
  }
}
function check_named_default_separate(actions) {
  if (actions.default && Object.keys(actions).length > 1) {
    throw new Error(
      "When using named actions, the default action cannot be used. See the docs for more info: https://kit.svelte.dev/docs/form-actions#named-actions"
    );
  }
}
async function call_action(event, actions) {
  const url = new URL(event.request.url);
  let name2 = "default";
  for (const param of url.searchParams) {
    if (param[0].startsWith("/")) {
      name2 = param[0].slice(1);
      if (name2 === "default") {
        throw new Error('Cannot use reserved action name "default"');
      }
      break;
    }
  }
  const action = actions[name2];
  if (!action) {
    throw new SvelteKitError(404, "Not Found", `No action with name '${name2}' found`);
  }
  if (!is_form_content_type(event.request)) {
    throw new SvelteKitError(
      415,
      "Unsupported Media Type",
      `Form actions expect form-encoded data \u2014 received ${event.request.headers.get(
        "content-type"
      )}`
    );
  }
  return action(event);
}
function uneval_action_response(data, route_id) {
  return try_deserialize(data, uneval, route_id);
}
function stringify_action_response(data, route_id) {
  return try_deserialize(data, stringify, route_id);
}
function try_deserialize(data, fn, route_id) {
  try {
    return fn(data);
  } catch (e) {
    const error = (
      /** @type {any} */
      e
    );
    if ("path" in error) {
      let message = `Data returned from action inside ${route_id} is not serializable: ${error.message}`;
      if (error.path !== "")
        message += ` (data.${error.path})`;
      throw new Error(message);
    }
    throw error;
  }
}
var INVALIDATED_PARAM = "x-sveltekit-invalidated";
var TRAILING_SLASH_PARAM = "x-sveltekit-trailing-slash";
function b64_encode(buffer) {
  if (globalThis.Buffer) {
    return Buffer.from(buffer).toString("base64");
  }
  const little_endian = new Uint8Array(new Uint16Array([1]).buffer)[0] > 0;
  return btoa(
    new TextDecoder(little_endian ? "utf-16le" : "utf-16be").decode(
      new Uint16Array(new Uint8Array(buffer))
    )
  );
}
async function load_server_data({ event, state, node, parent }) {
  if (!node?.server)
    return null;
  let is_tracking = true;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    route: false,
    url: false,
    search_params: /* @__PURE__ */ new Set()
  };
  const url = make_trackable(
    event.url,
    () => {
      if (is_tracking) {
        uses.url = true;
      }
    },
    (param) => {
      if (is_tracking) {
        uses.search_params.add(param);
      }
    }
  );
  if (state.prerendering) {
    disable_search(url);
  }
  const result = await node.server.load?.call(null, {
    ...event,
    fetch: (info, init2) => {
      new URL(info instanceof Request ? info.url : info, event.url);
      return event.fetch(info, init2);
    },
    /** @param {string[]} deps */
    depends: (...deps) => {
      for (const dep of deps) {
        const { href } = new URL(dep, event.url);
        uses.dependencies.add(href);
      }
    },
    params: new Proxy(event.params, {
      get: (target, key2) => {
        if (is_tracking) {
          uses.params.add(key2);
        }
        return target[
          /** @type {string} */
          key2
        ];
      }
    }),
    parent: async () => {
      if (is_tracking) {
        uses.parent = true;
      }
      return parent();
    },
    route: new Proxy(event.route, {
      get: (target, key2) => {
        if (is_tracking) {
          uses.route = true;
        }
        return target[
          /** @type {'id'} */
          key2
        ];
      }
    }),
    url,
    untrack(fn) {
      is_tracking = false;
      try {
        return fn();
      } finally {
        is_tracking = true;
      }
    }
  });
  return {
    type: "data",
    data: result ?? null,
    uses,
    slash: node.server.trailingSlash
  };
}
async function load_data({
  event,
  fetched,
  node,
  parent,
  server_data_promise,
  state,
  resolve_opts,
  csr
}) {
  const server_data_node = await server_data_promise;
  if (!node?.universal?.load) {
    return server_data_node?.data ?? null;
  }
  const result = await node.universal.load.call(null, {
    url: event.url,
    params: event.params,
    data: server_data_node?.data ?? null,
    route: event.route,
    fetch: create_universal_fetch(event, state, fetched, csr, resolve_opts),
    setHeaders: event.setHeaders,
    depends: () => {
    },
    parent,
    untrack: (fn) => fn()
  });
  return result ?? null;
}
function create_universal_fetch(event, state, fetched, csr, resolve_opts) {
  const universal_fetch = async (input, init2) => {
    const cloned_body = input instanceof Request && input.body ? input.clone().body : null;
    const cloned_headers = input instanceof Request && [...input.headers].length ? new Headers(input.headers) : init2?.headers;
    let response = await event.fetch(input, init2);
    const url = new URL(input instanceof Request ? input.url : input, event.url);
    const same_origin = url.origin === event.url.origin;
    let dependency;
    if (same_origin) {
      if (state.prerendering) {
        dependency = { response, body: null };
        state.prerendering.dependencies.set(url.pathname, dependency);
      }
    } else {
      const mode = input instanceof Request ? input.mode : init2?.mode ?? "cors";
      if (mode === "no-cors") {
        response = new Response("", {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      } else {
        const acao = response.headers.get("access-control-allow-origin");
        if (!acao || acao !== event.url.origin && acao !== "*") {
          throw new Error(
            `CORS error: ${acao ? "Incorrect" : "No"} 'Access-Control-Allow-Origin' header is present on the requested resource`
          );
        }
      }
    }
    const proxy = new Proxy(response, {
      get(response2, key2, _receiver) {
        async function push_fetched(body2, is_b64) {
          const status_number = Number(response2.status);
          if (isNaN(status_number)) {
            throw new Error(
              `response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`
            );
          }
          fetched.push({
            url: same_origin ? url.href.slice(event.url.origin.length) : url.href,
            method: event.request.method,
            request_body: (
              /** @type {string | ArrayBufferView | undefined} */
              input instanceof Request && cloned_body ? await stream_to_string(cloned_body) : init2?.body
            ),
            request_headers: cloned_headers,
            response_body: body2,
            response: response2,
            is_b64
          });
        }
        if (key2 === "arrayBuffer") {
          return async () => {
            const buffer = await response2.arrayBuffer();
            if (dependency) {
              dependency.body = new Uint8Array(buffer);
            }
            if (buffer instanceof ArrayBuffer) {
              await push_fetched(b64_encode(buffer), true);
            }
            return buffer;
          };
        }
        async function text2() {
          const body2 = await response2.text();
          if (!body2 || typeof body2 === "string") {
            await push_fetched(body2, false);
          }
          if (dependency) {
            dependency.body = body2;
          }
          return body2;
        }
        if (key2 === "text") {
          return text2;
        }
        if (key2 === "json") {
          return async () => {
            return JSON.parse(await text2());
          };
        }
        return Reflect.get(response2, key2, response2);
      }
    });
    if (csr) {
      const get2 = response.headers.get;
      response.headers.get = (key2) => {
        const lower = key2.toLowerCase();
        const value = get2.call(response.headers, lower);
        if (value && !lower.startsWith("x-sveltekit-")) {
          const included = resolve_opts.filterSerializedResponseHeaders(lower, value);
          if (!included) {
            throw new Error(
              `Failed to get response header "${lower}" \u2014 it must be included by the \`filterSerializedResponseHeaders\` option: https://kit.svelte.dev/docs/hooks#server-hooks-handle (at ${event.route.id})`
            );
          }
        }
        return value;
      };
    }
    return proxy;
  };
  return (input, init2) => {
    const response = universal_fetch(input, init2);
    response.catch(() => {
    });
    return response;
  };
}
async function stream_to_string(stream) {
  let result = "";
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += decoder.decode(value);
  }
  return result;
}
function hash(...values) {
  let hash2 = 5381;
  for (const value of values) {
    if (typeof value === "string") {
      let i = value.length;
      while (i)
        hash2 = hash2 * 33 ^ value.charCodeAt(--i);
    } else if (ArrayBuffer.isView(value)) {
      const buffer = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
      let i = buffer.length;
      while (i)
        hash2 = hash2 * 33 ^ buffer[--i];
    } else {
      throw new TypeError("value must be a string or TypedArray");
    }
  }
  return (hash2 >>> 0).toString(36);
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(
  // special characters
  `[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`,
  "g"
);
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var replacements = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var pattern = new RegExp(`[${Object.keys(replacements).join("")}]`, "g");
function serialize_data(fetched, filter, prerendering2 = false) {
  const headers2 = {};
  let cache_control = null;
  let age = null;
  let varyAny = false;
  for (const [key2, value] of fetched.response.headers) {
    if (filter(key2, value)) {
      headers2[key2] = value;
    }
    if (key2 === "cache-control")
      cache_control = value;
    else if (key2 === "age")
      age = value;
    else if (key2 === "vary" && value.trim() === "*")
      varyAny = true;
  }
  const payload = {
    status: fetched.response.status,
    statusText: fetched.response.statusText,
    headers: headers2,
    body: fetched.response_body
  };
  const safe_payload = JSON.stringify(payload).replace(pattern, (match) => replacements[match]);
  const attrs = [
    'type="application/json"',
    "data-sveltekit-fetched",
    `data-url=${escape_html_attr(fetched.url)}`
  ];
  if (fetched.is_b64) {
    attrs.push("data-b64");
  }
  if (fetched.request_headers || fetched.request_body) {
    const values = [];
    if (fetched.request_headers) {
      values.push([...new Headers(fetched.request_headers)].join(","));
    }
    if (fetched.request_body) {
      values.push(fetched.request_body);
    }
    attrs.push(`data-hash="${hash(...values)}"`);
  }
  if (!prerendering2 && fetched.method === "GET" && cache_control && !varyAny) {
    const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
    if (match) {
      const ttl = +match[1] - +(age ?? "0");
      attrs.push(`data-ttl="${ttl}"`);
    }
  }
  return `<script ${attrs.join(" ")}>${safe_payload}<\/script>`;
}
var s = JSON.stringify;
var encoder$2 = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array2 = encode$1(data);
  for (let i = 0; i < array2.length; i += 16) {
    const w = array2.subarray(i, i + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i2 = 0; i2 < 64; i2++) {
      if (i2 < 16) {
        tmp = w[i2];
      } else {
        a = w[i2 + 1 & 15];
        b = w[i2 + 14 & 15];
        tmp = w[i2 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i2 & 15] + w[i2 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i2];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x) {
    return (x - Math.floor(x)) * 4294967296;
  }
  let prime = 2;
  for (let i = 0; i < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i < 8) {
        init[i] = frac(prime ** (1 / 2));
      }
      key[i] = frac(prime ** (1 / 3));
      i++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i = 0; i < bytes.length; i += 4) {
    const a = bytes[i + 0];
    const b = bytes[i + 1];
    const c = bytes[i + 2];
    const d = bytes[i + 3];
    bytes[i + 0] = d;
    bytes[i + 1] = c;
    bytes[i + 2] = b;
    bytes[i + 3] = a;
  }
}
function encode$1(str) {
  const encoded = encoder$2.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i;
  for (i = 2; i < l; i += 3) {
    result += chars[bytes[i - 2] >> 2];
    result += chars[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars[(bytes[i - 1] & 15) << 2 | bytes[i] >> 6];
    result += chars[bytes[i] & 63];
  }
  if (i === l + 1) {
    result += chars[bytes[i - 2] >> 2];
    result += chars[(bytes[i - 2] & 3) << 4];
    result += "==";
  }
  if (i === l) {
    result += chars[bytes[i - 2] >> 2];
    result += chars[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars[(bytes[i - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64(array);
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample",
  "wasm-unsafe-eval",
  "script"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var _use_hashes, _script_needs_csp, _style_needs_csp, _directives, _script_src, _script_src_elem, _style_src, _style_src_attr, _style_src_elem, _nonce;
var BaseProvider = class {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    /** @type {boolean} */
    __privateAdd(this, _use_hashes, void 0);
    /** @type {boolean} */
    __privateAdd(this, _script_needs_csp, void 0);
    /** @type {boolean} */
    __privateAdd(this, _style_needs_csp, void 0);
    /** @type {import('types').CspDirectives} */
    __privateAdd(this, _directives, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _script_src, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _script_src_elem, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _style_src, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _style_src_attr, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _style_src_elem, void 0);
    /** @type {string} */
    __privateAdd(this, _nonce, void 0);
    __privateSet(this, _use_hashes, use_hashes);
    __privateSet(this, _directives, directives);
    const d = __privateGet(this, _directives);
    __privateSet(this, _script_src, []);
    __privateSet(this, _script_src_elem, []);
    __privateSet(this, _style_src, []);
    __privateSet(this, _style_src_attr, []);
    __privateSet(this, _style_src_elem, []);
    const effective_script_src = d["script-src"] || d["default-src"];
    const script_src_elem = d["script-src-elem"];
    const effective_style_src = d["style-src"] || d["default-src"];
    const style_src_attr = d["style-src-attr"];
    const style_src_elem = d["style-src-elem"];
    __privateSet(this, _script_needs_csp, !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0 || !!script_src_elem && script_src_elem.filter((value) => value !== "unsafe-inline").length > 0);
    __privateSet(this, _style_needs_csp, !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0 || !!style_src_attr && style_src_attr.filter((value) => value !== "unsafe-inline").length > 0 || !!style_src_elem && style_src_elem.filter((value) => value !== "unsafe-inline").length > 0);
    this.script_needs_nonce = __privateGet(this, _script_needs_csp) && !__privateGet(this, _use_hashes);
    this.style_needs_nonce = __privateGet(this, _style_needs_csp) && !__privateGet(this, _use_hashes);
    __privateSet(this, _nonce, nonce);
  }
  /** @param {string} content */
  add_script(content) {
    if (__privateGet(this, _script_needs_csp)) {
      const d = __privateGet(this, _directives);
      if (__privateGet(this, _use_hashes)) {
        const hash2 = sha256(content);
        __privateGet(this, _script_src).push(`sha256-${hash2}`);
        if (d["script-src-elem"]?.length) {
          __privateGet(this, _script_src_elem).push(`sha256-${hash2}`);
        }
      } else {
        if (__privateGet(this, _script_src).length === 0) {
          __privateGet(this, _script_src).push(`nonce-${__privateGet(this, _nonce)}`);
        }
        if (d["script-src-elem"]?.length) {
          __privateGet(this, _script_src_elem).push(`nonce-${__privateGet(this, _nonce)}`);
        }
      }
    }
  }
  /** @param {string} content */
  add_style(content) {
    if (__privateGet(this, _style_needs_csp)) {
      const empty_comment_hash = "9OlNO0DNEeaVzHL4RZwCLsBHA8WBQ8toBp/4F5XV2nc=";
      const d = __privateGet(this, _directives);
      if (__privateGet(this, _use_hashes)) {
        const hash2 = sha256(content);
        __privateGet(this, _style_src).push(`sha256-${hash2}`);
        if (d["style-src-attr"]?.length) {
          __privateGet(this, _style_src_attr).push(`sha256-${hash2}`);
        }
        if (d["style-src-elem"]?.length) {
          if (hash2 !== empty_comment_hash && !d["style-src-elem"].includes(`sha256-${empty_comment_hash}`)) {
            __privateGet(this, _style_src_elem).push(`sha256-${empty_comment_hash}`);
          }
          __privateGet(this, _style_src_elem).push(`sha256-${hash2}`);
        }
      } else {
        if (__privateGet(this, _style_src).length === 0 && !d["style-src"]?.includes("unsafe-inline")) {
          __privateGet(this, _style_src).push(`nonce-${__privateGet(this, _nonce)}`);
        }
        if (d["style-src-attr"]?.length) {
          __privateGet(this, _style_src_attr).push(`nonce-${__privateGet(this, _nonce)}`);
        }
        if (d["style-src-elem"]?.length) {
          if (!d["style-src-elem"].includes(`sha256-${empty_comment_hash}`)) {
            __privateGet(this, _style_src_elem).push(`sha256-${empty_comment_hash}`);
          }
          __privateGet(this, _style_src_elem).push(`nonce-${__privateGet(this, _nonce)}`);
        }
      }
    }
  }
  /**
   * @param {boolean} [is_meta]
   */
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...__privateGet(this, _directives) };
    if (__privateGet(this, _style_src).length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...__privateGet(this, _style_src)
      ];
    }
    if (__privateGet(this, _style_src_attr).length > 0) {
      directives["style-src-attr"] = [
        ...directives["style-src-attr"] || [],
        ...__privateGet(this, _style_src_attr)
      ];
    }
    if (__privateGet(this, _style_src_elem).length > 0) {
      directives["style-src-elem"] = [
        ...directives["style-src-elem"] || [],
        ...__privateGet(this, _style_src_elem)
      ];
    }
    if (__privateGet(this, _script_src).length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...__privateGet(this, _script_src)
      ];
    }
    if (__privateGet(this, _script_src_elem).length > 0) {
      directives["script-src-elem"] = [
        ...directives["script-src-elem"] || [],
        ...__privateGet(this, _script_src_elem)
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = (
        /** @type {string[] | true} */
        directives[key2]
      );
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
};
_use_hashes = new WeakMap();
_script_needs_csp = new WeakMap();
_style_needs_csp = new WeakMap();
_directives = new WeakMap();
_script_src = new WeakMap();
_script_src_elem = new WeakMap();
_style_src = new WeakMap();
_style_src_attr = new WeakMap();
_style_src_elem = new WeakMap();
_nonce = new WeakMap();
var CspProvider = class extends BaseProvider {
  get_meta() {
    const content = this.get_header(true);
    if (!content) {
      return;
    }
    return `<meta http-equiv="content-security-policy" content=${escape_html_attr(content)}>`;
  }
};
var CspReportOnlyProvider = class extends BaseProvider {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    super(use_hashes, directives, nonce);
    if (Object.values(directives).filter((v) => !!v).length > 0) {
      const has_report_to = directives["report-to"]?.length ?? 0 > 0;
      const has_report_uri = directives["report-uri"]?.length ?? 0 > 0;
      if (!has_report_to && !has_report_uri) {
        throw Error(
          "`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both"
        );
      }
    }
  }
};
var Csp = class {
  /**
   * @param {import('./types.js').CspConfig} config
   * @param {import('./types.js').CspOpts} opts
   */
  constructor({ mode, directives, reportOnly }, { prerender }) {
    /** @readonly */
    __publicField(this, "nonce", generate_nonce());
    /** @type {CspProvider} */
    __publicField(this, "csp_provider");
    /** @type {CspReportOnlyProvider} */
    __publicField(this, "report_only_provider");
    const use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.csp_provider = new CspProvider(use_hashes, directives, this.nonce);
    this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce);
  }
  get script_needs_nonce() {
    return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
  }
  get style_needs_nonce() {
    return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
  }
  /** @param {string} content */
  add_script(content) {
    this.csp_provider.add_script(content);
    this.report_only_provider.add_script(content);
  }
  /** @param {string} content */
  add_style(content) {
    this.csp_provider.add_style(content);
    this.report_only_provider.add_style(content);
  }
};
function defer() {
  let fulfil;
  let reject;
  const promise = new Promise((f, r) => {
    fulfil = f;
    reject = r;
  });
  return { promise, fulfil, reject };
}
function create_async_iterator() {
  const deferred = [defer()];
  return {
    iterator: {
      [Symbol.asyncIterator]() {
        return {
          next: async () => {
            const next = await deferred[0].promise;
            if (!next.done)
              deferred.shift();
            return next;
          }
        };
      }
    },
    push: (value) => {
      deferred[deferred.length - 1].fulfil({
        value,
        done: false
      });
      deferred.push(defer());
    },
    done: () => {
      deferred[deferred.length - 1].fulfil({ done: true });
    }
  };
}
var updated = {
  ...readable(false),
  check: () => false
};
var encoder$1 = new TextEncoder();
async function render_response({
  branch,
  fetched,
  options: options2,
  manifest: manifest2,
  state,
  page_config,
  status,
  error = null,
  event,
  resolve_opts,
  action_result
}) {
  if (state.prerendering) {
    if (options2.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options2.app_template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const { client } = manifest2._;
  const modulepreloads = new Set(client.imports);
  const stylesheets4 = new Set(client.stylesheets);
  const fonts4 = new Set(client.fonts);
  const link_header_preloads = /* @__PURE__ */ new Set();
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const form_value = action_result?.type === "success" || action_result?.type === "failure" ? action_result.data ?? null : null;
  let base$1 = base;
  let assets$1 = assets;
  let base_expression = s(base);
  if (!state.prerendering?.fallback) {
    const segments = event.url.pathname.slice(base.length).split("/").slice(2);
    base$1 = segments.map(() => "..").join("/") || ".";
    base_expression = `new URL(${s(base$1)}, location).pathname.slice(0, -1)`;
    if (!assets || assets[0] === "/" && assets !== SVELTE_KIT_ASSETS) {
      assets$1 = base$1;
    }
  }
  if (page_config.ssr) {
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        updated
      },
      constructors: await Promise.all(branch.map(({ node }) => node.component())),
      form: form_value
    };
    let data2 = {};
    for (let i = 0; i < branch.length; i += 1) {
      data2 = { ...data2, ...branch[i].data };
      props[`data_${i}`] = data2;
    }
    props.page = {
      error,
      params: (
        /** @type {Record<string, any>} */
        event.params
      ),
      route: event.route,
      status,
      url: event.url,
      data: data2,
      form: form_value,
      state: {}
    };
    override({ base: base$1, assets: assets$1 });
    {
      try {
        rendered = options2.root.render(props);
      } finally {
        reset();
      }
    }
    for (const { node } of branch) {
      for (const url of node.imports)
        modulepreloads.add(url);
      for (const url of node.stylesheets)
        stylesheets4.add(url);
      for (const url of node.fonts)
        fonts4.add(url);
      if (node.inline_styles) {
        Object.entries(await node.inline_styles()).forEach(([k, v]) => inline_styles.set(k, v));
      }
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let head = "";
  let body2 = rendered.html;
  const csp = new Csp(options2.csp, {
    prerender: !!state.prerendering
  });
  const prefixed = (path) => {
    if (path.startsWith("/")) {
      return base + path;
    }
    return `${assets$1}/${path}`;
  };
  if (inline_styles.size > 0) {
    const content = Array.from(inline_styles.values()).join("\n");
    const attributes = [];
    if (csp.style_needs_nonce)
      attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(content);
    head += `
	<style${attributes.join("")}>${content}</style>`;
  }
  for (const dep of stylesheets4) {
    const path = prefixed(dep);
    const attributes = ['rel="stylesheet"'];
    if (inline_styles.has(dep)) {
      attributes.push("disabled", 'media="(max-width: 0)"');
    } else {
      if (resolve_opts.preload({ type: "css", path })) {
        const preload_atts = ['rel="preload"', 'as="style"'];
        link_header_preloads.add(`<${encodeURI(path)}>; ${preload_atts.join(";")}; nopush`);
      }
    }
    head += `
		<link href="${path}" ${attributes.join(" ")}>`;
  }
  for (const dep of fonts4) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "font", path })) {
      const ext = dep.slice(dep.lastIndexOf(".") + 1);
      const attributes = [
        'rel="preload"',
        'as="font"',
        `type="font/${ext}"`,
        `href="${path}"`,
        "crossorigin"
      ];
      head += `
		<link ${attributes.join(" ")}>`;
    }
  }
  const global = `__sveltekit_${options2.version_hash}`;
  const { data, chunks } = get_data(
    event,
    options2,
    branch.map((b) => b.server_data),
    global
  );
  if (page_config.ssr && page_config.csr) {
    body2 += `
			${fetched.map(
      (item) => serialize_data(item, resolve_opts.filterSerializedResponseHeaders, !!state.prerendering)
    ).join("\n			")}`;
  }
  if (page_config.csr) {
    if (client.uses_env_dynamic_public && state.prerendering) {
      modulepreloads.add(`${options2.app_dir}/env.js`);
    }
    const included_modulepreloads = Array.from(modulepreloads, (dep) => prefixed(dep)).filter(
      (path) => resolve_opts.preload({ type: "js", path })
    );
    for (const path of included_modulepreloads) {
      link_header_preloads.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
      if (options2.preload_strategy !== "modulepreload") {
        head += `
		<link rel="preload" as="script" crossorigin="anonymous" href="${path}">`;
      } else if (state.prerendering) {
        head += `
		<link rel="modulepreload" href="${path}">`;
      }
    }
    const blocks = [];
    const load_env_eagerly = client.uses_env_dynamic_public && state.prerendering;
    const properties = [`base: ${base_expression}`];
    if (assets) {
      properties.push(`assets: ${s(assets)}`);
    }
    if (client.uses_env_dynamic_public) {
      properties.push(`env: ${load_env_eagerly ? "null" : s(public_env)}`);
    }
    if (chunks) {
      blocks.push("const deferred = new Map();");
      properties.push(`defer: (id) => new Promise((fulfil, reject) => {
							deferred.set(id, { fulfil, reject });
						})`);
      properties.push(`resolve: ({ id, data, error }) => {
							const { fulfil, reject } = deferred.get(id);
							deferred.delete(id);

							if (error) reject(error);
							else fulfil(data);
						}`);
    }
    blocks.push(`${global} = {
						${properties.join(",\n						")}
					};`);
    const args = ["app", "element"];
    blocks.push("const element = document.currentScript.parentElement;");
    if (page_config.ssr) {
      const serialized = { form: "null", error: "null" };
      blocks.push(`const data = ${data};`);
      if (form_value) {
        serialized.form = uneval_action_response(
          form_value,
          /** @type {string} */
          event.route.id
        );
      }
      if (error) {
        serialized.error = uneval(error);
      }
      const hydrate = [
        `node_ids: [${branch.map(({ node }) => node.index).join(", ")}]`,
        "data",
        `form: ${serialized.form}`,
        `error: ${serialized.error}`
      ];
      if (status !== 200) {
        hydrate.push(`status: ${status}`);
      }
      if (options2.embedded) {
        hydrate.push(`params: ${uneval(event.params)}`, `route: ${s(event.route)}`);
      }
      const indent = "	".repeat(load_env_eagerly ? 7 : 6);
      args.push(`{
${indent}	${hydrate.join(`,
${indent}	`)}
${indent}}`);
    }
    if (load_env_eagerly) {
      blocks.push(`import(${s(`${base$1}/${options2.app_dir}/env.js`)}).then(({ env }) => {
						${global}.env = env;

						Promise.all([
							import(${s(prefixed(client.start))}),
							import(${s(prefixed(client.app))})
						]).then(([kit, app]) => {
							kit.start(${args.join(", ")});
						});
					});`);
    } else {
      blocks.push(`Promise.all([
						import(${s(prefixed(client.start))}),
						import(${s(prefixed(client.app))})
					]).then(([kit, app]) => {
						kit.start(${args.join(", ")});
					});`);
    }
    if (options2.service_worker) {
      const opts = "";
      blocks.push(`if ('serviceWorker' in navigator) {
						addEventListener('load', function () {
							navigator.serviceWorker.register('${prefixed("service-worker.js")}'${opts});
						});
					}`);
    }
    const init_app = `
				{
					${blocks.join("\n\n					")}
				}
			`;
    csp.add_script(init_app);
    body2 += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_app}<\/script>
		`;
  }
  const headers2 = new Headers({
    "x-sveltekit-page": "true",
    "content-type": "text/html"
  });
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (state.prerendering.cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="${state.prerendering.cache}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  } else {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) {
      headers2.set("content-security-policy", csp_header);
    }
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) {
      headers2.set("content-security-policy-report-only", report_only_header);
    }
    if (link_header_preloads.size) {
      headers2.set("link", Array.from(link_header_preloads).join(", "));
    }
  }
  head += rendered.head;
  const html = options2.templates.app({
    head,
    body: body2,
    assets: assets$1,
    nonce: (
      /** @type {string} */
      csp.nonce
    ),
    env: safe_public_env
  });
  const transformed = await resolve_opts.transformPageChunk({
    html,
    done: true
  }) || "";
  if (!chunks) {
    headers2.set("etag", `"${hash(transformed)}"`);
  }
  return !chunks ? text(transformed, {
    status,
    headers: headers2
  }) : new Response(
    new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder$1.encode(transformed + "\n"));
        for await (const chunk of chunks) {
          controller.enqueue(encoder$1.encode(chunk));
        }
        controller.close();
      },
      type: "bytes"
    }),
    {
      headers: {
        "content-type": "text/html"
      }
    }
  );
}
function get_data(event, options2, nodes, global) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  function replacer(thing) {
    if (typeof thing?.then === "function") {
      const id = promise_id++;
      count += 1;
      thing.then(
        /** @param {any} data */
        (data) => ({ data })
      ).catch(
        /** @param {any} error */
        async (error) => ({
          error: await handle_error_and_jsonify(event, options2, error)
        })
      ).then(
        /**
         * @param {{data: any; error: any}} result
         */
        async ({ data, error }) => {
          count -= 1;
          let str;
          try {
            str = uneval({ id, data, error }, replacer);
          } catch (e) {
            error = await handle_error_and_jsonify(
              event,
              options2,
              new Error(`Failed to serialize promise while rendering ${event.route.id}`)
            );
            data = void 0;
            str = uneval({ id, data, error }, replacer);
          }
          push(`<script>${global}.resolve(${str})<\/script>
`);
          if (count === 0)
            done();
        }
      );
      return `${global}.defer(${id})`;
    }
  }
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      return `{"type":"data","data":${uneval(node.data, replacer)},${stringify_uses(node)}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `[${strings.join(",")}]`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
function get_option(nodes, option) {
  return nodes.reduce(
    (value, node) => {
      return (
        /** @type {Value} TypeScript's too dumb to understand this */
        node?.universal?.[option] ?? node?.server?.[option] ?? value
      );
    },
    /** @type {Value | undefined} */
    void 0
  );
}
async function respond_with_error({
  event,
  options: options2,
  manifest: manifest2,
  state,
  status,
  error,
  resolve_opts
}) {
  if (event.request.headers.get("x-sveltekit-error")) {
    return static_error_page(
      options2,
      status,
      /** @type {Error} */
      error.message
    );
  }
  const fetched = [];
  try {
    const branch = [];
    const default_layout = await manifest2._.nodes[0]();
    const ssr = get_option([default_layout], "ssr") ?? true;
    const csr = get_option([default_layout], "csr") ?? true;
    if (ssr) {
      state.error = true;
      const server_data_promise = load_server_data({
        event,
        state,
        node: default_layout,
        parent: async () => ({})
      });
      const server_data = await server_data_promise;
      const data = await load_data({
        event,
        fetched,
        node: default_layout,
        parent: async () => ({}),
        resolve_opts,
        server_data_promise,
        state,
        csr
      });
      branch.push(
        {
          node: default_layout,
          server_data,
          data
        },
        {
          node: await manifest2._.nodes[1](),
          // 1 is always the root error
          data: null,
          server_data: null
        }
      );
    }
    return await render_response({
      options: options2,
      manifest: manifest2,
      state,
      page_config: {
        ssr,
        csr
      },
      status,
      error: await handle_error_and_jsonify(event, options2, error),
      branch,
      fetched,
      event,
      resolve_opts
    });
  } catch (e) {
    if (e instanceof Redirect) {
      return redirect_response(e.status, e.location);
    }
    return static_error_page(
      options2,
      get_status(e),
      (await handle_error_and_jsonify(event, options2, e)).message
    );
  }
}
function once(fn) {
  let done = false;
  let result;
  return () => {
    if (done)
      return result;
    done = true;
    return result = fn();
  };
}
var encoder = new TextEncoder();
async function render_data(event, route, options2, manifest2, state, invalidated_data_nodes, trailing_slash) {
  if (!route.page) {
    return new Response(void 0, {
      status: 404
    });
  }
  try {
    const node_ids = [...route.page.layouts, route.page.leaf];
    const invalidated = invalidated_data_nodes ?? node_ids.map(() => true);
    let aborted = false;
    const url = new URL(event.url);
    url.pathname = normalize_path(url.pathname, trailing_slash);
    const new_event = { ...event, url };
    const functions = node_ids.map((n, i) => {
      return once(async () => {
        try {
          if (aborted) {
            return (
              /** @type {import('types').ServerDataSkippedNode} */
              {
                type: "skip"
              }
            );
          }
          const node = n == void 0 ? n : await manifest2._.nodes[n]();
          return load_server_data({
            event: new_event,
            state,
            node,
            parent: async () => {
              const data2 = {};
              for (let j = 0; j < i; j += 1) {
                const parent = (
                  /** @type {import('types').ServerDataNode | null} */
                  await functions[j]()
                );
                if (parent) {
                  Object.assign(data2, parent.data);
                }
              }
              return data2;
            }
          });
        } catch (e) {
          aborted = true;
          throw e;
        }
      });
    });
    const promises = functions.map(async (fn, i) => {
      if (!invalidated[i]) {
        return (
          /** @type {import('types').ServerDataSkippedNode} */
          {
            type: "skip"
          }
        );
      }
      return fn();
    });
    let length = promises.length;
    const nodes = await Promise.all(
      promises.map(
        (p, i) => p.catch(async (error) => {
          if (error instanceof Redirect) {
            throw error;
          }
          length = Math.min(length, i + 1);
          return (
            /** @type {import('types').ServerErrorNode} */
            {
              type: "error",
              error: await handle_error_and_jsonify(event, options2, error),
              status: error instanceof HttpError || error instanceof SvelteKitError ? error.status : void 0
            }
          );
        })
      )
    );
    const { data, chunks } = get_data_json(event, options2, nodes);
    if (!chunks) {
      return json_response(data);
    }
    return new Response(
      new ReadableStream({
        async start(controller) {
          controller.enqueue(encoder.encode(data));
          for await (const chunk of chunks) {
            controller.enqueue(encoder.encode(chunk));
          }
          controller.close();
        },
        type: "bytes"
      }),
      {
        headers: {
          // we use a proprietary content type to prevent buffering.
          // the `text` prefix makes it inspectable
          "content-type": "text/sveltekit-data",
          "cache-control": "private, no-store"
        }
      }
    );
  } catch (e) {
    const error = normalize_error(e);
    if (error instanceof Redirect) {
      return redirect_json_response(error);
    } else {
      return json_response(await handle_error_and_jsonify(event, options2, error), 500);
    }
  }
}
function json_response(json2, status = 200) {
  return text(typeof json2 === "string" ? json2 : JSON.stringify(json2), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store"
    }
  });
}
function redirect_json_response(redirect) {
  return json_response({
    type: "redirect",
    location: redirect.location
  });
}
function get_data_json(event, options2, nodes) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  const reducers = {
    /** @param {any} thing */
    Promise: (thing) => {
      if (typeof thing?.then === "function") {
        const id = promise_id++;
        count += 1;
        let key2 = "data";
        thing.catch(
          /** @param {any} e */
          async (e) => {
            key2 = "error";
            return handle_error_and_jsonify(
              event,
              options2,
              /** @type {any} */
              e
            );
          }
        ).then(
          /** @param {any} value */
          async (value) => {
            let str;
            try {
              str = stringify(value, reducers);
            } catch (e) {
              const error = await handle_error_and_jsonify(
                event,
                options2,
                new Error(`Failed to serialize promise while rendering ${event.route.id}`)
              );
              key2 = "error";
              str = stringify(error, reducers);
            }
            count -= 1;
            push(`{"type":"chunk","id":${id},"${key2}":${str}}
`);
            if (count === 0)
              done();
          }
        );
        return id;
      }
    }
  };
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      if (node.type === "error" || node.type === "skip") {
        return JSON.stringify(node);
      }
      return `{"type":"data","data":${stringify(node.data, reducers)},${stringify_uses(
        node
      )}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `{"type":"data","nodes":[${strings.join(",")}]}
`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
function load_page_nodes(page2, manifest2) {
  return Promise.all([
    // we use == here rather than === because [undefined] serializes as "[null]"
    ...page2.layouts.map((n) => n == void 0 ? n : manifest2._.nodes[n]()),
    manifest2._.nodes[page2.leaf]()
  ]);
}
var MAX_DEPTH = 10;
async function render_page(event, page2, options2, manifest2, state, resolve_opts) {
  if (state.depth > MAX_DEPTH) {
    return text(`Not found: ${event.url.pathname}`, {
      status: 404
      // TODO in some cases this should be 500. not sure how to differentiate
    });
  }
  if (is_action_json_request(event)) {
    const node = await manifest2._.nodes[page2.leaf]();
    return handle_action_json_request(event, options2, node?.server);
  }
  try {
    const nodes = await load_page_nodes(page2, manifest2);
    const leaf_node = (
      /** @type {import('types').SSRNode} */
      nodes.at(-1)
    );
    let status = 200;
    let action_result = void 0;
    if (is_action_request(event)) {
      action_result = await handle_action_request(event, leaf_node.server);
      if (action_result?.type === "redirect") {
        return redirect_response(action_result.status, action_result.location);
      }
      if (action_result?.type === "error") {
        status = get_status(action_result.error);
      }
      if (action_result?.type === "failure") {
        status = action_result.status;
      }
    }
    const should_prerender_data = nodes.some((node) => node?.server?.load);
    const data_pathname = add_data_suffix(event.url.pathname);
    const should_prerender = get_option(nodes, "prerender") ?? false;
    if (should_prerender) {
      const mod = leaf_node.server;
      if (mod?.actions) {
        throw new Error("Cannot prerender pages with actions");
      }
    } else if (state.prerendering) {
      return new Response(void 0, {
        status: 204
      });
    }
    state.prerender_default = should_prerender;
    const fetched = [];
    if (get_option(nodes, "ssr") === false && !(state.prerendering && should_prerender_data)) {
      return await render_response({
        branch: [],
        fetched,
        page_config: {
          ssr: false,
          csr: get_option(nodes, "csr") ?? true
        },
        status,
        error: null,
        event,
        options: options2,
        manifest: manifest2,
        state,
        resolve_opts
      });
    }
    const branch = [];
    let load_error = null;
    const server_promises = nodes.map((node, i) => {
      if (load_error) {
        throw load_error;
      }
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && action_result?.type === "error") {
            throw action_result.error;
          }
          return await load_server_data({
            event,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                const parent = await server_promises[j];
                if (parent)
                  Object.assign(data, await parent.data);
              }
              return data;
            }
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    const csr = get_option(nodes, "csr") ?? true;
    const load_promises = nodes.map((node, i) => {
      if (load_error)
        throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event,
            fetched,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                Object.assign(data, await load_promises[j]);
              }
              return data;
            },
            resolve_opts,
            server_data_promise: server_promises[i],
            state,
            csr
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    for (const p of server_promises)
      p.catch(() => {
      });
    for (const p of load_promises)
      p.catch(() => {
      });
    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (node) {
        try {
          const server_data = await server_promises[i];
          const data = await load_promises[i];
          branch.push({ node, server_data, data });
        } catch (e) {
          const err = normalize_error(e);
          if (err instanceof Redirect) {
            if (state.prerendering && should_prerender_data) {
              const body2 = JSON.stringify({
                type: "redirect",
                location: err.location
              });
              state.prerendering.dependencies.set(data_pathname, {
                response: text(body2),
                body: body2
              });
            }
            return redirect_response(err.status, err.location);
          }
          const status2 = get_status(err);
          const error = await handle_error_and_jsonify(event, options2, err);
          while (i--) {
            if (page2.errors[i]) {
              const index4 = (
                /** @type {number} */
                page2.errors[i]
              );
              const node2 = await manifest2._.nodes[index4]();
              let j = i;
              while (!branch[j])
                j -= 1;
              return await render_response({
                event,
                options: options2,
                manifest: manifest2,
                state,
                resolve_opts,
                page_config: { ssr: true, csr: true },
                status: status2,
                error,
                branch: compact(branch.slice(0, j + 1)).concat({
                  node: node2,
                  data: null,
                  server_data: null
                }),
                fetched
              });
            }
          }
          return static_error_page(options2, status2, error.message);
        }
      } else {
        branch.push(null);
      }
    }
    if (state.prerendering && should_prerender_data) {
      let { data, chunks } = get_data_json(
        event,
        options2,
        branch.map((node) => node?.server_data)
      );
      if (chunks) {
        for await (const chunk of chunks) {
          data += chunk;
        }
      }
      state.prerendering.dependencies.set(data_pathname, {
        response: text(data),
        body: data
      });
    }
    const ssr = get_option(nodes, "ssr") ?? true;
    return await render_response({
      event,
      options: options2,
      manifest: manifest2,
      state,
      resolve_opts,
      page_config: {
        csr: get_option(nodes, "csr") ?? true,
        ssr
      },
      status,
      error: null,
      branch: ssr === false ? [] : compact(branch),
      action_result,
      fetched
    });
  } catch (e) {
    return await respond_with_error({
      event,
      options: options2,
      manifest: manifest2,
      state,
      status: 500,
      error: e,
      resolve_opts
    });
  }
}
function exec(match, params, matchers) {
  const result = {};
  const values = match.slice(1);
  const values_needing_match = values.filter((value) => value !== void 0);
  let buffered = 0;
  for (let i = 0; i < params.length; i += 1) {
    const param = params[i];
    let value = values[i - buffered];
    if (param.chained && param.rest && buffered) {
      value = values.slice(i - buffered, i + 1).filter((s2) => s2).join("/");
      buffered = 0;
    }
    if (value === void 0) {
      if (param.rest)
        result[param.name] = "";
      continue;
    }
    if (!param.matcher || matchers[param.matcher](value)) {
      result[param.name] = value;
      const next_param = params[i + 1];
      const next_value = values[i + 1];
      if (next_param && !next_param.rest && next_param.optional && next_value && param.chained) {
        buffered = 0;
      }
      if (!next_param && !next_value && Object.keys(result).length === values_needing_match.length) {
        buffered = 0;
      }
      continue;
    }
    if (param.optional && param.chained) {
      buffered++;
      continue;
    }
    return;
  }
  if (buffered)
    return;
  return result;
}
var parse_1 = parse$1;
var serialize_1 = serialize;
var __toString = Object.prototype.toString;
var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
function parse$1(str, options2) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  var obj = {};
  var opt = options2 || {};
  var dec = opt.decode || decode;
  var index4 = 0;
  while (index4 < str.length) {
    var eqIdx = str.indexOf("=", index4);
    if (eqIdx === -1) {
      break;
    }
    var endIdx = str.indexOf(";", index4);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index4 = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    var key2 = str.slice(index4, eqIdx).trim();
    if (void 0 === obj[key2]) {
      var val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.charCodeAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key2] = tryDecode(val, dec);
    }
    index4 = endIdx + 1;
  }
  return obj;
}
function serialize(name2, val, options2) {
  var opt = options2 || {};
  var enc = opt.encode || encode;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name2)) {
    throw new TypeError("argument name is invalid");
  }
  var value = enc(val);
  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError("argument val is invalid");
  }
  var str = name2 + "=" + value;
  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    var expires = opt.expires;
    if (!isDate(expires) || isNaN(expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.partitioned) {
    str += "; Partitioned";
  }
  if (opt.priority) {
    var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low":
        str += "; Priority=Low";
        break;
      case "medium":
        str += "; Priority=Medium";
        break;
      case "high":
        str += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }
  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true:
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return str;
}
function decode(str) {
  return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
}
function encode(val) {
  return encodeURIComponent(val);
}
function isDate(val) {
  return __toString.call(val) === "[object Date]" || val instanceof Date;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch (e) {
    return str;
  }
}
function validate_options(options2) {
  if (options2?.path === void 0) {
    throw new Error("You must specify a `path` when setting, deleting or serializing cookies");
  }
}
function get_cookies(request, url, trailing_slash) {
  const header = request.headers.get("cookie") ?? "";
  const initial_cookies = parse_1(header, { decode: (value) => value });
  const normalized_url = normalize_path(url.pathname, trailing_slash);
  const new_cookies = {};
  const defaults = {
    httpOnly: true,
    sameSite: "lax",
    secure: url.hostname === "localhost" && url.protocol === "http:" ? false : true
  };
  const cookies = {
    // The JSDoc param annotations appearing below for get, set and delete
    // are necessary to expose the `cookie` library types to
    // typescript users. `@type {import('@sveltejs/kit').Cookies}` above is not
    // sufficient to do so.
    /**
     * @param {string} name
     * @param {import('cookie').CookieParseOptions} opts
     */
    get(name2, opts) {
      const c = new_cookies[name2];
      if (c && domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
        return c.value;
      }
      const decoder = opts?.decode || decodeURIComponent;
      const req_cookies = parse_1(header, { decode: decoder });
      const cookie = req_cookies[name2];
      return cookie;
    },
    /**
     * @param {import('cookie').CookieParseOptions} opts
     */
    getAll(opts) {
      const decoder = opts?.decode || decodeURIComponent;
      const cookies2 = parse_1(header, { decode: decoder });
      for (const c of Object.values(new_cookies)) {
        if (domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
          cookies2[c.name] = c.value;
        }
      }
      return Object.entries(cookies2).map(([name2, value]) => ({ name: name2, value }));
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('./page/types.js').Cookie['options']} options
     */
    set(name2, value, options2) {
      validate_options(options2);
      set_internal(name2, value, { ...defaults, ...options2 });
    },
    /**
     * @param {string} name
     *  @param {import('./page/types.js').Cookie['options']} options
     */
    delete(name2, options2) {
      validate_options(options2);
      cookies.set(name2, "", { ...options2, maxAge: 0 });
    },
    /**
     * @param {string} name
     * @param {string} value
     *  @param {import('./page/types.js').Cookie['options']} options
     */
    serialize(name2, value, options2) {
      validate_options(options2);
      let path = options2.path;
      if (!options2.domain || options2.domain === url.hostname) {
        path = resolve(normalized_url, path);
      }
      return serialize_1(name2, value, { ...defaults, ...options2, path });
    }
  };
  function get_cookie_header(destination, header2) {
    const combined_cookies = {
      // cookies sent by the user agent have lowest precedence
      ...initial_cookies
    };
    for (const key2 in new_cookies) {
      const cookie = new_cookies[key2];
      if (!domain_matches(destination.hostname, cookie.options.domain))
        continue;
      if (!path_matches(destination.pathname, cookie.options.path))
        continue;
      const encoder2 = cookie.options.encode || encodeURIComponent;
      combined_cookies[cookie.name] = encoder2(cookie.value);
    }
    if (header2) {
      const parsed = parse_1(header2, { decode: (value) => value });
      for (const name2 in parsed) {
        combined_cookies[name2] = parsed[name2];
      }
    }
    return Object.entries(combined_cookies).map(([name2, value]) => `${name2}=${value}`).join("; ");
  }
  function set_internal(name2, value, options2) {
    let path = options2.path;
    if (!options2.domain || options2.domain === url.hostname) {
      path = resolve(normalized_url, path);
    }
    new_cookies[name2] = { name: name2, value, options: { ...options2, path } };
  }
  return { cookies, new_cookies, get_cookie_header, set_internal };
}
function domain_matches(hostname, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized)
    return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized)
    return true;
  return path.startsWith(normalized + "/");
}
function add_cookies_to_headers(headers2, cookies) {
  for (const new_cookie of cookies) {
    const { name: name2, value, options: options2 } = new_cookie;
    headers2.append("set-cookie", serialize_1(name2, value, options2));
    if (options2.path.endsWith(".html")) {
      const path = add_data_suffix(options2.path);
      headers2.append("set-cookie", serialize_1(name2, value, { ...options2, path }));
    }
  }
}
var setCookie = { exports: {} };
var defaultParseOptions = {
  decodeValues: true,
  map: false,
  silent: false
};
function isNonEmptyString(str) {
  return typeof str === "string" && !!str.trim();
}
function parseString(setCookieValue, options2) {
  var parts = setCookieValue.split(";").filter(isNonEmptyString);
  var nameValuePairStr = parts.shift();
  var parsed = parseNameValuePair(nameValuePairStr);
  var name2 = parsed.name;
  var value = parsed.value;
  options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
  try {
    value = options2.decodeValues ? decodeURIComponent(value) : value;
  } catch (e) {
    console.error(
      "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
      e
    );
  }
  var cookie = {
    name: name2,
    value
  };
  parts.forEach(function(part) {
    var sides = part.split("=");
    var key2 = sides.shift().trimLeft().toLowerCase();
    var value2 = sides.join("=");
    if (key2 === "expires") {
      cookie.expires = new Date(value2);
    } else if (key2 === "max-age") {
      cookie.maxAge = parseInt(value2, 10);
    } else if (key2 === "secure") {
      cookie.secure = true;
    } else if (key2 === "httponly") {
      cookie.httpOnly = true;
    } else if (key2 === "samesite") {
      cookie.sameSite = value2;
    } else {
      cookie[key2] = value2;
    }
  });
  return cookie;
}
function parseNameValuePair(nameValuePairStr) {
  var name2 = "";
  var value = "";
  var nameValueArr = nameValuePairStr.split("=");
  if (nameValueArr.length > 1) {
    name2 = nameValueArr.shift();
    value = nameValueArr.join("=");
  } else {
    value = nameValuePairStr;
  }
  return { name: name2, value };
}
function parse(input, options2) {
  options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
  if (!input) {
    if (!options2.map) {
      return [];
    } else {
      return {};
    }
  }
  if (input.headers) {
    if (typeof input.headers.getSetCookie === "function") {
      input = input.headers.getSetCookie();
    } else if (input.headers["set-cookie"]) {
      input = input.headers["set-cookie"];
    } else {
      var sch = input.headers[Object.keys(input.headers).find(function(key2) {
        return key2.toLowerCase() === "set-cookie";
      })];
      if (!sch && input.headers.cookie && !options2.silent) {
        console.warn(
          "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
        );
      }
      input = sch;
    }
  }
  if (!Array.isArray(input)) {
    input = [input];
  }
  options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
  if (!options2.map) {
    return input.filter(isNonEmptyString).map(function(str) {
      return parseString(str, options2);
    });
  } else {
    var cookies = {};
    return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
      var cookie = parseString(str, options2);
      cookies2[cookie.name] = cookie;
      return cookies2;
    }, cookies);
  }
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString;
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  var cookiesStrings = [];
  var pos = 0;
  var start;
  var ch;
  var lastComma;
  var nextStart;
  var cookiesSeparatorFound;
  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  }
  function notSpecialChar() {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  }
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.substring(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}
setCookie.exports = parse;
setCookie.exports.parse = parse;
var parseString_1 = setCookie.exports.parseString = parseString;
var splitCookiesString_1 = setCookie.exports.splitCookiesString = splitCookiesString;
function create_fetch({ event, options: options2, manifest: manifest2, state, get_cookie_header, set_internal }) {
  const server_fetch = async (info, init2) => {
    const original_request = normalize_fetch_input(info, init2, event.url);
    let mode = (info instanceof Request ? info.mode : init2?.mode) ?? "cors";
    let credentials = (info instanceof Request ? info.credentials : init2?.credentials) ?? "same-origin";
    return options2.hooks.handleFetch({
      event,
      request: original_request,
      fetch: async (info2, init3) => {
        const request = normalize_fetch_input(info2, init3, event.url);
        const url = new URL(request.url);
        if (!request.headers.has("origin")) {
          request.headers.set("origin", event.url.origin);
        }
        if (info2 !== original_request) {
          mode = (info2 instanceof Request ? info2.mode : init3?.mode) ?? "cors";
          credentials = (info2 instanceof Request ? info2.credentials : init3?.credentials) ?? "same-origin";
        }
        if ((request.method === "GET" || request.method === "HEAD") && (mode === "no-cors" && url.origin !== event.url.origin || url.origin === event.url.origin)) {
          request.headers.delete("origin");
        }
        if (url.origin !== event.url.origin) {
          if (`.${url.hostname}`.endsWith(`.${event.url.hostname}`) && credentials !== "omit") {
            const cookie = get_cookie_header(url, request.headers.get("cookie"));
            if (cookie)
              request.headers.set("cookie", cookie);
          }
          return fetch(request);
        }
        const prefix = assets || base;
        const decoded = decodeURIComponent(url.pathname);
        const filename = (decoded.startsWith(prefix) ? decoded.slice(prefix.length) : decoded).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = manifest2.assets.has(filename);
        const is_asset_html = manifest2.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (state.read) {
            const type = is_asset ? manifest2.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            return new Response(state.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          }
          return await fetch(request);
        }
        if (credentials !== "omit") {
          const cookie = get_cookie_header(url, request.headers.get("cookie"));
          if (cookie) {
            request.headers.set("cookie", cookie);
          }
          const authorization = event.request.headers.get("authorization");
          if (authorization && !request.headers.has("authorization")) {
            request.headers.set("authorization", authorization);
          }
        }
        if (!request.headers.has("accept")) {
          request.headers.set("accept", "*/*");
        }
        if (!request.headers.has("accept-language")) {
          request.headers.set(
            "accept-language",
            /** @type {string} */
            event.request.headers.get("accept-language")
          );
        }
        const response = await respond(request, options2, manifest2, {
          ...state,
          depth: state.depth + 1
        });
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          for (const str of splitCookiesString_1(set_cookie)) {
            const { name: name2, value, ...options3 } = parseString_1(str);
            const path = options3.path ?? (url.pathname.split("/").slice(0, -1).join("/") || "/");
            set_internal(name2, value, {
              path,
              .../** @type {import('cookie').CookieSerializeOptions} */
              options3
            });
          }
        }
        return response;
      }
    });
  };
  return (input, init2) => {
    const response = server_fetch(input, init2);
    response.catch(() => {
    });
    return response;
  };
}
function normalize_fetch_input(info, init2, url) {
  if (info instanceof Request) {
    return info;
  }
  return new Request(typeof info === "string" ? new URL(info, url) : info, init2);
}
var body;
var etag;
var headers;
function get_public_env(request) {
  body ?? (body = `export const env=${JSON.stringify(public_env)}`);
  etag ?? (etag = `W/${Date.now()}`);
  headers ?? (headers = new Headers({
    "content-type": "application/javascript; charset=utf-8",
    etag
  }));
  if (request.headers.get("if-none-match") === etag) {
    return new Response(void 0, { status: 304, headers });
  }
  return new Response(body, { headers });
}
function get_page_config(nodes) {
  let current = {};
  for (const node of nodes) {
    if (!node?.universal?.config && !node?.server?.config)
      continue;
    current = {
      ...current,
      ...node?.universal?.config,
      ...node?.server?.config
    };
  }
  return Object.keys(current).length ? current : void 0;
}
var default_transform = ({ html }) => html;
var default_filter = () => false;
var default_preload = ({ type }) => type === "js" || type === "css";
var page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "POST"]);
var allowed_page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "OPTIONS"]);
async function respond(request, options2, manifest2, state) {
  const url = new URL(request.url);
  if (options2.csrf_check_origin) {
    const forbidden = is_form_content_type(request) && (request.method === "POST" || request.method === "PUT" || request.method === "PATCH" || request.method === "DELETE") && request.headers.get("origin") !== url.origin;
    if (forbidden) {
      const csrf_error = new HttpError(
        403,
        `Cross-site ${request.method} form submissions are forbidden`
      );
      if (request.headers.get("accept") === "application/json") {
        return json(csrf_error.body, { status: csrf_error.status });
      }
      return text(csrf_error.body.message, { status: csrf_error.status });
    }
  }
  let rerouted_path;
  try {
    rerouted_path = options2.hooks.reroute({ url: new URL(url) }) ?? url.pathname;
  } catch (e) {
    return text("Internal Server Error", {
      status: 500
    });
  }
  let decoded;
  try {
    decoded = decode_pathname(rerouted_path);
  } catch {
    return text("Malformed URI", { status: 400 });
  }
  let route = null;
  let params = {};
  if (base && !state.prerendering?.fallback) {
    if (!decoded.startsWith(base)) {
      return text("Not found", { status: 404 });
    }
    decoded = decoded.slice(base.length) || "/";
  }
  if (decoded === `/${options2.app_dir}/env.js`) {
    return get_public_env(request);
  }
  if (decoded.startsWith(`/${options2.app_dir}`)) {
    return text("Not found", { status: 404 });
  }
  const is_data_request = has_data_suffix(decoded);
  let invalidated_data_nodes;
  if (is_data_request) {
    decoded = strip_data_suffix(decoded) || "/";
    url.pathname = strip_data_suffix(url.pathname) + (url.searchParams.get(TRAILING_SLASH_PARAM) === "1" ? "/" : "") || "/";
    url.searchParams.delete(TRAILING_SLASH_PARAM);
    invalidated_data_nodes = url.searchParams.get(INVALIDATED_PARAM)?.split("").map((node) => node === "1");
    url.searchParams.delete(INVALIDATED_PARAM);
  }
  if (!state.prerendering?.fallback) {
    const matchers = await manifest2._.matchers();
    for (const candidate of manifest2._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match)
        continue;
      const matched = exec(match, candidate.params, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  let trailing_slash = void 0;
  const headers2 = {};
  let cookies_to_add = {};
  const event = {
    // @ts-expect-error `cookies` and `fetch` need to be created after the `event` itself
    cookies: null,
    // @ts-expect-error
    fetch: null,
    getClientAddress: state.getClientAddress || (() => {
      throw new Error(
        `${"@sveltejs/adapter-vercel"} does not specify getClientAddress. Please raise an issue`
      );
    }),
    locals: {},
    params,
    platform: state.platform,
    request,
    route: { id: route?.id ?? null },
    setHeaders: (new_headers) => {
      for (const key2 in new_headers) {
        const lower = key2.toLowerCase();
        const value = new_headers[key2];
        if (lower === "set-cookie") {
          throw new Error(
            "Use `event.cookies.set(name, value, options)` instead of `event.setHeaders` to set cookies"
          );
        } else if (lower in headers2) {
          throw new Error(`"${key2}" header is already set`);
        } else {
          headers2[lower] = value;
          if (state.prerendering && lower === "cache-control") {
            state.prerendering.cache = /** @type {string} */
            value;
          }
        }
      }
    },
    url,
    isDataRequest: is_data_request,
    isSubRequest: state.depth > 0
  };
  let resolve_opts = {
    transformPageChunk: default_transform,
    filterSerializedResponseHeaders: default_filter,
    preload: default_preload
  };
  try {
    if (route) {
      if (url.pathname === base || url.pathname === base + "/") {
        trailing_slash = "always";
      } else if (route.page) {
        const nodes = await load_page_nodes(route.page, manifest2);
        if (DEV)
          ;
        trailing_slash = get_option(nodes, "trailingSlash");
      } else if (route.endpoint) {
        const node = await route.endpoint();
        trailing_slash = node.trailingSlash;
        if (DEV)
          ;
      }
      if (!is_data_request) {
        const normalized = normalize_path(url.pathname, trailing_slash ?? "never");
        if (normalized !== url.pathname && !state.prerendering?.fallback) {
          return new Response(void 0, {
            status: 308,
            headers: {
              "x-sveltekit-normalize": "1",
              location: (
                // ensure paths starting with '//' are not treated as protocol-relative
                (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
              )
            }
          });
        }
      }
      if (state.before_handle || state.emulator?.platform) {
        let config3 = {};
        let prerender = false;
        if (route.endpoint) {
          const node = await route.endpoint();
          config3 = node.config ?? config3;
          prerender = node.prerender ?? prerender;
        } else if (route.page) {
          const nodes = await load_page_nodes(route.page, manifest2);
          config3 = get_page_config(nodes) ?? config3;
          prerender = get_option(nodes, "prerender") ?? false;
        }
        if (state.before_handle) {
          state.before_handle(event, config3, prerender);
        }
        if (state.emulator?.platform) {
          event.platform = await state.emulator.platform({ config: config3, prerender });
        }
      }
    }
    const { cookies, new_cookies, get_cookie_header, set_internal } = get_cookies(
      request,
      url,
      trailing_slash ?? "never"
    );
    cookies_to_add = new_cookies;
    event.cookies = cookies;
    event.fetch = create_fetch({
      event,
      options: options2,
      manifest: manifest2,
      state,
      get_cookie_header,
      set_internal
    });
    if (state.prerendering && !state.prerendering.fallback)
      disable_search(url);
    const response = await options2.hooks.handle({
      event,
      resolve: (event2, opts) => resolve2(event2, opts).then((response2) => {
        for (const key2 in headers2) {
          const value = headers2[key2];
          response2.headers.set(
            key2,
            /** @type {string} */
            value
          );
        }
        add_cookies_to_headers(response2.headers, Object.values(cookies_to_add));
        if (state.prerendering && event2.route.id !== null) {
          response2.headers.set("x-sveltekit-routeid", encodeURI(event2.route.id));
        }
        return response2;
      })
    });
    if (response.status === 200 && response.headers.has("etag")) {
      let if_none_match_value = request.headers.get("if-none-match");
      if (if_none_match_value?.startsWith('W/"')) {
        if_none_match_value = if_none_match_value.substring(2);
      }
      const etag2 = (
        /** @type {string} */
        response.headers.get("etag")
      );
      if (if_none_match_value === etag2) {
        const headers22 = new Headers({ etag: etag2 });
        for (const key2 of [
          "cache-control",
          "content-location",
          "date",
          "expires",
          "vary",
          "set-cookie"
        ]) {
          const value = response.headers.get(key2);
          if (value)
            headers22.set(key2, value);
        }
        return new Response(void 0, {
          status: 304,
          headers: headers22
        });
      }
    }
    if (is_data_request && response.status >= 300 && response.status <= 308) {
      const location = response.headers.get("location");
      if (location) {
        return redirect_json_response(new Redirect(
          /** @type {any} */
          response.status,
          location
        ));
      }
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      const response = is_data_request ? redirect_json_response(e) : route?.page && is_action_json_request(event) ? action_json_redirect(e) : redirect_response(e.status, e.location);
      add_cookies_to_headers(response.headers, Object.values(cookies_to_add));
      return response;
    }
    return await handle_fatal_error(event, options2, e);
  }
  async function resolve2(event2, opts) {
    try {
      if (opts) {
        resolve_opts = {
          transformPageChunk: opts.transformPageChunk || default_transform,
          filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter,
          preload: opts.preload || default_preload
        };
      }
      if (state.prerendering?.fallback) {
        return await render_response({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          page_config: { ssr: false, csr: true },
          status: 200,
          error: null,
          branch: [],
          fetched: [],
          resolve_opts
        });
      }
      if (route) {
        const method = (
          /** @type {import('types').HttpMethod} */
          event2.request.method
        );
        let response;
        if (is_data_request) {
          response = await render_data(
            event2,
            route,
            options2,
            manifest2,
            state,
            invalidated_data_nodes,
            trailing_slash ?? "never"
          );
        } else if (route.endpoint && (!route.page || is_endpoint_request(event2))) {
          response = await render_endpoint(event2, await route.endpoint(), state);
        } else if (route.page) {
          if (page_methods.has(method)) {
            response = await render_page(event2, route.page, options2, manifest2, state, resolve_opts);
          } else {
            const allowed_methods2 = new Set(allowed_page_methods);
            const node = await manifest2._.nodes[route.page.leaf]();
            if (node?.server?.actions) {
              allowed_methods2.add("POST");
            }
            if (method === "OPTIONS") {
              response = new Response(null, {
                status: 204,
                headers: {
                  allow: Array.from(allowed_methods2.values()).join(", ")
                }
              });
            } else {
              const mod = [...allowed_methods2].reduce(
                (acc, curr) => {
                  acc[curr] = true;
                  return acc;
                },
                /** @type {Record<string, any>} */
                {}
              );
              response = method_not_allowed(mod, method);
            }
          }
        } else {
          throw new Error("This should never happen");
        }
        if (request.method === "GET" && route.page && route.endpoint) {
          const vary = response.headers.get("vary")?.split(",")?.map((v) => v.trim().toLowerCase());
          if (!(vary?.includes("accept") || vary?.includes("*"))) {
            response = new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: new Headers(response.headers)
            });
            response.headers.append("Vary", "Accept");
          }
        }
        return response;
      }
      if (state.error && event2.isSubRequest) {
        return await fetch(request, {
          headers: {
            "x-sveltekit-error": "true"
          }
        });
      }
      if (state.error) {
        return text("Internal Server Error", {
          status: 500
        });
      }
      if (state.depth === 0) {
        return await respond_with_error({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          status: 404,
          error: new SvelteKitError(404, "Not Found", `Not found: ${event2.url.pathname}`),
          resolve_opts
        });
      }
      if (state.prerendering) {
        return text("not found", { status: 404 });
      }
      return await fetch(request);
    } catch (e) {
      return await handle_fatal_error(event2, options2, e);
    } finally {
      event2.cookies.set = () => {
        throw new Error("Cannot use `cookies.set(...)` after the response has been generated");
      };
      event2.setHeaders = () => {
        throw new Error("Cannot use `setHeaders(...)` after the response has been generated");
      };
    }
  }
}
function filter_private_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(private_prefix) && (public_prefix === "" || !k.startsWith(public_prefix))
    )
  );
}
function filter_public_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(public_prefix) && (private_prefix === "" || !k.startsWith(private_prefix))
    )
  );
}
var prerender_env_handler = {
  get({ type }, prop) {
    throw new Error(
      `Cannot read values from $env/dynamic/${type} while prerendering (attempted to read env.${prop.toString()}). Use $env/static/${type} instead`
    );
  }
};
var _options, _manifest;
var Server = class {
  /** @param {import('@sveltejs/kit').SSRManifest} manifest */
  constructor(manifest2) {
    /** @type {import('types').SSROptions} */
    __privateAdd(this, _options, void 0);
    /** @type {import('@sveltejs/kit').SSRManifest} */
    __privateAdd(this, _manifest, void 0);
    __privateSet(this, _options, options);
    __privateSet(this, _manifest, manifest2);
  }
  /**
   * @param {{
   *   env: Record<string, string>;
   *   read?: (file: string) => ReadableStream;
   * }} opts
   */
  async init({ env, read }) {
    const prefixes = {
      public_prefix: __privateGet(this, _options).env_public_prefix,
      private_prefix: __privateGet(this, _options).env_private_prefix
    };
    const private_env = filter_private_env(env, prefixes);
    const public_env2 = filter_public_env(env, prefixes);
    set_private_env(
      prerendering ? new Proxy({ type: "private" }, prerender_env_handler) : private_env
    );
    set_public_env(
      prerendering ? new Proxy({ type: "public" }, prerender_env_handler) : public_env2
    );
    set_safe_public_env(public_env2);
    if (!__privateGet(this, _options).hooks) {
      try {
        const module = await get_hooks();
        __privateGet(this, _options).hooks = {
          handle: module.handle || (({ event, resolve: resolve2 }) => resolve2(event)),
          handleError: module.handleError || (({ error }) => console.error(error)),
          handleFetch: module.handleFetch || (({ request, fetch: fetch2 }) => fetch2(request)),
          reroute: module.reroute || (() => {
          })
        };
      } catch (error) {
        {
          throw error;
        }
      }
    }
  }
  /**
   * @param {Request} request
   * @param {import('types').RequestOptions} options
   */
  async respond(request, options2) {
    return respond(request, __privateGet(this, _options), __privateGet(this, _manifest), {
      ...options2,
      error: false,
      depth: 0
    });
  }
};
_options = new WeakMap();
_manifest = new WeakMap();

// .svelte-kit/vercel-tmp/fn-1/manifest.js
var manifest = (() => {
  function __memo(fn) {
    let value;
    return () => value ?? (value = value = fn());
  }
  return {
    appDir: "_app",
    appPath: "_app",
    assets: /* @__PURE__ */ new Set(["favicon.png", "images/Intentional Health Color Palette - color-hex.com.png", "images/books/11/Download (1).jpeg", "images/books/12/41HNtcZrJIL._AC_SY780_.jpg", "images/books/13/vitaminum_buch-adipositas.jpg", "images/books/14/Download.jpeg", "images/books/15/61ttNVVSNGL._SL1200_.jpg", "images/books/16/615bfp88qmL._AC_UF1000,1000_QL80_.jpg", "images/books/19/81PGdHerZ7L._AC_UF1000,1000_QL80_.jpg", "images/books/20/61IZVC4ae7L._AC_UF894,1000_QL80_.jpg", "images/books/21/130877.jpg", "images/books/22/9783384006486.jpg", "images/books/23/LP_Desktop_Der-grosse-Cholesterin-Schwindel_968200.jpg", "images/books/24/134140.jpg", "images/books/25/Byebye-covid-2-1-1_600x600.png", "images/books/26/handbuch-der-kolloidalen-metalle_600x600.jpg", "images/books/27/Klinikhandbuch-Aromatherapie_600x600.png", "images/books/28/Arthrose_ist_heilbar_mockup_web-jpg_600x600.jpg", "images/books/29/Manuka_Buch_webshop-jpg_600x600.jpg", "images/books/3/Codex-Humanus_Band-400x400.png.webp", "images/books/30/em-eine-chance-fuer-unsere-erde-anne-lorch_600x600.jpg", "images/books/31/buch-borreliose-natuerlich-heilen-wolf-dieter-storl_600x600.jpg", "images/books/32/buch-pflanzliche-antibiotika-richtig-anwenden_600x600.jpg", "images/books/33/buch-die-leber-natuerlich-reinigen_600x600.jpg", "images/books/34/Borax_600x600.jpg", "images/books/35/CDL-Handbuch-LUBZ_600x600.jpg", "images/books/36/buch-cannabis-und-cannabidiol-cbd-richtig-anwenden_600x600.jpg", "images/books/37/DMSO-Handbuch_600x600.jpg", "images/books/38/9783742305466.jpg", "images/books/39/9783442136940.jpg", "images/books/4/48311634z.jpg", "images/books/6/csm_Bluthochdruck_sf_739bfc2751.png", "images/books/7/vitaminum_buch-alzheimer.png", "images/books/8/Download.jpeg", "images/books/9/61-3sI2vGcL.jpg", "images/books/no_cover.jpeg", "images/hai.jpg", "images/health color palette hex code.png", "images/logos/Amazon.de-Logo.svg.png", "images/logos/EBay_logo.png", "images/products/bedrop/propolis/be-pp-1.webp", "images/products/bedrop/propolis/be-pp-10.webp", "images/products/bedrop/propolis/be-pp-11.webp", "images/products/bedrop/propolis/be-pp-12.webp", "images/products/bedrop/propolis/be-pp-13.webp", "images/products/bedrop/propolis/be-pp-14.webp", "images/products/bedrop/propolis/be-pp-15.webp", "images/products/bedrop/propolis/be-pp-16.webp", "images/products/bedrop/propolis/be-pp-17.webp", "images/products/bedrop/propolis/be-pp-18.webp", "images/products/bedrop/propolis/be-pp-19.webp", "images/products/bedrop/propolis/be-pp-2.webp", "images/products/bedrop/propolis/be-pp-20.webp", "images/products/bedrop/propolis/be-pp-21.webp", "images/products/bedrop/propolis/be-pp-22.webp", "images/products/bedrop/propolis/be-pp-23.webp", "images/products/bedrop/propolis/be-pp-24.webp", "images/products/bedrop/propolis/be-pp-3.webp", "images/products/bedrop/propolis/be-pp-4.webp", "images/products/bedrop/propolis/be-pp-5.webp", "images/products/bedrop/propolis/be-pp-6.webp", "images/products/bedrop/propolis/be-pp-7.webp", "images/products/bedrop/propolis/be-pp-8.webp", "images/products/bedrop/propolis/be-pp-9.webp", "images/products/cellavita/bio-lebensmittel/1-maca-rot-beutel-einzeln_6_600x600.jpg", "images/products/cellavita/bio-lebensmittel/1-maca-schwarzbeutel-einzeln_1_600x600.jpg", "images/products/cellavita/bio-lebensmittel/1-produktfoto-maca-rot-glas_2_600x600.jpg", "images/products/cellavita/bio-lebensmittel/1-produktfoto-maca-schwarz8ivHrtJaMogPC_600x600.jpg", "images/products/cellavita/bio-lebensmittel/beutel-einzeln_300-kapseln_25_600x600.jpg", "images/products/cellavita/bio-lebensmittel/beutel-einzeln_300-kapseln_26_600x600.jpg", "images/products/cellavita/bio-lebensmittel/beutel-einzeln__11_600x600.jpg", "images/products/cellavita/bio-lebensmittel/beutel-einzeln_acerola_300-kapseln_3_600x600.jpg", "images/products/cellavita/bio-lebensmittel/beutel-einzeln_maca-500-kapseln_3_600x600.jpg", "images/products/cellavita/bio-lebensmittel/bio-gerstengras-pulver_flasche-kopie_1_600x600.jpg", "images/products/cellavita/bio-lebensmittel/bio-gerstengrassaft-pulver_flasche_frei-kopie_1_600x600.jpg", "images/products/cellavita/bio-lebensmittel/bio-weizengras-pulver_flasche_frei-kopie_7_600x600.jpg", "images/products/cellavita/bio-lebensmittel/bratlinge-5-1-setSq74FWw0X6KAD_600x600.jpg", "images/products/cellavita/bio-lebensmittel/dinkelbild_neu_ohne_banner_2_600x600.jpg", "images/products/cellavita/bio-lebensmittel/flasche-acerola-180-kapseln-shop_3_600x600.jpg", "images/products/cellavita/bio-lebensmittel/flasche-acerola-90g-neu-shop_6_600x600.jpg", "images/products/cellavita/bio-lebensmittel/flasche-tiere-acerola-90g-shop_3_600x600.jpg", "images/products/cellavita/bio-lebensmittel/front-acerola-1-kg-beutel-shop_10_600x600.jpg", "images/products/cellavita/bio-lebensmittel/front-acerola-500g-beutel-shop_6_600x600.jpg", "images/products/cellavita/bio-lebensmittel/front-aufbau-gold-700g-beutel-shop_5_600x600.jpg", "images/products/cellavita/bio-lebensmittel/front-chlorella-spirulina-pferd-5kg-shop_6_600x600.jpg", "images/products/cellavita/bio-lebensmittel/front-cordyceps-500-kps-shop_6_600x600.jpg", "images/products/cellavita/bio-lebensmittel/front-curcuma-500-g-shop_15_600x600.jpg", "images/products/cellavita/bio-lebensmittel/front-curcuma-pferde-5kg-shop_3_600x600.jpg", "images/products/cellavita/bio-lebensmittel/front-etikett-1kg-shop_10_600x600.jpg", "images/products/cellavita/bio-lebensmittel/front-flohsamenschalen-500-g-shop_3_600x600.jpg", "images/products/cellavita/bio-lebensmittel/front-gerstengras-500-g-shop_7_600x600.jpg", "images/products/cellavita/bio-lebensmittel/front-gerstengrassaft-etikett-400-g-shop_14_600x600.jpg", "images/products/cellavita/bio-lebensmittel/front-hagebutte-500-g-shop_2_600x600.jpg", "images/products/cellavita/bio-lebensmittel/front-hagebutte-pferde-5kg-shop_2_600x600.jpg", "images/products/cellavita/bio-lebensmittel/front-heidelberger-7-krai-uter-350-g-beutel-shopGBZSSiCEdh2hA_600x600.jpg", "images/products/cellavita/bio-lebensmittel/front-leinmehl-tiere-5kg-shop_1_600x600.jpg", "images/products/cellavita/bio-lebensmittel/front-ling-zhi-bio-250g-shop_3_600x600.jpg", "images/products/cellavita/bio-lebensmittel/gelee-royale-kapsen-frontal_1024x1024-2x_4_600x600.jpg", "images/products/cellavita/bio-lebensmittel/glas-aufbau-gold-100g-shop_2_600x600.jpg", "images/products/cellavita/bio-lebensmittel/glas-cordyceps-150k-shop_4_600x600.jpg", "images/products/cellavita/bio-lebensmittel/glas-curcuma-100g-shop_10_600x600.jpg", "images/products/cellavita/bio-lebensmittel/glas-curcuma-180k-shop_4_600x600.jpg", "images/products/cellavita/bio-lebensmittel/glas-curcuma-tiere-180-kps-shop_6_600x600.jpg", "images/products/cellavita/bio-lebensmittel/glas-flohsamenschalenpulver-150g-shop_2_600x600.jpg", "images/products/cellavita/bio-lebensmittel/glas-granatapfel-extrakt-vita-150-kps-shop_9_600x600.jpg", "images/products/cellavita/bio-lebensmittel/glas-hagebutte-vita-100g-shop_4_600x600.jpg", "images/products/cellavita/bio-lebensmittel/glas-heidelberger-7-krai-uter-80g-shopLOjXAiJy6fMpD_600x600.jpg", "images/products/cellavita/bio-lebensmittel/glas-ling-zhi-bio-120k-shop_3_600x600.jpg", "images/products/cellavita/bio-lebensmittel/glas-ling-zhi-bio-70g-shop_2_600x600.jpg", "images/products/cellavita/bio-lebensmittel/glas-spirulina-pur-tabs-100g-shop_8_600x600.jpg", "images/products/cellavita/bio-lebensmittel/ksm66_glas_14_600x600.jpg", "images/products/cellavita/bio-lebensmittel/produktfoto-maca-rot-180kapseln-glas_7_600x600.jpg", "images/products/cellavita/bio-lebensmittel/produktfoto-maca-schwarz-glas_6_600x600.jpg", "images/products/cellavita/bio-lebensmittel/produktfoto_aprikosenkerne_250g_shop_7_600x600.jpg", "images/products/cellavita/bio-lebensmittel/produktfoto_bio-leinsamenmehl_500g_shop_600x600.jpg", "images/products/cellavita/bio-lebensmittel/produktfoto_buchweizenflocken_500g_3_600x600.jpg", "images/products/cellavita/bio-lebensmittel/produktfoto_cashewkerne_250g_shop_2_600x600.jpg", "images/products/cellavita/bio-lebensmittel/produktfoto_glas_kokos__l__2_600x600.jpg", "images/products/cellavita/bio-lebensmittel/produktfoto_haferflocken_1_600x600.jpg", "images/products/cellavita/bio-lebensmittel/produktfoto_hanfsamen_250g_1_600x600.jpg", "images/products/cellavita/bio-lebensmittel/produktfoto_haseln__sse_250g_shop_1_600x600.jpg", "images/products/cellavita/bio-lebensmittel/produktfoto_k__rbiskerne_500g_2_600x600.jpg", "images/products/cellavita/bio-lebensmittel/produktfoto_leinsamen_500g_4_600x600.jpg", "images/products/cellavita/bio-lebensmittel/teezeit-20beutel_5_600x600.png", "images/products/cellavita/geraete/01_manschetten_zusammen_gebunden_3_600x600.jpg", "images/products/cellavita/geraete/02-mwo-antennen_18_600x600.jpg", "images/products/cellavita/geraete/094_klangwelten_gold_24_600x600.jpg", "images/products/cellavita/geraete/095_klangwelten_silver_25_600x600.jpg", "images/products/cellavita/geraete/099_koerpergleiter_2_600x600.jpg", "images/products/cellavita/geraete/1-geraet_27_600x600.jpg", "images/products/cellavita/geraete/100_eifix-260x260_600x600.jpg", "images/products/cellavita/geraete/10_5_600x600.jpg", "images/products/cellavita/geraete/11_5_600x600.jpg", "images/products/cellavita/geraete/20210119_114415_28_600x600.jpg", "images/products/cellavita/geraete/20220830_094145-shop_12_600x600.jpg", "images/products/cellavita/geraete/20220831_125727-shop_3_600x600.jpg", "images/products/cellavita/geraete/20230403_151119_28_600x600.jpg", "images/products/cellavita/geraete/20230403_151119_29_600x600.jpg", "images/products/cellavita/geraete/20230403_151119_30_600x600.jpg", "images/products/cellavita/geraete/2_26_600x600.jpg", "images/products/cellavita/geraete/3_40_600x600.jpg", "images/products/cellavita/geraete/ag-blanc_1_600x600.jpg", "images/products/cellavita/geraete/ag-cristal_1_600x600.jpg", "images/products/cellavita/geraete/ag-noir_1_600x600.jpg", "images/products/cellavita/geraete/ag_-_platin_600x600.jpg", "images/products/cellavita/geraete/airnergy-little-atmos-im-schlafzimmer-1030x1030_4_600x600.jpg", "images/products/cellavita/geraete/amfedilgpclmemgl_1_600x600.png", "images/products/cellavita/geraete/anschlusskabel-liegend_600x600.jpg", "images/products/cellavita/geraete/aromamischung_2500x2500_web_600x600.jpg", "images/products/cellavita/geraete/aromaset2shop_1_600x600.jpg", "images/products/cellavita/geraete/aromaset_1_2500x2500_web_600x600.jpg", "images/products/cellavita/geraete/aromaset_3_2500x2500thdgdybek5yqj_1_600x600.jpg", "images/products/cellavita/geraete/aromaset_4_2500x2500web_1_600x600.jpg", "images/products/cellavita/geraete/bild-1_27_600x600.png", "images/products/cellavita/geraete/bild-1_29_600x600.png", "images/products/cellavita/geraete/bild-1_32_600x600.png", "images/products/cellavita/geraete/bild-1_33_600x600.png", "images/products/cellavita/geraete/bild-winkelruten-4-1xHrOqHG9lLCsa_600x600.jpg", "images/products/cellavita/geraete/bp_4_600x600.jpg", "images/products/cellavita/geraete/cellalux-pulser-front-shop_2_600x600.jpg", "images/products/cellavita/geraete/eesm-elite-sleep-mat_10_600x600.jpeg", "images/products/cellavita/geraete/feinstrom_01_hr_7_600x600.jpg", "images/products/cellavita/geraete/filter_v2_2500x2500_2_600x600.jpg", "images/products/cellavita/geraete/filterset-k_11_600x600.jpg", "images/products/cellavita/geraete/filterset-k_12_600x600.jpg", "images/products/cellavita/geraete/filterset-k_13_600x600.jpg", "images/products/cellavita/geraete/frequenzen_shop_1_600x600.jpg", "images/products/cellavita/geraete/front-kapselhuellen-750-kps-shop_5_600x600.jpg", "images/products/cellavita/geraete/geno-neu_5_600x600.jpg", "images/products/cellavita/geraete/img_7988_3_600x600.jpg", "images/products/cellavita/geraete/kapselfuellmaschine-mit-beutel-shop_5_600x600.jpg", "images/products/cellavita/geraete/kornquetsche_nussbaum_9_600x600.png", "images/products/cellavita/geraete/kuechenfilter-k_3_600x600.jpg", "images/products/cellavita/geraete/kw_coverts_1280x1280_5_600x600.jpg", "images/products/cellavita/geraete/lr1_3_600x600.jpg", "images/products/cellavita/geraete/lrk4_4_600x600.jpg", "images/products/cellavita/geraete/luftreiniger-kueche-lrk2-ii_3_600x600.jpg", "images/products/cellavita/geraete/luftreiniger-lr4_52_0_2zbtmw1YVq9CZP_600x600.jpeg", "images/products/cellavita/geraete/luftreiniger-p-lr2-4_50_2_4_600x600.jpg", "images/products/cellavita/geraete/matresscover-calking-1_17_600x600.jpeg", "images/products/cellavita/geraete/matresscover-calking-1_18_600x600.jpeg", "images/products/cellavita/geraete/neowake_chromawatch_seitlich_aus_9_600x600.jpg", "images/products/cellavita/geraete/nfs4_8-schwarz_5_600x600.jpg", "images/products/cellavita/geraete/nfs4_8-weiss_7_600x600.jpg", "images/products/cellavita/geraete/nfs8-meile-119-22-300x217_14_600x600.jpg", "images/products/cellavita/geraete/nfs8-meile-1191-2-1-210x300_16_600x600.jpg", "images/products/cellavita/geraete/optimiererseitlichklein_7_600x600.jpg", "images/products/cellavita/geraete/piano-front_1_600x600.jpg", "images/products/cellavita/geraete/ppcynezllbjunybp_5_600x600.jpg", "images/products/cellavita/geraete/rute2_2_600x600.jpg", "images/products/cellavita/geraete/sativ-front-shop_2_600x600.jpg", "images/products/cellavita/geraete/saugnapf_1_600x600.jpg", "images/products/cellavita/geraete/set-basic_3_600x600.jpg", "images/products/cellavita/geraete/set-premium-freisteller_4_600x600.jpg", "images/products/cellavita/geraete/shop_0046-600x600_13_600x600.jpg", "images/products/cellavita/geraete/shop_0047_21_600x600.jpg", "images/products/cellavita/geraete/shop_brille_3_600x600.jpg", "images/products/cellavita/geraete/shop_nest_img_1306_2_600x600.jpg", "images/products/cellavita/geraete/shop_sd_cover_trilax_front_2_600x600.jpg", "images/products/cellavita/geraete/shop_vom-sandkorn-bis-zum-riesenstern_600x600.jpg", "images/products/cellavita/geraete/shop_wdr_front_600x600.jpg", "images/products/cellavita/geraete/smart_breathe_3_600x600.jpg", "images/products/cellavita/geraete/somnia-cover_600x600.jpg", "images/products/cellavita/geraete/stoffwechelprofis-flasche-blau-2_2_600x600.jpg", "images/products/cellavita/geraete/stoffwechelprofis-flasche-orange-2_2_600x600.jpg", "images/products/cellavita/geraete/stoffwechelprofis-flasche-silber-2_3_600x600.jpg", "images/products/cellavita/geraete/technik_12_4_600x600.jpg", "images/products/cellavita/geraete/tester-leitfaehigkeit_7_600x600.jpeg", "images/products/cellavita/geraete/therapiemagnet-2_600x600.jpg", "images/products/cellavita/geraete/um-universal-matte-2_16_600x600.jpg", "images/products/cellavita/geraete/v1_gold-1-600x600_17_600x600.jpg", "images/products/cellavita/geraete/v1_platin-600x600_27_600x600.jpg", "images/products/cellavita/geraete/voltmeter_einzeln_5_600x600.jpg", "images/products/cellavita/geraete/web_ms-foto_20221017_klangei_next_110_1_600x600.jpg", "images/products/cellavita/kinder/front-multi-c-kids-1250-t-shop_5_600x600.jpg", "images/products/cellavita/kinder/glas-calcium-kids-120g-neu-shop_6_600x600.jpg", "images/products/cellavita/kinder/glas-magnesium-kids-90g-shop_6_600x600.jpg", "images/products/cellavita/kinder/glas-multi-c-kids-180-ta-shop_3_600x600.jpg", "images/products/cellavita/kinder/nec_standard_NeutralTEHH9WAL8dwBy_600x600.png", "images/products/cellavita/kinder/vitamin-d3-kids_2_600x600.jpg", "images/products/cellavita/koerperpflege/01_bluetenfrische_glas_shop_10_600x600.jpg", "images/products/cellavita/koerperpflege/01_deocreme_vorteilspaket_10_600x600.jpg", "images/products/cellavita/koerperpflege/01_gingkolimette_glas_shop_10_600x600.jpg", "images/products/cellavita/koerperpflege/01_greentea_glas_shop_6_600x600.jpg", "images/products/cellavita/koerperpflege/01_mysticman_glas_shop_6_600x600.jpg", "images/products/cellavita/koerperpflege/Citovis-1_600x600.jpg", "images/products/cellavita/koerperpflege/Dermozym-2_600x600.jpg", "images/products/cellavita/koerperpflege/atheltic-fresh-2_1_600x600.jpg", "images/products/cellavita/koerperpflege/badeutensilien_mit_seife2_3_600x600.jpg", "images/products/cellavita/koerperpflege/beebalm_6_600x600.jpg", "images/products/cellavita/koerperpflege/beutel-einzeln__7_600x600.jpg", "images/products/cellavita/koerperpflege/bild6_kopie_1_600x600.jpg", "images/products/cellavita/koerperpflege/cellapure_haarseife_alge_01_7_600x600.jpg", "images/products/cellavita/koerperpflege/cellapure_haarseife_aloe_01_6_600x600.jpg", "images/products/cellavita/koerperpflege/cellapure_haarseife_brennnessel_01_8_600x600.jpg", "images/products/cellavita/koerperpflege/cellapure_haarseife_mango_01_5_600x600.jpg", "images/products/cellavita/koerperpflege/cellapure_haarseife_weizenkeim_01_3_600x600.jpg", "images/products/cellavita/koerperpflege/cellavita_artisan_rose_01_600x600.jpg", "images/products/cellavita/koerperpflege/cellavita_artisan_verveine_01_600x600.jpg", "images/products/cellavita/koerperpflege/front-basenbad-1kg-shop_5_600x600.jpg", "images/products/cellavita/koerperpflege/front-basenbad-5kg-shop_3_600x600.jpg", "images/products/cellavita/koerperpflege/glas-ohne-aufdruck_8_600x600.jpg", "images/products/cellavita/koerperpflege/haarseife_bier_front_5_600x600.jpg", "images/products/cellavita/koerperpflege/haarseife_bundle_v2_9_600x600.jpg", "images/products/cellavita/koerperpflege/image1_2_600x600.jpg", "images/products/cellavita/koerperpflege/jiaogulan-beutel-vorne_8_600x600.jpg", "images/products/cellavita/koerperpflege/jiaogulan-glas__9_600x600.jpg", "images/products/cellavita/koerperpflege/mineralgel_produktfoto_2_600x600.jpg", "images/products/cellavita/koerperpflege/mineralgel_produktfotos_vorrat_9_600x600.jpg", "images/products/cellavita/koerperpflege/nailserum-2_600x600.jpg", "images/products/cellavita/koerperpflege/produktfoto-teststreifen_6_600x600.jpg", "images/products/cellavita/koerperpflege/propolis-seife-1_3_600x600.jpg", "images/products/cellavita/koerperpflege/propolisdeo_1_600x600.jpg", "images/products/cellavita/kolloide/bild-kolloidales-germanium-50-ppm-200-ml_7_600x600.jpg", "images/products/cellavita/kolloide/bild-kolloidales-gold-30-ppm-200-ml_8_600x600.jpg", "images/products/cellavita/kolloide/nanosit-kolloidales-germanium-50-ppm-1000-ml_6_600x600.jpg", "images/products/cellavita/kolloide/nanosit-kolloidales-gold-30-ppm-1000-ml_1280x1280_6_600x600.jpg", "images/products/cellavita/kolloide/nanosit-kolloidales-kupfer-40-ppm-1000-ml_1280x1280_4_600x600.jpg", "images/products/cellavita/kolloide/nanosit-kolloidales-silber-100-ppm-1000-ml_1280x1280_7_600x600.jpg", "images/products/cellavita/kolloide/nanosit-kolloidales-zink-40-ppm-1000-ml_1280x1280_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/1-maca-rot-beutel-einzeln_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/1-maca-schwarzbeutel-einzeln_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/1-produktfoto-maca-rot-glas_2_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/1-produktfoto-maca-schwarz8ivHrtJaMogPC_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/1000x1000px_setsxlmefn7bmef1h_10_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/200mlikmv3cvyktayi_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/Brlauch200ml4er_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/Kardenwurzel200ml4er_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/Shaker_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/amino_beutel-einzeln__1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/ausleitungsprotokoll-klein-shop_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beecreamnew_16_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_300-kapseln_10_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_300-kapseln_17_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_300-kapseln_21_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_300-kapseln_22_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_300-kapseln_25_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_300-kapseln_26_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_300_kapseln_10_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_300_kapseln_12_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_300_kapseln_15_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_300_kapseln_7_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_300_kapseln__17_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_300_kapseln__1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_300_kapseln__24_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_300_kapseln__28_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_300_kapseln__30_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_300_kapseln__32_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_300_kapseln__8_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln__11_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln__15_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_acerola_300-kapseln_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_maca-500-kapseln_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_nac_300_kapseln_2_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/bio-gerstengras-pulver_flasche-kopie_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/bio-gerstengrassaft-pulver_flasche_frei-kopie_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/bio-weizengras-pulver_flasche_frei-kopie_7_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/brlauch100ml_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/brlauch200ml_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/calcium-1kg-beutel-einzeln__9_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/calcium-natur-glas-ohne-aufdruck_7_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/cilantrokoriander100ml_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/cilantrokoriander200ml4er3378_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/cilantrokoriander200ml_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/citexivir-3_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/citoethyl-gro-3_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/citovet-1_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/citovigor-1_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/citozym-1_2_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/d-tagatose_beutel-500g_einzelnuz0Tu8k97iZzK_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/d-tagatose_glas-160g_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/ducolzym-1_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/ergozym-1_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/ergozym-plus-3_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/flasche-acerola-180-kapseln-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/flasche-acerola-90g-neu-shop_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/flasche-ackerschachtelhalm-shop_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/flasche-alpha-liponsaeure-neu-180-kapseln_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-acerola-1-kg-beutel-shop_10_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-acerola-500g-beutel-shop_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-ackerschachtelhalm-etikett-500-g-beutel-shop_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-alpha-liponsaeure-500-neu-kps-beutel_13_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-aufbau-gold-700g-beutel-shop_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-coenzym-q10-500-kps-beutel-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-cordyceps-500-kps-shop_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-curcuma-500-g-shop_15_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-d-galactose-1kg-shop_8_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-d-galactose-500g-shop_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-d-mannose-500-g-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-d-ribose-500-g-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-etikett-1kg-shop_10_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-gehirn-1kg-shopFdlmIRv3V673C_600x600.jpeg", "images/products/cellavita/nahrungsergaenzung/front-gehirn-500-g-shop015MnnAAFSqhI_600x600.jpeg", "images/products/cellavita/nahrungsergaenzung/front-gerstengras-500-g-shop_7_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-gerstengrassaft-etikett-400-g-shop_14_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-haut-haare-500-kps-beutel-shop8WYrJHTbKgiuu_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-kalium-500-g-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-kalium-500-kps-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-l-arginin-500-g-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-l-carnitin-500-kps-shop_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-lein-protein-900-g-beutel-shop_2_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-ling-zhi-bio-250g-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-lithothamnium-1-kg-shop_7_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-magnesium-classic-1-kg-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-magnesium-mild-500-g-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-msm-1-kg-shop_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-msm-500-kps-shop_2_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-msm-spezial-1-kg-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-multi-c-kids-1250-t-shop_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-multi-c-kids-1250-t-shop_7_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-opc-500-g-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-pro-colon-420-g-2er-set-shaker-shop_7_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-pro-colon-420-g-3er-set-shaker-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-pro-colon-420-g-set-shaker-shop_11_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-pro-immun-500-kps-shop_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-sangokoralle-1kg-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-sangokoralle-500g-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-superfood-365-500g-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-superfood-triphala-500-g-kopie_7_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-vitamin-b-12-500-g-shop_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-vitamin-b-komplex-500-g-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-weihrauch-myrrhe-vita-500-g-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-weihrauch-vita-500-g-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-weizengras-500-g-shop_8_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-zink-selen-500-kps-shop_6_600x600.jpeg", "images/products/cellavita/nahrungsergaenzung/glas-astaxanthin-60-kaps-shop_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-aufbau-gold-100g-shop_2_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-bambus-extrakt-50g-shop_8_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-bor-150-kapseln-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-calcium-kids-120g-neu-shop_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-cellavita-forte-150k-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-coenzym-q10-180k-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-cordyceps-150k-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-curcuma-100g-shop_10_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-curcuma-180k-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-d-galactose-200g-shop_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-d-mannose-110g-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-d-ribose-160g-shop_8_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-eisen-mangan-kupfer-60kps-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-eisen-vitamin-c-90-kps-shopQsEfqPn0LOmjj_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-gehirn-200g-shopkqOL76y5F5cQA_600x600.jpeg", "images/products/cellavita/nahrungsergaenzung/glas-granatapfel-extrakt-vita-150-kps-shop_8_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-griffonia-120k-shop_7_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-haut-haare-150-kps-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-hyaluronsaeure-180k-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-jod-natur-120-kps-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-kalium-vita-120-kps-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-kalium-vita-250g-shop_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-knochen-bewegung-74g-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-l-arginin-150g-shopK8mLU9bdEaZLX_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-l-carnitin-120-kps-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-ling-zhi-bio-120k-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-ling-zhi-bio-70g-shop_2_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-lithothamnium-120g-shop_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-magnesium-120g-shop_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-magnesium-kids-90g-shop_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-magnesium-mild-180-kps-shop_7_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-magnesium-mild-90-g-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-mariendistel-120kps-shop_2_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-melatonin-60-kps-shop_2_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-msm-spezial-200g-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-msm-vita-100g-shop_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-msm-vita-150-kps-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-multi-c-kids-180-ta-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-nattokinase-90-kps-shop_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-ohne-aufdruck_9_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-olivenblattextrakt-90-kps-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-opc-100-g-shop_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-opc-60kps-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-pro-immun-90-kps-shop_8_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-sangokoralle-120g-shop_2_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-spirulina-pur-tabs-100g-shop_8_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-superfood-365-150-kps-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-vitamin-b-komplex-100g-shop_9_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-vitamin-b12-60-kps-shop_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-weihrauch-120-g-shop_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-weihrauch-extrakt-150-kps-shop_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-weihrauch-extrakt-50-g-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-weihrauch-myrrhe-120-g-shop_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-wild-yam-150-kps-shop_20_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/kardanwurzel200ml_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/kardenwurzel100ml_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/l-lysin_glas_11_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/mineral-p450-1_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/nec_standard_NeutralTEHH9WAL8dwBy_600x600.png", "images/products/cellavita/nahrungsergaenzung/omega-3-100ml-shop_13_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/omega-kapseln-algen_2_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/probiotic-p450-1_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktbildems_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktbildemsvorsorgepaketnawlmitbuvkw2_7_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto-glas-multi-c-180-tbl_11_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto-granatapfel-vita_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto-maca-rot-180kapseln-glas_7_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto-maca-schwarz-glas_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto-para-ex-shop_2_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto-vir-ex-vita_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto-vitamin-a_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto-vitamin-e_16_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto-weihrauch-myrrhe-gold_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto_d3_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto_d3_vorrat_5er_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto_glas_nac_kapseln_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto_glas_zink_selen_90_kps_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto_kiefernadelextrakt_1IR40HOZA3ONcP_600x600.jpeg", "images/products/cellavita/nahrungsergaenzung/produktfoto_lo__wenzahnextrakt_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto_milchs__ure_500ml_shop_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto_olivenblattextrakt_2_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto_rosenwurz_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto_vitamin_k2_shop_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfotomilchsure500ml5xvorsorgeshopkye8zvyqecidj_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/propoliscream_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/propolisdeo_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/propulzym-2_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/royallotion100ml-kopie_10_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/spruehflasche_2_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/vitamin-d3-hochdosiert_12_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/vitamin-d3-kids-vorsorge_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/vitamin-d3-kids_2_600x600.jpg", "images/products/cellavita/natur/1-bottle-with-box-propolis-10aOfyOkhZ3AgZq_600x600.jpg", "images/products/cellavita/natur/1-bottle-with-box-propolis-mundspray_600x600.jpg", "images/products/cellavita/natur/1500ml-Sprossenglas_600x600.jpg", "images/products/cellavita/natur/1500mlglas_600x600.jpg", "images/products/cellavita/natur/20220321_hempamed_de_cbd_premiumoel_10ml_rz_10-_box_bottle_4000px_3_600x600.png", "images/products/cellavita/natur/20220321_hempamed_de_cbd_premiumoel_10ml_rz_20-_box-bottle_4000px_1_600x600.png", "images/products/cellavita/natur/20220321_hempamed_de_cbd_premiumoel_10ml_rz_5-_box-bottle_4000px_1_600x600.png", "images/products/cellavita/natur/20_-tinktur-frontal_1024x1024-2x_3_600x600.jpg", "images/products/cellavita/natur/Bluetenpollenpulver_600x600.jpg", "images/products/cellavita/natur/Deckel_gross_600x600.jpg", "images/products/cellavita/natur/Deckel_klein_600x600.jpg", "images/products/cellavita/natur/SG_1000ml_600x600.jpg", "images/products/cellavita/natur/SG_750_800x800_600x600.jpg", "images/products/cellavita/natur/Set_I_1000_800x800_600x600.jpg", "images/products/cellavita/natur/Set__750_800x800_600x600.jpg", "images/products/cellavita/natur/beebalm_6_600x600.jpg", "images/products/cellavita/natur/beecreamnew_16_600x600.jpg", "images/products/cellavita/natur/blau1_8_600x600.jpg", "images/products/cellavita/natur/brlauch100ml_1_600x600.jpg", "images/products/cellavita/natur/brlauch200ml_1_600x600.jpg", "images/products/cellavita/natur/cilantrokoriander100ml_1_600x600.jpg", "images/products/cellavita/natur/cilantrokoriander200ml_1_600x600.jpg", "images/products/cellavita/natur/front-apfelpektin-600g-shop_8_600x600.jpg", "images/products/cellavita/natur/front-bentonit-1-kg-beutel-shopiFkZHdcBVh1F2_600x600.jpg", "images/products/cellavita/natur/front-flohsamenschalen-500-g-shop_3_600x600.jpg", "images/products/cellavita/natur/front-heidelberger-7-krai-uter-350-g-beutel-shopGBZSSiCEdh2hA_600x600.jpg", "images/products/cellavita/natur/front-zeolith-1-kg-shop_4_600x600.jpg", "images/products/cellavita/natur/front-zeolith-500g-shop_5_600x600.jpg", "images/products/cellavita/natur/front-zeolith-bentonit-1-kg-shop9HoGn1LZqtoRD_600x600.jpg", "images/products/cellavita/natur/gelee-royale-kapsen-frontal_1024x1024-2x_4_600x600.jpg", "images/products/cellavita/natur/glas-bentonit-140g-shop_3_600x600.jpg", "images/products/cellavita/natur/glas-flohsamenschalenpulver-150g-shop_2_600x600.jpg", "images/products/cellavita/natur/glas-heidelberger-7-krai-uter-80g-shopLOjXAiJy6fMpD_600x600.jpg", "images/products/cellavita/natur/glas-zeolith-bentonit-140-g-shopFBo1AXfCVDvww_600x600.jpg", "images/products/cellavita/natur/h-loesung_kl-600x906_7_600x600.jpg", "images/products/cellavita/natur/kardanwurzel200ml_1_600x600.jpg", "images/products/cellavita/natur/kardenwurzel100ml_1_600x600.jpg", "images/products/cellavita/natur/keimkiste-gross_3_600x600.jpg", "images/products/cellavita/natur/keimkiste_klein_2_600x600.png", "images/products/cellavita/natur/manuka-honigwithhoneyspoon_bigger_new_8_600x600.jpg", "images/products/cellavita/natur/manuka_loffel_deckeloffen_2kopie_1024x1024-2x_7_600x600.jpg", "images/products/cellavita/natur/nec_standard_NeutralTEHH9WAL8dwBy_600x600.png", "images/products/cellavita/natur/ortho-2_5_600x600.jpg", "images/products/cellavita/natur/p3299231-quer-freigestellt_5_600x600.png", "images/products/cellavita/natur/produktfoto-granatapfel-vita_4_600x600.jpg", "images/products/cellavita/natur/produktfoto-para-ex-shop_2_600x600.jpg", "images/products/cellavita/natur/produktfoto_aprikosenkerne_250g_shop_7_600x600.jpg", "images/products/cellavita/natur/produktfoto_glas_kokos__l__2_600x600.jpg", "images/products/cellavita/natur/produktfoto_kiefernadelextrakt_1IR40HOZA3ONcP_600x600.jpeg", "images/products/cellavita/natur/produktfoto_lo__wenzahnextrakt_3_600x600.jpg", "images/products/cellavita/natur/produktfoto_olivenblattextrakt_2_600x600.jpg", "images/products/cellavita/natur/produktfoto_rosenwurz_3_600x600.jpg", "images/products/cellavita/natur/propolis-kapseln-frontal_1024x1024-2x_4_600x600.jpg", "images/products/cellavita/natur/propolis-seife-1_3_600x600.jpg", "images/products/cellavita/natur/propoliscream_4_600x600.jpg", "images/products/cellavita/natur/propolisdeo_1_600x600.jpg", "images/products/cellavita/natur/royallotion100ml-kopie_10_600x600.jpg", "images/products/cellavita/natur/sprossen_set_1500ml_600x600.jpg", "images/products/cellavita/natur/system_ii_1000_wei___800x800_600x600.jpg", "images/products/cellavita/natur/system_ii_750_wei___800x800_600x600.jpg", "images/products/cellavita/reinigung/allzweckreiniger-flasche-frei-2s98PTSdeOAk9O_600x600.png", "images/products/cellavita/reinigung/allzweckreiniger-set-frei-2ev5nfOTfhcA22_600x600.png", "images/products/cellavita/reinigung/atme-durch_5_600x600.png", "images/products/cellavita/reinigung/bewegungsfreude_5_600x600.png", "images/products/cellavita/reinigung/bild-cdl-100-ml-weiss-neu9YkuYw16AezcZ_600x600.jpg", "images/products/cellavita/reinigung/borellisan_5_600x600.png", "images/products/cellavita/reinigung/denkfit_6_600x600.png", "images/products/cellavita/reinigung/herzensbluete_16_600x600.png", "images/products/cellavita/reinigung/immuzauber_7_600x600.png", "images/products/cellavita/reinigung/magdasan_6_600x600.png", "images/products/cellavita/reinigung/p1033209_7_600x600.jpg", "images/products/cellavita/reinigung/produktfoto-c60-100ml_3_600x600.jpg", "images/products/cellavita/reinigung/produktfoto-cio-2-500ml_6_600x600.jpg", "images/products/cellavita/reinigung/produktfoto-dmso-500-ml_2_600x600.jpg", "images/products/cellavita/reinigung/produktfoto-dmso_600x600.jpg", "images/products/cellavita/reinigung/ruhepol_6_600x600.png", "images/products/kronenberg/Nahrungsergaenzung/agaricus-blazei-murrill-mandelpilz-120g.png", "images/products/kronenberg/Nahrungsergaenzung/aloe-vera-frischpflanzensaft-mit-honig-plus-vitamin-c.png", "images/products/kronenberg/Nahrungsergaenzung/amalaki-ayurveda-pulver-organisch.png", "images/products/kronenberg/Nahrungsergaenzung/amino-komplex-17-17-essentielle-aminosaeuren.png", "images/products/kronenberg/Nahrungsergaenzung/anorganischer-schwefel-min-999-pulver.png", "images/products/kronenberg/Nahrungsergaenzung/artemisia-annua-einjaehriger-beifuss-pulver-das-echte.png", "images/products/kronenberg/Nahrungsergaenzung/artemisia-annua-kapseln-einjaehriger-beifuss.png", "images/products/kronenberg/Nahrungsergaenzung/artemisia-annua-oxymel-compositum-alkoholfrei.png", "images/products/kronenberg/Nahrungsergaenzung/artemisia-annua-plus-rosmarin-vitamin-c.png", "images/products/kronenberg/Nahrungsergaenzung/artemisia-annua-samen-qing-hao-gvk-spezial.png", "images/products/kronenberg/Nahrungsergaenzung/artemisia-annua-ultraschall-extraktion-mit-schungitwasser.png", "images/products/kronenberg/Nahrungsergaenzung/bernsteinsaeure-hpmc-kapseln-plus-vitamin-c.png", "images/products/kronenberg/Nahrungsergaenzung/bio-camu-camu-pulver-viel-vitamin-c.png", "images/products/kronenberg/Nahrungsergaenzung/biota-em-effektive-mikroorganismen-500ml.png", "images/products/kronenberg/Nahrungsergaenzung/bockshornklee-extrakt-ein-vielseitiges-kraut.png", "images/products/kronenberg/Nahrungsergaenzung/bockshornklee-kur-diffuser-haarausfall-kapseln-tee-tinktur.png", "images/products/kronenberg/Nahrungsergaenzung/bockshornklee-tee-samen-200g.png", "images/products/kronenberg/Nahrungsergaenzung/braunalge-knotentang-ascophyllum-nodosum.png", "images/products/kronenberg/Nahrungsergaenzung/calcium-kalium-magnesium-kombination.png", "images/products/kronenberg/Nahrungsergaenzung/catuaba-erythroxylum-pulver.png", "images/products/kronenberg/Nahrungsergaenzung/catuaba-tee-der-tupi-indianer-aus-dem-amazonas-regenwald.png", "images/products/kronenberg/Nahrungsergaenzung/catumupu-catuaba-muira-puama-tinktur.png", "images/products/kronenberg/Nahrungsergaenzung/chaga-pilz-tee-bio-qualitaet-wildsammlung.png", "images/products/kronenberg/Nahrungsergaenzung/chanca-piedra-steinbrecher.png", "images/products/kronenberg/Nahrungsergaenzung/coenzym-q10-vegan-90-kapseln.png", "images/products/kronenberg/Nahrungsergaenzung/copaiba-oel-100-natuerlich.png", "images/products/kronenberg/Nahrungsergaenzung/cordyceps-cordycepin-all-in-one-schmelzpastillen.png", "images/products/kronenberg/Nahrungsergaenzung/cordyceps-cordycepin-lyophilized-schmelzpastille-10mgpastille.png", "images/products/kronenberg/Nahrungsergaenzung/eisen-frucht-muttersaft-supermix-330-ml.png", "images/products/kronenberg/Nahrungsergaenzung/eisenbisglycinat-eisen-pulver-100g.png", "images/products/kronenberg/Nahrungsergaenzung/extase-aphrodisiakum-catuaba-muira-puama-rinden-tee.png", "images/products/kronenberg/Nahrungsergaenzung/goldene-milch-paste-kurkuma-power.png", "images/products/kronenberg/Nahrungsergaenzung/graviola-annona-muricata-blaetter-wildsammlung.png", "images/products/kronenberg/Nahrungsergaenzung/graviola-extrakt-annona-muricata-superfood.png", "images/products/kronenberg/Nahrungsergaenzung/gruenes-wunder-chlorella-gerstengras-spirulina-weizengras-.png", "images/products/kronenberg/Nahrungsergaenzung/hacheney-hyperwasser-mit-kolloidalem-silizium.png", "images/products/kronenberg/Nahrungsergaenzung/hagebutten-extrakt-100-natur.png", "images/products/kronenberg/Nahrungsergaenzung/hair-power-kur-bockshornklee-kapseln-60-stk.png", "images/products/kronenberg/Nahrungsergaenzung/holunder-beeren-extrakt-antioxidans.png", "images/products/kronenberg/Nahrungsergaenzung/hyaluronsaeure-plus-glucosamin-und-chondroitin-60-kapseln.png", "images/products/kronenberg/Nahrungsergaenzung/juglandis-kur-nach-dr-hulda-clark-kraeuter-tee-aperitif.png", "images/products/kronenberg/Nahrungsergaenzung/katzenkralle-sangre-de-grado-100g-tee-amazonas-regenwald-.png", "images/products/kronenberg/Nahrungsergaenzung/kiefernnadel-und-sprossen-wuerzeextrakt-ultraschall-extraktion.png", "images/products/kronenberg/Nahrungsergaenzung/koriander-co-schwermetall-ausleitung-im-sparpaket.png", "images/products/kronenberg/Nahrungsergaenzung/koriander-extrakt-ultraschall-extraktion-100ml.png", "images/products/kronenberg/Nahrungsergaenzung/kraeutertee-aperitif-lymphe-abies.png", "images/products/kronenberg/Nahrungsergaenzung/kraeutertee-aperitif-niere-ren.png", "images/products/kronenberg/Nahrungsergaenzung/l-arginin-base-pulver-vegan.png", "images/products/kronenberg/Nahrungsergaenzung/l-carnitin-base-pulver-100.png", "images/products/kronenberg/Nahrungsergaenzung/l-tryptophan-mit-b-vitaminen-und-folsaeure-60-hpmc-kapseln.png", "images/products/kronenberg/Nahrungsergaenzung/l-tryptophan-pulver-aus-fermentation.png", "images/products/kronenberg/Nahrungsergaenzung/lapacho-rinden-tee-aus-dem-amazonas-regenwald.png", "images/products/kronenberg/Nahrungsergaenzung/licht-edel-schungit-wasser-energetikum.png", "images/products/kronenberg/Nahrungsergaenzung/liposomale-artemisia-annua-ultraschall-extraktion-50ml.png", "images/products/kronenberg/Nahrungsergaenzung/liposomale-moringa-morisana-ultraschall-extraktion.png", "images/products/kronenberg/Nahrungsergaenzung/loewenzahnkraut-wuerze-extrakt-ultraschall-extraktion.png", "images/products/kronenberg/Nahrungsergaenzung/magnesium-plus-b-vitamine-kapseln.png", "images/products/kronenberg/Nahrungsergaenzung/meerrettich-extract-ultraschall-extraktion.png", "images/products/kronenberg/Nahrungsergaenzung/meerwasser-agua-de-mar-mit-schungit-wasser.png", "images/products/kronenberg/Nahrungsergaenzung/moringa-miracle-suppe-20-portionen-gmo-frei.png", "images/products/kronenberg/Nahrungsergaenzung/moringa-morisana-gesundheit-spar-paket.png", "images/products/kronenberg/Nahrungsergaenzung/moringa-morisana-plus-artemisia-annua-kombi-paket.png", "images/products/kronenberg/Nahrungsergaenzung/moringa-morisana-premium-mit-vitamin-b12.png", "images/products/kronenberg/Nahrungsergaenzung/moringa-morisana-premium-pulver-300g-monatspackung.png", "images/products/kronenberg/Nahrungsergaenzung/moringa-samen-in-kapsel-100-pures-samenpulver.png", "images/products/kronenberg/Nahrungsergaenzung/moringa-samenpulver-100-fein-gemahlen-20g.png", "images/products/kronenberg/Nahrungsergaenzung/msm-organischer-schwefel-reinheitsgrad-999.png", "images/products/kronenberg/Nahrungsergaenzung/muira-puama-pulver-potenzbaum-im-amazonas-regenwald.png", "images/products/kronenberg/Nahrungsergaenzung/muira-puama-tee-aphrodisiakum-amazonas-regenwald.png", "images/products/kronenberg/Nahrungsergaenzung/multivitamin-mineral-60-kapseln.png", "images/products/kronenberg/Nahrungsergaenzung/mulungu-das-schlaf-elixier-der-indianer-90-stk.png", "images/products/kronenberg/Nahrungsergaenzung/natriumhydrogencarbonat-pharm-qualitaet.png", "images/products/kronenberg/Nahrungsergaenzung/noni-100-direktsaft.png", "images/products/kronenberg/Nahrungsergaenzung/nopal-kapseln-feigenkaktus-opuntia-ficus-indica-vegan.png", "images/products/kronenberg/Nahrungsergaenzung/omega-3-lachsoelkapseln-mit-vitamin-e.png", "images/products/kronenberg/Nahrungsergaenzung/oregano-oel-wilder-majoran-carvacrol-80.png", "images/products/kronenberg/Nahrungsergaenzung/organisches-agnimantha-churnaya-ayurveda-pulver-90g.png", "images/products/kronenberg/Nahrungsergaenzung/organisches-ashwagandha-ayurveda-pulver.png", "images/products/kronenberg/Nahrungsergaenzung/organisches-brahmi-ayurveda-pulver.png", "images/products/kronenberg/Nahrungsergaenzung/organisches-giloy-ayurveda-pulver.png", "images/products/kronenberg/Nahrungsergaenzung/organisches-patadi-churnaya-ayurveda-pulver-90g.png", "images/products/kronenberg/Nahrungsergaenzung/organisches-shatavari-ayurveda-pulver.png", "images/products/kronenberg/Nahrungsergaenzung/organisches-swastha-churnaya-ayurveda-pulver-90g.png", "images/products/kronenberg/Nahrungsergaenzung/organisches-trivala-ayurveda-pulver.png", "images/products/kronenberg/Nahrungsergaenzung/original-urs-surbeck-energetisches-wasser-gesunde-balance.png", "images/products/kronenberg/Nahrungsergaenzung/pure-formula-stoffwechsel-90-kapseln.png", "images/products/kronenberg/Nahrungsergaenzung/safran-extrakt-mit-curcumin-gueteklasse-1-15ml.png", "images/products/kronenberg/Nahrungsergaenzung/sango-meeres-korallen-pures-pulver-original-aus-okinawa.png", "images/products/kronenberg/Nahrungsergaenzung/sangre-de-drago-100-aus-wildsammlung.png", "images/products/kronenberg/Nahrungsergaenzung/schamblumenblueten-blau-clitoria-ternatea-flores-100g.png", "images/products/kronenberg/Nahrungsergaenzung/schatz-der-inkas-trunk-der-goetter-amazonas-regenwald-tee.png", "images/products/kronenberg/Nahrungsergaenzung/schwarzkuemmel-oel-kaltpressung-gefiltert-100ml.png", "images/products/kronenberg/Nahrungsergaenzung/schwarzkuemmel-pulver-nigella-sativa-premiumqualitaet.png", "images/products/kronenberg/Nahrungsergaenzung/spirulina-tropfenextrakt-100-ml.png", "images/products/kronenberg/Nahrungsergaenzung/stauden-sellerie-pulver-inspiriert-durch-medical-food-monatskur.png", "images/products/kronenberg/Nahrungsergaenzung/strophanthus-kombe-saatgut-strophanthin.png", "images/products/kronenberg/Nahrungsergaenzung/suessholzwurzel-natur-gemahlen-lakritzpulver.png", "images/products/kronenberg/Nahrungsergaenzung/traubenkern-opc-ultraschall-extrakt-mit-schungit-wasser.png", "images/products/kronenberg/Nahrungsergaenzung/tri-magnesiumdicitrat-zaehne-knochen-muskeln.png", "images/products/kronenberg/Nahrungsergaenzung/urs-surbeck-energetisches-wasser-wohlfuehlflasche-50ml.png", "images/products/kronenberg/Nahrungsergaenzung/vitalpilze-6-fach-pilzkomplex-extrakt.png", "images/products/kronenberg/Nahrungsergaenzung/vitamin-b12-pure-power-plus-l-carnitin-vitamin-d-und-c.png", "images/products/kronenberg/Nahrungsergaenzung/vitamin-k2-plus-vitamin-d3-plus-calcium.png", "images/products/kronenberg/Nahrungsergaenzung/weidenrinde-purpurweide-geschnitten-mit-nat-salicin.png", "images/products/kronenberg/Nahrungsergaenzung/weidenrinden-purpurweide-ultraschall-extrakt.png", "images/products/kronenberg/Nahrungsergaenzung/weidenroeschen-kleinbluetig-ultraschall-extraktion.png", "images/products/kronenberg/Nahrungsergaenzung/weih-muri-weihrauch-und-myrrhe-extrakt.png", "images/products/kronenberg/Nahrungsergaenzung/zimtblaetteroel-100-reines-aetherisches-oel-10ml.png", "images/products/kronenberg/TeeKr\xE4uterPulver/988-pures-artemisiaartemisinin-90-vegi-kapseln.png", "images/products/kronenberg/TeeKr\xE4uterPulver/agaricus-blazei-murrill-mandelpilz-120g.png", "images/products/kronenberg/TeeKr\xE4uterPulver/amalaki-ayurveda-pulver-organisch.png", "images/products/kronenberg/TeeKr\xE4uterPulver/artemisia-annua-100-reine-blaetter-100g.png", "images/products/kronenberg/TeeKr\xE4uterPulver/artemisia-annua-einjaehriger-beifuss-pulver-das-echte.png", "images/products/kronenberg/TeeKr\xE4uterPulver/artemisia-annua-kapseln-einjaehriger-beifuss.png", "images/products/kronenberg/TeeKr\xE4uterPulver/artemisia-annua-oxymel-compositum-alkoholfrei.png", "images/products/kronenberg/TeeKr\xE4uterPulver/artemisia-annua-salbe-moringa-samen-pulver-dmso.png", "images/products/kronenberg/TeeKr\xE4uterPulver/artemisia-annua-samen-qing-hao-gvk-spezial.png", "images/products/kronenberg/TeeKr\xE4uterPulver/artemisia-annua-ultraschall-extraktion-mit-schungitwasser.png", "images/products/kronenberg/TeeKr\xE4uterPulver/ayurveda-tee-mischung-harmonie.png", "images/products/kronenberg/TeeKr\xE4uterPulver/bio-camu-camu-pulver-viel-vitamin-c.png", "images/products/kronenberg/TeeKr\xE4uterPulver/bockshornklee-extrakt-ein-vielseitiges-kraut.png", "images/products/kronenberg/TeeKr\xE4uterPulver/bockshornklee-tee-samen-200g.png", "images/products/kronenberg/TeeKr\xE4uterPulver/brennnesselblaetter-bio-qualitaet-100g-beutel.png", "images/products/kronenberg/TeeKr\xE4uterPulver/brennnesselwurzel-bio-qualitaet-100g-beutel.png", "images/products/kronenberg/TeeKr\xE4uterPulver/catuaba-erythroxylum-pulver.png", "images/products/kronenberg/TeeKr\xE4uterPulver/catuaba-tee-der-tupi-indianer-aus-dem-amazonas-regenwald.png", "images/products/kronenberg/TeeKr\xE4uterPulver/catumupu-catuaba-muira-puama-tinktur.png", "images/products/kronenberg/TeeKr\xE4uterPulver/chaga-pilz-tee-bio-qualitaet-wildsammlung.png", "images/products/kronenberg/TeeKr\xE4uterPulver/chanca-piedra-steinbrecher.png", "images/products/kronenberg/TeeKr\xE4uterPulver/cistus-incanus-zistrosenkraut.png", "images/products/kronenberg/TeeKr\xE4uterPulver/der-weltberuehmte-tee-der-ojibwa-indianer-essiac-blend.png", "images/products/kronenberg/TeeKr\xE4uterPulver/ebv-pulver-mixtur-30-tage-kur.png", "images/products/kronenberg/TeeKr\xE4uterPulver/eisenbisglycinat-eisen-pulver-100g.png", "images/products/kronenberg/TeeKr\xE4uterPulver/extase-aphrodisiakum-catuaba-muira-puama-rinden-tee.png", "images/products/kronenberg/TeeKr\xE4uterPulver/graviola-annona-muricata-blaetter-wildsammlung.png", "images/products/kronenberg/TeeKr\xE4uterPulver/gruenes-wunder-chlorella-gerstengras-spirulina-weizengras-.png", "images/products/kronenberg/TeeKr\xE4uterPulver/indioclean-100g.png", "images/products/kronenberg/TeeKr\xE4uterPulver/jiaogulan-kraut-kraut-der-unsterblichkeit-kraeuterpotpourri.png", "images/products/kronenberg/TeeKr\xE4uterPulver/juglandis-kur-nach-dr-hulda-clark-kraeuter-tee-aperitif.png", "images/products/kronenberg/TeeKr\xE4uterPulver/katzenkralle-sangre-de-grado-100g-tee-amazonas-regenwald-.png", "images/products/kronenberg/TeeKr\xE4uterPulver/koriander-co-schwermetall-ausleitung-im-sparpaket.png", "images/products/kronenberg/TeeKr\xE4uterPulver/kraeutertee-aperitif-leber-lecur.png", "images/products/kronenberg/TeeKr\xE4uterPulver/kraeutertee-aperitif-lymphe-abies.png", "images/products/kronenberg/TeeKr\xE4uterPulver/kraeutertee-aperitif-niere-ren.png", "images/products/kronenberg/TeeKr\xE4uterPulver/kur-paket-premium-4-entgiftungreinigungverdauung.png", "images/products/kronenberg/TeeKr\xE4uterPulver/l-arginin-base-pulver-vegan.png", "images/products/kronenberg/TeeKr\xE4uterPulver/l-carnitin-base-pulver-100.png", "images/products/kronenberg/TeeKr\xE4uterPulver/l-tryptophan-pulver-aus-fermentation.png", "images/products/kronenberg/TeeKr\xE4uterPulver/lapacho-rinden-tee-aus-dem-amazonas-regenwald.png", "images/products/kronenberg/TeeKr\xE4uterPulver/lapacho-tinktur-ultraschall-extraktion-amazonas-regenwald.png", "images/products/kronenberg/TeeKr\xE4uterPulver/leinsamenextrakt-pulver-vegi-kapseln-90-stueck.png", "images/products/kronenberg/TeeKr\xE4uterPulver/liposomale-artemisia-annua-ultraschall-extraktion-50ml.png", "images/products/kronenberg/TeeKr\xE4uterPulver/loewenzahnblaetter-bio-qualitaet-100g-beutel.png", "images/products/kronenberg/TeeKr\xE4uterPulver/loewenzahnwurzel-bio-qualitaet-100g-beutel.png", "images/products/kronenberg/TeeKr\xE4uterPulver/lungenkraut-wuerzeextrakt-ultraschall-extraktion.png", "images/products/kronenberg/TeeKr\xE4uterPulver/moringa-morisana-plus-artemisia-annua-kombi-paket.png", "images/products/kronenberg/TeeKr\xE4uterPulver/moringa-morisana-premium-pulver-300g-monatspackung.png", "images/products/kronenberg/TeeKr\xE4uterPulver/moringa-samenpulver-100-fein-gemahlen-20g.png", "images/products/kronenberg/TeeKr\xE4uterPulver/moringa-spicy-gewuerz-mit-kalahari-wuesten-salz.png", "images/products/kronenberg/TeeKr\xE4uterPulver/muira-puama-pulver-potenzbaum-im-amazonas-regenwald.png", "images/products/kronenberg/TeeKr\xE4uterPulver/muira-puama-tee-aphrodisiakum-amazonas-regenwald.png", "images/products/kronenberg/TeeKr\xE4uterPulver/mulungu-das-schlaf-elixier-der-indianer-90-stk.png", "images/products/kronenberg/TeeKr\xE4uterPulver/natriumhydrogencarbonat-pharm-qualitaet.png", "images/products/kronenberg/TeeKr\xE4uterPulver/organisches-agnimantha-churnaya-ayurveda-pulver-90g.png", "images/products/kronenberg/TeeKr\xE4uterPulver/organisches-ashwagandha-ayurveda-pulver.png", "images/products/kronenberg/TeeKr\xE4uterPulver/organisches-brahmi-ayurveda-pulver.png", "images/products/kronenberg/TeeKr\xE4uterPulver/organisches-giloy-ayurveda-pulver.png", "images/products/kronenberg/TeeKr\xE4uterPulver/organisches-patadi-churnaya-ayurveda-pulver-90g.png", "images/products/kronenberg/TeeKr\xE4uterPulver/organisches-shatavari-ayurveda-pulver.png", "images/products/kronenberg/TeeKr\xE4uterPulver/organisches-swastha-churnaya-ayurveda-pulver-90g.png", "images/products/kronenberg/TeeKr\xE4uterPulver/organisches-trivala-ayurveda-pulver.png", "images/products/kronenberg/TeeKr\xE4uterPulver/papaya-blaetter-und-staengel-grob-100g-superfood.png", "images/products/kronenberg/TeeKr\xE4uterPulver/pure-formula-stoffwechsel-90-kapseln.png", "images/products/kronenberg/TeeKr\xE4uterPulver/schamblumenblueten-blau-clitoria-ternatea-flores-100g.png", "images/products/kronenberg/TeeKr\xE4uterPulver/schatz-der-inkas-trunk-der-goetter-amazonas-regenwald-tee.png", "images/products/kronenberg/TeeKr\xE4uterPulver/schilddruesen-kraeuter-mischung-pulver-inspiriert-durch-medical-food.png", "images/products/kronenberg/TeeKr\xE4uterPulver/schwarzkuemmel-pulver-nigella-sativa-premiumqualitaet.png", "images/products/kronenberg/TeeKr\xE4uterPulver/stauden-sellerie-pulver-inspiriert-durch-medical-food-monatskur.png", "images/products/kronenberg/TeeKr\xE4uterPulver/suessholzwurzel-natur-gemahlen-lakritzpulver.png", "images/products/kronenberg/TeeKr\xE4uterPulver/tantum-1-nierentee-reinigung.png", "images/products/kronenberg/TeeKr\xE4uterPulver/tantum-2-lebertee-zur-leberreinigung.png", "images/products/kronenberg/TeeKr\xE4uterPulver/tantum-3-darm-sanierung-kur.png", "images/products/kronenberg/TeeKr\xE4uterPulver/tantum-6-tee-entgiftung-reinigung-verdauung-und-rheuma.png", "images/products/kronenberg/TeeKr\xE4uterPulver/teetox-stoffwechsel-tee-inspiriert-durch-medical-food.png", "images/products/kronenberg/TeeKr\xE4uterPulver/tri-magnesiumdicitrat-zaehne-knochen-muskeln.png", "images/products/kronenberg/TeeKr\xE4uterPulver/typ-2-pulver-bioaktive-verbindungen.png", "images/products/kronenberg/TeeKr\xE4uterPulver/vitalpilze-6-fach-pilzkomplex-extrakt.png", "images/products/kronenberg/TeeKr\xE4uterPulver/weidenrinde-purpurweide-geschnitten-mit-nat-salicin.png", "images/products/kronenberg/TeeKr\xE4uterPulver/weidenrinden-purpurweide-ultraschall-extrakt.png", "images/products/kronenberg/TeeKr\xE4uterPulver/zistrosenkraut-gemahlen-fuer-hunde-katzen-100-natur.png", "images/products/kronenberg/Therapeuteninfos/adsadhs-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/artemisia-annua-einjaehriger-beifuss-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/bockshornklee-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/catuaba-teetinktur-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/chaga-pilz-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/chlordioxid-loesung-chlorine-dioxide-solution-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/chlorellagerstengrasspirullina-und-weizengras-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/cinderella-das-moringa-oleifera-kindermalbuch-25-seiten.png", "images/products/kronenberg/Therapeuteninfos/cistrose-cistus-incanus-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/copaiba-copaifera-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/darmgesundheit-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/darmparasiten-therapeuteninfo-.png", "images/products/kronenberg/Therapeuteninfos/das-dmso-handbuch-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/das-ultimative-gesundungsprogramm.png", "images/products/kronenberg/Therapeuteninfos/der-weltberuehmte-tee-der-ojibwa-indianer-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/detaillierter-produktkatalog-der-graf-von-kronenberg-group.png", "images/products/kronenberg/Therapeuteninfos/detox-kraeuter-tee-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/e-book-organisches-germanium-raetselhaftes-elixier.png", "images/products/kronenberg/Therapeuteninfos/epstein-barr-virus-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/graviola-stachelannone-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/indo-green-kratom-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/kiefer-als-heilmittel-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/kleinbluetiges-weidenroeschen-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/knotentang-braunalge-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/kompendium-beruehmter-und-seltenervergessener-heilmittel.png", "images/products/kronenberg/Therapeuteninfos/koriander-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/l-arginin-base-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/l-carnitin-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/lapacho-teetinktur-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/liposomal-und-die-besondere-wirkung.png", "images/products/kronenberg/Therapeuteninfos/loewenzahn-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/lotus-bluete-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/lungenkraut-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/moringa-morisana-premium-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/msm-dimethylsulfon-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/muira-puama-teetinktur-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/multiple-sklerose-ms-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/mulungu-therapeuteninfo-14-seiten.png", "images/products/kronenberg/Therapeuteninfos/mumiyo-shilajit-maumasil-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/ozonisiertes-olivenoel-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/rote-wurzel-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/safran-das-besondere-heilmittel-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/sango-meeres-koralle-aus-okinawa-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/sangre-de-drago-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/schatz-der-inkas-tee-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/schungit-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/schwarzkuemmel-pulver-nigella-sativa-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/schwefel-kur-nach-dr-karl-j-probst-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/sellerie-saft-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/stachybotrys-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/strophanthin-schach-matt-dem-herzinfarkt.png", "images/products/kronenberg/Therapeuteninfos/strophanthin-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/superfood-cordyceps-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/superfood-meerrettich-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/vitamin-d3-cholecalciferol-ist-gar-kein-vitamin-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/vitamin-e-der-grosse-betrug-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/weidenrinde-therapeutheninfo.png", "images/products/kronenberg/Therapeuteninfos/zuordnung-der-heilkraeuter-zu-krankheiten-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/zytamin-bio-regulator-komplex-therapeuteninfo.png", "images/products/kronenberg/Vitalpilze/agaricus-blazei-murrill-mandelpilz-120g.png", "images/products/kronenberg/Vitalpilze/vitalpilze-6-fach-pilzkomplex-extrakt.png", "images/products/kronenberg/Zubeh\xF6r/100ml-braune-medizinflasche-mit-zerstaeuber.png", "images/products/kronenberg/Zubeh\xF6r/100ml-leere-braune-medizinflasche-mit-pipette.png", "images/products/kronenberg/Zubeh\xF6r/aktivierungssalz-fuer-elektrolyse-fussbad.png", "images/products/kronenberg/Zubeh\xF6r/bioenergiser-ionen-detox-fusselektrolysebad-kpl-set.png", "images/products/kronenberg/Zubeh\xF6r/blasenspritze-100-ml-sterile-einmalspritze.png", "images/products/kronenberg/Zubeh\xF6r/din-18-pipettenverschluss-fuer-100ml-tropfflaschen.png", "images/products/kronenberg/Zubeh\xF6r/nagelfeile-aus-glas-fuer-mani-und-pedikuere-die-revolution.png", "images/products/kronenberg/Zubeh\xF6r/spruehflasche-50-ml-braunes-glas-kompl-mit-zerstaeuber.png", "images/products/kronenberg/aphrodisiaka/catuaba-erythroxylum-pulver.png", "images/products/kronenberg/aphrodisiaka/catumupu-catuaba-muira-puama-tinktur.png", "images/products/kronenberg/aphrodisiaka/extase-aphrodisiakum-catuaba-muira-puama-rinden-tee.png", "images/products/kronenberg/aphrodisiaka/muira-puama-pulver-potenzbaum-im-amazonas-regenwald.png", "images/products/kronenberg/aphrodisiaka/muira-puama-tee-aphrodisiakum-amazonas-regenwald.png", "images/products/kronenberg/ayurveda/amalaki-ayurveda-pulver-organisch.png", "images/products/kronenberg/ayurveda/ayurveda-tee-mischung-harmonie.png", "images/products/kronenberg/ayurveda/organisches-agnimantha-churnaya-ayurveda-pulver-90g.png", "images/products/kronenberg/ayurveda/organisches-ashwagandha-ayurveda-pulver.png", "images/products/kronenberg/ayurveda/organisches-brahmi-ayurveda-pulver.png", "images/products/kronenberg/ayurveda/organisches-giloy-ayurveda-pulver.png", "images/products/kronenberg/ayurveda/organisches-patadi-churnaya-ayurveda-pulver-90g.png", "images/products/kronenberg/ayurveda/organisches-shatavari-ayurveda-pulver.png", "images/products/kronenberg/ayurveda/organisches-swastha-churnaya-ayurveda-pulver-90g.png", "images/products/kronenberg/ayurveda/organisches-trivala-ayurveda-pulver.png", "images/products/kronenberg/ayurveda/schamblumenblueten-blau-clitoria-ternatea-flores-100g.png", "images/products/kronenberg/bestseller/artemisia-annua-100-reine-blaetter-100g.png", "images/products/kronenberg/bestseller/artemisia-annua-samen-qing-hao-gvk-spezial.png", "images/products/kronenberg/bestseller/biota-em-effektive-mikroorganismen-500ml.png", "images/products/kronenberg/bestseller/camu-camu-extrakt.png", "images/products/kronenberg/bestseller/chanca-piedra-steinbrecher.png", "images/products/kronenberg/bestseller/corona-hygiene-aroma-spray-200ml.png", "images/products/kronenberg/bestseller/der-weltberuehmte-tee-der-ojibwa-indianer-essiac-blend.png", "images/products/kronenberg/bestseller/dmso-60-plus-magnesium-oel-sportler-spray.png", "images/products/kronenberg/bestseller/dmso-schmerz-eukalyptus-balsam-40ml.png", "images/products/kronenberg/bestseller/dmso-schmerz-lavendel-balsam-40-ml.png", "images/products/kronenberg/bestseller/ebv-pulver-mixtur-30-tage-kur.png", "images/products/kronenberg/bestseller/l-carnitin-base-pulver-100.png", "images/products/kronenberg/bestseller/l-tryptophan-pulver-aus-fermentation.png", "images/products/kronenberg/bestseller/moringa-morisana-premium-pulver-300g-monatspackung.png", "images/products/kronenberg/bestseller/moringa-spicy-gewuerz-mit-kalahari-wuesten-salz.png", "images/products/kronenberg/bestseller/nagelfeile-aus-glas-fuer-mani-und-pedikuere-die-revolution.png", "images/products/kronenberg/bestseller/nano-glas-mani-pedikuere-die-revolution.png", "images/products/kronenberg/bestseller/pet-zahnfix-revital-liposomal-40ml.png", "images/products/kronenberg/bestseller/sangre-de-drago-100-aus-wildsammlung.png", "images/products/kronenberg/bestseller/schilddruesen-kraeuter-mischung-pulver-inspiriert-durch-medical-food.png", "images/products/kronenberg/bestseller/stauden-sellerie-pulver-inspiriert-durch-medical-food-monatskur.png", "images/products/kronenberg/bestseller/strophanthin-gratus-experimentier-set-100ml.png", "images/products/kronenberg/bestseller/strophanthin-kombe-experimentier-set-200ml.png", "images/products/kronenberg/bestseller/strophanthus-kombe-saatgut-strophanthin.png", "images/products/kronenberg/bestseller/teetox-stoffwechsel-tee-inspiriert-durch-medical-food.png", "images/products/kronenberg/bestseller/typ-2-pulver-bioaktive-verbindungen.png", "images/products/kronenberg/bestseller/zahnfix-revital-liposomal-40ml.png", "images/products/kronenberg/bioreiniger/bep-bio-enzym-power-reiniger-effizient-und-oekologisch-reinigen.png", "images/products/kronenberg/bioreiniger/corona-hygiene-aroma-spray-200ml.png", "images/products/kronenberg/chlordioxid/bake-desinfektion-fuer-189-liter-wasser-gallonen-wasserspender.png", "images/products/kronenberg/chlordioxid/cdl-cds-loesung-03-nach-dr-andreas-kalcker.png", "images/products/kronenberg/chlordioxid/cdlcds-100ml-loesung-03-clo2-mit-edel-schungit-wasser.png", "images/products/kronenberg/chlordioxid/desaircap-die-geniale-loesung-fuer-frisches-obst-und-gemuese.png", "images/products/kronenberg/chlordioxid/nagelpflege-napiad-soft-fluid-gel.png", "images/products/kronenberg/chlordioxid/nagelpflege-set-sorglos-paket.png", "images/products/kronenberg/cordyceps/cordyceps-cordycepin-all-in-one-schmelzpastillen.png", "images/products/kronenberg/cordyceps/cordyceps-cordycepin-lyophilized-schmelzpastille-10mgpastille.png", "images/products/kronenberg/darmleberniere/biota-em-effektive-mikroorganismen-500ml.png", "images/products/kronenberg/darmleberniere/juglandis-kur-nach-dr-hulda-clark-kraeuter-tee-aperitif.png", "images/products/kronenberg/darmleberniere/kraeutertee-aperitif-leber-lecur.png", "images/products/kronenberg/darmleberniere/kraeutertee-aperitif-niere-ren.png", "images/products/kronenberg/darmleberniere/tantum-1-nierentee-reinigung.png", "images/products/kronenberg/darmleberniere/tantum-2-lebertee-zur-leberreinigung.png", "images/products/kronenberg/darmleberniere/tantum-3-darm-sanierung-kur.png", "images/products/kronenberg/extrakte/artemisia-annua-oxymel-compositum-alkoholfrei.png", "images/products/kronenberg/extrakte/artemisia-annua-pures-100-oel-ultraschall-extraktion-100ml.png", "images/products/kronenberg/extrakte/artemisia-annua-ultraschall-extraktion-mit-schungitwasser.png", "images/products/kronenberg/extrakte/baerlauch-extrakt-ultraschall-extraktion-100ml.png", "images/products/kronenberg/extrakte/camu-camu-extrakt.png", "images/products/kronenberg/extrakte/catumupu-catuaba-muira-puama-tinktur.png", "images/products/kronenberg/extrakte/graviola-extrakt-annona-muricata-superfood.png", "images/products/kronenberg/extrakte/hacheney-hyperwasser-mit-kolloidalem-silizium.png", "images/products/kronenberg/extrakte/hagebutten-extrakt-100-natur.png", "images/products/kronenberg/extrakte/holunder-beeren-extrakt-antioxidans.png", "images/products/kronenberg/extrakte/kiefernnadel-und-sprossen-wuerzeextrakt-ultraschall-extraktion.png", "images/products/kronenberg/extrakte/koriander-co-schwermetall-ausleitung-im-sparpaket.png", "images/products/kronenberg/extrakte/koriander-extrakt-ultraschall-extraktion-100ml.png", "images/products/kronenberg/extrakte/lapacho-tinktur-ultraschall-extraktion-amazonas-regenwald.png", "images/products/kronenberg/extrakte/liposomale-artemisia-annua-ultraschall-extraktion-50ml.png", "images/products/kronenberg/extrakte/liposomale-moringa-morisana-ultraschall-extraktion.png", "images/products/kronenberg/extrakte/loewenzahnkraut-wuerze-extrakt-ultraschall-extraktion.png", "images/products/kronenberg/extrakte/lungenkraut-wuerzeextrakt-ultraschall-extraktion.png", "images/products/kronenberg/extrakte/meerrettich-extract-ultraschall-extraktion.png", "images/products/kronenberg/extrakte/oregano-oel-wilder-majoran-carvacrol-80.png", "images/products/kronenberg/extrakte/parasitenkurkraeuterextrakt-100ml.png", "images/products/kronenberg/extrakte/safran-extrakt-mit-curcumin-gueteklasse-1-15ml.png", "images/products/kronenberg/extrakte/spirulina-tropfenextrakt-100-ml.png", "images/products/kronenberg/extrakte/strophanthin-gratus-experimentier-set-100ml.png", "images/products/kronenberg/extrakte/strophanthin-kombe-experimentier-set-200ml.png", "images/products/kronenberg/extrakte/traubenkern-opc-ultraschall-extrakt-mit-schungit-wasser.png", "images/products/kronenberg/extrakte/weidenrinden-purpurweide-ultraschall-extrakt.png", "images/products/kronenberg/extrakte/weidenroeschen-kleinbluetig-ultraschall-extraktion.png", "images/products/kronenberg/extrakte/weih-muri-weihrauch-und-myrrhe-extrakt.png", "images/products/kronenberg/extrakte/wilder-chaga-pilz-ultraschall-extraktion.png", "images/products/kronenberg/h2o2/wasserstoffperoxid-h2o2-3-loesung.png", "images/products/kronenberg/haare/100-arganoel-plus-mandeloel-haut-haar-und-massage.png", "images/products/kronenberg/haare/bockshornklee-extrakt-ein-vielseitiges-kraut.png", "images/products/kronenberg/haare/bockshornklee-kur-diffuser-haarausfall-kapseln-tee-tinktur.png", "images/products/kronenberg/haare/bockshornklee-tee-samen-200g.png", "images/products/kronenberg/haare/hair-power-kur-bockshornklee-kapseln-60-stk.png", "images/products/kronenberg/innovationen/988-pures-artemisiaartemisinin-90-vegi-kapseln.png", "images/products/kronenberg/innovationen/aloe-vera-frischpflanzensaft-mit-honig-plus-vitamin-c.png", "images/products/kronenberg/innovationen/aloe-vera-hair-body-shower-gel-200-ml.png", "images/products/kronenberg/innovationen/aloe-vera-hautgel-hair-body-shower-gel-400-ml.png", "images/products/kronenberg/innovationen/aloe-vera-hautgel-natur-983-pur.png", "images/products/kronenberg/innovationen/artemisia-annua-oxymel-compositum-alkoholfrei.png", "images/products/kronenberg/innovationen/artemisia-annua-plus-rosmarin-vitamin-c.png", "images/products/kronenberg/innovationen/artemisia-annua-pures-100-oel-ultraschall-extraktion-100ml.png", "images/products/kronenberg/innovationen/artemisia-annua-salbe-moringa-samen-pulver-dmso.png", "images/products/kronenberg/innovationen/artemisia-annua-ultraschall-extraktion-mit-schungitwasser.png", "images/products/kronenberg/innovationen/ayurveda-tee-mischung-harmonie.png", "images/products/kronenberg/innovationen/baerlauch-extrakt-ultraschall-extraktion-100ml.png", "images/products/kronenberg/innovationen/bernsteinsaeure-hpmc-kapseln-plus-vitamin-c.png", "images/products/kronenberg/innovationen/bockshornklee-extrakt-ein-vielseitiges-kraut.png", "images/products/kronenberg/innovationen/bockshornklee-kur-diffuser-haarausfall-kapseln-tee-tinktur.png", "images/products/kronenberg/innovationen/bockshornklee-tee-samen-200g.png", "images/products/kronenberg/innovationen/brennnesselblaetter-bio-qualitaet-100g-beutel.png", "images/products/kronenberg/innovationen/brennnesselwurzel-bio-qualitaet-100g-beutel.png", "images/products/kronenberg/innovationen/calcium-kalium-magnesium-kombination.png", "images/products/kronenberg/innovationen/camu-camu-extrakt.png", "images/products/kronenberg/innovationen/catuaba-erythroxylum-pulver.png", "images/products/kronenberg/innovationen/catuaba-tee-der-tupi-indianer-aus-dem-amazonas-regenwald.png", "images/products/kronenberg/innovationen/catumupu-catuaba-muira-puama-tinktur.png", "images/products/kronenberg/innovationen/cdl-cds-loesung-03-nach-dr-andreas-kalcker.png", "images/products/kronenberg/innovationen/cdlcds-100ml-loesung-03-clo2-mit-edel-schungit-wasser.png", "images/products/kronenberg/innovationen/chaga-pilz-tee-bio-qualitaet-wildsammlung.png", "images/products/kronenberg/innovationen/copaiba-oel-100-natuerlich.png", "images/products/kronenberg/innovationen/cordyceps-cordycepin-all-in-one-schmelzpastillen.png", "images/products/kronenberg/innovationen/cordyceps-cordycepin-lyophilized-schmelzpastille-10mgpastille.png", "images/products/kronenberg/innovationen/corona-hygiene-aroma-spray-200ml.png", "images/products/kronenberg/innovationen/dmso-60-plus-magnesium-oel-sportler-spray.png", "images/products/kronenberg/innovationen/dmso-schmerz-eukalyptus-balsam-40ml.png", "images/products/kronenberg/innovationen/dmso-schmerz-lavendel-balsam-40-ml.png", "images/products/kronenberg/innovationen/ebv-pulver-mixtur-30-tage-kur.png", "images/products/kronenberg/innovationen/extase-aphrodisiakum-catuaba-muira-puama-rinden-tee.png", "images/products/kronenberg/innovationen/goldene-milch-paste-kurkuma-power.png", "images/products/kronenberg/innovationen/graviola-extrakt-annona-muricata-superfood.png", "images/products/kronenberg/innovationen/gruenes-wunder-chlorella-gerstengras-spirulina-weizengras-.png", "images/products/kronenberg/innovationen/hagebutten-extrakt-100-natur.png", "images/products/kronenberg/innovationen/hair-power-kur-bockshornklee-kapseln-60-stk.png", "images/products/kronenberg/innovationen/holunder-beeren-extrakt-antioxidans.png", "images/products/kronenberg/innovationen/hyaluronsaeure-plus-glucosamin-und-chondroitin-60-kapseln.png", "images/products/kronenberg/innovationen/ingwer-massage-und-bade-oel-therapie-lymphdrainage.png", "images/products/kronenberg/innovationen/juglandis-kur-nach-dr-hulda-clark-kraeuter-tee-aperitif.png", "images/products/kronenberg/innovationen/katzenkralle-sangre-de-grado-100g-tee-amazonas-regenwald-.png", "images/products/kronenberg/innovationen/kiefernnadel-und-sprossen-wuerzeextrakt-ultraschall-extraktion.png", "images/products/kronenberg/innovationen/koriander-co-schwermetall-ausleitung-im-sparpaket.png", "images/products/kronenberg/innovationen/koriander-extrakt-ultraschall-extraktion-100ml.png", "images/products/kronenberg/innovationen/kraeutertee-aperitif-leber-lecur.png", "images/products/kronenberg/innovationen/kraeutertee-aperitif-lymphe-abies.png", "images/products/kronenberg/innovationen/kraeutertee-aperitif-niere-ren.png", "images/products/kronenberg/innovationen/kur-paket-premium-4-entgiftungreinigungverdauung.png", "images/products/kronenberg/innovationen/l-tryptophan-mit-b-vitaminen-und-folsaeure-60-hpmc-kapseln.png", "images/products/kronenberg/innovationen/lapacho-rinden-tee-aus-dem-amazonas-regenwald.png", "images/products/kronenberg/innovationen/lapacho-tinktur-ultraschall-extraktion-amazonas-regenwald.png", "images/products/kronenberg/innovationen/leinsamenextrakt-pulver-vegi-kapseln-90-stueck.png", "images/products/kronenberg/innovationen/licht-edel-schungit-wasser-energetikum.png", "images/products/kronenberg/innovationen/liposomale-artemisia-annua-ultraschall-extraktion-50ml.png", "images/products/kronenberg/innovationen/liposomale-moringa-morisana-ultraschall-extraktion.png", "images/products/kronenberg/innovationen/loewenzahnblaetter-bio-qualitaet-100g-beutel.png", "images/products/kronenberg/innovationen/loewenzahnkraut-wuerze-extrakt-ultraschall-extraktion.png", "images/products/kronenberg/innovationen/loewenzahnwurzel-bio-qualitaet-100g-beutel.png", "images/products/kronenberg/innovationen/magnesium-oel-premium-vitalspray-31-mit-edel-schungit-wasser.png", "images/products/kronenberg/innovationen/meerrettich-extract-ultraschall-extraktion.png", "images/products/kronenberg/innovationen/meerwasser-agua-de-mar-mit-schungit-wasser.png", "images/products/kronenberg/innovationen/moringa-miracle-suppe-20-portionen-gmo-frei.png", "images/products/kronenberg/innovationen/moringa-morisana-premium-mit-vitamin-b12.png", "images/products/kronenberg/innovationen/moringa-morisana-premium-pulver-300g-monatspackung.png", "images/products/kronenberg/innovationen/moringa-samen-in-kapsel-100-pures-samenpulver.png", "images/products/kronenberg/innovationen/moringa-samenpulver-100-fein-gemahlen-20g.png", "images/products/kronenberg/innovationen/moringa-spicy-gewuerz-mit-kalahari-wuesten-salz.png", "images/products/kronenberg/innovationen/muira-puama-pulver-potenzbaum-im-amazonas-regenwald.png", "images/products/kronenberg/innovationen/muira-puama-tee-aphrodisiakum-amazonas-regenwald.png", "images/products/kronenberg/innovationen/oregano-oel-wilder-majoran-carvacrol-80.png", "images/products/kronenberg/innovationen/original-urs-surbeck-energetisches-wasser-gesunde-balance.png", "images/products/kronenberg/innovationen/ozonisiertes-hochwertiges-distel-oel.png", "images/products/kronenberg/innovationen/ozonisiertes-manzanilla-oel-balsam-980g-ozonl.png", "images/products/kronenberg/innovationen/ozonisiertes-manzanilla-olivenoel-gesunde-haut.png", "images/products/kronenberg/innovationen/parasitenkurkraeuterextrakt-100ml.png", "images/products/kronenberg/innovationen/pet-zahnfix-revital-liposomal-40ml.png", "images/products/kronenberg/innovationen/schatz-der-inkas-trunk-der-goetter-amazonas-regenwald-tee.png", "images/products/kronenberg/innovationen/schilddruesen-kraeuter-mischung-pulver-inspiriert-durch-medical-food.png", "images/products/kronenberg/innovationen/schwarzkuemmel-oel-mit-mandel-oel-haut-haar-und-massage.png", "images/products/kronenberg/innovationen/skincaregold-aloe-vera-extrakt-anti-aging.png", "images/products/kronenberg/innovationen/skincareplus-aloe-vera-extrakt-mit-collagen-und-hyaluronsaeure.png", "images/products/kronenberg/innovationen/stauden-sellerie-pulver-inspiriert-durch-medical-food-monatskur.png", "images/products/kronenberg/innovationen/strophanthin-gratus-experimentier-set-100ml.png", "images/products/kronenberg/innovationen/strophanthin-kombe-experimentier-set-200ml.png", "images/products/kronenberg/innovationen/suessholzwurzel-natur-gemahlen-lakritzpulver.png", "images/products/kronenberg/innovationen/teetox-stoffwechsel-tee-inspiriert-durch-medical-food.png", "images/products/kronenberg/innovationen/traubenkern-opc-ultraschall-extrakt-mit-schungit-wasser.png", "images/products/kronenberg/innovationen/tri-magnesiumdicitrat-zaehne-knochen-muskeln.png", "images/products/kronenberg/innovationen/twostep-manikuerepedikuere-set.png", "images/products/kronenberg/innovationen/typ-2-pulver-bioaktive-verbindungen.png", "images/products/kronenberg/innovationen/urs-surbeck-energetisches-wasser-wohlfuehlflasche-50ml.png", "images/products/kronenberg/innovationen/weidenrinden-purpurweide-ultraschall-extrakt.png", "images/products/kronenberg/innovationen/weidenroeschen-kleinbluetig-ultraschall-extraktion.png", "images/products/kronenberg/innovationen/weih-muri-weihrauch-und-myrrhe-extrakt.png", "images/products/kronenberg/innovationen/wilder-chaga-pilz-ultraschall-extraktion.png", "images/products/kronenberg/innovationen/zahnfix-revital-liposomal-40ml.png", "images/products/kronenberg/innovationen/zimtblaetteroel-100-reines-aetherisches-oel-10ml.png", "images/products/kronenberg/kosmetik/100-arganoel-plus-mandeloel-haut-haar-und-massage.png", "images/products/kronenberg/kosmetik/aloe-vera-hair-body-shower-gel-200-ml.png", "images/products/kronenberg/kosmetik/aloe-vera-hautgel-hair-body-shower-gel-400-ml.png", "images/products/kronenberg/kosmetik/aloe-vera-hautgel-natur-983-pur.png", "images/products/kronenberg/kosmetik/ingwer-massage-und-bade-oel-therapie-lymphdrainage.png", "images/products/kronenberg/kosmetik/magnesium-oel-premium-vitalspray-31-mit-edel-schungit-wasser.png", "images/products/kronenberg/kosmetik/nagelfeile-aus-glas-fuer-mani-und-pedikuere-die-revolution.png", "images/products/kronenberg/kosmetik/nano-glas-mani-pedikuere-die-revolution.png", "images/products/kronenberg/kosmetik/ozonisiertes-hochwertiges-distel-oel.png", "images/products/kronenberg/kosmetik/ozonisiertes-manzanilla-oel-balsam-980g-ozonl.png", "images/products/kronenberg/kosmetik/ozonisiertes-manzanilla-olivenoel-gesunde-haut.png", "images/products/kronenberg/kosmetik/pet-zahnfix-revital-liposomal-40ml.png", "images/products/kronenberg/kosmetik/schwarzkuemmel-oel-mit-mandel-oel-haut-haar-und-massage.png", "images/products/kronenberg/kosmetik/skincaregold-aloe-vera-extrakt-anti-aging.png", "images/products/kronenberg/kosmetik/skincareplus-aloe-vera-extrakt-mit-collagen-und-hyaluronsaeure.png", "images/products/kronenberg/kosmetik/twostep-manikuerepedikuere-set.png", "images/products/kronenberg/kosmetik/twostep-nagelfeile-aus-bambus-manikuere.png", "images/products/kronenberg/kosmetik/zahncreme-mit-schwarzkuemmel-ohne-fluor-und-pfefferminz.png", "images/products/kronenberg/kosmetik/zahnfix-revital-liposomal-40ml.png", "images/products/kronenberg/kraeutertee/juglandis-kur-nach-dr-hulda-clark-kraeuter-tee-aperitif.png", "images/products/kronenberg/kraeutertee/kraeutertee-aperitif-leber-lecur.png", "images/products/kronenberg/kraeutertee/kraeutertee-aperitif-lymphe-abies.png", "images/products/kronenberg/kraeutertee/kraeutertee-aperitif-niere-ren.png", "images/products/kronenberg/no_cover.jpeg", "images/products/kronenberg/schungit/edel-schungit-set-im-organza-beutel-10-g.png", "images/products/kronenberg/schungit/edel-schungit-steine-lose-50g-sonderangebot-limitierte-auflage.png", "images/products/kronenberg/schungit/harmonisierer-aus-schungit-und-talkchlorit.png", "images/products/kronenberg/schungit/licht-edel-schungit-wasser-energetikum.png", "images/products/kronenberg/schungit/limitiertes-schungit-set-8-auserlesene-produkte.png", "images/products/kronenberg/schungit/schungit-anhaenger-beschuetzer-frau.png", "images/products/kronenberg/schungit/schungit-anhaenger-beschuetzer-mann.png", "images/products/kronenberg/schungit/schungit-anhaenger-engel-mit-haematit.png", "images/products/kronenberg/schungit/schungit-anhaenger-perle-mit-einfassung.png", "images/products/kronenberg/schungit/schungit-anhaenger-scheibe-schmuckstueck-aus-handarbeit.png", "images/products/kronenberg/schungit/schungit-energetisierungsplatte-10x12cm.png", "images/products/kronenberg/schungit/schungit-engel-in-geschnitzter-handarbeit.png", "images/products/kronenberg/schungit/schungit-handy-schutz-schuetzt-vor-schaedlicher-strahlung.png", "images/products/kronenberg/schungit/schungit-kugel-mit-untersetzer-5cm-110g.png", "images/products/kronenberg/schungit/schungit-pulver-200g-aktivkohle-detox-drink.png", "images/products/kronenberg/schungit/schungit-pyramide-5cm-hoch-278g.png", "images/products/kronenberg/schungit/schungit-pyramide-poliert-ca-20cm-hoch.png", "images/products/kronenberg/schungit/schungit-pyramide-poliert-ca-3-cm-hoch.png", "images/products/kronenberg/schungit/schungit-radiaesthesie-pendel-mit-kette.png", "images/products/kronenberg/schungit/schungit-scheibe-ca-5cm-hoch-poliert-harmonisierung-und-wohlbefinden.png", "images/products/kronenberg/schungit/schungit-schluesselanhaenger-mit-2-perlen-8g-laenge-ca-8cm.png", "images/products/kronenberg/schungit/schungit-schluesselanhaenger-silberfarbig-mit-perle.png", "images/products/kronenberg/schungit/schungit-set-im-organza-beutel-100-g.png", "images/products/kronenberg/schungit/schungit-split-1000g.png", "images/products/kronenberg/schungit/schungit-split-500g.png", "images/products/kronenberg/schungit/schungit-uhr-500g-elektrosmog-und-strahlung.png", "images/products/kronenberg/schungit/schungit-wuerfel-65g-harmonie-und-schutz-in-fester-form.png", "images/products/kronenberg/schwefelkur/anorganischer-schwefel-min-999-pulver.png", "images/products/kronenberg/schwefelkur/schwefel-kur-nach-dr-probst-darmsanierung.png", "images/products/kronenberg/\xD6le/100-arganoel-plus-mandeloel-haut-haar-und-massage.png", "images/products/kronenberg/\xD6le/artemisia-annua-pures-100-oel-ultraschall-extraktion-100ml.png", "images/products/kronenberg/\xD6le/copaiba-oel-100-natuerlich.png", "images/products/kronenberg/\xD6le/dmso-60-plus-magnesium-oel-sportler-spray.png", "images/products/kronenberg/\xD6le/dmso-ph-eur-999-100ml-hochreines-dmso.png", "images/products/kronenberg/\xD6le/dmso-schmerz-eukalyptus-balsam-40ml.png", "images/products/kronenberg/\xD6le/dmso-schmerz-lavendel-balsam-40-ml.png", "images/products/kronenberg/\xD6le/ingwer-massage-und-bade-oel-therapie-lymphdrainage.png", "images/products/kronenberg/\xD6le/magnesium-oel-premium-vitalspray-31-mit-edel-schungit-wasser.png", "images/products/kronenberg/\xD6le/omega-3-lachsoelkapseln-mit-vitamin-e.png", "images/products/kronenberg/\xD6le/oregano-oel-wilder-majoran-carvacrol-80.png", "images/products/kronenberg/\xD6le/ozonisiertes-hochwertiges-distel-oel.png", "images/products/kronenberg/\xD6le/ozonisiertes-manzanilla-oel-balsam-980g-ozonl.png", "images/products/kronenberg/\xD6le/ozonisiertes-manzanilla-olivenoel-gesunde-haut.png", "images/products/kronenberg/\xD6le/pet-zahnfix-revital-liposomal-40ml.png", "images/products/kronenberg/\xD6le/schwarzkuemmel-oel-kaltpressung-gefiltert-100ml.png", "images/products/kronenberg/\xD6le/zahnfix-revital-liposomal-40ml.png", "images/products/waldkraft/ausleitungsorgane/Borax_Tropfen_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/ausleitungsorgane/L-Methionin_Mockup_600x600.jpg", "images/products/waldkraft/ausleitungsorgane/Lebende-Chlorella-Algen-Mockup-Wp3t_600x600.jpg", "images/products/waldkraft/ausleitungsorgane/Lungenkraut_Komplex_Mockup_175x62_600x600.jpg", "images/products/waldkraft/ausleitungsorgane/MSM_Wunschpreis-jpg-0U1S_600x600.jpg", "images/products/waldkraft/ausleitungsorgane/NAC-N-Acetyl-L-Cystein_Pulver_Mockup_600x600.jpg", "images/products/waldkraft/ausleitungsorgane/Sango_Koralle_Mockup_600x600.jpg", "images/products/waldkraft/ausleitungsorgane/Spirulina-BIO-120-Kapseln_600x600.jpg", "images/products/waldkraft/ausleitungsorgane/Zink-Histidin-Komplex-120-Kapseln_mockup_600x600.jpg", "images/products/waldkraft/ausleitungsorgane/chanca-piedra-pulver-150g-4098-pa10500_600x600.jpg", "images/products/waldkraft/ausleitungsorgane/liposomales-glutathion-aus-reduziertem-l-glutathion-250ml-pa10047_600x600.jpg", "images/products/waldkraft/buecher/25/Byebye-covid-2-1-1_600x600.png", "images/products/waldkraft/buecher/26/handbuch-der-kolloidalen-metalle_600x600.jpg", "images/products/waldkraft/buecher/27/Klinikhandbuch-Aromatherapie_600x600.png", "images/products/waldkraft/buecher/28/Arthrose_ist_heilbar_mockup_web-jpg_600x600.jpg", "images/products/waldkraft/buecher/29/Manuka_Buch_webshop-jpg_600x600.jpg", "images/products/waldkraft/buecher/30/em-eine-chance-fuer-unsere-erde-anne-lorch_600x600.jpg", "images/products/waldkraft/buecher/31/buch-borreliose-natuerlich-heilen-wolf-dieter-storl_600x600.jpg", "images/products/waldkraft/buecher/32/buch-pflanzliche-antibiotika-richtig-anwenden_600x600.jpg", "images/products/waldkraft/buecher/33/buch-die-leber-natuerlich-reinigen_600x600.jpg", "images/products/waldkraft/buecher/34/Borax_600x600.jpg", "images/products/waldkraft/buecher/35/CDL-Handbuch-LUBZ_600x600.jpg", "images/products/waldkraft/buecher/36/buch-cannabis-und-cannabidiol-cbd-richtig-anwenden_600x600.jpg", "images/products/waldkraft/buecher/37/DMSO-Handbuch_600x600.jpg", "images/products/waldkraft/em-mikroorganismen/Floratur-EM-BIO_2-1_600x600.png", "images/products/waldkraft/em-mikroorganismen/Mockup-EM-Basis_600x600.png", "images/products/waldkraft/em-mikroorganismen/Mockup-Floratur-Premium-1_600x600.jpg", "images/products/waldkraft/energie/BIO-Chlorophyll-Extrakt-Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/energie/Kraftpilz-Energie-120Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/energie/Lungenkraut_Komplex_Mockup_175x62_600x600.jpg", "images/products/waldkraft/energie/Nattokinase_Komplex_Mockup_web-jpg_600x600.jpg", "images/products/waldkraft/energie/Nattokinase_Zink_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/energie/PEA_PUlver_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/energie/Roter_Maca_Extrakt-120-Kapseln-Mockup_600x600.png", "images/products/waldkraft/energie/Vitamin-C-Komplex-120-Kapseln_600x600.jpg", "images/products/waldkraft/energie/moor-elixier-pa10656-v_600x600.jpg", "images/products/waldkraft/energie/pea-palmitoylethanolamid-120-kapseln-4186-pa10621_600x600.jpg", "images/products/waldkraft/gehirn/B6_Wohlfu-hl_Erythrit_Drops_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/gehirn/Borax_Tropfen_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/gehirn/Kiefernnadel_Tinktur_mockup_600x600.jpg", "images/products/waldkraft/gehirn/MSM_Wunschpreis-jpg-0U1S_600x600.jpg", "images/products/waldkraft/gehirn/Magnesium_Komplex_Mockup_600x600.jpg", "images/products/waldkraft/gehirn/PEA_PUlver_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/gehirn/Roter_Maca_Extrakt-120-Kapseln-Mockup_600x600.png", "images/products/waldkraft/gehirn/Schwarzer-Maca-Extrakt-120-Kapseln-Mockup_600x600.jpg", "images/products/waldkraft/gehirn/Vitamin-B12-Komplex-Drops-Mockup_600x600.jpg", "images/products/waldkraft/gehirn/Vitamin-C-Komplex-120-Kapseln_600x600.jpg", "images/products/waldkraft/gutelaune/B6_Wohlfu-hl_Erythrit_Drops_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/gutelaune/Vitamin-B12-Komplex-Drops-Mockup_600x600.jpg", "images/products/waldkraft/gutelaune/Vitamin-C-Komplex-120-Kapseln_600x600.jpg", "images/products/waldkraft/gutelaune/melantonin-Drops-Mockup_600x600.jpg", "images/products/waldkraft/gutelaune/pea-palmitoylethanolamid-120-kapseln-4186-pa10621_600x600.jpg", "images/products/waldkraft/herz/BIO-Chlorophyll-Extrakt-Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/herz/Kraftpilz-Cordyceps-120Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/herz/Lungenkraut_Komplex_Mockup_175x62_600x600.jpg", "images/products/waldkraft/herz/NAC-N-Acetyl-L-Cystein_Pulver_Mockup_600x600.jpg", "images/products/waldkraft/herz/Nattokinase_Komplex_Mockup_web-jpg_600x600.jpg", "images/products/waldkraft/herz/Nattokinase_Zink_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/herz/OPC-Pycnogenol-60-Kapseln-Mockup_600x600.jpg", "images/products/waldkraft/herz/Roter_Maca_Extrakt-120-Kapseln-Mockup_600x600.png", "images/products/waldkraft/herz/Schwarzer-Maca-Extrakt-120-Kapseln-Mockup_600x600.jpg", "images/products/waldkraft/herz/Vitamin-B12-Komplex-Drops-Mockup_600x600.jpg", "images/products/waldkraft/herz/Weihrauch_Mockup_600x600.jpg", "images/products/waldkraft/herz/Zink-Histidin-Komplex-120-Kapseln_mockup_600x600.jpg", "images/products/waldkraft/immunsystem/30ml_Mironglas_Flasche_aktuell-Kopie_600x600.jpg", "images/products/waldkraft/immunsystem/Astaxanthin_100ml_Mopckup_600x600.jpg", "images/products/waldkraft/immunsystem/Borax_120Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/immunsystem/Borax_70g_Mockup_600x600.jpg", "images/products/waldkraft/immunsystem/Chlorella_Tabs_Mockup-Kopie_600x600.jpg", "images/products/waldkraft/immunsystem/Gerstengras-Saftpulver-BIO_mockup_600x600.jpg", "images/products/waldkraft/immunsystem/Kelpalgen-Jod-BIO_mockup_600x600.jpg", "images/products/waldkraft/immunsystem/Kiefernnadel_Tinktur_mockup_600x600.jpg", "images/products/waldkraft/immunsystem/L-Lysin_Mockup_600x600.jpg", "images/products/waldkraft/immunsystem/Lebende-Chlorella-Algen-Mockup_600x600.jpg", "images/products/waldkraft/immunsystem/Loewenzahn_Tinktur_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/immunsystem/Lungenkraut_Komplex_Mockup_175x62_600x600.jpg", "images/products/waldkraft/immunsystem/MSM_Wunschpreis-jpg-0U1S_600x600.jpg", "images/products/waldkraft/immunsystem/OPC-Pycnogenol-60-Kapseln-Mockup_600x600.jpg", "images/products/waldkraft/immunsystem/Roter_Maca_Extrakt-120-Kapseln-Mockup_600x600.png", "images/products/waldkraft/immunsystem/Schwarzer-Maca-Extrakt-120-Kapseln-Mockup_600x600.jpg", "images/products/waldkraft/immunsystem/Selen-VitaminC_120Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/immunsystem/Spirulina-BIO-120-Kapseln_600x600.jpg", "images/products/waldkraft/immunsystem/Vitamin-B12-Komplex-Drops-Mockup_600x600.jpg", "images/products/waldkraft/immunsystem/Vitamin-C-Komplex-120-Kapseln_600x600.jpg", "images/products/waldkraft/immunsystem/Zink-Histidin-Komplex-120-Kapseln_mockup_600x600.jpg", "images/products/waldkraft/immunsystem/bio-kurkuma-extrakt-mit-gingerol-und-piperin-in-oxymel-250ml-pa10317_600x600.jpg", "images/products/waldkraft/immunsystem/liposomales-glutathion-aus-reduziertem-l-glutathion-250ml-pa10047_600x600.jpg", "images/products/waldkraft/immunsystem/manuka-honig-mgo-840-250g-4467-wk10500_600x600.png", "images/products/waldkraft/innere-ruhe/B6_Wohlfu-hl_Erythrit_Drops_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/innere-ruhe/KSM-Ashwagandha-BIO_Mockup_600x600.jpg", "images/products/waldkraft/innere-ruhe/Kraftpilz-Hericium-120Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/innere-ruhe/Kraftpilz-Regeneration-120Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/innere-ruhe/PEA_PUlver_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/innere-ruhe/Roter_Maca_Extrakt-120-Kapseln-Mockup_600x600.png", "images/products/waldkraft/innere-ruhe/Schwarzer-Maca-Extrakt-120-Kapseln-Mockup_600x600.jpg", "images/products/waldkraft/innere-ruhe/Vitamin-B12-Komplex-Drops-Mockup_600x600.jpg", "images/products/waldkraft/innere-ruhe/Zink-Histidin-Komplex-120-Kapseln_mockup_600x600.jpg", "images/products/waldkraft/innere-ruhe/melantonin-Drops-Mockup_600x600.jpg", "images/products/waldkraft/knochen/Astaxanthin-Drops-Mockup_600x600.jpg", "images/products/waldkraft/knochen/Astaxanthin-Hyaluron-Drops-Mockup_600x600.jpg", "images/products/waldkraft/knochen/Borax_Tropfen_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/knochen/Erdling-Vitamin-K2-Mockup-Flasche-Umverpackung_600x600.png", "images/products/waldkraft/knochen/Kraftpilz-Energie-120Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/knochen/L-Lysin_Mockup_600x600.jpg", "images/products/waldkraft/knochen/MSM_Wunschpreis-jpg-0U1S_600x600.jpg", "images/products/waldkraft/knochen/OPC-Pycnogenol-60-Kapseln-Mockup_600x600.jpg", "images/products/waldkraft/knochen/Osthea_300g_Mockup_600x600.jpg", "images/products/waldkraft/knochen/Sango_Koralle_Mockup_600x600.jpg", "images/products/waldkraft/knochen/Vitamin-C-Komplex-120-Kapseln_600x600.jpg", "images/products/waldkraft/knochen/arthridea_250g_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/knochen/arthridea_530Kapseln_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/knochen/bio-kurkuma-extrakt-mit-gingerol-und-piperin-in-oxymel-250ml-pa10317_600x600.jpg", "images/products/waldkraft/knochen/pea-palmitoylethanolamid-120-kapseln-4186-pa10621_600x600.jpg", "images/products/waldkraft/kolloide/Kolloidales-Germanium-100-ppm-100-ml-Spr-hflasche-Mockup_600x600.png", "images/products/waldkraft/kolloide/Kolloidales-Gold-100-ppm-100-ml-Mockup_600x600.png", "images/products/waldkraft/kolloide/Kolloidales_Silber_50_ppm_100_ml_Spr-hflasche_Mockup_1_1_1_1_600x600.png", "images/products/waldkraft/kolloide/waldkraft-Kolloidales-Silber-25ppm-250ml_600x600.png", "images/products/waldkraft/kraeuter/Kiefernnadel_Tinktur_mockup_600x600.jpg", "images/products/waldkraft/kraeuter/Loewenzahn_Tinktur_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/kraeuter/Mockups-Artemisia-alkohol-100ml_600x600.jpg", "images/products/waldkraft/kraeuter/Propolis-Tinktur-Mockup-1_600x600.png", "images/products/waldkraft/kraeuter/bio-kurkuma-extrakt-mit-gingerol-und-piperin-in-oxymel-250ml-pa10317_600x600.jpg", "images/products/waldkraft/magendarm/Basicum_120-Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/magendarm/Floratur-EM-BIO_2-1_600x600.png", "images/products/waldkraft/magendarm/Floratur_EM_BIO_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/magendarm/Gerstengras-Saftpulver-BIO_mockup_600x600.jpg", "images/products/waldkraft/magendarm/Kraftpilz-Hericium-120Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/magendarm/MSM_Wunschpreis-jpg-0U1S_600x600.jpg", "images/products/waldkraft/magendarm/bio-kurkuma-extrakt-mit-gingerol-und-piperin-in-oxymel-250ml-pa10317_600x600.jpg", "images/products/waldkraft/magendarm/chanca-piedra-pulver-150g-4098-pa10500_600x600.jpg", "images/products/waldkraft/magendarm/honigglas_klein_600x600.png", "images/products/waldkraft/magendarm/manuka-honig-mgo-840-250g-4467-wk10500_600x600.png", "images/products/waldkraft/magendarm/moor-elixier-pa10656-v_600x600.jpg", "images/products/waldkraft/mineralien/Basicum_120-Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/mineralien/Gerstengras-Saftpulver-BIO_mockup_600x600.jpg", "images/products/waldkraft/mineralien/Magnesium_Komplex_Mockup_600x600.jpg", "images/products/waldkraft/mineralien/Rotalgen_Calcium_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/mineralien/Sango_Koralle_Mockup_600x600.jpg", "images/products/waldkraft/mineralien/moor-elixier-pa10656-v_600x600.jpg", "images/products/waldkraft/mundhygiene/Vitamin-C-Komplex-120-Kapseln_600x600.jpg", "images/products/waldkraft/mundhygiene/Wasserstoffperoxid-3-Mockup_600x600.png", "images/products/waldkraft/mundhygiene/Zahnpulver_-Zitrone-_Mockup_600x600.png", "images/products/waldkraft/mundhygiene/Zahnpulver_mit_Notoginseng_Mockup_600x600.png", "images/products/waldkraft/naturkosmetik/Mockup-Artemisia-Balsam-30ml-miron-BgBW_600x600.png", "images/products/waldkraft/naturkosmetik/Nattokinase_Komplex_Mockup_web-jpg_600x600.jpg", "images/products/waldkraft/naturkosmetik/Nattokinase_Zink_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/naturkosmetik/Zahnpulver_-Zitrone-_Mockup_600x600.png", "images/products/waldkraft/naturkosmetik/Zahnpulver_mit_Notoginseng_Mockup_600x600.png", "images/products/waldkraft/naturkosmetik/manuka-honig-mgo-840-250g-4467-wk10500_600x600.png", "images/products/waldkraft/ozon/Canna3-Mockup_600x600.png", "images/products/waldkraft/ozon/Mockup-Kokoo3-50ml-1-1_600x600.png", "images/products/waldkraft/ozon/olivio3-ozonisiertes-olivenol-250ml-257-wk10090_600x600.png", "images/products/waldkraft/parasiten/Floratur-EM-BIO_2-1_600x600.png", "images/products/waldkraft/parasiten/Floratur_EM_BIO_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/parasiten/Kraftpilz-Energie-120Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/parasiten/Kraftpilz-Regeneration-120Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/parasiten/Kraftpilze_Mensch_Abwehr_Freya_Mockup_600x600.jpg", "images/products/waldkraft/parasiten/MSM_Wunschpreis-jpg-0U1S_600x600.jpg", "images/products/waldkraft/schlaf/B6_Wohlfu-hl_Erythrit_Drops_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/schlaf/KSM-Ashwagandha-BIO_Mockup_600x600.jpg", "images/products/waldkraft/schlaf/Noctea_Mopckup_600x600.jpg", "images/products/waldkraft/schlaf/honigglas_klein_600x600.png", "images/products/waldkraft/schlaf/melantonin-Drops-Mockup_600x600.jpg", "images/products/waldkraft/sensibilit\xE4t/Kelpalgen-Jod-BIO_mockup_600x600.jpg", "images/products/waldkraft/sensibilit\xE4t/MSM_Wunschpreis-jpg-0U1S_600x600.jpg", "images/products/waldkraft/sensibilit\xE4t/OPC-Pycnogenol-60-Kapseln-Mockup_600x600.jpg", "images/products/waldkraft/stoffwechsel/BIO-Chlorophyll-Extrakt-Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/stoffwechsel/Basicum_120-Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/stoffwechsel/Floratur-EM-BIO_2-1_600x600.png", "images/products/waldkraft/stoffwechsel/Floratur_EM_BIO_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/stoffwechsel/L-Arginin_Mopckup_600x600.jpg", "images/products/waldkraft/stoffwechsel/L-Methionin_Mockup_600x600.jpg", "images/products/waldkraft/stoffwechsel/Lungenkraut_Komplex_Mockup_175x62_600x600.jpg", "images/products/waldkraft/stoffwechsel/Roter_Maca_Extrakt-120-Kapseln-Mockup_600x600.png", "images/products/waldkraft/stoffwechsel/Schwarzer-Maca-Extrakt-120-Kapseln-Mockup_600x600.jpg", "images/products/waldkraft/stoffwechsel/Zink-Histidin-Komplex-120-Kapseln_mockup_600x600.jpg", "images/products/waldkraft/stoffwechsel/chanca-piedra-pulver-150g-4098-pa10500_600x600.jpg", "images/products/waldkraft/stoffwechsel/pea-palmitoylethanolamid-120-kapseln-4186-pa10621_600x600.jpg", "images/products/waldkraft/vitalpilze/Kraftpilz-Cordyceps-120Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/vitalpilze/Kraftpilz-Energie-120Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/vitalpilze/Kraftpilz-Hericium-120Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/vitalpilze/Kraftpilz-Leben-120Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/vitalpilze/Kraftpilz-Regeneration-120Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/vitalpilze/Kraftpilze_Mensch_Abwehr_Freya_Mockup_600x600.jpg"]),
    mimeTypes: { ".png": "image/png", ".jpeg": "image/jpeg", ".jpg": "image/jpeg", ".webp": "image/webp" },
    _: {
      client: { "start": "_app/immutable/entry/start.BHIY74Ye.js", "app": "_app/immutable/entry/app.DNO1E6sj.js", "imports": ["_app/immutable/entry/start.BHIY74Ye.js", "_app/immutable/chunks/entry.B8L6UBeC.js", "_app/immutable/chunks/scheduler.DfuChs2G.js", "_app/immutable/chunks/index.DEpSfGhY.js", "_app/immutable/entry/app.DNO1E6sj.js", "_app/immutable/chunks/preload-helper.BQ24v_F8.js", "_app/immutable/chunks/scheduler.DfuChs2G.js", "_app/immutable/chunks/index.BnyCCVNm.js"], "stylesheets": [], "fonts": [], "uses_env_dynamic_public": false },
      nodes: [
        __memo(() => Promise.resolve().then(() => (init__(), __exports))),
        __memo(() => Promise.resolve().then(() => (init__2(), __exports2))),
        __memo(() => Promise.resolve().then(() => (init__3(), __exports3)))
      ],
      routes: [
        {
          id: "/cdl-protokolle",
          pattern: /^\/cdl-protokolle\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 2 },
          endpoint: null
        }
      ],
      matchers: async () => {
        return {};
      },
      server_assets: {}
    }
  };
})();

// .svelte-kit/vercel-tmp/fn-1/edge.js
var server = new Server(manifest);
var initialized = server.init({
  env: (
    /** @type {Record<string, string>} */
    process.env
  )
});
var edge_default = async (request, context) => {
  await initialized;
  return server.respond(request, {
    getClientAddress() {
      return (
        /** @type {string} */
        request.headers.get("x-forwarded-for")
      );
    },
    platform: {
      context
    }
  });
};
export {
  edge_default as default
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
//# sourceMappingURL=index.js.map
