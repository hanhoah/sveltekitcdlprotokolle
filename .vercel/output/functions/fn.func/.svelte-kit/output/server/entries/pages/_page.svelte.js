import { c as create_ssr_component, g as add_attribute, f as escape, v as validate_component } from "../../chunks/ssr.js";
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { text = "text" } = $$props;
  let { href = "#" } = $$props;
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  return `<a${add_attribute("href", href, 0)} class="hover:no-underline"><div class="bg-cyan-700 text-teal-200 rounded-lg w-48 h-16 p-1 m-1 md:p-2 md:m-2 text-center justify-center items-center hover:bg-teal-200 hover:text-cyan-700 font-semibold shadow">${escape(text)}</div> </a>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="p-3 space-y-5"><h1 class="" data-svelte-h="svelte-9q72nw">Willkommen auf cdl-protokolle.com</h1> <h2 data-svelte-h="svelte-f7aopr">Ihrer Quelle für hochwertige Gesundheitsinformationen und wertvolle Tipps für ein gesundes Leben!</h2> <div data-svelte-h="svelte-1uk3885">Wir freuen uns, Sie auf unserer Website begrüßen zu dürfen, wo wir Ihnen kostenlosen Zugang zu Leseproben aus einer Vielzahl erstklassiger Gesundheitsbücher bieten. Bei uns finden Sie zahlreiche Ratschläge und Informationen, wie Sie Ihre Gesundheit verbessern und erhalten können – und das alles ohne den Einsatz von Pharma-Medizin.</div> <div data-svelte-h="svelte-1cx01e6">Die Idee zu dieser Website entstand aus der gleichnamigen <a href="https://t.me/cdl_protokolle">Telegram-Gruppe</a>, in der wir zahlreiche Informationen sammeln und diskutieren. Unser Ziel ist es, diese Informationen noch besser zu organisieren und aufzubereiten, um sie Ihnen leicht zugänglich zu machen. Wir laden Sie herzlich ein, auch Mitglied unserer Telegram-Gruppe zu werden, um sich aktiv mit Gleichgesinnten auszutauschen und von weiteren Informationen zu profitieren. Sie können der Gruppe unter folgendem Link beitreten: https://t.me/cdl_protokolle.</div> <div data-svelte-h="svelte-co2pvt">Tauchen Sie ein in die Welt der ganzheitlichen Gesundheit und entdecken Sie, wie Sie Ihr Wohlbefinden auf natürliche Weise fördern können. Unsere Website bietet Ihnen eine Fülle von Ressourcen, um Ihnen auf Ihrem Weg zu einem gesünderen Lebensstil zu helfen. Viel Spaß beim Lesen und Entdecken!</div> <div class="flex flex-col md:flex-row justify-center pl-20 md:pl-0">${validate_component(Button, "Button").$$render(
    $$result,
    {
      text: "CDL Protokolle Telegram",
      href: "https://t.me/cdl_protokolle"
    },
    {},
    {}
  )} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      text: "Bücher der alternativen Medizin",
      href: "/buecher/"
    },
    {},
    {}
  )}</div></div>`;
});
export {
  Page as default
};
