globalThis.global = globalThis;
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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
function is_promise(value) {
  return !!value && (typeof value === "object" || typeof value === "function") && typeof /** @type {any} */
  value.then === "function";
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
function set_current_component(component24) {
  current_component = component24;
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
  const component24 = get_current_component();
  return (type, detail, { cancelable = false } = {}) => {
    const callbacks = component24.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(
        /** @type {string} */
        type,
        detail,
        { cancelable }
      );
      callbacks.slice().forEach((fn) => {
        fn.call(component24, event);
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
function ensure_array_like(array_like_or_iterator) {
  return array_like_or_iterator?.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
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
function each(items, fn) {
  items = ensure_array_like(items);
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
function validate_component(component24, name2) {
  if (!component24 || !component24.$$render) {
    if (name2 === "svelte:component")
      name2 += " this={...}";
    throw new Error(
      `<${name2}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name2}>.`
    );
  }
  return component24;
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
          code: Array.from(result.css).map((css7) => css7.code).join("\n"),
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
var identity, current_component, _boolean_attributes, boolean_attributes, invalid_attribute_name_character, ATTR_REGEX, CONTENT_REGEX, missing_component, on_destroy;
var init_ssr = __esm({
  ".svelte-kit/output/server/chunks/ssr.js"() {
    identity = (x) => x;
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

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/webcrypto.js
var webcrypto_default;
var init_webcrypto = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/webcrypto.js"() {
    webcrypto_default = crypto;
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/digest.js
var init_digest = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/digest.js"() {
    init_webcrypto();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/buffer_utils.js
var encoder, decoder, MAX_INT32;
var init_buffer_utils = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/buffer_utils.js"() {
    init_digest();
    encoder = new TextEncoder();
    decoder = new TextDecoder();
    MAX_INT32 = 2 ** 32;
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/base64url.js
var encodeBase64, encode, decodeBase64, decode;
var init_base64url = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/base64url.js"() {
    init_buffer_utils();
    encodeBase64 = (input) => {
      let unencoded = input;
      if (typeof unencoded === "string") {
        unencoded = encoder.encode(unencoded);
      }
      const CHUNK_SIZE = 32768;
      const arr = [];
      for (let i = 0; i < unencoded.length; i += CHUNK_SIZE) {
        arr.push(String.fromCharCode.apply(null, unencoded.subarray(i, i + CHUNK_SIZE)));
      }
      return btoa(arr.join(""));
    };
    encode = (input) => {
      return encodeBase64(input).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    };
    decodeBase64 = (encoded) => {
      const binary = atob(encoded);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return bytes;
    };
    decode = (input) => {
      let encoded = input;
      if (encoded instanceof Uint8Array) {
        encoded = decoder.decode(encoded);
      }
      encoded = encoded.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
      try {
        return decodeBase64(encoded);
      } catch (_a) {
        throw new TypeError("The input to be decoded is not correctly encoded.");
      }
    };
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/util/errors.js
var init_errors = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/util/errors.js"() {
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/random.js
var random_default;
var init_random = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/random.js"() {
    init_webcrypto();
    random_default = webcrypto_default.getRandomValues.bind(webcrypto_default);
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/iv.js
var init_iv = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/iv.js"() {
    init_errors();
    init_random();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/check_iv_length.js
var init_check_iv_length = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/check_iv_length.js"() {
    init_errors();
    init_iv();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/check_cek_length.js
var init_check_cek_length = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/check_cek_length.js"() {
    init_errors();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/timing_safe_equal.js
var init_timing_safe_equal = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/timing_safe_equal.js"() {
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/crypto_key.js
var init_crypto_key = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/crypto_key.js"() {
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/invalid_key_input.js
var init_invalid_key_input = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/invalid_key_input.js"() {
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/is_key_like.js
var init_is_key_like = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/is_key_like.js"() {
    init_webcrypto();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/decrypt.js
var init_decrypt = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/decrypt.js"() {
    init_buffer_utils();
    init_check_iv_length();
    init_check_cek_length();
    init_timing_safe_equal();
    init_errors();
    init_webcrypto();
    init_crypto_key();
    init_invalid_key_input();
    init_is_key_like();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/zlib.js
var init_zlib = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/zlib.js"() {
    init_errors();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/is_disjoint.js
var init_is_disjoint = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/is_disjoint.js"() {
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/is_object.js
var init_is_object = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/is_object.js"() {
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/bogus.js
var init_bogus = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/bogus.js"() {
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/aeskw.js
var init_aeskw = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/aeskw.js"() {
    init_bogus();
    init_webcrypto();
    init_crypto_key();
    init_invalid_key_input();
    init_is_key_like();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/ecdhes.js
var init_ecdhes = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/ecdhes.js"() {
    init_buffer_utils();
    init_webcrypto();
    init_crypto_key();
    init_invalid_key_input();
    init_is_key_like();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/check_p2s.js
var init_check_p2s = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/check_p2s.js"() {
    init_errors();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/pbes2kw.js
var init_pbes2kw = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/pbes2kw.js"() {
    init_random();
    init_buffer_utils();
    init_base64url();
    init_aeskw();
    init_check_p2s();
    init_webcrypto();
    init_crypto_key();
    init_invalid_key_input();
    init_is_key_like();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/subtle_rsaes.js
var init_subtle_rsaes = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/subtle_rsaes.js"() {
    init_errors();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/check_key_length.js
var init_check_key_length = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/check_key_length.js"() {
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/rsaes.js
var init_rsaes = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/rsaes.js"() {
    init_subtle_rsaes();
    init_bogus();
    init_webcrypto();
    init_crypto_key();
    init_check_key_length();
    init_invalid_key_input();
    init_is_key_like();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/cek.js
var init_cek = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/cek.js"() {
    init_errors();
    init_random();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/format_pem.js
var init_format_pem = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/format_pem.js"() {
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/asn1.js
var init_asn1 = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/asn1.js"() {
    init_webcrypto();
    init_invalid_key_input();
    init_base64url();
    init_format_pem();
    init_errors();
    init_is_key_like();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/jwk_to_key.js
var init_jwk_to_key = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/jwk_to_key.js"() {
    init_webcrypto();
    init_errors();
    init_base64url();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/key/import.js
var init_import = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/key/import.js"() {
    init_base64url();
    init_asn1();
    init_jwk_to_key();
    init_errors();
    init_is_object();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/check_key_type.js
var init_check_key_type = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/check_key_type.js"() {
    init_invalid_key_input();
    init_is_key_like();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/encrypt.js
var init_encrypt = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/encrypt.js"() {
    init_buffer_utils();
    init_check_iv_length();
    init_check_cek_length();
    init_webcrypto();
    init_crypto_key();
    init_invalid_key_input();
    init_errors();
    init_is_key_like();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/aesgcmkw.js
var init_aesgcmkw = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/aesgcmkw.js"() {
    init_encrypt();
    init_decrypt();
    init_iv();
    init_base64url();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/decrypt_key_management.js
var init_decrypt_key_management = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/decrypt_key_management.js"() {
    init_aeskw();
    init_ecdhes();
    init_pbes2kw();
    init_rsaes();
    init_base64url();
    init_errors();
    init_cek();
    init_import();
    init_check_key_type();
    init_is_object();
    init_aesgcmkw();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/validate_crit.js
var init_validate_crit = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/validate_crit.js"() {
    init_errors();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/validate_algorithms.js
var init_validate_algorithms = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/validate_algorithms.js"() {
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jwe/flattened/decrypt.js
var init_decrypt2 = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jwe/flattened/decrypt.js"() {
    init_base64url();
    init_decrypt();
    init_zlib();
    init_errors();
    init_is_disjoint();
    init_is_object();
    init_decrypt_key_management();
    init_buffer_utils();
    init_cek();
    init_validate_crit();
    init_validate_algorithms();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jwe/compact/decrypt.js
var init_decrypt3 = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jwe/compact/decrypt.js"() {
    init_decrypt2();
    init_errors();
    init_buffer_utils();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jwe/general/decrypt.js
var init_decrypt4 = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jwe/general/decrypt.js"() {
    init_decrypt2();
    init_errors();
    init_is_object();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/key_to_jwk.js
var init_key_to_jwk = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/key_to_jwk.js"() {
    init_webcrypto();
    init_invalid_key_input();
    init_base64url();
    init_is_key_like();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/key/export.js
var init_export = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/key/export.js"() {
    init_asn1();
    init_asn1();
    init_key_to_jwk();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/encrypt_key_management.js
var init_encrypt_key_management = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/encrypt_key_management.js"() {
    init_aeskw();
    init_ecdhes();
    init_pbes2kw();
    init_rsaes();
    init_base64url();
    init_cek();
    init_errors();
    init_export();
    init_check_key_type();
    init_aesgcmkw();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jwe/flattened/encrypt.js
var unprotected;
var init_encrypt2 = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jwe/flattened/encrypt.js"() {
    init_base64url();
    init_encrypt();
    init_zlib();
    init_iv();
    init_encrypt_key_management();
    init_errors();
    init_is_disjoint();
    init_buffer_utils();
    init_validate_crit();
    unprotected = Symbol();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jwe/general/encrypt.js
var init_encrypt3 = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jwe/general/encrypt.js"() {
    init_encrypt2();
    init_errors();
    init_cek();
    init_is_disjoint();
    init_encrypt_key_management();
    init_base64url();
    init_validate_crit();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/subtle_dsa.js
var init_subtle_dsa = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/subtle_dsa.js"() {
    init_errors();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/get_sign_verify_key.js
var init_get_sign_verify_key = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/get_sign_verify_key.js"() {
    init_webcrypto();
    init_crypto_key();
    init_invalid_key_input();
    init_is_key_like();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/verify.js
var init_verify = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/verify.js"() {
    init_subtle_dsa();
    init_webcrypto();
    init_check_key_length();
    init_get_sign_verify_key();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jws/flattened/verify.js
var init_verify2 = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jws/flattened/verify.js"() {
    init_base64url();
    init_verify();
    init_errors();
    init_buffer_utils();
    init_is_disjoint();
    init_is_object();
    init_check_key_type();
    init_validate_crit();
    init_validate_algorithms();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jws/compact/verify.js
var init_verify3 = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jws/compact/verify.js"() {
    init_verify2();
    init_errors();
    init_buffer_utils();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jws/general/verify.js
var init_verify4 = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jws/general/verify.js"() {
    init_verify2();
    init_errors();
    init_is_object();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/epoch.js
var init_epoch = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/epoch.js"() {
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/secs.js
var minute, hour, day, week, year;
var init_secs = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/secs.js"() {
    minute = 60;
    hour = minute * 60;
    day = hour * 24;
    week = day * 7;
    year = day * 365.25;
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/jwt_claims_set.js
var init_jwt_claims_set = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/lib/jwt_claims_set.js"() {
    init_errors();
    init_buffer_utils();
    init_epoch();
    init_secs();
    init_is_object();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jwt/verify.js
var init_verify5 = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jwt/verify.js"() {
    init_verify3();
    init_jwt_claims_set();
    init_errors();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jwt/decrypt.js
var init_decrypt5 = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jwt/decrypt.js"() {
    init_decrypt3();
    init_jwt_claims_set();
    init_errors();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jwe/compact/encrypt.js
var init_encrypt4 = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jwe/compact/encrypt.js"() {
    init_encrypt2();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/sign.js
var init_sign = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/sign.js"() {
    init_subtle_dsa();
    init_webcrypto();
    init_check_key_length();
    init_get_sign_verify_key();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jws/flattened/sign.js
var init_sign2 = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jws/flattened/sign.js"() {
    init_base64url();
    init_sign();
    init_is_disjoint();
    init_errors();
    init_buffer_utils();
    init_check_key_type();
    init_validate_crit();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jws/compact/sign.js
var init_sign3 = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jws/compact/sign.js"() {
    init_sign2();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jws/general/sign.js
var init_sign4 = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jws/general/sign.js"() {
    init_sign2();
    init_errors();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jwt/produce.js
var init_produce = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jwt/produce.js"() {
    init_epoch();
    init_is_object();
    init_secs();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jwt/sign.js
var init_sign5 = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jwt/sign.js"() {
    init_sign3();
    init_errors();
    init_buffer_utils();
    init_produce();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jwt/encrypt.js
var init_encrypt5 = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jwt/encrypt.js"() {
    init_encrypt4();
    init_buffer_utils();
    init_produce();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jwk/thumbprint.js
var init_thumbprint = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jwk/thumbprint.js"() {
    init_digest();
    init_base64url();
    init_errors();
    init_buffer_utils();
    init_is_object();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jwk/embedded.js
var init_embedded = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jwk/embedded.js"() {
    init_import();
    init_is_object();
    init_errors();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jwks/local.js
var init_local = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jwks/local.js"() {
    init_import();
    init_errors();
    init_is_object();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/fetch_jwks.js
var init_fetch_jwks = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/fetch_jwks.js"() {
    init_errors();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jwks/remote.js
var init_remote = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jwks/remote.js"() {
    init_fetch_jwks();
    init_errors();
    init_local();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jwt/unsecured.js
var init_unsecured = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/jwt/unsecured.js"() {
    init_base64url();
    init_buffer_utils();
    init_errors();
    init_jwt_claims_set();
    init_produce();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/util/base64url.js
var base64url_exports2 = {};
__export(base64url_exports2, {
  decode: () => decode2,
  encode: () => encode2
});
var encode2, decode2;
var init_base64url2 = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/util/base64url.js"() {
    init_base64url();
    encode2 = encode;
    decode2 = decode;
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/util/decode_protected_header.js
var init_decode_protected_header = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/util/decode_protected_header.js"() {
    init_base64url2();
    init_buffer_utils();
    init_is_object();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/util/decode_jwt.js
var init_decode_jwt = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/util/decode_jwt.js"() {
    init_base64url2();
    init_buffer_utils();
    init_is_object();
    init_errors();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/generate.js
var init_generate = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/generate.js"() {
    init_webcrypto();
    init_errors();
    init_random();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/key/generate_key_pair.js
var init_generate_key_pair = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/key/generate_key_pair.js"() {
    init_generate();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/key/generate_secret.js
var init_generate_secret = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/key/generate_secret.js"() {
    init_generate();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/runtime.js
var init_runtime = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/runtime/runtime.js"() {
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/util/runtime.js
var init_runtime2 = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/util/runtime.js"() {
    init_runtime();
  }
});

// node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/index.js
var init_browser = __esm({
  "node_modules/.pnpm/jose@4.15.5/node_modules/jose/dist/browser/index.js"() {
    init_decrypt3();
    init_decrypt2();
    init_decrypt4();
    init_encrypt3();
    init_verify3();
    init_verify2();
    init_verify4();
    init_verify5();
    init_decrypt5();
    init_encrypt4();
    init_encrypt2();
    init_sign3();
    init_sign2();
    init_sign4();
    init_sign5();
    init_encrypt5();
    init_thumbprint();
    init_embedded();
    init_local();
    init_remote();
    init_unsecured();
    init_export();
    init_import();
    init_decode_protected_header();
    init_decode_jwt();
    init_errors();
    init_generate_key_pair();
    init_generate_secret();
    init_base64url2();
    init_runtime2();
  }
});

// node_modules/.pnpm/@supabase+node-fetch@2.6.15/node_modules/@supabase/node-fetch/browser.js
var browser_exports = {};
__export(browser_exports, {
  Headers: () => Headers2,
  Request: () => Request2,
  Response: () => Response2,
  default: () => browser_default,
  fetch: () => fetch2
});
var getGlobal, globalObject, fetch2, browser_default, Headers2, Request2, Response2;
var init_browser2 = __esm({
  "node_modules/.pnpm/@supabase+node-fetch@2.6.15/node_modules/@supabase/node-fetch/browser.js"() {
    "use strict";
    getGlobal = function() {
      if (typeof self !== "undefined") {
        return self;
      }
      if (typeof window !== "undefined") {
        return window;
      }
      if (typeof global !== "undefined") {
        return global;
      }
      throw new Error("unable to locate global object");
    };
    globalObject = getGlobal();
    fetch2 = globalObject.fetch;
    browser_default = globalObject.fetch.bind(globalObject);
    Headers2 = globalObject.Headers;
    Request2 = globalObject.Request;
    Response2 = globalObject.Response;
  }
});

// node_modules/.pnpm/@supabase+functions-js@2.1.5/node_modules/@supabase/functions-js/dist/module/helper.js
var resolveFetch;
var init_helper = __esm({
  "node_modules/.pnpm/@supabase+functions-js@2.1.5/node_modules/@supabase/functions-js/dist/module/helper.js"() {
    resolveFetch = (customFetch) => {
      let _fetch;
      if (customFetch) {
        _fetch = customFetch;
      } else if (typeof fetch === "undefined") {
        _fetch = (...args) => Promise.resolve().then(() => (init_browser2(), browser_exports)).then(({ default: fetch3 }) => fetch3(...args));
      } else {
        _fetch = fetch;
      }
      return (...args) => _fetch(...args);
    };
  }
});

// node_modules/.pnpm/@supabase+functions-js@2.1.5/node_modules/@supabase/functions-js/dist/module/types.js
var FunctionsError, FunctionsFetchError, FunctionsRelayError, FunctionsHttpError;
var init_types = __esm({
  "node_modules/.pnpm/@supabase+functions-js@2.1.5/node_modules/@supabase/functions-js/dist/module/types.js"() {
    FunctionsError = class extends Error {
      constructor(message, name2 = "FunctionsError", context) {
        super(message);
        this.name = name2;
        this.context = context;
      }
    };
    FunctionsFetchError = class extends FunctionsError {
      constructor(context) {
        super("Failed to send a request to the Edge Function", "FunctionsFetchError", context);
      }
    };
    FunctionsRelayError = class extends FunctionsError {
      constructor(context) {
        super("Relay Error invoking the Edge Function", "FunctionsRelayError", context);
      }
    };
    FunctionsHttpError = class extends FunctionsError {
      constructor(context) {
        super("Edge Function returned a non-2xx status code", "FunctionsHttpError", context);
      }
    };
  }
});

// node_modules/.pnpm/@supabase+functions-js@2.1.5/node_modules/@supabase/functions-js/dist/module/FunctionsClient.js
var __awaiter, FunctionsClient;
var init_FunctionsClient = __esm({
  "node_modules/.pnpm/@supabase+functions-js@2.1.5/node_modules/@supabase/functions-js/dist/module/FunctionsClient.js"() {
    init_helper();
    init_types();
    __awaiter = function(thisArg, _arguments, P2, generator) {
      function adopt(value) {
        return value instanceof P2 ? value : new P2(function(resolve2) {
          resolve2(value);
        });
      }
      return new (P2 || (P2 = Promise))(function(resolve2, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    FunctionsClient = class {
      constructor(url, { headers: headers2 = {}, customFetch } = {}) {
        this.url = url;
        this.headers = headers2;
        this.fetch = resolveFetch(customFetch);
      }
      /**
       * Updates the authorization header
       * @param token - the new jwt token sent in the authorisation header
       */
      setAuth(token) {
        this.headers.Authorization = `Bearer ${token}`;
      }
      /**
       * Invokes a function
       * @param functionName - The name of the Function to invoke.
       * @param options - Options for invoking the Function.
       */
      invoke(functionName, options2 = {}) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
          try {
            const { headers: headers2, method, body: functionArgs } = options2;
            let _headers = {};
            let body2;
            if (functionArgs && (headers2 && !Object.prototype.hasOwnProperty.call(headers2, "Content-Type") || !headers2)) {
              if (typeof Blob !== "undefined" && functionArgs instanceof Blob || functionArgs instanceof ArrayBuffer) {
                _headers["Content-Type"] = "application/octet-stream";
                body2 = functionArgs;
              } else if (typeof functionArgs === "string") {
                _headers["Content-Type"] = "text/plain";
                body2 = functionArgs;
              } else if (typeof FormData !== "undefined" && functionArgs instanceof FormData) {
                body2 = functionArgs;
              } else {
                _headers["Content-Type"] = "application/json";
                body2 = JSON.stringify(functionArgs);
              }
            }
            const response = yield this.fetch(`${this.url}/${functionName}`, {
              method: method || "POST",
              // headers priority is (high to low):
              // 1. invoke-level headers
              // 2. client-level headers
              // 3. default Content-Type header
              headers: Object.assign(Object.assign(Object.assign({}, _headers), this.headers), headers2),
              body: body2
            }).catch((fetchError) => {
              throw new FunctionsFetchError(fetchError);
            });
            const isRelayError = response.headers.get("x-relay-error");
            if (isRelayError && isRelayError === "true") {
              throw new FunctionsRelayError(response);
            }
            if (!response.ok) {
              throw new FunctionsHttpError(response);
            }
            let responseType = ((_a = response.headers.get("Content-Type")) !== null && _a !== void 0 ? _a : "text/plain").split(";")[0].trim();
            let data;
            if (responseType === "application/json") {
              data = yield response.json();
            } else if (responseType === "application/octet-stream") {
              data = yield response.blob();
            } else if (responseType === "multipart/form-data") {
              data = yield response.formData();
            } else {
              data = yield response.text();
            }
            return { data, error: null };
          } catch (error2) {
            return { data: null, error: error2 };
          }
        });
      }
    };
  }
});

// node_modules/.pnpm/@supabase+functions-js@2.1.5/node_modules/@supabase/functions-js/dist/module/index.js
var init_module = __esm({
  "node_modules/.pnpm/@supabase+functions-js@2.1.5/node_modules/@supabase/functions-js/dist/module/index.js"() {
    init_FunctionsClient();
  }
});

// node_modules/.pnpm/@supabase+postgrest-js@1.9.2/node_modules/@supabase/postgrest-js/dist/module/PostgrestError.js
var PostgrestError;
var init_PostgrestError = __esm({
  "node_modules/.pnpm/@supabase+postgrest-js@1.9.2/node_modules/@supabase/postgrest-js/dist/module/PostgrestError.js"() {
    PostgrestError = class extends Error {
      constructor(context) {
        super(context.message);
        this.name = "PostgrestError";
        this.details = context.details;
        this.hint = context.hint;
        this.code = context.code;
      }
    };
  }
});

// node_modules/.pnpm/@supabase+postgrest-js@1.9.2/node_modules/@supabase/postgrest-js/dist/module/PostgrestBuilder.js
var PostgrestBuilder;
var init_PostgrestBuilder = __esm({
  "node_modules/.pnpm/@supabase+postgrest-js@1.9.2/node_modules/@supabase/postgrest-js/dist/module/PostgrestBuilder.js"() {
    init_browser2();
    init_PostgrestError();
    PostgrestBuilder = class {
      constructor(builder) {
        this.shouldThrowOnError = false;
        this.method = builder.method;
        this.url = builder.url;
        this.headers = builder.headers;
        this.schema = builder.schema;
        this.body = builder.body;
        this.shouldThrowOnError = builder.shouldThrowOnError;
        this.signal = builder.signal;
        this.isMaybeSingle = builder.isMaybeSingle;
        if (builder.fetch) {
          this.fetch = builder.fetch;
        } else if (typeof fetch === "undefined") {
          this.fetch = browser_default;
        } else {
          this.fetch = fetch;
        }
      }
      /**
       * If there's an error with the query, throwOnError will reject the promise by
       * throwing the error instead of returning it as part of a successful response.
       *
       * {@link https://github.com/supabase/supabase-js/issues/92}
       */
      throwOnError() {
        this.shouldThrowOnError = true;
        return this;
      }
      then(onfulfilled, onrejected) {
        if (this.schema === void 0) {
        } else if (["GET", "HEAD"].includes(this.method)) {
          this.headers["Accept-Profile"] = this.schema;
        } else {
          this.headers["Content-Profile"] = this.schema;
        }
        if (this.method !== "GET" && this.method !== "HEAD") {
          this.headers["Content-Type"] = "application/json";
        }
        const _fetch = this.fetch;
        let res = _fetch(this.url.toString(), {
          method: this.method,
          headers: this.headers,
          body: JSON.stringify(this.body),
          signal: this.signal
        }).then(async (res2) => {
          var _a, _b, _c;
          let error2 = null;
          let data = null;
          let count = null;
          let status = res2.status;
          let statusText = res2.statusText;
          if (res2.ok) {
            if (this.method !== "HEAD") {
              const body2 = await res2.text();
              if (body2 === "") {
              } else if (this.headers["Accept"] === "text/csv") {
                data = body2;
              } else if (this.headers["Accept"] && this.headers["Accept"].includes("application/vnd.pgrst.plan+text")) {
                data = body2;
              } else {
                data = JSON.parse(body2);
              }
            }
            const countHeader = (_a = this.headers["Prefer"]) === null || _a === void 0 ? void 0 : _a.match(/count=(exact|planned|estimated)/);
            const contentRange = (_b = res2.headers.get("content-range")) === null || _b === void 0 ? void 0 : _b.split("/");
            if (countHeader && contentRange && contentRange.length > 1) {
              count = parseInt(contentRange[1]);
            }
            if (this.isMaybeSingle && this.method === "GET" && Array.isArray(data)) {
              if (data.length > 1) {
                error2 = {
                  // https://github.com/PostgREST/postgrest/blob/a867d79c42419af16c18c3fb019eba8df992626f/src/PostgREST/Error.hs#L553
                  code: "PGRST116",
                  details: `Results contain ${data.length} rows, application/vnd.pgrst.object+json requires 1 row`,
                  hint: null,
                  message: "JSON object requested, multiple (or no) rows returned"
                };
                data = null;
                count = null;
                status = 406;
                statusText = "Not Acceptable";
              } else if (data.length === 1) {
                data = data[0];
              } else {
                data = null;
              }
            }
          } else {
            const body2 = await res2.text();
            try {
              error2 = JSON.parse(body2);
              if (Array.isArray(error2) && res2.status === 404) {
                data = [];
                error2 = null;
                status = 200;
                statusText = "OK";
              }
            } catch (_d) {
              if (res2.status === 404 && body2 === "") {
                status = 204;
                statusText = "No Content";
              } else {
                error2 = {
                  message: body2
                };
              }
            }
            if (error2 && this.isMaybeSingle && ((_c = error2 === null || error2 === void 0 ? void 0 : error2.details) === null || _c === void 0 ? void 0 : _c.includes("0 rows"))) {
              error2 = null;
              status = 200;
              statusText = "OK";
            }
            if (error2 && this.shouldThrowOnError) {
              throw new PostgrestError(error2);
            }
          }
          const postgrestResponse = {
            error: error2,
            data,
            count,
            status,
            statusText
          };
          return postgrestResponse;
        });
        if (!this.shouldThrowOnError) {
          res = res.catch((fetchError) => {
            var _a, _b, _c;
            return {
              error: {
                message: `${(_a = fetchError === null || fetchError === void 0 ? void 0 : fetchError.name) !== null && _a !== void 0 ? _a : "FetchError"}: ${fetchError === null || fetchError === void 0 ? void 0 : fetchError.message}`,
                details: `${(_b = fetchError === null || fetchError === void 0 ? void 0 : fetchError.stack) !== null && _b !== void 0 ? _b : ""}`,
                hint: "",
                code: `${(_c = fetchError === null || fetchError === void 0 ? void 0 : fetchError.code) !== null && _c !== void 0 ? _c : ""}`
              },
              data: null,
              count: null,
              status: 0,
              statusText: ""
            };
          });
        }
        return res.then(onfulfilled, onrejected);
      }
    };
  }
});

// node_modules/.pnpm/@supabase+postgrest-js@1.9.2/node_modules/@supabase/postgrest-js/dist/module/PostgrestTransformBuilder.js
var PostgrestTransformBuilder;
var init_PostgrestTransformBuilder = __esm({
  "node_modules/.pnpm/@supabase+postgrest-js@1.9.2/node_modules/@supabase/postgrest-js/dist/module/PostgrestTransformBuilder.js"() {
    init_PostgrestBuilder();
    PostgrestTransformBuilder = class extends PostgrestBuilder {
      /**
       * Perform a SELECT on the query result.
       *
       * By default, `.insert()`, `.update()`, `.upsert()`, and `.delete()` do not
       * return modified rows. By calling this method, modified rows are returned in
       * `data`.
       *
       * @param columns - The columns to retrieve, separated by commas
       */
      select(columns) {
        let quoted2 = false;
        const cleanedColumns = (columns !== null && columns !== void 0 ? columns : "*").split("").map((c) => {
          if (/\s/.test(c) && !quoted2) {
            return "";
          }
          if (c === '"') {
            quoted2 = !quoted2;
          }
          return c;
        }).join("");
        this.url.searchParams.set("select", cleanedColumns);
        if (this.headers["Prefer"]) {
          this.headers["Prefer"] += ",";
        }
        this.headers["Prefer"] += "return=representation";
        return this;
      }
      /**
       * Order the query result by `column`.
       *
       * You can call this method multiple times to order by multiple columns.
       *
       * You can order referenced tables, but it only affects the ordering of the
       * parent table if you use `!inner` in the query.
       *
       * @param column - The column to order by
       * @param options - Named parameters
       * @param options.ascending - If `true`, the result will be in ascending order
       * @param options.nullsFirst - If `true`, `null`s appear first. If `false`,
       * `null`s appear last.
       * @param options.referencedTable - Set this to order a referenced table by
       * its columns
       * @param options.foreignTable - Deprecated, use `options.referencedTable`
       * instead
       */
      order(column, { ascending = true, nullsFirst, foreignTable, referencedTable = foreignTable } = {}) {
        const key2 = referencedTable ? `${referencedTable}.order` : "order";
        const existingOrder = this.url.searchParams.get(key2);
        this.url.searchParams.set(key2, `${existingOrder ? `${existingOrder},` : ""}${column}.${ascending ? "asc" : "desc"}${nullsFirst === void 0 ? "" : nullsFirst ? ".nullsfirst" : ".nullslast"}`);
        return this;
      }
      /**
       * Limit the query result by `count`.
       *
       * @param count - The maximum number of rows to return
       * @param options - Named parameters
       * @param options.referencedTable - Set this to limit rows of referenced
       * tables instead of the parent table
       * @param options.foreignTable - Deprecated, use `options.referencedTable`
       * instead
       */
      limit(count, { foreignTable, referencedTable = foreignTable } = {}) {
        const key2 = typeof referencedTable === "undefined" ? "limit" : `${referencedTable}.limit`;
        this.url.searchParams.set(key2, `${count}`);
        return this;
      }
      /**
       * Limit the query result by starting at an offset (`from`) and ending at the offset (`from + to`).
       * Only records within this range are returned.
       * This respects the query order and if there is no order clause the range could behave unexpectedly.
       * The `from` and `to` values are 0-based and inclusive: `range(1, 3)` will include the second, third
       * and fourth rows of the query.
       *
       * @param from - The starting index from which to limit the result
       * @param to - The last index to which to limit the result
       * @param options - Named parameters
       * @param options.referencedTable - Set this to limit rows of referenced
       * tables instead of the parent table
       * @param options.foreignTable - Deprecated, use `options.referencedTable`
       * instead
       */
      range(from, to, { foreignTable, referencedTable = foreignTable } = {}) {
        const keyOffset = typeof referencedTable === "undefined" ? "offset" : `${referencedTable}.offset`;
        const keyLimit = typeof referencedTable === "undefined" ? "limit" : `${referencedTable}.limit`;
        this.url.searchParams.set(keyOffset, `${from}`);
        this.url.searchParams.set(keyLimit, `${to - from + 1}`);
        return this;
      }
      /**
       * Set the AbortSignal for the fetch request.
       *
       * @param signal - The AbortSignal to use for the fetch request
       */
      abortSignal(signal) {
        this.signal = signal;
        return this;
      }
      /**
       * Return `data` as a single object instead of an array of objects.
       *
       * Query result must be one row (e.g. using `.limit(1)`), otherwise this
       * returns an error.
       */
      single() {
        this.headers["Accept"] = "application/vnd.pgrst.object+json";
        return this;
      }
      /**
       * Return `data` as a single object instead of an array of objects.
       *
       * Query result must be zero or one row (e.g. using `.limit(1)`), otherwise
       * this returns an error.
       */
      maybeSingle() {
        if (this.method === "GET") {
          this.headers["Accept"] = "application/json";
        } else {
          this.headers["Accept"] = "application/vnd.pgrst.object+json";
        }
        this.isMaybeSingle = true;
        return this;
      }
      /**
       * Return `data` as a string in CSV format.
       */
      csv() {
        this.headers["Accept"] = "text/csv";
        return this;
      }
      /**
       * Return `data` as an object in [GeoJSON](https://geojson.org) format.
       */
      geojson() {
        this.headers["Accept"] = "application/geo+json";
        return this;
      }
      /**
       * Return `data` as the EXPLAIN plan for the query.
       *
       * You need to enable the
       * [db_plan_enabled](https://supabase.com/docs/guides/database/debugging-performance#enabling-explain)
       * setting before using this method.
       *
       * @param options - Named parameters
       *
       * @param options.analyze - If `true`, the query will be executed and the
       * actual run time will be returned
       *
       * @param options.verbose - If `true`, the query identifier will be returned
       * and `data` will include the output columns of the query
       *
       * @param options.settings - If `true`, include information on configuration
       * parameters that affect query planning
       *
       * @param options.buffers - If `true`, include information on buffer usage
       *
       * @param options.wal - If `true`, include information on WAL record generation
       *
       * @param options.format - The format of the output, can be `"text"` (default)
       * or `"json"`
       */
      explain({ analyze = false, verbose = false, settings = false, buffers = false, wal = false, format = "text" } = {}) {
        var _a;
        const options2 = [
          analyze ? "analyze" : null,
          verbose ? "verbose" : null,
          settings ? "settings" : null,
          buffers ? "buffers" : null,
          wal ? "wal" : null
        ].filter(Boolean).join("|");
        const forMediatype = (_a = this.headers["Accept"]) !== null && _a !== void 0 ? _a : "application/json";
        this.headers["Accept"] = `application/vnd.pgrst.plan+${format}; for="${forMediatype}"; options=${options2};`;
        if (format === "json")
          return this;
        else
          return this;
      }
      /**
       * Rollback the query.
       *
       * `data` will still be returned, but the query is not committed.
       */
      rollback() {
        var _a;
        if (((_a = this.headers["Prefer"]) !== null && _a !== void 0 ? _a : "").trim().length > 0) {
          this.headers["Prefer"] += ",tx=rollback";
        } else {
          this.headers["Prefer"] = "tx=rollback";
        }
        return this;
      }
      /**
       * Override the type of the returned `data`.
       *
       * @typeParam NewResult - The new result type to override with
       */
      returns() {
        return this;
      }
    };
  }
});

// node_modules/.pnpm/@supabase+postgrest-js@1.9.2/node_modules/@supabase/postgrest-js/dist/module/PostgrestFilterBuilder.js
var PostgrestFilterBuilder;
var init_PostgrestFilterBuilder = __esm({
  "node_modules/.pnpm/@supabase+postgrest-js@1.9.2/node_modules/@supabase/postgrest-js/dist/module/PostgrestFilterBuilder.js"() {
    init_PostgrestTransformBuilder();
    PostgrestFilterBuilder = class extends PostgrestTransformBuilder {
      /**
       * Match only rows where `column` is equal to `value`.
       *
       * To check if the value of `column` is NULL, you should use `.is()` instead.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      eq(column, value) {
        this.url.searchParams.append(column, `eq.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` is not equal to `value`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      neq(column, value) {
        this.url.searchParams.append(column, `neq.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` is greater than `value`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      gt(column, value) {
        this.url.searchParams.append(column, `gt.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` is greater than or equal to `value`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      gte(column, value) {
        this.url.searchParams.append(column, `gte.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` is less than `value`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      lt(column, value) {
        this.url.searchParams.append(column, `lt.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` is less than or equal to `value`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      lte(column, value) {
        this.url.searchParams.append(column, `lte.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` matches `pattern` case-sensitively.
       *
       * @param column - The column to filter on
       * @param pattern - The pattern to match with
       */
      like(column, pattern2) {
        this.url.searchParams.append(column, `like.${pattern2}`);
        return this;
      }
      /**
       * Match only rows where `column` matches all of `patterns` case-sensitively.
       *
       * @param column - The column to filter on
       * @param patterns - The patterns to match with
       */
      likeAllOf(column, patterns) {
        this.url.searchParams.append(column, `like(all).{${patterns.join(",")}}`);
        return this;
      }
      /**
       * Match only rows where `column` matches any of `patterns` case-sensitively.
       *
       * @param column - The column to filter on
       * @param patterns - The patterns to match with
       */
      likeAnyOf(column, patterns) {
        this.url.searchParams.append(column, `like(any).{${patterns.join(",")}}`);
        return this;
      }
      /**
       * Match only rows where `column` matches `pattern` case-insensitively.
       *
       * @param column - The column to filter on
       * @param pattern - The pattern to match with
       */
      ilike(column, pattern2) {
        this.url.searchParams.append(column, `ilike.${pattern2}`);
        return this;
      }
      /**
       * Match only rows where `column` matches all of `patterns` case-insensitively.
       *
       * @param column - The column to filter on
       * @param patterns - The patterns to match with
       */
      ilikeAllOf(column, patterns) {
        this.url.searchParams.append(column, `ilike(all).{${patterns.join(",")}}`);
        return this;
      }
      /**
       * Match only rows where `column` matches any of `patterns` case-insensitively.
       *
       * @param column - The column to filter on
       * @param patterns - The patterns to match with
       */
      ilikeAnyOf(column, patterns) {
        this.url.searchParams.append(column, `ilike(any).{${patterns.join(",")}}`);
        return this;
      }
      /**
       * Match only rows where `column` IS `value`.
       *
       * For non-boolean columns, this is only relevant for checking if the value of
       * `column` is NULL by setting `value` to `null`.
       *
       * For boolean columns, you can also set `value` to `true` or `false` and it
       * will behave the same way as `.eq()`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      is(column, value) {
        this.url.searchParams.append(column, `is.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` is included in the `values` array.
       *
       * @param column - The column to filter on
       * @param values - The values array to filter with
       */
      in(column, values) {
        const cleanedValues = values.map((s2) => {
          if (typeof s2 === "string" && new RegExp("[,()]").test(s2))
            return `"${s2}"`;
          else
            return `${s2}`;
        }).join(",");
        this.url.searchParams.append(column, `in.(${cleanedValues})`);
        return this;
      }
      /**
       * Only relevant for jsonb, array, and range columns. Match only rows where
       * `column` contains every element appearing in `value`.
       *
       * @param column - The jsonb, array, or range column to filter on
       * @param value - The jsonb, array, or range value to filter with
       */
      contains(column, value) {
        if (typeof value === "string") {
          this.url.searchParams.append(column, `cs.${value}`);
        } else if (Array.isArray(value)) {
          this.url.searchParams.append(column, `cs.{${value.join(",")}}`);
        } else {
          this.url.searchParams.append(column, `cs.${JSON.stringify(value)}`);
        }
        return this;
      }
      /**
       * Only relevant for jsonb, array, and range columns. Match only rows where
       * every element appearing in `column` is contained by `value`.
       *
       * @param column - The jsonb, array, or range column to filter on
       * @param value - The jsonb, array, or range value to filter with
       */
      containedBy(column, value) {
        if (typeof value === "string") {
          this.url.searchParams.append(column, `cd.${value}`);
        } else if (Array.isArray(value)) {
          this.url.searchParams.append(column, `cd.{${value.join(",")}}`);
        } else {
          this.url.searchParams.append(column, `cd.${JSON.stringify(value)}`);
        }
        return this;
      }
      /**
       * Only relevant for range columns. Match only rows where every element in
       * `column` is greater than any element in `range`.
       *
       * @param column - The range column to filter on
       * @param range - The range to filter with
       */
      rangeGt(column, range) {
        this.url.searchParams.append(column, `sr.${range}`);
        return this;
      }
      /**
       * Only relevant for range columns. Match only rows where every element in
       * `column` is either contained in `range` or greater than any element in
       * `range`.
       *
       * @param column - The range column to filter on
       * @param range - The range to filter with
       */
      rangeGte(column, range) {
        this.url.searchParams.append(column, `nxl.${range}`);
        return this;
      }
      /**
       * Only relevant for range columns. Match only rows where every element in
       * `column` is less than any element in `range`.
       *
       * @param column - The range column to filter on
       * @param range - The range to filter with
       */
      rangeLt(column, range) {
        this.url.searchParams.append(column, `sl.${range}`);
        return this;
      }
      /**
       * Only relevant for range columns. Match only rows where every element in
       * `column` is either contained in `range` or less than any element in
       * `range`.
       *
       * @param column - The range column to filter on
       * @param range - The range to filter with
       */
      rangeLte(column, range) {
        this.url.searchParams.append(column, `nxr.${range}`);
        return this;
      }
      /**
       * Only relevant for range columns. Match only rows where `column` is
       * mutually exclusive to `range` and there can be no element between the two
       * ranges.
       *
       * @param column - The range column to filter on
       * @param range - The range to filter with
       */
      rangeAdjacent(column, range) {
        this.url.searchParams.append(column, `adj.${range}`);
        return this;
      }
      /**
       * Only relevant for array and range columns. Match only rows where
       * `column` and `value` have an element in common.
       *
       * @param column - The array or range column to filter on
       * @param value - The array or range value to filter with
       */
      overlaps(column, value) {
        if (typeof value === "string") {
          this.url.searchParams.append(column, `ov.${value}`);
        } else {
          this.url.searchParams.append(column, `ov.{${value.join(",")}}`);
        }
        return this;
      }
      /**
       * Only relevant for text and tsvector columns. Match only rows where
       * `column` matches the query string in `query`.
       *
       * @param column - The text or tsvector column to filter on
       * @param query - The query text to match with
       * @param options - Named parameters
       * @param options.config - The text search configuration to use
       * @param options.type - Change how the `query` text is interpreted
       */
      textSearch(column, query, { config, type } = {}) {
        let typePart = "";
        if (type === "plain") {
          typePart = "pl";
        } else if (type === "phrase") {
          typePart = "ph";
        } else if (type === "websearch") {
          typePart = "w";
        }
        const configPart = config === void 0 ? "" : `(${config})`;
        this.url.searchParams.append(column, `${typePart}fts${configPart}.${query}`);
        return this;
      }
      /**
       * Match only rows where each column in `query` keys is equal to its
       * associated value. Shorthand for multiple `.eq()`s.
       *
       * @param query - The object to filter with, with column names as keys mapped
       * to their filter values
       */
      match(query) {
        Object.entries(query).forEach(([column, value]) => {
          this.url.searchParams.append(column, `eq.${value}`);
        });
        return this;
      }
      /**
       * Match only rows which doesn't satisfy the filter.
       *
       * Unlike most filters, `opearator` and `value` are used as-is and need to
       * follow [PostgREST
       * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
       * to make sure they are properly sanitized.
       *
       * @param column - The column to filter on
       * @param operator - The operator to be negated to filter with, following
       * PostgREST syntax
       * @param value - The value to filter with, following PostgREST syntax
       */
      not(column, operator, value) {
        this.url.searchParams.append(column, `not.${operator}.${value}`);
        return this;
      }
      /**
       * Match only rows which satisfy at least one of the filters.
       *
       * Unlike most filters, `filters` is used as-is and needs to follow [PostgREST
       * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
       * to make sure it's properly sanitized.
       *
       * It's currently not possible to do an `.or()` filter across multiple tables.
       *
       * @param filters - The filters to use, following PostgREST syntax
       * @param options - Named parameters
       * @param options.referencedTable - Set this to filter on referenced tables
       * instead of the parent table
       * @param options.foreignTable - Deprecated, use `referencedTable` instead
       */
      or(filters, { foreignTable, referencedTable = foreignTable } = {}) {
        const key2 = referencedTable ? `${referencedTable}.or` : "or";
        this.url.searchParams.append(key2, `(${filters})`);
        return this;
      }
      /**
       * Match only rows which satisfy the filter. This is an escape hatch - you
       * should use the specific filter methods wherever possible.
       *
       * Unlike most filters, `opearator` and `value` are used as-is and need to
       * follow [PostgREST
       * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
       * to make sure they are properly sanitized.
       *
       * @param column - The column to filter on
       * @param operator - The operator to filter with, following PostgREST syntax
       * @param value - The value to filter with, following PostgREST syntax
       */
      filter(column, operator, value) {
        this.url.searchParams.append(column, `${operator}.${value}`);
        return this;
      }
    };
  }
});

// node_modules/.pnpm/@supabase+postgrest-js@1.9.2/node_modules/@supabase/postgrest-js/dist/module/PostgrestQueryBuilder.js
var PostgrestQueryBuilder;
var init_PostgrestQueryBuilder = __esm({
  "node_modules/.pnpm/@supabase+postgrest-js@1.9.2/node_modules/@supabase/postgrest-js/dist/module/PostgrestQueryBuilder.js"() {
    init_PostgrestFilterBuilder();
    PostgrestQueryBuilder = class {
      constructor(url, { headers: headers2 = {}, schema, fetch: fetch3 }) {
        this.url = url;
        this.headers = headers2;
        this.schema = schema;
        this.fetch = fetch3;
      }
      /**
       * Perform a SELECT query on the table or view.
       *
       * @param columns - The columns to retrieve, separated by commas. Columns can be renamed when returned with `customName:columnName`
       *
       * @param options - Named parameters
       *
       * @param options.head - When set to `true`, `data` will not be returned.
       * Useful if you only need the count.
       *
       * @param options.count - Count algorithm to use to count rows in the table or view.
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       */
      select(columns, { head = false, count } = {}) {
        const method = head ? "HEAD" : "GET";
        let quoted2 = false;
        const cleanedColumns = (columns !== null && columns !== void 0 ? columns : "*").split("").map((c) => {
          if (/\s/.test(c) && !quoted2) {
            return "";
          }
          if (c === '"') {
            quoted2 = !quoted2;
          }
          return c;
        }).join("");
        this.url.searchParams.set("select", cleanedColumns);
        if (count) {
          this.headers["Prefer"] = `count=${count}`;
        }
        return new PostgrestFilterBuilder({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          fetch: this.fetch,
          allowEmpty: false
        });
      }
      /**
       * Perform an INSERT into the table or view.
       *
       * By default, inserted rows are not returned. To return it, chain the call
       * with `.select()`.
       *
       * @param values - The values to insert. Pass an object to insert a single row
       * or an array to insert multiple rows.
       *
       * @param options - Named parameters
       *
       * @param options.count - Count algorithm to use to count inserted rows.
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       *
       * @param options.defaultToNull - Make missing fields default to `null`.
       * Otherwise, use the default value for the column. Only applies for bulk
       * inserts.
       */
      insert(values, { count, defaultToNull = true } = {}) {
        const method = "POST";
        const prefersHeaders = [];
        if (this.headers["Prefer"]) {
          prefersHeaders.push(this.headers["Prefer"]);
        }
        if (count) {
          prefersHeaders.push(`count=${count}`);
        }
        if (!defaultToNull) {
          prefersHeaders.push("missing=default");
        }
        this.headers["Prefer"] = prefersHeaders.join(",");
        if (Array.isArray(values)) {
          const columns = values.reduce((acc, x) => acc.concat(Object.keys(x)), []);
          if (columns.length > 0) {
            const uniqueColumns = [...new Set(columns)].map((column) => `"${column}"`);
            this.url.searchParams.set("columns", uniqueColumns.join(","));
          }
        }
        return new PostgrestFilterBuilder({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          body: values,
          fetch: this.fetch,
          allowEmpty: false
        });
      }
      /**
       * Perform an UPSERT on the table or view. Depending on the column(s) passed
       * to `onConflict`, `.upsert()` allows you to perform the equivalent of
       * `.insert()` if a row with the corresponding `onConflict` columns doesn't
       * exist, or if it does exist, perform an alternative action depending on
       * `ignoreDuplicates`.
       *
       * By default, upserted rows are not returned. To return it, chain the call
       * with `.select()`.
       *
       * @param values - The values to upsert with. Pass an object to upsert a
       * single row or an array to upsert multiple rows.
       *
       * @param options - Named parameters
       *
       * @param options.onConflict - Comma-separated UNIQUE column(s) to specify how
       * duplicate rows are determined. Two rows are duplicates if all the
       * `onConflict` columns are equal.
       *
       * @param options.ignoreDuplicates - If `true`, duplicate rows are ignored. If
       * `false`, duplicate rows are merged with existing rows.
       *
       * @param options.count - Count algorithm to use to count upserted rows.
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       *
       * @param options.defaultToNull - Make missing fields default to `null`.
       * Otherwise, use the default value for the column. This only applies when
       * inserting new rows, not when merging with existing rows under
       * `ignoreDuplicates: false`. This also only applies when doing bulk upserts.
       */
      upsert(values, { onConflict, ignoreDuplicates = false, count, defaultToNull = true } = {}) {
        const method = "POST";
        const prefersHeaders = [`resolution=${ignoreDuplicates ? "ignore" : "merge"}-duplicates`];
        if (onConflict !== void 0)
          this.url.searchParams.set("on_conflict", onConflict);
        if (this.headers["Prefer"]) {
          prefersHeaders.push(this.headers["Prefer"]);
        }
        if (count) {
          prefersHeaders.push(`count=${count}`);
        }
        if (!defaultToNull) {
          prefersHeaders.push("missing=default");
        }
        this.headers["Prefer"] = prefersHeaders.join(",");
        if (Array.isArray(values)) {
          const columns = values.reduce((acc, x) => acc.concat(Object.keys(x)), []);
          if (columns.length > 0) {
            const uniqueColumns = [...new Set(columns)].map((column) => `"${column}"`);
            this.url.searchParams.set("columns", uniqueColumns.join(","));
          }
        }
        return new PostgrestFilterBuilder({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          body: values,
          fetch: this.fetch,
          allowEmpty: false
        });
      }
      /**
       * Perform an UPDATE on the table or view.
       *
       * By default, updated rows are not returned. To return it, chain the call
       * with `.select()` after filters.
       *
       * @param values - The values to update with
       *
       * @param options - Named parameters
       *
       * @param options.count - Count algorithm to use to count updated rows.
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       */
      update(values, { count } = {}) {
        const method = "PATCH";
        const prefersHeaders = [];
        if (this.headers["Prefer"]) {
          prefersHeaders.push(this.headers["Prefer"]);
        }
        if (count) {
          prefersHeaders.push(`count=${count}`);
        }
        this.headers["Prefer"] = prefersHeaders.join(",");
        return new PostgrestFilterBuilder({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          body: values,
          fetch: this.fetch,
          allowEmpty: false
        });
      }
      /**
       * Perform a DELETE on the table or view.
       *
       * By default, deleted rows are not returned. To return it, chain the call
       * with `.select()` after filters.
       *
       * @param options - Named parameters
       *
       * @param options.count - Count algorithm to use to count deleted rows.
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       */
      delete({ count } = {}) {
        const method = "DELETE";
        const prefersHeaders = [];
        if (count) {
          prefersHeaders.push(`count=${count}`);
        }
        if (this.headers["Prefer"]) {
          prefersHeaders.unshift(this.headers["Prefer"]);
        }
        this.headers["Prefer"] = prefersHeaders.join(",");
        return new PostgrestFilterBuilder({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          fetch: this.fetch,
          allowEmpty: false
        });
      }
    };
  }
});

// node_modules/.pnpm/@supabase+postgrest-js@1.9.2/node_modules/@supabase/postgrest-js/dist/module/version.js
var version;
var init_version = __esm({
  "node_modules/.pnpm/@supabase+postgrest-js@1.9.2/node_modules/@supabase/postgrest-js/dist/module/version.js"() {
    version = "1.9.2";
  }
});

// node_modules/.pnpm/@supabase+postgrest-js@1.9.2/node_modules/@supabase/postgrest-js/dist/module/constants.js
var DEFAULT_HEADERS;
var init_constants = __esm({
  "node_modules/.pnpm/@supabase+postgrest-js@1.9.2/node_modules/@supabase/postgrest-js/dist/module/constants.js"() {
    init_version();
    DEFAULT_HEADERS = { "X-Client-Info": `postgrest-js/${version}` };
  }
});

// node_modules/.pnpm/@supabase+postgrest-js@1.9.2/node_modules/@supabase/postgrest-js/dist/module/PostgrestClient.js
var PostgrestClient;
var init_PostgrestClient = __esm({
  "node_modules/.pnpm/@supabase+postgrest-js@1.9.2/node_modules/@supabase/postgrest-js/dist/module/PostgrestClient.js"() {
    init_PostgrestQueryBuilder();
    init_PostgrestFilterBuilder();
    init_constants();
    PostgrestClient = class _PostgrestClient {
      // TODO: Add back shouldThrowOnError once we figure out the typings
      /**
       * Creates a PostgREST client.
       *
       * @param url - URL of the PostgREST endpoint
       * @param options - Named parameters
       * @param options.headers - Custom headers
       * @param options.schema - Postgres schema to switch to
       * @param options.fetch - Custom fetch
       */
      constructor(url, { headers: headers2 = {}, schema, fetch: fetch3 } = {}) {
        this.url = url;
        this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS), headers2);
        this.schemaName = schema;
        this.fetch = fetch3;
      }
      /**
       * Perform a query on a table or a view.
       *
       * @param relation - The table or view name to query
       */
      from(relation) {
        const url = new URL(`${this.url}/${relation}`);
        return new PostgrestQueryBuilder(url, {
          headers: Object.assign({}, this.headers),
          schema: this.schemaName,
          fetch: this.fetch
        });
      }
      /**
       * Select a schema to query or perform an function (rpc) call.
       *
       * The schema needs to be on the list of exposed schemas inside Supabase.
       *
       * @param schema - The schema to query
       */
      schema(schema) {
        return new _PostgrestClient(this.url, {
          headers: this.headers,
          schema,
          fetch: this.fetch
        });
      }
      /**
       * Perform a function call.
       *
       * @param fn - The function name to call
       * @param args - The arguments to pass to the function call
       * @param options - Named parameters
       * @param options.head - When set to `true`, `data` will not be returned.
       * Useful if you only need the count.
       * @param options.count - Count algorithm to use to count rows returned by the
       * function. Only applicable for [set-returning
       * functions](https://www.postgresql.org/docs/current/functions-srf.html).
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       */
      rpc(fn, args = {}, { head = false, count } = {}) {
        let method;
        const url = new URL(`${this.url}/rpc/${fn}`);
        let body2;
        if (head) {
          method = "HEAD";
          Object.entries(args).forEach(([name2, value]) => {
            url.searchParams.append(name2, `${value}`);
          });
        } else {
          method = "POST";
          body2 = args;
        }
        const headers2 = Object.assign({}, this.headers);
        if (count) {
          headers2["Prefer"] = `count=${count}`;
        }
        return new PostgrestFilterBuilder({
          method,
          url,
          headers: headers2,
          schema: this.schemaName,
          body: body2,
          fetch: this.fetch,
          allowEmpty: false
        });
      }
    };
  }
});

// node_modules/.pnpm/@supabase+postgrest-js@1.9.2/node_modules/@supabase/postgrest-js/dist/module/index.js
var init_module2 = __esm({
  "node_modules/.pnpm/@supabase+postgrest-js@1.9.2/node_modules/@supabase/postgrest-js/dist/module/index.js"() {
    init_PostgrestClient();
    init_PostgrestQueryBuilder();
    init_PostgrestFilterBuilder();
    init_PostgrestTransformBuilder();
    init_PostgrestBuilder();
  }
});

// node_modules/.pnpm/@supabase+realtime-js@2.9.3/node_modules/@supabase/realtime-js/dist/module/lib/version.js
var version2;
var init_version2 = __esm({
  "node_modules/.pnpm/@supabase+realtime-js@2.9.3/node_modules/@supabase/realtime-js/dist/module/lib/version.js"() {
    version2 = "2.9.3";
  }
});

// node_modules/.pnpm/@supabase+realtime-js@2.9.3/node_modules/@supabase/realtime-js/dist/module/lib/constants.js
var DEFAULT_HEADERS2, VSN, DEFAULT_TIMEOUT, WS_CLOSE_NORMAL, SOCKET_STATES, CHANNEL_STATES, CHANNEL_EVENTS, TRANSPORTS, CONNECTION_STATE;
var init_constants2 = __esm({
  "node_modules/.pnpm/@supabase+realtime-js@2.9.3/node_modules/@supabase/realtime-js/dist/module/lib/constants.js"() {
    init_version2();
    DEFAULT_HEADERS2 = { "X-Client-Info": `realtime-js/${version2}` };
    VSN = "1.0.0";
    DEFAULT_TIMEOUT = 1e4;
    WS_CLOSE_NORMAL = 1e3;
    (function(SOCKET_STATES2) {
      SOCKET_STATES2[SOCKET_STATES2["connecting"] = 0] = "connecting";
      SOCKET_STATES2[SOCKET_STATES2["open"] = 1] = "open";
      SOCKET_STATES2[SOCKET_STATES2["closing"] = 2] = "closing";
      SOCKET_STATES2[SOCKET_STATES2["closed"] = 3] = "closed";
    })(SOCKET_STATES || (SOCKET_STATES = {}));
    (function(CHANNEL_STATES2) {
      CHANNEL_STATES2["closed"] = "closed";
      CHANNEL_STATES2["errored"] = "errored";
      CHANNEL_STATES2["joined"] = "joined";
      CHANNEL_STATES2["joining"] = "joining";
      CHANNEL_STATES2["leaving"] = "leaving";
    })(CHANNEL_STATES || (CHANNEL_STATES = {}));
    (function(CHANNEL_EVENTS2) {
      CHANNEL_EVENTS2["close"] = "phx_close";
      CHANNEL_EVENTS2["error"] = "phx_error";
      CHANNEL_EVENTS2["join"] = "phx_join";
      CHANNEL_EVENTS2["reply"] = "phx_reply";
      CHANNEL_EVENTS2["leave"] = "phx_leave";
      CHANNEL_EVENTS2["access_token"] = "access_token";
    })(CHANNEL_EVENTS || (CHANNEL_EVENTS = {}));
    (function(TRANSPORTS2) {
      TRANSPORTS2["websocket"] = "websocket";
    })(TRANSPORTS || (TRANSPORTS = {}));
    (function(CONNECTION_STATE2) {
      CONNECTION_STATE2["Connecting"] = "connecting";
      CONNECTION_STATE2["Open"] = "open";
      CONNECTION_STATE2["Closing"] = "closing";
      CONNECTION_STATE2["Closed"] = "closed";
    })(CONNECTION_STATE || (CONNECTION_STATE = {}));
  }
});

// node_modules/.pnpm/@supabase+realtime-js@2.9.3/node_modules/@supabase/realtime-js/dist/module/lib/timer.js
var Timer;
var init_timer = __esm({
  "node_modules/.pnpm/@supabase+realtime-js@2.9.3/node_modules/@supabase/realtime-js/dist/module/lib/timer.js"() {
    Timer = class {
      constructor(callback, timerCalc) {
        this.callback = callback;
        this.timerCalc = timerCalc;
        this.timer = void 0;
        this.tries = 0;
        this.callback = callback;
        this.timerCalc = timerCalc;
      }
      reset() {
        this.tries = 0;
        clearTimeout(this.timer);
      }
      // Cancels any previous scheduleTimeout and schedules callback
      scheduleTimeout() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.tries = this.tries + 1;
          this.callback();
        }, this.timerCalc(this.tries + 1));
      }
    };
  }
});

// node_modules/.pnpm/@supabase+realtime-js@2.9.3/node_modules/@supabase/realtime-js/dist/module/lib/serializer.js
var Serializer;
var init_serializer = __esm({
  "node_modules/.pnpm/@supabase+realtime-js@2.9.3/node_modules/@supabase/realtime-js/dist/module/lib/serializer.js"() {
    Serializer = class {
      constructor() {
        this.HEADER_LENGTH = 1;
      }
      decode(rawPayload, callback) {
        if (rawPayload.constructor === ArrayBuffer) {
          return callback(this._binaryDecode(rawPayload));
        }
        if (typeof rawPayload === "string") {
          return callback(JSON.parse(rawPayload));
        }
        return callback({});
      }
      _binaryDecode(buffer) {
        const view = new DataView(buffer);
        const decoder2 = new TextDecoder();
        return this._decodeBroadcast(buffer, view, decoder2);
      }
      _decodeBroadcast(buffer, view, decoder2) {
        const topicSize = view.getUint8(1);
        const eventSize = view.getUint8(2);
        let offset = this.HEADER_LENGTH + 2;
        const topic = decoder2.decode(buffer.slice(offset, offset + topicSize));
        offset = offset + topicSize;
        const event = decoder2.decode(buffer.slice(offset, offset + eventSize));
        offset = offset + eventSize;
        const data = JSON.parse(decoder2.decode(buffer.slice(offset, buffer.byteLength)));
        return { ref: null, topic, event, payload: data };
      }
    };
  }
});

// node_modules/.pnpm/@supabase+realtime-js@2.9.3/node_modules/@supabase/realtime-js/dist/module/lib/push.js
var Push;
var init_push = __esm({
  "node_modules/.pnpm/@supabase+realtime-js@2.9.3/node_modules/@supabase/realtime-js/dist/module/lib/push.js"() {
    init_constants2();
    Push = class {
      /**
       * Initializes the Push
       *
       * @param channel The Channel
       * @param event The event, for example `"phx_join"`
       * @param payload The payload, for example `{user_id: 123}`
       * @param timeout The push timeout in milliseconds
       */
      constructor(channel, event, payload = {}, timeout = DEFAULT_TIMEOUT) {
        this.channel = channel;
        this.event = event;
        this.payload = payload;
        this.timeout = timeout;
        this.sent = false;
        this.timeoutTimer = void 0;
        this.ref = "";
        this.receivedResp = null;
        this.recHooks = [];
        this.refEvent = null;
      }
      resend(timeout) {
        this.timeout = timeout;
        this._cancelRefEvent();
        this.ref = "";
        this.refEvent = null;
        this.receivedResp = null;
        this.sent = false;
        this.send();
      }
      send() {
        if (this._hasReceived("timeout")) {
          return;
        }
        this.startTimeout();
        this.sent = true;
        this.channel.socket.push({
          topic: this.channel.topic,
          event: this.event,
          payload: this.payload,
          ref: this.ref,
          join_ref: this.channel._joinRef()
        });
      }
      updatePayload(payload) {
        this.payload = Object.assign(Object.assign({}, this.payload), payload);
      }
      receive(status, callback) {
        var _a;
        if (this._hasReceived(status)) {
          callback((_a = this.receivedResp) === null || _a === void 0 ? void 0 : _a.response);
        }
        this.recHooks.push({ status, callback });
        return this;
      }
      startTimeout() {
        if (this.timeoutTimer) {
          return;
        }
        this.ref = this.channel.socket._makeRef();
        this.refEvent = this.channel._replyEventName(this.ref);
        const callback = (payload) => {
          this._cancelRefEvent();
          this._cancelTimeout();
          this.receivedResp = payload;
          this._matchReceive(payload);
        };
        this.channel._on(this.refEvent, {}, callback);
        this.timeoutTimer = setTimeout(() => {
          this.trigger("timeout", {});
        }, this.timeout);
      }
      trigger(status, response) {
        if (this.refEvent)
          this.channel._trigger(this.refEvent, { status, response });
      }
      destroy() {
        this._cancelRefEvent();
        this._cancelTimeout();
      }
      _cancelRefEvent() {
        if (!this.refEvent) {
          return;
        }
        this.channel._off(this.refEvent, {});
      }
      _cancelTimeout() {
        clearTimeout(this.timeoutTimer);
        this.timeoutTimer = void 0;
      }
      _matchReceive({ status, response }) {
        this.recHooks.filter((h) => h.status === status).forEach((h) => h.callback(response));
      }
      _hasReceived(status) {
        return this.receivedResp && this.receivedResp.status === status;
      }
    };
  }
});

// node_modules/.pnpm/@supabase+realtime-js@2.9.3/node_modules/@supabase/realtime-js/dist/module/RealtimePresence.js
var REALTIME_PRESENCE_LISTEN_EVENTS, RealtimePresence;
var init_RealtimePresence = __esm({
  "node_modules/.pnpm/@supabase+realtime-js@2.9.3/node_modules/@supabase/realtime-js/dist/module/RealtimePresence.js"() {
    (function(REALTIME_PRESENCE_LISTEN_EVENTS2) {
      REALTIME_PRESENCE_LISTEN_EVENTS2["SYNC"] = "sync";
      REALTIME_PRESENCE_LISTEN_EVENTS2["JOIN"] = "join";
      REALTIME_PRESENCE_LISTEN_EVENTS2["LEAVE"] = "leave";
    })(REALTIME_PRESENCE_LISTEN_EVENTS || (REALTIME_PRESENCE_LISTEN_EVENTS = {}));
    RealtimePresence = class _RealtimePresence {
      /**
       * Initializes the Presence.
       *
       * @param channel - The RealtimeChannel
       * @param opts - The options,
       *        for example `{events: {state: 'state', diff: 'diff'}}`
       */
      constructor(channel, opts) {
        this.channel = channel;
        this.state = {};
        this.pendingDiffs = [];
        this.joinRef = null;
        this.caller = {
          onJoin: () => {
          },
          onLeave: () => {
          },
          onSync: () => {
          }
        };
        const events = (opts === null || opts === void 0 ? void 0 : opts.events) || {
          state: "presence_state",
          diff: "presence_diff"
        };
        this.channel._on(events.state, {}, (newState) => {
          const { onJoin, onLeave, onSync } = this.caller;
          this.joinRef = this.channel._joinRef();
          this.state = _RealtimePresence.syncState(this.state, newState, onJoin, onLeave);
          this.pendingDiffs.forEach((diff) => {
            this.state = _RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
          });
          this.pendingDiffs = [];
          onSync();
        });
        this.channel._on(events.diff, {}, (diff) => {
          const { onJoin, onLeave, onSync } = this.caller;
          if (this.inPendingSyncState()) {
            this.pendingDiffs.push(diff);
          } else {
            this.state = _RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
            onSync();
          }
        });
        this.onJoin((key2, currentPresences, newPresences) => {
          this.channel._trigger("presence", {
            event: "join",
            key: key2,
            currentPresences,
            newPresences
          });
        });
        this.onLeave((key2, currentPresences, leftPresences) => {
          this.channel._trigger("presence", {
            event: "leave",
            key: key2,
            currentPresences,
            leftPresences
          });
        });
        this.onSync(() => {
          this.channel._trigger("presence", { event: "sync" });
        });
      }
      /**
       * Used to sync the list of presences on the server with the
       * client's state.
       *
       * An optional `onJoin` and `onLeave` callback can be provided to
       * react to changes in the client's local presences across
       * disconnects and reconnects with the server.
       *
       * @internal
       */
      static syncState(currentState, newState, onJoin, onLeave) {
        const state = this.cloneDeep(currentState);
        const transformedState = this.transformState(newState);
        const joins = {};
        const leaves = {};
        this.map(state, (key2, presences) => {
          if (!transformedState[key2]) {
            leaves[key2] = presences;
          }
        });
        this.map(transformedState, (key2, newPresences) => {
          const currentPresences = state[key2];
          if (currentPresences) {
            const newPresenceRefs = newPresences.map((m) => m.presence_ref);
            const curPresenceRefs = currentPresences.map((m) => m.presence_ref);
            const joinedPresences = newPresences.filter((m) => curPresenceRefs.indexOf(m.presence_ref) < 0);
            const leftPresences = currentPresences.filter((m) => newPresenceRefs.indexOf(m.presence_ref) < 0);
            if (joinedPresences.length > 0) {
              joins[key2] = joinedPresences;
            }
            if (leftPresences.length > 0) {
              leaves[key2] = leftPresences;
            }
          } else {
            joins[key2] = newPresences;
          }
        });
        return this.syncDiff(state, { joins, leaves }, onJoin, onLeave);
      }
      /**
       * Used to sync a diff of presence join and leave events from the
       * server, as they happen.
       *
       * Like `syncState`, `syncDiff` accepts optional `onJoin` and
       * `onLeave` callbacks to react to a user joining or leaving from a
       * device.
       *
       * @internal
       */
      static syncDiff(state, diff, onJoin, onLeave) {
        const { joins, leaves } = {
          joins: this.transformState(diff.joins),
          leaves: this.transformState(diff.leaves)
        };
        if (!onJoin) {
          onJoin = () => {
          };
        }
        if (!onLeave) {
          onLeave = () => {
          };
        }
        this.map(joins, (key2, newPresences) => {
          var _a;
          const currentPresences = (_a = state[key2]) !== null && _a !== void 0 ? _a : [];
          state[key2] = this.cloneDeep(newPresences);
          if (currentPresences.length > 0) {
            const joinedPresenceRefs = state[key2].map((m) => m.presence_ref);
            const curPresences = currentPresences.filter((m) => joinedPresenceRefs.indexOf(m.presence_ref) < 0);
            state[key2].unshift(...curPresences);
          }
          onJoin(key2, currentPresences, newPresences);
        });
        this.map(leaves, (key2, leftPresences) => {
          let currentPresences = state[key2];
          if (!currentPresences)
            return;
          const presenceRefsToRemove = leftPresences.map((m) => m.presence_ref);
          currentPresences = currentPresences.filter((m) => presenceRefsToRemove.indexOf(m.presence_ref) < 0);
          state[key2] = currentPresences;
          onLeave(key2, currentPresences, leftPresences);
          if (currentPresences.length === 0)
            delete state[key2];
        });
        return state;
      }
      /** @internal */
      static map(obj, func) {
        return Object.getOwnPropertyNames(obj).map((key2) => func(key2, obj[key2]));
      }
      /**
       * Remove 'metas' key
       * Change 'phx_ref' to 'presence_ref'
       * Remove 'phx_ref' and 'phx_ref_prev'
       *
       * @example
       * // returns {
       *  abc123: [
       *    { presence_ref: '2', user_id: 1 },
       *    { presence_ref: '3', user_id: 2 }
       *  ]
       * }
       * RealtimePresence.transformState({
       *  abc123: {
       *    metas: [
       *      { phx_ref: '2', phx_ref_prev: '1' user_id: 1 },
       *      { phx_ref: '3', user_id: 2 }
       *    ]
       *  }
       * })
       *
       * @internal
       */
      static transformState(state) {
        state = this.cloneDeep(state);
        return Object.getOwnPropertyNames(state).reduce((newState, key2) => {
          const presences = state[key2];
          if ("metas" in presences) {
            newState[key2] = presences.metas.map((presence) => {
              presence["presence_ref"] = presence["phx_ref"];
              delete presence["phx_ref"];
              delete presence["phx_ref_prev"];
              return presence;
            });
          } else {
            newState[key2] = presences;
          }
          return newState;
        }, {});
      }
      /** @internal */
      static cloneDeep(obj) {
        return JSON.parse(JSON.stringify(obj));
      }
      /** @internal */
      onJoin(callback) {
        this.caller.onJoin = callback;
      }
      /** @internal */
      onLeave(callback) {
        this.caller.onLeave = callback;
      }
      /** @internal */
      onSync(callback) {
        this.caller.onSync = callback;
      }
      /** @internal */
      inPendingSyncState() {
        return !this.joinRef || this.joinRef !== this.channel._joinRef();
      }
    };
  }
});

// node_modules/.pnpm/@supabase+realtime-js@2.9.3/node_modules/@supabase/realtime-js/dist/module/lib/transformers.js
var PostgresTypes, convertChangeData, convertColumn, convertCell, noop2, toBoolean, toNumber, toJson, toArray, toTimestampString;
var init_transformers = __esm({
  "node_modules/.pnpm/@supabase+realtime-js@2.9.3/node_modules/@supabase/realtime-js/dist/module/lib/transformers.js"() {
    (function(PostgresTypes2) {
      PostgresTypes2["abstime"] = "abstime";
      PostgresTypes2["bool"] = "bool";
      PostgresTypes2["date"] = "date";
      PostgresTypes2["daterange"] = "daterange";
      PostgresTypes2["float4"] = "float4";
      PostgresTypes2["float8"] = "float8";
      PostgresTypes2["int2"] = "int2";
      PostgresTypes2["int4"] = "int4";
      PostgresTypes2["int4range"] = "int4range";
      PostgresTypes2["int8"] = "int8";
      PostgresTypes2["int8range"] = "int8range";
      PostgresTypes2["json"] = "json";
      PostgresTypes2["jsonb"] = "jsonb";
      PostgresTypes2["money"] = "money";
      PostgresTypes2["numeric"] = "numeric";
      PostgresTypes2["oid"] = "oid";
      PostgresTypes2["reltime"] = "reltime";
      PostgresTypes2["text"] = "text";
      PostgresTypes2["time"] = "time";
      PostgresTypes2["timestamp"] = "timestamp";
      PostgresTypes2["timestamptz"] = "timestamptz";
      PostgresTypes2["timetz"] = "timetz";
      PostgresTypes2["tsrange"] = "tsrange";
      PostgresTypes2["tstzrange"] = "tstzrange";
    })(PostgresTypes || (PostgresTypes = {}));
    convertChangeData = (columns, record, options2 = {}) => {
      var _a;
      const skipTypes = (_a = options2.skipTypes) !== null && _a !== void 0 ? _a : [];
      return Object.keys(record).reduce((acc, rec_key) => {
        acc[rec_key] = convertColumn(rec_key, columns, record, skipTypes);
        return acc;
      }, {});
    };
    convertColumn = (columnName, columns, record, skipTypes) => {
      const column = columns.find((x) => x.name === columnName);
      const colType = column === null || column === void 0 ? void 0 : column.type;
      const value = record[columnName];
      if (colType && !skipTypes.includes(colType)) {
        return convertCell(colType, value);
      }
      return noop2(value);
    };
    convertCell = (type, value) => {
      if (type.charAt(0) === "_") {
        const dataType = type.slice(1, type.length);
        return toArray(value, dataType);
      }
      switch (type) {
        case PostgresTypes.bool:
          return toBoolean(value);
        case PostgresTypes.float4:
        case PostgresTypes.float8:
        case PostgresTypes.int2:
        case PostgresTypes.int4:
        case PostgresTypes.int8:
        case PostgresTypes.numeric:
        case PostgresTypes.oid:
          return toNumber(value);
        case PostgresTypes.json:
        case PostgresTypes.jsonb:
          return toJson(value);
        case PostgresTypes.timestamp:
          return toTimestampString(value);
        case PostgresTypes.abstime:
        case PostgresTypes.date:
        case PostgresTypes.daterange:
        case PostgresTypes.int4range:
        case PostgresTypes.int8range:
        case PostgresTypes.money:
        case PostgresTypes.reltime:
        case PostgresTypes.text:
        case PostgresTypes.time:
        case PostgresTypes.timestamptz:
        case PostgresTypes.timetz:
        case PostgresTypes.tsrange:
        case PostgresTypes.tstzrange:
          return noop2(value);
        default:
          return noop2(value);
      }
    };
    noop2 = (value) => {
      return value;
    };
    toBoolean = (value) => {
      switch (value) {
        case "t":
          return true;
        case "f":
          return false;
        default:
          return value;
      }
    };
    toNumber = (value) => {
      if (typeof value === "string") {
        const parsedValue = parseFloat(value);
        if (!Number.isNaN(parsedValue)) {
          return parsedValue;
        }
      }
      return value;
    };
    toJson = (value) => {
      if (typeof value === "string") {
        try {
          return JSON.parse(value);
        } catch (error2) {
          console.log(`JSON parse error: ${error2}`);
          return value;
        }
      }
      return value;
    };
    toArray = (value, type) => {
      if (typeof value !== "string") {
        return value;
      }
      const lastIdx = value.length - 1;
      const closeBrace = value[lastIdx];
      const openBrace = value[0];
      if (openBrace === "{" && closeBrace === "}") {
        let arr;
        const valTrim = value.slice(1, lastIdx);
        try {
          arr = JSON.parse("[" + valTrim + "]");
        } catch (_) {
          arr = valTrim ? valTrim.split(",") : [];
        }
        return arr.map((val) => convertCell(type, val));
      }
      return value;
    };
    toTimestampString = (value) => {
      if (typeof value === "string") {
        return value.replace(" ", "T");
      }
      return value;
    };
  }
});

// node_modules/.pnpm/@supabase+realtime-js@2.9.3/node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js
var REALTIME_POSTGRES_CHANGES_LISTEN_EVENT, REALTIME_LISTEN_TYPES, REALTIME_SUBSCRIBE_STATES, RealtimeChannel;
var init_RealtimeChannel = __esm({
  "node_modules/.pnpm/@supabase+realtime-js@2.9.3/node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js"() {
    init_constants2();
    init_push();
    init_timer();
    init_RealtimePresence();
    init_transformers();
    (function(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2) {
      REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["ALL"] = "*";
      REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["INSERT"] = "INSERT";
      REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["UPDATE"] = "UPDATE";
      REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["DELETE"] = "DELETE";
    })(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT || (REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = {}));
    (function(REALTIME_LISTEN_TYPES2) {
      REALTIME_LISTEN_TYPES2["BROADCAST"] = "broadcast";
      REALTIME_LISTEN_TYPES2["PRESENCE"] = "presence";
      REALTIME_LISTEN_TYPES2["POSTGRES_CHANGES"] = "postgres_changes";
    })(REALTIME_LISTEN_TYPES || (REALTIME_LISTEN_TYPES = {}));
    (function(REALTIME_SUBSCRIBE_STATES2) {
      REALTIME_SUBSCRIBE_STATES2["SUBSCRIBED"] = "SUBSCRIBED";
      REALTIME_SUBSCRIBE_STATES2["TIMED_OUT"] = "TIMED_OUT";
      REALTIME_SUBSCRIBE_STATES2["CLOSED"] = "CLOSED";
      REALTIME_SUBSCRIBE_STATES2["CHANNEL_ERROR"] = "CHANNEL_ERROR";
    })(REALTIME_SUBSCRIBE_STATES || (REALTIME_SUBSCRIBE_STATES = {}));
    RealtimeChannel = class _RealtimeChannel {
      constructor(topic, params = { config: {} }, socket) {
        this.topic = topic;
        this.params = params;
        this.socket = socket;
        this.bindings = {};
        this.state = CHANNEL_STATES.closed;
        this.joinedOnce = false;
        this.pushBuffer = [];
        this.subTopic = topic.replace(/^realtime:/i, "");
        this.params.config = Object.assign({
          broadcast: { ack: false, self: false },
          presence: { key: "" }
        }, params.config);
        this.timeout = this.socket.timeout;
        this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
        this.rejoinTimer = new Timer(() => this._rejoinUntilConnected(), this.socket.reconnectAfterMs);
        this.joinPush.receive("ok", () => {
          this.state = CHANNEL_STATES.joined;
          this.rejoinTimer.reset();
          this.pushBuffer.forEach((pushEvent) => pushEvent.send());
          this.pushBuffer = [];
        });
        this._onClose(() => {
          this.rejoinTimer.reset();
          this.socket.log("channel", `close ${this.topic} ${this._joinRef()}`);
          this.state = CHANNEL_STATES.closed;
          this.socket._remove(this);
        });
        this._onError((reason) => {
          if (this._isLeaving() || this._isClosed()) {
            return;
          }
          this.socket.log("channel", `error ${this.topic}`, reason);
          this.state = CHANNEL_STATES.errored;
          this.rejoinTimer.scheduleTimeout();
        });
        this.joinPush.receive("timeout", () => {
          if (!this._isJoining()) {
            return;
          }
          this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout);
          this.state = CHANNEL_STATES.errored;
          this.rejoinTimer.scheduleTimeout();
        });
        this._on(CHANNEL_EVENTS.reply, {}, (payload, ref) => {
          this._trigger(this._replyEventName(ref), payload);
        });
        this.presence = new RealtimePresence(this);
        this.broadcastEndpointURL = this._broadcastEndpointURL();
      }
      /** Subscribe registers your client with the server */
      subscribe(callback, timeout = this.timeout) {
        var _a, _b;
        if (!this.socket.isConnected()) {
          this.socket.connect();
        }
        if (this.joinedOnce) {
          throw `tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance`;
        } else {
          const { config: { broadcast, presence } } = this.params;
          this._onError((e) => callback && callback("CHANNEL_ERROR", e));
          this._onClose(() => callback && callback("CLOSED"));
          const accessTokenPayload = {};
          const config = {
            broadcast,
            presence,
            postgres_changes: (_b = (_a = this.bindings.postgres_changes) === null || _a === void 0 ? void 0 : _a.map((r) => r.filter)) !== null && _b !== void 0 ? _b : []
          };
          if (this.socket.accessToken) {
            accessTokenPayload.access_token = this.socket.accessToken;
          }
          this.updateJoinPayload(Object.assign({ config }, accessTokenPayload));
          this.joinedOnce = true;
          this._rejoin(timeout);
          this.joinPush.receive("ok", ({ postgres_changes: serverPostgresFilters }) => {
            var _a2;
            this.socket.accessToken && this.socket.setAuth(this.socket.accessToken);
            if (serverPostgresFilters === void 0) {
              callback && callback("SUBSCRIBED");
              return;
            } else {
              const clientPostgresBindings = this.bindings.postgres_changes;
              const bindingsLen = (_a2 = clientPostgresBindings === null || clientPostgresBindings === void 0 ? void 0 : clientPostgresBindings.length) !== null && _a2 !== void 0 ? _a2 : 0;
              const newPostgresBindings = [];
              for (let i = 0; i < bindingsLen; i++) {
                const clientPostgresBinding = clientPostgresBindings[i];
                const { filter: { event, schema, table, filter } } = clientPostgresBinding;
                const serverPostgresFilter = serverPostgresFilters && serverPostgresFilters[i];
                if (serverPostgresFilter && serverPostgresFilter.event === event && serverPostgresFilter.schema === schema && serverPostgresFilter.table === table && serverPostgresFilter.filter === filter) {
                  newPostgresBindings.push(Object.assign(Object.assign({}, clientPostgresBinding), { id: serverPostgresFilter.id }));
                } else {
                  this.unsubscribe();
                  callback && callback("CHANNEL_ERROR", new Error("mismatch between server and client bindings for postgres changes"));
                  return;
                }
              }
              this.bindings.postgres_changes = newPostgresBindings;
              callback && callback("SUBSCRIBED");
              return;
            }
          }).receive("error", (error2) => {
            callback && callback("CHANNEL_ERROR", new Error(JSON.stringify(Object.values(error2).join(", ") || "error")));
            return;
          }).receive("timeout", () => {
            callback && callback("TIMED_OUT");
            return;
          });
        }
        return this;
      }
      presenceState() {
        return this.presence.state;
      }
      async track(payload, opts = {}) {
        return await this.send({
          type: "presence",
          event: "track",
          payload
        }, opts.timeout || this.timeout);
      }
      async untrack(opts = {}) {
        return await this.send({
          type: "presence",
          event: "untrack"
        }, opts);
      }
      on(type, filter, callback) {
        return this._on(type, filter, callback);
      }
      /**
       * Sends a message into the channel.
       *
       * @param args Arguments to send to channel
       * @param args.type The type of event to send
       * @param args.event The name of the event being sent
       * @param args.payload Payload to be sent
       * @param opts Options to be used during the send process
       */
      async send(args, opts = {}) {
        var _a, _b;
        if (!this._canPush() && args.type === "broadcast") {
          const { event, payload: endpoint_payload } = args;
          const options2 = {
            method: "POST",
            headers: {
              apikey: (_a = this.socket.apiKey) !== null && _a !== void 0 ? _a : "",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              messages: [
                { topic: this.subTopic, event, payload: endpoint_payload }
              ]
            })
          };
          try {
            const response = await this._fetchWithTimeout(this.broadcastEndpointURL, options2, (_b = opts.timeout) !== null && _b !== void 0 ? _b : this.timeout);
            if (response.ok) {
              return "ok";
            } else {
              return "error";
            }
          } catch (error2) {
            if (error2.name === "AbortError") {
              return "timed out";
            } else {
              return "error";
            }
          }
        } else {
          return new Promise((resolve2) => {
            var _a2, _b2, _c;
            const push = this._push(args.type, args, opts.timeout || this.timeout);
            if (args.type === "broadcast" && !((_c = (_b2 = (_a2 = this.params) === null || _a2 === void 0 ? void 0 : _a2.config) === null || _b2 === void 0 ? void 0 : _b2.broadcast) === null || _c === void 0 ? void 0 : _c.ack)) {
              resolve2("ok");
            }
            push.receive("ok", () => resolve2("ok"));
            push.receive("timeout", () => resolve2("timed out"));
          });
        }
      }
      updateJoinPayload(payload) {
        this.joinPush.updatePayload(payload);
      }
      /**
       * Leaves the channel.
       *
       * Unsubscribes from server events, and instructs channel to terminate on server.
       * Triggers onClose() hooks.
       *
       * To receive leave acknowledgements, use the a `receive` hook to bind to the server ack, ie:
       * channel.unsubscribe().receive("ok", () => alert("left!") )
       */
      unsubscribe(timeout = this.timeout) {
        this.state = CHANNEL_STATES.leaving;
        const onClose = () => {
          this.socket.log("channel", `leave ${this.topic}`);
          this._trigger(CHANNEL_EVENTS.close, "leave", this._joinRef());
        };
        this.rejoinTimer.reset();
        this.joinPush.destroy();
        return new Promise((resolve2) => {
          const leavePush = new Push(this, CHANNEL_EVENTS.leave, {}, timeout);
          leavePush.receive("ok", () => {
            onClose();
            resolve2("ok");
          }).receive("timeout", () => {
            onClose();
            resolve2("timed out");
          }).receive("error", () => {
            resolve2("error");
          });
          leavePush.send();
          if (!this._canPush()) {
            leavePush.trigger("ok", {});
          }
        });
      }
      /** @internal */
      _broadcastEndpointURL() {
        let url = this.socket.endPoint;
        url = url.replace(/^ws/i, "http");
        url = url.replace(/(\/socket\/websocket|\/socket|\/websocket)\/?$/i, "");
        return url.replace(/\/+$/, "") + "/api/broadcast";
      }
      async _fetchWithTimeout(url, options2, timeout) {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        const response = await this.socket.fetch(url, Object.assign(Object.assign({}, options2), { signal: controller.signal }));
        clearTimeout(id);
        return response;
      }
      /** @internal */
      _push(event, payload, timeout = this.timeout) {
        if (!this.joinedOnce) {
          throw `tried to push '${event}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
        }
        let pushEvent = new Push(this, event, payload, timeout);
        if (this._canPush()) {
          pushEvent.send();
        } else {
          pushEvent.startTimeout();
          this.pushBuffer.push(pushEvent);
        }
        return pushEvent;
      }
      /**
       * Overridable message hook
       *
       * Receives all events for specialized message handling before dispatching to the channel callbacks.
       * Must return the payload, modified or unmodified.
       *
       * @internal
       */
      _onMessage(_event, payload, _ref) {
        return payload;
      }
      /** @internal */
      _isMember(topic) {
        return this.topic === topic;
      }
      /** @internal */
      _joinRef() {
        return this.joinPush.ref;
      }
      /** @internal */
      _trigger(type, payload, ref) {
        var _a, _b;
        const typeLower = type.toLocaleLowerCase();
        const { close, error: error2, leave, join } = CHANNEL_EVENTS;
        const events = [close, error2, leave, join];
        if (ref && events.indexOf(typeLower) >= 0 && ref !== this._joinRef()) {
          return;
        }
        let handledPayload = this._onMessage(typeLower, payload, ref);
        if (payload && !handledPayload) {
          throw "channel onMessage callbacks must return the payload, modified or unmodified";
        }
        if (["insert", "update", "delete"].includes(typeLower)) {
          (_a = this.bindings.postgres_changes) === null || _a === void 0 ? void 0 : _a.filter((bind) => {
            var _a2, _b2, _c;
            return ((_a2 = bind.filter) === null || _a2 === void 0 ? void 0 : _a2.event) === "*" || ((_c = (_b2 = bind.filter) === null || _b2 === void 0 ? void 0 : _b2.event) === null || _c === void 0 ? void 0 : _c.toLocaleLowerCase()) === typeLower;
          }).map((bind) => bind.callback(handledPayload, ref));
        } else {
          (_b = this.bindings[typeLower]) === null || _b === void 0 ? void 0 : _b.filter((bind) => {
            var _a2, _b2, _c, _d, _e, _f;
            if (["broadcast", "presence", "postgres_changes"].includes(typeLower)) {
              if ("id" in bind) {
                const bindId = bind.id;
                const bindEvent = (_a2 = bind.filter) === null || _a2 === void 0 ? void 0 : _a2.event;
                return bindId && ((_b2 = payload.ids) === null || _b2 === void 0 ? void 0 : _b2.includes(bindId)) && (bindEvent === "*" || (bindEvent === null || bindEvent === void 0 ? void 0 : bindEvent.toLocaleLowerCase()) === ((_c = payload.data) === null || _c === void 0 ? void 0 : _c.type.toLocaleLowerCase()));
              } else {
                const bindEvent = (_e = (_d = bind === null || bind === void 0 ? void 0 : bind.filter) === null || _d === void 0 ? void 0 : _d.event) === null || _e === void 0 ? void 0 : _e.toLocaleLowerCase();
                return bindEvent === "*" || bindEvent === ((_f = payload === null || payload === void 0 ? void 0 : payload.event) === null || _f === void 0 ? void 0 : _f.toLocaleLowerCase());
              }
            } else {
              return bind.type.toLocaleLowerCase() === typeLower;
            }
          }).map((bind) => {
            if (typeof handledPayload === "object" && "ids" in handledPayload) {
              const postgresChanges = handledPayload.data;
              const { schema, table, commit_timestamp, type: type2, errors } = postgresChanges;
              const enrichedPayload = {
                schema,
                table,
                commit_timestamp,
                eventType: type2,
                new: {},
                old: {},
                errors
              };
              handledPayload = Object.assign(Object.assign({}, enrichedPayload), this._getPayloadRecords(postgresChanges));
            }
            bind.callback(handledPayload, ref);
          });
        }
      }
      /** @internal */
      _isClosed() {
        return this.state === CHANNEL_STATES.closed;
      }
      /** @internal */
      _isJoined() {
        return this.state === CHANNEL_STATES.joined;
      }
      /** @internal */
      _isJoining() {
        return this.state === CHANNEL_STATES.joining;
      }
      /** @internal */
      _isLeaving() {
        return this.state === CHANNEL_STATES.leaving;
      }
      /** @internal */
      _replyEventName(ref) {
        return `chan_reply_${ref}`;
      }
      /** @internal */
      _on(type, filter, callback) {
        const typeLower = type.toLocaleLowerCase();
        const binding = {
          type: typeLower,
          filter,
          callback
        };
        if (this.bindings[typeLower]) {
          this.bindings[typeLower].push(binding);
        } else {
          this.bindings[typeLower] = [binding];
        }
        return this;
      }
      /** @internal */
      _off(type, filter) {
        const typeLower = type.toLocaleLowerCase();
        this.bindings[typeLower] = this.bindings[typeLower].filter((bind) => {
          var _a;
          return !(((_a = bind.type) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) === typeLower && _RealtimeChannel.isEqual(bind.filter, filter));
        });
        return this;
      }
      /** @internal */
      static isEqual(obj1, obj2) {
        if (Object.keys(obj1).length !== Object.keys(obj2).length) {
          return false;
        }
        for (const k in obj1) {
          if (obj1[k] !== obj2[k]) {
            return false;
          }
        }
        return true;
      }
      /** @internal */
      _rejoinUntilConnected() {
        this.rejoinTimer.scheduleTimeout();
        if (this.socket.isConnected()) {
          this._rejoin();
        }
      }
      /**
       * Registers a callback that will be executed when the channel closes.
       *
       * @internal
       */
      _onClose(callback) {
        this._on(CHANNEL_EVENTS.close, {}, callback);
      }
      /**
       * Registers a callback that will be executed when the channel encounteres an error.
       *
       * @internal
       */
      _onError(callback) {
        this._on(CHANNEL_EVENTS.error, {}, (reason) => callback(reason));
      }
      /**
       * Returns `true` if the socket is connected and the channel has been joined.
       *
       * @internal
       */
      _canPush() {
        return this.socket.isConnected() && this._isJoined();
      }
      /** @internal */
      _rejoin(timeout = this.timeout) {
        if (this._isLeaving()) {
          return;
        }
        this.socket._leaveOpenTopic(this.topic);
        this.state = CHANNEL_STATES.joining;
        this.joinPush.resend(timeout);
      }
      /** @internal */
      _getPayloadRecords(payload) {
        const records = {
          new: {},
          old: {}
        };
        if (payload.type === "INSERT" || payload.type === "UPDATE") {
          records.new = convertChangeData(payload.columns, payload.record);
        }
        if (payload.type === "UPDATE" || payload.type === "DELETE") {
          records.old = convertChangeData(payload.columns, payload.old_record);
        }
        return records;
      }
    };
  }
});

// node_modules/.pnpm/ws@8.16.0/node_modules/ws/browser.js
var require_browser = __commonJS({
  "node_modules/.pnpm/ws@8.16.0/node_modules/ws/browser.js"(exports, module) {
    "use strict";
    module.exports = function() {
      throw new Error(
        "ws does not work in the browser. Browser clients must use the native WebSocket object"
      );
    };
  }
});

// node_modules/.pnpm/@supabase+realtime-js@2.9.3/node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js
var noop3, NATIVE_WEBSOCKET_AVAILABLE, RealtimeClient, WSWebSocketDummy;
var init_RealtimeClient = __esm({
  "node_modules/.pnpm/@supabase+realtime-js@2.9.3/node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js"() {
    init_constants2();
    init_timer();
    init_serializer();
    init_RealtimeChannel();
    noop3 = () => {
    };
    NATIVE_WEBSOCKET_AVAILABLE = typeof WebSocket !== "undefined";
    RealtimeClient = class {
      /**
       * Initializes the Socket.
       *
       * @param endPoint The string WebSocket endpoint, ie, "ws://example.com/socket", "wss://example.com", "/socket" (inherited host & protocol)
       * @param options.transport The Websocket Transport, for example WebSocket.
       * @param options.timeout The default timeout in milliseconds to trigger push timeouts.
       * @param options.params The optional params to pass when connecting.
       * @param options.headers The optional headers to pass when connecting.
       * @param options.heartbeatIntervalMs The millisec interval to send a heartbeat message.
       * @param options.logger The optional function for specialized logging, ie: logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
       * @param options.encode The function to encode outgoing messages. Defaults to JSON: (payload, callback) => callback(JSON.stringify(payload))
       * @param options.decode The function to decode incoming messages. Defaults to Serializer's decode.
       * @param options.reconnectAfterMs he optional function that returns the millsec reconnect interval. Defaults to stepped backoff off.
       */
      constructor(endPoint, options2) {
        var _a;
        this.accessToken = null;
        this.apiKey = null;
        this.channels = [];
        this.endPoint = "";
        this.headers = DEFAULT_HEADERS2;
        this.params = {};
        this.timeout = DEFAULT_TIMEOUT;
        this.heartbeatIntervalMs = 3e4;
        this.heartbeatTimer = void 0;
        this.pendingHeartbeatRef = null;
        this.ref = 0;
        this.logger = noop3;
        this.conn = null;
        this.sendBuffer = [];
        this.serializer = new Serializer();
        this.stateChangeCallbacks = {
          open: [],
          close: [],
          error: [],
          message: []
        };
        this._resolveFetch = (customFetch) => {
          let _fetch;
          if (customFetch) {
            _fetch = customFetch;
          } else if (typeof fetch === "undefined") {
            _fetch = (...args) => Promise.resolve().then(() => (init_browser2(), browser_exports)).then(({ default: fetch3 }) => fetch3(...args));
          } else {
            _fetch = fetch;
          }
          return (...args) => _fetch(...args);
        };
        this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
        if (options2 === null || options2 === void 0 ? void 0 : options2.transport) {
          this.transport = options2.transport;
        } else {
          this.transport = null;
        }
        if (options2 === null || options2 === void 0 ? void 0 : options2.params)
          this.params = options2.params;
        if (options2 === null || options2 === void 0 ? void 0 : options2.headers)
          this.headers = Object.assign(Object.assign({}, this.headers), options2.headers);
        if (options2 === null || options2 === void 0 ? void 0 : options2.timeout)
          this.timeout = options2.timeout;
        if (options2 === null || options2 === void 0 ? void 0 : options2.logger)
          this.logger = options2.logger;
        if (options2 === null || options2 === void 0 ? void 0 : options2.heartbeatIntervalMs)
          this.heartbeatIntervalMs = options2.heartbeatIntervalMs;
        const accessToken = (_a = options2 === null || options2 === void 0 ? void 0 : options2.params) === null || _a === void 0 ? void 0 : _a.apikey;
        if (accessToken) {
          this.accessToken = accessToken;
          this.apiKey = accessToken;
        }
        this.reconnectAfterMs = (options2 === null || options2 === void 0 ? void 0 : options2.reconnectAfterMs) ? options2.reconnectAfterMs : (tries) => {
          return [1e3, 2e3, 5e3, 1e4][tries - 1] || 1e4;
        };
        this.encode = (options2 === null || options2 === void 0 ? void 0 : options2.encode) ? options2.encode : (payload, callback) => {
          return callback(JSON.stringify(payload));
        };
        this.decode = (options2 === null || options2 === void 0 ? void 0 : options2.decode) ? options2.decode : this.serializer.decode.bind(this.serializer);
        this.reconnectTimer = new Timer(async () => {
          this.disconnect();
          this.connect();
        }, this.reconnectAfterMs);
        this.fetch = this._resolveFetch(options2 === null || options2 === void 0 ? void 0 : options2.fetch);
      }
      /**
       * Connects the socket, unless already connected.
       */
      connect() {
        if (this.conn) {
          return;
        }
        if (this.transport) {
          this.conn = new this.transport(this._endPointURL(), void 0, {
            headers: this.headers
          });
          return;
        }
        if (NATIVE_WEBSOCKET_AVAILABLE) {
          this.conn = new WebSocket(this._endPointURL());
          this.setupConnection();
          return;
        }
        this.conn = new WSWebSocketDummy(this._endPointURL(), void 0, {
          close: () => {
            this.conn = null;
          }
        });
        Promise.resolve().then(() => __toESM(require_browser())).then(({ default: WS }) => {
          this.conn = new WS(this._endPointURL(), void 0, {
            headers: this.headers
          });
          this.setupConnection();
        });
      }
      /**
       * Disconnects the socket.
       *
       * @param code A numeric status code to send on disconnect.
       * @param reason A custom reason for the disconnect.
       */
      disconnect(code, reason) {
        if (this.conn) {
          this.conn.onclose = function() {
          };
          if (code) {
            this.conn.close(code, reason !== null && reason !== void 0 ? reason : "");
          } else {
            this.conn.close();
          }
          this.conn = null;
          this.heartbeatTimer && clearInterval(this.heartbeatTimer);
          this.reconnectTimer.reset();
        }
      }
      /**
       * Returns all created channels
       */
      getChannels() {
        return this.channels;
      }
      /**
       * Unsubscribes and removes a single channel
       * @param channel A RealtimeChannel instance
       */
      async removeChannel(channel) {
        const status = await channel.unsubscribe();
        if (this.channels.length === 0) {
          this.disconnect();
        }
        return status;
      }
      /**
       * Unsubscribes and removes all channels
       */
      async removeAllChannels() {
        const values_1 = await Promise.all(this.channels.map((channel) => channel.unsubscribe()));
        this.disconnect();
        return values_1;
      }
      /**
       * Logs the message.
       *
       * For customized logging, `this.logger` can be overridden.
       */
      log(kind, msg, data) {
        this.logger(kind, msg, data);
      }
      /**
       * Returns the current state of the socket.
       */
      connectionState() {
        switch (this.conn && this.conn.readyState) {
          case SOCKET_STATES.connecting:
            return CONNECTION_STATE.Connecting;
          case SOCKET_STATES.open:
            return CONNECTION_STATE.Open;
          case SOCKET_STATES.closing:
            return CONNECTION_STATE.Closing;
          default:
            return CONNECTION_STATE.Closed;
        }
      }
      /**
       * Returns `true` is the connection is open.
       */
      isConnected() {
        return this.connectionState() === CONNECTION_STATE.Open;
      }
      channel(topic, params = { config: {} }) {
        const chan = new RealtimeChannel(`realtime:${topic}`, params, this);
        this.channels.push(chan);
        return chan;
      }
      /**
       * Push out a message if the socket is connected.
       *
       * If the socket is not connected, the message gets enqueued within a local buffer, and sent out when a connection is next established.
       */
      push(data) {
        const { topic, event, payload, ref } = data;
        const callback = () => {
          this.encode(data, (result) => {
            var _a;
            (_a = this.conn) === null || _a === void 0 ? void 0 : _a.send(result);
          });
        };
        this.log("push", `${topic} ${event} (${ref})`, payload);
        if (this.isConnected()) {
          callback();
        } else {
          this.sendBuffer.push(callback);
        }
      }
      /**
       * Sets the JWT access token used for channel subscription authorization and Realtime RLS.
       *
       * @param token A JWT string.
       */
      setAuth(token) {
        this.accessToken = token;
        this.channels.forEach((channel) => {
          token && channel.updateJoinPayload({ access_token: token });
          if (channel.joinedOnce && channel._isJoined()) {
            channel._push(CHANNEL_EVENTS.access_token, { access_token: token });
          }
        });
      }
      /**
       * Return the next message ref, accounting for overflows
       *
       * @internal
       */
      _makeRef() {
        let newRef = this.ref + 1;
        if (newRef === this.ref) {
          this.ref = 0;
        } else {
          this.ref = newRef;
        }
        return this.ref.toString();
      }
      /**
       * Unsubscribe from channels with the specified topic.
       *
       * @internal
       */
      _leaveOpenTopic(topic) {
        let dupChannel = this.channels.find((c) => c.topic === topic && (c._isJoined() || c._isJoining()));
        if (dupChannel) {
          this.log("transport", `leaving duplicate topic "${topic}"`);
          dupChannel.unsubscribe();
        }
      }
      /**
       * Removes a subscription from the socket.
       *
       * @param channel An open subscription.
       *
       * @internal
       */
      _remove(channel) {
        this.channels = this.channels.filter((c) => c._joinRef() !== channel._joinRef());
      }
      /**
       * Sets up connection handlers.
       *
       * @internal
       */
      setupConnection() {
        if (this.conn) {
          this.conn.binaryType = "arraybuffer";
          this.conn.onopen = () => this._onConnOpen();
          this.conn.onerror = (error2) => this._onConnError(error2);
          this.conn.onmessage = (event) => this._onConnMessage(event);
          this.conn.onclose = (event) => this._onConnClose(event);
        }
      }
      /**
       * Returns the URL of the websocket.
       *
       * @internal
       */
      _endPointURL() {
        return this._appendParams(this.endPoint, Object.assign({}, this.params, { vsn: VSN }));
      }
      /** @internal */
      _onConnMessage(rawMessage) {
        this.decode(rawMessage.data, (msg) => {
          let { topic, event, payload, ref } = msg;
          if (ref && ref === this.pendingHeartbeatRef || event === (payload === null || payload === void 0 ? void 0 : payload.type)) {
            this.pendingHeartbeatRef = null;
          }
          this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`, payload);
          this.channels.filter((channel) => channel._isMember(topic)).forEach((channel) => channel._trigger(event, payload, ref));
          this.stateChangeCallbacks.message.forEach((callback) => callback(msg));
        });
      }
      /** @internal */
      _onConnOpen() {
        this.log("transport", `connected to ${this._endPointURL()}`);
        this._flushSendBuffer();
        this.reconnectTimer.reset();
        this.heartbeatTimer && clearInterval(this.heartbeatTimer);
        this.heartbeatTimer = setInterval(() => this._sendHeartbeat(), this.heartbeatIntervalMs);
        this.stateChangeCallbacks.open.forEach((callback) => callback());
      }
      /** @internal */
      _onConnClose(event) {
        this.log("transport", "close", event);
        this._triggerChanError();
        this.heartbeatTimer && clearInterval(this.heartbeatTimer);
        this.reconnectTimer.scheduleTimeout();
        this.stateChangeCallbacks.close.forEach((callback) => callback(event));
      }
      /** @internal */
      _onConnError(error2) {
        this.log("transport", error2.message);
        this._triggerChanError();
        this.stateChangeCallbacks.error.forEach((callback) => callback(error2));
      }
      /** @internal */
      _triggerChanError() {
        this.channels.forEach((channel) => channel._trigger(CHANNEL_EVENTS.error));
      }
      /** @internal */
      _appendParams(url, params) {
        if (Object.keys(params).length === 0) {
          return url;
        }
        const prefix = url.match(/\?/) ? "&" : "?";
        const query = new URLSearchParams(params);
        return `${url}${prefix}${query}`;
      }
      /** @internal */
      _flushSendBuffer() {
        if (this.isConnected() && this.sendBuffer.length > 0) {
          this.sendBuffer.forEach((callback) => callback());
          this.sendBuffer = [];
        }
      }
      /** @internal */
      _sendHeartbeat() {
        var _a;
        if (!this.isConnected()) {
          return;
        }
        if (this.pendingHeartbeatRef) {
          this.pendingHeartbeatRef = null;
          this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
          (_a = this.conn) === null || _a === void 0 ? void 0 : _a.close(WS_CLOSE_NORMAL, "hearbeat timeout");
          return;
        }
        this.pendingHeartbeatRef = this._makeRef();
        this.push({
          topic: "phoenix",
          event: "heartbeat",
          payload: {},
          ref: this.pendingHeartbeatRef
        });
        this.setAuth(this.accessToken);
      }
    };
    WSWebSocketDummy = class {
      constructor(address, _protocols, options2) {
        this.binaryType = "arraybuffer";
        this.onclose = () => {
        };
        this.onerror = () => {
        };
        this.onmessage = () => {
        };
        this.onopen = () => {
        };
        this.readyState = SOCKET_STATES.connecting;
        this.send = () => {
        };
        this.url = null;
        this.url = address;
        this.close = options2.close;
      }
    };
  }
});

// node_modules/.pnpm/@supabase+realtime-js@2.9.3/node_modules/@supabase/realtime-js/dist/module/index.js
var init_module3 = __esm({
  "node_modules/.pnpm/@supabase+realtime-js@2.9.3/node_modules/@supabase/realtime-js/dist/module/index.js"() {
    init_RealtimeClient();
    init_RealtimeChannel();
    init_RealtimePresence();
  }
});

// node_modules/.pnpm/@supabase+storage-js@2.5.5/node_modules/@supabase/storage-js/dist/module/lib/errors.js
function isStorageError(error2) {
  return typeof error2 === "object" && error2 !== null && "__isStorageError" in error2;
}
var StorageError, StorageApiError, StorageUnknownError;
var init_errors2 = __esm({
  "node_modules/.pnpm/@supabase+storage-js@2.5.5/node_modules/@supabase/storage-js/dist/module/lib/errors.js"() {
    StorageError = class extends Error {
      constructor(message) {
        super(message);
        this.__isStorageError = true;
        this.name = "StorageError";
      }
    };
    StorageApiError = class extends StorageError {
      constructor(message, status) {
        super(message);
        this.name = "StorageApiError";
        this.status = status;
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          status: this.status
        };
      }
    };
    StorageUnknownError = class extends StorageError {
      constructor(message, originalError) {
        super(message);
        this.name = "StorageUnknownError";
        this.originalError = originalError;
      }
    };
  }
});

// node_modules/.pnpm/@supabase+storage-js@2.5.5/node_modules/@supabase/storage-js/dist/module/lib/helpers.js
var __awaiter2, resolveFetch2, resolveResponse;
var init_helpers = __esm({
  "node_modules/.pnpm/@supabase+storage-js@2.5.5/node_modules/@supabase/storage-js/dist/module/lib/helpers.js"() {
    __awaiter2 = function(thisArg, _arguments, P2, generator) {
      function adopt(value) {
        return value instanceof P2 ? value : new P2(function(resolve2) {
          resolve2(value);
        });
      }
      return new (P2 || (P2 = Promise))(function(resolve2, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    resolveFetch2 = (customFetch) => {
      let _fetch;
      if (customFetch) {
        _fetch = customFetch;
      } else if (typeof fetch === "undefined") {
        _fetch = (...args) => Promise.resolve().then(() => (init_browser2(), browser_exports)).then(({ default: fetch3 }) => fetch3(...args));
      } else {
        _fetch = fetch;
      }
      return (...args) => _fetch(...args);
    };
    resolveResponse = () => __awaiter2(void 0, void 0, void 0, function* () {
      if (typeof Response === "undefined") {
        return (yield Promise.resolve().then(() => (init_browser2(), browser_exports))).Response;
      }
      return Response;
    });
  }
});

// node_modules/.pnpm/@supabase+storage-js@2.5.5/node_modules/@supabase/storage-js/dist/module/lib/fetch.js
function _handleRequest(fetcher, method, url, options2, parameters, body2) {
  return __awaiter3(this, void 0, void 0, function* () {
    return new Promise((resolve2, reject) => {
      fetcher(url, _getRequestParams(method, options2, parameters, body2)).then((result) => {
        if (!result.ok)
          throw result;
        if (options2 === null || options2 === void 0 ? void 0 : options2.noResolveJson)
          return result;
        return result.json();
      }).then((data) => resolve2(data)).catch((error2) => handleError(error2, reject));
    });
  });
}
function get(fetcher, url, options2, parameters) {
  return __awaiter3(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "GET", url, options2, parameters);
  });
}
function post(fetcher, url, body2, options2, parameters) {
  return __awaiter3(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "POST", url, options2, parameters, body2);
  });
}
function put(fetcher, url, body2, options2, parameters) {
  return __awaiter3(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "PUT", url, options2, parameters, body2);
  });
}
function remove(fetcher, url, body2, options2, parameters) {
  return __awaiter3(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "DELETE", url, options2, parameters, body2);
  });
}
var __awaiter3, _getErrorMessage, handleError, _getRequestParams;
var init_fetch = __esm({
  "node_modules/.pnpm/@supabase+storage-js@2.5.5/node_modules/@supabase/storage-js/dist/module/lib/fetch.js"() {
    init_errors2();
    init_helpers();
    __awaiter3 = function(thisArg, _arguments, P2, generator) {
      function adopt(value) {
        return value instanceof P2 ? value : new P2(function(resolve2) {
          resolve2(value);
        });
      }
      return new (P2 || (P2 = Promise))(function(resolve2, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    _getErrorMessage = (err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
    handleError = (error2, reject) => __awaiter3(void 0, void 0, void 0, function* () {
      const Res = yield resolveResponse();
      if (error2 instanceof Res) {
        error2.json().then((err) => {
          reject(new StorageApiError(_getErrorMessage(err), error2.status || 500));
        }).catch((err) => {
          reject(new StorageUnknownError(_getErrorMessage(err), err));
        });
      } else {
        reject(new StorageUnknownError(_getErrorMessage(error2), error2));
      }
    });
    _getRequestParams = (method, options2, parameters, body2) => {
      const params = { method, headers: (options2 === null || options2 === void 0 ? void 0 : options2.headers) || {} };
      if (method === "GET") {
        return params;
      }
      params.headers = Object.assign({ "Content-Type": "application/json" }, options2 === null || options2 === void 0 ? void 0 : options2.headers);
      params.body = JSON.stringify(body2);
      return Object.assign(Object.assign({}, params), parameters);
    };
  }
});

// node_modules/.pnpm/@supabase+storage-js@2.5.5/node_modules/@supabase/storage-js/dist/module/packages/StorageFileApi.js
var __awaiter4, DEFAULT_SEARCH_OPTIONS, DEFAULT_FILE_OPTIONS, StorageFileApi;
var init_StorageFileApi = __esm({
  "node_modules/.pnpm/@supabase+storage-js@2.5.5/node_modules/@supabase/storage-js/dist/module/packages/StorageFileApi.js"() {
    init_errors2();
    init_fetch();
    init_helpers();
    __awaiter4 = function(thisArg, _arguments, P2, generator) {
      function adopt(value) {
        return value instanceof P2 ? value : new P2(function(resolve2) {
          resolve2(value);
        });
      }
      return new (P2 || (P2 = Promise))(function(resolve2, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    DEFAULT_SEARCH_OPTIONS = {
      limit: 100,
      offset: 0,
      sortBy: {
        column: "name",
        order: "asc"
      }
    };
    DEFAULT_FILE_OPTIONS = {
      cacheControl: "3600",
      contentType: "text/plain;charset=UTF-8",
      upsert: false
    };
    StorageFileApi = class {
      constructor(url, headers2 = {}, bucketId, fetch3) {
        this.url = url;
        this.headers = headers2;
        this.bucketId = bucketId;
        this.fetch = resolveFetch2(fetch3);
      }
      /**
       * Uploads a file to an existing bucket or replaces an existing file at the specified path with a new one.
       *
       * @param method HTTP method.
       * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
       * @param fileBody The body of the file to be stored in the bucket.
       */
      uploadOrUpdate(method, path, fileBody, fileOptions) {
        return __awaiter4(this, void 0, void 0, function* () {
          try {
            let body2;
            const options2 = Object.assign(Object.assign({}, DEFAULT_FILE_OPTIONS), fileOptions);
            const headers2 = Object.assign(Object.assign({}, this.headers), method === "POST" && { "x-upsert": String(options2.upsert) });
            if (typeof Blob !== "undefined" && fileBody instanceof Blob) {
              body2 = new FormData();
              body2.append("cacheControl", options2.cacheControl);
              body2.append("", fileBody);
            } else if (typeof FormData !== "undefined" && fileBody instanceof FormData) {
              body2 = fileBody;
              body2.append("cacheControl", options2.cacheControl);
            } else {
              body2 = fileBody;
              headers2["cache-control"] = `max-age=${options2.cacheControl}`;
              headers2["content-type"] = options2.contentType;
            }
            const cleanPath = this._removeEmptyFolders(path);
            const _path = this._getFinalPath(cleanPath);
            const res = yield this.fetch(`${this.url}/object/${_path}`, Object.assign({ method, body: body2, headers: headers2 }, (options2 === null || options2 === void 0 ? void 0 : options2.duplex) ? { duplex: options2.duplex } : {}));
            const data = yield res.json();
            if (res.ok) {
              return {
                data: { path: cleanPath, id: data.Id, fullPath: data.Key },
                error: null
              };
            } else {
              const error2 = data;
              return { data: null, error: error2 };
            }
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Uploads a file to an existing bucket.
       *
       * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
       * @param fileBody The body of the file to be stored in the bucket.
       */
      upload(path, fileBody, fileOptions) {
        return __awaiter4(this, void 0, void 0, function* () {
          return this.uploadOrUpdate("POST", path, fileBody, fileOptions);
        });
      }
      /**
       * Upload a file with a token generated from `createSignedUploadUrl`.
       * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
       * @param token The token generated from `createSignedUploadUrl`
       * @param fileBody The body of the file to be stored in the bucket.
       */
      uploadToSignedUrl(path, token, fileBody, fileOptions) {
        return __awaiter4(this, void 0, void 0, function* () {
          const cleanPath = this._removeEmptyFolders(path);
          const _path = this._getFinalPath(cleanPath);
          const url = new URL(this.url + `/object/upload/sign/${_path}`);
          url.searchParams.set("token", token);
          try {
            let body2;
            const options2 = Object.assign({ upsert: DEFAULT_FILE_OPTIONS.upsert }, fileOptions);
            const headers2 = Object.assign(Object.assign({}, this.headers), { "x-upsert": String(options2.upsert) });
            if (typeof Blob !== "undefined" && fileBody instanceof Blob) {
              body2 = new FormData();
              body2.append("cacheControl", options2.cacheControl);
              body2.append("", fileBody);
            } else if (typeof FormData !== "undefined" && fileBody instanceof FormData) {
              body2 = fileBody;
              body2.append("cacheControl", options2.cacheControl);
            } else {
              body2 = fileBody;
              headers2["cache-control"] = `max-age=${options2.cacheControl}`;
              headers2["content-type"] = options2.contentType;
            }
            const res = yield this.fetch(url.toString(), {
              method: "PUT",
              body: body2,
              headers: headers2
            });
            const data = yield res.json();
            if (res.ok) {
              return {
                data: { path: cleanPath, fullPath: data.Key },
                error: null
              };
            } else {
              const error2 = data;
              return { data: null, error: error2 };
            }
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Creates a signed upload URL.
       * Signed upload URLs can be used to upload files to the bucket without further authentication.
       * They are valid for 2 hours.
       * @param path The file path, including the current file name. For example `folder/image.png`.
       */
      createSignedUploadUrl(path) {
        return __awaiter4(this, void 0, void 0, function* () {
          try {
            let _path = this._getFinalPath(path);
            const data = yield post(this.fetch, `${this.url}/object/upload/sign/${_path}`, {}, { headers: this.headers });
            const url = new URL(this.url + data.url);
            const token = url.searchParams.get("token");
            if (!token) {
              throw new StorageError("No token returned by API");
            }
            return { data: { signedUrl: url.toString(), path, token }, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Replaces an existing file at the specified path with a new one.
       *
       * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to update.
       * @param fileBody The body of the file to be stored in the bucket.
       */
      update(path, fileBody, fileOptions) {
        return __awaiter4(this, void 0, void 0, function* () {
          return this.uploadOrUpdate("PUT", path, fileBody, fileOptions);
        });
      }
      /**
       * Moves an existing file to a new path in the same bucket.
       *
       * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
       * @param toPath The new file path, including the new file name. For example `folder/image-new.png`.
       */
      move(fromPath, toPath) {
        return __awaiter4(this, void 0, void 0, function* () {
          try {
            const data = yield post(this.fetch, `${this.url}/object/move`, { bucketId: this.bucketId, sourceKey: fromPath, destinationKey: toPath }, { headers: this.headers });
            return { data, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Copies an existing file to a new path in the same bucket.
       *
       * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
       * @param toPath The new file path, including the new file name. For example `folder/image-copy.png`.
       */
      copy(fromPath, toPath) {
        return __awaiter4(this, void 0, void 0, function* () {
          try {
            const data = yield post(this.fetch, `${this.url}/object/copy`, { bucketId: this.bucketId, sourceKey: fromPath, destinationKey: toPath }, { headers: this.headers });
            return { data: { path: data.Key }, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Creates a signed URL. Use a signed URL to share a file for a fixed amount of time.
       *
       * @param path The file path, including the current file name. For example `folder/image.png`.
       * @param expiresIn The number of seconds until the signed URL expires. For example, `60` for a URL which is valid for one minute.
       * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
       * @param options.transform Transform the asset before serving it to the client.
       */
      createSignedUrl(path, expiresIn, options2) {
        return __awaiter4(this, void 0, void 0, function* () {
          try {
            let _path = this._getFinalPath(path);
            let data = yield post(this.fetch, `${this.url}/object/sign/${_path}`, Object.assign({ expiresIn }, (options2 === null || options2 === void 0 ? void 0 : options2.transform) ? { transform: options2.transform } : {}), { headers: this.headers });
            const downloadQueryParam = (options2 === null || options2 === void 0 ? void 0 : options2.download) ? `&download=${options2.download === true ? "" : options2.download}` : "";
            const signedUrl = encodeURI(`${this.url}${data.signedURL}${downloadQueryParam}`);
            data = { signedUrl };
            return { data, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Creates multiple signed URLs. Use a signed URL to share a file for a fixed amount of time.
       *
       * @param paths The file paths to be downloaded, including the current file names. For example `['folder/image.png', 'folder2/image2.png']`.
       * @param expiresIn The number of seconds until the signed URLs expire. For example, `60` for URLs which are valid for one minute.
       * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
       */
      createSignedUrls(paths, expiresIn, options2) {
        return __awaiter4(this, void 0, void 0, function* () {
          try {
            const data = yield post(this.fetch, `${this.url}/object/sign/${this.bucketId}`, { expiresIn, paths }, { headers: this.headers });
            const downloadQueryParam = (options2 === null || options2 === void 0 ? void 0 : options2.download) ? `&download=${options2.download === true ? "" : options2.download}` : "";
            return {
              data: data.map((datum) => Object.assign(Object.assign({}, datum), { signedUrl: datum.signedURL ? encodeURI(`${this.url}${datum.signedURL}${downloadQueryParam}`) : null })),
              error: null
            };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Downloads a file from a private bucket. For public buckets, make a request to the URL returned from `getPublicUrl` instead.
       *
       * @param path The full path and file name of the file to be downloaded. For example `folder/image.png`.
       * @param options.transform Transform the asset before serving it to the client.
       */
      download(path, options2) {
        return __awaiter4(this, void 0, void 0, function* () {
          const wantsTransformation = typeof (options2 === null || options2 === void 0 ? void 0 : options2.transform) !== "undefined";
          const renderPath = wantsTransformation ? "render/image/authenticated" : "object";
          const transformationQuery = this.transformOptsToQueryString((options2 === null || options2 === void 0 ? void 0 : options2.transform) || {});
          const queryString = transformationQuery ? `?${transformationQuery}` : "";
          try {
            const _path = this._getFinalPath(path);
            const res = yield get(this.fetch, `${this.url}/${renderPath}/${_path}${queryString}`, {
              headers: this.headers,
              noResolveJson: true
            });
            const data = yield res.blob();
            return { data, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * A simple convenience function to get the URL for an asset in a public bucket. If you do not want to use this function, you can construct the public URL by concatenating the bucket URL with the path to the asset.
       * This function does not verify if the bucket is public. If a public URL is created for a bucket which is not public, you will not be able to download the asset.
       *
       * @param path The path and name of the file to generate the public URL for. For example `folder/image.png`.
       * @param options.download Triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
       * @param options.transform Transform the asset before serving it to the client.
       */
      getPublicUrl(path, options2) {
        const _path = this._getFinalPath(path);
        const _queryString = [];
        const downloadQueryParam = (options2 === null || options2 === void 0 ? void 0 : options2.download) ? `download=${options2.download === true ? "" : options2.download}` : "";
        if (downloadQueryParam !== "") {
          _queryString.push(downloadQueryParam);
        }
        const wantsTransformation = typeof (options2 === null || options2 === void 0 ? void 0 : options2.transform) !== "undefined";
        const renderPath = wantsTransformation ? "render/image" : "object";
        const transformationQuery = this.transformOptsToQueryString((options2 === null || options2 === void 0 ? void 0 : options2.transform) || {});
        if (transformationQuery !== "") {
          _queryString.push(transformationQuery);
        }
        let queryString = _queryString.join("&");
        if (queryString !== "") {
          queryString = `?${queryString}`;
        }
        return {
          data: { publicUrl: encodeURI(`${this.url}/${renderPath}/public/${_path}${queryString}`) }
        };
      }
      /**
       * Deletes files within the same bucket
       *
       * @param paths An array of files to delete, including the path and file name. For example [`'folder/image.png'`].
       */
      remove(paths) {
        return __awaiter4(this, void 0, void 0, function* () {
          try {
            const data = yield remove(this.fetch, `${this.url}/object/${this.bucketId}`, { prefixes: paths }, { headers: this.headers });
            return { data, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Get file metadata
       * @param id the file id to retrieve metadata
       */
      // async getMetadata(
      //   id: string
      // ): Promise<
      //   | {
      //       data: Metadata
      //       error: null
      //     }
      //   | {
      //       data: null
      //       error: StorageError
      //     }
      // > {
      //   try {
      //     const data = await get(this.fetch, `${this.url}/metadata/${id}`, { headers: this.headers })
      //     return { data, error: null }
      //   } catch (error) {
      //     if (isStorageError(error)) {
      //       return { data: null, error }
      //     }
      //     throw error
      //   }
      // }
      /**
       * Update file metadata
       * @param id the file id to update metadata
       * @param meta the new file metadata
       */
      // async updateMetadata(
      //   id: string,
      //   meta: Metadata
      // ): Promise<
      //   | {
      //       data: Metadata
      //       error: null
      //     }
      //   | {
      //       data: null
      //       error: StorageError
      //     }
      // > {
      //   try {
      //     const data = await post(
      //       this.fetch,
      //       `${this.url}/metadata/${id}`,
      //       { ...meta },
      //       { headers: this.headers }
      //     )
      //     return { data, error: null }
      //   } catch (error) {
      //     if (isStorageError(error)) {
      //       return { data: null, error }
      //     }
      //     throw error
      //   }
      // }
      /**
       * Lists all the files within a bucket.
       * @param path The folder path.
       */
      list(path, options2, parameters) {
        return __awaiter4(this, void 0, void 0, function* () {
          try {
            const body2 = Object.assign(Object.assign(Object.assign({}, DEFAULT_SEARCH_OPTIONS), options2), { prefix: path || "" });
            const data = yield post(this.fetch, `${this.url}/object/list/${this.bucketId}`, body2, { headers: this.headers }, parameters);
            return { data, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      _getFinalPath(path) {
        return `${this.bucketId}/${path}`;
      }
      _removeEmptyFolders(path) {
        return path.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
      }
      transformOptsToQueryString(transform) {
        const params = [];
        if (transform.width) {
          params.push(`width=${transform.width}`);
        }
        if (transform.height) {
          params.push(`height=${transform.height}`);
        }
        if (transform.resize) {
          params.push(`resize=${transform.resize}`);
        }
        if (transform.format) {
          params.push(`format=${transform.format}`);
        }
        if (transform.quality) {
          params.push(`quality=${transform.quality}`);
        }
        return params.join("&");
      }
    };
  }
});

// node_modules/.pnpm/@supabase+storage-js@2.5.5/node_modules/@supabase/storage-js/dist/module/lib/version.js
var version3;
var init_version3 = __esm({
  "node_modules/.pnpm/@supabase+storage-js@2.5.5/node_modules/@supabase/storage-js/dist/module/lib/version.js"() {
    version3 = "2.5.5";
  }
});

// node_modules/.pnpm/@supabase+storage-js@2.5.5/node_modules/@supabase/storage-js/dist/module/lib/constants.js
var DEFAULT_HEADERS3;
var init_constants3 = __esm({
  "node_modules/.pnpm/@supabase+storage-js@2.5.5/node_modules/@supabase/storage-js/dist/module/lib/constants.js"() {
    init_version3();
    DEFAULT_HEADERS3 = { "X-Client-Info": `storage-js/${version3}` };
  }
});

// node_modules/.pnpm/@supabase+storage-js@2.5.5/node_modules/@supabase/storage-js/dist/module/packages/StorageBucketApi.js
var __awaiter5, StorageBucketApi;
var init_StorageBucketApi = __esm({
  "node_modules/.pnpm/@supabase+storage-js@2.5.5/node_modules/@supabase/storage-js/dist/module/packages/StorageBucketApi.js"() {
    init_constants3();
    init_errors2();
    init_fetch();
    init_helpers();
    __awaiter5 = function(thisArg, _arguments, P2, generator) {
      function adopt(value) {
        return value instanceof P2 ? value : new P2(function(resolve2) {
          resolve2(value);
        });
      }
      return new (P2 || (P2 = Promise))(function(resolve2, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    StorageBucketApi = class {
      constructor(url, headers2 = {}, fetch3) {
        this.url = url;
        this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS3), headers2);
        this.fetch = resolveFetch2(fetch3);
      }
      /**
       * Retrieves the details of all Storage buckets within an existing project.
       */
      listBuckets() {
        return __awaiter5(this, void 0, void 0, function* () {
          try {
            const data = yield get(this.fetch, `${this.url}/bucket`, { headers: this.headers });
            return { data, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Retrieves the details of an existing Storage bucket.
       *
       * @param id The unique identifier of the bucket you would like to retrieve.
       */
      getBucket(id) {
        return __awaiter5(this, void 0, void 0, function* () {
          try {
            const data = yield get(this.fetch, `${this.url}/bucket/${id}`, { headers: this.headers });
            return { data, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Creates a new Storage bucket
       *
       * @param id A unique identifier for the bucket you are creating.
       * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations. By default, buckets are private.
       * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
       * The global file size limit takes precedence over this value.
       * The default value is null, which doesn't set a per bucket file size limit.
       * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
       * The default value is null, which allows files with all mime types to be uploaded.
       * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
       * @returns newly created bucket id
       */
      createBucket(id, options2 = {
        public: false
      }) {
        return __awaiter5(this, void 0, void 0, function* () {
          try {
            const data = yield post(this.fetch, `${this.url}/bucket`, {
              id,
              name: id,
              public: options2.public,
              file_size_limit: options2.fileSizeLimit,
              allowed_mime_types: options2.allowedMimeTypes
            }, { headers: this.headers });
            return { data, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Updates a Storage bucket
       *
       * @param id A unique identifier for the bucket you are updating.
       * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations.
       * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
       * The global file size limit takes precedence over this value.
       * The default value is null, which doesn't set a per bucket file size limit.
       * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
       * The default value is null, which allows files with all mime types to be uploaded.
       * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
       */
      updateBucket(id, options2) {
        return __awaiter5(this, void 0, void 0, function* () {
          try {
            const data = yield put(this.fetch, `${this.url}/bucket/${id}`, {
              id,
              name: id,
              public: options2.public,
              file_size_limit: options2.fileSizeLimit,
              allowed_mime_types: options2.allowedMimeTypes
            }, { headers: this.headers });
            return { data, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Removes all objects inside a single bucket.
       *
       * @param id The unique identifier of the bucket you would like to empty.
       */
      emptyBucket(id) {
        return __awaiter5(this, void 0, void 0, function* () {
          try {
            const data = yield post(this.fetch, `${this.url}/bucket/${id}/empty`, {}, { headers: this.headers });
            return { data, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * Deletes an existing bucket. A bucket can't be deleted with existing objects inside it.
       * You must first `empty()` the bucket.
       *
       * @param id The unique identifier of the bucket you would like to delete.
       */
      deleteBucket(id) {
        return __awaiter5(this, void 0, void 0, function* () {
          try {
            const data = yield remove(this.fetch, `${this.url}/bucket/${id}`, {}, { headers: this.headers });
            return { data, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
    };
  }
});

// node_modules/.pnpm/@supabase+storage-js@2.5.5/node_modules/@supabase/storage-js/dist/module/StorageClient.js
var StorageClient;
var init_StorageClient = __esm({
  "node_modules/.pnpm/@supabase+storage-js@2.5.5/node_modules/@supabase/storage-js/dist/module/StorageClient.js"() {
    init_StorageFileApi();
    init_StorageBucketApi();
    StorageClient = class extends StorageBucketApi {
      constructor(url, headers2 = {}, fetch3) {
        super(url, headers2, fetch3);
      }
      /**
       * Perform file operation in a bucket.
       *
       * @param id The bucket id to operate on.
       */
      from(id) {
        return new StorageFileApi(this.url, this.headers, id, this.fetch);
      }
    };
  }
});

// node_modules/.pnpm/@supabase+storage-js@2.5.5/node_modules/@supabase/storage-js/dist/module/lib/types.js
var init_types2 = __esm({
  "node_modules/.pnpm/@supabase+storage-js@2.5.5/node_modules/@supabase/storage-js/dist/module/lib/types.js"() {
  }
});

// node_modules/.pnpm/@supabase+storage-js@2.5.5/node_modules/@supabase/storage-js/dist/module/index.js
var init_module4 = __esm({
  "node_modules/.pnpm/@supabase+storage-js@2.5.5/node_modules/@supabase/storage-js/dist/module/index.js"() {
    init_StorageClient();
    init_types2();
    init_errors2();
  }
});

// node_modules/.pnpm/@supabase+supabase-js@2.39.8/node_modules/@supabase/supabase-js/dist/module/lib/version.js
var version4;
var init_version4 = __esm({
  "node_modules/.pnpm/@supabase+supabase-js@2.39.8/node_modules/@supabase/supabase-js/dist/module/lib/version.js"() {
    version4 = "2.39.8";
  }
});

// node_modules/.pnpm/@supabase+supabase-js@2.39.8/node_modules/@supabase/supabase-js/dist/module/lib/constants.js
var JS_ENV, DEFAULT_HEADERS4, DEFAULT_GLOBAL_OPTIONS, DEFAULT_DB_OPTIONS, DEFAULT_AUTH_OPTIONS, DEFAULT_REALTIME_OPTIONS;
var init_constants4 = __esm({
  "node_modules/.pnpm/@supabase+supabase-js@2.39.8/node_modules/@supabase/supabase-js/dist/module/lib/constants.js"() {
    init_version4();
    JS_ENV = "";
    if (typeof Deno !== "undefined") {
      JS_ENV = "deno";
    } else if (typeof document !== "undefined") {
      JS_ENV = "web";
    } else if (typeof navigator !== "undefined" && navigator.product === "ReactNative") {
      JS_ENV = "react-native";
    } else {
      JS_ENV = "node";
    }
    DEFAULT_HEADERS4 = { "X-Client-Info": `supabase-js-${JS_ENV}/${version4}` };
    DEFAULT_GLOBAL_OPTIONS = {
      headers: DEFAULT_HEADERS4
    };
    DEFAULT_DB_OPTIONS = {
      schema: "public"
    };
    DEFAULT_AUTH_OPTIONS = {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: "implicit"
    };
    DEFAULT_REALTIME_OPTIONS = {};
  }
});

// node_modules/.pnpm/@supabase+supabase-js@2.39.8/node_modules/@supabase/supabase-js/dist/module/lib/fetch.js
var __awaiter6, resolveFetch3, resolveHeadersConstructor, fetchWithAuth;
var init_fetch2 = __esm({
  "node_modules/.pnpm/@supabase+supabase-js@2.39.8/node_modules/@supabase/supabase-js/dist/module/lib/fetch.js"() {
    init_browser2();
    __awaiter6 = function(thisArg, _arguments, P2, generator) {
      function adopt(value) {
        return value instanceof P2 ? value : new P2(function(resolve2) {
          resolve2(value);
        });
      }
      return new (P2 || (P2 = Promise))(function(resolve2, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    resolveFetch3 = (customFetch) => {
      let _fetch;
      if (customFetch) {
        _fetch = customFetch;
      } else if (typeof fetch === "undefined") {
        _fetch = browser_default;
      } else {
        _fetch = fetch;
      }
      return (...args) => _fetch(...args);
    };
    resolveHeadersConstructor = () => {
      if (typeof Headers === "undefined") {
        return Headers2;
      }
      return Headers;
    };
    fetchWithAuth = (supabaseKey, getAccessToken, customFetch) => {
      const fetch3 = resolveFetch3(customFetch);
      const HeadersConstructor = resolveHeadersConstructor();
      return (input, init2) => __awaiter6(void 0, void 0, void 0, function* () {
        var _a;
        const accessToken = (_a = yield getAccessToken()) !== null && _a !== void 0 ? _a : supabaseKey;
        let headers2 = new HeadersConstructor(init2 === null || init2 === void 0 ? void 0 : init2.headers);
        if (!headers2.has("apikey")) {
          headers2.set("apikey", supabaseKey);
        }
        if (!headers2.has("Authorization")) {
          headers2.set("Authorization", `Bearer ${accessToken}`);
        }
        return fetch3(input, Object.assign(Object.assign({}, init2), { headers: headers2 }));
      });
    };
  }
});

// node_modules/.pnpm/@supabase+supabase-js@2.39.8/node_modules/@supabase/supabase-js/dist/module/lib/helpers.js
function stripTrailingSlash(url) {
  return url.replace(/\/$/, "");
}
function applySettingDefaults(options2, defaults) {
  const { db: dbOptions, auth: authOptions, realtime: realtimeOptions, global: globalOptions } = options2;
  const { db: DEFAULT_DB_OPTIONS2, auth: DEFAULT_AUTH_OPTIONS2, realtime: DEFAULT_REALTIME_OPTIONS2, global: DEFAULT_GLOBAL_OPTIONS2 } = defaults;
  return {
    db: Object.assign(Object.assign({}, DEFAULT_DB_OPTIONS2), dbOptions),
    auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS2), authOptions),
    realtime: Object.assign(Object.assign({}, DEFAULT_REALTIME_OPTIONS2), realtimeOptions),
    global: Object.assign(Object.assign({}, DEFAULT_GLOBAL_OPTIONS2), globalOptions)
  };
}
var init_helpers2 = __esm({
  "node_modules/.pnpm/@supabase+supabase-js@2.39.8/node_modules/@supabase/supabase-js/dist/module/lib/helpers.js"() {
  }
});

// node_modules/.pnpm/@supabase+gotrue-js@2.62.2/node_modules/@supabase/gotrue-js/dist/module/lib/helpers.js
function expiresAt(expiresIn) {
  const timeNow = Math.round(Date.now() / 1e3);
  return timeNow + expiresIn;
}
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
}
function parseParametersFromURL(href) {
  const result = {};
  const url = new URL(href);
  if (url.hash && url.hash[0] === "#") {
    try {
      const hashSearchParams = new URLSearchParams(url.hash.substring(1));
      hashSearchParams.forEach((value, key2) => {
        result[key2] = value;
      });
    } catch (e) {
    }
  }
  url.searchParams.forEach((value, key2) => {
    result[key2] = value;
  });
  return result;
}
function decodeBase64URL(value) {
  const key2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  let base642 = "";
  let chr1, chr2, chr3;
  let enc1, enc2, enc3, enc4;
  let i = 0;
  value = value.replace("-", "+").replace("_", "/");
  while (i < value.length) {
    enc1 = key2.indexOf(value.charAt(i++));
    enc2 = key2.indexOf(value.charAt(i++));
    enc3 = key2.indexOf(value.charAt(i++));
    enc4 = key2.indexOf(value.charAt(i++));
    chr1 = enc1 << 2 | enc2 >> 4;
    chr2 = (enc2 & 15) << 4 | enc3 >> 2;
    chr3 = (enc3 & 3) << 6 | enc4;
    base642 = base642 + String.fromCharCode(chr1);
    if (enc3 != 64 && chr2 != 0) {
      base642 = base642 + String.fromCharCode(chr2);
    }
    if (enc4 != 64 && chr3 != 0) {
      base642 = base642 + String.fromCharCode(chr3);
    }
  }
  return base642;
}
function decodeJWTPayload(token) {
  const base64UrlRegex = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}=?$|[a-z0-9_-]{2}(==)?$)$/i;
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("JWT is not valid: not a JWT structure");
  }
  if (!base64UrlRegex.test(parts[1])) {
    throw new Error("JWT is not valid: payload is not in base64url format");
  }
  const base64Url = parts[1];
  return JSON.parse(decodeBase64URL(base64Url));
}
async function sleep(time) {
  return await new Promise((accept) => {
    setTimeout(() => accept(null), time);
  });
}
function retryable(fn, isRetryable) {
  const promise = new Promise((accept, reject) => {
    ;
    (async () => {
      for (let attempt = 0; attempt < Infinity; attempt++) {
        try {
          const result = await fn(attempt);
          if (!isRetryable(attempt, null, result)) {
            accept(result);
            return;
          }
        } catch (e) {
          if (!isRetryable(attempt, e)) {
            reject(e);
            return;
          }
        }
      }
    })();
  });
  return promise;
}
function dec2hex(dec) {
  return ("0" + dec.toString(16)).substr(-2);
}
function generatePKCEVerifier() {
  const verifierLength = 56;
  const array2 = new Uint32Array(verifierLength);
  if (typeof crypto === "undefined") {
    const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    const charSetLen = charSet.length;
    let verifier = "";
    for (let i = 0; i < verifierLength; i++) {
      verifier += charSet.charAt(Math.floor(Math.random() * charSetLen));
    }
    return verifier;
  }
  crypto.getRandomValues(array2);
  return Array.from(array2, dec2hex).join("");
}
async function sha256(randomString) {
  const encoder4 = new TextEncoder();
  const encodedData = encoder4.encode(randomString);
  const hash2 = await crypto.subtle.digest("SHA-256", encodedData);
  const bytes = new Uint8Array(hash2);
  return Array.from(bytes).map((c) => String.fromCharCode(c)).join("");
}
function base64urlencode(str) {
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
async function generatePKCEChallenge(verifier) {
  const hasCryptoSupport = typeof crypto !== "undefined" && typeof crypto.subtle !== "undefined" && typeof TextEncoder !== "undefined";
  if (!hasCryptoSupport) {
    console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256.");
    return verifier;
  }
  const hashed = await sha256(verifier);
  return base64urlencode(hashed);
}
var isBrowser, localStorageWriteTests, supportsLocalStorage, resolveFetch4, looksLikeFetchResponse, setItemAsync, getItemAsync, removeItemAsync, Deferred;
var init_helpers3 = __esm({
  "node_modules/.pnpm/@supabase+gotrue-js@2.62.2/node_modules/@supabase/gotrue-js/dist/module/lib/helpers.js"() {
    isBrowser = () => typeof document !== "undefined";
    localStorageWriteTests = {
      tested: false,
      writable: false
    };
    supportsLocalStorage = () => {
      if (!isBrowser()) {
        return false;
      }
      try {
        if (typeof globalThis.localStorage !== "object") {
          return false;
        }
      } catch (e) {
        return false;
      }
      if (localStorageWriteTests.tested) {
        return localStorageWriteTests.writable;
      }
      const randomKey = `lswt-${Math.random()}${Math.random()}`;
      try {
        globalThis.localStorage.setItem(randomKey, randomKey);
        globalThis.localStorage.removeItem(randomKey);
        localStorageWriteTests.tested = true;
        localStorageWriteTests.writable = true;
      } catch (e) {
        localStorageWriteTests.tested = true;
        localStorageWriteTests.writable = false;
      }
      return localStorageWriteTests.writable;
    };
    resolveFetch4 = (customFetch) => {
      let _fetch;
      if (customFetch) {
        _fetch = customFetch;
      } else if (typeof fetch === "undefined") {
        _fetch = (...args) => Promise.resolve().then(() => (init_browser2(), browser_exports)).then(({ default: fetch3 }) => fetch3(...args));
      } else {
        _fetch = fetch;
      }
      return (...args) => _fetch(...args);
    };
    looksLikeFetchResponse = (maybeResponse) => {
      return typeof maybeResponse === "object" && maybeResponse !== null && "status" in maybeResponse && "ok" in maybeResponse && "json" in maybeResponse && typeof maybeResponse.json === "function";
    };
    setItemAsync = async (storage2, key2, data) => {
      await storage2.setItem(key2, JSON.stringify(data));
    };
    getItemAsync = async (storage2, key2) => {
      const value = await storage2.getItem(key2);
      if (!value) {
        return null;
      }
      try {
        return JSON.parse(value);
      } catch (_a) {
        return value;
      }
    };
    removeItemAsync = async (storage2, key2) => {
      await storage2.removeItem(key2);
    };
    Deferred = class _Deferred {
      constructor() {
        ;
        this.promise = new _Deferred.promiseConstructor((res, rej) => {
          ;
          this.resolve = res;
          this.reject = rej;
        });
      }
    };
    Deferred.promiseConstructor = Promise;
  }
});

// node_modules/.pnpm/@supabase+gotrue-js@2.62.2/node_modules/@supabase/gotrue-js/dist/module/lib/errors.js
function isAuthError(error2) {
  return typeof error2 === "object" && error2 !== null && "__isAuthError" in error2;
}
function isAuthApiError(error2) {
  return isAuthError(error2) && error2.name === "AuthApiError";
}
function isAuthRetryableFetchError(error2) {
  return isAuthError(error2) && error2.name === "AuthRetryableFetchError";
}
var AuthError, AuthApiError, AuthUnknownError, CustomAuthError, AuthSessionMissingError, AuthInvalidTokenResponseError, AuthInvalidCredentialsError, AuthImplicitGrantRedirectError, AuthPKCEGrantCodeExchangeError, AuthRetryableFetchError, AuthWeakPasswordError;
var init_errors3 = __esm({
  "node_modules/.pnpm/@supabase+gotrue-js@2.62.2/node_modules/@supabase/gotrue-js/dist/module/lib/errors.js"() {
    AuthError = class extends Error {
      constructor(message, status) {
        super(message);
        this.__isAuthError = true;
        this.name = "AuthError";
        this.status = status;
      }
    };
    AuthApiError = class extends AuthError {
      constructor(message, status) {
        super(message, status);
        this.name = "AuthApiError";
        this.status = status;
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          status: this.status
        };
      }
    };
    AuthUnknownError = class extends AuthError {
      constructor(message, originalError) {
        super(message);
        this.name = "AuthUnknownError";
        this.originalError = originalError;
      }
    };
    CustomAuthError = class extends AuthError {
      constructor(message, name2, status) {
        super(message);
        this.name = name2;
        this.status = status;
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          status: this.status
        };
      }
    };
    AuthSessionMissingError = class extends CustomAuthError {
      constructor() {
        super("Auth session missing!", "AuthSessionMissingError", 400);
      }
    };
    AuthInvalidTokenResponseError = class extends CustomAuthError {
      constructor() {
        super("Auth session or user missing", "AuthInvalidTokenResponseError", 500);
      }
    };
    AuthInvalidCredentialsError = class extends CustomAuthError {
      constructor(message) {
        super(message, "AuthInvalidCredentialsError", 400);
      }
    };
    AuthImplicitGrantRedirectError = class extends CustomAuthError {
      constructor(message, details = null) {
        super(message, "AuthImplicitGrantRedirectError", 500);
        this.details = null;
        this.details = details;
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          status: this.status,
          details: this.details
        };
      }
    };
    AuthPKCEGrantCodeExchangeError = class extends CustomAuthError {
      constructor(message, details = null) {
        super(message, "AuthPKCEGrantCodeExchangeError", 500);
        this.details = null;
        this.details = details;
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          status: this.status,
          details: this.details
        };
      }
    };
    AuthRetryableFetchError = class extends CustomAuthError {
      constructor(message, status) {
        super(message, "AuthRetryableFetchError", status);
      }
    };
    AuthWeakPasswordError = class extends CustomAuthError {
      constructor(message, status, reasons) {
        super(message, "AuthWeakPasswordError", status);
        this.reasons = reasons;
      }
    };
  }
});

// node_modules/.pnpm/@supabase+gotrue-js@2.62.2/node_modules/@supabase/gotrue-js/dist/module/lib/fetch.js
async function handleError2(error2) {
  if (!looksLikeFetchResponse(error2)) {
    throw new AuthRetryableFetchError(_getErrorMessage2(error2), 0);
  }
  if (NETWORK_ERROR_CODES.includes(error2.status)) {
    throw new AuthRetryableFetchError(_getErrorMessage2(error2), error2.status);
  }
  let data;
  try {
    data = await error2.json();
  } catch (e) {
    throw new AuthUnknownError(_getErrorMessage2(e), e);
  }
  if (typeof data === "object" && data && typeof data.weak_password === "object" && data.weak_password && Array.isArray(data.weak_password.reasons) && data.weak_password.reasons.length && data.weak_password.reasons.reduce((a, i) => a && typeof i === "string", true)) {
    throw new AuthWeakPasswordError(_getErrorMessage2(data), error2.status, data.weak_password.reasons);
  }
  throw new AuthApiError(_getErrorMessage2(data), error2.status || 500);
}
async function _request(fetcher, method, url, options2) {
  var _a;
  const headers2 = Object.assign({}, options2 === null || options2 === void 0 ? void 0 : options2.headers);
  if (options2 === null || options2 === void 0 ? void 0 : options2.jwt) {
    headers2["Authorization"] = `Bearer ${options2.jwt}`;
  }
  const qs = (_a = options2 === null || options2 === void 0 ? void 0 : options2.query) !== null && _a !== void 0 ? _a : {};
  if (options2 === null || options2 === void 0 ? void 0 : options2.redirectTo) {
    qs["redirect_to"] = options2.redirectTo;
  }
  const queryString = Object.keys(qs).length ? "?" + new URLSearchParams(qs).toString() : "";
  const data = await _handleRequest2(fetcher, method, url + queryString, { headers: headers2, noResolveJson: options2 === null || options2 === void 0 ? void 0 : options2.noResolveJson }, {}, options2 === null || options2 === void 0 ? void 0 : options2.body);
  return (options2 === null || options2 === void 0 ? void 0 : options2.xform) ? options2 === null || options2 === void 0 ? void 0 : options2.xform(data) : { data: Object.assign({}, data), error: null };
}
async function _handleRequest2(fetcher, method, url, options2, parameters, body2) {
  const requestParams = _getRequestParams2(method, options2, parameters, body2);
  let result;
  try {
    result = await fetcher(url, requestParams);
  } catch (e) {
    console.error(e);
    throw new AuthRetryableFetchError(_getErrorMessage2(e), 0);
  }
  if (!result.ok) {
    await handleError2(result);
  }
  if (options2 === null || options2 === void 0 ? void 0 : options2.noResolveJson) {
    return result;
  }
  try {
    return await result.json();
  } catch (e) {
    await handleError2(e);
  }
}
function _sessionResponse(data) {
  var _a;
  let session = null;
  if (hasSession(data)) {
    session = Object.assign({}, data);
    if (!data.expires_at) {
      session.expires_at = expiresAt(data.expires_in);
    }
  }
  const user = (_a = data.user) !== null && _a !== void 0 ? _a : data;
  return { data: { session, user }, error: null };
}
function _sessionResponsePassword(data) {
  const response = _sessionResponse(data);
  if (!response.error && data.weak_password && typeof data.weak_password === "object" && Array.isArray(data.weak_password.reasons) && data.weak_password.reasons.length && data.weak_password.message && typeof data.weak_password.message === "string" && data.weak_password.reasons.reduce((a, i) => a && typeof i === "string", true)) {
    response.data.weak_password = data.weak_password;
  }
  return response;
}
function _userResponse(data) {
  var _a;
  const user = (_a = data.user) !== null && _a !== void 0 ? _a : data;
  return { data: { user }, error: null };
}
function _ssoResponse(data) {
  return { data, error: null };
}
function _generateLinkResponse(data) {
  const { action_link, email_otp, hashed_token, redirect_to, verification_type } = data, rest = __rest(data, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"]);
  const properties = {
    action_link,
    email_otp,
    hashed_token,
    redirect_to,
    verification_type
  };
  const user = Object.assign({}, rest);
  return {
    data: {
      properties,
      user
    },
    error: null
  };
}
function _noResolveJsonResponse(data) {
  return data;
}
function hasSession(data) {
  return data.access_token && data.refresh_token && data.expires_in;
}
var __rest, _getErrorMessage2, NETWORK_ERROR_CODES, _getRequestParams2;
var init_fetch3 = __esm({
  "node_modules/.pnpm/@supabase+gotrue-js@2.62.2/node_modules/@supabase/gotrue-js/dist/module/lib/fetch.js"() {
    init_helpers3();
    init_errors3();
    __rest = function(s2, e) {
      var t = {};
      for (var p in s2)
        if (Object.prototype.hasOwnProperty.call(s2, p) && e.indexOf(p) < 0)
          t[p] = s2[p];
      if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s2); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i]))
            t[p[i]] = s2[p[i]];
        }
      return t;
    };
    _getErrorMessage2 = (err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
    NETWORK_ERROR_CODES = [502, 503, 504];
    _getRequestParams2 = (method, options2, parameters, body2) => {
      const params = { method, headers: (options2 === null || options2 === void 0 ? void 0 : options2.headers) || {} };
      if (method === "GET") {
        return params;
      }
      params.headers = Object.assign({ "Content-Type": "application/json;charset=UTF-8" }, options2 === null || options2 === void 0 ? void 0 : options2.headers);
      params.body = JSON.stringify(body2);
      return Object.assign(Object.assign({}, params), parameters);
    };
  }
});

// node_modules/.pnpm/@supabase+gotrue-js@2.62.2/node_modules/@supabase/gotrue-js/dist/module/GoTrueAdminApi.js
var __rest2, GoTrueAdminApi;
var init_GoTrueAdminApi = __esm({
  "node_modules/.pnpm/@supabase+gotrue-js@2.62.2/node_modules/@supabase/gotrue-js/dist/module/GoTrueAdminApi.js"() {
    init_fetch3();
    init_helpers3();
    init_errors3();
    __rest2 = function(s2, e) {
      var t = {};
      for (var p in s2)
        if (Object.prototype.hasOwnProperty.call(s2, p) && e.indexOf(p) < 0)
          t[p] = s2[p];
      if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s2); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i]))
            t[p[i]] = s2[p[i]];
        }
      return t;
    };
    GoTrueAdminApi = class {
      constructor({ url = "", headers: headers2 = {}, fetch: fetch3 }) {
        this.url = url;
        this.headers = headers2;
        this.fetch = resolveFetch4(fetch3);
        this.mfa = {
          listFactors: this._listFactors.bind(this),
          deleteFactor: this._deleteFactor.bind(this)
        };
      }
      /**
       * Removes a logged-in session.
       * @param jwt A valid, logged-in JWT.
       * @param scope The logout sope.
       */
      async signOut(jwt, scope = "global") {
        try {
          await _request(this.fetch, "POST", `${this.url}/logout?scope=${scope}`, {
            headers: this.headers,
            jwt,
            noResolveJson: true
          });
          return { data: null, error: null };
        } catch (error2) {
          if (isAuthError(error2)) {
            return { data: null, error: error2 };
          }
          throw error2;
        }
      }
      /**
       * Sends an invite link to an email address.
       * @param email The email address of the user.
       * @param options Additional options to be included when inviting.
       */
      async inviteUserByEmail(email, options2 = {}) {
        try {
          return await _request(this.fetch, "POST", `${this.url}/invite`, {
            body: { email, data: options2.data },
            headers: this.headers,
            redirectTo: options2.redirectTo,
            xform: _userResponse
          });
        } catch (error2) {
          if (isAuthError(error2)) {
            return { data: { user: null }, error: error2 };
          }
          throw error2;
        }
      }
      /**
       * Generates email links and OTPs to be sent via a custom email provider.
       * @param email The user's email.
       * @param options.password User password. For signup only.
       * @param options.data Optional user metadata. For signup only.
       * @param options.redirectTo The redirect url which should be appended to the generated link
       */
      async generateLink(params) {
        try {
          const { options: options2 } = params, rest = __rest2(params, ["options"]);
          const body2 = Object.assign(Object.assign({}, rest), options2);
          if ("newEmail" in rest) {
            body2.new_email = rest === null || rest === void 0 ? void 0 : rest.newEmail;
            delete body2["newEmail"];
          }
          return await _request(this.fetch, "POST", `${this.url}/admin/generate_link`, {
            body: body2,
            headers: this.headers,
            xform: _generateLinkResponse,
            redirectTo: options2 === null || options2 === void 0 ? void 0 : options2.redirectTo
          });
        } catch (error2) {
          if (isAuthError(error2)) {
            return {
              data: {
                properties: null,
                user: null
              },
              error: error2
            };
          }
          throw error2;
        }
      }
      // User Admin API
      /**
       * Creates a new user.
       * This function should only be called on a server. Never expose your `service_role` key in the browser.
       */
      async createUser(attributes) {
        try {
          return await _request(this.fetch, "POST", `${this.url}/admin/users`, {
            body: attributes,
            headers: this.headers,
            xform: _userResponse
          });
        } catch (error2) {
          if (isAuthError(error2)) {
            return { data: { user: null }, error: error2 };
          }
          throw error2;
        }
      }
      /**
       * Get a list of users.
       *
       * This function should only be called on a server. Never expose your `service_role` key in the browser.
       * @param params An object which supports `page` and `perPage` as numbers, to alter the paginated results.
       */
      async listUsers(params) {
        var _a, _b, _c, _d, _e, _f, _g;
        try {
          const pagination = { nextPage: null, lastPage: 0, total: 0 };
          const response = await _request(this.fetch, "GET", `${this.url}/admin/users`, {
            headers: this.headers,
            noResolveJson: true,
            query: {
              page: (_b = (_a = params === null || params === void 0 ? void 0 : params.page) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "",
              per_page: (_d = (_c = params === null || params === void 0 ? void 0 : params.perPage) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : ""
            },
            xform: _noResolveJsonResponse
          });
          if (response.error)
            throw response.error;
          const users = await response.json();
          const total = (_e = response.headers.get("x-total-count")) !== null && _e !== void 0 ? _e : 0;
          const links = (_g = (_f = response.headers.get("link")) === null || _f === void 0 ? void 0 : _f.split(",")) !== null && _g !== void 0 ? _g : [];
          if (links.length > 0) {
            links.forEach((link) => {
              const page2 = parseInt(link.split(";")[0].split("=")[1].substring(0, 1));
              const rel = JSON.parse(link.split(";")[1].split("=")[1]);
              pagination[`${rel}Page`] = page2;
            });
            pagination.total = parseInt(total);
          }
          return { data: Object.assign(Object.assign({}, users), pagination), error: null };
        } catch (error2) {
          if (isAuthError(error2)) {
            return { data: { users: [] }, error: error2 };
          }
          throw error2;
        }
      }
      /**
       * Get user by id.
       *
       * @param uid The user's unique identifier
       *
       * This function should only be called on a server. Never expose your `service_role` key in the browser.
       */
      async getUserById(uid) {
        try {
          return await _request(this.fetch, "GET", `${this.url}/admin/users/${uid}`, {
            headers: this.headers,
            xform: _userResponse
          });
        } catch (error2) {
          if (isAuthError(error2)) {
            return { data: { user: null }, error: error2 };
          }
          throw error2;
        }
      }
      /**
       * Updates the user data.
       *
       * @param attributes The data you want to update.
       *
       * This function should only be called on a server. Never expose your `service_role` key in the browser.
       */
      async updateUserById(uid, attributes) {
        try {
          return await _request(this.fetch, "PUT", `${this.url}/admin/users/${uid}`, {
            body: attributes,
            headers: this.headers,
            xform: _userResponse
          });
        } catch (error2) {
          if (isAuthError(error2)) {
            return { data: { user: null }, error: error2 };
          }
          throw error2;
        }
      }
      /**
       * Delete a user. Requires a `service_role` key.
       *
       * @param id The user id you want to remove.
       * @param shouldSoftDelete If true, then the user will be soft-deleted (setting `deleted_at` to the current timestamp and disabling their account while preserving their data) from the auth schema.
       * Defaults to false for backward compatibility.
       *
       * This function should only be called on a server. Never expose your `service_role` key in the browser.
       */
      async deleteUser(id, shouldSoftDelete = false) {
        try {
          return await _request(this.fetch, "DELETE", `${this.url}/admin/users/${id}`, {
            headers: this.headers,
            body: {
              should_soft_delete: shouldSoftDelete
            },
            xform: _userResponse
          });
        } catch (error2) {
          if (isAuthError(error2)) {
            return { data: { user: null }, error: error2 };
          }
          throw error2;
        }
      }
      async _listFactors(params) {
        try {
          const { data, error: error2 } = await _request(this.fetch, "GET", `${this.url}/admin/users/${params.userId}/factors`, {
            headers: this.headers,
            xform: (factors) => {
              return { data: { factors }, error: null };
            }
          });
          return { data, error: error2 };
        } catch (error2) {
          if (isAuthError(error2)) {
            return { data: null, error: error2 };
          }
          throw error2;
        }
      }
      async _deleteFactor(params) {
        try {
          const data = await _request(this.fetch, "DELETE", `${this.url}/admin/users/${params.userId}/factors/${params.id}`, {
            headers: this.headers
          });
          return { data, error: null };
        } catch (error2) {
          if (isAuthError(error2)) {
            return { data: null, error: error2 };
          }
          throw error2;
        }
      }
    };
  }
});

// node_modules/.pnpm/@supabase+gotrue-js@2.62.2/node_modules/@supabase/gotrue-js/dist/module/lib/version.js
var version5;
var init_version5 = __esm({
  "node_modules/.pnpm/@supabase+gotrue-js@2.62.2/node_modules/@supabase/gotrue-js/dist/module/lib/version.js"() {
    version5 = "0.0.0";
  }
});

// node_modules/.pnpm/@supabase+gotrue-js@2.62.2/node_modules/@supabase/gotrue-js/dist/module/lib/constants.js
var GOTRUE_URL, STORAGE_KEY, DEFAULT_HEADERS5, EXPIRY_MARGIN;
var init_constants5 = __esm({
  "node_modules/.pnpm/@supabase+gotrue-js@2.62.2/node_modules/@supabase/gotrue-js/dist/module/lib/constants.js"() {
    init_version5();
    GOTRUE_URL = "http://localhost:9999";
    STORAGE_KEY = "supabase.auth.token";
    DEFAULT_HEADERS5 = { "X-Client-Info": `gotrue-js/${version5}` };
    EXPIRY_MARGIN = 10;
  }
});

// node_modules/.pnpm/@supabase+gotrue-js@2.62.2/node_modules/@supabase/gotrue-js/dist/module/lib/local-storage.js
function memoryLocalStorageAdapter(store = {}) {
  return {
    getItem: (key2) => {
      return store[key2] || null;
    },
    setItem: (key2, value) => {
      store[key2] = value;
    },
    removeItem: (key2) => {
      delete store[key2];
    }
  };
}
var localStorageAdapter;
var init_local_storage = __esm({
  "node_modules/.pnpm/@supabase+gotrue-js@2.62.2/node_modules/@supabase/gotrue-js/dist/module/lib/local-storage.js"() {
    init_helpers3();
    localStorageAdapter = {
      getItem: (key2) => {
        if (!supportsLocalStorage()) {
          return null;
        }
        return globalThis.localStorage.getItem(key2);
      },
      setItem: (key2, value) => {
        if (!supportsLocalStorage()) {
          return;
        }
        globalThis.localStorage.setItem(key2, value);
      },
      removeItem: (key2) => {
        if (!supportsLocalStorage()) {
          return;
        }
        globalThis.localStorage.removeItem(key2);
      }
    };
  }
});

// node_modules/.pnpm/@supabase+gotrue-js@2.62.2/node_modules/@supabase/gotrue-js/dist/module/lib/polyfills.js
function polyfillGlobalThis() {
  if (typeof globalThis === "object")
    return;
  try {
    Object.defineProperty(Object.prototype, "__magic__", {
      get: function() {
        return this;
      },
      configurable: true
    });
    __magic__.globalThis = __magic__;
    delete Object.prototype.__magic__;
  } catch (e) {
    if (typeof self !== "undefined") {
      self.globalThis = self;
    }
  }
}
var init_polyfills = __esm({
  "node_modules/.pnpm/@supabase+gotrue-js@2.62.2/node_modules/@supabase/gotrue-js/dist/module/lib/polyfills.js"() {
  }
});

// node_modules/.pnpm/@supabase+gotrue-js@2.62.2/node_modules/@supabase/gotrue-js/dist/module/lib/locks.js
async function navigatorLock(name2, acquireTimeout, fn) {
  if (internals.debug) {
    console.log("@supabase/gotrue-js: navigatorLock: acquire lock", name2, acquireTimeout);
  }
  const abortController = new globalThis.AbortController();
  if (acquireTimeout > 0) {
    setTimeout(() => {
      abortController.abort();
      if (internals.debug) {
        console.log("@supabase/gotrue-js: navigatorLock acquire timed out", name2);
      }
    }, acquireTimeout);
  }
  return await globalThis.navigator.locks.request(name2, acquireTimeout === 0 ? {
    mode: "exclusive",
    ifAvailable: true
  } : {
    mode: "exclusive",
    signal: abortController.signal
  }, async (lock) => {
    if (lock) {
      if (internals.debug) {
        console.log("@supabase/gotrue-js: navigatorLock: acquired", name2, lock.name);
      }
      try {
        return await fn();
      } finally {
        if (internals.debug) {
          console.log("@supabase/gotrue-js: navigatorLock: released", name2, lock.name);
        }
      }
    } else {
      if (acquireTimeout === 0) {
        if (internals.debug) {
          console.log("@supabase/gotrue-js: navigatorLock: not immediately available", name2);
        }
        throw new NavigatorLockAcquireTimeoutError(`Acquiring an exclusive Navigator LockManager lock "${name2}" immediately failed`);
      } else {
        if (internals.debug) {
          try {
            const result = await globalThis.navigator.locks.query();
            console.log("@supabase/gotrue-js: Navigator LockManager state", JSON.stringify(result, null, "  "));
          } catch (e) {
            console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state", e);
          }
        }
        console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request");
        return await fn();
      }
    }
  });
}
var internals, LockAcquireTimeoutError, NavigatorLockAcquireTimeoutError;
var init_locks = __esm({
  "node_modules/.pnpm/@supabase+gotrue-js@2.62.2/node_modules/@supabase/gotrue-js/dist/module/lib/locks.js"() {
    init_helpers3();
    internals = {
      /**
       * @experimental
       */
      debug: !!(globalThis && supportsLocalStorage() && globalThis.localStorage && globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug") === "true")
    };
    LockAcquireTimeoutError = class extends Error {
      constructor(message) {
        super(message);
        this.isAcquireTimeout = true;
      }
    };
    NavigatorLockAcquireTimeoutError = class extends LockAcquireTimeoutError {
    };
  }
});

// node_modules/.pnpm/@supabase+gotrue-js@2.62.2/node_modules/@supabase/gotrue-js/dist/module/GoTrueClient.js
async function lockNoOp(name2, acquireTimeout, fn) {
  return await fn();
}
var DEFAULT_OPTIONS, AUTO_REFRESH_TICK_DURATION, AUTO_REFRESH_TICK_THRESHOLD, GoTrueClient;
var init_GoTrueClient = __esm({
  "node_modules/.pnpm/@supabase+gotrue-js@2.62.2/node_modules/@supabase/gotrue-js/dist/module/GoTrueClient.js"() {
    init_GoTrueAdminApi();
    init_constants5();
    init_errors3();
    init_fetch3();
    init_helpers3();
    init_local_storage();
    init_polyfills();
    init_version5();
    init_locks();
    polyfillGlobalThis();
    DEFAULT_OPTIONS = {
      url: GOTRUE_URL,
      storageKey: STORAGE_KEY,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      headers: DEFAULT_HEADERS5,
      flowType: "implicit",
      debug: false
    };
    AUTO_REFRESH_TICK_DURATION = 30 * 1e3;
    AUTO_REFRESH_TICK_THRESHOLD = 3;
    GoTrueClient = class _GoTrueClient {
      /**
       * Create a new client for use in the browser.
       */
      constructor(options2) {
        var _a, _b;
        this.memoryStorage = null;
        this.stateChangeEmitters = /* @__PURE__ */ new Map();
        this.autoRefreshTicker = null;
        this.visibilityChangedCallback = null;
        this.refreshingDeferred = null;
        this.initializePromise = null;
        this.detectSessionInUrl = true;
        this.lockAcquired = false;
        this.pendingInLock = [];
        this.broadcastChannel = null;
        this.logger = console.log;
        this.instanceID = _GoTrueClient.nextInstanceID;
        _GoTrueClient.nextInstanceID += 1;
        if (this.instanceID > 0 && isBrowser()) {
          console.warn("Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.");
        }
        const settings = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options2);
        this.logDebugMessages = !!settings.debug;
        if (typeof settings.debug === "function") {
          this.logger = settings.debug;
        }
        this.persistSession = settings.persistSession;
        this.storageKey = settings.storageKey;
        this.autoRefreshToken = settings.autoRefreshToken;
        this.admin = new GoTrueAdminApi({
          url: settings.url,
          headers: settings.headers,
          fetch: settings.fetch
        });
        this.url = settings.url;
        this.headers = settings.headers;
        this.fetch = resolveFetch4(settings.fetch);
        this.lock = settings.lock || lockNoOp;
        this.detectSessionInUrl = settings.detectSessionInUrl;
        this.flowType = settings.flowType;
        if (settings.lock) {
          this.lock = settings.lock;
        } else if (isBrowser() && ((_a = globalThis === null || globalThis === void 0 ? void 0 : globalThis.navigator) === null || _a === void 0 ? void 0 : _a.locks)) {
          this.lock = navigatorLock;
        } else {
          this.lock = lockNoOp;
        }
        this.mfa = {
          verify: this._verify.bind(this),
          enroll: this._enroll.bind(this),
          unenroll: this._unenroll.bind(this),
          challenge: this._challenge.bind(this),
          listFactors: this._listFactors.bind(this),
          challengeAndVerify: this._challengeAndVerify.bind(this),
          getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this)
        };
        if (this.persistSession) {
          if (settings.storage) {
            this.storage = settings.storage;
          } else {
            if (supportsLocalStorage()) {
              this.storage = localStorageAdapter;
            } else {
              this.memoryStorage = {};
              this.storage = memoryLocalStorageAdapter(this.memoryStorage);
            }
          }
        } else {
          this.memoryStorage = {};
          this.storage = memoryLocalStorageAdapter(this.memoryStorage);
        }
        if (isBrowser() && globalThis.BroadcastChannel && this.persistSession && this.storageKey) {
          try {
            this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey);
          } catch (e) {
            console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available", e);
          }
          (_b = this.broadcastChannel) === null || _b === void 0 ? void 0 : _b.addEventListener("message", async (event) => {
            this._debug("received broadcast notification from other tab or client", event);
            await this._notifyAllSubscribers(event.data.event, event.data.session, false);
          });
        }
        this.initialize();
      }
      _debug(...args) {
        if (this.logDebugMessages) {
          this.logger(`GoTrueClient@${this.instanceID} (${version5}) ${(/* @__PURE__ */ new Date()).toISOString()}`, ...args);
        }
        return this;
      }
      /**
       * Initializes the client session either from the url or from storage.
       * This method is automatically called when instantiating the client, but should also be called
       * manually when checking for an error from an auth redirect (oauth, magiclink, password recovery, etc).
       */
      async initialize() {
        if (this.initializePromise) {
          return await this.initializePromise;
        }
        this.initializePromise = (async () => {
          return await this._acquireLock(-1, async () => {
            return await this._initialize();
          });
        })();
        return await this.initializePromise;
      }
      /**
       * IMPORTANT:
       * 1. Never throw in this method, as it is called from the constructor
       * 2. Never return a session from this method as it would be cached over
       *    the whole lifetime of the client
       */
      async _initialize() {
        try {
          const isPKCEFlow = isBrowser() ? await this._isPKCEFlow() : false;
          this._debug("#_initialize()", "begin", "is PKCE flow", isPKCEFlow);
          if (isPKCEFlow || this.detectSessionInUrl && this._isImplicitGrantFlow()) {
            const { data, error: error2 } = await this._getSessionFromURL(isPKCEFlow);
            if (error2) {
              this._debug("#_initialize()", "error detecting session from URL", error2);
              if ((error2 === null || error2 === void 0 ? void 0 : error2.message) === "Identity is already linked" || (error2 === null || error2 === void 0 ? void 0 : error2.message) === "Identity is already linked to another user") {
                return { error: error2 };
              }
              await this._removeSession();
              return { error: error2 };
            }
            const { session, redirectType } = data;
            this._debug("#_initialize()", "detected session in URL", session, "redirect type", redirectType);
            await this._saveSession(session);
            setTimeout(async () => {
              if (redirectType === "recovery") {
                await this._notifyAllSubscribers("PASSWORD_RECOVERY", session);
              } else {
                await this._notifyAllSubscribers("SIGNED_IN", session);
              }
            }, 0);
            return { error: null };
          }
          await this._recoverAndRefresh();
          return { error: null };
        } catch (error2) {
          if (isAuthError(error2)) {
            return { error: error2 };
          }
          return {
            error: new AuthUnknownError("Unexpected error during initialization", error2)
          };
        } finally {
          await this._handleVisibilityChange();
          this._debug("#_initialize()", "end");
        }
      }
      /**
       * Creates a new user.
       *
       * Be aware that if a user account exists in the system you may get back an
       * error message that attempts to hide this information from the user.
       * This method has support for PKCE via email signups. The PKCE flow cannot be used when autoconfirm is enabled.
       *
       * @returns A logged-in session if the server has "autoconfirm" ON
       * @returns A user if the server has "autoconfirm" OFF
       */
      async signUp(credentials) {
        var _a, _b, _c;
        try {
          await this._removeSession();
          let res;
          if ("email" in credentials) {
            const { email, password, options: options2 } = credentials;
            let codeChallenge = null;
            let codeChallengeMethod = null;
            if (this.flowType === "pkce") {
              const codeVerifier = generatePKCEVerifier();
              await setItemAsync(this.storage, `${this.storageKey}-code-verifier`, codeVerifier);
              codeChallenge = await generatePKCEChallenge(codeVerifier);
              codeChallengeMethod = codeVerifier === codeChallenge ? "plain" : "s256";
            }
            res = await _request(this.fetch, "POST", `${this.url}/signup`, {
              headers: this.headers,
              redirectTo: options2 === null || options2 === void 0 ? void 0 : options2.emailRedirectTo,
              body: {
                email,
                password,
                data: (_a = options2 === null || options2 === void 0 ? void 0 : options2.data) !== null && _a !== void 0 ? _a : {},
                gotrue_meta_security: { captcha_token: options2 === null || options2 === void 0 ? void 0 : options2.captchaToken },
                code_challenge: codeChallenge,
                code_challenge_method: codeChallengeMethod
              },
              xform: _sessionResponse
            });
          } else if ("phone" in credentials) {
            const { phone, password, options: options2 } = credentials;
            res = await _request(this.fetch, "POST", `${this.url}/signup`, {
              headers: this.headers,
              body: {
                phone,
                password,
                data: (_b = options2 === null || options2 === void 0 ? void 0 : options2.data) !== null && _b !== void 0 ? _b : {},
                channel: (_c = options2 === null || options2 === void 0 ? void 0 : options2.channel) !== null && _c !== void 0 ? _c : "sms",
                gotrue_meta_security: { captcha_token: options2 === null || options2 === void 0 ? void 0 : options2.captchaToken }
              },
              xform: _sessionResponse
            });
          } else {
            throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a password");
          }
          const { data, error: error2 } = res;
          if (error2 || !data) {
            return { data: { user: null, session: null }, error: error2 };
          }
          const session = data.session;
          const user = data.user;
          if (data.session) {
            await this._saveSession(data.session);
            await this._notifyAllSubscribers("SIGNED_IN", session);
          }
          return { data: { user, session }, error: null };
        } catch (error2) {
          if (isAuthError(error2)) {
            return { data: { user: null, session: null }, error: error2 };
          }
          throw error2;
        }
      }
      /**
       * Log in an existing user with an email and password or phone and password.
       *
       * Be aware that you may get back an error message that will not distinguish
       * between the cases where the account does not exist or that the
       * email/phone and password combination is wrong or that the account can only
       * be accessed via social login.
       */
      async signInWithPassword(credentials) {
        try {
          await this._removeSession();
          let res;
          if ("email" in credentials) {
            const { email, password, options: options2 } = credentials;
            res = await _request(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
              headers: this.headers,
              body: {
                email,
                password,
                gotrue_meta_security: { captcha_token: options2 === null || options2 === void 0 ? void 0 : options2.captchaToken }
              },
              xform: _sessionResponsePassword
            });
          } else if ("phone" in credentials) {
            const { phone, password, options: options2 } = credentials;
            res = await _request(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
              headers: this.headers,
              body: {
                phone,
                password,
                gotrue_meta_security: { captcha_token: options2 === null || options2 === void 0 ? void 0 : options2.captchaToken }
              },
              xform: _sessionResponsePassword
            });
          } else {
            throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a password");
          }
          const { data, error: error2 } = res;
          if (error2) {
            return { data: { user: null, session: null }, error: error2 };
          } else if (!data || !data.session || !data.user) {
            return { data: { user: null, session: null }, error: new AuthInvalidTokenResponseError() };
          }
          if (data.session) {
            await this._saveSession(data.session);
            await this._notifyAllSubscribers("SIGNED_IN", data.session);
          }
          return {
            data: Object.assign({ user: data.user, session: data.session }, data.weak_password ? { weakPassword: data.weak_password } : null),
            error: error2
          };
        } catch (error2) {
          if (isAuthError(error2)) {
            return { data: { user: null, session: null }, error: error2 };
          }
          throw error2;
        }
      }
      /**
       * Log in an existing user via a third-party provider.
       * This method supports the PKCE flow.
       */
      async signInWithOAuth(credentials) {
        var _a, _b, _c, _d;
        await this._removeSession();
        return await this._handleProviderSignIn(credentials.provider, {
          redirectTo: (_a = credentials.options) === null || _a === void 0 ? void 0 : _a.redirectTo,
          scopes: (_b = credentials.options) === null || _b === void 0 ? void 0 : _b.scopes,
          queryParams: (_c = credentials.options) === null || _c === void 0 ? void 0 : _c.queryParams,
          skipBrowserRedirect: (_d = credentials.options) === null || _d === void 0 ? void 0 : _d.skipBrowserRedirect
        });
      }
      /**
       * Log in an existing user by exchanging an Auth Code issued during the PKCE flow.
       */
      async exchangeCodeForSession(authCode) {
        await this.initializePromise;
        return this._acquireLock(-1, async () => {
          return this._exchangeCodeForSession(authCode);
        });
      }
      async _exchangeCodeForSession(authCode) {
        const storageItem = await getItemAsync(this.storage, `${this.storageKey}-code-verifier`);
        const [codeVerifier, redirectType] = (storageItem !== null && storageItem !== void 0 ? storageItem : "").split("/");
        const { data, error: error2 } = await _request(this.fetch, "POST", `${this.url}/token?grant_type=pkce`, {
          headers: this.headers,
          body: {
            auth_code: authCode,
            code_verifier: codeVerifier
          },
          xform: _sessionResponse
        });
        await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
        if (error2) {
          return { data: { user: null, session: null, redirectType: null }, error: error2 };
        } else if (!data || !data.session || !data.user) {
          return {
            data: { user: null, session: null, redirectType: null },
            error: new AuthInvalidTokenResponseError()
          };
        }
        if (data.session) {
          await this._saveSession(data.session);
          await this._notifyAllSubscribers("SIGNED_IN", data.session);
        }
        return { data: Object.assign(Object.assign({}, data), { redirectType: redirectType !== null && redirectType !== void 0 ? redirectType : null }), error: error2 };
      }
      /**
       * Allows signing in with an OIDC ID token. The authentication provider used
       * should be enabled and configured.
       */
      async signInWithIdToken(credentials) {
        await this._removeSession();
        try {
          const { options: options2, provider, token, access_token, nonce } = credentials;
          const res = await _request(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, {
            headers: this.headers,
            body: {
              provider,
              id_token: token,
              access_token,
              nonce,
              gotrue_meta_security: { captcha_token: options2 === null || options2 === void 0 ? void 0 : options2.captchaToken }
            },
            xform: _sessionResponse
          });
          const { data, error: error2 } = res;
          if (error2) {
            return { data: { user: null, session: null }, error: error2 };
          } else if (!data || !data.session || !data.user) {
            return {
              data: { user: null, session: null },
              error: new AuthInvalidTokenResponseError()
            };
          }
          if (data.session) {
            await this._saveSession(data.session);
            await this._notifyAllSubscribers("SIGNED_IN", data.session);
          }
          return { data, error: error2 };
        } catch (error2) {
          if (isAuthError(error2)) {
            return { data: { user: null, session: null }, error: error2 };
          }
          throw error2;
        }
      }
      /**
       * Log in a user using magiclink or a one-time password (OTP).
       *
       * If the `{{ .ConfirmationURL }}` variable is specified in the email template, a magiclink will be sent.
       * If the `{{ .Token }}` variable is specified in the email template, an OTP will be sent.
       * If you're using phone sign-ins, only an OTP will be sent. You won't be able to send a magiclink for phone sign-ins.
       *
       * Be aware that you may get back an error message that will not distinguish
       * between the cases where the account does not exist or, that the account
       * can only be accessed via social login.
       *
       * Do note that you will need to configure a Whatsapp sender on Twilio
       * if you are using phone sign in with the 'whatsapp' channel. The whatsapp
       * channel is not supported on other providers
       * at this time.
       * This method supports PKCE when an email is passed.
       */
      async signInWithOtp(credentials) {
        var _a, _b, _c, _d, _e;
        try {
          await this._removeSession();
          if ("email" in credentials) {
            const { email, options: options2 } = credentials;
            let codeChallenge = null;
            let codeChallengeMethod = null;
            if (this.flowType === "pkce") {
              const codeVerifier = generatePKCEVerifier();
              await setItemAsync(this.storage, `${this.storageKey}-code-verifier`, codeVerifier);
              codeChallenge = await generatePKCEChallenge(codeVerifier);
              codeChallengeMethod = codeVerifier === codeChallenge ? "plain" : "s256";
            }
            const { error: error2 } = await _request(this.fetch, "POST", `${this.url}/otp`, {
              headers: this.headers,
              body: {
                email,
                data: (_a = options2 === null || options2 === void 0 ? void 0 : options2.data) !== null && _a !== void 0 ? _a : {},
                create_user: (_b = options2 === null || options2 === void 0 ? void 0 : options2.shouldCreateUser) !== null && _b !== void 0 ? _b : true,
                gotrue_meta_security: { captcha_token: options2 === null || options2 === void 0 ? void 0 : options2.captchaToken },
                code_challenge: codeChallenge,
                code_challenge_method: codeChallengeMethod
              },
              redirectTo: options2 === null || options2 === void 0 ? void 0 : options2.emailRedirectTo
            });
            return { data: { user: null, session: null }, error: error2 };
          }
          if ("phone" in credentials) {
            const { phone, options: options2 } = credentials;
            const { data, error: error2 } = await _request(this.fetch, "POST", `${this.url}/otp`, {
              headers: this.headers,
              body: {
                phone,
                data: (_c = options2 === null || options2 === void 0 ? void 0 : options2.data) !== null && _c !== void 0 ? _c : {},
                create_user: (_d = options2 === null || options2 === void 0 ? void 0 : options2.shouldCreateUser) !== null && _d !== void 0 ? _d : true,
                gotrue_meta_security: { captcha_token: options2 === null || options2 === void 0 ? void 0 : options2.captchaToken },
                channel: (_e = options2 === null || options2 === void 0 ? void 0 : options2.channel) !== null && _e !== void 0 ? _e : "sms"
              }
            });
            return { data: { user: null, session: null, messageId: data === null || data === void 0 ? void 0 : data.message_id }, error: error2 };
          }
          throw new AuthInvalidCredentialsError("You must provide either an email or phone number.");
        } catch (error2) {
          if (isAuthError(error2)) {
            return { data: { user: null, session: null }, error: error2 };
          }
          throw error2;
        }
      }
      /**
       * Log in a user given a User supplied OTP or TokenHash received through mobile or email.
       */
      async verifyOtp(params) {
        var _a, _b;
        try {
          if (params.type !== "email_change" && params.type !== "phone_change") {
            await this._removeSession();
          }
          let redirectTo = void 0;
          let captchaToken = void 0;
          if ("options" in params) {
            redirectTo = (_a = params.options) === null || _a === void 0 ? void 0 : _a.redirectTo;
            captchaToken = (_b = params.options) === null || _b === void 0 ? void 0 : _b.captchaToken;
          }
          const { data, error: error2 } = await _request(this.fetch, "POST", `${this.url}/verify`, {
            headers: this.headers,
            body: Object.assign(Object.assign({}, params), { gotrue_meta_security: { captcha_token: captchaToken } }),
            redirectTo,
            xform: _sessionResponse
          });
          if (error2) {
            throw error2;
          }
          if (!data) {
            throw new Error("An error occurred on token verification.");
          }
          const session = data.session;
          const user = data.user;
          if (session === null || session === void 0 ? void 0 : session.access_token) {
            await this._saveSession(session);
            await this._notifyAllSubscribers(params.type == "recovery" ? "PASSWORD_RECOVERY" : "SIGNED_IN", session);
          }
          return { data: { user, session }, error: null };
        } catch (error2) {
          if (isAuthError(error2)) {
            return { data: { user: null, session: null }, error: error2 };
          }
          throw error2;
        }
      }
      /**
       * Attempts a single-sign on using an enterprise Identity Provider. A
       * successful SSO attempt will redirect the current page to the identity
       * provider authorization page. The redirect URL is implementation and SSO
       * protocol specific.
       *
       * You can use it by providing a SSO domain. Typically you can extract this
       * domain by asking users for their email address. If this domain is
       * registered on the Auth instance the redirect will use that organization's
       * currently active SSO Identity Provider for the login.
       *
       * If you have built an organization-specific login page, you can use the
       * organization's SSO Identity Provider UUID directly instead.
       */
      async signInWithSSO(params) {
        var _a, _b, _c;
        try {
          await this._removeSession();
          let codeChallenge = null;
          let codeChallengeMethod = null;
          if (this.flowType === "pkce") {
            const codeVerifier = generatePKCEVerifier();
            await setItemAsync(this.storage, `${this.storageKey}-code-verifier`, codeVerifier);
            codeChallenge = await generatePKCEChallenge(codeVerifier);
            codeChallengeMethod = codeVerifier === codeChallenge ? "plain" : "s256";
          }
          return await _request(this.fetch, "POST", `${this.url}/sso`, {
            body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, "providerId" in params ? { provider_id: params.providerId } : null), "domain" in params ? { domain: params.domain } : null), { redirect_to: (_b = (_a = params.options) === null || _a === void 0 ? void 0 : _a.redirectTo) !== null && _b !== void 0 ? _b : void 0 }), ((_c = params === null || params === void 0 ? void 0 : params.options) === null || _c === void 0 ? void 0 : _c.captchaToken) ? { gotrue_meta_security: { captcha_token: params.options.captchaToken } } : null), { skip_http_redirect: true, code_challenge: codeChallenge, code_challenge_method: codeChallengeMethod }),
            headers: this.headers,
            xform: _ssoResponse
          });
        } catch (error2) {
          if (isAuthError(error2)) {
            return { data: null, error: error2 };
          }
          throw error2;
        }
      }
      /**
       * Sends a reauthentication OTP to the user's email or phone number.
       * Requires the user to be signed-in.
       */
      async reauthenticate() {
        await this.initializePromise;
        return await this._acquireLock(-1, async () => {
          return await this._reauthenticate();
        });
      }
      async _reauthenticate() {
        try {
          return await this._useSession(async (result) => {
            const { data: { session }, error: sessionError } = result;
            if (sessionError)
              throw sessionError;
            if (!session)
              throw new AuthSessionMissingError();
            const { error: error2 } = await _request(this.fetch, "GET", `${this.url}/reauthenticate`, {
              headers: this.headers,
              jwt: session.access_token
            });
            return { data: { user: null, session: null }, error: error2 };
          });
        } catch (error2) {
          if (isAuthError(error2)) {
            return { data: { user: null, session: null }, error: error2 };
          }
          throw error2;
        }
      }
      /**
       * Resends an existing signup confirmation email, email change email, SMS OTP or phone change OTP.
       */
      async resend(credentials) {
        try {
          if (credentials.type != "email_change" && credentials.type != "phone_change") {
            await this._removeSession();
          }
          const endpoint = `${this.url}/resend`;
          if ("email" in credentials) {
            const { email, type, options: options2 } = credentials;
            const { error: error2 } = await _request(this.fetch, "POST", endpoint, {
              headers: this.headers,
              body: {
                email,
                type,
                gotrue_meta_security: { captcha_token: options2 === null || options2 === void 0 ? void 0 : options2.captchaToken }
              },
              redirectTo: options2 === null || options2 === void 0 ? void 0 : options2.emailRedirectTo
            });
            return { data: { user: null, session: null }, error: error2 };
          } else if ("phone" in credentials) {
            const { phone, type, options: options2 } = credentials;
            const { data, error: error2 } = await _request(this.fetch, "POST", endpoint, {
              headers: this.headers,
              body: {
                phone,
                type,
                gotrue_meta_security: { captcha_token: options2 === null || options2 === void 0 ? void 0 : options2.captchaToken }
              }
            });
            return { data: { user: null, session: null, messageId: data === null || data === void 0 ? void 0 : data.message_id }, error: error2 };
          }
          throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a type");
        } catch (error2) {
          if (isAuthError(error2)) {
            return { data: { user: null, session: null }, error: error2 };
          }
          throw error2;
        }
      }
      /**
       * Returns the session, refreshing it if necessary.
       * The session returned can be null if the session is not detected which can happen in the event a user is not signed-in or has logged out.
       */
      async getSession() {
        await this.initializePromise;
        return this._acquireLock(-1, async () => {
          return this._useSession(async (result) => {
            return result;
          });
        });
      }
      /**
       * Acquires a global lock based on the storage key.
       */
      async _acquireLock(acquireTimeout, fn) {
        this._debug("#_acquireLock", "begin", acquireTimeout);
        try {
          if (this.lockAcquired) {
            const last = this.pendingInLock.length ? this.pendingInLock[this.pendingInLock.length - 1] : Promise.resolve();
            const result = (async () => {
              await last;
              return await fn();
            })();
            this.pendingInLock.push((async () => {
              try {
                await result;
              } catch (e) {
              }
            })());
            return result;
          }
          return await this.lock(`lock:${this.storageKey}`, acquireTimeout, async () => {
            this._debug("#_acquireLock", "lock acquired for storage key", this.storageKey);
            try {
              this.lockAcquired = true;
              const result = fn();
              this.pendingInLock.push((async () => {
                try {
                  await result;
                } catch (e) {
                }
              })());
              await result;
              while (this.pendingInLock.length) {
                const waitOn = [...this.pendingInLock];
                await Promise.all(waitOn);
                this.pendingInLock.splice(0, waitOn.length);
              }
              return await result;
            } finally {
              this._debug("#_acquireLock", "lock released for storage key", this.storageKey);
              this.lockAcquired = false;
            }
          });
        } finally {
          this._debug("#_acquireLock", "end");
        }
      }
      /**
       * Use instead of {@link #getSession} inside the library. It is
       * semantically usually what you want, as getting a session involves some
       * processing afterwards that requires only one client operating on the
       * session at once across multiple tabs or processes.
       */
      async _useSession(fn) {
        this._debug("#_useSession", "begin");
        try {
          const result = await this.__loadSession();
          return await fn(result);
        } finally {
          this._debug("#_useSession", "end");
        }
      }
      /**
       * NEVER USE DIRECTLY!
       *
       * Always use {@link #_useSession}.
       */
      async __loadSession() {
        this._debug("#__loadSession()", "begin");
        if (!this.lockAcquired) {
          this._debug("#__loadSession()", "used outside of an acquired lock!", new Error().stack);
        }
        try {
          let currentSession = null;
          const maybeSession = await getItemAsync(this.storage, this.storageKey);
          this._debug("#getSession()", "session from storage", maybeSession);
          if (maybeSession !== null) {
            if (this._isValidSession(maybeSession)) {
              currentSession = maybeSession;
            } else {
              this._debug("#getSession()", "session from storage is not valid");
              await this._removeSession();
            }
          }
          if (!currentSession) {
            return { data: { session: null }, error: null };
          }
          const hasExpired = currentSession.expires_at ? currentSession.expires_at <= Date.now() / 1e3 : false;
          this._debug("#__loadSession()", `session has${hasExpired ? "" : " not"} expired`, "expires_at", currentSession.expires_at);
          if (!hasExpired) {
            return { data: { session: currentSession }, error: null };
          }
          const { session, error: error2 } = await this._callRefreshToken(currentSession.refresh_token);
          if (error2) {
            return { data: { session: null }, error: error2 };
          }
          return { data: { session }, error: null };
        } finally {
          this._debug("#__loadSession()", "end");
        }
      }
      /**
       * Gets the current user details if there is an existing session.
       * @param jwt Takes in an optional access token jwt. If no jwt is provided, getUser() will attempt to get the jwt from the current session.
       */
      async getUser(jwt) {
        if (jwt) {
          return await this._getUser(jwt);
        }
        await this.initializePromise;
        return this._acquireLock(-1, async () => {
          return await this._getUser();
        });
      }
      async _getUser(jwt) {
        try {
          if (jwt) {
            return await _request(this.fetch, "GET", `${this.url}/user`, {
              headers: this.headers,
              jwt,
              xform: _userResponse
            });
          }
          return await this._useSession(async (result) => {
            var _a, _b;
            const { data, error: error2 } = result;
            if (error2) {
              throw error2;
            }
            return await _request(this.fetch, "GET", `${this.url}/user`, {
              headers: this.headers,
              jwt: (_b = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : void 0,
              xform: _userResponse
            });
          });
        } catch (error2) {
          if (isAuthError(error2)) {
            return { data: { user: null }, error: error2 };
          }
          throw error2;
        }
      }
      /**
       * Updates user data for a logged in user.
       */
      async updateUser(attributes, options2 = {}) {
        await this.initializePromise;
        return await this._acquireLock(-1, async () => {
          return await this._updateUser(attributes, options2);
        });
      }
      async _updateUser(attributes, options2 = {}) {
        try {
          return await this._useSession(async (result) => {
            const { data: sessionData, error: sessionError } = result;
            if (sessionError) {
              throw sessionError;
            }
            if (!sessionData.session) {
              throw new AuthSessionMissingError();
            }
            const session = sessionData.session;
            let codeChallenge = null;
            let codeChallengeMethod = null;
            if (this.flowType === "pkce" && attributes.email != null) {
              const codeVerifier = generatePKCEVerifier();
              await setItemAsync(this.storage, `${this.storageKey}-code-verifier`, codeVerifier);
              codeChallenge = await generatePKCEChallenge(codeVerifier);
              codeChallengeMethod = codeVerifier === codeChallenge ? "plain" : "s256";
            }
            const { data, error: userError } = await _request(this.fetch, "PUT", `${this.url}/user`, {
              headers: this.headers,
              redirectTo: options2 === null || options2 === void 0 ? void 0 : options2.emailRedirectTo,
              body: Object.assign(Object.assign({}, attributes), { code_challenge: codeChallenge, code_challenge_method: codeChallengeMethod }),
              jwt: session.access_token,
              xform: _userResponse
            });
            if (userError)
              throw userError;
            session.user = data.user;
            await this._saveSession(session);
            await this._notifyAllSubscribers("USER_UPDATED", session);
            return { data: { user: session.user }, error: null };
          });
        } catch (error2) {
          if (isAuthError(error2)) {
            return { data: { user: null }, error: error2 };
          }
          throw error2;
        }
      }
      /**
       * Decodes a JWT (without performing any validation).
       */
      _decodeJWT(jwt) {
        return decodeJWTPayload(jwt);
      }
      /**
       * Sets the session data from the current session. If the current session is expired, setSession will take care of refreshing it to obtain a new session.
       * If the refresh token or access token in the current session is invalid, an error will be thrown.
       * @param currentSession The current session that minimally contains an access token and refresh token.
       */
      async setSession(currentSession) {
        await this.initializePromise;
        return await this._acquireLock(-1, async () => {
          return await this._setSession(currentSession);
        });
      }
      async _setSession(currentSession) {
        try {
          if (!currentSession.access_token || !currentSession.refresh_token) {
            throw new AuthSessionMissingError();
          }
          const timeNow = Date.now() / 1e3;
          let expiresAt2 = timeNow;
          let hasExpired = true;
          let session = null;
          const payload = decodeJWTPayload(currentSession.access_token);
          if (payload.exp) {
            expiresAt2 = payload.exp;
            hasExpired = expiresAt2 <= timeNow;
          }
          if (hasExpired) {
            const { session: refreshedSession, error: error2 } = await this._callRefreshToken(currentSession.refresh_token);
            if (error2) {
              return { data: { user: null, session: null }, error: error2 };
            }
            if (!refreshedSession) {
              return { data: { user: null, session: null }, error: null };
            }
            session = refreshedSession;
          } else {
            const { data, error: error2 } = await this._getUser(currentSession.access_token);
            if (error2) {
              throw error2;
            }
            session = {
              access_token: currentSession.access_token,
              refresh_token: currentSession.refresh_token,
              user: data.user,
              token_type: "bearer",
              expires_in: expiresAt2 - timeNow,
              expires_at: expiresAt2
            };
            await this._saveSession(session);
            await this._notifyAllSubscribers("SIGNED_IN", session);
          }
          return { data: { user: session.user, session }, error: null };
        } catch (error2) {
          if (isAuthError(error2)) {
            return { data: { session: null, user: null }, error: error2 };
          }
          throw error2;
        }
      }
      /**
       * Returns a new session, regardless of expiry status.
       * Takes in an optional current session. If not passed in, then refreshSession() will attempt to retrieve it from getSession().
       * If the current session's refresh token is invalid, an error will be thrown.
       * @param currentSession The current session. If passed in, it must contain a refresh token.
       */
      async refreshSession(currentSession) {
        await this.initializePromise;
        return await this._acquireLock(-1, async () => {
          return await this._refreshSession(currentSession);
        });
      }
      async _refreshSession(currentSession) {
        try {
          return await this._useSession(async (result) => {
            var _a;
            if (!currentSession) {
              const { data, error: error3 } = result;
              if (error3) {
                throw error3;
              }
              currentSession = (_a = data.session) !== null && _a !== void 0 ? _a : void 0;
            }
            if (!(currentSession === null || currentSession === void 0 ? void 0 : currentSession.refresh_token)) {
              throw new AuthSessionMissingError();
            }
            const { session, error: error2 } = await this._callRefreshToken(currentSession.refresh_token);
            if (error2) {
              return { data: { user: null, session: null }, error: error2 };
            }
            if (!session) {
              return { data: { user: null, session: null }, error: null };
            }
            return { data: { user: session.user, session }, error: null };
          });
        } catch (error2) {
          if (isAuthError(error2)) {
            return { data: { user: null, session: null }, error: error2 };
          }
          throw error2;
        }
      }
      /**
       * Gets the session data from a URL string
       */
      async _getSessionFromURL(isPKCEFlow) {
        try {
          if (!isBrowser())
            throw new AuthImplicitGrantRedirectError("No browser detected.");
          if (this.flowType === "implicit" && !this._isImplicitGrantFlow()) {
            throw new AuthImplicitGrantRedirectError("Not a valid implicit grant flow url.");
          } else if (this.flowType == "pkce" && !isPKCEFlow) {
            throw new AuthPKCEGrantCodeExchangeError("Not a valid PKCE flow url.");
          }
          const params = parseParametersFromURL(window.location.href);
          if (isPKCEFlow) {
            if (!params.code)
              throw new AuthPKCEGrantCodeExchangeError("No code detected.");
            const { data: data2, error: error3 } = await this._exchangeCodeForSession(params.code);
            if (error3)
              throw error3;
            const url = new URL(window.location.href);
            url.searchParams.delete("code");
            window.history.replaceState(window.history.state, "", url.toString());
            return { data: { session: data2.session, redirectType: null }, error: null };
          }
          if (params.error || params.error_description || params.error_code) {
            throw new AuthImplicitGrantRedirectError(params.error_description || "Error in URL with unspecified error_description", {
              error: params.error || "unspecified_error",
              code: params.error_code || "unspecified_code"
            });
          }
          const { provider_token, provider_refresh_token, access_token, refresh_token, expires_in, expires_at, token_type } = params;
          if (!access_token || !expires_in || !refresh_token || !token_type) {
            throw new AuthImplicitGrantRedirectError("No session defined in URL");
          }
          const timeNow = Math.round(Date.now() / 1e3);
          const expiresIn = parseInt(expires_in);
          let expiresAt2 = timeNow + expiresIn;
          if (expires_at) {
            expiresAt2 = parseInt(expires_at);
          }
          const actuallyExpiresIn = expiresAt2 - timeNow;
          if (actuallyExpiresIn * 1e3 <= AUTO_REFRESH_TICK_DURATION) {
            console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${actuallyExpiresIn}s, should have been closer to ${expiresIn}s`);
          }
          const issuedAt = expiresAt2 - expiresIn;
          if (timeNow - issuedAt >= 120) {
            console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale", issuedAt, expiresAt2, timeNow);
          } else if (timeNow - issuedAt < 0) {
            console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clok for skew", issuedAt, expiresAt2, timeNow);
          }
          const { data, error: error2 } = await this._getUser(access_token);
          if (error2)
            throw error2;
          const session = {
            provider_token,
            provider_refresh_token,
            access_token,
            expires_in: expiresIn,
            expires_at: expiresAt2,
            refresh_token,
            token_type,
            user: data.user
          };
          window.location.hash = "";
          this._debug("#_getSessionFromURL()", "clearing window.location.hash");
          return { data: { session, redirectType: params.type }, error: null };
        } catch (error2) {
          if (isAuthError(error2)) {
            return { data: { session: null, redirectType: null }, error: error2 };
          }
          throw error2;
        }
      }
      /**
       * Checks if the current URL contains parameters given by an implicit oauth grant flow (https://www.rfc-editor.org/rfc/rfc6749.html#section-4.2)
       */
      _isImplicitGrantFlow() {
        const params = parseParametersFromURL(window.location.href);
        return !!(isBrowser() && (params.access_token || params.error_description));
      }
      /**
       * Checks if the current URL and backing storage contain parameters given by a PKCE flow
       */
      async _isPKCEFlow() {
        const params = parseParametersFromURL(window.location.href);
        const currentStorageContent = await getItemAsync(this.storage, `${this.storageKey}-code-verifier`);
        return !!(params.code && currentStorageContent);
      }
      /**
       * Inside a browser context, `signOut()` will remove the logged in user from the browser session and log them out - removing all items from localstorage and then trigger a `"SIGNED_OUT"` event.
       *
       * For server-side management, you can revoke all refresh tokens for a user by passing a user's JWT through to `auth.api.signOut(JWT: string)`.
       * There is no way to revoke a user's access token jwt until it expires. It is recommended to set a shorter expiry on the jwt for this reason.
       *
       * If using `others` scope, no `SIGNED_OUT` event is fired!
       */
      async signOut(options2 = { scope: "global" }) {
        await this.initializePromise;
        return await this._acquireLock(-1, async () => {
          return await this._signOut(options2);
        });
      }
      async _signOut({ scope } = { scope: "global" }) {
        return await this._useSession(async (result) => {
          var _a;
          const { data, error: sessionError } = result;
          if (sessionError) {
            return { error: sessionError };
          }
          const accessToken = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token;
          if (accessToken) {
            const { error: error2 } = await this.admin.signOut(accessToken, scope);
            if (error2) {
              if (!(isAuthApiError(error2) && (error2.status === 404 || error2.status === 401))) {
                return { error: error2 };
              }
            }
          }
          if (scope !== "others") {
            await this._removeSession();
            await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
            await this._notifyAllSubscribers("SIGNED_OUT", null);
          }
          return { error: null };
        });
      }
      /**
       * Receive a notification every time an auth event happens.
       * @param callback A callback function to be invoked when an auth event happens.
       */
      onAuthStateChange(callback) {
        const id = uuid();
        const subscription = {
          id,
          callback,
          unsubscribe: () => {
            this._debug("#unsubscribe()", "state change callback with id removed", id);
            this.stateChangeEmitters.delete(id);
          }
        };
        this._debug("#onAuthStateChange()", "registered callback with id", id);
        this.stateChangeEmitters.set(id, subscription);
        (async () => {
          await this.initializePromise;
          await this._acquireLock(-1, async () => {
            this._emitInitialSession(id);
          });
        })();
        return { data: { subscription } };
      }
      async _emitInitialSession(id) {
        return await this._useSession(async (result) => {
          var _a, _b;
          try {
            const { data: { session }, error: error2 } = result;
            if (error2)
              throw error2;
            await ((_a = this.stateChangeEmitters.get(id)) === null || _a === void 0 ? void 0 : _a.callback("INITIAL_SESSION", session));
            this._debug("INITIAL_SESSION", "callback id", id, "session", session);
          } catch (err) {
            await ((_b = this.stateChangeEmitters.get(id)) === null || _b === void 0 ? void 0 : _b.callback("INITIAL_SESSION", null));
            this._debug("INITIAL_SESSION", "callback id", id, "error", err);
            console.error(err);
          }
        });
      }
      /**
       * Sends a password reset request to an email address. This method supports the PKCE flow.
       *
       * @param email The email address of the user.
       * @param options.redirectTo The URL to send the user to after they click the password reset link.
       * @param options.captchaToken Verification token received when the user completes the captcha on the site.
       */
      async resetPasswordForEmail(email, options2 = {}) {
        let codeChallenge = null;
        let codeChallengeMethod = null;
        if (this.flowType === "pkce") {
          const codeVerifier = generatePKCEVerifier();
          await setItemAsync(this.storage, `${this.storageKey}-code-verifier`, `${codeVerifier}/PASSWORD_RECOVERY`);
          codeChallenge = await generatePKCEChallenge(codeVerifier);
          codeChallengeMethod = codeVerifier === codeChallenge ? "plain" : "s256";
        }
        try {
          return await _request(this.fetch, "POST", `${this.url}/recover`, {
            body: {
              email,
              code_challenge: codeChallenge,
              code_challenge_method: codeChallengeMethod,
              gotrue_meta_security: { captcha_token: options2.captchaToken }
            },
            headers: this.headers,
            redirectTo: options2.redirectTo
          });
        } catch (error2) {
          if (isAuthError(error2)) {
            return { data: null, error: error2 };
          }
          throw error2;
        }
      }
      /**
       * Gets all the identities linked to a user.
       */
      async getUserIdentities() {
        var _a;
        try {
          const { data, error: error2 } = await this.getUser();
          if (error2)
            throw error2;
          return { data: { identities: (_a = data.user.identities) !== null && _a !== void 0 ? _a : [] }, error: null };
        } catch (error2) {
          if (isAuthError(error2)) {
            return { data: null, error: error2 };
          }
          throw error2;
        }
      }
      /**
       * Links an oauth identity to an existing user.
       * This method supports the PKCE flow.
       */
      async linkIdentity(credentials) {
        var _a;
        try {
          const { data, error: error2 } = await this._useSession(async (result) => {
            var _a2, _b, _c, _d, _e;
            const { data: data2, error: error3 } = result;
            if (error3)
              throw error3;
            const url = await this._getUrlForProvider(`${this.url}/user/identities/authorize`, credentials.provider, {
              redirectTo: (_a2 = credentials.options) === null || _a2 === void 0 ? void 0 : _a2.redirectTo,
              scopes: (_b = credentials.options) === null || _b === void 0 ? void 0 : _b.scopes,
              queryParams: (_c = credentials.options) === null || _c === void 0 ? void 0 : _c.queryParams,
              skipBrowserRedirect: true
            });
            return await _request(this.fetch, "GET", url, {
              headers: this.headers,
              jwt: (_e = (_d = data2.session) === null || _d === void 0 ? void 0 : _d.access_token) !== null && _e !== void 0 ? _e : void 0
            });
          });
          if (error2)
            throw error2;
          if (isBrowser() && !((_a = credentials.options) === null || _a === void 0 ? void 0 : _a.skipBrowserRedirect)) {
            window.location.assign(data === null || data === void 0 ? void 0 : data.url);
          }
          return { data: { provider: credentials.provider, url: data === null || data === void 0 ? void 0 : data.url }, error: null };
        } catch (error2) {
          if (isAuthError(error2)) {
            return { data: { provider: credentials.provider, url: null }, error: error2 };
          }
          throw error2;
        }
      }
      /**
       * Unlinks an identity from a user by deleting it. The user will no longer be able to sign in with that identity once it's unlinked.
       */
      async unlinkIdentity(identity2) {
        try {
          return await this._useSession(async (result) => {
            var _a, _b;
            const { data, error: error2 } = result;
            if (error2) {
              throw error2;
            }
            return await _request(this.fetch, "DELETE", `${this.url}/user/identities/${identity2.identity_id}`, {
              headers: this.headers,
              jwt: (_b = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : void 0
            });
          });
        } catch (error2) {
          if (isAuthError(error2)) {
            return { data: null, error: error2 };
          }
          throw error2;
        }
      }
      /**
       * Generates a new JWT.
       * @param refreshToken A valid refresh token that was returned on login.
       */
      async _refreshAccessToken(refreshToken) {
        const debugName = `#_refreshAccessToken(${refreshToken.substring(0, 5)}...)`;
        this._debug(debugName, "begin");
        try {
          const startedAt = Date.now();
          return await retryable(async (attempt) => {
            await sleep(attempt * 200);
            this._debug(debugName, "refreshing attempt", attempt);
            return await _request(this.fetch, "POST", `${this.url}/token?grant_type=refresh_token`, {
              body: { refresh_token: refreshToken },
              headers: this.headers,
              xform: _sessionResponse
            });
          }, (attempt, _, result) => result && result.error && isAuthRetryableFetchError(result.error) && // retryable only if the request can be sent before the backoff overflows the tick duration
          Date.now() + (attempt + 1) * 200 - startedAt < AUTO_REFRESH_TICK_DURATION);
        } catch (error2) {
          this._debug(debugName, "error", error2);
          if (isAuthError(error2)) {
            return { data: { session: null, user: null }, error: error2 };
          }
          throw error2;
        } finally {
          this._debug(debugName, "end");
        }
      }
      _isValidSession(maybeSession) {
        const isValidSession = typeof maybeSession === "object" && maybeSession !== null && "access_token" in maybeSession && "refresh_token" in maybeSession && "expires_at" in maybeSession;
        return isValidSession;
      }
      async _handleProviderSignIn(provider, options2) {
        const url = await this._getUrlForProvider(`${this.url}/authorize`, provider, {
          redirectTo: options2.redirectTo,
          scopes: options2.scopes,
          queryParams: options2.queryParams
        });
        this._debug("#_handleProviderSignIn()", "provider", provider, "options", options2, "url", url);
        if (isBrowser() && !options2.skipBrowserRedirect) {
          window.location.assign(url);
        }
        return { data: { provider, url }, error: null };
      }
      /**
       * Recovers the session from LocalStorage and refreshes
       * Note: this method is async to accommodate for AsyncStorage e.g. in React native.
       */
      async _recoverAndRefresh() {
        var _a;
        const debugName = "#_recoverAndRefresh()";
        this._debug(debugName, "begin");
        try {
          const currentSession = await getItemAsync(this.storage, this.storageKey);
          this._debug(debugName, "session from storage", currentSession);
          if (!this._isValidSession(currentSession)) {
            this._debug(debugName, "session is not valid");
            if (currentSession !== null) {
              await this._removeSession();
            }
            return;
          }
          const timeNow = Math.round(Date.now() / 1e3);
          const expiresWithMargin = ((_a = currentSession.expires_at) !== null && _a !== void 0 ? _a : Infinity) < timeNow + EXPIRY_MARGIN;
          this._debug(debugName, `session has${expiresWithMargin ? "" : " not"} expired with margin of ${EXPIRY_MARGIN}s`);
          if (expiresWithMargin) {
            if (this.autoRefreshToken && currentSession.refresh_token) {
              const { error: error2 } = await this._callRefreshToken(currentSession.refresh_token);
              if (error2) {
                console.error(error2);
                if (!isAuthRetryableFetchError(error2)) {
                  this._debug(debugName, "refresh failed with a non-retryable error, removing the session", error2);
                  await this._removeSession();
                }
              }
            }
          } else {
            await this._notifyAllSubscribers("SIGNED_IN", currentSession);
          }
        } catch (err) {
          this._debug(debugName, "error", err);
          console.error(err);
          return;
        } finally {
          this._debug(debugName, "end");
        }
      }
      async _callRefreshToken(refreshToken) {
        var _a, _b;
        if (!refreshToken) {
          throw new AuthSessionMissingError();
        }
        if (this.refreshingDeferred) {
          return this.refreshingDeferred.promise;
        }
        const debugName = `#_callRefreshToken(${refreshToken.substring(0, 5)}...)`;
        this._debug(debugName, "begin");
        try {
          this.refreshingDeferred = new Deferred();
          const { data, error: error2 } = await this._refreshAccessToken(refreshToken);
          if (error2)
            throw error2;
          if (!data.session)
            throw new AuthSessionMissingError();
          await this._saveSession(data.session);
          await this._notifyAllSubscribers("TOKEN_REFRESHED", data.session);
          const result = { session: data.session, error: null };
          this.refreshingDeferred.resolve(result);
          return result;
        } catch (error2) {
          this._debug(debugName, "error", error2);
          if (isAuthError(error2)) {
            const result = { session: null, error: error2 };
            if (!isAuthRetryableFetchError(error2)) {
              await this._removeSession();
              await this._notifyAllSubscribers("SIGNED_OUT", null);
            }
            (_a = this.refreshingDeferred) === null || _a === void 0 ? void 0 : _a.resolve(result);
            return result;
          }
          (_b = this.refreshingDeferred) === null || _b === void 0 ? void 0 : _b.reject(error2);
          throw error2;
        } finally {
          this.refreshingDeferred = null;
          this._debug(debugName, "end");
        }
      }
      async _notifyAllSubscribers(event, session, broadcast = true) {
        const debugName = `#_notifyAllSubscribers(${event})`;
        this._debug(debugName, "begin", session, `broadcast = ${broadcast}`);
        try {
          if (this.broadcastChannel && broadcast) {
            this.broadcastChannel.postMessage({ event, session });
          }
          const errors = [];
          const promises = Array.from(this.stateChangeEmitters.values()).map(async (x) => {
            try {
              await x.callback(event, session);
            } catch (e) {
              errors.push(e);
            }
          });
          await Promise.all(promises);
          if (errors.length > 0) {
            for (let i = 0; i < errors.length; i += 1) {
              console.error(errors[i]);
            }
            throw errors[0];
          }
        } finally {
          this._debug(debugName, "end");
        }
      }
      /**
       * set currentSession and currentUser
       * process to _startAutoRefreshToken if possible
       */
      async _saveSession(session) {
        this._debug("#_saveSession()", session);
        await setItemAsync(this.storage, this.storageKey, session);
      }
      async _removeSession() {
        this._debug("#_removeSession()");
        await removeItemAsync(this.storage, this.storageKey);
      }
      /**
       * Removes any registered visibilitychange callback.
       *
       * {@see #startAutoRefresh}
       * {@see #stopAutoRefresh}
       */
      _removeVisibilityChangedCallback() {
        this._debug("#_removeVisibilityChangedCallback()");
        const callback = this.visibilityChangedCallback;
        this.visibilityChangedCallback = null;
        try {
          if (callback && isBrowser() && (window === null || window === void 0 ? void 0 : window.removeEventListener)) {
            window.removeEventListener("visibilitychange", callback);
          }
        } catch (e) {
          console.error("removing visibilitychange callback failed", e);
        }
      }
      /**
       * This is the private implementation of {@link #startAutoRefresh}. Use this
       * within the library.
       */
      async _startAutoRefresh() {
        await this._stopAutoRefresh();
        this._debug("#_startAutoRefresh()");
        const ticker = setInterval(() => this._autoRefreshTokenTick(), AUTO_REFRESH_TICK_DURATION);
        this.autoRefreshTicker = ticker;
        if (ticker && typeof ticker === "object" && typeof ticker.unref === "function") {
          ticker.unref();
        } else if (typeof Deno !== "undefined" && typeof Deno.unrefTimer === "function") {
          Deno.unrefTimer(ticker);
        }
        setTimeout(async () => {
          await this.initializePromise;
          await this._autoRefreshTokenTick();
        }, 0);
      }
      /**
       * This is the private implementation of {@link #stopAutoRefresh}. Use this
       * within the library.
       */
      async _stopAutoRefresh() {
        this._debug("#_stopAutoRefresh()");
        const ticker = this.autoRefreshTicker;
        this.autoRefreshTicker = null;
        if (ticker) {
          clearInterval(ticker);
        }
      }
      /**
       * Starts an auto-refresh process in the background. The session is checked
       * every few seconds. Close to the time of expiration a process is started to
       * refresh the session. If refreshing fails it will be retried for as long as
       * necessary.
       *
       * If you set the {@link GoTrueClientOptions#autoRefreshToken} you don't need
       * to call this function, it will be called for you.
       *
       * On browsers the refresh process works only when the tab/window is in the
       * foreground to conserve resources as well as prevent race conditions and
       * flooding auth with requests. If you call this method any managed
       * visibility change callback will be removed and you must manage visibility
       * changes on your own.
       *
       * On non-browser platforms the refresh process works *continuously* in the
       * background, which may not be desirable. You should hook into your
       * platform's foreground indication mechanism and call these methods
       * appropriately to conserve resources.
       *
       * {@see #stopAutoRefresh}
       */
      async startAutoRefresh() {
        this._removeVisibilityChangedCallback();
        await this._startAutoRefresh();
      }
      /**
       * Stops an active auto refresh process running in the background (if any).
       *
       * If you call this method any managed visibility change callback will be
       * removed and you must manage visibility changes on your own.
       *
       * See {@link #startAutoRefresh} for more details.
       */
      async stopAutoRefresh() {
        this._removeVisibilityChangedCallback();
        await this._stopAutoRefresh();
      }
      /**
       * Runs the auto refresh token tick.
       */
      async _autoRefreshTokenTick() {
        this._debug("#_autoRefreshTokenTick()", "begin");
        try {
          await this._acquireLock(0, async () => {
            try {
              const now = Date.now();
              try {
                return await this._useSession(async (result) => {
                  const { data: { session } } = result;
                  if (!session || !session.refresh_token || !session.expires_at) {
                    this._debug("#_autoRefreshTokenTick()", "no session");
                    return;
                  }
                  const expiresInTicks = Math.floor((session.expires_at * 1e3 - now) / AUTO_REFRESH_TICK_DURATION);
                  this._debug("#_autoRefreshTokenTick()", `access token expires in ${expiresInTicks} ticks, a tick lasts ${AUTO_REFRESH_TICK_DURATION}ms, refresh threshold is ${AUTO_REFRESH_TICK_THRESHOLD} ticks`);
                  if (expiresInTicks <= AUTO_REFRESH_TICK_THRESHOLD) {
                    await this._callRefreshToken(session.refresh_token);
                  }
                });
              } catch (e) {
                console.error("Auto refresh tick failed with error. This is likely a transient error.", e);
              }
            } finally {
              this._debug("#_autoRefreshTokenTick()", "end");
            }
          });
        } catch (e) {
          if (e.isAcquireTimeout || e instanceof LockAcquireTimeoutError) {
            this._debug("auto refresh token tick lock not available");
          } else {
            throw e;
          }
        }
      }
      /**
       * Registers callbacks on the browser / platform, which in-turn run
       * algorithms when the browser window/tab are in foreground. On non-browser
       * platforms it assumes always foreground.
       */
      async _handleVisibilityChange() {
        this._debug("#_handleVisibilityChange()");
        if (!isBrowser() || !(window === null || window === void 0 ? void 0 : window.addEventListener)) {
          if (this.autoRefreshToken) {
            this.startAutoRefresh();
          }
          return false;
        }
        try {
          this.visibilityChangedCallback = async () => await this._onVisibilityChanged(false);
          window === null || window === void 0 ? void 0 : window.addEventListener("visibilitychange", this.visibilityChangedCallback);
          await this._onVisibilityChanged(true);
        } catch (error2) {
          console.error("_handleVisibilityChange", error2);
        }
      }
      /**
       * Callback registered with `window.addEventListener('visibilitychange')`.
       */
      async _onVisibilityChanged(calledFromInitialize) {
        const methodName = `#_onVisibilityChanged(${calledFromInitialize})`;
        this._debug(methodName, "visibilityState", document.visibilityState);
        if (document.visibilityState === "visible") {
          if (this.autoRefreshToken) {
            this._startAutoRefresh();
          }
          if (!calledFromInitialize) {
            await this.initializePromise;
            await this._acquireLock(-1, async () => {
              if (document.visibilityState !== "visible") {
                this._debug(methodName, "acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");
                return;
              }
              await this._recoverAndRefresh();
            });
          }
        } else if (document.visibilityState === "hidden") {
          if (this.autoRefreshToken) {
            this._stopAutoRefresh();
          }
        }
      }
      /**
       * Generates the relevant login URL for a third-party provider.
       * @param options.redirectTo A URL or mobile address to send the user to after they are confirmed.
       * @param options.scopes A space-separated list of scopes granted to the OAuth application.
       * @param options.queryParams An object of key-value pairs containing query parameters granted to the OAuth application.
       */
      async _getUrlForProvider(url, provider, options2) {
        const urlParams = [`provider=${encodeURIComponent(provider)}`];
        if (options2 === null || options2 === void 0 ? void 0 : options2.redirectTo) {
          urlParams.push(`redirect_to=${encodeURIComponent(options2.redirectTo)}`);
        }
        if (options2 === null || options2 === void 0 ? void 0 : options2.scopes) {
          urlParams.push(`scopes=${encodeURIComponent(options2.scopes)}`);
        }
        if (this.flowType === "pkce") {
          const codeVerifier = generatePKCEVerifier();
          await setItemAsync(this.storage, `${this.storageKey}-code-verifier`, codeVerifier);
          const codeChallenge = await generatePKCEChallenge(codeVerifier);
          const codeChallengeMethod = codeVerifier === codeChallenge ? "plain" : "s256";
          this._debug("PKCE", "code verifier", `${codeVerifier.substring(0, 5)}...`, "code challenge", codeChallenge, "method", codeChallengeMethod);
          const flowParams = new URLSearchParams({
            code_challenge: `${encodeURIComponent(codeChallenge)}`,
            code_challenge_method: `${encodeURIComponent(codeChallengeMethod)}`
          });
          urlParams.push(flowParams.toString());
        }
        if (options2 === null || options2 === void 0 ? void 0 : options2.queryParams) {
          const query = new URLSearchParams(options2.queryParams);
          urlParams.push(query.toString());
        }
        if (options2 === null || options2 === void 0 ? void 0 : options2.skipBrowserRedirect) {
          urlParams.push(`skip_http_redirect=${options2.skipBrowserRedirect}`);
        }
        return `${url}?${urlParams.join("&")}`;
      }
      async _unenroll(params) {
        try {
          return await this._useSession(async (result) => {
            var _a;
            const { data: sessionData, error: sessionError } = result;
            if (sessionError) {
              return { data: null, error: sessionError };
            }
            return await _request(this.fetch, "DELETE", `${this.url}/factors/${params.factorId}`, {
              headers: this.headers,
              jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
            });
          });
        } catch (error2) {
          if (isAuthError(error2)) {
            return { data: null, error: error2 };
          }
          throw error2;
        }
      }
      /**
       * {@see GoTrueMFAApi#enroll}
       */
      async _enroll(params) {
        try {
          return await this._useSession(async (result) => {
            var _a, _b;
            const { data: sessionData, error: sessionError } = result;
            if (sessionError) {
              return { data: null, error: sessionError };
            }
            const { data, error: error2 } = await _request(this.fetch, "POST", `${this.url}/factors`, {
              body: {
                friendly_name: params.friendlyName,
                factor_type: params.factorType,
                issuer: params.issuer
              },
              headers: this.headers,
              jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
            });
            if (error2) {
              return { data: null, error: error2 };
            }
            if ((_b = data === null || data === void 0 ? void 0 : data.totp) === null || _b === void 0 ? void 0 : _b.qr_code) {
              data.totp.qr_code = `data:image/svg+xml;utf-8,${data.totp.qr_code}`;
            }
            return { data, error: null };
          });
        } catch (error2) {
          if (isAuthError(error2)) {
            return { data: null, error: error2 };
          }
          throw error2;
        }
      }
      /**
       * {@see GoTrueMFAApi#verify}
       */
      async _verify(params) {
        return this._acquireLock(-1, async () => {
          try {
            return await this._useSession(async (result) => {
              var _a;
              const { data: sessionData, error: sessionError } = result;
              if (sessionError) {
                return { data: null, error: sessionError };
              }
              const { data, error: error2 } = await _request(this.fetch, "POST", `${this.url}/factors/${params.factorId}/verify`, {
                body: { code: params.code, challenge_id: params.challengeId },
                headers: this.headers,
                jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
              });
              if (error2) {
                return { data: null, error: error2 };
              }
              await this._saveSession(Object.assign({ expires_at: Math.round(Date.now() / 1e3) + data.expires_in }, data));
              await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", data);
              return { data, error: error2 };
            });
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * {@see GoTrueMFAApi#challenge}
       */
      async _challenge(params) {
        return this._acquireLock(-1, async () => {
          try {
            return await this._useSession(async (result) => {
              var _a;
              const { data: sessionData, error: sessionError } = result;
              if (sessionError) {
                return { data: null, error: sessionError };
              }
              return await _request(this.fetch, "POST", `${this.url}/factors/${params.factorId}/challenge`, {
                headers: this.headers,
                jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
              });
            });
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      /**
       * {@see GoTrueMFAApi#challengeAndVerify}
       */
      async _challengeAndVerify(params) {
        const { data: challengeData, error: challengeError } = await this._challenge({
          factorId: params.factorId
        });
        if (challengeError) {
          return { data: null, error: challengeError };
        }
        return await this._verify({
          factorId: params.factorId,
          challengeId: challengeData.id,
          code: params.code
        });
      }
      /**
       * {@see GoTrueMFAApi#listFactors}
       */
      async _listFactors() {
        const { data: { user }, error: userError } = await this.getUser();
        if (userError) {
          return { data: null, error: userError };
        }
        const factors = (user === null || user === void 0 ? void 0 : user.factors) || [];
        const totp = factors.filter((factor) => factor.factor_type === "totp" && factor.status === "verified");
        return {
          data: {
            all: factors,
            totp
          },
          error: null
        };
      }
      /**
       * {@see GoTrueMFAApi#getAuthenticatorAssuranceLevel}
       */
      async _getAuthenticatorAssuranceLevel() {
        return this._acquireLock(-1, async () => {
          return await this._useSession(async (result) => {
            var _a, _b;
            const { data: { session }, error: sessionError } = result;
            if (sessionError) {
              return { data: null, error: sessionError };
            }
            if (!session) {
              return {
                data: { currentLevel: null, nextLevel: null, currentAuthenticationMethods: [] },
                error: null
              };
            }
            const payload = this._decodeJWT(session.access_token);
            let currentLevel = null;
            if (payload.aal) {
              currentLevel = payload.aal;
            }
            let nextLevel = currentLevel;
            const verifiedFactors = (_b = (_a = session.user.factors) === null || _a === void 0 ? void 0 : _a.filter((factor) => factor.status === "verified")) !== null && _b !== void 0 ? _b : [];
            if (verifiedFactors.length > 0) {
              nextLevel = "aal2";
            }
            const currentAuthenticationMethods = payload.amr || [];
            return { data: { currentLevel, nextLevel, currentAuthenticationMethods }, error: null };
          });
        });
      }
    };
    GoTrueClient.nextInstanceID = 0;
  }
});

// node_modules/.pnpm/@supabase+gotrue-js@2.62.2/node_modules/@supabase/gotrue-js/dist/module/AuthAdminApi.js
var init_AuthAdminApi = __esm({
  "node_modules/.pnpm/@supabase+gotrue-js@2.62.2/node_modules/@supabase/gotrue-js/dist/module/AuthAdminApi.js"() {
    init_GoTrueAdminApi();
  }
});

// node_modules/.pnpm/@supabase+gotrue-js@2.62.2/node_modules/@supabase/gotrue-js/dist/module/AuthClient.js
var init_AuthClient = __esm({
  "node_modules/.pnpm/@supabase+gotrue-js@2.62.2/node_modules/@supabase/gotrue-js/dist/module/AuthClient.js"() {
    init_GoTrueClient();
  }
});

// node_modules/.pnpm/@supabase+gotrue-js@2.62.2/node_modules/@supabase/gotrue-js/dist/module/lib/types.js
var init_types3 = __esm({
  "node_modules/.pnpm/@supabase+gotrue-js@2.62.2/node_modules/@supabase/gotrue-js/dist/module/lib/types.js"() {
  }
});

// node_modules/.pnpm/@supabase+gotrue-js@2.62.2/node_modules/@supabase/gotrue-js/dist/module/index.js
var init_module5 = __esm({
  "node_modules/.pnpm/@supabase+gotrue-js@2.62.2/node_modules/@supabase/gotrue-js/dist/module/index.js"() {
    init_GoTrueAdminApi();
    init_GoTrueClient();
    init_AuthAdminApi();
    init_AuthClient();
    init_types3();
    init_errors3();
    init_locks();
  }
});

// node_modules/.pnpm/@supabase+supabase-js@2.39.8/node_modules/@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js
var SupabaseAuthClient;
var init_SupabaseAuthClient = __esm({
  "node_modules/.pnpm/@supabase+supabase-js@2.39.8/node_modules/@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js"() {
    init_module5();
    SupabaseAuthClient = class extends GoTrueClient {
      constructor(options2) {
        super(options2);
      }
    };
  }
});

// node_modules/.pnpm/@supabase+supabase-js@2.39.8/node_modules/@supabase/supabase-js/dist/module/SupabaseClient.js
var __awaiter7, SupabaseClient;
var init_SupabaseClient = __esm({
  "node_modules/.pnpm/@supabase+supabase-js@2.39.8/node_modules/@supabase/supabase-js/dist/module/SupabaseClient.js"() {
    init_module();
    init_module2();
    init_module3();
    init_module4();
    init_constants4();
    init_fetch2();
    init_helpers2();
    init_SupabaseAuthClient();
    __awaiter7 = function(thisArg, _arguments, P2, generator) {
      function adopt(value) {
        return value instanceof P2 ? value : new P2(function(resolve2) {
          resolve2(value);
        });
      }
      return new (P2 || (P2 = Promise))(function(resolve2, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    SupabaseClient = class {
      /**
       * Create a new client for use in the browser.
       * @param supabaseUrl The unique Supabase URL which is supplied when you create a new project in your project dashboard.
       * @param supabaseKey The unique Supabase Key which is supplied when you create a new project in your project dashboard.
       * @param options.db.schema You can switch in between schemas. The schema needs to be on the list of exposed schemas inside Supabase.
       * @param options.auth.autoRefreshToken Set to "true" if you want to automatically refresh the token before expiring.
       * @param options.auth.persistSession Set to "true" if you want to automatically save the user session into local storage.
       * @param options.auth.detectSessionInUrl Set to "true" if you want to automatically detects OAuth grants in the URL and signs in the user.
       * @param options.realtime Options passed along to realtime-js constructor.
       * @param options.global.fetch A custom fetch implementation.
       * @param options.global.headers Any additional headers to send with each network request.
       */
      constructor(supabaseUrl, supabaseKey, options2) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.supabaseUrl = supabaseUrl;
        this.supabaseKey = supabaseKey;
        if (!supabaseUrl)
          throw new Error("supabaseUrl is required.");
        if (!supabaseKey)
          throw new Error("supabaseKey is required.");
        const _supabaseUrl = stripTrailingSlash(supabaseUrl);
        this.realtimeUrl = `${_supabaseUrl}/realtime/v1`.replace(/^http/i, "ws");
        this.authUrl = `${_supabaseUrl}/auth/v1`;
        this.storageUrl = `${_supabaseUrl}/storage/v1`;
        this.functionsUrl = `${_supabaseUrl}/functions/v1`;
        const defaultStorageKey = `sb-${new URL(this.authUrl).hostname.split(".")[0]}-auth-token`;
        const DEFAULTS = {
          db: DEFAULT_DB_OPTIONS,
          realtime: DEFAULT_REALTIME_OPTIONS,
          auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS), { storageKey: defaultStorageKey }),
          global: DEFAULT_GLOBAL_OPTIONS
        };
        const settings = applySettingDefaults(options2 !== null && options2 !== void 0 ? options2 : {}, DEFAULTS);
        this.storageKey = (_b = (_a = settings.auth) === null || _a === void 0 ? void 0 : _a.storageKey) !== null && _b !== void 0 ? _b : "";
        this.headers = (_d = (_c = settings.global) === null || _c === void 0 ? void 0 : _c.headers) !== null && _d !== void 0 ? _d : {};
        this.auth = this._initSupabaseAuthClient((_e = settings.auth) !== null && _e !== void 0 ? _e : {}, this.headers, (_f = settings.global) === null || _f === void 0 ? void 0 : _f.fetch);
        this.fetch = fetchWithAuth(supabaseKey, this._getAccessToken.bind(this), (_g = settings.global) === null || _g === void 0 ? void 0 : _g.fetch);
        this.realtime = this._initRealtimeClient(Object.assign({ headers: this.headers }, settings.realtime));
        this.rest = new PostgrestClient(`${_supabaseUrl}/rest/v1`, {
          headers: this.headers,
          schema: (_h = settings.db) === null || _h === void 0 ? void 0 : _h.schema,
          fetch: this.fetch
        });
        this._listenForAuthEvents();
      }
      /**
       * Supabase Functions allows you to deploy and invoke edge functions.
       */
      get functions() {
        return new FunctionsClient(this.functionsUrl, {
          headers: this.headers,
          customFetch: this.fetch
        });
      }
      /**
       * Supabase Storage allows you to manage user-generated content, such as photos or videos.
       */
      get storage() {
        return new StorageClient(this.storageUrl, this.headers, this.fetch);
      }
      /**
       * Perform a query on a table or a view.
       *
       * @param relation - The table or view name to query
       */
      from(relation) {
        return this.rest.from(relation);
      }
      // NOTE: signatures must be kept in sync with PostgrestClient.schema
      /**
       * Select a schema to query or perform an function (rpc) call.
       *
       * The schema needs to be on the list of exposed schemas inside Supabase.
       *
       * @param schema - The schema to query
       */
      schema(schema) {
        return this.rest.schema(schema);
      }
      // NOTE: signatures must be kept in sync with PostgrestClient.rpc
      /**
       * Perform a function call.
       *
       * @param fn - The function name to call
       * @param args - The arguments to pass to the function call
       * @param options - Named parameters
       * @param options.head - When set to `true`, `data` will not be returned.
       * Useful if you only need the count.
       * @param options.count - Count algorithm to use to count rows returned by the
       * function. Only applicable for [set-returning
       * functions](https://www.postgresql.org/docs/current/functions-srf.html).
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       */
      rpc(fn, args = {}, options2 = {}) {
        return this.rest.rpc(fn, args, options2);
      }
      /**
       * Creates a Realtime channel with Broadcast, Presence, and Postgres Changes.
       *
       * @param {string} name - The name of the Realtime channel.
       * @param {Object} opts - The options to pass to the Realtime channel.
       *
       */
      channel(name2, opts = { config: {} }) {
        return this.realtime.channel(name2, opts);
      }
      /**
       * Returns all Realtime channels.
       */
      getChannels() {
        return this.realtime.getChannels();
      }
      /**
       * Unsubscribes and removes Realtime channel from Realtime client.
       *
       * @param {RealtimeChannel} channel - The name of the Realtime channel.
       *
       */
      removeChannel(channel) {
        return this.realtime.removeChannel(channel);
      }
      /**
       * Unsubscribes and removes all Realtime channels from Realtime client.
       */
      removeAllChannels() {
        return this.realtime.removeAllChannels();
      }
      _getAccessToken() {
        var _a, _b;
        return __awaiter7(this, void 0, void 0, function* () {
          const { data } = yield this.auth.getSession();
          return (_b = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : null;
        });
      }
      _initSupabaseAuthClient({ autoRefreshToken, persistSession, detectSessionInUrl, storage: storage2, storageKey, flowType, debug }, headers2, fetch3) {
        const authHeaders = {
          Authorization: `Bearer ${this.supabaseKey}`,
          apikey: `${this.supabaseKey}`
        };
        return new SupabaseAuthClient({
          url: this.authUrl,
          headers: Object.assign(Object.assign({}, authHeaders), headers2),
          storageKey,
          autoRefreshToken,
          persistSession,
          detectSessionInUrl,
          storage: storage2,
          flowType,
          debug,
          fetch: fetch3
        });
      }
      _initRealtimeClient(options2) {
        return new RealtimeClient(this.realtimeUrl, Object.assign(Object.assign({}, options2), { params: Object.assign({ apikey: this.supabaseKey }, options2 === null || options2 === void 0 ? void 0 : options2.params) }));
      }
      _listenForAuthEvents() {
        let data = this.auth.onAuthStateChange((event, session) => {
          this._handleTokenChanged(event, "CLIENT", session === null || session === void 0 ? void 0 : session.access_token);
        });
        return data;
      }
      _handleTokenChanged(event, source, token) {
        if ((event === "TOKEN_REFRESHED" || event === "SIGNED_IN") && this.changedAccessToken !== token) {
          this.realtime.setAuth(token !== null && token !== void 0 ? token : null);
          this.changedAccessToken = token;
        } else if (event === "SIGNED_OUT") {
          this.realtime.setAuth(this.supabaseKey);
          if (source == "STORAGE")
            this.auth.signOut();
          this.changedAccessToken = void 0;
        }
      }
    };
  }
});

// node_modules/.pnpm/@supabase+supabase-js@2.39.8/node_modules/@supabase/supabase-js/dist/module/index.js
var createClient;
var init_module6 = __esm({
  "node_modules/.pnpm/@supabase+supabase-js@2.39.8/node_modules/@supabase/supabase-js/dist/module/index.js"() {
    init_SupabaseClient();
    init_module5();
    init_module3();
    createClient = (supabaseUrl, supabaseKey, options2) => {
      return new SupabaseClient(supabaseUrl, supabaseKey, options2);
    };
  }
});

// node_modules/.pnpm/@supabase+auth-helpers-shared@0.6.3_@supabase+supabase-js@2.39.8/node_modules/@supabase/auth-helpers-shared/dist/index.mjs
function parseSupabaseCookie(str) {
  if (!str) {
    return null;
  }
  try {
    const session = JSON.parse(str);
    if (!session) {
      return null;
    }
    if (session.constructor.name === "Object") {
      return session;
    }
    if (session.constructor.name !== "Array") {
      throw new Error(`Unexpected format: ${session.constructor.name}`);
    }
    const [_header, payloadStr, _signature] = session[0].split(".");
    const payload = base64url_exports2.decode(payloadStr);
    const decoder2 = new TextDecoder();
    const { exp, sub, ...user } = JSON.parse(decoder2.decode(payload));
    return {
      expires_at: exp,
      expires_in: exp - Math.round(Date.now() / 1e3),
      token_type: "bearer",
      access_token: session[0],
      refresh_token: session[1],
      provider_token: session[2],
      provider_refresh_token: session[3],
      user: {
        id: sub,
        factors: session[4],
        ...user
      }
    };
  } catch (err) {
    console.warn("Failed to parse cookie string:", err);
    return null;
  }
}
function stringifySupabaseSession(session) {
  var _a;
  return JSON.stringify([
    session.access_token,
    session.refresh_token,
    session.provider_token,
    session.provider_refresh_token,
    ((_a = session.user) == null ? void 0 : _a.factors) ?? null
  ]);
}
function isBrowser2() {
  return typeof window !== "undefined" && typeof window.document !== "undefined";
}
function createChunkRegExp(chunkSize) {
  return new RegExp(".{1," + chunkSize + "}", "g");
}
function createChunks(key2, value, chunkSize) {
  const re = chunkSize !== void 0 ? createChunkRegExp(chunkSize) : MAX_CHUNK_REGEXP;
  const chunkCount = Math.ceil(value.length / (chunkSize ?? MAX_CHUNK_SIZE));
  if (chunkCount === 1) {
    return [{ name: key2, value }];
  }
  const chunks = [];
  const values = value.match(re);
  values == null ? void 0 : values.forEach((value2, i) => {
    const name2 = `${key2}.${i}`;
    chunks.push({ name: name2, value: value2 });
  });
  return chunks;
}
function combineChunks(key2, retrieveChunk = () => {
  return null;
}) {
  let values = [];
  for (let i = 0; ; i++) {
    const chunkName = `${key2}.${i}`;
    const chunk = retrieveChunk(chunkName);
    if (!chunk) {
      break;
    }
    values.push(chunk);
  }
  return values.length ? values.join("") : null;
}
function createSupabaseClient(supabaseUrl, supabaseKey, options2) {
  var _a;
  const browser = isBrowser2();
  return createClient(supabaseUrl, supabaseKey, {
    ...options2,
    auth: {
      flowType: "pkce",
      autoRefreshToken: browser,
      detectSessionInUrl: browser,
      persistSession: true,
      storage: options2.auth.storage,
      // fix this in supabase-js
      ...((_a = options2.auth) == null ? void 0 : _a.storageKey) ? {
        storageKey: options2.auth.storageKey
      } : {}
    }
  });
}
var __create2, __defProp2, __getOwnPropDesc2, __getOwnPropNames2, __getProtoOf2, __hasOwnProp2, __commonJS2, __copyProps2, __toESM2, require_cookie, import_cookie2, import_cookie, DEFAULT_COOKIE_OPTIONS, MAX_CHUNK_SIZE, MAX_CHUNK_REGEXP, CookieAuthStorageAdapter, BrowserCookieAuthStorageAdapter, export_parseCookies, export_serializeCookie;
var init_dist = __esm({
  "node_modules/.pnpm/@supabase+auth-helpers-shared@0.6.3_@supabase+supabase-js@2.39.8/node_modules/@supabase/auth-helpers-shared/dist/index.mjs"() {
    init_browser();
    init_module6();
    __create2 = Object.create;
    __defProp2 = Object.defineProperty;
    __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    __getOwnPropNames2 = Object.getOwnPropertyNames;
    __getProtoOf2 = Object.getPrototypeOf;
    __hasOwnProp2 = Object.prototype.hasOwnProperty;
    __commonJS2 = (cb, mod) => function __require() {
      return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    };
    __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key2 of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key2) && key2 !== except)
            __defProp2(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc2(from, key2)) || desc.enumerable });
      }
      return to;
    };
    __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
      mod
    ));
    require_cookie = __commonJS2({
      "../../node_modules/.pnpm/cookie@0.5.0/node_modules/cookie/index.js"(exports) {
        "use strict";
        exports.parse = parse3;
        exports.serialize = serialize3;
        var __toString2 = Object.prototype.toString;
        var fieldContentRegExp2 = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        function parse3(str, options2) {
          if (typeof str !== "string") {
            throw new TypeError("argument str must be a string");
          }
          var obj = {};
          var opt = options2 || {};
          var dec = opt.decode || decode4;
          var index24 = 0;
          while (index24 < str.length) {
            var eqIdx = str.indexOf("=", index24);
            if (eqIdx === -1) {
              break;
            }
            var endIdx = str.indexOf(";", index24);
            if (endIdx === -1) {
              endIdx = str.length;
            } else if (endIdx < eqIdx) {
              index24 = str.lastIndexOf(";", eqIdx - 1) + 1;
              continue;
            }
            var key2 = str.slice(index24, eqIdx).trim();
            if (void 0 === obj[key2]) {
              var val = str.slice(eqIdx + 1, endIdx).trim();
              if (val.charCodeAt(0) === 34) {
                val = val.slice(1, -1);
              }
              obj[key2] = tryDecode2(val, dec);
            }
            index24 = endIdx + 1;
          }
          return obj;
        }
        function serialize3(name2, val, options2) {
          var opt = options2 || {};
          var enc = opt.encode || encode4;
          if (typeof enc !== "function") {
            throw new TypeError("option encode is invalid");
          }
          if (!fieldContentRegExp2.test(name2)) {
            throw new TypeError("argument name is invalid");
          }
          var value = enc(val);
          if (value && !fieldContentRegExp2.test(value)) {
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
            if (!fieldContentRegExp2.test(opt.domain)) {
              throw new TypeError("option domain is invalid");
            }
            str += "; Domain=" + opt.domain;
          }
          if (opt.path) {
            if (!fieldContentRegExp2.test(opt.path)) {
              throw new TypeError("option path is invalid");
            }
            str += "; Path=" + opt.path;
          }
          if (opt.expires) {
            var expires = opt.expires;
            if (!isDate2(expires) || isNaN(expires.valueOf())) {
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
        function decode4(str) {
          return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
        }
        function encode4(val) {
          return encodeURIComponent(val);
        }
        function isDate2(val) {
          return __toString2.call(val) === "[object Date]" || val instanceof Date;
        }
        function tryDecode2(str, decode22) {
          try {
            return decode22(str);
          } catch (e) {
            return str;
          }
        }
      }
    });
    import_cookie2 = __toESM2(require_cookie());
    import_cookie = __toESM2(require_cookie());
    DEFAULT_COOKIE_OPTIONS = {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365 * 1e3
    };
    MAX_CHUNK_SIZE = 3180;
    MAX_CHUNK_REGEXP = createChunkRegExp(MAX_CHUNK_SIZE);
    CookieAuthStorageAdapter = class {
      constructor(cookieOptions) {
        this.cookieOptions = {
          ...DEFAULT_COOKIE_OPTIONS,
          ...cookieOptions,
          maxAge: DEFAULT_COOKIE_OPTIONS.maxAge
        };
      }
      getItem(key2) {
        const value = this.getCookie(key2);
        if (key2.endsWith("-code-verifier") && value) {
          return value;
        }
        if (value) {
          return JSON.stringify(parseSupabaseCookie(value));
        }
        const chunks = combineChunks(key2, (chunkName) => {
          return this.getCookie(chunkName);
        });
        return chunks !== null ? JSON.stringify(parseSupabaseCookie(chunks)) : null;
      }
      setItem(key2, value) {
        if (key2.endsWith("-code-verifier")) {
          this.setCookie(key2, value);
          return;
        }
        let session = JSON.parse(value);
        const sessionStr = stringifySupabaseSession(session);
        const sessionChunks = createChunks(key2, sessionStr);
        sessionChunks.forEach((sess) => {
          this.setCookie(sess.name, sess.value);
        });
      }
      removeItem(key2) {
        this._deleteSingleCookie(key2);
        this._deleteChunkedCookies(key2);
      }
      _deleteSingleCookie(key2) {
        if (this.getCookie(key2)) {
          this.deleteCookie(key2);
        }
      }
      _deleteChunkedCookies(key2, from = 0) {
        for (let i = from; ; i++) {
          const cookieName = `${key2}.${i}`;
          const value = this.getCookie(cookieName);
          if (value === void 0) {
            break;
          }
          this.deleteCookie(cookieName);
        }
      }
    };
    BrowserCookieAuthStorageAdapter = class extends CookieAuthStorageAdapter {
      constructor(cookieOptions) {
        super(cookieOptions);
      }
      getCookie(name2) {
        if (!isBrowser2())
          return null;
        const cookies = (0, import_cookie2.parse)(document.cookie);
        return cookies[name2];
      }
      setCookie(name2, value) {
        if (!isBrowser2())
          return null;
        document.cookie = (0, import_cookie2.serialize)(name2, value, {
          ...this.cookieOptions,
          httpOnly: false
        });
      }
      deleteCookie(name2) {
        if (!isBrowser2())
          return null;
        document.cookie = (0, import_cookie2.serialize)(name2, "", {
          ...this.cookieOptions,
          maxAge: 0,
          httpOnly: false
        });
      }
    };
    export_parseCookies = import_cookie.parse;
    export_serializeCookie = import_cookie.serialize;
  }
});

// node_modules/.pnpm/@supabase+auth-helpers-sveltekit@0.12.0_@supabase+supabase-js@2.39.8_@sveltejs+kit@2.5.4/node_modules/@supabase/auth-helpers-sveltekit/dist/index.js
function createSupabaseLoadClient({
  supabaseUrl,
  supabaseKey,
  event,
  serverSession,
  options: options2,
  cookieOptions
}) {
  var _a;
  const browser = isBrowser2();
  if (browser && cachedBrowserClient) {
    return cachedBrowserClient;
  }
  const client = createSupabaseClient(supabaseUrl, supabaseKey, {
    ...options2,
    global: {
      fetch: event.fetch,
      ...options2 == null ? void 0 : options2.global,
      headers: {
        ...(_a = options2 == null ? void 0 : options2.global) == null ? void 0 : _a.headers,
        "X-Client-Info": `${"@supabase/auth-helpers-sveltekit"}@${"0.12.0"}`
      }
    },
    auth: {
      storage: new SvelteKitLoadAuthStorageAdapter(serverSession, cookieOptions)
    }
  });
  if (browser) {
    cachedBrowserClient = client;
  }
  return client;
}
function createSupabaseServerClient({
  supabaseUrl,
  supabaseKey,
  event,
  options: options2,
  cookieOptions,
  expiryMargin
}) {
  var _a;
  const client = createSupabaseClient(supabaseUrl, supabaseKey, {
    ...options2,
    global: {
      ...options2 == null ? void 0 : options2.global,
      headers: {
        ...(_a = options2 == null ? void 0 : options2.global) == null ? void 0 : _a.headers,
        "X-Client-Info": `${"@supabase/auth-helpers-sveltekit"}@${"0.12.0"}`
      }
    },
    auth: {
      storage: new SvelteKitServerAuthStorageAdapter(event, cookieOptions, expiryMargin)
    }
  });
  return client;
}
var SvelteKitLoadAuthStorageAdapter, cachedBrowserClient, SvelteKitServerAuthStorageAdapter;
var init_dist2 = __esm({
  "node_modules/.pnpm/@supabase+auth-helpers-sveltekit@0.12.0_@supabase+supabase-js@2.39.8_@sveltejs+kit@2.5.4/node_modules/@supabase/auth-helpers-sveltekit/dist/index.js"() {
    init_dist();
    init_dist();
    init_dist();
    init_dist();
    SvelteKitLoadAuthStorageAdapter = class extends BrowserCookieAuthStorageAdapter {
      constructor(serverSession = null, cookieOptions) {
        super(cookieOptions);
        this.serverSession = serverSession;
      }
      getItem(key2) {
        if (!isBrowser2()) {
          return JSON.stringify(this.serverSession);
        }
        return super.getItem(key2);
      }
    };
    SvelteKitServerAuthStorageAdapter = class extends CookieAuthStorageAdapter {
      constructor(event, cookieOptions, expiryMargin = 60) {
        super(cookieOptions);
        this.event = event;
        this.expiryMargin = expiryMargin;
        this.isServer = true;
        this.isInitialDelete = true;
        this.currentSession = null;
      }
      getCookie(name2) {
        return this.event.cookies.get(name2);
      }
      setCookie(name2, value) {
        this.event.cookies.set(name2, value, {
          httpOnly: false,
          path: "/",
          ...this.cookieOptions
        });
      }
      deleteCookie(name2) {
        this.event.cookies.delete(name2, {
          httpOnly: false,
          path: "/",
          ...this.cookieOptions
        });
      }
      async getItem(key2) {
        const sessionStr = await super.getItem(key2);
        if (!sessionStr) {
          this.currentSession = null;
          return null;
        }
        const session = JSON.parse(sessionStr);
        this.currentSession = session;
        if (session == null ? void 0 : session.expires_at) {
          session.expires_at -= this.expiryMargin;
        }
        return JSON.stringify(session);
      }
      removeItem(key2) {
        var _a;
        if (this.isInitialDelete && ((_a = this.currentSession) == null ? void 0 : _a.expires_at)) {
          const now = Math.round(Date.now() / 1e3);
          if (this.currentSession.expires_at < now + 10) {
            this.isInitialDelete = false;
            return;
          }
        }
        super.removeItem(key2);
      }
    };
  }
});

// .svelte-kit/output/server/chunks/index.js
function error(status, body2) {
  if (isNaN(status) || status < 400 || status > 599) {
    throw new Error(`HTTP error status codes must be between 400 and 599 \u2014 ${status} is invalid`);
  }
  throw new HttpError(status, body2);
}
function redirect(status, location) {
  if (isNaN(status) || status < 300 || status > 308) {
    throw new Error("Invalid status code");
  }
  throw new Redirect(
    // @ts-ignore
    status,
    location.toString()
  );
}
function json(data, init2) {
  const body2 = JSON.stringify(data);
  const headers2 = new Headers(init2?.headers);
  if (!headers2.has("content-length")) {
    headers2.set("content-length", encoder2.encode(body2).byteLength.toString());
  }
  if (!headers2.has("content-type")) {
    headers2.set("content-type", "application/json");
  }
  return new Response(body2, {
    ...init2,
    headers: headers2
  });
}
function text(body2, init2) {
  const headers2 = new Headers(init2?.headers);
  if (!headers2.has("content-length")) {
    const encoded = encoder2.encode(body2);
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
function fail(status, data) {
  return new ActionFailure(status, data);
}
var HttpError, Redirect, SvelteKitError, ActionFailure, encoder2;
var init_chunks = __esm({
  ".svelte-kit/output/server/chunks/index.js"() {
    HttpError = class {
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
    Redirect = class {
      /**
       * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308} status
       * @param {string} location
       */
      constructor(status, location) {
        this.status = status;
        this.location = location;
      }
    };
    SvelteKitError = class extends Error {
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
    ActionFailure = class {
      /**
       * @param {number} status
       * @param {T} data
       */
      constructor(status, data) {
        this.status = status;
        this.data = data;
      }
    };
    encoder2 = new TextEncoder();
  }
});

// .svelte-kit/output/server/chunks/hooks.server.js
var hooks_server_exports = {};
__export(hooks_server_exports, {
  handle: () => handle
});
function sequence(...handlers) {
  const length = handlers.length;
  if (!length)
    return ({ event, resolve: resolve2 }) => resolve2(event);
  return ({ event, resolve: resolve2 }) => {
    return apply_handle(0, event, {});
    function apply_handle(i, event2, parent_options) {
      const handle2 = handlers[i];
      return handle2({
        event: event2,
        resolve: (event3, options2) => {
          const transformPageChunk = async ({ html, done }) => {
            if (options2?.transformPageChunk) {
              html = await options2.transformPageChunk({ html, done }) ?? "";
            }
            if (parent_options?.transformPageChunk) {
              html = await parent_options.transformPageChunk({ html, done }) ?? "";
            }
            return html;
          };
          const filterSerializedResponseHeaders = parent_options?.filterSerializedResponseHeaders ?? options2?.filterSerializedResponseHeaders;
          const preload = parent_options?.preload ?? options2?.preload;
          return i < length - 1 ? apply_handle(i + 1, event3, {
            transformPageChunk,
            filterSerializedResponseHeaders,
            preload
          }) : resolve2(event3, { transformPageChunk, filterSerializedResponseHeaders, preload });
        }
      });
    }
  };
}
async function supabase({ event, resolve: resolve2 }) {
  event.locals.supabase = createSupabaseServerClient({
    supabaseUrl: "https://noejjknzqcfnwzgrpfdi.supabase.co",
    supabaseKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vZWpqa256cWNmbnd6Z3JwZmRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc0ODMyNDQsImV4cCI6MjAyMzA1OTI0NH0.pEqKPgopedqGbawDnrNssT_RjZBhr-IJoUx_9uWWv1c",
    event
  });
  event.locals.getSession = async () => {
    const {
      data: { session }
    } = await event.locals.supabase.auth.getSession();
    return session;
  };
  return resolve2(event, {
    filterSerializedResponseHeaders(name2) {
      return name2 === "content-range";
    }
  });
}
async function authorization({ event, resolve: resolve2 }) {
  if (event.url.pathname.startsWith("/admin") && event.request.method === "GET") {
    const session = await event.locals.getSession();
    if (!session) {
      redirect(303, "/");
    }
  }
  if (event.url.pathname.startsWith("/protected-posts") && event.request.method === "POST") {
    const session = await event.locals.getSession();
    if (!session) {
      throw error(303, "/");
    }
  }
  return resolve2(event);
}
var handle;
var init_hooks_server = __esm({
  ".svelte-kit/output/server/chunks/hooks.server.js"() {
    init_dist2();
    init_chunks();
    handle = sequence(supabase, authorization);
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

// .svelte-kit/output/server/chunks/index2.js
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
var init_index2 = __esm({
  ".svelte-kit/output/server/chunks/index2.js"() {
    init_ssr();
    subscriber_queue = [];
  }
});

// node_modules/.pnpm/@vercel+analytics@1.2.2/node_modules/@vercel/analytics/dist/index.mjs
function isBrowser3() {
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
  const mode = isBrowser3() ? window.vam : detectEnvironment();
  return mode || "production";
}
function isDevelopment() {
  return getMode() === "development";
}
function inject(props = {
  debug: true
}) {
  var _a;
  if (!isBrowser3())
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
  script.dataset.sdkv = version6;
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
var name, version6, initQueue, DEV_SCRIPT_URL, PROD_SCRIPT_URL;
var init_dist3 = __esm({
  "node_modules/.pnpm/@vercel+analytics@1.2.2/node_modules/@vercel/analytics/dist/index.mjs"() {
    name = "@vercel/analytics";
    version6 = "1.2.2";
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
  load: () => load
});
var load;
var init_layout = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.js"() {
    init_dist3();
    init_dist2();
    inject({ mode: "production" });
    load = async ({ fetch: fetch3, data, depends }) => {
      depends("supabase:auth");
      const supabase3 = createSupabaseLoadClient({
        supabaseUrl: "https://noejjknzqcfnwzgrpfdi.supabase.co",
        supabaseKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vZWpqa256cWNmbnd6Z3JwZmRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc0ODMyNDQsImV4cCI6MjAyMzA1OTI0NH0.pEqKPgopedqGbawDnrNssT_RjZBhr-IJoUx_9uWWv1c",
        event: { fetch: fetch3 },
        serverSession: data.session
      });
      const {
        data: { session }
      } = await supabase3.auth.getSession();
      return { supabase: supabase3, session };
    };
  }
});

// .svelte-kit/output/server/entries/pages/_layout.server.js
var layout_server_exports = {};
__export(layout_server_exports, {
  load: () => load2
});
var load2;
var init_layout_server = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.server.js"() {
    load2 = async ({ locals: { getSession: getSession2 } }) => {
      return {
        session: await getSession2()
      };
    };
  }
});

// .svelte-kit/output/server/chunks/Icon.js
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
  const index24 = content.indexOf("<" + tag);
  while (index24 >= 0) {
    const start = content.indexOf(">", index24);
    const end = content.indexOf("</" + tag);
    if (start === -1 || end === -1) {
      break;
    }
    const endEnd = content.indexOf(">", end);
    if (endEnd === -1) {
      break;
    }
    defs += content.slice(start + 1, end).trim();
    content = content.slice(0, index24).trim() + content.slice(endEnd + 1);
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
  const config = createAPIConfig(customConfig);
  if (config === null) {
    return false;
  }
  configStorage[provider] = config;
  return true;
}
function getAPIConfig(provider) {
  return configStorage[provider];
}
function calculateMaxLength(provider, prefix) {
  const config = getAPIConfig(provider);
  if (!config) {
    return 0;
  }
  let result;
  if (!config.maxURL) {
    result = 0;
  } else {
    let maxHostLength = 0;
    config.resources.forEach((item) => {
      const host = item;
      maxHostLength = Math.max(maxHostLength, host.length);
    });
    const url = prefix + ".json?icons=";
    result = config.maxURL - maxHostLength - config.path.length - url.length;
  }
  return result;
}
function shouldAbort(status) {
  return status === 404;
}
function getPath(provider) {
  if (typeof provider === "string") {
    const config = getAPIConfig(provider);
    if (config) {
      return config.path;
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
function sendQuery(config, payload, query, done) {
  const resourcesCount = config.resources.length;
  const startIndex = config.random ? Math.floor(Math.random() * resourcesCount) : config.index;
  let resources;
  if (config.random) {
    let list = config.resources.slice(0);
    resources = [];
    while (list.length > 1) {
      const nextIndex = Math.floor(Math.random() * list.length);
      resources.push(list[nextIndex]);
      list = list.slice(0, nextIndex).concat(list.slice(nextIndex + 1));
    }
    resources = resources.concat(list);
  } else {
    resources = config.resources.slice(startIndex).concat(config.resources.slice(0, startIndex));
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
        if (isError || !config.dataAfterTimeout) {
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
    if (!config.random) {
      const index24 = config.resources.indexOf(item.resource);
      if (index24 !== -1 && index24 !== config.index) {
        config.index = index24;
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
        }, config.timeout);
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
    timer = setTimeout(execNext, config.rotate);
    query(resource, payload, item.callback);
  }
  setTimeout(execNext);
  return getQueryStatus;
}
function initRedundancy(cfg) {
  const config = {
    ...defaultConfig,
    ...cfg
  };
  let queries = [];
  function cleanup() {
    queries = queries.filter((item) => item().status === "pending");
  }
  function query(payload, queryCallback, doneCallback) {
    const query2 = sendQuery(
      config,
      payload,
      queryCallback,
      (data, error2) => {
        cleanup();
        if (doneCallback) {
          doneCallback(data, error2);
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
    setIndex: (index24) => {
      config.index = index24;
    },
    getIndex: () => config.index,
    cleanup
  };
  return instance;
}
function emptyCallback$1() {
}
function getRedundancyCache(provider) {
  if (!redundancyCache[provider]) {
    const config = getAPIConfig(provider);
    if (!config) {
      return;
    }
    const redundancy = initRedundancy(config);
    const cachedReundancy = {
      config,
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
    const config = createAPIConfig(target);
    if (config) {
      redundancy = initRedundancy(config);
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
  const version7 = getStoredItem(func, browserCacheVersionKey);
  if (version7 !== browserCacheVersion) {
    if (version7) {
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
  const parseItem = (index24) => {
    const name2 = browserCachePrefix + index24.toString();
    const item = getStoredItem(func, name2);
    if (typeof item !== "string") {
      return;
    }
    try {
      const data = JSON.parse(item);
      if (typeof data === "object" && typeof data.cached === "number" && data.cached > minTime && typeof data.provider === "string" && typeof data.data === "object" && typeof data.data.prefix === "string" && // Valid item: run callback
      callback(data, index24)) {
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
    let index24;
    if (set.size) {
      set.delete(index24 = Array.from(set).shift());
    } else {
      index24 = getBrowserStorageItemsCount(func);
      if (index24 >= browserStorageLimit || !setBrowserStorageItemsCount(func, index24 + 1)) {
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
      browserCachePrefix + index24.toString(),
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
var matchIconName, stringToIcon, validateIconName, defaultIconDimensions, defaultIconTransformations, defaultIconProps, defaultExtendedIconProps, optionalPropertyDefaults, dataStorage, simpleNames, defaultIconSizeCustomisations, defaultIconCustomisations, unitsSplit, unitsTest, isUnsetKeyword, regex, randomPrefix, counter, storage, configStorage, fallBackAPISources, fallBackAPI, detectFetch, fetchModule, prepare, send, fetchAPIModule, idCounter, defaultConfig, redundancyCache, browserCacheVersion, browserCachePrefix, browserCacheCountKey, browserCacheVersionKey, browserStorageHour, browserStorageCacheExpiration, browserStorageLimit, browserStorageConfig, browserStorageEmptyItems, browserStorageStatus, _window, loadIcons, separator, defaultExtendedIconCustomisations, svgDefaults, commonProps, monotoneProps, coloredProps, propsToAdd, propsToAddTo, Icon;
var init_Icon = __esm({
  ".svelte-kit/output/server/chunks/Icon.js"() {
    init_ssr();
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
      icons.forEach((name2, index24) => {
        length += name2.length + 1;
        if (length >= maxLength && index24 > 0) {
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
  }
});

// .svelte-kit/output/server/chunks/client.js
function get2(key2, parse2 = JSON.parse) {
  try {
    return parse2(sessionStorage[key2]);
  } catch {
  }
}
var SNAPSHOT_KEY, SCROLL_KEY;
var init_client = __esm({
  ".svelte-kit/output/server/chunks/client.js"() {
    init_exports();
    SNAPSHOT_KEY = "sveltekit:snapshot";
    SCROLL_KEY = "sveltekit:scroll";
    get2(SCROLL_KEY) ?? {};
    get2(SNAPSHOT_KEY) ?? {};
  }
});

// .svelte-kit/output/server/chunks/stores.js
var getStores, page;
var init_stores = __esm({
  ".svelte-kit/output/server/chunks/stores.js"() {
    init_ssr();
    init_client();
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
function getDescription($page) {
  try {
    return $page.data.data.metaDescription || $page.data.data.description.replace(/(<([^>]+)>)/gi, "").substring(0, 155);
  } catch (error2) {
    return "Willkommen auf cdl-protokolle.com \u2013 Ihrer Quelle f\xFCr hochwertige Gesundheitsinformationen und wertvolle Tipps f\xFCr ein gesundes Leben! Entdecken Sie kostenlose Leseproben aus erstklassigen Gesundheitsb\xFCchern und erhalten Sie zahlreiche Ratschl\xE4ge zur Verbesserung Ihrer Gesundheit, ohne den Einsatz von Pharma-Medizin. Unsere Website entstand aus einer engagierten Telegram-Gruppe und bietet Ihnen organisierte Informationen sowie die M\xF6glichkeit zum aktiven Austausch. Tauchen Sie ein in die Welt der ganzheitlichen Gesundheit und f\xF6rdern Sie Ihr Wohlbefinden auf nat\xFCrliche Weise. Starten Sie jetzt Ihren Weg zu einem ges\xFCnderen Lebensstil!";
  }
}
function getTitle($page) {
  try {
    return $page.data.data.title || $page.data.data.name;
  } catch (error2) {
    return "CDL Protokolle ";
  }
}
var Logo, Footer, css, Navbar, Layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.svelte.js"() {
    init_ssr();
    init_Icon();
    init_stores();
    init_client();
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
      code: ".menuitem.svelte-1krbgaj.svelte-1krbgaj:hover{font-weight:700;text-decoration-line:underline}a.svelte-1krbgaj.svelte-1krbgaj:active{--tw-bg-opacity:1;background-color:rgb(132 225 188 / var(--tw-bg-opacity));text-decoration-line:underline;text-decoration-color:#27272a}.navbar-mobile.svelte-1krbgaj.svelte-1krbgaj{position:relative;display:flex;width:100%;align-items:center;justify-content:space-between;--tw-bg-opacity:1;background-color:rgb(217 249 157 / var(--tw-bg-opacity))}.navbar-desktop.svelte-1krbgaj.svelte-1krbgaj{position:relative;display:none;width:100%;align-items:center;justify-content:space-between;--tw-bg-opacity:1;background-color:rgb(217 249 157 / var(--tw-bg-opacity))}@media(min-width: 768px){.navbar-desktop.svelte-1krbgaj.svelte-1krbgaj{display:flex}}nav.svelte-1krbgaj.svelte-1krbgaj{display:none}nav.open.svelte-1krbgaj.svelte-1krbgaj{position:absolute;top:100%;left:0px;display:block;width:100%;--tw-bg-opacity:1;background-color:rgb(250 202 21 / var(--tw-bg-opacity));text-align:center}ul.svelte-1krbgaj.svelte-1krbgaj{margin-top:1.25rem;margin-bottom:1.25rem;display:grid;row-gap:1rem}.burger.svelte-1krbgaj.svelte-1krbgaj{margin-right:0.5rem;height:1.75rem;width:1.75rem;border-radius:0.25rem;border-width:2px;--tw-border-opacity:1;border-color:rgb(14 116 144 / var(--tw-border-opacity));background-color:transparent;padding-left:0.25rem}.burger.svelte-1krbgaj>div.svelte-1krbgaj{position:absolute;height:2px;width:14px;--tw-bg-opacity:1;background-color:rgb(14 116 144 / var(--tw-bg-opacity))}.bar-1.svelte-1krbgaj.svelte-1krbgaj{--tw-translate-y:5px;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.bar-3.svelte-1krbgaj.svelte-1krbgaj{--tw-translate-y:-5px;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}",
      map: null
    };
    Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css);
      return ` <div class="md:hidden"><div class="navbar-mobile svelte-1krbgaj"><div class=""><a href="/" class="svelte-1krbgaj">${validate_component(Logo, "Logo").$$render($$result, {}, {}, {})}</a></div> <div class="dropdownmenu"><nav class="${["svelte-1krbgaj", ""].join(" ").trim()}"><ul class="svelte-1krbgaj"><li><a href="/buecher" class="svelte-1krbgaj" data-svelte-h="svelte-1p7qgmo">B\xFCcher</a></li> <li><a href="/cdl-protokolle" class="svelte-1krbgaj" data-svelte-h="svelte-1o47wwz">CDL Protokolle</a></li> <li><a href="/produkte" class="svelte-1krbgaj" data-svelte-h="svelte-1a5b1wg">Produkte</a></li> <li><a href="/gutscheine" class="svelte-1krbgaj" data-svelte-h="svelte-1d1opew">Gutscheine</a></li> <li><a href="/leseproben" class="svelte-1krbgaj" data-svelte-h="svelte-1xu7u34">Leseproben</a></li></ul></nav></div> <button class="burger svelte-1krbgaj" data-svelte-h="svelte-1ddgedt"><div class="bar-1 svelte-1krbgaj"></div> <div class="bar-2 svelte-1krbgaj"></div> <div class="bar-3 svelte-1krbgaj"></div></button></div></div>  <div class="hidden md:block "><div class="navbar-desktop space-x-20 svelte-1krbgaj"><a class="w-full svelte-1krbgaj" href="/">${validate_component(Logo, "Logo").$$render($$result, {}, {}, {})}</a> <div id="desktopmenu" class="flex flex-row w-full space-x-3 pr-2" data-svelte-h="svelte-1kg43b0"><a class="menuitem svelte-1krbgaj" href="/buecher">B\xFCcher</a> <a class="menuitem svelte-1krbgaj" href="/cdl-protokolle">CDL Protokolle</a> <a class="menuitem svelte-1krbgaj" href="/produkte">Produkte</a> <a class="menuitem svelte-1krbgaj" href="/gutscheine">Gutscheine</a> <a class="menuitem svelte-1krbgaj" href="/leseproben">Leseproben</a></div></div> </div>`;
    });
    Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      let { data } = $$props;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      $$unsubscribe_page();
      return `${$$result.head += `<!-- HEAD_svelte-17vvv3l_START -->${$$result.title = `<title>${escape(getTitle($page))}</title>`, ""}<meta name="description"${add_attribute("content", getDescription($page), 0)}><!-- HEAD_svelte-17vvv3l_END -->`, ""}  <div class="bg-gray-50 max-w-screen-lg m-auto md:block justify-center items-center text-black"><div class="w-full mx-auto px-1"> ${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})} <form class="flex border-2 px-2 justify-center items-center" method="get" action="/search"><input class="w-full border-0 border-collapse border-gray-400" type="text" name="q" placeholder="Wonach suchen Sie? (B\xFCcher, Produkte, Inhaltsstoffe)"> <button class="border-1 border-collapse border-gray-400 p-2" type="submit">${validate_component(Icon, "Icon").$$render($$result, { width: "24", icon: "ion:search-outline" }, {}, {})}</button></form>  ${slots.default ? slots.default({}) : ``}</div> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
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
  server: () => layout_server_exports,
  server_id: () => server_id,
  stylesheets: () => stylesheets,
  universal: () => layout_exports,
  universal_id: () => universal_id
});
var index, component_cache, component, universal_id, server_id, imports, stylesheets, fonts;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    init_layout();
    init_layout_server();
    index = 0;
    component = async () => component_cache ?? (component_cache = (await Promise.resolve().then(() => (init_layout_svelte(), layout_svelte_exports))).default);
    universal_id = "src/routes/+layout.js";
    server_id = "src/routes/+layout.server.js";
    imports = ["_app/immutable/nodes/0.C6GbWxHa.js", "_app/immutable/chunks/index.C1t3ibtX.js", "_app/immutable/chunks/preload-helper.BQ24v_F8.js", "_app/immutable/chunks/scheduler.zM5vpuro.js", "_app/immutable/chunks/index.Lc7HYTwW.js", "_app/immutable/chunks/Icon.D7F1xIXL.js", "_app/immutable/chunks/spread.CgU5AtxT.js", "_app/immutable/chunks/stores.BVXHkDaa.js", "_app/immutable/chunks/entry.BTRUiN5Q.js", "_app/immutable/chunks/index.an3FWtO5.js", "_app/immutable/chunks/control.CYgJF_JY.js"];
    stylesheets = ["_app/immutable/assets/0.DV4HnWc6.css"];
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
    imports2 = ["_app/immutable/nodes/1.BEwOILYV.js", "_app/immutable/chunks/scheduler.zM5vpuro.js", "_app/immutable/chunks/index.Lc7HYTwW.js", "_app/immutable/chunks/stores.BVXHkDaa.js", "_app/immutable/chunks/entry.BTRUiN5Q.js", "_app/immutable/chunks/index.an3FWtO5.js", "_app/immutable/chunks/control.CYgJF_JY.js"];
    stylesheets2 = [];
    fonts2 = [];
  }
});

// .svelte-kit/output/server/entries/pages/buecher/_layout.ts.js
var layout_ts_exports = {};
__export(layout_ts_exports, {
  load: () => load3
});
function load3() {
  return {
    categories
  };
}
var categories;
var init_layout_ts = __esm({
  ".svelte-kit/output/server/entries/pages/buecher/_layout.ts.js"() {
    categories = [
      { id: 1, name: "Gesundheit" },
      { id: 2, name: "Krisenvorsorge" },
      { id: 3, name: "Medizinskandale" },
      { id: 4, name: "Tiergesundheit" }
    ];
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
function createClassUtils(config) {
  const classMap = createClassMap(config);
  const {
    conflictingClassGroups,
    conflictingClassGroupModifiers
  } = config;
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
function createClassMap(config) {
  const {
    theme,
    prefix
  } = config;
  const classMap = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  const prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix);
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
function createSplitModifiers(config) {
  const separator2 = config.separator;
  const isSeparatorSingleCharacter = separator2.length === 1;
  const firstSeparatorCharacter = separator2[0];
  const separatorLength = separator2.length;
  return function splitModifiers(className) {
    const modifiers = [];
    let bracketDepth = 0;
    let modifierStart = 0;
    let postfixModifierPosition;
    for (let index24 = 0; index24 < className.length; index24++) {
      let currentCharacter = className[index24];
      if (bracketDepth === 0) {
        if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index24, index24 + separatorLength) === separator2)) {
          modifiers.push(className.slice(modifierStart, index24));
          modifierStart = index24 + separatorLength;
          continue;
        }
        if (currentCharacter === "/") {
          postfixModifierPosition = index24;
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
function createConfigUtils(config) {
  return {
    cache: createLruCache(config.cacheSize),
    splitModifiers: createSplitModifiers(config),
    ...createClassUtils(config)
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
  let index24 = 0;
  let argument;
  let resolvedValue;
  let string = "";
  while (index24 < arguments.length) {
    if (argument = arguments[index24++]) {
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
    const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
    configUtils = createConfigUtils(config);
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

// .svelte-kit/output/server/chunks/Button.js
var Button;
var init_Button = __esm({
  ".svelte-kit/output/server/chunks/Button.js"() {
    init_ssr();
    init_names();
    init_bundle_mjs();
    Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["pill", "outline", "size", "href", "type", "color", "shadow", "tag", "checked"]);
      const group = getContext("group");
      let { pill = false } = $$props;
      let { outline = false } = $$props;
      let { size = group ? "sm" : "md" } = $$props;
      let { href = void 0 } = $$props;
      let { type = "button" } = $$props;
      let { color = group ? outline ? "dark" : "alternative" : "primary" } = $$props;
      let { shadow = false } = $$props;
      let { tag = "button" } = $$props;
      let { checked = void 0 } = $$props;
      const colorClasses = {
        alternative: "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 hover:text-primary-700 focus-within:text-primary-700 dark:focus-within:text-white dark:hover:text-white dark:hover:bg-gray-700",
        blue: "text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700",
        dark: "text-white bg-gray-800 hover:bg-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700",
        green: "text-white bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700",
        light: "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600",
        primary: "text-white bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700",
        purple: "text-white bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700",
        red: "text-white bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700",
        yellow: "text-white bg-yellow-400 hover:bg-yellow-500 ",
        none: ""
      };
      const colorCheckedClasses = {
        alternative: "text-primary-700 border dark:text-primary-500 bg-gray-100 dark:bg-gray-700 border-gray-300 shadow-gray-300 dark:shadow-gray-800 shadow-inner",
        blue: "text-blue-900 bg-blue-400 dark:bg-blue-500 shadow-blue-700 dark:shadow-blue-800 shadow-inner",
        dark: "text-white bg-gray-500 dark:bg-gray-600 shadow-gray-800 dark:shadow-gray-900 shadow-inner",
        green: "text-green-900 bg-green-400 dark:bg-green-500 shadow-green-700 dark:shadow-green-800 shadow-inner",
        light: "text-gray-900 bg-gray-100 border border-gray-300 dark:bg-gray-500 dark:text-gray-900 dark:border-gray-700 shadow-gray-300 dark:shadow-gray-700 shadow-inner",
        primary: "text-primary-900 bg-primary-400 dark:bg-primary-500 shadow-primary-700 dark:shadow-primary-800 shadow-inner",
        purple: "text-purple-900 bg-purple-400 dark:bg-purple-500 shadow-purple-700 dark:shadow-purple-800 shadow-inner",
        red: "text-red-900 bg-red-400 dark:bg-red-500 shadow-red-700 dark:shadow-red-800 shadow-inner",
        yellow: "text-yellow-900 bg-yellow-300 dark:bg-yellow-400 shadow-yellow-500 dark:shadow-yellow-700 shadow-inner",
        none: ""
      };
      const coloredFocusClasses = {
        alternative: "focus-within:ring-gray-200 dark:focus-within:ring-gray-700",
        blue: "focus-within:ring-blue-300 dark:focus-within:ring-blue-800",
        dark: "focus-within:ring-gray-300 dark:focus-within:ring-gray-700",
        green: "focus-within:ring-green-300 dark:focus-within:ring-green-800",
        light: "focus-within:ring-gray-200 dark:focus-within:ring-gray-700",
        primary: "focus-within:ring-primary-300 dark:focus-within:ring-primary-800",
        purple: "focus-within:ring-purple-300 dark:focus-within:ring-purple-900",
        red: "focus-within:ring-red-300 dark:focus-within:ring-red-900",
        yellow: "focus-within:ring-yellow-300 dark:focus-within:ring-yellow-900",
        none: ""
      };
      const coloredShadowClasses = {
        alternative: "shadow-gray-500/50 dark:shadow-gray-800/80",
        blue: "shadow-blue-500/50 dark:shadow-blue-800/80",
        dark: "shadow-gray-500/50 dark:shadow-gray-800/80",
        green: "shadow-green-500/50 dark:shadow-green-800/80",
        light: "shadow-gray-500/50 dark:shadow-gray-800/80",
        primary: "shadow-primary-500/50 dark:shadow-primary-800/80",
        purple: "shadow-purple-500/50 dark:shadow-purple-800/80",
        red: "shadow-red-500/50 dark:shadow-red-800/80 ",
        yellow: "shadow-yellow-500/50 dark:shadow-yellow-800/80 ",
        none: ""
      };
      const outlineClasses = {
        alternative: "text-gray-900 dark:text-gray-400 hover:text-white border border-gray-800 hover:bg-gray-900 focus-within:bg-gray-900 focus-within:text-white focus-within:ring-gray-300 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600 dark:focus-within:ring-gray-800",
        blue: "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600",
        dark: "text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus-within:bg-gray-900 focus-within:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600",
        green: "text-green-700 hover:text-white border border-green-700 hover:bg-green-800 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600",
        light: "text-gray-500 hover:text-gray-900 bg-white border border-gray-200 dark:border-gray-600 dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600",
        primary: "text-primary-700 hover:text-white border border-primary-700 hover:bg-primary-700 dark:border-primary-500 dark:text-primary-500 dark:hover:text-white dark:hover:bg-primary-600",
        purple: "text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500",
        red: "text-red-700 hover:text-white border border-red-700 hover:bg-red-800 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600",
        yellow: "text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400",
        none: ""
      };
      const sizeClasses = {
        xs: "px-3 py-2 text-xs",
        sm: "px-4 py-2 text-sm",
        md: "px-5 py-2.5 text-sm",
        lg: "px-5 py-3 text-base",
        xl: "px-6 py-3.5 text-base"
      };
      const hasBorder = () => outline || color === "alternative" || color === "light";
      let buttonClass;
      if ($$props.pill === void 0 && $$bindings.pill && pill !== void 0)
        $$bindings.pill(pill);
      if ($$props.outline === void 0 && $$bindings.outline && outline !== void 0)
        $$bindings.outline(outline);
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.href === void 0 && $$bindings.href && href !== void 0)
        $$bindings.href(href);
      if ($$props.type === void 0 && $$bindings.type && type !== void 0)
        $$bindings.type(type);
      if ($$props.color === void 0 && $$bindings.color && color !== void 0)
        $$bindings.color(color);
      if ($$props.shadow === void 0 && $$bindings.shadow && shadow !== void 0)
        $$bindings.shadow(shadow);
      if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
        $$bindings.tag(tag);
      if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
        $$bindings.checked(checked);
      buttonClass = twMerge(
        "text-center font-medium",
        group ? "focus-within:ring-2" : "focus-within:ring-4",
        group && "focus-within:z-10",
        group || "focus-within:outline-none",
        "inline-flex items-center justify-center " + sizeClasses[size],
        outline && checked && "border dark:border-gray-900",
        outline && checked && colorCheckedClasses[color],
        outline && !checked && outlineClasses[color],
        !outline && checked && colorCheckedClasses[color],
        !outline && !checked && colorClasses[color],
        color === "alternative" && (group && !checked ? "dark:bg-gray-700 dark:text-white dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-600" : "dark:bg-transparent dark:border-gray-600 dark:hover:border-gray-600"),
        outline && color === "dark" && (group ? checked ? "bg-gray-900 border-gray-800 dark:border-white dark:bg-gray-600" : "dark:text-white border-gray-800 dark:border-white" : "dark:text-gray-400 dark:border-gray-700"),
        coloredFocusClasses[color],
        hasBorder() && group && "border-s-0 first:border-s",
        group ? pill && "first:rounded-s-full last:rounded-e-full" || "first:rounded-s-lg last:rounded-e-lg" : pill && "rounded-full" || "rounded-lg",
        shadow && "shadow-lg",
        shadow && coloredShadowClasses[color],
        $$props.disabled && "cursor-not-allowed opacity-50",
        $$props.class
      );
      return `${href ? `<a${spread(
        [
          { href: escape_attribute_value(href) },
          escape_object($$restProps),
          {
            class: escape_attribute_value(buttonClass)
          },
          { role: "button" }
        ],
        {}
      )}>${slots.default ? slots.default({}) : ``}</a>` : `${tag === "button" ? `<button${spread(
        [
          { type: escape_attribute_value(type) },
          escape_object($$restProps),
          {
            class: escape_attribute_value(buttonClass)
          }
        ],
        {}
      )}>${slots.default ? slots.default({}) : ``}</button>` : `${((tag$1) => {
        return tag$1 ? `<${tag}${spread(
          [
            escape_object($$restProps),
            {
              class: escape_attribute_value(buttonClass)
            }
          ],
          {}
        )}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
      })(tag)}`}`} `;
    });
  }
});

// .svelte-kit/output/server/entries/pages/buecher/_layout.svelte.js
var layout_svelte_exports2 = {};
__export(layout_svelte_exports2, {
  default: () => Layout2
});
var Layout2;
var init_layout_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/buecher/_layout.svelte.js"() {
    init_ssr();
    init_Button();
    Layout2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data } = $$props;
      console.log("data", data);
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      return `<div><div><nav><div class="grid grid-cols-2 md:grid-cols-4 m-5 gap-3 ">${each(data.categories, (category) => {
        return `${validate_component(Button, "Button").$$render($$result, { color: "blue", pill: true }, {}, {
          default: () => {
            return `<a href="${"/buecher/cat/" + escape(category.id, true)}">${escape(category.name)}</a> `;
          }
        })}`;
      })}</div></nav></div> ${slots.default ? slots.default({}) : ``}</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  component: () => component3,
  fonts: () => fonts3,
  imports: () => imports3,
  index: () => index3,
  stylesheets: () => stylesheets3,
  universal: () => layout_ts_exports,
  universal_id: () => universal_id2
});
var index3, component_cache3, component3, universal_id2, imports3, stylesheets3, fonts3;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    init_layout_ts();
    index3 = 2;
    component3 = async () => component_cache3 ?? (component_cache3 = (await Promise.resolve().then(() => (init_layout_svelte2(), layout_svelte_exports2))).default);
    universal_id2 = "src/routes/buecher/+layout.ts";
    imports3 = ["_app/immutable/nodes/2.D3LLTPm6.js", "_app/immutable/chunks/scheduler.zM5vpuro.js", "_app/immutable/chunks/index.Lc7HYTwW.js", "_app/immutable/chunks/each.D6YF6ztN.js", "_app/immutable/chunks/Button.DXAEX3aa.js", "_app/immutable/chunks/spread.CgU5AtxT.js", "_app/immutable/chunks/bundle-mjs.BTwrKG5i.js"];
    stylesheets3 = [];
    fonts3 = [];
  }
});

// .svelte-kit/output/server/chunks/supabaseClient.js
var supabase2;
var init_supabaseClient = __esm({
  ".svelte-kit/output/server/chunks/supabaseClient.js"() {
    init_module6();
    supabase2 = createClient(
      "https://noejjknzqcfnwzgrpfdi.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vZWpqa256cWNmbnd6Z3JwZmRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc0ODMyNDQsImV4cCI6MjAyMzA1OTI0NH0.pEqKPgopedqGbawDnrNssT_RjZBhr-IJoUx_9uWWv1c"
    );
  }
});

// .svelte-kit/output/server/entries/pages/produkte/_layout.ts.js
var layout_ts_exports2 = {};
__export(layout_ts_exports2, {
  load: () => load4
});
async function fetchCategories() {
  if (!cachedCategories) {
    console.log("getting Categories from supabase");
    const { data: categories2 } = await supabase2.from("productcategories").select("*").order("name");
    console.log("speichere Katgorien im Cache um zuk\xFCnftige Anfragen zu beschleunigen");
    cachedCategories = categories2;
    return categories2;
  }
  console.log("Getting Categories from Cache");
  return cachedCategories;
}
async function load4() {
  const { count } = await supabase2.from("products").select("*", { count: "exact", head: true });
  const categories2 = await fetchCategories();
  return {
    count,
    categories: categories2
  };
}
var cachedCategories;
var init_layout_ts2 = __esm({
  ".svelte-kit/output/server/entries/pages/produkte/_layout.ts.js"() {
    init_supabaseClient();
    cachedCategories = null;
    console.log("Produkt Layout wird initialisiert...");
  }
});

// .svelte-kit/output/server/entries/pages/produkte/_layout.svelte.js
var layout_svelte_exports3 = {};
__export(layout_svelte_exports3, {
  default: () => Layout3
});
var Hashtags, Layout3;
var init_layout_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/produkte/_layout.svelte.js"() {
    init_ssr();
    init_supabaseClient();
    Hashtags = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let topHashTags = [];
      return `<div class="bg-red-200 mt-10 p-3"><h2 data-svelte-h="svelte-1dglh44">Nicht das passende Produkt gefunden? W\xE4hle einen der folgenden beliebten Hashtags:</h2> <div class="col columns-3 md:columns-6 text-xs">${each(topHashTags, ({ tag, anzahl, hashtag_id }) => {
        return `<a href="${"/produkte/hashtag/" + escape(hashtag_id, true)}"><div class="border-2 mt-1 md:p-1 md:m-1 bg-red-50 border-red-300">${escape(tag)} (${escape(anzahl)})</div> </a>`;
      })}</div></div>`;
    });
    Layout3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data } = $$props;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      return `${$$result.head += `<!-- HEAD_svelte-tpw4bw_START -->${$$result.title = `<title>Produkte der alternativen Medizin - Die Preis und Suchmaschine f\xFCr alternative Medizin.</title>`, ""}<meta name="description" content="Entdecken Sie eine Vielzahl nat\xFCrlicher Produkte der alternativen Medizin und vergleichen Sie Preise mit unserer Preisvergleichs-Maschine. Unsere Produktgruppe bietet eine breite Auswahl an alternativen Naturprodukten, die darauf abzielen, die Gesundheit auf ganzheitliche Weise zu unterst\xFCtzen, ohne auf pharmazeutische Medikamente zur\xFCckzugreifen. Finden Sie die besten Angebote f\xFCr alternative Medizinprodukte und nutzen Sie unsere Plattform f\xFCr transparente Preisvergleiche."><!-- HEAD_svelte-tpw4bw_END -->`, ""} <div class="w-full p-3 text-xs bg-yellow-200 hover:bg-lime-300">${escape(data.count)} Produkte in der Datenbank gefunden. Bitte w\xE4hlen Sie eine Kategorie aus um Ihr Produkt schneller zu finden.</div> <div class="mb-5"><div><nav><div class="grid grid-cols-4 md:grid-cols-6 m-5 gap-3 ">${each(data.categories, (category) => {
        return `<a href="${"/produkte/cat/" + escape(category.category_id, true)}"><div class="w-full p-1 text-xs bg-green-100 hover:bg-yellow-300">${category.name === "Oele" ? `\xD6le` : `${escape(category.name)}`}</div> </a>`;
      })}</div></nav></div> ${slots.default ? slots.default({}) : ``} ${validate_component(Hashtags, "Hashtags").$$render($$result, {}, {}, {})}</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/3.js
var __exports4 = {};
__export(__exports4, {
  component: () => component4,
  fonts: () => fonts4,
  imports: () => imports4,
  index: () => index4,
  stylesheets: () => stylesheets4,
  universal: () => layout_ts_exports2,
  universal_id: () => universal_id3
});
var index4, component_cache4, component4, universal_id3, imports4, stylesheets4, fonts4;
var init__4 = __esm({
  ".svelte-kit/output/server/nodes/3.js"() {
    init_layout_ts2();
    index4 = 3;
    component4 = async () => component_cache4 ?? (component_cache4 = (await Promise.resolve().then(() => (init_layout_svelte3(), layout_svelte_exports3))).default);
    universal_id3 = "src/routes/produkte/+layout.ts";
    imports4 = ["_app/immutable/nodes/3.87wIb1J_.js", "_app/immutable/chunks/supabaseClient.CCJhsT86.js", "_app/immutable/chunks/index.C1t3ibtX.js", "_app/immutable/chunks/preload-helper.BQ24v_F8.js", "_app/immutable/chunks/scheduler.zM5vpuro.js", "_app/immutable/chunks/index.Lc7HYTwW.js", "_app/immutable/chunks/each.D6YF6ztN.js", "_app/immutable/chunks/getHashtags.DsRrQDEt.js"];
    stylesheets4 = [];
    fonts4 = [];
  }
});

// .svelte-kit/output/server/entries/pages/_page.svelte.js
var page_svelte_exports = {};
__export(page_svelte_exports, {
  default: () => Page
});
var Button2, Page;
var init_page_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_page.svelte.js"() {
    init_ssr();
    Button2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { text: text2 = "text" } = $$props;
      let { href = "#" } = $$props;
      if ($$props.text === void 0 && $$bindings.text && text2 !== void 0)
        $$bindings.text(text2);
      if ($$props.href === void 0 && $$bindings.href && href !== void 0)
        $$bindings.href(href);
      return `<a${add_attribute("href", href, 0)} class="hover:no-underline"><div class="bg-cyan-700 text-teal-200 rounded-lg w-48 h-16 p-1 m-1 md:p-2 md:m-2 text-center justify-center items-center hover:bg-teal-200 hover:text-cyan-700 font-semibold shadow">${escape(text2)}</div> </a>`;
    });
    Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<div class="p-3 space-y-5"><h1 class="" data-svelte-h="svelte-9q72nw">Willkommen auf cdl-protokolle.com</h1> <h2 data-svelte-h="svelte-f7aopr">Ihrer Quelle f\xFCr hochwertige Gesundheitsinformationen und wertvolle Tipps f\xFCr ein gesundes Leben!</h2> <div data-svelte-h="svelte-1uk3885">Wir freuen uns, Sie auf unserer Website begr\xFC\xDFen zu d\xFCrfen, wo wir Ihnen kostenlosen Zugang zu Leseproben aus einer Vielzahl erstklassiger Gesundheitsb\xFCcher bieten. Bei uns finden Sie zahlreiche Ratschl\xE4ge und Informationen, wie Sie Ihre Gesundheit verbessern und erhalten k\xF6nnen \u2013 und das alles ohne den Einsatz von Pharma-Medizin.</div> <div data-svelte-h="svelte-1cx01e6">Die Idee zu dieser Website entstand aus der gleichnamigen <a href="https://t.me/cdl_protokolle">Telegram-Gruppe</a>, in der wir zahlreiche Informationen sammeln und diskutieren. Unser Ziel ist es, diese Informationen noch besser zu organisieren und aufzubereiten, um sie Ihnen leicht zug\xE4nglich zu machen. Wir laden Sie herzlich ein, auch Mitglied unserer Telegram-Gruppe zu werden, um sich aktiv mit Gleichgesinnten auszutauschen und von weiteren Informationen zu profitieren. Sie k\xF6nnen der Gruppe unter folgendem Link beitreten: https://t.me/cdl_protokolle.</div> <div data-svelte-h="svelte-co2pvt">Tauchen Sie ein in die Welt der ganzheitlichen Gesundheit und entdecken Sie, wie Sie Ihr Wohlbefinden auf nat\xFCrliche Weise f\xF6rdern k\xF6nnen. Unsere Website bietet Ihnen eine F\xFClle von Ressourcen, um Ihnen auf Ihrem Weg zu einem ges\xFCnderen Lebensstil zu helfen. Viel Spa\xDF beim Lesen und Entdecken!</div> <div class="flex flex-col md:flex-row justify-center pl-20 md:pl-0">${validate_component(Button2, "Button").$$render(
        $$result,
        {
          text: "CDL Protokolle Telegram",
          href: "https://t.me/cdl_protokolle"
        },
        {},
        {}
      )} ${validate_component(Button2, "Button").$$render(
        $$result,
        {
          text: "Kontakt Feedback Verbesserungsvorschl\xE4ge",
          href: "https://t.me/cdlprotokollecom"
        },
        {},
        {}
      )}</div></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/4.js
var __exports5 = {};
__export(__exports5, {
  component: () => component5,
  fonts: () => fonts5,
  imports: () => imports5,
  index: () => index5,
  stylesheets: () => stylesheets5
});
var index5, component_cache5, component5, imports5, stylesheets5, fonts5;
var init__5 = __esm({
  ".svelte-kit/output/server/nodes/4.js"() {
    index5 = 4;
    component5 = async () => component_cache5 ?? (component_cache5 = (await Promise.resolve().then(() => (init_page_svelte(), page_svelte_exports))).default);
    imports5 = ["_app/immutable/nodes/4.HMNqUM8M.js", "_app/immutable/chunks/scheduler.zM5vpuro.js", "_app/immutable/chunks/index.Lc7HYTwW.js"];
    stylesheets5 = [];
    fonts5 = [];
  }
});

// .svelte-kit/output/server/entries/pages/admin/_page.svelte.js
var page_svelte_exports2 = {};
__export(page_svelte_exports2, {
  default: () => Page2
});
var Page2;
var init_page_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/admin/_page.svelte.js"() {
    init_ssr();
    init_Button();
    Page2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<div id="page"><h2 data-svelte-h="svelte-bela4g">Welcome to admin Dashboard</h2> ${validate_component(Button, "Button").$$render($$result, { href: "/admin/books" }, {}, {
        default: () => {
          return `Insert New Book`;
        }
      })}</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/5.js
var __exports6 = {};
__export(__exports6, {
  component: () => component6,
  fonts: () => fonts6,
  imports: () => imports6,
  index: () => index6,
  stylesheets: () => stylesheets6
});
var index6, component_cache6, component6, imports6, stylesheets6, fonts6;
var init__6 = __esm({
  ".svelte-kit/output/server/nodes/5.js"() {
    index6 = 5;
    component6 = async () => component_cache6 ?? (component_cache6 = (await Promise.resolve().then(() => (init_page_svelte2(), page_svelte_exports2))).default);
    imports6 = ["_app/immutable/nodes/5.BE7QnQtm.js", "_app/immutable/chunks/scheduler.zM5vpuro.js", "_app/immutable/chunks/index.Lc7HYTwW.js", "_app/immutable/chunks/Button.DXAEX3aa.js", "_app/immutable/chunks/spread.CgU5AtxT.js", "_app/immutable/chunks/bundle-mjs.BTwrKG5i.js"];
    stylesheets6 = [];
    fonts6 = [];
  }
});

// .svelte-kit/output/server/entries/pages/admin/books/_page.server.ts.js
var page_server_ts_exports = {};
__export(page_server_ts_exports, {
  actions: () => actions
});
async function extractFormData(formData) {
  const title = String(formData.get("title"));
  const img = new Array(String(formData.get("img")));
  const desc = String(formData.get("desc"));
  const label = String(formData.get("label"));
  const link = String(formData.get("link"));
  const tag = String(formData.get("tag"));
  const category = Number(formData.get("category"));
  return { title, img, desc, label, link, tag, category };
}
async function checkData(formData) {
  let isValid = true;
  const { title, img, desc, label, link, tag, category } = await extractFormData(formData);
  if (!title || !img || !desc || !label || !link || !tag || !category) {
    console.log("not valid");
    isValid = false;
  }
  return isValid;
}
async function getNewId(table) {
  console.log("neue id ermitteln");
  const { data: maxid, error: error2 } = await supabase2.from(table).select("id").order("id", { ascending: false }).limit(1).single();
  if (error2) {
    console.log("es gab einen fehler bei der ermittlung der id ", error2);
    return fail(400);
  }
  const id = Number(maxid.id) + 1;
  console.log("neue id ist ", table, id);
  return id;
}
async function createBook(formData) {
  const { title, img, desc } = await extractFormData(formData);
  const id = await getNewId("books");
  const { data, error: error2 } = await supabase2.from("books").insert({
    id,
    title,
    img,
    desc,
    active: true
  }).select();
  if (error2)
    console.log("There was an error creating the book", error2);
  console.log("data is ", data);
  return id;
}
async function addBookToCategories(formData, bookid) {
  const id = await getNewId("books_categories");
  const { category } = await extractFormData(formData);
  const { data, error: error2 } = await supabase2.from("books_categories").insert({
    id,
    book_id: bookid,
    category_id: category
  });
  if (error2) {
    console.log("Fehler in addBookToCategories ", error2);
    return fail(404);
  } else
    return true;
}
async function addBookLink(formData, bookid) {
  const id = await getNewId("booklinks");
  const { label, link } = await extractFormData(formData);
  const { data, error: error2 } = await supabase2.from("booklinks").insert({
    id,
    book_id: bookid,
    label,
    link
  });
  if (error2) {
    console.log("Fehler in addBookLink ", error2);
    return fail(404);
  } else
    return true;
}
var actions;
var init_page_server_ts = __esm({
  ".svelte-kit/output/server/entries/pages/admin/books/_page.server.ts.js"() {
    init_chunks();
    init_supabaseClient();
    console.log("adding Book");
    actions = {
      addBook: async ({ request }) => {
        const formData = await request.formData();
        if (await checkData(formData) == false) {
          console.log("fehlerhafte daten");
          return fail(400);
        }
        const id = await createBook(formData);
        addBookToCategories(formData, id);
        addBookLink(formData, id);
        console.log("neu erzeugte book id: ", id);
      }
    };
  }
});

// .svelte-kit/output/server/entries/pages/admin/books/_page.svelte.js
var page_svelte_exports3 = {};
__export(page_svelte_exports3, {
  default: () => Page3
});
var css2, Page3;
var init_page_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/admin/books/_page.svelte.js"() {
    init_ssr();
    css2 = {
      code: "form.svelte-t6kczv.svelte-t6kczv.svelte-t6kczv{margin:2.5rem\n}form.svelte-t6kczv>.svelte-t6kczv:not([hidden])~.svelte-t6kczv:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(1.25rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1.25rem * var(--tw-space-y-reverse))\n}button.svelte-t6kczv.svelte-t6kczv.svelte-t6kczv{--tw-bg-opacity:1;background-color:rgb(100 116 139 / var(--tw-bg-opacity));padding:0.75rem;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))\n}",
      map: null
    };
    Page3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css2);
      return `<h2 data-svelte-h="svelte-fv14bl">Add a new Book</h2> <form method="POST" action="?/addBook" class="grid grid-cols-1 svelte-t6kczv" data-svelte-h="svelte-1tzk7ca"><input type="text" name="title" placeholder="Titel" class="svelte-t6kczv"> <input type="text" name="img" placeholder="Bilder, kommasepariert" class="svelte-t6kczv"> <textarea name="desc" placeholder="Description" class="svelte-t6kczv"></textarea> <fieldset class="flex gap-5 svelte-t6kczv"><input name="label" type="text" placeholder="Label" class="w-1/4"> <input name="link" type="text" placeholder="Link" class="w-full"></fieldset> <input name="tag" type="text" placeholder="hashtags, kommasepariert" class="svelte-t6kczv"> <fieldset class="svelte-t6kczv"><input type="checkbox" id="gesundheit" name="category" value="1"> <label for="gesundheit">Gesundheit</label><br> <input type="checkbox" id="krisenvorsorge" name="category" value="2"> <label for="gesundheit">Krisenvorsorge</label><br> <input type="checkbox" id="medizinskandale" name="category" value="3"> <label for="gesundheit">Medizinskandale</label><br> <input type="checkbox" id="tiergesundheit" name="category" value="4"> <label for="tiergesundheit">Tiergesundheit</label><br></fieldset> <div class="svelte-t6kczv"><button class="svelte-t6kczv">Add Book</button></div> </form>`;
    });
  }
});

// .svelte-kit/output/server/nodes/6.js
var __exports7 = {};
__export(__exports7, {
  component: () => component7,
  fonts: () => fonts7,
  imports: () => imports7,
  index: () => index7,
  server: () => page_server_ts_exports,
  server_id: () => server_id2,
  stylesheets: () => stylesheets7
});
var index7, component_cache7, component7, server_id2, imports7, stylesheets7, fonts7;
var init__7 = __esm({
  ".svelte-kit/output/server/nodes/6.js"() {
    init_page_server_ts();
    index7 = 6;
    component7 = async () => component_cache7 ?? (component_cache7 = (await Promise.resolve().then(() => (init_page_svelte3(), page_svelte_exports3))).default);
    server_id2 = "src/routes/admin/books/+page.server.ts";
    imports7 = ["_app/immutable/nodes/6.HSPpErR1.js", "_app/immutable/chunks/scheduler.zM5vpuro.js", "_app/immutable/chunks/index.Lc7HYTwW.js"];
    stylesheets7 = ["_app/immutable/assets/6.a2MriB7A.css"];
    fonts7 = [];
  }
});

// .svelte-kit/output/server/entries/pages/auth/_page.js
var page_exports = {};
__export(page_exports, {
  load: () => load5
});
async function getSession() {
  console.log("start get session");
  const { data, error: error2 } = await supabase2.auth.getSession();
  if (error2) {
    console.log("error getSession");
    return false;
  } else {
    console.log("session from getSessioin is ", data.session);
    return data.session;
  }
}
async function load5({ session }) {
  const sessiondata = await getSession();
  console.log("server session: ", sessiondata);
  return sessiondata;
}
var init_page = __esm({
  ".svelte-kit/output/server/entries/pages/auth/_page.js"() {
    init_supabaseClient();
  }
});

// .svelte-kit/output/server/entries/pages/auth/_page.svelte.js
var page_svelte_exports4 = {};
__export(page_svelte_exports4, {
  default: () => Page4
});
var Page4;
var init_page_svelte4 = __esm({
  ".svelte-kit/output/server/entries/pages/auth/_page.svelte.js"() {
    init_ssr();
    init_chunks();
    init_Button();
    Page4 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data } = $$props;
      let email;
      let password;
      let session = data.session;
      console.log("client session: ", session);
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      return `<div id="page" class="bg-gray-100 h-96 justify-center flex flex-col">${!session ? `<form class="bg-white flex flex-col w-60 items-center m-auto mt-10 p-5 rounded-xl space-y-5"><input class="h-10 bg-white border-2 border-gray-300 w-full text-center" placeholder="Email" name="email"${add_attribute("value", email, 0)}> <input class="h-10 w-full border-2 border-gray-300 text-center" type="password" placeholder="Password" name="password"${add_attribute("value", password, 0)}> ${validate_component(Button, "Button").$$render($$result, { color: "green" }, {}, {
        default: () => {
          return `Log In`;
        }
      })}</form> <div class="m-auto"><h2 data-svelte-h="svelte-1vi77h7">No Account? Please Sign Up</h2> ${validate_component(Button, "Button").$$render($$result, { color: "green", class: "w-28" }, {}, {
        default: () => {
          return `Sign Up`;
        }
      })}</div>` : `${validate_component(Button, "Button").$$render($$result, { class: "w-28 m-auto" }, {}, {
        default: () => {
          return `Sign out`;
        }
      })}`}</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/7.js
var __exports8 = {};
__export(__exports8, {
  component: () => component8,
  fonts: () => fonts8,
  imports: () => imports8,
  index: () => index8,
  stylesheets: () => stylesheets8,
  universal: () => page_exports,
  universal_id: () => universal_id4
});
var index8, component_cache8, component8, universal_id4, imports8, stylesheets8, fonts8;
var init__8 = __esm({
  ".svelte-kit/output/server/nodes/7.js"() {
    init_page();
    index8 = 7;
    component8 = async () => component_cache8 ?? (component_cache8 = (await Promise.resolve().then(() => (init_page_svelte4(), page_svelte_exports4))).default);
    universal_id4 = "src/routes/auth/+page.js";
    imports8 = ["_app/immutable/nodes/7.BSPN-cuW.js", "_app/immutable/chunks/supabaseClient.CCJhsT86.js", "_app/immutable/chunks/index.C1t3ibtX.js", "_app/immutable/chunks/preload-helper.BQ24v_F8.js", "_app/immutable/chunks/scheduler.zM5vpuro.js", "_app/immutable/chunks/index.Lc7HYTwW.js", "_app/immutable/chunks/control.CYgJF_JY.js", "_app/immutable/chunks/Button.DXAEX3aa.js", "_app/immutable/chunks/spread.CgU5AtxT.js", "_app/immutable/chunks/bundle-mjs.BTwrKG5i.js"];
    stylesheets8 = [];
    fonts8 = [];
  }
});

// .svelte-kit/output/server/entries/pages/buecher/_page.server.js
var page_server_exports = {};
__export(page_server_exports, {
  load: () => load6
});
async function load6() {
  const title = "Buchempfehlungen. W\xE4hle eine der Kategorien um schneller das passende Buch zu finden. ";
  const { data } = await supabase2.from("books").select().eq("active", true);
  return {
    title,
    streamed: {
      books: data
    }
  };
}
var init_page_server = __esm({
  ".svelte-kit/output/server/entries/pages/buecher/_page.server.js"() {
    init_supabaseClient();
  }
});

// .svelte-kit/output/server/chunks/getBookImg.js
function getImg(filename, id, folder) {
  let img = "";
  const path = `/images/${folder}/`;
  if (!filename)
    img = path + "no_cover.jpeg";
  else
    img = path + id + "/" + filename;
  return img;
}
var init_getBookImg = __esm({
  ".svelte-kit/output/server/chunks/getBookImg.js"() {
  }
});

// .svelte-kit/output/server/chunks/book.js
var Book;
var init_book = __esm({
  ".svelte-kit/output/server/chunks/book.js"() {
    init_ssr();
    init_getBookImg();
    Book = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { book = { id: 0, img: "", title: "" } } = $$props;
      if ($$props.book === void 0 && $$bindings.book && book !== void 0)
        $$bindings.book(book);
      return `<div class="w-full h-[300px] "><div class="pt-2 overflow-auto"><a${add_attribute("href", `/buecher/${book.id}`, 0)}><img class="mx-auto" width="150"${add_attribute("src", getImg(book.img, book.id, "books"), 0)}${add_attribute("alt", book.title, 0)}></a> <div class="p-3"><a${add_attribute("href", `/buecher/${book.id}`, 0)}>${escape(book.title)}</a></div></div></div>`;
    });
  }
});

// .svelte-kit/output/server/chunks/Spinner.js
var Spinner;
var init_Spinner = __esm({
  ".svelte-kit/output/server/chunks/Spinner.js"() {
    init_ssr();
    init_bundle_mjs();
    Spinner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["color", "bg", "customColor", "size", "currentFill", "currentColor"]);
      let { color = "primary" } = $$props;
      let { bg = "text-gray-300" } = $$props;
      let { customColor = "" } = $$props;
      let { size = "8" } = $$props;
      let { currentFill = "currentFill" } = $$props;
      let { currentColor = "currentColor" } = $$props;
      let iconsize = `w-${size} h-${size}`;
      if (currentFill !== "currentFill") {
        color = void 0;
      }
      const fillColorClasses = {
        primary: "fill-primary-600",
        blue: "fill-blue-600",
        gray: "fill-gray-600 dark:fill-gray-300",
        green: "fill-green-500",
        red: "fill-red-600",
        yellow: "fill-yellow-400",
        pink: "fill-pink-600",
        purple: "fill-purple-600",
        white: "fill-white",
        custom: customColor
      };
      let fillColorClass = color === void 0 ? "" : fillColorClasses[color] ?? fillColorClasses.blue;
      if ($$props.color === void 0 && $$bindings.color && color !== void 0)
        $$bindings.color(color);
      if ($$props.bg === void 0 && $$bindings.bg && bg !== void 0)
        $$bindings.bg(bg);
      if ($$props.customColor === void 0 && $$bindings.customColor && customColor !== void 0)
        $$bindings.customColor(customColor);
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.currentFill === void 0 && $$bindings.currentFill && currentFill !== void 0)
        $$bindings.currentFill(currentFill);
      if ($$props.currentColor === void 0 && $$bindings.currentColor && currentColor !== void 0)
        $$bindings.currentColor(currentColor);
      return `<svg${spread(
        [
          escape_object($$restProps),
          { role: "status" },
          {
            class: escape_attribute_value(twMerge("inline -mt-px animate-spin dark:text-gray-600", iconsize, bg, fillColorClass, $$props.class))
          },
          { viewBox: "0 0 100 101" },
          { fill: "none" },
          { xmlns: "http://www.w3.org/2000/svg" }
        ],
        {}
      )}><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"${add_attribute("fill", currentColor, 0)}></path><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"${add_attribute("fill", currentFill, 0)}></path></svg> `;
    });
  }
});

// .svelte-kit/output/server/entries/pages/buecher/_page.svelte.js
var page_svelte_exports5 = {};
__export(page_svelte_exports5, {
  default: () => Page5
});
var Page5;
var init_page_svelte5 = __esm({
  ".svelte-kit/output/server/entries/pages/buecher/_page.svelte.js"() {
    init_ssr();
    init_book();
    init_Spinner();
    Page5 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data } = $$props;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      return `${$$result.head += `<!-- HEAD_svelte-1sal99i_START -->${$$result.title = `<title>Buchempfehlungen f\xFCr B\xFCcher der Gesundheit und alternativen Medizin</title>`, ""}<meta name="description" content="Die Bestseller aus der Medizin die die Pharma verbieten m\xF6chte. Die Titel sprechen f\xFCr sich. 'Gesundheit verboten'. 'Codex Humanus - Das Buch der Menschlichkeit', 'Zahnarztl\xFCgen'. Tauchen Sie ein in die Welt der 'Medizinskandale' und nehmen Sie Ihre Gesundheit in die eigene Hand. Niemand weiss besser als Sie was Ihr K\xF6rper braucht. Das notwendige Know-How zur Selbsthilfe finden Sie bei uns. "><!-- HEAD_svelte-1sal99i_END -->`, ""} <div class="px-2 m-2 border-2 "><h2>${escape(data.title)}</h2></div> <ul class="grid grid-cols-2 md:grid-cols-3">${function(__value) {
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
  }
});

// .svelte-kit/output/server/nodes/8.js
var __exports9 = {};
__export(__exports9, {
  component: () => component9,
  fonts: () => fonts9,
  imports: () => imports9,
  index: () => index9,
  server: () => page_server_exports,
  server_id: () => server_id3,
  stylesheets: () => stylesheets9
});
var index9, component_cache9, component9, server_id3, imports9, stylesheets9, fonts9;
var init__9 = __esm({
  ".svelte-kit/output/server/nodes/8.js"() {
    init_page_server();
    index9 = 8;
    component9 = async () => component_cache9 ?? (component_cache9 = (await Promise.resolve().then(() => (init_page_svelte5(), page_svelte_exports5))).default);
    server_id3 = "src/routes/buecher/+page.server.js";
    imports9 = ["_app/immutable/nodes/8.B2JDPRvN.js", "_app/immutable/chunks/scheduler.zM5vpuro.js", "_app/immutable/chunks/await_block.DV1PVPDO.js", "_app/immutable/chunks/index.Lc7HYTwW.js", "_app/immutable/chunks/each.D6YF6ztN.js", "_app/immutable/chunks/book.Cz4ZLkXb.js", "_app/immutable/chunks/getBookImg.B3agDJL6.js", "_app/immutable/chunks/Spinner.C4Jw4b_I.js", "_app/immutable/chunks/spread.CgU5AtxT.js", "_app/immutable/chunks/bundle-mjs.BTwrKG5i.js"];
    stylesheets9 = [];
    fonts9 = [];
  }
});

// .svelte-kit/output/server/chunks/bookDetails.js
async function getBookDetails(bookId) {
  try {
    const { data } = await supabase2.from("books").select("*").eq("id", bookId).limit(1).single();
    return { data };
  } catch (error2) {
    return {};
  }
}
async function getBooklinks(bookid) {
  try {
    const { data } = await supabase2.from("booklinks").select("label, link").eq("book_id", bookid);
    return data;
  } catch (error2) {
    return {};
  }
}
var init_bookDetails = __esm({
  ".svelte-kit/output/server/chunks/bookDetails.js"() {
    init_supabaseClient();
  }
});

// .svelte-kit/output/server/chunks/books.js
async function getBookIdsFromHashtagIds(hashtagIds) {
  let similarBooksIds = [];
  const { data: bookIds, error: error2 } = await supabase2.from("books_hashtags").select("book_id").in("hashtag_id", hashtagIds);
  if (error2)
    ;
  else {
    similarBooksIds = [...new Set(bookIds.map((row) => row.book_id))];
  }
  return similarBooksIds;
}
async function getBookIdsFromCatId(catId) {
  let catBookIds = [];
  const { data: bookIds, error: error2 } = await supabase2.from("books_categories").select("book_id").eq("category_id", catId);
  if (error2) {
    console.log("Fehler beim Abrufen der BookIds(catId)");
  } else {
    console.log("Keine Fehler");
    catBookIds = [...new Set(bookIds.map((row) => row.book_id))];
  }
  return catBookIds;
}
async function getCategoryNameById(catId) {
  console.log("funktion call getCategoryNameById");
  const { data } = await supabase2.from("categories").select("name").eq("id", catId);
  console.log("data ", data);
  return data[0].name;
}
async function getBook(id) {
  const { data, error: error2 } = await supabase2.from("books").select().eq("id", id).limit(1).single();
  if (error2)
    return null;
  else {
    return data;
  }
}
async function getBooksFromIds(ids) {
  const { data, error: books_err } = await supabase2.from("books").select().in("id", ids);
  if (books_err) {
    return null;
  } else {
    return data;
  }
}
async function getBookCategories() {
  const { data, error: categories_err } = await supabase2.from("categories").select();
  if (categories_err) {
    console.log("Fehler in der Abfrage");
    return null;
  } else {
    return data;
  }
}
var init_books = __esm({
  ".svelte-kit/output/server/chunks/books.js"() {
    init_supabaseClient();
  }
});

// .svelte-kit/output/server/chunks/getHashtags.js
async function getHashtag(id) {
  const { data, error: error2 } = await supabase2.from("hashtags").select("tag").eq("id", id).limit(1).single();
  if (error2) {
    throw new Error("Fehler beim Abrufen des Hashtag Namens: " + error2.message);
  }
  return data;
}
async function getHashtagIds(bookId) {
  const { data: hashtagsData, error: error2 } = await supabase2.from("books_hashtags").select("hashtag_id").eq("book_id", bookId);
  if (error2) {
    throw new Error("Fehler beim Abrufen der Hashtags: " + error2.message);
  }
  const hashtagIds = hashtagsData.map((row) => row.hashtag_id);
  return hashtagIds;
}
async function hashtagIdsToText(hashtagIds) {
  const { data: hashtags, error: hashtagError } = await supabase2.from("hashtags").select("tag").in("id", hashtagIds);
  if (hashtagError) {
    throw new Error("Fehler beim Abrufen der Hashtags: " + hashtagError.message);
  }
  return hashtags;
}
var init_getHashtags = __esm({
  ".svelte-kit/output/server/chunks/getHashtags.js"() {
    init_supabaseClient();
  }
});

// .svelte-kit/output/server/entries/pages/buecher/_bookId_/_page.js
var page_exports2 = {};
__export(page_exports2, {
  load: () => load7
});
async function load7({ params }) {
  let buchid = parseInt(params.bookId);
  let { data } = await getBookDetails(buchid);
  let hashtagIds = await getHashtagIds(buchid);
  let booklist = await getBookIdsFromHashtagIds(hashtagIds);
  return {
    data,
    streamed: {
      links: getBooklinks(buchid),
      similarBooks: getBooksFromIds(booklist),
      hashtags: hashtagIdsToText(hashtagIds)
    }
  };
}
var init_page2 = __esm({
  ".svelte-kit/output/server/entries/pages/buecher/_bookId_/_page.js"() {
    init_bookDetails();
    init_books();
    init_getHashtags();
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
      const noop4 = () => {
      };
      setContext("background", true);
      let { tag = $$restProps.href ? "a" : "div" } = $$props;
      let { color = "default" } = $$props;
      let { rounded = false } = $$props;
      let { border = false } = $$props;
      let { shadow = false } = $$props;
      let { node = void 0 } = $$props;
      let { use = noop4 } = $$props;
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

// .svelte-kit/output/server/entries/pages/buecher/_bookId_/_page.svelte.js
var page_svelte_exports6 = {};
__export(page_svelte_exports6, {
  default: () => Page6
});
function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
  const o = +getComputedStyle(node).opacity;
  return {
    delay,
    duration,
    easing,
    css: (t) => `opacity: ${t * o}`
  };
}
var TransitionFrame, ToolbarButton, CloseButton, baseClass, Badge, Page6;
var init_page_svelte6 = __esm({
  ".svelte-kit/output/server/entries/pages/buecher/_bookId_/_page.svelte.js"() {
    init_ssr();
    init_Frame();
    init_bundle_mjs();
    init_Button();
    init_Spinner();
    init_getBookImg();
    init_book();
    TransitionFrame = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
    ToolbarButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["color", "name", "ariaLabel", "size", "href"]);
      const background = getContext("background");
      let { color = "default" } = $$props;
      let { name: name2 = void 0 } = $$props;
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
      if ($$props.name === void 0 && $$bindings.name && name2 !== void 0)
        $$bindings.name(name2);
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
            "aria-label": escape_attribute_value(ariaLabel ?? name2)
          }
        ],
        {}
      )}>${name2 ? `<span class="sr-only">${escape(name2)}</span>` : ``} ${slots.default ? slots.default({ svgSize: svgSizes[size] }) : ``}</a>` : `<button${spread(
        [
          { type: "button" },
          escape_object($$restProps),
          {
            class: escape_attribute_value(buttonClass)
          },
          {
            "aria-label": escape_attribute_value(ariaLabel ?? name2)
          }
        ],
        {}
      )}>${name2 ? `<span class="sr-only">${escape(name2)}</span>` : ``} ${slots.default ? slots.default({ svgSize: svgSizes[size] }) : ``}</button>`} `;
    });
    CloseButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["name"]);
      let { name: name2 = "Close" } = $$props;
      if ($$props.name === void 0 && $$bindings.name && name2 !== void 0)
        $$bindings.name(name2);
      return `${validate_component(ToolbarButton, "ToolbarButton").$$render($$result, Object.assign({}, { name: name2 }, $$restProps, { class: twMerge("ms-auto", $$props.class) }), {}, {
        default: ({ svgSize }) => {
          return `<svg${add_attribute("class", svgSize, 0)} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>`;
        }
      })} `;
    });
    baseClass = "font-medium inline-flex items-center justify-center px-2.5 py-0.5";
    Badge = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
    Page6 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
      return `${$$result.head += `<!-- HEAD_svelte-5raxrm_START -->${$$result.title = `<title>${escape(title)}</title>`, ""}<meta name="description"${add_attribute("content", desc, 0)}><!-- HEAD_svelte-5raxrm_END -->`, ""} <div class="w-full flex flex-row bg-gray-100 justify-center"><img class="py-10" width="400"${add_attribute("alt", title, 0)}${add_attribute("src", img, 0)}></div> <div class="bg-yellow-100"><h2 class="bg-yellow-300 p-2">${escape(title)}</h2> <div class="p-5"><!-- HTML_TAG_START -->${desc}<!-- HTML_TAG_END --></div> <div class="my-5 pb-10 flex flex-col items-center ">${function(__value) {
        if (is_promise(__value)) {
          __value.then(null, noop);
          return ` <div class="loading">${validate_component(Spinner, "Spinner").$$render($$result, {}, {}, {})}
                Loading Shops ...</div> `;
        }
        return function(links) {
          return ` ${each(links, (link) => {
            return `<a${add_attribute("href", link.link, 0)} target="_blank">${validate_component(Button, "Button").$$render($$result, { class: "text-lg mt-3", color: "green" }, {}, {
              default: () => {
                return `${escape(link.label)} \u{1F6D2}`;
              }
            })} </a>`;
          })} `;
        }(__value);
      }(data.streamed.links)} <a href="${"https://www.amazon.de/gp/search?ie=UTF8&tag=jumex_online-21&linkCode=ur2&linkId=470bf27aa1feb315de9cb5f18b114f2f&camp=1638&creative=6742&index=books&keywords=" + escape(title, true)}" target="_blank">${validate_component(Button, "Button").$$render($$result, { class: "text-lg mt-3", color: "light" }, {}, {
        default: () => {
          return `<img width="100" alt="Amazon Logo" src="/images/logos/Amazon.de-Logo.svg.png">`;
        }
      })}</a> <a href="${"https://www.ebay.de/sch/i.html?_from=R40&_trksid=p4432023.m570.l1313&_nkw=" + escape(title, true) + "&_sacat=0"}" target="_blank">${validate_component(Button, "Button").$$render($$result, { class: "text-lg mt-3", color: "light" }, {}, {
        default: () => {
          return `<img width="100" alt="Ebay Logo" src="/images/logos/EBay_logo.png">`;
        }
      })}</a></div></div> <div class="bg-teal-100"><div class="p-2 w-full mt-5 bg-teal-300 text-lg font-bold text-center" data-svelte-h="svelte-ooggy2">Stichw\xF6rter:</div> <div class="p-5 flex flex-row justify-center ">${function(__value) {
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
      }(data.streamed.hashtags)}</div></div> <div class="bg-lime-100"><div class="w-full my-5 bg-lime-300 p-3 text-lg font-bold text-center" data-svelte-h="svelte-nfoxyh">\xC4hnliche B\xFCcher:</div> <ul class="grid grid-cols-2 md:grid-cols-3">${function(__value) {
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
  }
});

// .svelte-kit/output/server/nodes/9.js
var __exports10 = {};
__export(__exports10, {
  component: () => component10,
  fonts: () => fonts10,
  imports: () => imports10,
  index: () => index10,
  stylesheets: () => stylesheets10,
  universal: () => page_exports2,
  universal_id: () => universal_id5
});
var index10, component_cache10, component10, universal_id5, imports10, stylesheets10, fonts10;
var init__10 = __esm({
  ".svelte-kit/output/server/nodes/9.js"() {
    init_page2();
    index10 = 9;
    component10 = async () => component_cache10 ?? (component_cache10 = (await Promise.resolve().then(() => (init_page_svelte6(), page_svelte_exports6))).default);
    universal_id5 = "src/routes/buecher/[bookId]/+page.js";
    imports10 = ["_app/immutable/nodes/9.CtJIDtn1.js", "_app/immutable/chunks/supabaseClient.CCJhsT86.js", "_app/immutable/chunks/index.C1t3ibtX.js", "_app/immutable/chunks/preload-helper.BQ24v_F8.js", "_app/immutable/chunks/books.DUWMxUuU.js", "_app/immutable/chunks/getHashtags.DsRrQDEt.js", "_app/immutable/chunks/scheduler.zM5vpuro.js", "_app/immutable/chunks/await_block.DV1PVPDO.js", "_app/immutable/chunks/index.Lc7HYTwW.js", "_app/immutable/chunks/each.D6YF6ztN.js", "_app/immutable/chunks/spread.CgU5AtxT.js", "_app/immutable/chunks/index.CyWKpHfw.js", "_app/immutable/chunks/bundle-mjs.BTwrKG5i.js", "_app/immutable/chunks/Button.DXAEX3aa.js", "_app/immutable/chunks/Spinner.C4Jw4b_I.js", "_app/immutable/chunks/getBookImg.B3agDJL6.js", "_app/immutable/chunks/book.Cz4ZLkXb.js"];
    stylesheets10 = [];
    fonts10 = [];
  }
});

// .svelte-kit/output/server/chunks/categories.js
async function getCategoryNameById2(catid) {
  console.log("getCategoryNameById: ", catid);
  const { data, error: error2 } = await supabase2.from("categories").select("name").eq("id", catid).single();
  return data?.name;
}
async function getCategoryDescription(catid) {
  const { data, error: error2 } = await supabase2.from("categories").select("description").eq("id", catid).single();
  try {
    if (data && data.description) {
      return data.description;
    } else {
      return null;
    }
  } catch (error22) {
    return null;
  }
}
var init_categories = __esm({
  ".svelte-kit/output/server/chunks/categories.js"() {
    init_supabaseClient();
  }
});

// .svelte-kit/output/server/entries/pages/buecher/cat/_catid_/_page.ts.js
var page_ts_exports = {};
__export(page_ts_exports, {
  load: () => load8
});
async function load8({ params }) {
  const catid = params.catid;
  const bookIds = await getBookIdsFromCatId(parseInt(catid));
  const catname = await getCategoryNameById(parseInt(catid));
  const bookcategories = getBookCategories();
  const title = catname + " B\xFCcher | cdl-protokolle.com";
  const metaDescription = await getCategoryDescription(parseInt(catid));
  const data = { catid, catname, bookcategories, title, metaDescription };
  return {
    data,
    streamed: {
      books: getBooksFromIds(bookIds)
    }
  };
}
var init_page_ts = __esm({
  ".svelte-kit/output/server/entries/pages/buecher/cat/_catid_/_page.ts.js"() {
    init_books();
    init_categories();
  }
});

// .svelte-kit/output/server/entries/pages/buecher/cat/_catid_/_page.svelte.js
var page_svelte_exports7 = {};
__export(page_svelte_exports7, {
  default: () => Page7
});
var Page7;
var init_page_svelte7 = __esm({
  ".svelte-kit/output/server/entries/pages/buecher/cat/_catid_/_page.svelte.js"() {
    init_ssr();
    init_book();
    init_Spinner();
    Page7 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let catid;
      let { data } = $$props;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      catid = parseInt(data.data.catid) - 1;
      return `${$$result.head += `<!-- HEAD_svelte-1x4ga1y_START -->${$$result.title = `<title>${escape(data.data.title)}</title>`, ""}<meta name="description"${add_attribute("content", data.data.metaDescription, 0)}><!-- HEAD_svelte-1x4ga1y_END -->`, ""} <div class="px-2 m-2 border-2 "><h2>B\xFCcher der Kategorie  ${escape(data.categories[catid].name)}</h2> <div>${escape(data.data.metaDescription)}</div></div> <ul class="grid grid-cols-2 md:grid-cols-3 bg-gray-100">${function(__value) {
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
  }
});

// .svelte-kit/output/server/nodes/10.js
var __exports11 = {};
__export(__exports11, {
  component: () => component11,
  fonts: () => fonts11,
  imports: () => imports11,
  index: () => index11,
  stylesheets: () => stylesheets11,
  universal: () => page_ts_exports,
  universal_id: () => universal_id6
});
var index11, component_cache11, component11, universal_id6, imports11, stylesheets11, fonts11;
var init__11 = __esm({
  ".svelte-kit/output/server/nodes/10.js"() {
    init_page_ts();
    index11 = 10;
    component11 = async () => component_cache11 ?? (component_cache11 = (await Promise.resolve().then(() => (init_page_svelte7(), page_svelte_exports7))).default);
    universal_id6 = "src/routes/buecher/cat/[catid]/+page.ts";
    imports11 = ["_app/immutable/nodes/10.CaJeoWlS.js", "_app/immutable/chunks/books.DUWMxUuU.js", "_app/immutable/chunks/supabaseClient.CCJhsT86.js", "_app/immutable/chunks/index.C1t3ibtX.js", "_app/immutable/chunks/preload-helper.BQ24v_F8.js", "_app/immutable/chunks/categories.VNeXaOrY.js", "_app/immutable/chunks/scheduler.zM5vpuro.js", "_app/immutable/chunks/await_block.DV1PVPDO.js", "_app/immutable/chunks/index.Lc7HYTwW.js", "_app/immutable/chunks/each.D6YF6ztN.js", "_app/immutable/chunks/book.Cz4ZLkXb.js", "_app/immutable/chunks/getBookImg.B3agDJL6.js", "_app/immutable/chunks/Spinner.C4Jw4b_I.js", "_app/immutable/chunks/spread.CgU5AtxT.js", "_app/immutable/chunks/bundle-mjs.BTwrKG5i.js"];
    stylesheets11 = [];
    fonts11 = [];
  }
});

// .svelte-kit/output/server/entries/pages/cdl-protokolle/_page.svelte.js
var page_svelte_exports8 = {};
__export(page_svelte_exports8, {
  default: () => Page8
});
var Accordion, AccordionItem, telegram, Fraguns, css$r, A, css$q, Ai, css$p, B, css$o, C, css$n, D, css$m, E, css$l, F, css$k, G, css$j, H, css$i, I, css$h, J, css$g, K, css$f, L, css$e, M, css$d, N, css$c, O, css$b, P, css$a, Pzwei, css$9, Q, css$8, R, css$7, S, css$6, T, css$5, U, css$4, V, css$3, W, css$2, X, css$1, Y, css3, Z, Page8;
var init_page_svelte8 = __esm({
  ".svelte-kit/output/server/entries/pages/cdl-protokolle/_page.svelte.js"() {
    init_ssr();
    init_index2();
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
      code: "div.svelte-v6hy84{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-v6hy84{font-weight:500;--tw-text-opacity:1;color:rgb(28 100 242 / var(--tw-text-opacity))\n}a.svelte-v6hy84:hover{text-decoration-line:underline\n}.svelte-v6hy84:is(.dark a){--tw-text-opacity:1;color:rgb(63 131 248 / var(--tw-text-opacity))\n}",
      map: null
    };
    G = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$k);
      return `<div class="svelte-v6hy84" data-svelte-h="svelte-1mxaq1k">Dieses Protokoll kann man auf verschiedene Arten f\xFCr gro\xDFe und kleine Fl\xE4chen benutzen:

	<div class="svelte-v6hy84">\u{1F449} <a class="link svelte-v6hy84" href="https://t.me/cdl_protokolle/19">1. Gasprotokoll</a> bei einer kleinen Fl\xE4che: Man kann die Substanz in einem Glas aktivieren, um kleine Fl\xE4chen zu behandeln oder Teile des K\xF6rpers zu desinfizieren.</div> <div class="svelte-v6hy84">\u{1F449} <a href="https://t.me/cdl_protokolle/20" class="svelte-v6hy84">2. Sackprotokoll</a> bei gro\xDFen Fl\xE4chen: Man kann es in einem Gef\xE4\xDF in einem gro\xDFen Sack aktivieren, um gro\xDFe Hautfl\xE4chen oder sogar den ganzen K\xF6rper zu behandeln.</div></div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/16" }, {}, {})}`;
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
      code: "div.svelte-v6hy84{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-v6hy84{font-weight:500;--tw-text-opacity:1;color:rgb(28 100 242 / var(--tw-text-opacity))\n}a.svelte-v6hy84:hover{text-decoration-line:underline\n}.svelte-v6hy84:is(.dark a){--tw-text-opacity:1;color:rgb(63 131 248 / var(--tw-text-opacity))\n}",
      map: null
    };
    I = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$i);
      return `<div class="svelte-v6hy84" data-svelte-h="svelte-jsjowu">Dieses Protokoll hat der Autor Andreas Kalcker leider nicht f\xFCr die Online Publikation freigegeben. 
Sie finden dieses und viele andere wertvolle Informationen in seinem Buch <a href="/buecher/4" class="svelte-v6hy84">\u{1F4D5} Gesundheit verboten</a>. 

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
      code: "div.svelte-1nors9r{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-1nors9r{font-weight:500;--tw-text-opacity:1;color:rgb(28 100 242 / var(--tw-text-opacity))\n}a.svelte-1nors9r:hover{text-decoration-line:underline\n}.svelte-1nors9r:is(.dark a){--tw-text-opacity:1;color:rgb(63 131 248 / var(--tw-text-opacity))\n}",
      map: null
    };
    K = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$g);
      return `<div class="svelte-1nors9r" data-svelte-h="svelte-11nyutj"><div class="svelte-1nors9r">Anwendungsprotokoll: Bei fast allen Hautkrankheiten wie Akne, Schuppenflechte, Ausschlag, Fu\xDFpilz, Wunden usw., wendet man aktiviertes CD normalerweise direkt auf der Haut an und anschlie\xDFend <a href="https://bit.ly/3zwb7Gp" class="svelte-1nors9r">\u{1F449} DMSO</a>  st\xFCndlich bis zu 10-mal am Tag. Hierzu mischt man 20 Tropfen aktiviertes CD mit 50ml Wasser in einer Spr\xFChflasche. Diese stabilen L\xF6sungen halten mehrere Tage, bis zu einer Woche und l\xE4nger, wenn man sie k\xFChl und im Dunkeln aufbewahrt, in Kristallbeh\xE4ltern sogar Monate. Anschlie\xDFend werden drei Teel\xF6ffel DMSO + ein Teel\xF6ffel Wasser in ein kleines Glas gegeben. Es sollten keine ABS- oder PET-Plastikflaschen oder Gummihandschuhe verwendet werden, da sich diese durch das DMSO aufl\xF6sen k\xF6nnten und so \xFCber die Haut aufgenommen werden! PE- oder HDPE-Flaschen sind richtig. CD wird bis zu maximal 10-mal am Tag angewendet. Man spr\xFCht es dazu auf die Haut und reibt das verd\xFCnnte DMSO danach mit der Hand ein. Bei einer weitl\xE4ufigeren Behandlung wechselt man jede Stunde den Teil der Haut, der behandelt wird. Dieser Vorgang wird 3 Tage die Woche durchgef\xFChrt und anschlie\xDFend gibt man der Haut 4 Tage, um sich zu regenerieren. Sollte die Haut \xFCberm\xE4\xDFig aus-trocknen, muss man die L\xF6sungen st\xE4rker verd\xFCnnen oder die Haut mit Aloe Vera oder nativem Oliven\xF6l einreiben, um sie zu beruhigen. Sollte die Haut zu trocken sein und ein Ausschlag auftreten, reduzieren Sie die Dosis oder unterbrechen Sie die Behandlung.</div> <div class="svelte-1nors9r">DMSO sollte auf keinen Fall in Flaschen mit einer Gummiaufsatz aufbewahrt werden, da es diesen aufl\xF6st und die L\xF6sung verunreinigt.</div> <div class="svelte-1nors9r">Man benutzt es nicht f\xFCr Einl\xE4ufe, da ansonsten die vorhandenen Giftstoffe im Darm reabsorbiert w\xFCrden.</div></div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/23" }, {}, {})}`;
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
      code: "div.svelte-1vu6m8j{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-1vu6m8j{font-weight:500;--tw-text-opacity:1;color:rgb(28 100 242 / var(--tw-text-opacity))\n}a.svelte-1vu6m8j:hover{text-decoration-line:underline\n}.svelte-1vu6m8j:is(.dark a){--tw-text-opacity:1;color:rgb(63 131 248 / var(--tw-text-opacity))\n}",
      map: null
    };
    P = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$b);
      return `<div class="svelte-1vu6m8j" data-svelte-h="svelte-9hzc2v"><div class="svelte-1vu6m8j">Behandlung:</div> <div class="svelte-1vu6m8j">Hinweis: Diese Behandlung verwendet keine systemischen Medikamente gegen Parasiten, die vom K\xF6rper aufgenommen werden. Hierf\xFCr ist ein hochkar\xE4tiger Zapper wie der Biotrohn\xAE besser, da er die Parasiten im Blut ohne Vergiftungen beseitigt. Dieses Protokoll wurde entwickelt, um auch bei Kindern aufgrund der Dauer und Dosis Anwendung zu finden, ohne eine \xFCberm\xE4\xDFige toxische Ladung im Blut oder im K\xF6rper zu verursachen. Man darf Mebendazol nicht mit Albendazol (Albenza) verwechseln, da dieses sehr wohl systemisch eingesetzt wird und eine \xE4rztliche Verschreibung ben\xF6tigt. Wenn Sie von einem eindeutigen Parasitenbefall im Blut ausgehen, sollten Sie das zur Best\xE4tigung mit einem Arzt besprechen, und nur dann die systemischen Anti-Parasitenmittel anwenden, die \u2013 je nach Einsch\xE4tzung des Arztes \u2013 vom Blut aufgenommen werden w\xFCrden.</div> <div class="svelte-1vu6m8j"><div class="svelte-1vu6m8j">Tag 1</div> <ul class="svelte-1vu6m8j"><li class="svelte-1vu6m8j">\u{1F4A7}Pyrantel-Pamoat (eine einzige Dosis morgens) 10mg/kg, die in einer einzigen Einnahme mit irgendeiner Fl\xFCssigkeit verabreicht wird. Falls es in fl\xFCssiger Form vorhanden ist, enth\xE4lt ein Teel\xF6ffel mit 5ml 250mg (f\xFCr 60kg 3 Teel\xF6ffel mit 5ml). In Form von Pillen nimmt man 3 bei 60kg.</li> <li class="svelte-1vu6m8j">\u{1F4A7}Kieselalgenerde (zwei Dosen): Ein Teel\xF6ffel zweimal am Tag mit dem Essen, am besten fl\xFCssig. Morgens und nachmittags.</li></ul></div> <div class="svelte-1vu6m8j"><p class="svelte-1vu6m8j">Tag 2</p> <ul class="svelte-1vu6m8j"><li class="svelte-1vu6m8j">\u{1F4A7}Mebendazol (zwei Dosen) 100mg alle 12 Stunden. Eine Pille morgens und eine abends.</li> <li class="svelte-1vu6m8j">\u{1F4A7}Kieselalgenerde (zwei Dosen): Ein Teel\xF6ffel zweimal am Tag mit dem Essen, am besten fl\xFCssig. Morgens und nachmittags.</li> <li class="svelte-1vu6m8j">\u{1F4A7}Einlauf: Zus\xE4tzliche Ausstattung erforderlich (2 Liter Einlauf)</li></ul></div> <div class="svelte-1vu6m8j"><p class="svelte-1vu6m8j">Tag 3</p> <ul class="svelte-1vu6m8j"><li class="svelte-1vu6m8j">\u{1F4A7} <a href="https://www.kopp-verlag.de/a/kopp-vital-rizinusoel-nativ-ph.-eur.-250-ml-3?&6=28189485&otpcytokenid=28189485" class="svelte-1vu6m8j">\u{1F449} Rizinus\xF6l</a>, 2 Suppenl\xF6ffel (geschmacklos aus der Apotheke) auf n\xFCchternen Magen.</li> <li class="svelte-1vu6m8j">\u{1F4A7}Mebendazol (2 Dosen) 100mg alle 12 Stunden. Eine Pille morgens und eine abends.</li> <li class="svelte-1vu6m8j">\u{1F4A7}Kieselalgenerde (zwei Dosen): Ein Teel\xF6ffel zweimal am Tag mit dem Essen, am besten fl\xFCssig morgens und nachmittags.</li> <li class="svelte-1vu6m8j">\u{1F4A7}Einlauf.</li></ul></div> <div class="svelte-1vu6m8j"><p class="svelte-1vu6m8j">Tag 4</p> <ul class="svelte-1vu6m8j"><li class="svelte-1vu6m8j">\u{1F4A7}Mebendazol (zwei Dosen) 100mg alle 12 Stunden. Eine Pille morgens und eine abends.</li> <li class="svelte-1vu6m8j">\u{1F4A7}Kieselalgenerde (2 Dosen): Ein Teel\xF6ffel zweimal am Tag mit dem Essen, am besten fl\xFCssig morgens und nachmittags.</li> <li class="svelte-1vu6m8j">\u{1F4A7}Einlauf.</li></ul></div> <div class="svelte-1vu6m8j"><p class="svelte-1vu6m8j">Tag 5</p> <ul class="svelte-1vu6m8j"><li class="svelte-1vu6m8j">\u{1F4A7}Pyrantel-Pamoat (eine einzige Dosis) 10mg/kg, die in einer einzigen Einnahme mit irgendeiner Fl\xFCssigkeit verabreicht wird. Falls es in fl\xFCssiger Form vorhanden ist, enth\xE4lt ein Teel\xF6ffel mit 5ml 250mgr (f\xFCr 60kg 3 Teel\xF6ffel mit 5ml). In Form von Pillen nimmt man 3 bei 60kg.</li> <li class="svelte-1vu6m8j">\u{1F4A7}Kieselalgenerde (2 Dosen): Ein Teel\xF6ffel zweimal am Tag mit dem Essen, am besten fl\xFCssig morgens und nachmittags.</li> <li class="svelte-1vu6m8j">\u{1F4A7}Einlauf</li></ul></div> <div class="svelte-1vu6m8j"><p class="svelte-1vu6m8j">Tag 6</p> <ul class="svelte-1vu6m8j"><li class="svelte-1vu6m8j">\u{1F4A7} <a href="https://www.kopp-verlag.de/a/kopp-vital-rizinusoel-nativ-ph.-eur.-250-ml-3?&6=28189485&otpcytokenid=28189485" class="svelte-1vu6m8j">\u{1F449} Rizinus\xF6l</a>, 2 Suppenl\xF6ffel (geschmacklos aus der Apotheke) auf n\xFCchternen Magen.</li> <li class="svelte-1vu6m8j">\u{1F4A7}Mebendazol (2 Dosen) 100mg alle 12 Stunden. Eine Pille morgens und eine abends.</li> <li class="svelte-1vu6m8j">\u{1F4A7}Kieselalgenerde (zwei Dosen): Ein Teel\xF6ffel zweimal am Tag mit dem Essen, am besten fl\xFCssig morgens und nachmittags.</li> <li class="svelte-1vu6m8j">\u{1F4A7}Einlauf.</li></ul></div> <div class="svelte-1vu6m8j"><p class="svelte-1vu6m8j">Tag 7</p> <ul class="svelte-1vu6m8j"><li class="svelte-1vu6m8j">\u{1F4A7}Mebendazol 100mg alle 12 Stunden. Eine Pille morgens und eine abends.</li> <li class="svelte-1vu6m8j">\u{1F4A7}Kieselalgenerde: Ein Teel\xF6ffel zweimal am Tag mit dem Essen, am besten fl\xFCssig morgens und nachmittags.</li> <li class="svelte-1vu6m8j">\u{1F4A7}Einlauf.</li></ul></div> <div class="svelte-1vu6m8j"><p class="svelte-1vu6m8j">Tag 8</p> <ul class="svelte-1vu6m8j"><li class="svelte-1vu6m8j">\u{1F4A7}Mebendazol 100mg alle 12 Stunden. Eine Pille morgens und eine abends.</li> <li class="svelte-1vu6m8j">\u{1F4A7}Kieselalgenerde: Ein Teel\xF6ffel zweimal am Tag mit dem Essen, am besten fl\xFCssig morgens und nachmittags.</li> <li class="svelte-1vu6m8j">\u{1F4A7}Einlauf.</li></ul></div> <div class="svelte-1vu6m8j"><p class="svelte-1vu6m8j">Tag 9 bis 18 (Erster Monat)</p> <ul class="svelte-1vu6m8j"><li class="svelte-1vu6m8j">\u{1F4A7} <a href="https://www.kopp-verlag.de/a/kopp-vital-rizinusoel-nativ-ph.-eur.-250-ml-3?&6=28189485&otpcytokenid=28189485" class="svelte-1vu6m8j">\u{1F449} Rizinus\xF6l</a>, 2 Suppenl\xF6ffel (geschmacklos aus der Apotheke) auf n\xFCchternen Magen.  Je nach Bedarf der einzelnen Person wiederholen. Bei ununterbrochenem Durchfall auslassen.</li> <li class="svelte-1vu6m8j">\u{1F4A7}Kieselalgenerde: Ein Teel\xF6ffel zweimal am Tag mit dem Essen, am besten fl\xFCssig morgens und nachmittags.</li> <li class="svelte-1vu6m8j">\u{1F4A7}Niemaufguss (Azadirachta Indica) (9 Tage). 3 gestrichene Teel\xF6ffel in einem Liter Wasser. 5 Minuten lang kochen und den ganzen Tag \xFCber trinken. Sie k\xF6nnen auch Niemkapseln benutzen, da der Aufguss sehr bitter ist.</li> <li class="svelte-1vu6m8j">\u{1F4A7}Einl\xE4ufe so ununterbrochen wie m\xF6glich</li></ul></div></div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/28" }, {}, {})}`;
    });
    css$a = {
      code: "div.svelte-1vu6m8j{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-1vu6m8j{font-weight:500;--tw-text-opacity:1;color:rgb(28 100 242 / var(--tw-text-opacity))\n}a.svelte-1vu6m8j:hover{text-decoration-line:underline\n}.svelte-1vu6m8j:is(.dark a){--tw-text-opacity:1;color:rgb(63 131 248 / var(--tw-text-opacity))\n}",
      map: null
    };
    Pzwei = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$a);
      return `<div class="svelte-1vu6m8j" data-svelte-h="svelte-1lvkqrx"><div class="svelte-1vu6m8j">Tag 9 bis 18 (Zweiter Monat)</div> <div class="svelte-1vu6m8j"><ul class="svelte-1vu6m8j"><li class="svelte-1vu6m8j">\u{1F4A7} <a href="https://www.kopp-verlag.de/a/kopp-vital-rizinusoel-nativ-ph.-eur.-250-ml-3?&6=28189485&otpcytokenid=28189485" class="svelte-1vu6m8j">\u{1F449} Rizinus\xF6l</a> , 2 Suppenl\xF6ffel (geschmacklos aus der Apotheke) auf n\xFCchternen Magen.</li> <li class="svelte-1vu6m8j">\u{1F4A7}Je nach Bedarf der einzelnen Person wiederholen. Bei ununterbrochenem Durchfall auslassen.</li> <li class="svelte-1vu6m8j">\u{1F4A7}Kieselalgenerde: Ein Teel\xF6ffel zweimal am Tag mit dem Essen, am besten fl\xFCssig morgens und nachmittags.</li> <li class="svelte-1vu6m8j">\u{1F4A7}Epazotenaufguss (Dysphania ambrosioides/Mexikanischer Dr\xFCseng\xE4nsfu\xDF) (3 Tage). 1 oder 2 Essl\xF6ffel der Bl\xE4tter in einem Liter Wasser 10 Minuten lang kochen, ziehen lassen und filtern. 1 Tasse auf n\xFCchternen Magen 3 aufeinander folgende Tage lang trinken.</li> <li class="svelte-1vu6m8j">\u{1F4A7}Die restlichen Tage Aloe Vera Gel mit Saft oder Wasser auf n\xFCchternen Magen trinken.</li> <li class="svelte-1vu6m8j">\u{1F4A7}Einl\xE4ufe so ununterbrochen wie m\xF6glich.</li></ul></div> <div class="svelte-1vu6m8j"><div class="svelte-1vu6m8j">Tag 9 bis 18 (Dritter Monat)</div> <ul class="svelte-1vu6m8j"><li class="svelte-1vu6m8j">\u{1F4A7}<a href="https://www.kopp-verlag.de/a/kopp-vital-rizinusoel-nativ-ph.-eur.-250-ml-3?&6=28189485&otpcytokenid=28189485" class="svelte-1vu6m8j">\u{1F449} Rizinus\xF6l</a>, 2 Suppenl\xF6ffel (geschmacklos aus der Apotheke) auf n\xFCchternen Magen. Je nach Bedarf der einzelnen Person wiederholen. Bei ununterbro-chenem Durchfall auslassen.</li> <li class="svelte-1vu6m8j">\u{1F4A7}Kieselalgenerde: Ein Teel\xF6ffel zweimal am Tag mit dem Essen, am besten fl\xFCssig morgens und nachmittags.</li> <li class="svelte-1vu6m8j">\u{1F4A7}Niemaufguss. 9 Tage lang oder ein alternativer Anti-Parasitentee.</li> <li class="svelte-1vu6m8j">\u{1F4A7}Einl\xE4ufe so ununterbrochen wie m\xF6glich.</li> <li class="svelte-1vu6m8j">\u{1F4A7}Falls nach dem dritten Monat immer noch Parasiten oder gro\xDFe Mengen an Schleim ausgeschieden werden, kann man mit dem Protokoll fortfahren und nochmal bei Monat 2 anfangen.</li></ul></div> <div class="svelte-1vu6m8j"><p class="svelte-1vu6m8j">\u2757\uFE0FBeachten Sie folgende Hinweise:</p> <p class="m-5 svelte-1vu6m8j">Mebendazol (Vermox) zeigt keine Wechselwirkungen mit Chlordioxid, aber wohl mit den folgenden Arzneimitteln:</p> <ul class="list-disc mt-5 ml-20 svelte-1vu6m8j"><li class="svelte-1vu6m8j">Tagamet (Cimetidin)</li> <li class="svelte-1vu6m8j">Ethotoin</li> <li class="svelte-1vu6m8j">Penizillin</li> <li class="svelte-1vu6m8j">Zithromax (Azithromycin)</li> <li class="svelte-1vu6m8j">Amoxicillin</li> <li class="svelte-1vu6m8j">Mephenytoin</li> <li class="svelte-1vu6m8j">Carbamazepin</li> <li class="svelte-1vu6m8j">Flagyl (Metronidazol)</li></ul></div></div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/30" }, {}, {})}`;
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
      code: "div.svelte-v6hy84{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-v6hy84{font-weight:500;--tw-text-opacity:1;color:rgb(28 100 242 / var(--tw-text-opacity))\n}a.svelte-v6hy84:hover{text-decoration-line:underline\n}.svelte-v6hy84:is(.dark a){--tw-text-opacity:1;color:rgb(63 131 248 / var(--tw-text-opacity))\n}",
      map: null
    };
    T = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$6);
      return `<div class="svelte-v6hy84" data-svelte-h="svelte-jsjowu">Dieses Protokoll hat der Autor Andreas Kalcker leider nicht f\xFCr die Online Publikation freigegeben. 
Sie finden dieses und viele andere wertvolle Informationen in seinem Buch <a href="/buecher/4" class="svelte-v6hy84">\u{1F4D5} Gesundheit verboten</a>. 

</div>`;
    });
    css$5 = {
      code: "div.svelte-v6hy84{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-v6hy84{font-weight:500;--tw-text-opacity:1;color:rgb(28 100 242 / var(--tw-text-opacity))\n}a.svelte-v6hy84:hover{text-decoration-line:underline\n}.svelte-v6hy84:is(.dark a){--tw-text-opacity:1;color:rgb(63 131 248 / var(--tw-text-opacity))\n}",
      map: null
    };
    U = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$5);
      return `<div class="svelte-v6hy84" data-svelte-h="svelte-jsjowu">Dieses Protokoll hat der Autor Andreas Kalcker leider nicht f\xFCr die Online Publikation freigegeben. 
Sie finden dieses und viele andere wertvolle Informationen in seinem Buch <a href="/buecher/4" class="svelte-v6hy84">\u{1F4D5} Gesundheit verboten</a>. 

</div>`;
    });
    css$4 = {
      code: "div.svelte-v6hy84{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-v6hy84{font-weight:500;--tw-text-opacity:1;color:rgb(28 100 242 / var(--tw-text-opacity))\n}a.svelte-v6hy84:hover{text-decoration-line:underline\n}.svelte-v6hy84:is(.dark a){--tw-text-opacity:1;color:rgb(63 131 248 / var(--tw-text-opacity))\n}",
      map: null
    };
    V = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$4);
      return `<div class="svelte-v6hy84" data-svelte-h="svelte-jsjowu">Dieses Protokoll hat der Autor Andreas Kalcker leider nicht f\xFCr die Online Publikation freigegeben. 
Sie finden dieses und viele andere wertvolle Informationen in seinem Buch <a href="/buecher/4" class="svelte-v6hy84">\u{1F4D5} Gesundheit verboten</a>. 

</div>`;
    });
    css$3 = {
      code: "div.svelte-v6hy84{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-v6hy84{font-weight:500;--tw-text-opacity:1;color:rgb(28 100 242 / var(--tw-text-opacity))\n}a.svelte-v6hy84:hover{text-decoration-line:underline\n}.svelte-v6hy84:is(.dark a){--tw-text-opacity:1;color:rgb(63 131 248 / var(--tw-text-opacity))\n}",
      map: null
    };
    W = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$3);
      return `<div class="svelte-v6hy84" data-svelte-h="svelte-jsjowu">Dieses Protokoll hat der Autor Andreas Kalcker leider nicht f\xFCr die Online Publikation freigegeben. 
Sie finden dieses und viele andere wertvolle Informationen in seinem Buch <a href="/buecher/4" class="svelte-v6hy84">\u{1F4D5} Gesundheit verboten</a>. 

</div>`;
    });
    css$2 = {
      code: "div.svelte-v6hy84{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-v6hy84{font-weight:500;--tw-text-opacity:1;color:rgb(28 100 242 / var(--tw-text-opacity))\n}a.svelte-v6hy84:hover{text-decoration-line:underline\n}.svelte-v6hy84:is(.dark a){--tw-text-opacity:1;color:rgb(63 131 248 / var(--tw-text-opacity))\n}",
      map: null
    };
    X = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$2);
      return `<div class="svelte-v6hy84" data-svelte-h="svelte-jsjowu">Dieses Protokoll hat der Autor Andreas Kalcker leider nicht f\xFCr die Online Publikation freigegeben. 
Sie finden dieses und viele andere wertvolle Informationen in seinem Buch <a href="/buecher/4" class="svelte-v6hy84">\u{1F4D5} Gesundheit verboten</a>. 

</div>`;
    });
    css$1 = {
      code: "div.svelte-v6hy84{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-v6hy84{font-weight:500;--tw-text-opacity:1;color:rgb(28 100 242 / var(--tw-text-opacity))\n}a.svelte-v6hy84:hover{text-decoration-line:underline\n}.svelte-v6hy84:is(.dark a){--tw-text-opacity:1;color:rgb(63 131 248 / var(--tw-text-opacity))\n}",
      map: null
    };
    Y = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$1);
      return `<div class="svelte-v6hy84" data-svelte-h="svelte-jsjowu">Dieses Protokoll hat der Autor Andreas Kalcker leider nicht f\xFCr die Online Publikation freigegeben. 
Sie finden dieses und viele andere wertvolle Informationen in seinem Buch <a href="/buecher/4" class="svelte-v6hy84">\u{1F4D5} Gesundheit verboten</a>. 

</div>`;
    });
    css3 = {
      code: "div.svelte-v6hy84{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-v6hy84{font-weight:500;--tw-text-opacity:1;color:rgb(28 100 242 / var(--tw-text-opacity))\n}a.svelte-v6hy84:hover{text-decoration-line:underline\n}.svelte-v6hy84:is(.dark a){--tw-text-opacity:1;color:rgb(63 131 248 / var(--tw-text-opacity))\n}",
      map: null
    };
    Z = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css3);
      return `<div class="svelte-v6hy84" data-svelte-h="svelte-jsjowu">Dieses Protokoll hat der Autor Andreas Kalcker leider nicht f\xFCr die Online Publikation freigegeben. 
Sie finden dieses und viele andere wertvolle Informationen in seinem Buch <a href="/buecher/4" class="svelte-v6hy84">\u{1F4D5} Gesundheit verboten</a>. 

</div>`;
    });
    Page8 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${$$result.head += `<!-- HEAD_svelte-1xillv0_START -->${$$result.title = `<title>CDL Protokolle laut Dr. Andreas Kalcker</title>`, ""}<meta name="description" content="Entdecken Sie CDL-Protokolle f\xFCr Ihre Gesundheitsbed\xFCrfnisse. Optimieren Sie Ihre Selbstbehandlung mit CDL "><!-- HEAD_svelte-1xillv0_END -->`, ""} ${validate_component(Accordion, "Accordion").$$render($$result, { activeClass: "bg-white" }, {}, {
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

// .svelte-kit/output/server/nodes/11.js
var __exports12 = {};
__export(__exports12, {
  component: () => component12,
  fonts: () => fonts12,
  imports: () => imports12,
  index: () => index12,
  stylesheets: () => stylesheets12
});
var index12, component_cache12, component12, imports12, stylesheets12, fonts12;
var init__12 = __esm({
  ".svelte-kit/output/server/nodes/11.js"() {
    index12 = 11;
    component12 = async () => component_cache12 ?? (component_cache12 = (await Promise.resolve().then(() => (init_page_svelte8(), page_svelte_exports8))).default);
    imports12 = ["_app/immutable/nodes/11.XSXzvy6H.js", "_app/immutable/chunks/scheduler.zM5vpuro.js", "_app/immutable/chunks/index.Lc7HYTwW.js", "_app/immutable/chunks/spread.CgU5AtxT.js", "_app/immutable/chunks/index.an3FWtO5.js", "_app/immutable/chunks/index.CyWKpHfw.js", "_app/immutable/chunks/bundle-mjs.BTwrKG5i.js"];
    stylesheets12 = ["_app/immutable/assets/11.DXC0YuUL.css"];
    fonts12 = [];
  }
});

// .svelte-kit/output/server/entries/pages/gutscheine/_page.svelte.js
var page_svelte_exports9 = {};
__export(page_svelte_exports9, {
  default: () => Page9
});
var Gutschein, Page9;
var init_page_svelte9 = __esm({
  ".svelte-kit/output/server/entries/pages/gutscheine/_page.svelte.js"() {
    init_ssr();
    init_Icon();
    Gutschein = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { shop = "mustershop" } = $$props;
      let { desc = "10% Rabatt" } = $$props;
      let { code = "CDLPROTOKOLLE" } = $$props;
      let { gueltig = "Immer" } = $$props;
      let { color = "blue" } = $$props;
      let { href = "" } = $$props;
      let { icon = "ph:tree-thin" } = $$props;
      if ($$props.shop === void 0 && $$bindings.shop && shop !== void 0)
        $$bindings.shop(shop);
      if ($$props.desc === void 0 && $$bindings.desc && desc !== void 0)
        $$bindings.desc(desc);
      if ($$props.code === void 0 && $$bindings.code && code !== void 0)
        $$bindings.code(code);
      if ($$props.gueltig === void 0 && $$bindings.gueltig && gueltig !== void 0)
        $$bindings.gueltig(gueltig);
      if ($$props.color === void 0 && $$bindings.color && color !== void 0)
        $$bindings.color(color);
      if ($$props.href === void 0 && $$bindings.href && href !== void 0)
        $$bindings.href(href);
      if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
        $$bindings.icon(icon);
      return `<a${add_attribute("href", href, 0)} target="_blank"><div class="${"w-48 h-44 mt-2 p-2 bg-" + escape(color, true) + "-200 text-" + escape(color, true) + "-800 relative"}">${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          icon,
          class: "absolute z-10 opacity-60",
          height: "160",
          color: "white"
        },
        {},
        {}
      )} <div class="border-[4px] h-full relative z-30 p-2 border-white border-dotted "><div class="overflow-auto"><h2>${escape(shop)}</h2> <h3>${escape(desc)}</h3> <div>Code: <b>${escape(code)}</b></div> <span>G\xFCltig: ${escape(gueltig)}</span></div></div></div></a>`;
    });
    Page9 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${$$result.head += `<!-- HEAD_svelte-14155v9_START -->${$$result.title = `<title>Gutscheine f\xFCr alternative Heilmittel und Nahrungserg\xE4nzungsmittel</title>`, ""}<meta name="description" content="Aktuelle Gutscheine von Online Shops die alternative Heilmittel anbieten wie Cellavita, Waldkraft, Graf von Kronenberg, Kopp Verlag. "><!-- HEAD_svelte-14155v9_END -->`, ""} <div class="p-2"><h2 data-svelte-h="svelte-717o1w">Gutscheine f\xFCr alternative Heilmittel und Nahrungserg\xE4nzungsmittel</h2>  <div class="grid grid-cols-2 lg:grid-cols-4">${validate_component(Gutschein, "Gutschein").$$render(
        $$result,
        {
          icon: "ph:tree-thin",
          href: "https://www.waldkraft.bio/?sPartner=energiereich",
          color: "red",
          desc: "10% Rabatt auf erste Bestellung",
          shop: "Waldkraft",
          code: "energiereich",
          gueltig: "einmalig"
        },
        {},
        {}
      )} ${validate_component(Gutschein, "Gutschein").$$render(
        $$result,
        {
          icon: "game-icons:medicine-pills",
          href: "https://c.kopp-verlag.de/kopp,verlag_4.html?1=546&3=0&4=&5=&d=https%3A%2F%2Fwww.kopp-verlag.de%2Fa%2Fkopp-dmso-9990-ph.-eur.-dimethylsulfoxid-pharma-1-liter",
          color: "orange",
          desc: "10% Rabatt auf DMSO",
          shop: "Kopp Verlag",
          code: "DMSO10",
          gueltig: "bis zum 31.3.2024"
        },
        {},
        {}
      )} ${validate_component(Gutschein, "Gutschein").$$render(
        $$result,
        {
          icon: "material-symbols:forest-rounded",
          href: "https://edubily.de/collections/all/?ref=1jv8kbelnr",
          color: "yellow",
          desc: "5% auf alle Produkte",
          shop: "Edubily",
          code: "telegram5",
          gueltig: "f\xFCr immer"
        },
        {},
        {}
      )} ${validate_component(Gutschein, "Gutschein").$$render(
        $$result,
        {
          icon: "arcticons:harmony",
          href: "https://pure-harmony.com/?a_aid=9dba9a7d&a_bid=9ce5e19f",
          color: "yellow",
          desc: "10% auf alle Produkte",
          shop: "Pure Harmony",
          code: "telegram",
          gueltig: "f\xFCr immer"
        },
        {},
        {}
      )} ${validate_component(Gutschein, "Gutschein").$$render(
        $$result,
        {
          icon: "mdi:dog",
          href: "https://dog-native.de/shop/gelenkfit-fuer-hunde/?utm_source=selecdoo&utm_medium=CPO&a_aid=9dba9a7d&a_bid=419938b8",
          color: "red",
          desc: "10% auf alle Produkte",
          shop: "Dog Native",
          code: "gesundehaustiere",
          gueltig: "f\xFCr immer"
        },
        {},
        {}
      )} ${validate_component(Gutschein, "Gutschein").$$render(
        $$result,
        {
          icon: "arcticons:supervpn",
          href: "https://supernaturals.eu/?utm_source=selecdoo&utm_medium=CPO&a_aid=9dba9a7d&a_bid=5d7d7d95",
          color: "lime",
          desc: "10% auf alle Produkte",
          shop: "Supernaturals",
          code: "CDL",
          gueltig: "f\xFCr immer"
        },
        {},
        {}
      )} ${validate_component(Gutschein, "Gutschein").$$render(
        $$result,
        {
          icon: "mingcute:love-fill",
          href: "https://bitterliebe.com/?utm_source=selecdoo&utm_medium=affiliate&utm_campaign=9dba9a7d&a_aid=9dba9a7d&a_bid=11ea8dfd",
          color: "teal",
          desc: "10% auf alle Produkte",
          shop: "Bitterliebe",
          code: "CDL",
          gueltig: "f\xFCr immer"
        },
        {},
        {}
      )} ${validate_component(Gutschein, "Gutschein").$$render(
        $$result,
        {
          icon: "carbon:bee",
          href: "https://bedrop.de/products/bee-cream-mit-bienengift?&utm_medium=CPO&utm_source=Selecdoo&a_aid=9dba9a7d&a_bid=bed5f00a",
          color: "red",
          desc: "10% auf alle Produkte",
          shop: "Bedrop",
          code: "cdlprotokoll10",
          gueltig: "f\xFCr immer"
        },
        {},
        {}
      )} ${validate_component(Gutschein, "Gutschein").$$render(
        $$result,
        {
          icon: "carbon:rain-drop",
          href: "https://heilkraft.online/chlordioxid-trinkwasseraufbereitung?sPartner=cdl-protokoll",
          color: "teal",
          desc: "5% auf CDL Produkte",
          shop: "Heilkraft",
          code: "cdl protokoll",
          gueltig: "f\xFCr immer"
        },
        {},
        {}
      )}</div></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/12.js
var __exports13 = {};
__export(__exports13, {
  component: () => component13,
  fonts: () => fonts13,
  imports: () => imports13,
  index: () => index13,
  stylesheets: () => stylesheets13
});
var index13, component_cache13, component13, imports13, stylesheets13, fonts13;
var init__13 = __esm({
  ".svelte-kit/output/server/nodes/12.js"() {
    index13 = 12;
    component13 = async () => component_cache13 ?? (component_cache13 = (await Promise.resolve().then(() => (init_page_svelte9(), page_svelte_exports9))).default);
    imports13 = ["_app/immutable/nodes/12.DlLTqW2y.js", "_app/immutable/chunks/scheduler.zM5vpuro.js", "_app/immutable/chunks/index.Lc7HYTwW.js", "_app/immutable/chunks/Icon.D7F1xIXL.js", "_app/immutable/chunks/spread.CgU5AtxT.js"];
    stylesheets13 = [];
    fonts13 = [];
  }
});

// .svelte-kit/output/server/chunks/samples.js
async function getProductTags() {
  const { data, error: error2 } = await supabase2.from("readingsamplesproducttags").select();
  if (error2) {
    console.log("error samples.ts getProductTags()");
    return [];
  } else {
    console.log("data", data);
    return data;
  }
}
async function getReadingSample(leseprobenId) {
  const { data, error: error2 } = await supabase2.from("readingsamples").select("id, text, book_id, product_tag").eq("slug", leseprobenId).limit(1).single();
  if (error2) {
    console.log("fehler beim Laden der Leseprobe");
  } else {
    return data;
  }
}
async function getSimilarReadingSamples(sample) {
  const { data, error: error2 } = await supabase2.from("readingsamples").select("id, slug, text, book_id").eq("product_tag", sample.product_tag).order("created_at").limit(30);
  if (error2) {
    console.log("fehler beim Laden der Leseprobe");
  } else {
    return data;
  }
}
async function getReadingSamples(sample) {
  const { data, error: error2 } = await supabase2.from("readingsamples").select().ilike("product_tag", sample);
  if (error2) {
    console.log("error samples.ts getReadingSamples", sample);
  } else {
    return data;
  }
}
var init_samples = __esm({
  ".svelte-kit/output/server/chunks/samples.js"() {
    init_supabaseClient();
    init_chunks();
  }
});

// .svelte-kit/output/server/entries/pages/leseproben/_page.server.ts.js
var page_server_ts_exports2 = {};
__export(page_server_ts_exports2, {
  load: () => load9
});
async function load9() {
  const product_tags = await getProductTags();
  const { data, error: error2 } = await supabase2.from("readingsamples").select("id, slug, text, book_id").order("created_at").limit(10);
  if (error2) {
    console.log("error while loading readingsamples");
  } else {
    return { leseproben: data, product_tags };
  }
}
var init_page_server_ts2 = __esm({
  ".svelte-kit/output/server/entries/pages/leseproben/_page.server.ts.js"() {
    init_samples();
    init_supabaseClient();
  }
});

// .svelte-kit/output/server/entries/pages/leseproben/_page.svelte.js
var page_svelte_exports10 = {};
__export(page_svelte_exports10, {
  default: () => Page10
});
var Page10;
var init_page_svelte10 = __esm({
  ".svelte-kit/output/server/entries/pages/leseproben/_page.svelte.js"() {
    init_ssr();
    Page10 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data } = $$props;
      const product_tags = data.product_tags;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      return `<h2 data-svelte-h="svelte-k1wurr">Leseproben</h2> <p data-svelte-h="svelte-48cgby">Hier finden Sie informative Leseproben aus B\xFCchern die wir Ihnen in der B\xFCcher Rubrik empfehlen. Denken Sie daran dass die Leseproben nur einen minimalen Bruchteil der Informationsf\xFClle aus dem Buch enthalten und diese nicht vollst\xE4ndig sind.</p> <p data-svelte-h="svelte-1lklbpo">Im folgenden sehen sie die Titel der letzten 10 neu hinzugekommenen Leseproben. Beim Klick auf den Titel kommen Sie an die eigentliche Leseprobe.</p> <p data-svelte-h="svelte-zb7ki6">\xDCbrigens: Wenn Sie die Suche nutzen werden Ihnen als Suchergebnis auch passende Leseproben geliefert.</p> ${each(data.leseproben, (leseprobe) => {
        return `<a href="${"/leseproben/" + escape(leseprobe.slug, true)}"><div class="border-2 m-2 p-2 hover:bg-blue-800 hover:text-white">${escape(leseprobe.id)}</div> </a>`;
      })} <div class="bg-blue-300 p-5 ">W\xE4hle faszinierende Leseproben aus folgenden Produkten 
    <div class="grid grid-cols-3 md:grid-cols-4">${each(product_tags, (tag) => {
        return `<a href="${"/leseproben/cat/" + escape(tag.product_tag.toLowerCase(), true)}"><div class="border-2 border-blue-100 m-1 md:m-2 p-1 md:p-2 hover:bg-blue-800 hover:text-white">${escape(tag.product_tag)}</div> </a>`;
      })}</div></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/13.js
var __exports14 = {};
__export(__exports14, {
  component: () => component14,
  fonts: () => fonts14,
  imports: () => imports14,
  index: () => index14,
  server: () => page_server_ts_exports2,
  server_id: () => server_id4,
  stylesheets: () => stylesheets14
});
var index14, component_cache14, component14, server_id4, imports14, stylesheets14, fonts14;
var init__14 = __esm({
  ".svelte-kit/output/server/nodes/13.js"() {
    init_page_server_ts2();
    index14 = 13;
    component14 = async () => component_cache14 ?? (component_cache14 = (await Promise.resolve().then(() => (init_page_svelte10(), page_svelte_exports10))).default);
    server_id4 = "src/routes/leseproben/+page.server.ts";
    imports14 = ["_app/immutable/nodes/13.DAStL3bL.js", "_app/immutable/chunks/scheduler.zM5vpuro.js", "_app/immutable/chunks/each.D6YF6ztN.js", "_app/immutable/chunks/index.Lc7HYTwW.js"];
    stylesheets14 = [];
    fonts14 = [];
  }
});

// .svelte-kit/output/server/entries/pages/leseproben/_leseprobenId_/_page.server.ts.js
var page_server_ts_exports3 = {};
__export(page_server_ts_exports3, {
  load: () => load10
});
async function load10({ params }) {
  const leseprobenId = params.leseprobenId;
  const sample = await getReadingSample(leseprobenId);
  const readingSamples = await getSimilarReadingSamples(sample);
  const book = await getBook(sample?.book_id);
  const links = await getBooklinks(book?.id);
  const product_tags = await getProductTags();
  console.log("from server: Leseprobe von ", book?.title);
  return {
    sample,
    readingSamples,
    book,
    links,
    product_tags
  };
}
var init_page_server_ts3 = __esm({
  ".svelte-kit/output/server/entries/pages/leseproben/_leseprobenId_/_page.server.ts.js"() {
    init_books();
    init_samples();
    init_bookDetails();
  }
});

// .svelte-kit/output/server/entries/pages/leseproben/_leseprobenId_/_page.svelte.js
var page_svelte_exports11 = {};
__export(page_svelte_exports11, {
  default: () => Page11
});
function nl2br(description) {
  return description.replace(/\n/g, "<br>");
}
var Page11;
var init_page_svelte11 = __esm({
  ".svelte-kit/output/server/entries/pages/leseproben/_leseprobenId_/_page.svelte.js"() {
    init_ssr();
    init_getBookImg();
    init_Button();
    Page11 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let currentsample;
      let samples;
      let book;
      let links;
      let { data } = $$props;
      const product_tags = data.product_tags;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      currentsample = data.sample;
      samples = data.readingSamples;
      book = data.book;
      links = data.links;
      return `${$$result.head += `<!-- HEAD_svelte-wksuef_START -->${$$result.title = `<title>${escape(currentsample?.id)}</title>`, ""}<meta name="description"${add_attribute("content", currentsample?.text, 0)}><!-- HEAD_svelte-wksuef_END -->`, ""} <div class="grid grid-cols-3 text-xs border-2 bg-gray-200"> ${each(samples, (sample) => {
        return `${currentsample.id == sample.id ? `<div class="border-2 border-lime-700 m-1 p-2 bg-lime-400">${escape(sample.id)} </div>` : `<div class="hover:bg-blue-800 hover:text-white"><a href="${"/leseproben/" + escape(sample.slug, true)}"><div class="m-1 p-1 ">${escape(sample.id)} </div></a> </div>`}`;
      })}</div>  <div class="grid grid-cols-1 md:grid-cols-2 md:m-2 md:p-2"><div class="p-2 md:pr-10"><h2>${escape(currentsample.id)}</h2> <!-- HTML_TAG_START -->${nl2br(currentsample.text)}<!-- HTML_TAG_END --></div> <div class="p-2"><h2><span class="md:hidden" data-svelte-h="svelte-16r7ou5">Das war eine </span>Leseprobe aus dem Buch<br> ${escape(book?.title)}</h2> <div><img${add_attribute("src", getImg(book?.img, book?.id, "books"), 0)}${add_attribute("alt", book?.title, 0)}></div>  <div class="my-5 pb-10 flex flex-col items-center ">${each(links, (link) => {
        return `<a${add_attribute("href", link.link, 0)} target="_blank">${validate_component(Button, "Button").$$render($$result, { class: "text-lg mt-3", color: "green" }, {}, {
          default: () => {
            return `${escape(link.label)} \u{1F6D2}`;
          }
        })} </a>`;
      })} <a href="${"https://www.amazon.de/gp/search?ie=UTF8&tag=jumex_online-21&linkCode=ur2&linkId=470bf27aa1feb315de9cb5f18b114f2f&camp=1638&creative=6742&index=books&keywords=" + escape(book.title, true)}" target="_blank">${validate_component(Button, "Button").$$render($$result, { class: "text-lg mt-3", color: "light" }, {}, {
        default: () => {
          return `<img width="100" alt="Amazon Logo" src="/images/logos/Amazon.de-Logo.svg.png">`;
        }
      })}</a> <a href="${"https://www.ebay.de/sch/i.html?_from=R40&_trksid=p4432023.m570.l1313&_nkw=" + escape(book.title, true) + "&_sacat=0"}" target="_blank">${validate_component(Button, "Button").$$render($$result, { class: "text-lg mt-3", color: "light" }, {}, {
        default: () => {
          return `<img width="100" alt="Ebay Logo" src="/images/logos/EBay_logo.png">`;
        }
      })}</a></div></div></div> <div class="bg-blue-300 p-5 ">Weitere Leseproben zu folgenden Produkten 
    <div class="grid grid-cols-3 md:grid-cols-4">${each(product_tags, (tag) => {
        return `<a href="${"/leseproben/cat/" + escape(tag.product_tag.toLowerCase(), true)}"><div class="border-2 border-blue-100 m-1 md:m-2 p-1 md:p-2 hover:bg-blue-800 hover:text-white">${escape(tag.product_tag)}</div> </a>`;
      })}</div></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/14.js
var __exports15 = {};
__export(__exports15, {
  component: () => component15,
  fonts: () => fonts15,
  imports: () => imports15,
  index: () => index15,
  server: () => page_server_ts_exports3,
  server_id: () => server_id5,
  stylesheets: () => stylesheets15
});
var index15, component_cache15, component15, server_id5, imports15, stylesheets15, fonts15;
var init__15 = __esm({
  ".svelte-kit/output/server/nodes/14.js"() {
    init_page_server_ts3();
    index15 = 14;
    component15 = async () => component_cache15 ?? (component_cache15 = (await Promise.resolve().then(() => (init_page_svelte11(), page_svelte_exports11))).default);
    server_id5 = "src/routes/leseproben/[leseprobenId]/+page.server.ts";
    imports15 = ["_app/immutable/nodes/14.BSbrk516.js", "_app/immutable/chunks/scheduler.zM5vpuro.js", "_app/immutable/chunks/index.Lc7HYTwW.js", "_app/immutable/chunks/each.D6YF6ztN.js", "_app/immutable/chunks/getBookImg.B3agDJL6.js", "_app/immutable/chunks/Button.DXAEX3aa.js", "_app/immutable/chunks/spread.CgU5AtxT.js", "_app/immutable/chunks/bundle-mjs.BTwrKG5i.js"];
    stylesheets15 = [];
    fonts15 = [];
  }
});

// .svelte-kit/output/server/entries/pages/leseproben/cat/_catid_/_page.server.ts.js
var page_server_ts_exports4 = {};
__export(page_server_ts_exports4, {
  load: () => load11
});
async function load11({ params }) {
  console.log("Leseproben der Kategorie: ", params);
  const product_tags = await getProductTags();
  const catid = params.catid;
  const samples = await getReadingSamples(catid);
  return {
    catid,
    samples,
    product_tags
  };
}
var init_page_server_ts4 = __esm({
  ".svelte-kit/output/server/entries/pages/leseproben/cat/_catid_/_page.server.ts.js"() {
    init_samples();
  }
});

// .svelte-kit/output/server/chunks/helper.js
function removeTags(str) {
  if (str === null || str === "")
    return false;
  else
    str = str.toString();
  return str.replace(/(<([^>]+)>)/ig, "");
}
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
var init_helper2 = __esm({
  ".svelte-kit/output/server/chunks/helper.js"() {
  }
});

// .svelte-kit/output/server/entries/pages/leseproben/cat/_catid_/_page.svelte.js
var page_svelte_exports12 = {};
__export(page_svelte_exports12, {
  default: () => Page12
});
var Page12;
var init_page_svelte12 = __esm({
  ".svelte-kit/output/server/entries/pages/leseproben/cat/_catid_/_page.svelte.js"() {
    init_ssr();
    init_helper2();
    Page12 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data } = $$props;
      let category = capitalize(data.catid);
      const product_tags = data.product_tags;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      return `<h2>Leseproben der Kategory ${escape(category)}</h2> ${each(data.samples, (leseprobe) => {
        return `<a href="${"/leseproben/" + escape(leseprobe.slug, true)}"><div class="border-2 m-2 p-2 hover:bg-blue-800 hover:text-white">${escape(leseprobe.id)}</div> </a>`;
      })} <div class="bg-blue-300 p-5 ">W\xE4hle faszinierende Leseproben aus folgenden Produkten 
    <div class="grid grid-cols-3 md:grid-cols-4">${each(product_tags, (tag) => {
        return `<a href="${"/leseproben/cat/" + escape(tag.product_tag.toLowerCase(), true)}"><div class="border-2 border-blue-100 m-1 md:m-2 p-1 md:p-2 hover:bg-blue-800 hover:text-white">${escape(tag.product_tag)}</div> </a>`;
      })}</div></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/15.js
var __exports16 = {};
__export(__exports16, {
  component: () => component16,
  fonts: () => fonts16,
  imports: () => imports16,
  index: () => index16,
  server: () => page_server_ts_exports4,
  server_id: () => server_id6,
  stylesheets: () => stylesheets16
});
var index16, component_cache16, component16, server_id6, imports16, stylesheets16, fonts16;
var init__16 = __esm({
  ".svelte-kit/output/server/nodes/15.js"() {
    init_page_server_ts4();
    index16 = 15;
    component16 = async () => component_cache16 ?? (component_cache16 = (await Promise.resolve().then(() => (init_page_svelte12(), page_svelte_exports12))).default);
    server_id6 = "src/routes/leseproben/cat/[catid]/+page.server.ts";
    imports16 = ["_app/immutable/nodes/15.D8l44VL5.js", "_app/immutable/chunks/scheduler.zM5vpuro.js", "_app/immutable/chunks/each.D6YF6ztN.js", "_app/immutable/chunks/index.Lc7HYTwW.js", "_app/immutable/chunks/helper.ByxkrZMk.js"];
    stylesheets16 = [];
    fonts16 = [];
  }
});

// .svelte-kit/output/server/entries/pages/login/_page.server.js
var page_server_exports2 = {};
__export(page_server_exports2, {
  actions: () => actions2
});
var actions2;
var init_page_server2 = __esm({
  ".svelte-kit/output/server/entries/pages/login/_page.server.js"() {
    init_chunks();
    actions2 = {
      default: async ({ request, url, locals: { supabase: supabase3 } }) => {
        const formData = await request.formData();
        const email = formData.get("email");
        const password = formData.get("password");
        const { error: error2 } = await supabase3.auth.signInWithPassword({
          email,
          password,
          options: {
            emailRedirectTo: "/admin/books"
          }
        });
        if (error2) {
          return fail(500, { message: "Server error. Try again later.", success: false, email });
        }
        return {
          message: "Please check your email for a magic link to log into the website.",
          success: true
        };
      }
    };
  }
});

// .svelte-kit/output/server/entries/pages/login/_page.svelte.js
var page_svelte_exports13 = {};
__export(page_svelte_exports13, {
  default: () => Page13
});
var Page13;
var init_page_svelte13 = __esm({
  ".svelte-kit/output/server/entries/pages/login/_page.svelte.js"() {
    init_ssr();
    init_client();
    Page13 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { form } = $$props;
      if ($$props.form === void 0 && $$bindings.form && form !== void 0)
        $$bindings.form(form);
      return `  <form method="post"><input name="email"${add_attribute("value", form?.email ?? "", 0)}> <input type="password" name="password"> <button data-svelte-h="svelte-11o5rk4">Sign up</button></form>`;
    });
  }
});

// .svelte-kit/output/server/nodes/16.js
var __exports17 = {};
__export(__exports17, {
  component: () => component17,
  fonts: () => fonts17,
  imports: () => imports17,
  index: () => index17,
  server: () => page_server_exports2,
  server_id: () => server_id7,
  stylesheets: () => stylesheets17
});
var index17, component_cache17, component17, server_id7, imports17, stylesheets17, fonts17;
var init__17 = __esm({
  ".svelte-kit/output/server/nodes/16.js"() {
    init_page_server2();
    index17 = 16;
    component17 = async () => component_cache17 ?? (component_cache17 = (await Promise.resolve().then(() => (init_page_svelte13(), page_svelte_exports13))).default);
    server_id7 = "src/routes/login/+page.server.js";
    imports17 = ["_app/immutable/nodes/16.CWZmQinW.js", "_app/immutable/chunks/scheduler.zM5vpuro.js", "_app/immutable/chunks/index.Lc7HYTwW.js", "_app/immutable/chunks/entry.BTRUiN5Q.js", "_app/immutable/chunks/index.an3FWtO5.js", "_app/immutable/chunks/control.CYgJF_JY.js"];
    stylesheets17 = [];
    fonts17 = [];
  }
});

// .svelte-kit/output/server/entries/pages/produkte/_page.server.js
var page_server_exports3 = {};
__export(page_server_exports3, {
  load: () => load12
});
async function load12() {
  const title = "Produktempfehlungen. W\xE4hle eine der Kategorien um schneller das passende Produkt zu finden. ";
  const { data } = await supabase2.from("products").select().limit(12);
  return {
    title,
    streamed: {
      products: data
    }
  };
}
var init_page_server3 = __esm({
  ".svelte-kit/output/server/entries/pages/produkte/_page.server.js"() {
    init_supabaseClient();
  }
});

// .svelte-kit/output/server/chunks/shops.js
function getProductImg(filename) {
  let img = "";
  const path = `/images/products`;
  if (!filename)
    img = path + "no_cover.jpeg";
  else
    img = path + filename;
  return img;
}
function getBadge(id) {
  let shopid = id.split("-")[0];
  let shop = "";
  let bgcolor = "";
  switch (shopid) {
    case "gvk":
      shop = "Kronenberg";
      bgcolor = "bg-amber-500";
      break;
    case "wk":
      shop = "Waldkraft";
      bgcolor = "bg-green-700";
      break;
    case "cw":
      shop = "Cellavita";
      bgcolor = "bg-lime-500";
      break;
    case "cv":
      shop = "Cellavita";
      bgcolor = "bg-lime-500";
      break;
    case "be":
      shop = "Bedrop";
      bgcolor = "bg-orange-200";
      break;
    case "ed":
      shop = "Edubily";
      bgcolor = "bg-amber-300";
      break;
    case "hk":
      shop = "Heilkraft";
      bgcolor = "bg-red-400";
      break;
    default:
      shop = "Unknown";
  }
  const badge = '<div class="border-2 absolute right-2 text-black rounded-md text-s p-1 text-center top-5 w-24 ' + bgcolor + ' opacity-65" large color="green">' + shop + "</div>";
  return badge;
}
var Product;
var init_shops = __esm({
  ".svelte-kit/output/server/chunks/shops.js"() {
    init_ssr();
    Product = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { product = { id: 0, img: "", name: "", price: "" } } = $$props;
      if ($$props.product === void 0 && $$bindings.product && product !== void 0)
        $$bindings.product(product);
      return `<a${add_attribute("href", `/produkte/${product.id}`, 0)}><div class="w-full h-[280px] my-2"><div class="pt-2 overflow-auto bg-white w-44 "><img class="mx-auto" width="150"${add_attribute("src", getProductImg(product.img), 0)}${add_attribute("alt", product.name, 0)}> <div class="p-3 text-sm">${escape(product.name)}</div> <div class="p-3 text-lg font-bold text-center">${escape(new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(product.price))}</div></div></div></a>`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/produkte/_page.svelte.js
var page_svelte_exports14 = {};
__export(page_svelte_exports14, {
  default: () => Page14
});
var Page14;
var init_page_svelte14 = __esm({
  ".svelte-kit/output/server/entries/pages/produkte/_page.svelte.js"() {
    init_ssr();
    init_shops();
    Page14 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data } = $$props;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      return `<div class="px-2 m-2 border-2 " data-svelte-h="svelte-1abrevb"><h2>Produkte f\xFCr die alternative Heilung</h2></div> <ul class="grid grid-cols-2 md:grid-cols-3 justify-around space-y-5">${function(__value) {
        if (is_promise(__value)) {
          __value.then(null, noop);
          return `
      Loading Products ...
      `;
        }
        return function(products) {
          return ` ${each(products, (product) => {
            return `<li class="my-2 relative"><div class="absolute right-10 md:right-28"><!-- HTML_TAG_START -->${getBadge(product.id)}<!-- HTML_TAG_END --></div> ${validate_component(Product, "Product").$$render(
              $$result,
              {
                product: {
                  id: product.id,
                  name: product.name,
                  img: product.image,
                  price: product.price
                }
              },
              {},
              {}
            )} </li>`;
          })} `;
        }(__value);
      }(data.streamed.products)}</ul>`;
    });
  }
});

// .svelte-kit/output/server/nodes/17.js
var __exports18 = {};
__export(__exports18, {
  component: () => component18,
  fonts: () => fonts18,
  imports: () => imports18,
  index: () => index18,
  server: () => page_server_exports3,
  server_id: () => server_id8,
  stylesheets: () => stylesheets18
});
var index18, component_cache18, component18, server_id8, imports18, stylesheets18, fonts18;
var init__18 = __esm({
  ".svelte-kit/output/server/nodes/17.js"() {
    init_page_server3();
    index18 = 17;
    component18 = async () => component_cache18 ?? (component_cache18 = (await Promise.resolve().then(() => (init_page_svelte14(), page_svelte_exports14))).default);
    server_id8 = "src/routes/produkte/+page.server.js";
    imports18 = ["_app/immutable/nodes/17.CzU89P1J.js", "_app/immutable/chunks/scheduler.zM5vpuro.js", "_app/immutable/chunks/await_block.DV1PVPDO.js", "_app/immutable/chunks/index.Lc7HYTwW.js", "_app/immutable/chunks/each.D6YF6ztN.js", "_app/immutable/chunks/shops.IvLJLzM-.js"];
    stylesheets18 = [];
    fonts18 = [];
  }
});

// .svelte-kit/output/server/entries/pages/produkte/_productid_/_page.js
var page_exports3 = {};
__export(page_exports3, {
  load: () => load13
});
async function load13({ params }) {
  let pid = params.productid;
  let select = `id, name, image, description, link, products_categories(category_id)`;
  let { data } = await supabase2.from("products").select(select).eq("id", pid).limit(1).single();
  let name2 = data.name;
  console.log("product: ", name2, "id: ", pid);
  data.description || `Entdecken Sie eine Vielzahl von Produkten auf cdl-protokolle.com`;
  async function getSearchTerm(name22) {
    let tempArray = name22.split(" ");
    tempArray = tempArray.slice(0, 3);
    let searchTerm = tempArray.join(" ");
    return searchTerm;
  }
  let searchterm = await getSearchTerm(name2);
  let kid = data.products_categories[0].category_id;
  async function getSimilarProductIds(kid2, pid2) {
    let { data: data2 } = await supabase2.from("products_categories").select("product_id").eq("category_id", kid2).range(0, 9);
    let similarProducts = data2.map((obj) => obj.product_id);
    similarProducts = similarProducts.filter((product) => product != pid2);
    return similarProducts;
  }
  async function getProductsFromIds(spids2) {
    let { data: data2 } = await supabase2.from("products").select().in("id", spids2);
    return data2;
  }
  let spids = await getSimilarProductIds(kid, pid);
  return {
    data,
    searchterm,
    streamed: {
      similarProducts: getProductsFromIds(spids)
    }
  };
}
var init_page3 = __esm({
  ".svelte-kit/output/server/entries/pages/produkte/_productid_/_page.js"() {
    init_supabaseClient();
  }
});

// .svelte-kit/output/server/entries/pages/produkte/_productid_/_page.svelte.js
var page_svelte_exports15 = {};
__export(page_svelte_exports15, {
  default: () => Page15
});
var Page15;
var init_page_svelte15 = __esm({
  ".svelte-kit/output/server/entries/pages/produkte/_productid_/_page.svelte.js"() {
    init_ssr();
    init_Button();
    init_Spinner();
    init_shops();
    init_helper2();
    Page15 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let img;
      let name2;
      let id;
      let desc;
      let link;
      let searchterm;
      let { data } = $$props;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      img = getProductImg(data.data.image);
      name2 = data.data.name;
      id = data.data.id;
      desc = data.data.description;
      link = data.data.link;
      searchterm = data.searchterm;
      return `${$$result.head += `<!-- HEAD_svelte-wubmel_START -->${$$result.title = `<title>${escape(name2)}</title>`, ""}<meta name="description"${add_attribute("content", removeTags(desc), 0)}><!-- HEAD_svelte-wubmel_END -->`, ""} <div class="w-full flex flex-row bg-gray-100 justify-center relative"><!-- HTML_TAG_START -->${getBadge(id)}<!-- HTML_TAG_END --> <img class="py-10" width="400"${add_attribute("alt", name2, 0)}${add_attribute("src", img, 0)}></div> <div class="my-5 pb-10 flex flex-col items-center top-0 sticky z-10"><a${add_attribute("href", link, 0)} target="_blank">${validate_component(Button, "Button").$$render($$result, { class: "text-lg mt-3", color: "green" }, {}, {
        default: () => {
          return `${escape(name2)} \u{1F6D2}`;
        }
      })}</a></div> <div class="bg-yellow-100"><h2 class="bg-yellow-300 p-2">${escape(name2)}</h2> <div id="desc" class="p-5"><!-- HTML_TAG_START -->${desc}<!-- HTML_TAG_END --></div> <div id="links" class="w-5/6 m-auto bg-zinc-50 border-zinc-200 border-2 p-5"><div class="my-5 pb-10 flex flex-col items-center space-y-5"><a${add_attribute("href", link, 0)} target="_blank">${validate_component(Button, "Button").$$render($$result, { class: "text-lg mt-3", color: "green" }, {}, {
        default: () => {
          return `${escape(name2)} \u{1F6D2}`;
        }
      })}</a> <a href="${"https://www.amazon.de/gp/search?ie=UTF8&tag=jumex_online-21&linkCode=ur2&linkId=470bf27aa1feb315de9cb5f18b114f2f&camp=1638&creative=6742&index=books&keywords=" + escape(searchterm, true)}" target="_blank">${validate_component(Button, "Button").$$render($$result, { class: "text-lg mt-3", color: "light" }, {}, {
        default: () => {
          return `<img alt="amazon logo" width="100" src="/images/logos/Amazon.de-Logo.svg.png">`;
        }
      })}</a> <a href="${"https://www.ebay.de/sch/i.html?_from=R40&_trksid=p4432023.m570.l1313&_nkw=" + escape(searchterm, true) + "&_sacat=0"}" target="_blank">${validate_component(Button, "Button").$$render($$result, { class: "text-lg mt-3", color: "light" }, {}, {
        default: () => {
          return `<img alt="ebay logo" width="100" src="/images/logos/EBay_logo.png">`;
        }
      })}</a></div></div> <div id="abstand" class="h-5"></div></div> <div class="bg-lime-100 h-full "><div class="w-full my-5 bg-lime-300 p-3 text-lg font-bold text-center" data-svelte-h="svelte-g4vgml">\xC4hnliche Produkte:</div> <ul class="grid grid-cols-2 md:grid-cols-3 px-5 pb-20">${function(__value) {
        if (is_promise(__value)) {
          __value.then(null, noop);
          return ` <div class="loading">${validate_component(Spinner, "Spinner").$$render($$result, {}, {}, {})}
                Loading similar Products ...</div> `;
        }
        return function(similarProducts) {
          return ` ${each(similarProducts, (similarProduct) => {
            return `<li class="my-2 relative "><div class="absolute right-10"><!-- HTML_TAG_START -->${getBadge(similarProduct.id)}<!-- HTML_TAG_END --></div> ${validate_component(Product, "Product").$$render(
              $$result,
              {
                product: {
                  id: similarProduct.id,
                  name: similarProduct.name,
                  img: similarProduct.image,
                  price: similarProduct.price
                }
              },
              {},
              {}
            )} </li>`;
          })} `;
        }(__value);
      }(data.streamed.similarProducts)}</ul></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/18.js
var __exports19 = {};
__export(__exports19, {
  component: () => component19,
  fonts: () => fonts19,
  imports: () => imports19,
  index: () => index19,
  stylesheets: () => stylesheets19,
  universal: () => page_exports3,
  universal_id: () => universal_id7
});
var index19, component_cache19, component19, universal_id7, imports19, stylesheets19, fonts19;
var init__19 = __esm({
  ".svelte-kit/output/server/nodes/18.js"() {
    init_page3();
    index19 = 18;
    component19 = async () => component_cache19 ?? (component_cache19 = (await Promise.resolve().then(() => (init_page_svelte15(), page_svelte_exports15))).default);
    universal_id7 = "src/routes/produkte/[productid]/+page.js";
    imports19 = ["_app/immutable/nodes/18.BJ6FYLui.js", "_app/immutable/chunks/supabaseClient.CCJhsT86.js", "_app/immutable/chunks/index.C1t3ibtX.js", "_app/immutable/chunks/preload-helper.BQ24v_F8.js", "_app/immutable/chunks/scheduler.zM5vpuro.js", "_app/immutable/chunks/await_block.DV1PVPDO.js", "_app/immutable/chunks/index.Lc7HYTwW.js", "_app/immutable/chunks/each.D6YF6ztN.js", "_app/immutable/chunks/Button.DXAEX3aa.js", "_app/immutable/chunks/spread.CgU5AtxT.js", "_app/immutable/chunks/bundle-mjs.BTwrKG5i.js", "_app/immutable/chunks/Spinner.C4Jw4b_I.js", "_app/immutable/chunks/shops.IvLJLzM-.js", "_app/immutable/chunks/helper.ByxkrZMk.js"];
    stylesheets19 = [];
    fonts19 = [];
  }
});

// .svelte-kit/output/server/entries/pages/produkte/cat/_catid_/_page.ts.js
var page_ts_exports2 = {};
__export(page_ts_exports2, {
  load: () => load14,
  prerender: () => prerender
});
async function load14({ params }) {
  const catid = params.catid;
  console.log("Lade Cat Parameter ...", catid);
  const category = await getCategoryNameById2(parseInt(catid));
  const description = await getCategoryDescription(parseInt(catid));
  console.log("desc", description);
  const { data: products, error: error2 } = await supabase2.from("productwithpricecategories").select().eq("category_id", catid).order("name");
  const length = products?.length;
  return {
    catid,
    length,
    category,
    description,
    products
  };
}
var prerender;
var init_page_ts2 = __esm({
  ".svelte-kit/output/server/entries/pages/produkte/cat/_catid_/_page.ts.js"() {
    init_categories();
    init_supabaseClient();
    prerender = "false";
  }
});

// .svelte-kit/output/server/entries/pages/produkte/cat/_catid_/_page.svelte.js
var page_svelte_exports16 = {};
__export(page_svelte_exports16, {
  default: () => Page16
});
var css4, maxProductsPerPage, Page16;
var init_page_svelte16 = __esm({
  ".svelte-kit/output/server/entries/pages/produkte/cat/_catid_/_page.svelte.js"() {
    init_ssr();
    init_shops();
    css4 = {
      code: ".page-selector.svelte-ra8vou{margin-top:2.5rem;margin-bottom:2.5rem;display:flex;justify-content:center\n}.page-number.svelte-ra8vou{margin-left:1.25rem;cursor:pointer;border-width:2px;padding:0.5rem\n}.page-number.svelte-ra8vou:hover{--tw-bg-opacity:1;background-color:rgb(31 41 55 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));text-decoration-line:underline\n}.current-page.svelte-ra8vou{--tw-bg-opacity:1;background-color:rgb(63 131 248 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))\n}",
      map: null
    };
    maxProductsPerPage = 50;
    Page16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
      async function goToPage(page2) {
        currentPage = page2;
        const startIndex = (currentPage - 1) * maxProductsPerPage;
        const endIndex = startIndex + maxProductsPerPage;
        pageproducts = await data.products.slice(startIndex, endIndex);
        return pageproducts;
      }
      pageproducts = goToPage(1);
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      $$result.css.add(css4);
      pageproducts = data.products.slice(0, 10);
      length = data.products.length;
      category = data.category;
      description = data.description;
      totalPages = () => Math.ceil(length / maxProductsPerPage);
      return `${$$result.head += `<!-- HEAD_svelte-1xmwefo_START -->${$$result.title = `<title>Preisvergleich Produkte der alternativen Medizin - ${escape(category)}</title>`, ""}<meta name="description"${add_attribute("content", description, 0)}><!-- HEAD_svelte-1xmwefo_END -->`, ""} <div class="w-full"><h2 class="text-center my-5 p-2">${escape(length)} Produkte in der Kategorie ${escape(category)} gefunden.</h2></div>  ${description ? `<div class="border-2 p-2 bg-slate-100"><!-- HTML_TAG_START -->${description}<!-- HTML_TAG_END --></div>` : ``}  <ul class="grid grid-cols-2 md:grid-cols-3 space-y-5">${each(pageproducts, (product) => {
        return `<div class="lazy-load"><li class="my-2 relative"> <div class="absolute right-10 md:right-28"><!-- HTML_TAG_START -->${getBadge(product.id)}<!-- HTML_TAG_END --></div> ${validate_component(Product, "Product").$$render(
          $$result,
          {
            product: {
              id: product.id,
              name: product.name,
              img: product.image,
              price: product.price
            }
          },
          {},
          {}
        )}</li> </div>`;
      })}</ul>  ${totalPages() > 1 ? `<div class="page-selector svelte-ra8vou">${each(Array.from({ length: totalPages() }).map((_, index24) => index24 + 1), (page2) => {
        return `${page2 == currentPage ? `<span class="page-number current-page svelte-ra8vou">${escape(page2)}</span>` : `<a class="page-number svelte-ra8vou">${escape(page2)}</a>`}`;
      })}</div>` : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/19.js
var __exports20 = {};
__export(__exports20, {
  component: () => component20,
  fonts: () => fonts20,
  imports: () => imports20,
  index: () => index20,
  stylesheets: () => stylesheets20,
  universal: () => page_ts_exports2,
  universal_id: () => universal_id8
});
var index20, component_cache20, component20, universal_id8, imports20, stylesheets20, fonts20;
var init__20 = __esm({
  ".svelte-kit/output/server/nodes/19.js"() {
    init_page_ts2();
    index20 = 19;
    component20 = async () => component_cache20 ?? (component_cache20 = (await Promise.resolve().then(() => (init_page_svelte16(), page_svelte_exports16))).default);
    universal_id8 = "src/routes/produkte/cat/[catid]/+page.ts";
    imports20 = ["_app/immutable/nodes/19.DdpOcTNL.js", "_app/immutable/chunks/categories.VNeXaOrY.js", "_app/immutable/chunks/supabaseClient.CCJhsT86.js", "_app/immutable/chunks/index.C1t3ibtX.js", "_app/immutable/chunks/preload-helper.BQ24v_F8.js", "_app/immutable/chunks/scheduler.zM5vpuro.js", "_app/immutable/chunks/index.Lc7HYTwW.js", "_app/immutable/chunks/each.D6YF6ztN.js", "_app/immutable/chunks/shops.IvLJLzM-.js"];
    stylesheets20 = ["_app/immutable/assets/19.9luic-sZ.css"];
    fonts20 = [];
  }
});

// .svelte-kit/output/server/entries/pages/produkte/hashtag/_tag_/_page.ts.js
var page_ts_exports3 = {};
__export(page_ts_exports3, {
  load: () => load15
});
async function getProductsByName(name2) {
  console.log("getProductsByName", name2);
  const { data, error: error2 } = await supabase2.from("products").select("*").ilike("name", "%" + name2 + "%").order("name");
  if (error2) {
    console.log("Fehler beim Abrufen getProductsByName");
  } else
    return data;
}
async function load15({ params }) {
  console.log("hashtags:");
  let products = [];
  const hashtagid = params.tag;
  const { tag: hashtag } = await getHashtag(hashtagid);
  products = await getProductsByName(hashtag);
  const length = products?.length;
  return {
    hashtag,
    length,
    products
  };
}
var init_page_ts3 = __esm({
  ".svelte-kit/output/server/entries/pages/produkte/hashtag/_tag_/_page.ts.js"() {
    init_supabaseClient();
    init_getHashtags();
  }
});

// .svelte-kit/output/server/entries/pages/produkte/hashtag/_tag_/_page.svelte.js
var page_svelte_exports17 = {};
__export(page_svelte_exports17, {
  default: () => Page17
});
var css5, Page17;
var init_page_svelte17 = __esm({
  ".svelte-kit/output/server/entries/pages/produkte/hashtag/_tag_/_page.svelte.js"() {
    init_ssr();
    init_shops();
    css5 = {
      code: "li.svelte-s2hndc{list-style-type:none\n\n  }",
      map: null
    };
    Page17 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let hashtag;
      let products;
      let { data } = $$props;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      $$result.css.add(css5);
      hashtag = data.hashtag;
      products = data.products;
      return `${$$result.head += `<!-- HEAD_svelte-1rcrqm2_START -->${$$result.title = `<title>Der Preisvergleich f\xFCr ${escape(hashtag)} Produkte</title>`, ""}<meta name="description" content="Entdecken Sie eine Vielzahl nat\xFCrlicher Produkte der alternativen Medizin und vergleichen Sie Preise mit unserer Preisvergleichs-Maschine. Unsere Produktgruppe bietet eine breite Auswahl an alternativen Naturprodukten, die darauf abzielen, die Gesundheit auf ganzheitliche Weise zu unterst\xFCtzen, ohne auf pharmazeutische Medikamente zur\xFCckzugreifen. Finden Sie die besten Angebote f\xFCr alternative Medizinprodukte und nutzen Sie unsere Plattform f\xFCr transparente Preisvergleiche.  "><!-- HEAD_svelte-1rcrqm2_END -->`, ""} <div class="w-full"><h2 class="text-center my-5 p-2">Produkte mit dem Hashtag ${escape(hashtag)} gefunden.</h2></div>  <div class="grid grid-cols-2 md:grid-cols-3 space-y-5">${each(products, (product) => {
        return `<div class="lazy-load"><li class="my-2 relative svelte-s2hndc"> <div class="absolute right-10 md:right-28"><!-- HTML_TAG_START -->${getBadge(product.id)}<!-- HTML_TAG_END --></div> ${validate_component(Product, "Product").$$render(
          $$result,
          {
            product: {
              id: product.id,
              name: product.name,
              img: product.image,
              price: product.price
            }
          },
          {},
          {}
        )}</li> </div>`;
      })} </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/20.js
var __exports21 = {};
__export(__exports21, {
  component: () => component21,
  fonts: () => fonts21,
  imports: () => imports21,
  index: () => index21,
  stylesheets: () => stylesheets21,
  universal: () => page_ts_exports3,
  universal_id: () => universal_id9
});
var index21, component_cache21, component21, universal_id9, imports21, stylesheets21, fonts21;
var init__21 = __esm({
  ".svelte-kit/output/server/nodes/20.js"() {
    init_page_ts3();
    index21 = 20;
    component21 = async () => component_cache21 ?? (component_cache21 = (await Promise.resolve().then(() => (init_page_svelte17(), page_svelte_exports17))).default);
    universal_id9 = "src/routes/produkte/hashtag/[tag]/+page.ts";
    imports21 = ["_app/immutable/nodes/20.DRhtnoM4.js", "_app/immutable/chunks/supabaseClient.CCJhsT86.js", "_app/immutable/chunks/index.C1t3ibtX.js", "_app/immutable/chunks/preload-helper.BQ24v_F8.js", "_app/immutable/chunks/getHashtags.DsRrQDEt.js", "_app/immutable/chunks/scheduler.zM5vpuro.js", "_app/immutable/chunks/index.Lc7HYTwW.js", "_app/immutable/chunks/each.D6YF6ztN.js", "_app/immutable/chunks/shops.IvLJLzM-.js"];
    stylesheets21 = ["_app/immutable/assets/20.DxDbzGoM.css"];
    fonts21 = [];
  }
});

// .svelte-kit/output/server/entries/pages/search/_page.server.ts.js
var page_server_ts_exports5 = {};
__export(page_server_ts_exports5, {
  load: () => load16,
  prerender: () => prerender2
});
async function searchBooks(q) {
  let anzahl = q.split(" ").length;
  if (anzahl > 1)
    q = q.split(" ").join(" & ");
  const { data } = await supabase2.from("books").select().textSearch("fts", q, { config: "german" }).limit(30);
  if (data !== null && typeof data !== "undefined") {
    return data;
  } else {
    console.log("Die Buchsuche ergab kein Ergebnis.");
    return [];
  }
}
async function searchProducts(q) {
  let anzahl = q.split(" ").length;
  if (anzahl > 1)
    q = q.split(" ").join(" & ");
  const { data } = await supabase2.from("products").select().textSearch("fts", q, { config: "german" }).limit(30);
  if (data !== null && typeof data !== "undefined") {
    return data;
  } else {
    console.log("Die Produktsuche ergab kein Ergebnis.");
    return [];
  }
}
async function searchSamples(q) {
  let anzahl = q.split(" ").length;
  if (anzahl > 1)
    q = q.split(" ").join(" & ");
  const { data } = await supabase2.from("readingsamples").select().textSearch("fts", q, { config: "german" }).limit(30);
  if (data !== null && typeof data !== "undefined") {
    return data;
  } else {
    console.log("Die Informationssuche (readingsamples) ergab kein Ergebnis.");
    return [];
  }
}
async function load16({ params, url }) {
  let q = url.searchParams.get("q");
  const books = await searchBooks(q);
  const products = await searchProducts(q);
  const samples = await searchSamples(q);
  return { q, books, products, samples };
}
var prerender2;
var init_page_server_ts5 = __esm({
  ".svelte-kit/output/server/entries/pages/search/_page.server.ts.js"() {
    init_supabaseClient();
    prerender2 = false;
  }
});

// .svelte-kit/output/server/entries/pages/search/_page.svelte.js
var page_svelte_exports18 = {};
__export(page_svelte_exports18, {
  default: () => Page18
});
var css6, Page18;
var init_page_svelte18 = __esm({
  ".svelte-kit/output/server/entries/pages/search/_page.svelte.js"() {
    init_ssr();
    init_shops();
    init_book();
    css6 = {
      code: ".books.svelte-1dymfdw{--tw-bg-opacity:1;background-color:rgb(248 180 180 / var(--tw-bg-opacity));padding-left:0.5rem;padding-right:0.5rem\n}.products.svelte-1dymfdw{--tw-bg-opacity:1;background-color:rgb(164 202 254 / var(--tw-bg-opacity));padding-left:0.5rem;padding-right:0.5rem\n}.samples.svelte-1dymfdw{--tw-bg-opacity:1;background-color:rgb(132 225 188 / var(--tw-bg-opacity));padding-left:0.5rem;padding-right:0.5rem\n}",
      map: null
    };
    Page18 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let books;
      let qtyBooks;
      let products;
      let qtyProducts;
      let samples;
      let qtySamples;
      let q;
      let { data } = $$props;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      $$result.css.add(css6);
      books = data.books;
      qtyBooks = data.books.length;
      products = data.products;
      qtyProducts = data.products.length;
      samples = data.samples;
      qtySamples = data.samples.length;
      q = data.q;
      return `<div class="p-2 mt-5 border-2 "><div class="mb-5">Zu Ihrer Suche nach 
    <span class="bg-yellow-200 px-2">${escape(q)}</span>
    
    wurden 
    <span class="books svelte-1dymfdw">${escape(qtyBooks)} B\xFCcher</span>
    und 
    <span class="products svelte-1dymfdw">${escape(qtyProducts)} Produkte</span>
    und 
    <span class="samples svelte-1dymfdw">${escape(qtySamples)} Informationen aus Leseproben</span>    
    gefunden.</div> <div data-svelte-h="svelte-bainjd">Wir empfehlen Ihnen die Ergebnisse in einem neuen Tab zu \xF6ffnen, damit das Suchergebnis bestehen bleibt.</div> <div class="md:hidden" data-svelte-h="svelte-1bl7x2w">Wenn Sie ein Smartphone benutzen einfach einen Link gedr\xFCckt halten.</div> <div class="hidden md:block" data-svelte-h="svelte-he5833">Wenn Sie ein PC benutzen: 1. Rechts klick 2. Link in neuem Tab \xF6ffnen.</div> ${qtyProducts == 30 ? `<div class="bg-green-100" data-svelte-h="svelte-nvrfyp">Hinweis: Aus Performance Gr\xFCnden werden Suchergebnisse auf 30 Produkte limitiert. Falls Sie Ihr Produkt nicht finden, verfeinern Sie Ihre Suche mit einem weiteren Begriff.</div>` : ``} ${qtyBooks == 30 ? `<div class="bg-red-100" data-svelte-h="svelte-ynsik0">Hinweis: Aus Performance Gr\xFCnden werden Suchergebnisse auf 30 B\xFCcher limitiert. Falls Sie Ihr Buch nicht finden, verfeinern Sie Ihre Suche mit einem weiteren Begriff.</div>` : ``} ${qtySamples == 30 ? `<div class="bg-red-100" data-svelte-h="svelte-ygstbl">Hinweis: Aus Performance Gr\xFCnden werden Suchergebnisse auf 30 Informationen limitiert. Falls Sie Ihr Buch nicht finden, verfeinern Sie Ihre Suche mit einem weiteren Begriff.</div>` : ``} <div class="samples w-full text-center my-5 svelte-1dymfdw" data-svelte-h="svelte-mh3s3t"><h2>Ergebnisse Informationen aus Leseproben:</h2></div> <ul class="grid grid-cols-2 md:grid-cols-3">${each(samples, (sample) => {
        return `<a href="${"/leseproben/" + escape(sample.slug, true)}"><div class="border-2 m-2 p-2">${escape(sample.id)}</div> </a>`;
      })}</ul> <div class="books w-full text-center my-5 svelte-1dymfdw" data-svelte-h="svelte-568k65"><h2>Ergebnisse B\xFCcher:</h2></div> <ul class="grid grid-cols-2 md:grid-cols-3">${each(books, (book) => {
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
      })}</ul> <div class="products w-full text-center my-5 svelte-1dymfdw" data-svelte-h="svelte-jdtyn1"><h2>Ergebnisse Produkte:</h2></div> <ul class="grid grid-cols-2 md:grid-cols-3">${each(products, (product) => {
        return `<div class=""><li class="my-5 py-5 relative"><div class="absolute right-10"><!-- HTML_TAG_START -->${getBadge(product.id)}<!-- HTML_TAG_END --></div> ${validate_component(Product, "Product").$$render(
          $$result,
          {
            product: {
              id: product.id,
              name: product.name,
              img: product.image,
              price: product.price
            }
          },
          {},
          {}
        )}</li> </div>`;
      })}</ul> <div class="mt-10"><h2 data-svelte-h="svelte-1f5j7l5">Nicht das passende hier gefunden? Versuchen Sie es mit Amazon oder Ebay</h2> <p data-svelte-h="svelte-iclnsj">Ihren Suchtext haben wir bereits f\xFCr Sie im Link eingebaut.</p> <div class="my-5 pb-10 flex flex-col items-center space-y-5"><a href="${"https://www.amazon.de/gp/search?ie=UTF8&tag=jumex_online-21&linkCode=ur2&linkId=470bf27aa1feb315de9cb5f18b114f2f&camp=1638&creative=6742&index=books&keywords=" + escape(q, true)}" target="_blank"><div class="text-lg mt-3" color="light" data-svelte-h="svelte-1ov1sdi"><img alt="amazon logo" width="100" src="/images/logos/Amazon.de-Logo.svg.png"></div></a> <a href="${"https://www.ebay.de/sch/i.html?_from=R40&_trksid=p4432023.m570.l1313&_nkw=" + escape(q, true) + "&_sacat=0"}" target="_blank"><div class="text-lg mt-3" color="light" data-svelte-h="svelte-17b32z5"><img alt="ebay logo" width="100" src="/images/logos/EBay_logo.png"></div></a></div></div> </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/21.js
var __exports22 = {};
__export(__exports22, {
  component: () => component22,
  fonts: () => fonts22,
  imports: () => imports22,
  index: () => index22,
  server: () => page_server_ts_exports5,
  server_id: () => server_id9,
  stylesheets: () => stylesheets22
});
var index22, component_cache22, component22, server_id9, imports22, stylesheets22, fonts22;
var init__22 = __esm({
  ".svelte-kit/output/server/nodes/21.js"() {
    init_page_server_ts5();
    index22 = 21;
    component22 = async () => component_cache22 ?? (component_cache22 = (await Promise.resolve().then(() => (init_page_svelte18(), page_svelte_exports18))).default);
    server_id9 = "src/routes/search/+page.server.ts";
    imports22 = ["_app/immutable/nodes/21.BkvKYtF4.js", "_app/immutable/chunks/scheduler.zM5vpuro.js", "_app/immutable/chunks/index.Lc7HYTwW.js", "_app/immutable/chunks/each.D6YF6ztN.js", "_app/immutable/chunks/shops.IvLJLzM-.js", "_app/immutable/chunks/book.Cz4ZLkXb.js", "_app/immutable/chunks/getBookImg.B3agDJL6.js"];
    stylesheets22 = ["_app/immutable/assets/21.m0hAA98p.css"];
    fonts22 = [];
  }
});

// .svelte-kit/output/server/entries/pages/test/_page.svelte.js
var page_svelte_exports19 = {};
__export(page_svelte_exports19, {
  default: () => Page19
});
var Page19;
var init_page_svelte19 = __esm({
  ".svelte-kit/output/server/entries/pages/test/_page.svelte.js"() {
    init_ssr();
    Page19 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<h2 data-svelte-h="svelte-3u76de">Hello World</h2>`;
    });
  }
});

// .svelte-kit/output/server/nodes/22.js
var __exports23 = {};
__export(__exports23, {
  component: () => component23,
  fonts: () => fonts23,
  imports: () => imports23,
  index: () => index23,
  stylesheets: () => stylesheets23
});
var index23, component_cache23, component23, imports23, stylesheets23, fonts23;
var init__23 = __esm({
  ".svelte-kit/output/server/nodes/22.js"() {
    index23 = 22;
    component23 = async () => component_cache23 ?? (component_cache23 = (await Promise.resolve().then(() => (init_page_svelte19(), page_svelte_exports19))).default);
    imports23 = ["_app/immutable/nodes/22.ih-zs7kB.js", "_app/immutable/chunks/scheduler.zM5vpuro.js", "_app/immutable/chunks/index.Lc7HYTwW.js"];
    stylesheets23 = [];
    fonts23 = [];
  }
});

// .svelte-kit/output/server/entries/endpoints/api/protected-route/_server.ts.js
var server_ts_exports = {};
__export(server_ts_exports, {
  GET: () => GET
});
var GET;
var init_server_ts = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/protected-route/_server.ts.js"() {
    init_chunks();
    GET = async ({ locals: { supabase: supabase3, getSession: getSession2 } }) => {
      const session = await getSession2();
      if (!session) {
        throw error(401, { message: "Unauthorized" });
      }
      const { data } = await supabase3.from("test").select("*");
      return json({ data });
    };
  }
});

// .svelte-kit/output/server/entries/endpoints/auth/callback/_server.js
var server_exports = {};
__export(server_exports, {
  GET: () => GET2
});
var GET2;
var init_server = __esm({
  ".svelte-kit/output/server/entries/endpoints/auth/callback/_server.js"() {
    init_chunks();
    GET2 = async ({ url, locals: { supabase: supabase3 } }) => {
      const code = url.searchParams.get("code");
      if (code) {
        await supabase3.auth.exchangeCodeForSession(code);
      }
      redirect(303, "/");
    };
  }
});

// .svelte-kit/output/server/entries/endpoints/sitemap.xml/_server.js
var server_exports2 = {};
__export(server_exports2, {
  GET: () => GET3
});
async function GET3() {
  const { data: books, err } = await supabase2.from("books").select("id").eq("active", true);
  if (err) {
    console.error("Fehler beim Abrufen der Produktdaten aus der Datenbank:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
  const pages = ["produkte", "buecher", "gutscheine", "cdl-protokolle"];
  const { data: products, error: error2 } = await supabase2.from("products").select("id, updated_at");
  if (error2) {
    console.error("Fehler beim Abrufen der Produktdaten aus der Datenbank:", error2);
    return new Response("Internal Server Error", { status: 500 });
  }
  const site = "https://www.cdl-protokolle.com";
  const sitemapXml = generateSitemap(products, site, pages, books);
  return new Response(sitemapXml, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
}
function generateSitemap(products, site, pages, books) {
  pages = pages.map((page2) => `
    <url>
      <loc>${site}/${page2}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>
  `).join("");
  products = products.map((product) => `
    <url>
      <loc>${site}/produkte/${product.id}</loc>
      <changefreq>weekly</changefreq>
      <lastmod>${product.updated_at}</lastmod>
      <priority>0.3</priority>
    </url>
  `).join("");
  books = books.map((book) => `
    <url>
      <loc>${site}/buecher/${book.id}</loc>
      <changefreq>weekly</changefreq>
      <lastmod>2024-03-20</lastmod>
      <priority>0.4</priority>
    </url>
  `).join("");
  return `
    <?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xhtml="https://www.w3.org/1999/xhtml"
      xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
      xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >
      ${books}
      ${pages}
      ${products}
      
    </urlset>
  `.trim();
}
var init_server2 = __esm({
  ".svelte-kit/output/server/entries/endpoints/sitemap.xml/_server.js"() {
    init_supabaseClient();
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
  version_hash: "qznvrm"
};
async function get_hooks() {
  return {
    ...await Promise.resolve().then(() => (init_hooks_server(), hooks_server_exports))
  };
}

// .svelte-kit/output/server/index.js
init_chunks();
init_exports();
init_index2();
var DEV = false;
var SVELTE_KIT_ASSETS = "/_svelte_kit_assets";
var ENDPOINT_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"];
var PAGE_METHODS = ["GET", "POST", "HEAD"];
function negotiate(accept, types2) {
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
  for (const mimetype of types2) {
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
function is_content_type(request, ...types2) {
  const type = request.headers.get("content-type")?.split(";", 1)[0].trim() ?? "";
  return types2.includes(type.toLowerCase());
}
function is_form_content_type(request) {
  return is_content_type(
    request,
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
  );
}
function coalesce_to_error(err) {
  return err instanceof Error || err && /** @type {any} */
  err.name && /** @type {any} */
  err.message ? (
    /** @type {Error} */
    err
  ) : new Error(JSON.stringify(err));
}
function normalize_error(error2) {
  return (
    /** @type {import('../runtime/control.js').Redirect | HttpError | SvelteKitError | Error} */
    error2
  );
}
function get_status(error2) {
  return error2 instanceof HttpError || error2 instanceof SvelteKitError ? error2.status : 500;
}
function get_message(error2) {
  return error2 instanceof SvelteKitError ? error2.text : "Internal Error";
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
async function handle_fatal_error(event, options2, error2) {
  error2 = error2 instanceof HttpError ? error2 : coalesce_to_error(error2);
  const status = get_status(error2);
  const body2 = await handle_error_and_jsonify(event, options2, error2);
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
async function handle_error_and_jsonify(event, options2, error2) {
  if (error2 instanceof HttpError) {
    return error2.body;
  }
  const status = get_status(error2);
  const message = get_message(error2);
  return await options2.hooks.handleError({ error: error2, event, status, message }) ?? { message };
}
function redirect_response(status, location) {
  const response = new Response(void 0, {
    status,
    headers: { location }
  });
  return response;
}
function clarify_devalue_error(event, error2) {
  if (error2.path) {
    return `Data returned from \`load\` while rendering ${event.route.id} is not serializable: ${error2.message} (data${error2.path})`;
  }
  if (error2.path === "") {
    return `Data returned from \`load\` while rendering ${event.route.id} is not a plain object`;
  }
  return error2.message;
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
  const prerender3 = mod.prerender ?? state.prerender_default;
  if (prerender3 && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
    throw new Error("Cannot prerender endpoints that have mutative methods");
  }
  if (state.prerendering && !prerender3) {
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
      response.headers.set("x-sveltekit-prerender", String(prerender3));
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
    const index25 = p++;
    indexes.set(thing, index25);
    for (const { key: key2, fn } of custom) {
      const value2 = fn(thing);
      if (value2) {
        stringified[index25] = `["${key2}",${flatten(value2)}]`;
        return index25;
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
    stringified[index25] = str;
    return index25;
  }
  const index24 = flatten(value);
  if (index24 < 0)
    return `${index24}`;
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
  const actions3 = server2?.actions;
  if (!actions3) {
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
  check_named_default_separate(actions3);
  try {
    const data = await call_action(event, actions3);
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
function check_incorrect_fail_use(error2) {
  return error2 instanceof ActionFailure ? new Error('Cannot "throw fail()". Use "return fail()"') : error2;
}
function action_json_redirect(redirect2) {
  return action_json({
    type: "redirect",
    status: redirect2.status,
    location: redirect2.location
  });
}
function action_json(data, init2) {
  return json(data, init2);
}
function is_action_request(event) {
  return event.request.method === "POST";
}
async function handle_action_request(event, server2) {
  const actions3 = server2?.actions;
  if (!actions3) {
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
  check_named_default_separate(actions3);
  try {
    const data = await call_action(event, actions3);
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
function check_named_default_separate(actions3) {
  if (actions3.default && Object.keys(actions3).length > 1) {
    throw new Error(
      "When using named actions, the default action cannot be used. See the docs for more info: https://kit.svelte.dev/docs/form-actions#named-actions"
    );
  }
}
async function call_action(event, actions3) {
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
  const action = actions3[name2];
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
    const error2 = (
      /** @type {any} */
      e
    );
    if ("path" in error2) {
      let message = `Data returned from action inside ${route_id} is not serializable: ${error2.message}`;
      if (error2.path !== "")
        message += ` (data.${error2.path})`;
      throw new Error(message);
    }
    throw error2;
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
      const get3 = response.headers.get;
      response.headers.get = (key2) => {
        const lower = key2.toLowerCase();
        const value = get3.call(response.headers, lower);
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
  const decoder2 = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += decoder2.decode(value);
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
function sha2562(data) {
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
        const hash2 = sha2562(content);
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
        const hash2 = sha2562(content);
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
  constructor({ mode, directives, reportOnly }, { prerender: prerender3 }) {
    /** @readonly */
    __publicField(this, "nonce", generate_nonce());
    /** @type {CspProvider} */
    __publicField(this, "csp_provider");
    /** @type {CspReportOnlyProvider} */
    __publicField(this, "report_only_provider");
    const use_hashes = mode === "hash" || mode === "auto" && prerender3;
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
  error: error2 = null,
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
  const stylesheets24 = new Set(client.stylesheets);
  const fonts24 = new Set(client.fonts);
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
      error: error2,
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
        stylesheets24.add(url);
      for (const url of node.fonts)
        fonts24.add(url);
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
  for (const dep of stylesheets24) {
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
  for (const dep of fonts24) {
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
  const global2 = `__sveltekit_${options2.version_hash}`;
  const { data, chunks } = get_data(
    event,
    options2,
    branch.map((b) => b.server_data),
    global2
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
    blocks.push(`${global2} = {
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
      if (error2) {
        serialized.error = uneval(error2);
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
						${global2}.env = env;

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
function get_data(event, options2, nodes, global2) {
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
        async (error2) => ({
          error: await handle_error_and_jsonify(event, options2, error2)
        })
      ).then(
        /**
         * @param {{data: any; error: any}} result
         */
        async ({ data, error: error2 }) => {
          count -= 1;
          let str;
          try {
            str = uneval({ id, data, error: error2 }, replacer);
          } catch (e) {
            error2 = await handle_error_and_jsonify(
              event,
              options2,
              new Error(`Failed to serialize promise while rendering ${event.route.id}`)
            );
            data = void 0;
            str = uneval({ id, data, error: error2 }, replacer);
          }
          push(`<script>${global2}.resolve(${str})<\/script>
`);
          if (count === 0)
            done();
        }
      );
      return `${global2}.defer(${id})`;
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
  error: error2,
  resolve_opts
}) {
  if (event.request.headers.get("x-sveltekit-error")) {
    return static_error_page(
      options2,
      status,
      /** @type {Error} */
      error2.message
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
      error: await handle_error_and_jsonify(event, options2, error2),
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
var encoder3 = new TextEncoder();
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
        (p, i) => p.catch(async (error2) => {
          if (error2 instanceof Redirect) {
            throw error2;
          }
          length = Math.min(length, i + 1);
          return (
            /** @type {import('types').ServerErrorNode} */
            {
              type: "error",
              error: await handle_error_and_jsonify(event, options2, error2),
              status: error2 instanceof HttpError || error2 instanceof SvelteKitError ? error2.status : void 0
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
          controller.enqueue(encoder3.encode(data));
          for await (const chunk of chunks) {
            controller.enqueue(encoder3.encode(chunk));
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
    const error2 = normalize_error(e);
    if (error2 instanceof Redirect) {
      return redirect_json_response(error2);
    } else {
      return json_response(await handle_error_and_jsonify(event, options2, error2), 500);
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
function redirect_json_response(redirect2) {
  return json_response({
    type: "redirect",
    location: redirect2.location
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
              const error2 = await handle_error_and_jsonify(
                event,
                options2,
                new Error(`Failed to serialize promise while rendering ${event.route.id}`)
              );
              key2 = "error";
              str = stringify(error2, reducers);
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
          const error2 = await handle_error_and_jsonify(event, options2, err);
          while (i--) {
            if (page2.errors[i]) {
              const index24 = (
                /** @type {number} */
                page2.errors[i]
              );
              const node2 = await manifest2._.nodes[index24]();
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
                error: error2,
                branch: compact(branch.slice(0, j + 1)).concat({
                  node: node2,
                  data: null,
                  server_data: null
                }),
                fetched
              });
            }
          }
          return static_error_page(options2, status2, error2.message);
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
  var dec = opt.decode || decode3;
  var index24 = 0;
  while (index24 < str.length) {
    var eqIdx = str.indexOf("=", index24);
    if (eqIdx === -1) {
      break;
    }
    var endIdx = str.indexOf(";", index24);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index24 = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    var key2 = str.slice(index24, eqIdx).trim();
    if (void 0 === obj[key2]) {
      var val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.charCodeAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key2] = tryDecode(val, dec);
    }
    index24 = endIdx + 1;
  }
  return obj;
}
function serialize(name2, val, options2) {
  var opt = options2 || {};
  var enc = opt.encode || encode3;
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
function decode3(str) {
  return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
}
function encode3(val) {
  return encodeURIComponent(val);
}
function isDate(val) {
  return __toString.call(val) === "[object Date]" || val instanceof Date;
}
function tryDecode(str, decode22) {
  try {
    return decode22(str);
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
      const decoder2 = opts?.decode || decodeURIComponent;
      const req_cookies = parse_1(header, { decode: decoder2 });
      const cookie = req_cookies[name2];
      return cookie;
    },
    /**
     * @param {import('cookie').CookieParseOptions} opts
     */
    getAll(opts) {
      const decoder2 = opts?.decode || decodeURIComponent;
      const cookies2 = parse_1(header, { decode: decoder2 });
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
      const encoder22 = cookie.options.encode || encodeURIComponent;
      combined_cookies[cookie.name] = encoder22(cookie.value);
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
          const authorization2 = event.request.headers.get("authorization");
          if (authorization2 && !request.headers.has("authorization")) {
            request.headers.set("authorization", authorization2);
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
        let config = {};
        let prerender3 = false;
        if (route.endpoint) {
          const node = await route.endpoint();
          config = node.config ?? config;
          prerender3 = node.prerender ?? prerender3;
        } else if (route.page) {
          const nodes = await load_page_nodes(route.page, manifest2);
          config = get_page_config(nodes) ?? config;
          prerender3 = get_option(nodes, "prerender") ?? false;
        }
        if (state.before_handle) {
          state.before_handle(event, config, prerender3);
        }
        if (state.emulator?.platform) {
          event.platform = await state.emulator.platform({ config, prerender: prerender3 });
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
          handleError: module.handleError || (({ error: error2 }) => console.error(error2)),
          handleFetch: module.handleFetch || (({ request, fetch: fetch22 }) => fetch22(request)),
          reroute: module.reroute || (() => {
          })
        };
      } catch (error2) {
        {
          throw error2;
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

// .svelte-kit/vercel-tmp/fn/manifest.js
var manifest = (() => {
  function __memo(fn) {
    let value;
    return () => value ?? (value = value = fn());
  }
  return {
    appDir: "_app",
    appPath: "_app",
    assets: /* @__PURE__ */ new Set(["favicon.png", "images/Intentional Health Color Palette - color-hex.com.png", "images/books/11/Download (1).jpeg", "images/books/12/41HNtcZrJIL._AC_SY780_.jpg", "images/books/13/vitaminum_buch-adipositas.jpg", "images/books/14/Download.jpeg", "images/books/15/61ttNVVSNGL._SL1200_.jpg", "images/books/16/615bfp88qmL._AC_UF1000,1000_QL80_.jpg", "images/books/19/81PGdHerZ7L._AC_UF1000,1000_QL80_.jpg", "images/books/20/61IZVC4ae7L._AC_UF894,1000_QL80_.jpg", "images/books/21/130877.jpg", "images/books/22/9783384006486.jpg", "images/books/23/LP_Desktop_Der-grosse-Cholesterin-Schwindel_968200.jpg", "images/books/24/134140.jpg", "images/books/25/Byebye-covid-2-1-1_600x600.png", "images/books/26/handbuch-der-kolloidalen-metalle_600x600.jpg", "images/books/27/Klinikhandbuch-Aromatherapie_600x600.png", "images/books/28/Arthrose_ist_heilbar_mockup_web-jpg_600x600.jpg", "images/books/29/Manuka_Buch_webshop-jpg_600x600.jpg", "images/books/3/Codex-Humanus_Band-400x400.png.webp", "images/books/30/em-eine-chance-fuer-unsere-erde-anne-lorch_600x600.jpg", "images/books/31/buch-borreliose-natuerlich-heilen-wolf-dieter-storl_600x600.jpg", "images/books/32/buch-pflanzliche-antibiotika-richtig-anwenden_600x600.jpg", "images/books/33/buch-die-leber-natuerlich-reinigen_600x600.jpg", "images/books/34/Borax_600x600.jpg", "images/books/35/CDL-Handbuch-LUBZ_600x600.jpg", "images/books/36/buch-cannabis-und-cannabidiol-cbd-richtig-anwenden_600x600.jpg", "images/books/37/DMSO-Handbuch_600x600.jpg", "images/books/38/9783742305466.jpg", "images/books/39/9783442136940.jpg", "images/books/4/48311634z.jpg", "images/books/40/LP_Desktop_Eine_Welt_ohne_Krebs_934400.jpg", "images/books/41/csm_Arthrose_sf_96cd795fd7.png", "images/books/42/csm_Schlaganfall_sf_b80b9479e7.png", "images/books/43/csm_Arthritis_sf_f14cf697d8.png", "images/books/44/csm_Herzinfarkt_sf_a79a7e080b.png", "images/books/45/csm_Allergie_sf_0b1712fbae.png", "images/books/46/csm_Diabetes_sf_eb5e63ec34.png", "images/books/47/csm_Depressionen_sf_57234aadf0.png", "images/books/48/csm_Impotenz_sf_fd3e1e85bc.png", "images/books/49/csm_Alterung_sf-200px_b54d6bce79.png", "images/books/50/Pilzerkrankungen_sf-200px.png", "images/books/51/Asthma-und-bers-uerung_600x600.jpg", "images/books/52/csm_Migraene_sf_ae4d7c3a0d.png", "images/books/53/Borreliose-und-bers-uerung_600x600.jpg", "images/books/54/Arteriosklerose-und-bers-uerung_600x600.jpg", "images/books/6/csm_Bluthochdruck_sf_739bfc2751.png", "images/books/7/vitaminum_buch-alzheimer.png", "images/books/8/Download.jpeg", "images/books/9/61-3sI2vGcL.jpg", "images/books/no_cover.jpeg", "images/logos/Amazon.de-Logo.svg.png", "images/logos/EBay_logo.png", "images/products/bedrop/propolis/be-pp-1.webp", "images/products/bedrop/propolis/be-pp-10.webp", "images/products/bedrop/propolis/be-pp-11.webp", "images/products/bedrop/propolis/be-pp-12.webp", "images/products/bedrop/propolis/be-pp-13.webp", "images/products/bedrop/propolis/be-pp-14.webp", "images/products/bedrop/propolis/be-pp-15.webp", "images/products/bedrop/propolis/be-pp-16.webp", "images/products/bedrop/propolis/be-pp-17.webp", "images/products/bedrop/propolis/be-pp-18.webp", "images/products/bedrop/propolis/be-pp-19.webp", "images/products/bedrop/propolis/be-pp-2.webp", "images/products/bedrop/propolis/be-pp-20.webp", "images/products/bedrop/propolis/be-pp-21.webp", "images/products/bedrop/propolis/be-pp-22.webp", "images/products/bedrop/propolis/be-pp-23.webp", "images/products/bedrop/propolis/be-pp-24.webp", "images/products/bedrop/propolis/be-pp-3.webp", "images/products/bedrop/propolis/be-pp-4.webp", "images/products/bedrop/propolis/be-pp-5.webp", "images/products/bedrop/propolis/be-pp-6.webp", "images/products/bedrop/propolis/be-pp-7.webp", "images/products/bedrop/propolis/be-pp-8.webp", "images/products/bedrop/propolis/be-pp-9.webp", "images/products/cellavita/bio-lebensmittel/1-maca-rot-beutel-einzeln_6_600x600.jpg", "images/products/cellavita/bio-lebensmittel/1-maca-schwarzbeutel-einzeln_1_600x600.jpg", "images/products/cellavita/bio-lebensmittel/1-produktfoto-maca-rot-glas_2_600x600.jpg", "images/products/cellavita/bio-lebensmittel/1-produktfoto-maca-schwarz8ivHrtJaMogPC_600x600.jpg", "images/products/cellavita/bio-lebensmittel/beutel-einzeln_300-kapseln_25_600x600.jpg", "images/products/cellavita/bio-lebensmittel/beutel-einzeln_300-kapseln_26_600x600.jpg", "images/products/cellavita/bio-lebensmittel/beutel-einzeln__11_600x600.jpg", "images/products/cellavita/bio-lebensmittel/beutel-einzeln_acerola_300-kapseln_3_600x600.jpg", "images/products/cellavita/bio-lebensmittel/beutel-einzeln_maca-500-kapseln_3_600x600.jpg", "images/products/cellavita/bio-lebensmittel/bio-gerstengras-pulver_flasche-kopie_1_600x600.jpg", "images/products/cellavita/bio-lebensmittel/bio-gerstengrassaft-pulver_flasche_frei-kopie_1_600x600.jpg", "images/products/cellavita/bio-lebensmittel/bio-weizengras-pulver_flasche_frei-kopie_7_600x600.jpg", "images/products/cellavita/bio-lebensmittel/bratlinge-5-1-setSq74FWw0X6KAD_600x600.jpg", "images/products/cellavita/bio-lebensmittel/dinkelbild_neu_ohne_banner_2_600x600.jpg", "images/products/cellavita/bio-lebensmittel/flasche-acerola-180-kapseln-shop_3_600x600.jpg", "images/products/cellavita/bio-lebensmittel/flasche-acerola-90g-neu-shop_6_600x600.jpg", "images/products/cellavita/bio-lebensmittel/flasche-tiere-acerola-90g-shop_3_600x600.jpg", "images/products/cellavita/bio-lebensmittel/front-acerola-1-kg-beutel-shop_10_600x600.jpg", "images/products/cellavita/bio-lebensmittel/front-acerola-500g-beutel-shop_6_600x600.jpg", "images/products/cellavita/bio-lebensmittel/front-aufbau-gold-700g-beutel-shop_5_600x600.jpg", "images/products/cellavita/bio-lebensmittel/front-chlorella-spirulina-pferd-5kg-shop_6_600x600.jpg", "images/products/cellavita/bio-lebensmittel/front-cordyceps-500-kps-shop_6_600x600.jpg", "images/products/cellavita/bio-lebensmittel/front-curcuma-500-g-shop_15_600x600.jpg", "images/products/cellavita/bio-lebensmittel/front-curcuma-pferde-5kg-shop_3_600x600.jpg", "images/products/cellavita/bio-lebensmittel/front-etikett-1kg-shop_10_600x600.jpg", "images/products/cellavita/bio-lebensmittel/front-flohsamenschalen-500-g-shop_3_600x600.jpg", "images/products/cellavita/bio-lebensmittel/front-gerstengras-500-g-shop_7_600x600.jpg", "images/products/cellavita/bio-lebensmittel/front-gerstengrassaft-etikett-400-g-shop_14_600x600.jpg", "images/products/cellavita/bio-lebensmittel/front-hagebutte-500-g-shop_2_600x600.jpg", "images/products/cellavita/bio-lebensmittel/front-hagebutte-pferde-5kg-shop_2_600x600.jpg", "images/products/cellavita/bio-lebensmittel/front-heidelberger-7-krai-uter-350-g-beutel-shopGBZSSiCEdh2hA_600x600.jpg", "images/products/cellavita/bio-lebensmittel/front-leinmehl-tiere-5kg-shop_1_600x600.jpg", "images/products/cellavita/bio-lebensmittel/front-ling-zhi-bio-250g-shop_3_600x600.jpg", "images/products/cellavita/bio-lebensmittel/gelee-royale-kapsen-frontal_1024x1024-2x_4_600x600.jpg", "images/products/cellavita/bio-lebensmittel/glas-aufbau-gold-100g-shop_2_600x600.jpg", "images/products/cellavita/bio-lebensmittel/glas-cordyceps-150k-shop_4_600x600.jpg", "images/products/cellavita/bio-lebensmittel/glas-curcuma-100g-shop_10_600x600.jpg", "images/products/cellavita/bio-lebensmittel/glas-curcuma-180k-shop_4_600x600.jpg", "images/products/cellavita/bio-lebensmittel/glas-curcuma-tiere-180-kps-shop_6_600x600.jpg", "images/products/cellavita/bio-lebensmittel/glas-flohsamenschalenpulver-150g-shop_2_600x600.jpg", "images/products/cellavita/bio-lebensmittel/glas-granatapfel-extrakt-vita-150-kps-shop_9_600x600.jpg", "images/products/cellavita/bio-lebensmittel/glas-hagebutte-vita-100g-shop_4_600x600.jpg", "images/products/cellavita/bio-lebensmittel/glas-heidelberger-7-krai-uter-80g-shopLOjXAiJy6fMpD_600x600.jpg", "images/products/cellavita/bio-lebensmittel/glas-ling-zhi-bio-120k-shop_3_600x600.jpg", "images/products/cellavita/bio-lebensmittel/glas-ling-zhi-bio-70g-shop_2_600x600.jpg", "images/products/cellavita/bio-lebensmittel/glas-spirulina-pur-tabs-100g-shop_8_600x600.jpg", "images/products/cellavita/bio-lebensmittel/ksm66_glas_14_600x600.jpg", "images/products/cellavita/bio-lebensmittel/produktfoto-maca-rot-180kapseln-glas_7_600x600.jpg", "images/products/cellavita/bio-lebensmittel/produktfoto-maca-schwarz-glas_6_600x600.jpg", "images/products/cellavita/bio-lebensmittel/produktfoto_aprikosenkerne_250g_shop_7_600x600.jpg", "images/products/cellavita/bio-lebensmittel/produktfoto_bio-leinsamenmehl_500g_shop_600x600.jpg", "images/products/cellavita/bio-lebensmittel/produktfoto_buchweizenflocken_500g_3_600x600.jpg", "images/products/cellavita/bio-lebensmittel/produktfoto_cashewkerne_250g_shop_2_600x600.jpg", "images/products/cellavita/bio-lebensmittel/produktfoto_glas_kokos__l__2_600x600.jpg", "images/products/cellavita/bio-lebensmittel/produktfoto_haferflocken_1_600x600.jpg", "images/products/cellavita/bio-lebensmittel/produktfoto_hanfsamen_250g_1_600x600.jpg", "images/products/cellavita/bio-lebensmittel/produktfoto_haseln__sse_250g_shop_1_600x600.jpg", "images/products/cellavita/bio-lebensmittel/produktfoto_k__rbiskerne_500g_2_600x600.jpg", "images/products/cellavita/bio-lebensmittel/produktfoto_leinsamen_500g_4_600x600.jpg", "images/products/cellavita/bio-lebensmittel/teezeit-20beutel_5_600x600.png", "images/products/cellavita/geraete/01_manschetten_zusammen_gebunden_3_600x600.jpg", "images/products/cellavita/geraete/02-mwo-antennen_18_600x600.jpg", "images/products/cellavita/geraete/094_klangwelten_gold_24_600x600.jpg", "images/products/cellavita/geraete/095_klangwelten_silver_25_600x600.jpg", "images/products/cellavita/geraete/099_koerpergleiter_2_600x600.jpg", "images/products/cellavita/geraete/1-geraet_27_600x600.jpg", "images/products/cellavita/geraete/100_eifix-260x260_600x600.jpg", "images/products/cellavita/geraete/10_5_600x600.jpg", "images/products/cellavita/geraete/11_5_600x600.jpg", "images/products/cellavita/geraete/20210119_114415_28_600x600.jpg", "images/products/cellavita/geraete/20220830_094145-shop_12_600x600.jpg", "images/products/cellavita/geraete/20220831_125727-shop_3_600x600.jpg", "images/products/cellavita/geraete/20230403_151119_28_600x600.jpg", "images/products/cellavita/geraete/20230403_151119_29_600x600.jpg", "images/products/cellavita/geraete/20230403_151119_30_600x600.jpg", "images/products/cellavita/geraete/2_26_600x600.jpg", "images/products/cellavita/geraete/3_40_600x600.jpg", "images/products/cellavita/geraete/ag-blanc_1_600x600.jpg", "images/products/cellavita/geraete/ag-cristal_1_600x600.jpg", "images/products/cellavita/geraete/ag-noir_1_600x600.jpg", "images/products/cellavita/geraete/ag_-_platin_600x600.jpg", "images/products/cellavita/geraete/airnergy-little-atmos-im-schlafzimmer-1030x1030_4_600x600.jpg", "images/products/cellavita/geraete/amfedilgpclmemgl_1_600x600.png", "images/products/cellavita/geraete/anschlusskabel-liegend_600x600.jpg", "images/products/cellavita/geraete/aromamischung_2500x2500_web_600x600.jpg", "images/products/cellavita/geraete/aromaset2shop_1_600x600.jpg", "images/products/cellavita/geraete/aromaset_1_2500x2500_web_600x600.jpg", "images/products/cellavita/geraete/aromaset_3_2500x2500thdgdybek5yqj_1_600x600.jpg", "images/products/cellavita/geraete/aromaset_4_2500x2500web_1_600x600.jpg", "images/products/cellavita/geraete/bild-1_27_600x600.png", "images/products/cellavita/geraete/bild-1_29_600x600.png", "images/products/cellavita/geraete/bild-1_32_600x600.png", "images/products/cellavita/geraete/bild-1_33_600x600.png", "images/products/cellavita/geraete/bild-winkelruten-4-1xHrOqHG9lLCsa_600x600.jpg", "images/products/cellavita/geraete/bp_4_600x600.jpg", "images/products/cellavita/geraete/cellalux-pulser-front-shop_2_600x600.jpg", "images/products/cellavita/geraete/eesm-elite-sleep-mat_10_600x600.jpeg", "images/products/cellavita/geraete/feinstrom_01_hr_7_600x600.jpg", "images/products/cellavita/geraete/filter_v2_2500x2500_2_600x600.jpg", "images/products/cellavita/geraete/filterset-k_11_600x600.jpg", "images/products/cellavita/geraete/filterset-k_12_600x600.jpg", "images/products/cellavita/geraete/filterset-k_13_600x600.jpg", "images/products/cellavita/geraete/frequenzen_shop_1_600x600.jpg", "images/products/cellavita/geraete/front-kapselhuellen-750-kps-shop_5_600x600.jpg", "images/products/cellavita/geraete/geno-neu_5_600x600.jpg", "images/products/cellavita/geraete/img_7988_3_600x600.jpg", "images/products/cellavita/geraete/kapselfuellmaschine-mit-beutel-shop_5_600x600.jpg", "images/products/cellavita/geraete/kornquetsche_nussbaum_9_600x600.png", "images/products/cellavita/geraete/kuechenfilter-k_3_600x600.jpg", "images/products/cellavita/geraete/kw_coverts_1280x1280_5_600x600.jpg", "images/products/cellavita/geraete/lr1_3_600x600.jpg", "images/products/cellavita/geraete/lrk4_4_600x600.jpg", "images/products/cellavita/geraete/luftreiniger-kueche-lrk2-ii_3_600x600.jpg", "images/products/cellavita/geraete/luftreiniger-lr4_52_0_2zbtmw1YVq9CZP_600x600.jpeg", "images/products/cellavita/geraete/luftreiniger-p-lr2-4_50_2_4_600x600.jpg", "images/products/cellavita/geraete/matresscover-calking-1_17_600x600.jpeg", "images/products/cellavita/geraete/matresscover-calking-1_18_600x600.jpeg", "images/products/cellavita/geraete/neowake_chromawatch_seitlich_aus_9_600x600.jpg", "images/products/cellavita/geraete/nfs4_8-schwarz_5_600x600.jpg", "images/products/cellavita/geraete/nfs4_8-weiss_7_600x600.jpg", "images/products/cellavita/geraete/nfs8-meile-119-22-300x217_14_600x600.jpg", "images/products/cellavita/geraete/nfs8-meile-1191-2-1-210x300_16_600x600.jpg", "images/products/cellavita/geraete/optimiererseitlichklein_7_600x600.jpg", "images/products/cellavita/geraete/piano-front_1_600x600.jpg", "images/products/cellavita/geraete/ppcynezllbjunybp_5_600x600.jpg", "images/products/cellavita/geraete/rute2_2_600x600.jpg", "images/products/cellavita/geraete/sativ-front-shop_2_600x600.jpg", "images/products/cellavita/geraete/saugnapf_1_600x600.jpg", "images/products/cellavita/geraete/set-basic_3_600x600.jpg", "images/products/cellavita/geraete/set-premium-freisteller_4_600x600.jpg", "images/products/cellavita/geraete/shop_0046-600x600_13_600x600.jpg", "images/products/cellavita/geraete/shop_0047_21_600x600.jpg", "images/products/cellavita/geraete/shop_brille_3_600x600.jpg", "images/products/cellavita/geraete/shop_nest_img_1306_2_600x600.jpg", "images/products/cellavita/geraete/shop_sd_cover_trilax_front_2_600x600.jpg", "images/products/cellavita/geraete/shop_vom-sandkorn-bis-zum-riesenstern_600x600.jpg", "images/products/cellavita/geraete/shop_wdr_front_600x600.jpg", "images/products/cellavita/geraete/smart_breathe_3_600x600.jpg", "images/products/cellavita/geraete/somnia-cover_600x600.jpg", "images/products/cellavita/geraete/stoffwechelprofis-flasche-blau-2_2_600x600.jpg", "images/products/cellavita/geraete/stoffwechelprofis-flasche-orange-2_2_600x600.jpg", "images/products/cellavita/geraete/stoffwechelprofis-flasche-silber-2_3_600x600.jpg", "images/products/cellavita/geraete/technik_12_4_600x600.jpg", "images/products/cellavita/geraete/tester-leitfaehigkeit_7_600x600.jpeg", "images/products/cellavita/geraete/therapiemagnet-2_600x600.jpg", "images/products/cellavita/geraete/um-universal-matte-2_16_600x600.jpg", "images/products/cellavita/geraete/v1_gold-1-600x600_17_600x600.jpg", "images/products/cellavita/geraete/v1_platin-600x600_27_600x600.jpg", "images/products/cellavita/geraete/voltmeter_einzeln_5_600x600.jpg", "images/products/cellavita/geraete/web_ms-foto_20221017_klangei_next_110_1_600x600.jpg", "images/products/cellavita/kinder/front-multi-c-kids-1250-t-shop_5_600x600.jpg", "images/products/cellavita/kinder/glas-calcium-kids-120g-neu-shop_6_600x600.jpg", "images/products/cellavita/kinder/glas-magnesium-kids-90g-shop_6_600x600.jpg", "images/products/cellavita/kinder/glas-multi-c-kids-180-ta-shop_3_600x600.jpg", "images/products/cellavita/kinder/nec_standard_NeutralTEHH9WAL8dwBy_600x600.png", "images/products/cellavita/kinder/vitamin-d3-kids_2_600x600.jpg", "images/products/cellavita/koerperpflege/01_bluetenfrische_glas_shop_10_600x600.jpg", "images/products/cellavita/koerperpflege/01_deocreme_vorteilspaket_10_600x600.jpg", "images/products/cellavita/koerperpflege/01_gingkolimette_glas_shop_10_600x600.jpg", "images/products/cellavita/koerperpflege/01_greentea_glas_shop_6_600x600.jpg", "images/products/cellavita/koerperpflege/01_mysticman_glas_shop_6_600x600.jpg", "images/products/cellavita/koerperpflege/Citovis-1_600x600.jpg", "images/products/cellavita/koerperpflege/Dermozym-2_600x600.jpg", "images/products/cellavita/koerperpflege/atheltic-fresh-2_1_600x600.jpg", "images/products/cellavita/koerperpflege/badeutensilien_mit_seife2_3_600x600.jpg", "images/products/cellavita/koerperpflege/beebalm_6_600x600.jpg", "images/products/cellavita/koerperpflege/beutel-einzeln__7_600x600.jpg", "images/products/cellavita/koerperpflege/bild6_kopie_1_600x600.jpg", "images/products/cellavita/koerperpflege/cellapure_haarseife_alge_01_7_600x600.jpg", "images/products/cellavita/koerperpflege/cellapure_haarseife_aloe_01_6_600x600.jpg", "images/products/cellavita/koerperpflege/cellapure_haarseife_brennnessel_01_8_600x600.jpg", "images/products/cellavita/koerperpflege/cellapure_haarseife_mango_01_5_600x600.jpg", "images/products/cellavita/koerperpflege/cellapure_haarseife_weizenkeim_01_3_600x600.jpg", "images/products/cellavita/koerperpflege/cellavita_artisan_rose_01_600x600.jpg", "images/products/cellavita/koerperpflege/cellavita_artisan_verveine_01_600x600.jpg", "images/products/cellavita/koerperpflege/front-basenbad-1kg-shop_5_600x600.jpg", "images/products/cellavita/koerperpflege/front-basenbad-5kg-shop_3_600x600.jpg", "images/products/cellavita/koerperpflege/glas-ohne-aufdruck_8_600x600.jpg", "images/products/cellavita/koerperpflege/haarseife_bier_front_5_600x600.jpg", "images/products/cellavita/koerperpflege/haarseife_bundle_v2_9_600x600.jpg", "images/products/cellavita/koerperpflege/image1_2_600x600.jpg", "images/products/cellavita/koerperpflege/jiaogulan-beutel-vorne_8_600x600.jpg", "images/products/cellavita/koerperpflege/jiaogulan-glas__9_600x600.jpg", "images/products/cellavita/koerperpflege/mineralgel_produktfoto_2_600x600.jpg", "images/products/cellavita/koerperpflege/mineralgel_produktfotos_vorrat_9_600x600.jpg", "images/products/cellavita/koerperpflege/nailserum-2_600x600.jpg", "images/products/cellavita/koerperpflege/produktfoto-teststreifen_6_600x600.jpg", "images/products/cellavita/koerperpflege/propolis-seife-1_3_600x600.jpg", "images/products/cellavita/koerperpflege/propolisdeo_1_600x600.jpg", "images/products/cellavita/kolloide/bild-kolloidales-germanium-50-ppm-200-ml_7_600x600.jpg", "images/products/cellavita/kolloide/bild-kolloidales-gold-30-ppm-200-ml_8_600x600.jpg", "images/products/cellavita/kolloide/nanosit-kolloidales-germanium-50-ppm-1000-ml_6_600x600.jpg", "images/products/cellavita/kolloide/nanosit-kolloidales-gold-30-ppm-1000-ml_1280x1280_6_600x600.jpg", "images/products/cellavita/kolloide/nanosit-kolloidales-kupfer-40-ppm-1000-ml_1280x1280_4_600x600.jpg", "images/products/cellavita/kolloide/nanosit-kolloidales-silber-100-ppm-1000-ml_1280x1280_7_600x600.jpg", "images/products/cellavita/kolloide/nanosit-kolloidales-zink-40-ppm-1000-ml_1280x1280_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/1-maca-rot-beutel-einzeln_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/1-maca-schwarzbeutel-einzeln_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/1-produktfoto-maca-rot-glas_2_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/1-produktfoto-maca-schwarz8ivHrtJaMogPC_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/1000x1000px_setsxlmefn7bmef1h_10_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/200mlikmv3cvyktayi_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/Brlauch200ml4er_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/Kardenwurzel200ml4er_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/Shaker_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/amino_beutel-einzeln__1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/ausleitungsprotokoll-klein-shop_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beecreamnew_16_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_300-kapseln_10_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_300-kapseln_17_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_300-kapseln_21_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_300-kapseln_22_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_300-kapseln_25_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_300-kapseln_26_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_300_kapseln_10_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_300_kapseln_12_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_300_kapseln_15_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_300_kapseln_7_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_300_kapseln__17_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_300_kapseln__1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_300_kapseln__24_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_300_kapseln__28_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_300_kapseln__30_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_300_kapseln__32_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_300_kapseln__8_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln__11_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln__15_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_acerola_300-kapseln_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_maca-500-kapseln_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/beutel-einzeln_nac_300_kapseln_2_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/bio-gerstengras-pulver_flasche-kopie_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/bio-gerstengrassaft-pulver_flasche_frei-kopie_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/bio-weizengras-pulver_flasche_frei-kopie_7_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/brlauch100ml_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/brlauch200ml_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/calcium-1kg-beutel-einzeln__9_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/calcium-natur-glas-ohne-aufdruck_7_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/cilantrokoriander100ml_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/cilantrokoriander200ml4er3378_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/cilantrokoriander200ml_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/citexivir-3_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/citoethyl-gro-3_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/citovet-1_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/citovigor-1_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/citozym-1_2_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/d-tagatose_beutel-500g_einzelnuz0Tu8k97iZzK_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/d-tagatose_glas-160g_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/ducolzym-1_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/ergozym-1_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/ergozym-plus-3_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/flasche-acerola-180-kapseln-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/flasche-acerola-90g-neu-shop_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/flasche-ackerschachtelhalm-shop_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/flasche-alpha-liponsaeure-neu-180-kapseln_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-acerola-1-kg-beutel-shop_10_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-acerola-500g-beutel-shop_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-ackerschachtelhalm-etikett-500-g-beutel-shop_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-alpha-liponsaeure-500-neu-kps-beutel_13_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-aufbau-gold-700g-beutel-shop_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-coenzym-q10-500-kps-beutel-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-cordyceps-500-kps-shop_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-curcuma-500-g-shop_15_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-d-galactose-1kg-shop_8_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-d-galactose-500g-shop_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-d-mannose-500-g-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-d-ribose-500-g-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-etikett-1kg-shop_10_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-gehirn-1kg-shopFdlmIRv3V673C_600x600.jpeg", "images/products/cellavita/nahrungsergaenzung/front-gehirn-500-g-shop015MnnAAFSqhI_600x600.jpeg", "images/products/cellavita/nahrungsergaenzung/front-gerstengras-500-g-shop_7_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-gerstengrassaft-etikett-400-g-shop_14_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-haut-haare-500-kps-beutel-shop8WYrJHTbKgiuu_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-kalium-500-g-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-kalium-500-kps-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-l-arginin-500-g-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-l-carnitin-500-kps-shop_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-lein-protein-900-g-beutel-shop_2_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-ling-zhi-bio-250g-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-lithothamnium-1-kg-shop_7_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-magnesium-classic-1-kg-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-magnesium-mild-500-g-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-msm-1-kg-shop_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-msm-500-kps-shop_2_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-msm-spezial-1-kg-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-multi-c-kids-1250-t-shop_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-multi-c-kids-1250-t-shop_7_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-opc-500-g-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-pro-colon-420-g-2er-set-shaker-shop_7_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-pro-colon-420-g-3er-set-shaker-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-pro-colon-420-g-set-shaker-shop_11_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-pro-immun-500-kps-shop_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-sangokoralle-1kg-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-sangokoralle-500g-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-superfood-365-500g-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-superfood-triphala-500-g-kopie_7_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-vitamin-b-12-500-g-shop_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-vitamin-b-komplex-500-g-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-weihrauch-myrrhe-vita-500-g-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-weihrauch-vita-500-g-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-weizengras-500-g-shop_8_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/front-zink-selen-500-kps-shop_6_600x600.jpeg", "images/products/cellavita/nahrungsergaenzung/glas-astaxanthin-60-kaps-shop_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-aufbau-gold-100g-shop_2_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-bambus-extrakt-50g-shop_8_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-bor-150-kapseln-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-calcium-kids-120g-neu-shop_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-cellavita-forte-150k-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-coenzym-q10-180k-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-cordyceps-150k-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-curcuma-100g-shop_10_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-curcuma-180k-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-d-galactose-200g-shop_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-d-mannose-110g-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-d-ribose-160g-shop_8_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-eisen-mangan-kupfer-60kps-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-eisen-vitamin-c-90-kps-shopQsEfqPn0LOmjj_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-gehirn-200g-shopkqOL76y5F5cQA_600x600.jpeg", "images/products/cellavita/nahrungsergaenzung/glas-granatapfel-extrakt-vita-150-kps-shop_8_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-griffonia-120k-shop_7_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-haut-haare-150-kps-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-hyaluronsaeure-180k-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-jod-natur-120-kps-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-kalium-vita-120-kps-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-kalium-vita-250g-shop_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-knochen-bewegung-74g-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-l-arginin-150g-shopK8mLU9bdEaZLX_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-l-carnitin-120-kps-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-ling-zhi-bio-120k-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-ling-zhi-bio-70g-shop_2_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-lithothamnium-120g-shop_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-magnesium-120g-shop_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-magnesium-kids-90g-shop_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-magnesium-mild-180-kps-shop_7_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-magnesium-mild-90-g-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-mariendistel-120kps-shop_2_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-melatonin-60-kps-shop_2_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-msm-spezial-200g-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-msm-vita-100g-shop_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-msm-vita-150-kps-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-multi-c-kids-180-ta-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-nattokinase-90-kps-shop_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-ohne-aufdruck_9_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-olivenblattextrakt-90-kps-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-opc-100-g-shop_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-opc-60kps-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-pro-immun-90-kps-shop_8_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-sangokoralle-120g-shop_2_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-spirulina-pur-tabs-100g-shop_8_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-superfood-365-150-kps-shop_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-vitamin-b-komplex-100g-shop_9_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-vitamin-b12-60-kps-shop_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-weihrauch-120-g-shop_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-weihrauch-extrakt-150-kps-shop_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-weihrauch-extrakt-50-g-shop_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-weihrauch-myrrhe-120-g-shop_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/glas-wild-yam-150-kps-shop_20_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/kardanwurzel200ml_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/kardenwurzel100ml_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/l-lysin_glas_11_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/mineral-p450-1_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/nec_standard_NeutralTEHH9WAL8dwBy_600x600.png", "images/products/cellavita/nahrungsergaenzung/omega-3-100ml-shop_13_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/omega-kapseln-algen_2_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/probiotic-p450-1_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktbildems_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktbildemsvorsorgepaketnawlmitbuvkw2_7_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto-glas-multi-c-180-tbl_11_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto-granatapfel-vita_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto-maca-rot-180kapseln-glas_7_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto-maca-schwarz-glas_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto-para-ex-shop_2_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto-vir-ex-vita_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto-vitamin-a_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto-vitamin-e_16_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto-weihrauch-myrrhe-gold_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto_d3_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto_d3_vorrat_5er_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto_glas_nac_kapseln_5_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto_glas_zink_selen_90_kps_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto_kiefernadelextrakt_1IR40HOZA3ONcP_600x600.jpeg", "images/products/cellavita/nahrungsergaenzung/produktfoto_lo__wenzahnextrakt_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto_milchs__ure_500ml_shop_6_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto_olivenblattextrakt_2_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto_rosenwurz_3_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfoto_vitamin_k2_shop_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/produktfotomilchsure500ml5xvorsorgeshopkye8zvyqecidj_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/propoliscream_4_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/propolisdeo_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/propulzym-2_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/royallotion100ml-kopie_10_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/spruehflasche_2_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/vitamin-d3-hochdosiert_12_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/vitamin-d3-kids-vorsorge_1_600x600.jpg", "images/products/cellavita/nahrungsergaenzung/vitamin-d3-kids_2_600x600.jpg", "images/products/cellavita/natur/1-bottle-with-box-propolis-10aOfyOkhZ3AgZq_600x600.jpg", "images/products/cellavita/natur/1-bottle-with-box-propolis-mundspray_600x600.jpg", "images/products/cellavita/natur/1500ml-Sprossenglas_600x600.jpg", "images/products/cellavita/natur/1500mlglas_600x600.jpg", "images/products/cellavita/natur/20220321_hempamed_de_cbd_premiumoel_10ml_rz_10-_box_bottle_4000px_3_600x600.png", "images/products/cellavita/natur/20220321_hempamed_de_cbd_premiumoel_10ml_rz_20-_box-bottle_4000px_1_600x600.png", "images/products/cellavita/natur/20220321_hempamed_de_cbd_premiumoel_10ml_rz_5-_box-bottle_4000px_1_600x600.png", "images/products/cellavita/natur/20_-tinktur-frontal_1024x1024-2x_3_600x600.jpg", "images/products/cellavita/natur/Bluetenpollenpulver_600x600.jpg", "images/products/cellavita/natur/Deckel_gross_600x600.jpg", "images/products/cellavita/natur/Deckel_klein_600x600.jpg", "images/products/cellavita/natur/SG_1000ml_600x600.jpg", "images/products/cellavita/natur/SG_750_800x800_600x600.jpg", "images/products/cellavita/natur/Set_I_1000_800x800_600x600.jpg", "images/products/cellavita/natur/Set__750_800x800_600x600.jpg", "images/products/cellavita/natur/beebalm_6_600x600.jpg", "images/products/cellavita/natur/beecreamnew_16_600x600.jpg", "images/products/cellavita/natur/blau1_8_600x600.jpg", "images/products/cellavita/natur/brlauch100ml_1_600x600.jpg", "images/products/cellavita/natur/brlauch200ml_1_600x600.jpg", "images/products/cellavita/natur/cilantrokoriander100ml_1_600x600.jpg", "images/products/cellavita/natur/cilantrokoriander200ml_1_600x600.jpg", "images/products/cellavita/natur/front-apfelpektin-600g-shop_8_600x600.jpg", "images/products/cellavita/natur/front-bentonit-1-kg-beutel-shopiFkZHdcBVh1F2_600x600.jpg", "images/products/cellavita/natur/front-flohsamenschalen-500-g-shop_3_600x600.jpg", "images/products/cellavita/natur/front-heidelberger-7-krai-uter-350-g-beutel-shopGBZSSiCEdh2hA_600x600.jpg", "images/products/cellavita/natur/front-zeolith-1-kg-shop_4_600x600.jpg", "images/products/cellavita/natur/front-zeolith-500g-shop_5_600x600.jpg", "images/products/cellavita/natur/front-zeolith-bentonit-1-kg-shop9HoGn1LZqtoRD_600x600.jpg", "images/products/cellavita/natur/gelee-royale-kapsen-frontal_1024x1024-2x_4_600x600.jpg", "images/products/cellavita/natur/glas-bentonit-140g-shop_3_600x600.jpg", "images/products/cellavita/natur/glas-flohsamenschalenpulver-150g-shop_2_600x600.jpg", "images/products/cellavita/natur/glas-heidelberger-7-krai-uter-80g-shopLOjXAiJy6fMpD_600x600.jpg", "images/products/cellavita/natur/glas-zeolith-bentonit-140-g-shopFBo1AXfCVDvww_600x600.jpg", "images/products/cellavita/natur/h-loesung_kl-600x906_7_600x600.jpg", "images/products/cellavita/natur/kardanwurzel200ml_1_600x600.jpg", "images/products/cellavita/natur/kardenwurzel100ml_1_600x600.jpg", "images/products/cellavita/natur/keimkiste-gross_3_600x600.jpg", "images/products/cellavita/natur/keimkiste_klein_2_600x600.png", "images/products/cellavita/natur/manuka-honigwithhoneyspoon_bigger_new_8_600x600.jpg", "images/products/cellavita/natur/manuka_loffel_deckeloffen_2kopie_1024x1024-2x_7_600x600.jpg", "images/products/cellavita/natur/nec_standard_NeutralTEHH9WAL8dwBy_600x600.png", "images/products/cellavita/natur/ortho-2_5_600x600.jpg", "images/products/cellavita/natur/p3299231-quer-freigestellt_5_600x600.png", "images/products/cellavita/natur/produktfoto-granatapfel-vita_4_600x600.jpg", "images/products/cellavita/natur/produktfoto-para-ex-shop_2_600x600.jpg", "images/products/cellavita/natur/produktfoto_aprikosenkerne_250g_shop_7_600x600.jpg", "images/products/cellavita/natur/produktfoto_glas_kokos__l__2_600x600.jpg", "images/products/cellavita/natur/produktfoto_kiefernadelextrakt_1IR40HOZA3ONcP_600x600.jpeg", "images/products/cellavita/natur/produktfoto_lo__wenzahnextrakt_3_600x600.jpg", "images/products/cellavita/natur/produktfoto_olivenblattextrakt_2_600x600.jpg", "images/products/cellavita/natur/produktfoto_rosenwurz_3_600x600.jpg", "images/products/cellavita/natur/propolis-kapseln-frontal_1024x1024-2x_4_600x600.jpg", "images/products/cellavita/natur/propolis-seife-1_3_600x600.jpg", "images/products/cellavita/natur/propoliscream_4_600x600.jpg", "images/products/cellavita/natur/propolisdeo_1_600x600.jpg", "images/products/cellavita/natur/royallotion100ml-kopie_10_600x600.jpg", "images/products/cellavita/natur/sprossen_set_1500ml_600x600.jpg", "images/products/cellavita/natur/system_ii_1000_wei___800x800_600x600.jpg", "images/products/cellavita/natur/system_ii_750_wei___800x800_600x600.jpg", "images/products/cellavita/reinigung/allzweckreiniger-flasche-frei-2s98PTSdeOAk9O_600x600.png", "images/products/cellavita/reinigung/allzweckreiniger-set-frei-2ev5nfOTfhcA22_600x600.png", "images/products/cellavita/reinigung/atme-durch_5_600x600.png", "images/products/cellavita/reinigung/bewegungsfreude_5_600x600.png", "images/products/cellavita/reinigung/bild-cdl-100-ml-weiss-neu9YkuYw16AezcZ_600x600.jpg", "images/products/cellavita/reinigung/borellisan_5_600x600.png", "images/products/cellavita/reinigung/denkfit_6_600x600.png", "images/products/cellavita/reinigung/herzensbluete_16_600x600.png", "images/products/cellavita/reinigung/immuzauber_7_600x600.png", "images/products/cellavita/reinigung/magdasan_6_600x600.png", "images/products/cellavita/reinigung/p1033209_7_600x600.jpg", "images/products/cellavita/reinigung/produktfoto-c60-100ml_3_600x600.jpg", "images/products/cellavita/reinigung/produktfoto-cio-2-500ml_6_600x600.jpg", "images/products/cellavita/reinigung/produktfoto-dmso-500-ml_2_600x600.jpg", "images/products/cellavita/reinigung/produktfoto-dmso_600x600.jpg", "images/products/cellavita/reinigung/ruhepol_6_600x600.png", "images/products/edubily/allproducts/1.png", "images/products/edubily/allproducts/Buch2_800x800-2.png", "images/products/edubily/allproducts/Calcium_Plus_Frontansicht1500x1500.png", "images/products/edubily/allproducts/Citrullin_plus_Frontansicht-KolnerListe.png", "images/products/edubily/allproducts/Clear-Whey-Isolat-Kirsche_Frontansicht1500x1500.png", "images/products/edubily/allproducts/Creatin_Creavitalis_Frontansicht.png", "images/products/edubily/allproducts/Darmflora-Komplex_Frontansicht-KolnerListe_dfcdd955-4a75-4143-9fb0-6db63117d7bb.png", "images/products/edubily/allproducts/EDU_Vitasauri_AD-Bundle_1x1_01.png", "images/products/edubily/allproducts/Ei-Protein_Frontansicht1500x1500.png", "images/products/edubily/allproducts/Essentielle_Aminosauren_Zitrone_Frontansicht1500x1500-KoelnerListe.png", "images/products/edubily/allproducts/Kinder-Multi-Teaser-Shop_1.png", "images/products/edubily/allproducts/Kollagen-Hydrolysat_Frontansicht_KolnerListe.png", "images/products/edubily/allproducts/L-Glutamin_Kapseln_FrontansichtKopie.png", "images/products/edubily/allproducts/L-Glutamin_Pulver_FrontansichtKopie.png", "images/products/edubily/allproducts/Magnesium-Heidelbeere_FrontansichtKopie.png", "images/products/edubily/allproducts/Magnesium-Komplex_Kapseln_Frontansicht-KolnerListe.png", "images/products/edubily/allproducts/PURE_Citrullin-Malat_Frontansicht1500x1500.png", "images/products/edubily/allproducts/PURE_Creatin_Frontansicht-KolnerListe.png", "images/products/edubily/allproducts/PURE_Glycin-Pulver_Frontansicht-KolnerListe.png", "images/products/edubily/allproducts/PURE_Inositol_Frontansicht1500x1500.png", "images/products/edubily/allproducts/PURE_LP7_Aminosauren_Frontansicht1500x1500.png", "images/products/edubily/allproducts/Resistentes_Dextrin_Frontansicht1500x1500.png", "images/products/edubily/allproducts/Sale_SpecialOffer_ClearWhey.jpg", "images/products/edubily/allproducts/Sale_SpecialOffer_Kollagen.jpg", "images/products/edubily/allproducts/Sale_SpecialOffer_Kollagen_neutral.png", "images/products/edubily/allproducts/ShakerClearXL.jpg", "images/products/edubily/allproducts/ShakerGrau.jpg", "images/products/edubily/allproducts/ShakerSchwarz.jpg", "images/products/edubily/allproducts/Veganes_Kollagen_Frontansicht1500x1500.png", "images/products/edubily/allproducts/Veganes_Protein_Schoko_FrontansichtKopie.png", "images/products/edubily/allproducts/Vitamin_C_Kapseln_Frontansicht1500x1500.png", "images/products/edubily/allproducts/Whey-Protein-Hydrolysat_Frontansicht1500x1500.png", "images/products/edubily/allproducts/Whey-Protein-Isolat_Frontansicht-KolnerListe.png", "images/products/edubily/allproducts/Whey_Vanille-Stevia_FrontansichtKopie.png", "images/products/edubily/allproducts/bio-loeffel-titel.png", "images/products/edubily/allproducts/edu-wissensdatenbank-titel.jpg", "images/products/edubily/allproducts/edubily-bundle-darmflora_dc8ba030-9c58-4662-913a-a04b43f54535.jpg", "images/products/edubily/allproducts/edubily-bundle-immunsystem_e5c40c12-195c-4f45-ac43-dbbecb0a57fc.jpg", "images/products/edubily/allproducts/edubily-bundle-keyvisuals-energie.jpg", "images/products/edubily/allproducts/edubily-bundle-keyvisuals-mama.jpg", "images/products/edubily/allproducts/edubily-bundle-keyvisuals-relax.jpg", "images/products/edubily/allproducts/edubily-carnitin.png", "images/products/edubily/allproducts/edubily-keyvisuals-tasse.png", "images/products/edubily/allproducts/edubily-multi.png", "images/products/edubily/allproducts/edubily-omega3.png", "images/products/edubily/allproducts/edubily-probe-dasmulti_1ee57fef-ef28-4a3f-a2ad-21873e164df0.png", "images/products/edubily/allproducts/edubily-probe-ei-protein-mousseauchocolat.png", "images/products/edubily/allproducts/edubily-probe-eisen_31ddd495-ace1-4ebc-b54e-b2b58632135f.png", "images/products/edubily/allproducts/edubily-probe-kollagen-neutral.png", "images/products/edubily/allproducts/edubily-probe-mamamulti_319d859c-10f1-47dc-8368-17bcf64d0a9f.png", "images/products/edubily/allproducts/edubily-probe-veganes-protein-neutral.png", "images/products/edubily/allproducts/edubily-probe-whey-isolat-neutral.png", "images/products/edubily/allproducts/edubily-probe-whey-isolat-vanillemitstevia.png", "images/products/edubily/allproducts/edubily-product-acetylcystein.png", "images/products/edubily/allproducts/edubily-product-ashwaganda.png", "images/products/edubily/allproducts/edubily-product-b-komplex.png", "images/products/edubily/allproducts/edubily-product-composing-algenoel_ae525492-39fa-48fb-af71-39b054dda060.png", "images/products/edubily/allproducts/edubily-product-composing-cholin.png", "images/products/edubily/allproducts/edubily-product-composing-chrompicolinat.png", "images/products/edubily/allproducts/edubily-product-composing-curcumin_1.png", "images/products/edubily/allproducts/edubily-product-composing-darmbakterien.png", "images/products/edubily/allproducts/edubily-product-composing-gruenteeextrakt-L4.png", "images/products/edubily/allproducts/edubily-product-composing-macarena_1.png", "images/products/edubily/allproducts/edubily-product-composing-olivenblattextrakt.png", "images/products/edubily/allproducts/edubily-product-composing-taurin.png", "images/products/edubily/allproducts/edubily-product-composing-tryptophan.png", "images/products/edubily/allproducts/edubily-product-composing-tyrosin.png", "images/products/edubily/allproducts/edubily-product-composing-ubiquinol.png", "images/products/edubily/allproducts/edubily-product-composing-vitamin-a_f206b698-0d58-4b02-9012-26d94c686d74.png", "images/products/edubily/allproducts/edubily-product-composing-vitasauri_1.png", "images/products/edubily/allproducts/edubily-product-composing-zink.png", "images/products/edubily/allproducts/edubily-product-composing65x65x112-astaxanthin.png", "images/products/edubily/allproducts/edubily-product-composing65x65x112-cla.png", "images/products/edubily/allproducts/edubily-product-composing65x65x112-granatapfelextrakt_7b1e23fb-b5c4-4221-9b91-f185db5e7ad5.png", "images/products/edubily/allproducts/edubily-product-composing65x65x112-propionsaeure.png", "images/products/edubily/allproducts/edubily-product-eisen.png", "images/products/edubily/allproducts/edubily-product-glas-composing-kidsflor.png", "images/products/edubily/allproducts/edubily-product-iod_e05e4abc-fb6f-4192-9f33-e0daec80b2bf.png", "images/products/edubily/allproducts/edubily-product-mama.png", "images/products/edubily/allproducts/edubily-product-opc.png", "images/products/edubily/allproducts/edubily-product-tropfen-composing-kidsd3.png", "images/products/edubily/allproducts/edubily-product-tropfen-composing-kidsd3_1080x_f6d83a40-11ef-4c75-ba0b-537620122468.png", "images/products/edubily/allproducts/edubily-product-tropfen-composing-vitamin-d3.png", "images/products/edubily/allproducts/edubily-product-tropfen-composing-vitamin-d3k2.png", "images/products/edubily/allproducts/edubily-product-tropfen-composing-vitamin-k.png", "images/products/edubily/allproducts/edubily-voucher-15_ef77b9bf-624b-4b0e-9cdd-6bd50837f331.png", "images/products/edubily/allproducts/mockup-edubasic_1.png", "images/products/edubily/allproducts/pillenbox.png", "images/products/edubily/allproducts/protein-shaker-made-in-germany.png", "images/products/heilkraft/krafthanf/CBD-Krafthanf-Gold-5-Beere-5ml_600x600.jpg", "images/products/heilkraft/krafthanf/CBD-Krafthanf-Gold-5-Mango-5ml_600x600.jpg", "images/products/heilkraft/krafthanf/HK_Krafthanf-_10_10mlh1Op6AKpDtnst_600x600.jpg", "images/products/heilkraft/krafthanf/HK_Krafthanf-_5_5ml_600x600.jpg", "images/products/heilkraft/krafthanf/HK_KrafthanfGold_10_5mlVlh3GMFfNe0f5_600x600.jpg", "images/products/heilkraft/krafthanf/HK_KrafthanfGold_2-5_5ml_600x600.jpg", "images/products/heilkraft/krafthanf/HK_KrafthanfGold_30_5ml_600x600.jpg", "images/products/heilkraft/krafthanf/HK_KrafthanfGold_5_5mlwS20NHO7BHn62_600x600.jpg", "images/products/heilkraft/krafthanf/HK_Krafthanf_10_5mlozMkk4YfgMmGK_600x600.jpg", "images/products/heilkraft/krafthanf/HK_Krafthanf_5_5ml6U9XowklppTBw_600x600.jpg", "images/products/heilkraft/krafthanf/HK_Krafthanf_Kekse_200g_600x600.jpg", "images/products/heilkraft/krafthanf/HK_Krafthanf_Pellets_200g-neueReteptur-2-2_600x600.jpg", "images/products/heilkraft/mineralien/HK_Bentonit_250g-Lo-ffel_600x600.jpg", "images/products/heilkraft/mineralien/HK_Borax-Pulver-80g_600x600.jpg", "images/products/heilkraft/mineralien/HK_MSM_350g-Lo-ffel_600x600.jpg", "images/products/heilkraft/mineralien/HK_Natron-550g-Lo-ffel_600x600.jpg", "images/products/heilkraft/mineralien/HK_Schwefel_350g-Lo-ffel_600x600.jpg", "images/products/heilkraft/mineralien/HK_Zeolith_250g-Lo-ffel_600x600.jpg", "images/products/heilkraft/nems/HK_Arthridonum-H-300g-Lo-ffelNwv6S2cMudTD5_600x600.jpg", "images/products/heilkraft/nems/HK_Arthridonum-K-H-K-1800g-Lo-ffel_600x600.jpg", "images/products/heilkraft/nems/HK_Arthridonum-K-Hund-300g-Lo-ffelWqhiw904X5XJ8_600x600.jpg", "images/products/heilkraft/nems/HK_Kamala-15g_600x600.jpg", "images/products/heilkraft/nems/HK_Kraftalge_Chlorella_Hund-Katze_140g_600x600.jpg", "images/products/heilkraft/nems/HK_Kraftalge_Spirulina_Hund-Katze_140g_600x600.jpg", "images/products/heilkraft/nems/HK_Kraftpilze_Abwehr_100g-Lo-ffel_600x600.jpg", "images/products/heilkraft/nems/HK_Kraftpilze_Energie_100g-Lo-ffel_600x600.jpg", "images/products/heilkraft/nems/HK_Kraftpilze_Regeneration_100g-Lo-ffel_600x600.jpg", "images/products/heilkraft/nems/HK_Kraftstoff_200g4iuFHUW7EBRCV_600x600.jpg", "images/products/heilkraft/nems/HK_Vitamin-K2-10mlB58wslcWF1Kui_600x600.jpg", "images/products/heilkraft/nems/HK_Vitamin_D_1000IE_50ml_600x600.jpg", "images/products/heilkraft/nuetzliches/5bn-beratung-shop-x_600x600.jpg", "images/products/heilkraft/nuetzliches/Eybl_Seelische-Ursachen-v2up286w0q5x8mk_600x600.jpg", "images/products/heilkraft/nuetzliches/HK-CDL-2x20ml-Box-bottls_600x600.jpg", "images/products/heilkraft/nuetzliches/HK_Bengalrosa-30ml_600x600.jpg", "images/products/heilkraft/nuetzliches/HK_DMSO_120ml-Pipette_600x600.jpg", "images/products/heilkraft/nuetzliches/HK_Glasklar-20ml_600x600.jpg", "images/products/heilkraft/nuetzliches/HK_Methylenblau-30ml0F2BZB9WX59ha_600x600.jpg", "images/products/heilkraft/nuetzliches/HK_Methylenblau-PUR-30ml_600x600.jpg", "images/products/heilkraft/nuetzliches/HK_VitaMagX_250ml-Pipette-blackcapDNtXFT4IQloJS_600x600.jpg", "images/products/heilkraft/nuetzliches/HK_VitaNMN-18g_600x600.jpg", "images/products/heilkraft/nuetzliches/HK_WPO-250ml-Pipette_600x600.jpg", "images/products/heilkraft/nuetzliches/HK_f-f-CDS-250ml-pipette_600x600.jpg", "images/products/heilkraft/ozon/HK_Canna3_50mlNN3oAtly0TOyG_600x600.jpg", "images/products/heilkraft/ozon/HK_Kokoo3_Aether_30ml_600x600.jpg", "images/products/heilkraft/ozon/HK_Kokoo3_Kuul_30ml_600x600.jpg", "images/products/heilkraft/ozon/HK_Kokoo3_Lavendel_30ml_600x600.jpg", "images/products/heilkraft/ozon/HK_Kokoo3_Olive_30ml_600x600.jpg", "images/products/heilkraft/ozon/HK_Kokoo3_Patchouli_30ml_600x600.jpg", "images/products/heilkraft/ozon/HK_Kokoo3_Pur_30ml_600x600.jpg", "images/products/heilkraft/ozon/HK_Kokoo3_Sonnenschein_30ml_600x600.jpg", "images/products/heilkraft/ozon/HK_Kokoo3_shave-care_30ml_600x600.jpg", "images/products/heilkraft/ozon/HK_Olivio3_50mldnZ68Q5ojk46Q_600x600.jpg", "images/products/heilkraft/ozon/HK_mockup_OlivioX3_30g_600x600.jpg", "images/products/heilkraft/pflanzenstoffe/HK_Artemisia_Alk_100ml-neu-pip_600x600.jpg", "images/products/heilkraft/pflanzenstoffe/HK_Artemisia_DMSO_100ml-neu-pip_600x600.jpg", "images/products/heilkraft/pflanzenstoffe/HK_Drachenblut_30ml_600x600.jpg", "images/products/heilkraft/pflanzenstoffe/HK_Floratur-Biota_250ml-Lo-ffel_600x600.jpg", "images/products/heilkraft/pflanzenstoffe/HK_Floratur-Wildkraut_510ml-Becherp1LAAf1FinARI_600x600.jpg", "images/products/heilkraft/pflanzenstoffe/HK_Floratur_Basis_20ml_600x600.jpg", "images/products/heilkraft/pflanzenstoffe/HK_Phytomoor_250ml-Becher_600x600.jpg", "images/products/heilkraft/pflanzenstoffe/HK_X01-Einhornstaub-600g_600x600.jpg", "images/products/kronenberg/Nahrungsergaenzung/agaricus-blazei-murrill-mandelpilz-120g.png", "images/products/kronenberg/Nahrungsergaenzung/aloe-vera-frischpflanzensaft-mit-honig-plus-vitamin-c.png", "images/products/kronenberg/Nahrungsergaenzung/amalaki-ayurveda-pulver-organisch.png", "images/products/kronenberg/Nahrungsergaenzung/amino-komplex-17-17-essentielle-aminosaeuren.png", "images/products/kronenberg/Nahrungsergaenzung/anorganischer-schwefel-min-999-pulver.png", "images/products/kronenberg/Nahrungsergaenzung/artemisia-annua-einjaehriger-beifuss-pulver-das-echte.png", "images/products/kronenberg/Nahrungsergaenzung/artemisia-annua-kapseln-einjaehriger-beifuss.png", "images/products/kronenberg/Nahrungsergaenzung/artemisia-annua-oxymel-compositum-alkoholfrei.png", "images/products/kronenberg/Nahrungsergaenzung/artemisia-annua-plus-rosmarin-vitamin-c.png", "images/products/kronenberg/Nahrungsergaenzung/artemisia-annua-samen-qing-hao-gvk-spezial.png", "images/products/kronenberg/Nahrungsergaenzung/artemisia-annua-ultraschall-extraktion-mit-schungitwasser.png", "images/products/kronenberg/Nahrungsergaenzung/bernsteinsaeure-hpmc-kapseln-plus-vitamin-c.png", "images/products/kronenberg/Nahrungsergaenzung/bio-camu-camu-pulver-viel-vitamin-c.png", "images/products/kronenberg/Nahrungsergaenzung/biota-em-effektive-mikroorganismen-500ml.png", "images/products/kronenberg/Nahrungsergaenzung/bockshornklee-extrakt-ein-vielseitiges-kraut.png", "images/products/kronenberg/Nahrungsergaenzung/bockshornklee-kur-diffuser-haarausfall-kapseln-tee-tinktur.png", "images/products/kronenberg/Nahrungsergaenzung/bockshornklee-tee-samen-200g.png", "images/products/kronenberg/Nahrungsergaenzung/braunalge-knotentang-ascophyllum-nodosum.png", "images/products/kronenberg/Nahrungsergaenzung/calcium-kalium-magnesium-kombination.png", "images/products/kronenberg/Nahrungsergaenzung/catuaba-erythroxylum-pulver.png", "images/products/kronenberg/Nahrungsergaenzung/catuaba-tee-der-tupi-indianer-aus-dem-amazonas-regenwald.png", "images/products/kronenberg/Nahrungsergaenzung/catumupu-catuaba-muira-puama-tinktur.png", "images/products/kronenberg/Nahrungsergaenzung/chaga-pilz-tee-bio-qualitaet-wildsammlung.png", "images/products/kronenberg/Nahrungsergaenzung/chanca-piedra-steinbrecher.png", "images/products/kronenberg/Nahrungsergaenzung/coenzym-q10-vegan-90-kapseln.png", "images/products/kronenberg/Nahrungsergaenzung/copaiba-oel-100-natuerlich.png", "images/products/kronenberg/Nahrungsergaenzung/cordyceps-cordycepin-all-in-one-schmelzpastillen.png", "images/products/kronenberg/Nahrungsergaenzung/cordyceps-cordycepin-lyophilized-schmelzpastille-10mgpastille.png", "images/products/kronenberg/Nahrungsergaenzung/eisen-frucht-muttersaft-supermix-330-ml.png", "images/products/kronenberg/Nahrungsergaenzung/eisenbisglycinat-eisen-pulver-100g.png", "images/products/kronenberg/Nahrungsergaenzung/extase-aphrodisiakum-catuaba-muira-puama-rinden-tee.png", "images/products/kronenberg/Nahrungsergaenzung/goldene-milch-paste-kurkuma-power.png", "images/products/kronenberg/Nahrungsergaenzung/graviola-annona-muricata-blaetter-wildsammlung.png", "images/products/kronenberg/Nahrungsergaenzung/graviola-extrakt-annona-muricata-superfood.png", "images/products/kronenberg/Nahrungsergaenzung/gruenes-wunder-chlorella-gerstengras-spirulina-weizengras-.png", "images/products/kronenberg/Nahrungsergaenzung/hacheney-hyperwasser-mit-kolloidalem-silizium.png", "images/products/kronenberg/Nahrungsergaenzung/hagebutten-extrakt-100-natur.png", "images/products/kronenberg/Nahrungsergaenzung/hair-power-kur-bockshornklee-kapseln-60-stk.png", "images/products/kronenberg/Nahrungsergaenzung/holunder-beeren-extrakt-antioxidans.png", "images/products/kronenberg/Nahrungsergaenzung/hyaluronsaeure-plus-glucosamin-und-chondroitin-60-kapseln.png", "images/products/kronenberg/Nahrungsergaenzung/juglandis-kur-nach-dr-hulda-clark-kraeuter-tee-aperitif.png", "images/products/kronenberg/Nahrungsergaenzung/katzenkralle-sangre-de-grado-100g-tee-amazonas-regenwald-.png", "images/products/kronenberg/Nahrungsergaenzung/kiefernnadel-und-sprossen-wuerzeextrakt-ultraschall-extraktion.png", "images/products/kronenberg/Nahrungsergaenzung/koriander-co-schwermetall-ausleitung-im-sparpaket.png", "images/products/kronenberg/Nahrungsergaenzung/koriander-extrakt-ultraschall-extraktion-100ml.png", "images/products/kronenberg/Nahrungsergaenzung/kraeutertee-aperitif-lymphe-abies.png", "images/products/kronenberg/Nahrungsergaenzung/kraeutertee-aperitif-niere-ren.png", "images/products/kronenberg/Nahrungsergaenzung/l-arginin-base-pulver-vegan.png", "images/products/kronenberg/Nahrungsergaenzung/l-carnitin-base-pulver-100.png", "images/products/kronenberg/Nahrungsergaenzung/l-tryptophan-mit-b-vitaminen-und-folsaeure-60-hpmc-kapseln.png", "images/products/kronenberg/Nahrungsergaenzung/l-tryptophan-pulver-aus-fermentation.png", "images/products/kronenberg/Nahrungsergaenzung/lapacho-rinden-tee-aus-dem-amazonas-regenwald.png", "images/products/kronenberg/Nahrungsergaenzung/licht-edel-schungit-wasser-energetikum.png", "images/products/kronenberg/Nahrungsergaenzung/liposomale-artemisia-annua-ultraschall-extraktion-50ml.png", "images/products/kronenberg/Nahrungsergaenzung/liposomale-moringa-morisana-ultraschall-extraktion.png", "images/products/kronenberg/Nahrungsergaenzung/loewenzahnkraut-wuerze-extrakt-ultraschall-extraktion.png", "images/products/kronenberg/Nahrungsergaenzung/magnesium-plus-b-vitamine-kapseln.png", "images/products/kronenberg/Nahrungsergaenzung/meerrettich-extract-ultraschall-extraktion.png", "images/products/kronenberg/Nahrungsergaenzung/meerwasser-agua-de-mar-mit-schungit-wasser.png", "images/products/kronenberg/Nahrungsergaenzung/moringa-miracle-suppe-20-portionen-gmo-frei.png", "images/products/kronenberg/Nahrungsergaenzung/moringa-morisana-gesundheit-spar-paket.png", "images/products/kronenberg/Nahrungsergaenzung/moringa-morisana-plus-artemisia-annua-kombi-paket.png", "images/products/kronenberg/Nahrungsergaenzung/moringa-morisana-premium-mit-vitamin-b12.png", "images/products/kronenberg/Nahrungsergaenzung/moringa-morisana-premium-pulver-300g-monatspackung.png", "images/products/kronenberg/Nahrungsergaenzung/moringa-samen-in-kapsel-100-pures-samenpulver.png", "images/products/kronenberg/Nahrungsergaenzung/moringa-samenpulver-100-fein-gemahlen-20g.png", "images/products/kronenberg/Nahrungsergaenzung/msm-organischer-schwefel-reinheitsgrad-999.png", "images/products/kronenberg/Nahrungsergaenzung/muira-puama-pulver-potenzbaum-im-amazonas-regenwald.png", "images/products/kronenberg/Nahrungsergaenzung/muira-puama-tee-aphrodisiakum-amazonas-regenwald.png", "images/products/kronenberg/Nahrungsergaenzung/multivitamin-mineral-60-kapseln.png", "images/products/kronenberg/Nahrungsergaenzung/mulungu-das-schlaf-elixier-der-indianer-90-stk.png", "images/products/kronenberg/Nahrungsergaenzung/natriumhydrogencarbonat-pharm-qualitaet.png", "images/products/kronenberg/Nahrungsergaenzung/noni-100-direktsaft.png", "images/products/kronenberg/Nahrungsergaenzung/nopal-kapseln-feigenkaktus-opuntia-ficus-indica-vegan.png", "images/products/kronenberg/Nahrungsergaenzung/omega-3-lachsoelkapseln-mit-vitamin-e.png", "images/products/kronenberg/Nahrungsergaenzung/oregano-oel-wilder-majoran-carvacrol-80.png", "images/products/kronenberg/Nahrungsergaenzung/organisches-agnimantha-churnaya-ayurveda-pulver-90g.png", "images/products/kronenberg/Nahrungsergaenzung/organisches-ashwagandha-ayurveda-pulver.png", "images/products/kronenberg/Nahrungsergaenzung/organisches-brahmi-ayurveda-pulver.png", "images/products/kronenberg/Nahrungsergaenzung/organisches-giloy-ayurveda-pulver.png", "images/products/kronenberg/Nahrungsergaenzung/organisches-patadi-churnaya-ayurveda-pulver-90g.png", "images/products/kronenberg/Nahrungsergaenzung/organisches-shatavari-ayurveda-pulver.png", "images/products/kronenberg/Nahrungsergaenzung/organisches-swastha-churnaya-ayurveda-pulver-90g.png", "images/products/kronenberg/Nahrungsergaenzung/organisches-trivala-ayurveda-pulver.png", "images/products/kronenberg/Nahrungsergaenzung/original-urs-surbeck-energetisches-wasser-gesunde-balance.png", "images/products/kronenberg/Nahrungsergaenzung/pure-formula-stoffwechsel-90-kapseln.png", "images/products/kronenberg/Nahrungsergaenzung/safran-extrakt-mit-curcumin-gueteklasse-1-15ml.png", "images/products/kronenberg/Nahrungsergaenzung/sango-meeres-korallen-pures-pulver-original-aus-okinawa.png", "images/products/kronenberg/Nahrungsergaenzung/sangre-de-drago-100-aus-wildsammlung.png", "images/products/kronenberg/Nahrungsergaenzung/schamblumenblueten-blau-clitoria-ternatea-flores-100g.png", "images/products/kronenberg/Nahrungsergaenzung/schatz-der-inkas-trunk-der-goetter-amazonas-regenwald-tee.png", "images/products/kronenberg/Nahrungsergaenzung/schwarzkuemmel-oel-kaltpressung-gefiltert-100ml.png", "images/products/kronenberg/Nahrungsergaenzung/schwarzkuemmel-pulver-nigella-sativa-premiumqualitaet.png", "images/products/kronenberg/Nahrungsergaenzung/spirulina-tropfenextrakt-100-ml.png", "images/products/kronenberg/Nahrungsergaenzung/stauden-sellerie-pulver-inspiriert-durch-medical-food-monatskur.png", "images/products/kronenberg/Nahrungsergaenzung/strophanthus-kombe-saatgut-strophanthin.png", "images/products/kronenberg/Nahrungsergaenzung/suessholzwurzel-natur-gemahlen-lakritzpulver.png", "images/products/kronenberg/Nahrungsergaenzung/traubenkern-opc-ultraschall-extrakt-mit-schungit-wasser.png", "images/products/kronenberg/Nahrungsergaenzung/tri-magnesiumdicitrat-zaehne-knochen-muskeln.png", "images/products/kronenberg/Nahrungsergaenzung/urs-surbeck-energetisches-wasser-wohlfuehlflasche-50ml.png", "images/products/kronenberg/Nahrungsergaenzung/vitalpilze-6-fach-pilzkomplex-extrakt.png", "images/products/kronenberg/Nahrungsergaenzung/vitamin-b12-pure-power-plus-l-carnitin-vitamin-d-und-c.png", "images/products/kronenberg/Nahrungsergaenzung/vitamin-k2-plus-vitamin-d3-plus-calcium.png", "images/products/kronenberg/Nahrungsergaenzung/weidenrinde-purpurweide-geschnitten-mit-nat-salicin.png", "images/products/kronenberg/Nahrungsergaenzung/weidenrinden-purpurweide-ultraschall-extrakt.png", "images/products/kronenberg/Nahrungsergaenzung/weidenroeschen-kleinbluetig-ultraschall-extraktion.png", "images/products/kronenberg/Nahrungsergaenzung/weih-muri-weihrauch-und-myrrhe-extrakt.png", "images/products/kronenberg/Nahrungsergaenzung/zimtblaetteroel-100-reines-aetherisches-oel-10ml.png", "images/products/kronenberg/TeeKr\xE4uterPulver/988-pures-artemisiaartemisinin-90-vegi-kapseln.png", "images/products/kronenberg/TeeKr\xE4uterPulver/agaricus-blazei-murrill-mandelpilz-120g.png", "images/products/kronenberg/TeeKr\xE4uterPulver/amalaki-ayurveda-pulver-organisch.png", "images/products/kronenberg/TeeKr\xE4uterPulver/artemisia-annua-100-reine-blaetter-100g.png", "images/products/kronenberg/TeeKr\xE4uterPulver/artemisia-annua-einjaehriger-beifuss-pulver-das-echte.png", "images/products/kronenberg/TeeKr\xE4uterPulver/artemisia-annua-kapseln-einjaehriger-beifuss.png", "images/products/kronenberg/TeeKr\xE4uterPulver/artemisia-annua-oxymel-compositum-alkoholfrei.png", "images/products/kronenberg/TeeKr\xE4uterPulver/artemisia-annua-salbe-moringa-samen-pulver-dmso.png", "images/products/kronenberg/TeeKr\xE4uterPulver/artemisia-annua-samen-qing-hao-gvk-spezial.png", "images/products/kronenberg/TeeKr\xE4uterPulver/artemisia-annua-ultraschall-extraktion-mit-schungitwasser.png", "images/products/kronenberg/TeeKr\xE4uterPulver/ayurveda-tee-mischung-harmonie.png", "images/products/kronenberg/TeeKr\xE4uterPulver/bio-camu-camu-pulver-viel-vitamin-c.png", "images/products/kronenberg/TeeKr\xE4uterPulver/bockshornklee-extrakt-ein-vielseitiges-kraut.png", "images/products/kronenberg/TeeKr\xE4uterPulver/bockshornklee-tee-samen-200g.png", "images/products/kronenberg/TeeKr\xE4uterPulver/brennnesselblaetter-bio-qualitaet-100g-beutel.png", "images/products/kronenberg/TeeKr\xE4uterPulver/brennnesselwurzel-bio-qualitaet-100g-beutel.png", "images/products/kronenberg/TeeKr\xE4uterPulver/catuaba-erythroxylum-pulver.png", "images/products/kronenberg/TeeKr\xE4uterPulver/catuaba-tee-der-tupi-indianer-aus-dem-amazonas-regenwald.png", "images/products/kronenberg/TeeKr\xE4uterPulver/catumupu-catuaba-muira-puama-tinktur.png", "images/products/kronenberg/TeeKr\xE4uterPulver/chaga-pilz-tee-bio-qualitaet-wildsammlung.png", "images/products/kronenberg/TeeKr\xE4uterPulver/chanca-piedra-steinbrecher.png", "images/products/kronenberg/TeeKr\xE4uterPulver/cistus-incanus-zistrosenkraut.png", "images/products/kronenberg/TeeKr\xE4uterPulver/der-weltberuehmte-tee-der-ojibwa-indianer-essiac-blend.png", "images/products/kronenberg/TeeKr\xE4uterPulver/ebv-pulver-mixtur-30-tage-kur.png", "images/products/kronenberg/TeeKr\xE4uterPulver/eisenbisglycinat-eisen-pulver-100g.png", "images/products/kronenberg/TeeKr\xE4uterPulver/extase-aphrodisiakum-catuaba-muira-puama-rinden-tee.png", "images/products/kronenberg/TeeKr\xE4uterPulver/graviola-annona-muricata-blaetter-wildsammlung.png", "images/products/kronenberg/TeeKr\xE4uterPulver/gruenes-wunder-chlorella-gerstengras-spirulina-weizengras-.png", "images/products/kronenberg/TeeKr\xE4uterPulver/indioclean-100g.png", "images/products/kronenberg/TeeKr\xE4uterPulver/jiaogulan-kraut-kraut-der-unsterblichkeit-kraeuterpotpourri.png", "images/products/kronenberg/TeeKr\xE4uterPulver/juglandis-kur-nach-dr-hulda-clark-kraeuter-tee-aperitif.png", "images/products/kronenberg/TeeKr\xE4uterPulver/katzenkralle-sangre-de-grado-100g-tee-amazonas-regenwald-.png", "images/products/kronenberg/TeeKr\xE4uterPulver/koriander-co-schwermetall-ausleitung-im-sparpaket.png", "images/products/kronenberg/TeeKr\xE4uterPulver/kraeutertee-aperitif-leber-lecur.png", "images/products/kronenberg/TeeKr\xE4uterPulver/kraeutertee-aperitif-lymphe-abies.png", "images/products/kronenberg/TeeKr\xE4uterPulver/kraeutertee-aperitif-niere-ren.png", "images/products/kronenberg/TeeKr\xE4uterPulver/kur-paket-premium-4-entgiftungreinigungverdauung.png", "images/products/kronenberg/TeeKr\xE4uterPulver/l-arginin-base-pulver-vegan.png", "images/products/kronenberg/TeeKr\xE4uterPulver/l-carnitin-base-pulver-100.png", "images/products/kronenberg/TeeKr\xE4uterPulver/l-tryptophan-pulver-aus-fermentation.png", "images/products/kronenberg/TeeKr\xE4uterPulver/lapacho-rinden-tee-aus-dem-amazonas-regenwald.png", "images/products/kronenberg/TeeKr\xE4uterPulver/lapacho-tinktur-ultraschall-extraktion-amazonas-regenwald.png", "images/products/kronenberg/TeeKr\xE4uterPulver/leinsamenextrakt-pulver-vegi-kapseln-90-stueck.png", "images/products/kronenberg/TeeKr\xE4uterPulver/liposomale-artemisia-annua-ultraschall-extraktion-50ml.png", "images/products/kronenberg/TeeKr\xE4uterPulver/loewenzahnblaetter-bio-qualitaet-100g-beutel.png", "images/products/kronenberg/TeeKr\xE4uterPulver/loewenzahnwurzel-bio-qualitaet-100g-beutel.png", "images/products/kronenberg/TeeKr\xE4uterPulver/lungenkraut-wuerzeextrakt-ultraschall-extraktion.png", "images/products/kronenberg/TeeKr\xE4uterPulver/moringa-morisana-plus-artemisia-annua-kombi-paket.png", "images/products/kronenberg/TeeKr\xE4uterPulver/moringa-morisana-premium-pulver-300g-monatspackung.png", "images/products/kronenberg/TeeKr\xE4uterPulver/moringa-samenpulver-100-fein-gemahlen-20g.png", "images/products/kronenberg/TeeKr\xE4uterPulver/moringa-spicy-gewuerz-mit-kalahari-wuesten-salz.png", "images/products/kronenberg/TeeKr\xE4uterPulver/muira-puama-pulver-potenzbaum-im-amazonas-regenwald.png", "images/products/kronenberg/TeeKr\xE4uterPulver/muira-puama-tee-aphrodisiakum-amazonas-regenwald.png", "images/products/kronenberg/TeeKr\xE4uterPulver/mulungu-das-schlaf-elixier-der-indianer-90-stk.png", "images/products/kronenberg/TeeKr\xE4uterPulver/natriumhydrogencarbonat-pharm-qualitaet.png", "images/products/kronenberg/TeeKr\xE4uterPulver/organisches-agnimantha-churnaya-ayurveda-pulver-90g.png", "images/products/kronenberg/TeeKr\xE4uterPulver/organisches-ashwagandha-ayurveda-pulver.png", "images/products/kronenberg/TeeKr\xE4uterPulver/organisches-brahmi-ayurveda-pulver.png", "images/products/kronenberg/TeeKr\xE4uterPulver/organisches-giloy-ayurveda-pulver.png", "images/products/kronenberg/TeeKr\xE4uterPulver/organisches-patadi-churnaya-ayurveda-pulver-90g.png", "images/products/kronenberg/TeeKr\xE4uterPulver/organisches-shatavari-ayurveda-pulver.png", "images/products/kronenberg/TeeKr\xE4uterPulver/organisches-swastha-churnaya-ayurveda-pulver-90g.png", "images/products/kronenberg/TeeKr\xE4uterPulver/organisches-trivala-ayurveda-pulver.png", "images/products/kronenberg/TeeKr\xE4uterPulver/papaya-blaetter-und-staengel-grob-100g-superfood.png", "images/products/kronenberg/TeeKr\xE4uterPulver/pure-formula-stoffwechsel-90-kapseln.png", "images/products/kronenberg/TeeKr\xE4uterPulver/schamblumenblueten-blau-clitoria-ternatea-flores-100g.png", "images/products/kronenberg/TeeKr\xE4uterPulver/schatz-der-inkas-trunk-der-goetter-amazonas-regenwald-tee.png", "images/products/kronenberg/TeeKr\xE4uterPulver/schilddruesen-kraeuter-mischung-pulver-inspiriert-durch-medical-food.png", "images/products/kronenberg/TeeKr\xE4uterPulver/schwarzkuemmel-pulver-nigella-sativa-premiumqualitaet.png", "images/products/kronenberg/TeeKr\xE4uterPulver/stauden-sellerie-pulver-inspiriert-durch-medical-food-monatskur.png", "images/products/kronenberg/TeeKr\xE4uterPulver/suessholzwurzel-natur-gemahlen-lakritzpulver.png", "images/products/kronenberg/TeeKr\xE4uterPulver/tantum-1-nierentee-reinigung.png", "images/products/kronenberg/TeeKr\xE4uterPulver/tantum-2-lebertee-zur-leberreinigung.png", "images/products/kronenberg/TeeKr\xE4uterPulver/tantum-3-darm-sanierung-kur.png", "images/products/kronenberg/TeeKr\xE4uterPulver/tantum-6-tee-entgiftung-reinigung-verdauung-und-rheuma.png", "images/products/kronenberg/TeeKr\xE4uterPulver/teetox-stoffwechsel-tee-inspiriert-durch-medical-food.png", "images/products/kronenberg/TeeKr\xE4uterPulver/tri-magnesiumdicitrat-zaehne-knochen-muskeln.png", "images/products/kronenberg/TeeKr\xE4uterPulver/typ-2-pulver-bioaktive-verbindungen.png", "images/products/kronenberg/TeeKr\xE4uterPulver/vitalpilze-6-fach-pilzkomplex-extrakt.png", "images/products/kronenberg/TeeKr\xE4uterPulver/weidenrinde-purpurweide-geschnitten-mit-nat-salicin.png", "images/products/kronenberg/TeeKr\xE4uterPulver/weidenrinden-purpurweide-ultraschall-extrakt.png", "images/products/kronenberg/TeeKr\xE4uterPulver/zistrosenkraut-gemahlen-fuer-hunde-katzen-100-natur.png", "images/products/kronenberg/Therapeuteninfos/adsadhs-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/artemisia-annua-einjaehriger-beifuss-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/bockshornklee-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/catuaba-teetinktur-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/chaga-pilz-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/chlordioxid-loesung-chlorine-dioxide-solution-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/chlorellagerstengrasspirullina-und-weizengras-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/cinderella-das-moringa-oleifera-kindermalbuch-25-seiten.png", "images/products/kronenberg/Therapeuteninfos/cistrose-cistus-incanus-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/copaiba-copaifera-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/darmgesundheit-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/darmparasiten-therapeuteninfo-.png", "images/products/kronenberg/Therapeuteninfos/das-dmso-handbuch-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/das-ultimative-gesundungsprogramm.png", "images/products/kronenberg/Therapeuteninfos/der-weltberuehmte-tee-der-ojibwa-indianer-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/detaillierter-produktkatalog-der-graf-von-kronenberg-group.png", "images/products/kronenberg/Therapeuteninfos/detox-kraeuter-tee-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/e-book-organisches-germanium-raetselhaftes-elixier.png", "images/products/kronenberg/Therapeuteninfos/epstein-barr-virus-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/graviola-stachelannone-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/indo-green-kratom-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/kiefer-als-heilmittel-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/kleinbluetiges-weidenroeschen-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/knotentang-braunalge-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/kompendium-beruehmter-und-seltenervergessener-heilmittel.png", "images/products/kronenberg/Therapeuteninfos/koriander-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/l-arginin-base-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/l-carnitin-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/lapacho-teetinktur-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/liposomal-und-die-besondere-wirkung.png", "images/products/kronenberg/Therapeuteninfos/loewenzahn-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/lotus-bluete-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/lungenkraut-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/moringa-morisana-premium-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/msm-dimethylsulfon-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/muira-puama-teetinktur-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/multiple-sklerose-ms-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/mulungu-therapeuteninfo-14-seiten.png", "images/products/kronenberg/Therapeuteninfos/mumiyo-shilajit-maumasil-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/ozonisiertes-olivenoel-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/rote-wurzel-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/safran-das-besondere-heilmittel-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/sango-meeres-koralle-aus-okinawa-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/sangre-de-drago-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/schatz-der-inkas-tee-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/schungit-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/schwarzkuemmel-pulver-nigella-sativa-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/schwefel-kur-nach-dr-karl-j-probst-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/sellerie-saft-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/stachybotrys-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/strophanthin-schach-matt-dem-herzinfarkt.png", "images/products/kronenberg/Therapeuteninfos/strophanthin-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/superfood-cordyceps-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/superfood-meerrettich-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/vitamin-d3-cholecalciferol-ist-gar-kein-vitamin-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/vitamin-e-der-grosse-betrug-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/weidenrinde-therapeutheninfo.png", "images/products/kronenberg/Therapeuteninfos/zuordnung-der-heilkraeuter-zu-krankheiten-therapeuteninfo.png", "images/products/kronenberg/Therapeuteninfos/zytamin-bio-regulator-komplex-therapeuteninfo.png", "images/products/kronenberg/Vitalpilze/agaricus-blazei-murrill-mandelpilz-120g.png", "images/products/kronenberg/Vitalpilze/vitalpilze-6-fach-pilzkomplex-extrakt.png", "images/products/kronenberg/Zubeh\xF6r/100ml-braune-medizinflasche-mit-zerstaeuber.png", "images/products/kronenberg/Zubeh\xF6r/100ml-leere-braune-medizinflasche-mit-pipette.png", "images/products/kronenberg/Zubeh\xF6r/aktivierungssalz-fuer-elektrolyse-fussbad.png", "images/products/kronenberg/Zubeh\xF6r/bioenergiser-ionen-detox-fusselektrolysebad-kpl-set.png", "images/products/kronenberg/Zubeh\xF6r/blasenspritze-100-ml-sterile-einmalspritze.png", "images/products/kronenberg/Zubeh\xF6r/din-18-pipettenverschluss-fuer-100ml-tropfflaschen.png", "images/products/kronenberg/Zubeh\xF6r/nagelfeile-aus-glas-fuer-mani-und-pedikuere-die-revolution.png", "images/products/kronenberg/Zubeh\xF6r/spruehflasche-50-ml-braunes-glas-kompl-mit-zerstaeuber.png", "images/products/kronenberg/aphrodisiaka/catuaba-erythroxylum-pulver.png", "images/products/kronenberg/aphrodisiaka/catumupu-catuaba-muira-puama-tinktur.png", "images/products/kronenberg/aphrodisiaka/extase-aphrodisiakum-catuaba-muira-puama-rinden-tee.png", "images/products/kronenberg/aphrodisiaka/muira-puama-pulver-potenzbaum-im-amazonas-regenwald.png", "images/products/kronenberg/aphrodisiaka/muira-puama-tee-aphrodisiakum-amazonas-regenwald.png", "images/products/kronenberg/ayurveda/amalaki-ayurveda-pulver-organisch.png", "images/products/kronenberg/ayurveda/ayurveda-tee-mischung-harmonie.png", "images/products/kronenberg/ayurveda/organisches-agnimantha-churnaya-ayurveda-pulver-90g.png", "images/products/kronenberg/ayurveda/organisches-ashwagandha-ayurveda-pulver.png", "images/products/kronenberg/ayurveda/organisches-brahmi-ayurveda-pulver.png", "images/products/kronenberg/ayurveda/organisches-giloy-ayurveda-pulver.png", "images/products/kronenberg/ayurveda/organisches-patadi-churnaya-ayurveda-pulver-90g.png", "images/products/kronenberg/ayurveda/organisches-shatavari-ayurveda-pulver.png", "images/products/kronenberg/ayurveda/organisches-swastha-churnaya-ayurveda-pulver-90g.png", "images/products/kronenberg/ayurveda/organisches-trivala-ayurveda-pulver.png", "images/products/kronenberg/ayurveda/schamblumenblueten-blau-clitoria-ternatea-flores-100g.png", "images/products/kronenberg/bestseller/artemisia-annua-100-reine-blaetter-100g.png", "images/products/kronenberg/bestseller/artemisia-annua-samen-qing-hao-gvk-spezial.png", "images/products/kronenberg/bestseller/biota-em-effektive-mikroorganismen-500ml.png", "images/products/kronenberg/bestseller/camu-camu-extrakt.png", "images/products/kronenberg/bestseller/chanca-piedra-steinbrecher.png", "images/products/kronenberg/bestseller/corona-hygiene-aroma-spray-200ml.png", "images/products/kronenberg/bestseller/der-weltberuehmte-tee-der-ojibwa-indianer-essiac-blend.png", "images/products/kronenberg/bestseller/dmso-60-plus-magnesium-oel-sportler-spray.png", "images/products/kronenberg/bestseller/dmso-schmerz-eukalyptus-balsam-40ml.png", "images/products/kronenberg/bestseller/dmso-schmerz-lavendel-balsam-40-ml.png", "images/products/kronenberg/bestseller/ebv-pulver-mixtur-30-tage-kur.png", "images/products/kronenberg/bestseller/l-carnitin-base-pulver-100.png", "images/products/kronenberg/bestseller/l-tryptophan-pulver-aus-fermentation.png", "images/products/kronenberg/bestseller/moringa-morisana-premium-pulver-300g-monatspackung.png", "images/products/kronenberg/bestseller/moringa-spicy-gewuerz-mit-kalahari-wuesten-salz.png", "images/products/kronenberg/bestseller/nagelfeile-aus-glas-fuer-mani-und-pedikuere-die-revolution.png", "images/products/kronenberg/bestseller/nano-glas-mani-pedikuere-die-revolution.png", "images/products/kronenberg/bestseller/pet-zahnfix-revital-liposomal-40ml.png", "images/products/kronenberg/bestseller/sangre-de-drago-100-aus-wildsammlung.png", "images/products/kronenberg/bestseller/schilddruesen-kraeuter-mischung-pulver-inspiriert-durch-medical-food.png", "images/products/kronenberg/bestseller/stauden-sellerie-pulver-inspiriert-durch-medical-food-monatskur.png", "images/products/kronenberg/bestseller/strophanthin-gratus-experimentier-set-100ml.png", "images/products/kronenberg/bestseller/strophanthin-kombe-experimentier-set-200ml.png", "images/products/kronenberg/bestseller/strophanthus-kombe-saatgut-strophanthin.png", "images/products/kronenberg/bestseller/teetox-stoffwechsel-tee-inspiriert-durch-medical-food.png", "images/products/kronenberg/bestseller/typ-2-pulver-bioaktive-verbindungen.png", "images/products/kronenberg/bestseller/zahnfix-revital-liposomal-40ml.png", "images/products/kronenberg/bioreiniger/bep-bio-enzym-power-reiniger-effizient-und-oekologisch-reinigen.png", "images/products/kronenberg/bioreiniger/corona-hygiene-aroma-spray-200ml.png", "images/products/kronenberg/chlordioxid/bake-desinfektion-fuer-189-liter-wasser-gallonen-wasserspender.png", "images/products/kronenberg/chlordioxid/cdl-cds-loesung-03-nach-dr-andreas-kalcker.png", "images/products/kronenberg/chlordioxid/cdlcds-100ml-loesung-03-clo2-mit-edel-schungit-wasser.png", "images/products/kronenberg/chlordioxid/desaircap-die-geniale-loesung-fuer-frisches-obst-und-gemuese.png", "images/products/kronenberg/chlordioxid/nagelpflege-napiad-soft-fluid-gel.png", "images/products/kronenberg/chlordioxid/nagelpflege-set-sorglos-paket.png", "images/products/kronenberg/cordyceps/cordyceps-cordycepin-all-in-one-schmelzpastillen.png", "images/products/kronenberg/cordyceps/cordyceps-cordycepin-lyophilized-schmelzpastille-10mgpastille.png", "images/products/kronenberg/darmleberniere/biota-em-effektive-mikroorganismen-500ml.png", "images/products/kronenberg/darmleberniere/juglandis-kur-nach-dr-hulda-clark-kraeuter-tee-aperitif.png", "images/products/kronenberg/darmleberniere/kraeutertee-aperitif-leber-lecur.png", "images/products/kronenberg/darmleberniere/kraeutertee-aperitif-niere-ren.png", "images/products/kronenberg/darmleberniere/tantum-1-nierentee-reinigung.png", "images/products/kronenberg/darmleberniere/tantum-2-lebertee-zur-leberreinigung.png", "images/products/kronenberg/darmleberniere/tantum-3-darm-sanierung-kur.png", "images/products/kronenberg/extrakte/artemisia-annua-oxymel-compositum-alkoholfrei.png", "images/products/kronenberg/extrakte/artemisia-annua-pures-100-oel-ultraschall-extraktion-100ml.png", "images/products/kronenberg/extrakte/artemisia-annua-ultraschall-extraktion-mit-schungitwasser.png", "images/products/kronenberg/extrakte/baerlauch-extrakt-ultraschall-extraktion-100ml.png", "images/products/kronenberg/extrakte/camu-camu-extrakt.png", "images/products/kronenberg/extrakte/catumupu-catuaba-muira-puama-tinktur.png", "images/products/kronenberg/extrakte/graviola-extrakt-annona-muricata-superfood.png", "images/products/kronenberg/extrakte/hacheney-hyperwasser-mit-kolloidalem-silizium.png", "images/products/kronenberg/extrakte/hagebutten-extrakt-100-natur.png", "images/products/kronenberg/extrakte/holunder-beeren-extrakt-antioxidans.png", "images/products/kronenberg/extrakte/kiefernnadel-und-sprossen-wuerzeextrakt-ultraschall-extraktion.png", "images/products/kronenberg/extrakte/koriander-co-schwermetall-ausleitung-im-sparpaket.png", "images/products/kronenberg/extrakte/koriander-extrakt-ultraschall-extraktion-100ml.png", "images/products/kronenberg/extrakte/lapacho-tinktur-ultraschall-extraktion-amazonas-regenwald.png", "images/products/kronenberg/extrakte/liposomale-artemisia-annua-ultraschall-extraktion-50ml.png", "images/products/kronenberg/extrakte/liposomale-moringa-morisana-ultraschall-extraktion.png", "images/products/kronenberg/extrakte/loewenzahnkraut-wuerze-extrakt-ultraschall-extraktion.png", "images/products/kronenberg/extrakte/lungenkraut-wuerzeextrakt-ultraschall-extraktion.png", "images/products/kronenberg/extrakte/meerrettich-extract-ultraschall-extraktion.png", "images/products/kronenberg/extrakte/oregano-oel-wilder-majoran-carvacrol-80.png", "images/products/kronenberg/extrakte/parasitenkurkraeuterextrakt-100ml.png", "images/products/kronenberg/extrakte/safran-extrakt-mit-curcumin-gueteklasse-1-15ml.png", "images/products/kronenberg/extrakte/spirulina-tropfenextrakt-100-ml.png", "images/products/kronenberg/extrakte/strophanthin-gratus-experimentier-set-100ml.png", "images/products/kronenberg/extrakte/strophanthin-kombe-experimentier-set-200ml.png", "images/products/kronenberg/extrakte/traubenkern-opc-ultraschall-extrakt-mit-schungit-wasser.png", "images/products/kronenberg/extrakte/weidenrinden-purpurweide-ultraschall-extrakt.png", "images/products/kronenberg/extrakte/weidenroeschen-kleinbluetig-ultraschall-extraktion.png", "images/products/kronenberg/extrakte/weih-muri-weihrauch-und-myrrhe-extrakt.png", "images/products/kronenberg/extrakte/wilder-chaga-pilz-ultraschall-extraktion.png", "images/products/kronenberg/h2o2/wasserstoffperoxid-h2o2-3-loesung.png", "images/products/kronenberg/haare/100-arganoel-plus-mandeloel-haut-haar-und-massage.png", "images/products/kronenberg/haare/bockshornklee-extrakt-ein-vielseitiges-kraut.png", "images/products/kronenberg/haare/bockshornklee-kur-diffuser-haarausfall-kapseln-tee-tinktur.png", "images/products/kronenberg/haare/bockshornklee-tee-samen-200g.png", "images/products/kronenberg/haare/hair-power-kur-bockshornklee-kapseln-60-stk.png", "images/products/kronenberg/innovationen/988-pures-artemisiaartemisinin-90-vegi-kapseln.png", "images/products/kronenberg/innovationen/aloe-vera-frischpflanzensaft-mit-honig-plus-vitamin-c.png", "images/products/kronenberg/innovationen/aloe-vera-hair-body-shower-gel-200-ml.png", "images/products/kronenberg/innovationen/aloe-vera-hautgel-hair-body-shower-gel-400-ml.png", "images/products/kronenberg/innovationen/aloe-vera-hautgel-natur-983-pur.png", "images/products/kronenberg/innovationen/artemisia-annua-oxymel-compositum-alkoholfrei.png", "images/products/kronenberg/innovationen/artemisia-annua-plus-rosmarin-vitamin-c.png", "images/products/kronenberg/innovationen/artemisia-annua-pures-100-oel-ultraschall-extraktion-100ml.png", "images/products/kronenberg/innovationen/artemisia-annua-salbe-moringa-samen-pulver-dmso.png", "images/products/kronenberg/innovationen/artemisia-annua-ultraschall-extraktion-mit-schungitwasser.png", "images/products/kronenberg/innovationen/ayurveda-tee-mischung-harmonie.png", "images/products/kronenberg/innovationen/baerlauch-extrakt-ultraschall-extraktion-100ml.png", "images/products/kronenberg/innovationen/bernsteinsaeure-hpmc-kapseln-plus-vitamin-c.png", "images/products/kronenberg/innovationen/bockshornklee-extrakt-ein-vielseitiges-kraut.png", "images/products/kronenberg/innovationen/bockshornklee-kur-diffuser-haarausfall-kapseln-tee-tinktur.png", "images/products/kronenberg/innovationen/bockshornklee-tee-samen-200g.png", "images/products/kronenberg/innovationen/brennnesselblaetter-bio-qualitaet-100g-beutel.png", "images/products/kronenberg/innovationen/brennnesselwurzel-bio-qualitaet-100g-beutel.png", "images/products/kronenberg/innovationen/calcium-kalium-magnesium-kombination.png", "images/products/kronenberg/innovationen/camu-camu-extrakt.png", "images/products/kronenberg/innovationen/catuaba-erythroxylum-pulver.png", "images/products/kronenberg/innovationen/catuaba-tee-der-tupi-indianer-aus-dem-amazonas-regenwald.png", "images/products/kronenberg/innovationen/catumupu-catuaba-muira-puama-tinktur.png", "images/products/kronenberg/innovationen/cdl-cds-loesung-03-nach-dr-andreas-kalcker.png", "images/products/kronenberg/innovationen/cdlcds-100ml-loesung-03-clo2-mit-edel-schungit-wasser.png", "images/products/kronenberg/innovationen/chaga-pilz-tee-bio-qualitaet-wildsammlung.png", "images/products/kronenberg/innovationen/copaiba-oel-100-natuerlich.png", "images/products/kronenberg/innovationen/cordyceps-cordycepin-all-in-one-schmelzpastillen.png", "images/products/kronenberg/innovationen/cordyceps-cordycepin-lyophilized-schmelzpastille-10mgpastille.png", "images/products/kronenberg/innovationen/corona-hygiene-aroma-spray-200ml.png", "images/products/kronenberg/innovationen/dmso-60-plus-magnesium-oel-sportler-spray.png", "images/products/kronenberg/innovationen/dmso-schmerz-eukalyptus-balsam-40ml.png", "images/products/kronenberg/innovationen/dmso-schmerz-lavendel-balsam-40-ml.png", "images/products/kronenberg/innovationen/ebv-pulver-mixtur-30-tage-kur.png", "images/products/kronenberg/innovationen/extase-aphrodisiakum-catuaba-muira-puama-rinden-tee.png", "images/products/kronenberg/innovationen/goldene-milch-paste-kurkuma-power.png", "images/products/kronenberg/innovationen/graviola-extrakt-annona-muricata-superfood.png", "images/products/kronenberg/innovationen/gruenes-wunder-chlorella-gerstengras-spirulina-weizengras-.png", "images/products/kronenberg/innovationen/hagebutten-extrakt-100-natur.png", "images/products/kronenberg/innovationen/hair-power-kur-bockshornklee-kapseln-60-stk.png", "images/products/kronenberg/innovationen/holunder-beeren-extrakt-antioxidans.png", "images/products/kronenberg/innovationen/hyaluronsaeure-plus-glucosamin-und-chondroitin-60-kapseln.png", "images/products/kronenberg/innovationen/ingwer-massage-und-bade-oel-therapie-lymphdrainage.png", "images/products/kronenberg/innovationen/juglandis-kur-nach-dr-hulda-clark-kraeuter-tee-aperitif.png", "images/products/kronenberg/innovationen/katzenkralle-sangre-de-grado-100g-tee-amazonas-regenwald-.png", "images/products/kronenberg/innovationen/kiefernnadel-und-sprossen-wuerzeextrakt-ultraschall-extraktion.png", "images/products/kronenberg/innovationen/koriander-co-schwermetall-ausleitung-im-sparpaket.png", "images/products/kronenberg/innovationen/koriander-extrakt-ultraschall-extraktion-100ml.png", "images/products/kronenberg/innovationen/kraeutertee-aperitif-leber-lecur.png", "images/products/kronenberg/innovationen/kraeutertee-aperitif-lymphe-abies.png", "images/products/kronenberg/innovationen/kraeutertee-aperitif-niere-ren.png", "images/products/kronenberg/innovationen/kur-paket-premium-4-entgiftungreinigungverdauung.png", "images/products/kronenberg/innovationen/l-tryptophan-mit-b-vitaminen-und-folsaeure-60-hpmc-kapseln.png", "images/products/kronenberg/innovationen/lapacho-rinden-tee-aus-dem-amazonas-regenwald.png", "images/products/kronenberg/innovationen/lapacho-tinktur-ultraschall-extraktion-amazonas-regenwald.png", "images/products/kronenberg/innovationen/leinsamenextrakt-pulver-vegi-kapseln-90-stueck.png", "images/products/kronenberg/innovationen/licht-edel-schungit-wasser-energetikum.png", "images/products/kronenberg/innovationen/liposomale-artemisia-annua-ultraschall-extraktion-50ml.png", "images/products/kronenberg/innovationen/liposomale-moringa-morisana-ultraschall-extraktion.png", "images/products/kronenberg/innovationen/loewenzahnblaetter-bio-qualitaet-100g-beutel.png", "images/products/kronenberg/innovationen/loewenzahnkraut-wuerze-extrakt-ultraschall-extraktion.png", "images/products/kronenberg/innovationen/loewenzahnwurzel-bio-qualitaet-100g-beutel.png", "images/products/kronenberg/innovationen/magnesium-oel-premium-vitalspray-31-mit-edel-schungit-wasser.png", "images/products/kronenberg/innovationen/meerrettich-extract-ultraschall-extraktion.png", "images/products/kronenberg/innovationen/meerwasser-agua-de-mar-mit-schungit-wasser.png", "images/products/kronenberg/innovationen/moringa-miracle-suppe-20-portionen-gmo-frei.png", "images/products/kronenberg/innovationen/moringa-morisana-premium-mit-vitamin-b12.png", "images/products/kronenberg/innovationen/moringa-morisana-premium-pulver-300g-monatspackung.png", "images/products/kronenberg/innovationen/moringa-samen-in-kapsel-100-pures-samenpulver.png", "images/products/kronenberg/innovationen/moringa-samenpulver-100-fein-gemahlen-20g.png", "images/products/kronenberg/innovationen/moringa-spicy-gewuerz-mit-kalahari-wuesten-salz.png", "images/products/kronenberg/innovationen/muira-puama-pulver-potenzbaum-im-amazonas-regenwald.png", "images/products/kronenberg/innovationen/muira-puama-tee-aphrodisiakum-amazonas-regenwald.png", "images/products/kronenberg/innovationen/oregano-oel-wilder-majoran-carvacrol-80.png", "images/products/kronenberg/innovationen/original-urs-surbeck-energetisches-wasser-gesunde-balance.png", "images/products/kronenberg/innovationen/ozonisiertes-hochwertiges-distel-oel.png", "images/products/kronenberg/innovationen/ozonisiertes-manzanilla-oel-balsam-980g-ozonl.png", "images/products/kronenberg/innovationen/ozonisiertes-manzanilla-olivenoel-gesunde-haut.png", "images/products/kronenberg/innovationen/parasitenkurkraeuterextrakt-100ml.png", "images/products/kronenberg/innovationen/pet-zahnfix-revital-liposomal-40ml.png", "images/products/kronenberg/innovationen/schatz-der-inkas-trunk-der-goetter-amazonas-regenwald-tee.png", "images/products/kronenberg/innovationen/schilddruesen-kraeuter-mischung-pulver-inspiriert-durch-medical-food.png", "images/products/kronenberg/innovationen/schwarzkuemmel-oel-mit-mandel-oel-haut-haar-und-massage.png", "images/products/kronenberg/innovationen/skincaregold-aloe-vera-extrakt-anti-aging.png", "images/products/kronenberg/innovationen/skincareplus-aloe-vera-extrakt-mit-collagen-und-hyaluronsaeure.png", "images/products/kronenberg/innovationen/stauden-sellerie-pulver-inspiriert-durch-medical-food-monatskur.png", "images/products/kronenberg/innovationen/strophanthin-gratus-experimentier-set-100ml.png", "images/products/kronenberg/innovationen/strophanthin-kombe-experimentier-set-200ml.png", "images/products/kronenberg/innovationen/suessholzwurzel-natur-gemahlen-lakritzpulver.png", "images/products/kronenberg/innovationen/teetox-stoffwechsel-tee-inspiriert-durch-medical-food.png", "images/products/kronenberg/innovationen/traubenkern-opc-ultraschall-extrakt-mit-schungit-wasser.png", "images/products/kronenberg/innovationen/tri-magnesiumdicitrat-zaehne-knochen-muskeln.png", "images/products/kronenberg/innovationen/twostep-manikuerepedikuere-set.png", "images/products/kronenberg/innovationen/typ-2-pulver-bioaktive-verbindungen.png", "images/products/kronenberg/innovationen/urs-surbeck-energetisches-wasser-wohlfuehlflasche-50ml.png", "images/products/kronenberg/innovationen/weidenrinden-purpurweide-ultraschall-extrakt.png", "images/products/kronenberg/innovationen/weidenroeschen-kleinbluetig-ultraschall-extraktion.png", "images/products/kronenberg/innovationen/weih-muri-weihrauch-und-myrrhe-extrakt.png", "images/products/kronenberg/innovationen/wilder-chaga-pilz-ultraschall-extraktion.png", "images/products/kronenberg/innovationen/zahnfix-revital-liposomal-40ml.png", "images/products/kronenberg/innovationen/zimtblaetteroel-100-reines-aetherisches-oel-10ml.png", "images/products/kronenberg/kosmetik/100-arganoel-plus-mandeloel-haut-haar-und-massage.png", "images/products/kronenberg/kosmetik/aloe-vera-hair-body-shower-gel-200-ml.png", "images/products/kronenberg/kosmetik/aloe-vera-hautgel-hair-body-shower-gel-400-ml.png", "images/products/kronenberg/kosmetik/aloe-vera-hautgel-natur-983-pur.png", "images/products/kronenberg/kosmetik/ingwer-massage-und-bade-oel-therapie-lymphdrainage.png", "images/products/kronenberg/kosmetik/magnesium-oel-premium-vitalspray-31-mit-edel-schungit-wasser.png", "images/products/kronenberg/kosmetik/nagelfeile-aus-glas-fuer-mani-und-pedikuere-die-revolution.png", "images/products/kronenberg/kosmetik/nano-glas-mani-pedikuere-die-revolution.png", "images/products/kronenberg/kosmetik/ozonisiertes-hochwertiges-distel-oel.png", "images/products/kronenberg/kosmetik/ozonisiertes-manzanilla-oel-balsam-980g-ozonl.png", "images/products/kronenberg/kosmetik/ozonisiertes-manzanilla-olivenoel-gesunde-haut.png", "images/products/kronenberg/kosmetik/pet-zahnfix-revital-liposomal-40ml.png", "images/products/kronenberg/kosmetik/schwarzkuemmel-oel-mit-mandel-oel-haut-haar-und-massage.png", "images/products/kronenberg/kosmetik/skincaregold-aloe-vera-extrakt-anti-aging.png", "images/products/kronenberg/kosmetik/skincareplus-aloe-vera-extrakt-mit-collagen-und-hyaluronsaeure.png", "images/products/kronenberg/kosmetik/twostep-manikuerepedikuere-set.png", "images/products/kronenberg/kosmetik/twostep-nagelfeile-aus-bambus-manikuere.png", "images/products/kronenberg/kosmetik/zahncreme-mit-schwarzkuemmel-ohne-fluor-und-pfefferminz.png", "images/products/kronenberg/kosmetik/zahnfix-revital-liposomal-40ml.png", "images/products/kronenberg/kraeutertee/juglandis-kur-nach-dr-hulda-clark-kraeuter-tee-aperitif.png", "images/products/kronenberg/kraeutertee/kraeutertee-aperitif-leber-lecur.png", "images/products/kronenberg/kraeutertee/kraeutertee-aperitif-lymphe-abies.png", "images/products/kronenberg/kraeutertee/kraeutertee-aperitif-niere-ren.png", "images/products/kronenberg/no_cover.jpeg", "images/products/kronenberg/schungit/edel-schungit-set-im-organza-beutel-10-g.png", "images/products/kronenberg/schungit/edel-schungit-steine-lose-50g-sonderangebot-limitierte-auflage.png", "images/products/kronenberg/schungit/harmonisierer-aus-schungit-und-talkchlorit.png", "images/products/kronenberg/schungit/licht-edel-schungit-wasser-energetikum.png", "images/products/kronenberg/schungit/limitiertes-schungit-set-8-auserlesene-produkte.png", "images/products/kronenberg/schungit/schungit-anhaenger-beschuetzer-frau.png", "images/products/kronenberg/schungit/schungit-anhaenger-beschuetzer-mann.png", "images/products/kronenberg/schungit/schungit-anhaenger-engel-mit-haematit.png", "images/products/kronenberg/schungit/schungit-anhaenger-perle-mit-einfassung.png", "images/products/kronenberg/schungit/schungit-anhaenger-scheibe-schmuckstueck-aus-handarbeit.png", "images/products/kronenberg/schungit/schungit-energetisierungsplatte-10x12cm.png", "images/products/kronenberg/schungit/schungit-engel-in-geschnitzter-handarbeit.png", "images/products/kronenberg/schungit/schungit-handy-schutz-schuetzt-vor-schaedlicher-strahlung.png", "images/products/kronenberg/schungit/schungit-kugel-mit-untersetzer-5cm-110g.png", "images/products/kronenberg/schungit/schungit-pulver-200g-aktivkohle-detox-drink.png", "images/products/kronenberg/schungit/schungit-pyramide-5cm-hoch-278g.png", "images/products/kronenberg/schungit/schungit-pyramide-poliert-ca-20cm-hoch.png", "images/products/kronenberg/schungit/schungit-pyramide-poliert-ca-3-cm-hoch.png", "images/products/kronenberg/schungit/schungit-radiaesthesie-pendel-mit-kette.png", "images/products/kronenberg/schungit/schungit-scheibe-ca-5cm-hoch-poliert-harmonisierung-und-wohlbefinden.png", "images/products/kronenberg/schungit/schungit-schluesselanhaenger-mit-2-perlen-8g-laenge-ca-8cm.png", "images/products/kronenberg/schungit/schungit-schluesselanhaenger-silberfarbig-mit-perle.png", "images/products/kronenberg/schungit/schungit-set-im-organza-beutel-100-g.png", "images/products/kronenberg/schungit/schungit-split-1000g.png", "images/products/kronenberg/schungit/schungit-split-500g.png", "images/products/kronenberg/schungit/schungit-uhr-500g-elektrosmog-und-strahlung.png", "images/products/kronenberg/schungit/schungit-wuerfel-65g-harmonie-und-schutz-in-fester-form.png", "images/products/kronenberg/schwefelkur/anorganischer-schwefel-min-999-pulver.png", "images/products/kronenberg/schwefelkur/schwefel-kur-nach-dr-probst-darmsanierung.png", "images/products/kronenberg/\xD6le/100-arganoel-plus-mandeloel-haut-haar-und-massage.png", "images/products/kronenberg/\xD6le/artemisia-annua-pures-100-oel-ultraschall-extraktion-100ml.png", "images/products/kronenberg/\xD6le/copaiba-oel-100-natuerlich.png", "images/products/kronenberg/\xD6le/dmso-60-plus-magnesium-oel-sportler-spray.png", "images/products/kronenberg/\xD6le/dmso-ph-eur-999-100ml-hochreines-dmso.png", "images/products/kronenberg/\xD6le/dmso-schmerz-eukalyptus-balsam-40ml.png", "images/products/kronenberg/\xD6le/dmso-schmerz-lavendel-balsam-40-ml.png", "images/products/kronenberg/\xD6le/ingwer-massage-und-bade-oel-therapie-lymphdrainage.png", "images/products/kronenberg/\xD6le/magnesium-oel-premium-vitalspray-31-mit-edel-schungit-wasser.png", "images/products/kronenberg/\xD6le/omega-3-lachsoelkapseln-mit-vitamin-e.png", "images/products/kronenberg/\xD6le/oregano-oel-wilder-majoran-carvacrol-80.png", "images/products/kronenberg/\xD6le/ozonisiertes-hochwertiges-distel-oel.png", "images/products/kronenberg/\xD6le/ozonisiertes-manzanilla-oel-balsam-980g-ozonl.png", "images/products/kronenberg/\xD6le/ozonisiertes-manzanilla-olivenoel-gesunde-haut.png", "images/products/kronenberg/\xD6le/pet-zahnfix-revital-liposomal-40ml.png", "images/products/kronenberg/\xD6le/schwarzkuemmel-oel-kaltpressung-gefiltert-100ml.png", "images/products/kronenberg/\xD6le/zahnfix-revital-liposomal-40ml.png", "images/products/waldkraft/ausleitungsorgane/Borax_Tropfen_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/ausleitungsorgane/L-Methionin_Mockup_600x600.jpg", "images/products/waldkraft/ausleitungsorgane/Lebende-Chlorella-Algen-Mockup-Wp3t_600x600.jpg", "images/products/waldkraft/ausleitungsorgane/Lungenkraut_Komplex_Mockup_175x62_600x600.jpg", "images/products/waldkraft/ausleitungsorgane/MSM_Wunschpreis-jpg-0U1S_600x600.jpg", "images/products/waldkraft/ausleitungsorgane/NAC-N-Acetyl-L-Cystein_Pulver_Mockup_600x600.jpg", "images/products/waldkraft/ausleitungsorgane/Sango_Koralle_Mockup_600x600.jpg", "images/products/waldkraft/ausleitungsorgane/Spirulina-BIO-120-Kapseln_600x600.jpg", "images/products/waldkraft/ausleitungsorgane/Zink-Histidin-Komplex-120-Kapseln_mockup_600x600.jpg", "images/products/waldkraft/ausleitungsorgane/chanca-piedra-pulver-150g-4098-pa10500_600x600.jpg", "images/products/waldkraft/ausleitungsorgane/liposomales-glutathion-aus-reduziertem-l-glutathion-250ml-pa10047_600x600.jpg", "images/products/waldkraft/buecher/25/Byebye-covid-2-1-1_600x600.png", "images/products/waldkraft/buecher/26/handbuch-der-kolloidalen-metalle_600x600.jpg", "images/products/waldkraft/buecher/27/Klinikhandbuch-Aromatherapie_600x600.png", "images/products/waldkraft/buecher/28/Arthrose_ist_heilbar_mockup_web-jpg_600x600.jpg", "images/products/waldkraft/buecher/29/Manuka_Buch_webshop-jpg_600x600.jpg", "images/products/waldkraft/buecher/30/em-eine-chance-fuer-unsere-erde-anne-lorch_600x600.jpg", "images/products/waldkraft/buecher/31/buch-borreliose-natuerlich-heilen-wolf-dieter-storl_600x600.jpg", "images/products/waldkraft/buecher/32/buch-pflanzliche-antibiotika-richtig-anwenden_600x600.jpg", "images/products/waldkraft/buecher/33/buch-die-leber-natuerlich-reinigen_600x600.jpg", "images/products/waldkraft/buecher/34/Borax_600x600.jpg", "images/products/waldkraft/buecher/35/CDL-Handbuch-LUBZ_600x600.jpg", "images/products/waldkraft/buecher/36/buch-cannabis-und-cannabidiol-cbd-richtig-anwenden_600x600.jpg", "images/products/waldkraft/buecher/37/DMSO-Handbuch_600x600.jpg", "images/products/waldkraft/em-mikroorganismen/Floratur-EM-BIO_2-1_600x600.png", "images/products/waldkraft/em-mikroorganismen/Mockup-EM-Basis_600x600.png", "images/products/waldkraft/em-mikroorganismen/Mockup-Floratur-Premium-1_600x600.jpg", "images/products/waldkraft/energie/BIO-Chlorophyll-Extrakt-Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/energie/Kraftpilz-Energie-120Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/energie/Lungenkraut_Komplex_Mockup_175x62_600x600.jpg", "images/products/waldkraft/energie/Nattokinase_Komplex_Mockup_web-jpg_600x600.jpg", "images/products/waldkraft/energie/Nattokinase_Zink_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/energie/PEA_PUlver_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/energie/Roter_Maca_Extrakt-120-Kapseln-Mockup_600x600.png", "images/products/waldkraft/energie/Vitamin-C-Komplex-120-Kapseln_600x600.jpg", "images/products/waldkraft/energie/moor-elixier-pa10656-v_600x600.jpg", "images/products/waldkraft/energie/pea-palmitoylethanolamid-120-kapseln-4186-pa10621_600x600.jpg", "images/products/waldkraft/gehirn/B6_Wohlfu-hl_Erythrit_Drops_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/gehirn/Borax_Tropfen_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/gehirn/Kiefernnadel_Tinktur_mockup_600x600.jpg", "images/products/waldkraft/gehirn/MSM_Wunschpreis-jpg-0U1S_600x600.jpg", "images/products/waldkraft/gehirn/Magnesium_Komplex_Mockup_600x600.jpg", "images/products/waldkraft/gehirn/PEA_PUlver_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/gehirn/Roter_Maca_Extrakt-120-Kapseln-Mockup_600x600.png", "images/products/waldkraft/gehirn/Schwarzer-Maca-Extrakt-120-Kapseln-Mockup_600x600.jpg", "images/products/waldkraft/gehirn/Vitamin-B12-Komplex-Drops-Mockup_600x600.jpg", "images/products/waldkraft/gehirn/Vitamin-C-Komplex-120-Kapseln_600x600.jpg", "images/products/waldkraft/gutelaune/B6_Wohlfu-hl_Erythrit_Drops_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/gutelaune/Vitamin-B12-Komplex-Drops-Mockup_600x600.jpg", "images/products/waldkraft/gutelaune/Vitamin-C-Komplex-120-Kapseln_600x600.jpg", "images/products/waldkraft/gutelaune/melantonin-Drops-Mockup_600x600.jpg", "images/products/waldkraft/gutelaune/pea-palmitoylethanolamid-120-kapseln-4186-pa10621_600x600.jpg", "images/products/waldkraft/herz/BIO-Chlorophyll-Extrakt-Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/herz/Kraftpilz-Cordyceps-120Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/herz/Lungenkraut_Komplex_Mockup_175x62_600x600.jpg", "images/products/waldkraft/herz/NAC-N-Acetyl-L-Cystein_Pulver_Mockup_600x600.jpg", "images/products/waldkraft/herz/Nattokinase_Komplex_Mockup_web-jpg_600x600.jpg", "images/products/waldkraft/herz/Nattokinase_Zink_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/herz/OPC-Pycnogenol-60-Kapseln-Mockup_600x600.jpg", "images/products/waldkraft/herz/Roter_Maca_Extrakt-120-Kapseln-Mockup_600x600.png", "images/products/waldkraft/herz/Schwarzer-Maca-Extrakt-120-Kapseln-Mockup_600x600.jpg", "images/products/waldkraft/herz/Vitamin-B12-Komplex-Drops-Mockup_600x600.jpg", "images/products/waldkraft/herz/Weihrauch_Mockup_600x600.jpg", "images/products/waldkraft/herz/Zink-Histidin-Komplex-120-Kapseln_mockup_600x600.jpg", "images/products/waldkraft/immunsystem/30ml_Mironglas_Flasche_aktuell-Kopie_600x600.jpg", "images/products/waldkraft/immunsystem/Astaxanthin_100ml_Mopckup_600x600.jpg", "images/products/waldkraft/immunsystem/Borax_120Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/immunsystem/Borax_70g_Mockup_600x600.jpg", "images/products/waldkraft/immunsystem/Chlorella_Tabs_Mockup-Kopie_600x600.jpg", "images/products/waldkraft/immunsystem/Gerstengras-Saftpulver-BIO_mockup_600x600.jpg", "images/products/waldkraft/immunsystem/Kelpalgen-Jod-BIO_mockup_600x600.jpg", "images/products/waldkraft/immunsystem/Kiefernnadel_Tinktur_mockup_600x600.jpg", "images/products/waldkraft/immunsystem/L-Lysin_Mockup_600x600.jpg", "images/products/waldkraft/immunsystem/Lebende-Chlorella-Algen-Mockup_600x600.jpg", "images/products/waldkraft/immunsystem/Loewenzahn_Tinktur_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/immunsystem/Lungenkraut_Komplex_Mockup_175x62_600x600.jpg", "images/products/waldkraft/immunsystem/MSM_Wunschpreis-jpg-0U1S_600x600.jpg", "images/products/waldkraft/immunsystem/OPC-Pycnogenol-60-Kapseln-Mockup_600x600.jpg", "images/products/waldkraft/immunsystem/Roter_Maca_Extrakt-120-Kapseln-Mockup_600x600.png", "images/products/waldkraft/immunsystem/Schwarzer-Maca-Extrakt-120-Kapseln-Mockup_600x600.jpg", "images/products/waldkraft/immunsystem/Selen-VitaminC_120Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/immunsystem/Spirulina-BIO-120-Kapseln_600x600.jpg", "images/products/waldkraft/immunsystem/Vitamin-B12-Komplex-Drops-Mockup_600x600.jpg", "images/products/waldkraft/immunsystem/Vitamin-C-Komplex-120-Kapseln_600x600.jpg", "images/products/waldkraft/immunsystem/Zink-Histidin-Komplex-120-Kapseln_mockup_600x600.jpg", "images/products/waldkraft/immunsystem/bio-kurkuma-extrakt-mit-gingerol-und-piperin-in-oxymel-250ml-pa10317_600x600.jpg", "images/products/waldkraft/immunsystem/liposomales-glutathion-aus-reduziertem-l-glutathion-250ml-pa10047_600x600.jpg", "images/products/waldkraft/immunsystem/manuka-honig-mgo-840-250g-4467-wk10500_600x600.png", "images/products/waldkraft/innere-ruhe/B6_Wohlfu-hl_Erythrit_Drops_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/innere-ruhe/KSM-Ashwagandha-BIO_Mockup_600x600.jpg", "images/products/waldkraft/innere-ruhe/Kraftpilz-Hericium-120Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/innere-ruhe/Kraftpilz-Regeneration-120Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/innere-ruhe/PEA_PUlver_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/innere-ruhe/Roter_Maca_Extrakt-120-Kapseln-Mockup_600x600.png", "images/products/waldkraft/innere-ruhe/Schwarzer-Maca-Extrakt-120-Kapseln-Mockup_600x600.jpg", "images/products/waldkraft/innere-ruhe/Vitamin-B12-Komplex-Drops-Mockup_600x600.jpg", "images/products/waldkraft/innere-ruhe/Zink-Histidin-Komplex-120-Kapseln_mockup_600x600.jpg", "images/products/waldkraft/innere-ruhe/melantonin-Drops-Mockup_600x600.jpg", "images/products/waldkraft/knochen/Astaxanthin-Drops-Mockup_600x600.jpg", "images/products/waldkraft/knochen/Astaxanthin-Hyaluron-Drops-Mockup_600x600.jpg", "images/products/waldkraft/knochen/Borax_Tropfen_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/knochen/Erdling-Vitamin-K2-Mockup-Flasche-Umverpackung_600x600.png", "images/products/waldkraft/knochen/Kraftpilz-Energie-120Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/knochen/L-Lysin_Mockup_600x600.jpg", "images/products/waldkraft/knochen/MSM_Wunschpreis-jpg-0U1S_600x600.jpg", "images/products/waldkraft/knochen/OPC-Pycnogenol-60-Kapseln-Mockup_600x600.jpg", "images/products/waldkraft/knochen/Osthea_300g_Mockup_600x600.jpg", "images/products/waldkraft/knochen/Sango_Koralle_Mockup_600x600.jpg", "images/products/waldkraft/knochen/Vitamin-C-Komplex-120-Kapseln_600x600.jpg", "images/products/waldkraft/knochen/arthridea_250g_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/knochen/arthridea_530Kapseln_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/knochen/bio-kurkuma-extrakt-mit-gingerol-und-piperin-in-oxymel-250ml-pa10317_600x600.jpg", "images/products/waldkraft/knochen/pea-palmitoylethanolamid-120-kapseln-4186-pa10621_600x600.jpg", "images/products/waldkraft/kolloide/Kolloidales-Germanium-100-ppm-100-ml-Spr-hflasche-Mockup_600x600.png", "images/products/waldkraft/kolloide/Kolloidales-Gold-100-ppm-100-ml-Mockup_600x600.png", "images/products/waldkraft/kolloide/Kolloidales_Silber_50_ppm_100_ml_Spr-hflasche_Mockup_1_1_1_1_600x600.png", "images/products/waldkraft/kolloide/waldkraft-Kolloidales-Silber-25ppm-250ml_600x600.png", "images/products/waldkraft/kraeuter/Kiefernnadel_Tinktur_mockup_600x600.jpg", "images/products/waldkraft/kraeuter/Loewenzahn_Tinktur_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/kraeuter/Mockups-Artemisia-alkohol-100ml_600x600.jpg", "images/products/waldkraft/kraeuter/Propolis-Tinktur-Mockup-1_600x600.png", "images/products/waldkraft/kraeuter/bio-kurkuma-extrakt-mit-gingerol-und-piperin-in-oxymel-250ml-pa10317_600x600.jpg", "images/products/waldkraft/magendarm/Basicum_120-Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/magendarm/Floratur-EM-BIO_2-1_600x600.png", "images/products/waldkraft/magendarm/Floratur_EM_BIO_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/magendarm/Gerstengras-Saftpulver-BIO_mockup_600x600.jpg", "images/products/waldkraft/magendarm/Kraftpilz-Hericium-120Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/magendarm/MSM_Wunschpreis-jpg-0U1S_600x600.jpg", "images/products/waldkraft/magendarm/bio-kurkuma-extrakt-mit-gingerol-und-piperin-in-oxymel-250ml-pa10317_600x600.jpg", "images/products/waldkraft/magendarm/chanca-piedra-pulver-150g-4098-pa10500_600x600.jpg", "images/products/waldkraft/magendarm/honigglas_klein_600x600.png", "images/products/waldkraft/magendarm/manuka-honig-mgo-840-250g-4467-wk10500_600x600.png", "images/products/waldkraft/magendarm/moor-elixier-pa10656-v_600x600.jpg", "images/products/waldkraft/mineralien/Basicum_120-Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/mineralien/Gerstengras-Saftpulver-BIO_mockup_600x600.jpg", "images/products/waldkraft/mineralien/Magnesium_Komplex_Mockup_600x600.jpg", "images/products/waldkraft/mineralien/Rotalgen_Calcium_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/mineralien/Sango_Koralle_Mockup_600x600.jpg", "images/products/waldkraft/mineralien/moor-elixier-pa10656-v_600x600.jpg", "images/products/waldkraft/mundhygiene/Vitamin-C-Komplex-120-Kapseln_600x600.jpg", "images/products/waldkraft/mundhygiene/Wasserstoffperoxid-3-Mockup_600x600.png", "images/products/waldkraft/mundhygiene/Zahnpulver_-Zitrone-_Mockup_600x600.png", "images/products/waldkraft/mundhygiene/Zahnpulver_mit_Notoginseng_Mockup_600x600.png", "images/products/waldkraft/naturkosmetik/Mockup-Artemisia-Balsam-30ml-miron-BgBW_600x600.png", "images/products/waldkraft/naturkosmetik/Nattokinase_Komplex_Mockup_web-jpg_600x600.jpg", "images/products/waldkraft/naturkosmetik/Nattokinase_Zink_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/naturkosmetik/Zahnpulver_-Zitrone-_Mockup_600x600.png", "images/products/waldkraft/naturkosmetik/Zahnpulver_mit_Notoginseng_Mockup_600x600.png", "images/products/waldkraft/naturkosmetik/manuka-honig-mgo-840-250g-4467-wk10500_600x600.png", "images/products/waldkraft/ozon/Canna3-Mockup_600x600.png", "images/products/waldkraft/ozon/Mockup-Kokoo3-50ml-1-1_600x600.png", "images/products/waldkraft/ozon/olivio3-ozonisiertes-olivenol-250ml-257-wk10090_600x600.png", "images/products/waldkraft/parasiten/Floratur-EM-BIO_2-1_600x600.png", "images/products/waldkraft/parasiten/Floratur_EM_BIO_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/parasiten/Kraftpilz-Energie-120Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/parasiten/Kraftpilz-Regeneration-120Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/parasiten/Kraftpilze_Mensch_Abwehr_Freya_Mockup_600x600.jpg", "images/products/waldkraft/parasiten/MSM_Wunschpreis-jpg-0U1S_600x600.jpg", "images/products/waldkraft/schlaf/B6_Wohlfu-hl_Erythrit_Drops_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/schlaf/KSM-Ashwagandha-BIO_Mockup_600x600.jpg", "images/products/waldkraft/schlaf/Noctea_Mopckup_600x600.jpg", "images/products/waldkraft/schlaf/honigglas_klein_600x600.png", "images/products/waldkraft/schlaf/melantonin-Drops-Mockup_600x600.jpg", "images/products/waldkraft/sensibilit\xE4t/Kelpalgen-Jod-BIO_mockup_600x600.jpg", "images/products/waldkraft/sensibilit\xE4t/MSM_Wunschpreis-jpg-0U1S_600x600.jpg", "images/products/waldkraft/sensibilit\xE4t/OPC-Pycnogenol-60-Kapseln-Mockup_600x600.jpg", "images/products/waldkraft/stoffwechsel/BIO-Chlorophyll-Extrakt-Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/stoffwechsel/Basicum_120-Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/stoffwechsel/Floratur-EM-BIO_2-1_600x600.png", "images/products/waldkraft/stoffwechsel/Floratur_EM_BIO_Mockup_webshop-jpg_600x600.jpg", "images/products/waldkraft/stoffwechsel/L-Arginin_Mopckup_600x600.jpg", "images/products/waldkraft/stoffwechsel/L-Methionin_Mockup_600x600.jpg", "images/products/waldkraft/stoffwechsel/Lungenkraut_Komplex_Mockup_175x62_600x600.jpg", "images/products/waldkraft/stoffwechsel/Roter_Maca_Extrakt-120-Kapseln-Mockup_600x600.png", "images/products/waldkraft/stoffwechsel/Schwarzer-Maca-Extrakt-120-Kapseln-Mockup_600x600.jpg", "images/products/waldkraft/stoffwechsel/Zink-Histidin-Komplex-120-Kapseln_mockup_600x600.jpg", "images/products/waldkraft/stoffwechsel/chanca-piedra-pulver-150g-4098-pa10500_600x600.jpg", "images/products/waldkraft/stoffwechsel/pea-palmitoylethanolamid-120-kapseln-4186-pa10621_600x600.jpg", "images/products/waldkraft/vitalpilze/Kraftpilz-Cordyceps-120Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/vitalpilze/Kraftpilz-Energie-120Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/vitalpilze/Kraftpilz-Hericium-120Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/vitalpilze/Kraftpilz-Leben-120Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/vitalpilze/Kraftpilz-Regeneration-120Kapseln_Mockup_600x600.jpg", "images/products/waldkraft/vitalpilze/Kraftpilze_Mensch_Abwehr_Freya_Mockup_600x600.jpg", "images/temp/gutscheine.jpg"]),
    mimeTypes: { ".png": "image/png", ".jpeg": "image/jpeg", ".jpg": "image/jpeg", ".webp": "image/webp" },
    _: {
      client: { "start": "_app/immutable/entry/start.CNOiCYoQ.js", "app": "_app/immutable/entry/app.oshfva8T.js", "imports": ["_app/immutable/entry/start.CNOiCYoQ.js", "_app/immutable/chunks/entry.BTRUiN5Q.js", "_app/immutable/chunks/scheduler.zM5vpuro.js", "_app/immutable/chunks/index.an3FWtO5.js", "_app/immutable/chunks/control.CYgJF_JY.js", "_app/immutable/entry/app.oshfva8T.js", "_app/immutable/chunks/preload-helper.BQ24v_F8.js", "_app/immutable/chunks/scheduler.zM5vpuro.js", "_app/immutable/chunks/index.Lc7HYTwW.js"], "stylesheets": [], "fonts": [], "uses_env_dynamic_public": false },
      nodes: [
        __memo(() => Promise.resolve().then(() => (init__(), __exports))),
        __memo(() => Promise.resolve().then(() => (init__2(), __exports2))),
        __memo(() => Promise.resolve().then(() => (init__3(), __exports3))),
        __memo(() => Promise.resolve().then(() => (init__4(), __exports4))),
        __memo(() => Promise.resolve().then(() => (init__5(), __exports5))),
        __memo(() => Promise.resolve().then(() => (init__6(), __exports6))),
        __memo(() => Promise.resolve().then(() => (init__7(), __exports7))),
        __memo(() => Promise.resolve().then(() => (init__8(), __exports8))),
        __memo(() => Promise.resolve().then(() => (init__9(), __exports9))),
        __memo(() => Promise.resolve().then(() => (init__10(), __exports10))),
        __memo(() => Promise.resolve().then(() => (init__11(), __exports11))),
        __memo(() => Promise.resolve().then(() => (init__12(), __exports12))),
        __memo(() => Promise.resolve().then(() => (init__13(), __exports13))),
        __memo(() => Promise.resolve().then(() => (init__14(), __exports14))),
        __memo(() => Promise.resolve().then(() => (init__15(), __exports15))),
        __memo(() => Promise.resolve().then(() => (init__16(), __exports16))),
        __memo(() => Promise.resolve().then(() => (init__17(), __exports17))),
        __memo(() => Promise.resolve().then(() => (init__18(), __exports18))),
        __memo(() => Promise.resolve().then(() => (init__19(), __exports19))),
        __memo(() => Promise.resolve().then(() => (init__20(), __exports20))),
        __memo(() => Promise.resolve().then(() => (init__21(), __exports21))),
        __memo(() => Promise.resolve().then(() => (init__22(), __exports22))),
        __memo(() => Promise.resolve().then(() => (init__23(), __exports23)))
      ],
      routes: [
        {
          id: "/",
          pattern: /^\/$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 4 },
          endpoint: null
        },
        {
          id: "/admin",
          pattern: /^\/admin\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 5 },
          endpoint: null
        },
        {
          id: "/admin/books",
          pattern: /^\/admin\/books\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 6 },
          endpoint: null
        },
        {
          id: "/api/protected-route",
          pattern: /^\/api\/protected-route\/?$/,
          params: [],
          page: null,
          endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts(), server_ts_exports)))
        },
        {
          id: "/auth",
          pattern: /^\/auth\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 7 },
          endpoint: null
        },
        {
          id: "/auth/callback",
          pattern: /^\/auth\/callback\/?$/,
          params: [],
          page: null,
          endpoint: __memo(() => Promise.resolve().then(() => (init_server(), server_exports)))
        },
        {
          id: "/buecher",
          pattern: /^\/buecher\/?$/,
          params: [],
          page: { layouts: [0, 2], errors: [1, ,], leaf: 8 },
          endpoint: null
        },
        {
          id: "/buecher/cat/[catid]",
          pattern: /^\/buecher\/cat\/([^/]+?)\/?$/,
          params: [{ "name": "catid", "optional": false, "rest": false, "chained": false }],
          page: { layouts: [0, 2], errors: [1, ,], leaf: 10 },
          endpoint: null
        },
        {
          id: "/buecher/[bookId]",
          pattern: /^\/buecher\/([^/]+?)\/?$/,
          params: [{ "name": "bookId", "optional": false, "rest": false, "chained": false }],
          page: { layouts: [0, 2], errors: [1, ,], leaf: 9 },
          endpoint: null
        },
        {
          id: "/cdl-protokolle",
          pattern: /^\/cdl-protokolle\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 11 },
          endpoint: null
        },
        {
          id: "/gutscheine",
          pattern: /^\/gutscheine\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 12 },
          endpoint: null
        },
        {
          id: "/leseproben",
          pattern: /^\/leseproben\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 13 },
          endpoint: null
        },
        {
          id: "/leseproben/cat/[catid]",
          pattern: /^\/leseproben\/cat\/([^/]+?)\/?$/,
          params: [{ "name": "catid", "optional": false, "rest": false, "chained": false }],
          page: { layouts: [0], errors: [1], leaf: 15 },
          endpoint: null
        },
        {
          id: "/leseproben/[leseprobenId]",
          pattern: /^\/leseproben\/([^/]+?)\/?$/,
          params: [{ "name": "leseprobenId", "optional": false, "rest": false, "chained": false }],
          page: { layouts: [0], errors: [1], leaf: 14 },
          endpoint: null
        },
        {
          id: "/login",
          pattern: /^\/login\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 16 },
          endpoint: null
        },
        {
          id: "/produkte",
          pattern: /^\/produkte\/?$/,
          params: [],
          page: { layouts: [0, 3], errors: [1, ,], leaf: 17 },
          endpoint: null
        },
        {
          id: "/produkte/cat/[catid]",
          pattern: /^\/produkte\/cat\/([^/]+?)\/?$/,
          params: [{ "name": "catid", "optional": false, "rest": false, "chained": false }],
          page: { layouts: [0, 3], errors: [1, ,], leaf: 19 },
          endpoint: null
        },
        {
          id: "/produkte/hashtag/[tag]",
          pattern: /^\/produkte\/hashtag\/([^/]+?)\/?$/,
          params: [{ "name": "tag", "optional": false, "rest": false, "chained": false }],
          page: { layouts: [0, 3], errors: [1, ,], leaf: 20 },
          endpoint: null
        },
        {
          id: "/produkte/[productid]",
          pattern: /^\/produkte\/([^/]+?)\/?$/,
          params: [{ "name": "productid", "optional": false, "rest": false, "chained": false }],
          page: { layouts: [0, 3], errors: [1, ,], leaf: 18 },
          endpoint: null
        },
        {
          id: "/search",
          pattern: /^\/search\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 21 },
          endpoint: null
        },
        {
          id: "/sitemap.xml",
          pattern: /^\/sitemap\.xml\/?$/,
          params: [],
          page: null,
          endpoint: __memo(() => Promise.resolve().then(() => (init_server2(), server_exports2)))
        },
        {
          id: "/test",
          pattern: /^\/test\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 22 },
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

// .svelte-kit/vercel-tmp/fn/edge.js
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
/*! Bundled license information:

@supabase/auth-helpers-shared/dist/index.mjs:
  (*! Bundled license information:
  
  cookie/index.js:
    (*!
     * cookie
     * Copyright(c) 2012-2014 Roman Shtylman
     * Copyright(c) 2015 Douglas Christopher Wilson
     * MIT Licensed
     *)
  *)
*/
//# sourceMappingURL=index.js.map
