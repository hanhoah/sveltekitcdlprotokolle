import { c as create_ssr_component, l as compute_rest_props, s as setContext, v as validate_component, h as getContext, d as subscribe, g as add_attribute } from "../../../chunks/ssr.js";
import { w as writable } from "../../../chunks/index.js";
import { F as Frame } from "../../../chunks/Frame.js";
import { t as twMerge } from "../../../chunks/bundle-mjs.js";
const Accordion = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
const AccordionItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
const telegram = "/_app/immutable/assets/telegram.DBFgt6jX.webp";
const Fraguns = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { link } = $$props;
  if ($$props.link === void 0 && $$bindings.link && link !== void 0)
    $$bindings.link(link);
  return `<div class="border-2 p-3 m-3 bg-teal-200">Hast du eine Frage zu diesem Protokoll. Klicke auf das Telegram Logo <a target="_blank"${add_attribute("href", link, 0)}><img${add_attribute("src", telegram, 0)} width="100" alt="Image"></a> um diese an unserer Telegram Community zu stellen. Nach dem Klick auf den Link öffnet dieses Protokoll in Telegram und du kannst deine Frage direkt an unsere hilfreichen Mitglieder stellen.</div>`;
});
const css$r = {
  code: "div.svelte-1xqtbil{margin-top:1.25rem;margin-bottom:1.25rem\n}",
  map: null
};
const A = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$r);
  return `<div class="svelte-1xqtbil" data-svelte-h="svelte-1fcdjur">Die erste Einnahme besteht aus drei aktivierten Tropfen (im Verhältnis 1:1), zu denen man 200ml Wasser gibt. Am ersten Behandlungstag nehmen Sie diese vor dem Schlafen ein. Am zweiten Tag nehmen Sie eine Stunde nach dem Frühstück drei weitere aktivierte Tropfen mit 200ml Wasser ein und wiederum drei weitere aktivierte Tropfen mit 200ml Wasser vor dem Schlafengehen. Am dritten Tag nehmen Sie die zwei vorherigen Dosen nach dem Frühstück und vor dem Schlafengehen ein und fügen eine weitere Dosis eine Stunde nach dem Essen
    hinzu. Danach geht es mit den gleichen drei Dosen weiter, eine Stunde nach dem Frühstück, dem Essen und vor dem Schlafengehen, solange die Behandlung notwendig ist und bis Sie sich wieder erholt haben.</div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/8" }, {}, {})}`;
});
const css$q = {
  code: "div.svelte-1xqtbil{margin-top:1.25rem;margin-bottom:1.25rem\n}",
  map: null
};
const Ai = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$q);
  return `<div class="svelte-1xqtbil" data-svelte-h="svelte-1z0ip5e"><h2>AI Protokoll (Anti Impf Protokoll)</h2> <ul><li><a target="_blank" href="https://t.me/cdl_protokolle/14896">👉 Allgemeine Empfehlungen</a></li> <li><a target="_blank" href="https://t.me/cdl_protokolle/14898">👉 VOR der Impfung</a></li> <li><a target="_blank" href="https://t.me/cdl_protokolle/14903">👉 DIREKT NACH der Impfung</a></li> <li><a target="_blank" href="https://t.me/cdl_protokolle/14909">👉 Tägliche Pflege 3-6 Monate NACH der Impfung</a></li> <li><a target="_blank" href="https://t.me/cdl_protokolle/14915">👉 Ergänzende Therapien</a></li> <li><a target="_blank" href="https://t.me/cdl_protokolle/14793">👉 AI Protokoll als PDF</a></li></ul></div> ${validate_component(Fraguns, "Fraguns").$$render(
    $$result,
    {
      link: "https://t.me/cdl_protokolle/14923"
    },
    {},
    {}
  )}`;
});
const css$p = {
  code: "div.svelte-1xqtbil{margin-top:1.25rem;margin-bottom:1.25rem\n}",
  map: null
};
const B = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$p);
  return `<div class="svelte-1xqtbil" data-svelte-h="svelte-15ur6hk"><div class="svelte-1xqtbil">Normalerweise fängt man in den ersten 3 Tagen mit einer niedrigen Dosis von 6 aktivierten Tropfen täglich an, die man in eine Flasche mit 1 bis 1,5 Liter Wasser gibt. Danach erhöht man die Dosis auf 12 aktivierte Tropfen und gibt sie in eine Flasche mit 1 bis 1,5 Liter Wasser die nächsten 4 Tage lang. Anschließend sind es 7 Tage lang bis zu 18 Tropfen täglich, die man in eine Flasche mit 1 bis 1,5 Liter Wasser gibt, und schließlich weitere 7 Tage bis zu 24 Tropfen, die man in eine Flasche mit 1 bis 1,5 Liter Wasser gibt. Die tägliche Dosis muss immer im Laufe des Tages genommen und in 8 bis 12 Einnahmen aufgeteilt werden (man kann die Einteilung mit Strichen an der Flasche markieren).</div> <div class="svelte-1xqtbil">Es ist empfehlenswert, die tägliche Dosis am Morgen des jeweiligen Tages zu aktivieren, und sie in eine Flasche mit 1 bis 1,5 Liter Wasser zu geben. Anschließend trinken Sie jede Stunde ein bisschen für den Rest der Behandlung, die regulär 3 Wochen beträgt oder über die notwendige Behandlungszeit hinweg, bis Sie sich wieder gesund fühlen. Das Ziel ist, auf eine angenehme Art eine Dosis von 3 aktivierten Tropfen pro Stunde über 8 Stunden lang einzunehmen und die Dosis langsam zu steigern.</div></div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/9" }, {}, {})}`;
});
const css$o = {
  code: "div.svelte-1xqtbil{margin-top:1.25rem;margin-bottom:1.25rem\n}",
  map: null
};
const C = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$o);
  return `<div class="svelte-1xqtbil" data-svelte-h="svelte-1uw88gp"><div class="svelte-1xqtbil">Das Protokoll 101 CDS wird für die Behandlung der meisten Krankheiten, und auch für eine allgemeine Reinigung von Giftstoffen und “Detox”, genutzt. Es handelt sich dabei auch um ein Entgiftungsverfahren, wahrscheinlich das wirksamste, das bekannt ist. Bis jetzt gibt es keine Probleme mit Nebenwirkungen oder unerwünschte Wechselwirkungen und es verursacht normalerweise keinen Durchfall. Wenn Sie andere Medikamente einnehmen, sollten Sie einen vernünftigen Zeitabschnitt von ein bis zwei Stunden einhalten, damit die Wirkung des CDS nicht verloren geht. Im Falle eines niedrigen Mineralspiegels kann man 1⁄4 Meerwasser hinzufügen.</div> <ul><li>👉Das Protokoll CDS 101 ist ein allgemeingültiges Protokoll, das für die meisten Behandlungen geeignet und einfach auszuführen ist. Es beinhaltet praktisch keine unerwünschten Nebenwirkungen hat.</li> <li>👉Das Protokoll 101 besteht aus der Einnahme von 1ml 0,3%igem CDS (=3000 ppm), das in Wasser verdünnt wird, einmal in der Stunde, 10 mal am Tag. (Daher wird es manchmal auch Protokoll 110 genannt.)</li> <li>👉10ml CDS 3000ppm (oder 100ml CDS 300ppm) + 1 Liter Wasser pro Tag.</li></ul></div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/10" }, {}, {})}`;
});
const css$n = {
  code: "div.svelte-1xqtbil{margin-top:1.25rem;margin-bottom:1.25rem\n}",
  map: null
};
const D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$n);
  return `<div class="svelte-1xqtbil" data-svelte-h="svelte-sjvtuq"><div class="svelte-1xqtbil">Man füllt ein Sprühgerät mit 0,3 %igem CDS (3000ppm) und wendet es an der betroffenen Stelle an. Im Fall von Wunden, Verbrennungen und anderen Hautproblemen wird es direkt auf die Haut aufgetragen. Die Lösung sollte kein Hitzeempfinden oder Brennen verursachen, sondern eher den Schmerz und die Blutung stillen. Man kann diesen Vorgang mehrmals am Tag wiederholen (bis zu einmal pro Stunde). An einigen empfindlichen Stellen, wie bei den Schleimhäuten, kann es notwendig sein, die Konzentration mit ein bisschen Wasser zu reduzieren.</div> <div class="svelte-1xqtbil">Falls es doch vorkommen sollte, dass Sie ein Brennen oder Hitze verspüren, wird empfohlen die Stelle mit Wasser abzuwaschen.</div></div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/12" }, {}, {})}`;
});
const css$m = {
  code: "div.svelte-1xqtbil{margin-top:1.25rem;margin-bottom:1.25rem\n}",
  map: null
};
const E = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$m);
  return `<div class="svelte-1xqtbil" data-svelte-h="svelte-1h0q4ua"><div class="svelte-1xqtbil">Eines der wirkungsvollsten Protokolle, abgesehen von der oralen Einnahme, ist das Einlaufprotokoll, da es die Aufnahme des Chlordioxids über die Wände des Dickdarms
	ermöglicht. Diese befördern es über die Pfortader direkt zur Leber. Daher ist es für alle Leberprobleme, chronische Krankheiten, Vergiftungen, Divertikulitis, Ausscheidung von
	Parasiten und schädliche Darmschleime sehr passend.</div> <div class="svelte-1xqtbil">💧 Die Tropfen werden immer im Verhältnis 1:1 aktiviert.<br>
	💧  10 aktivierte Tropfen CD pro Liter lauem Wasser oder als Alternative 10ml CDS pro Liter lauem Wasser. <br></div> <div class="svelte-1xqtbil">Dieses Protokoll ist grundlegend für chronische Lebererkrankungen, Parasitose, Autismus und andere Magen-Darm-Krankheiten.</div> <div class="svelte-1xqtbil">Je nach Krankheitsgrad und Verfassung des Patienten wird es normalerweise bis zu einmal am Tag, am besten abends vor dem Schlafengehen durchgeführt. Als Faustregel gilt, es alle zwei oder drei Tage für ein oder zwei Wochen anzuwenden. Es gibt Berichte von Personen, die dieses Protokoll bis zu zweimal am Tag für eine längere Zeit bei schweren Krankheiten verwendet haben, ohne dass sie in den meisten Fällen negative Nebenwirkungen erfahren haben. Die Anwendung muss immer individuell auf die zu behandelnde Person zugeschnitten werden.</div> <div class="svelte-1xqtbil">Die beste Position ist es, sich auf die linke Seite zu legen, um das Eindringen des Wassers zu erleichtern. Wenn sich die Klappe öffnet, füllt sich der Dickdarm. Es ist möglich, das in
	mehreren kleinen Serien oder auch auf einmal abzuwickeln, je nach der Verfassung und dem Wohlbefinden der Person. Eine leichte Massage des Unterleibs begünstigt den Prozess.</div> <div class="svelte-1xqtbil">Man sollte versuchen, die Flüssigkeit vor dem Entleeren 3 Minuten lang ein zu behalten, um die Wirkung zu erhöhen. Mehr als fünf Minuten sind nicht notwendig. Man kann auch
	Meerwasser beigeben: 1 Teil Meerwasser + 3 Teile Süßwasser.Für viele Leute hat sich das System YOGUI als sehr hilfreich herausgestellt:</div> <ul><li>💧 3 Nächte hintereinander</li> <li>💧 3 Nächte: abwechselnd anwenden und pausieren</li> <li>💧 3 Nächte: alle 3 Tage</li> <li>💧 3 Nächte, einmal pro Woche</li></ul> <div class="svelte-1xqtbil">Verwenden Sie 10 Tropfen aktiviertes CD (oder 10ml CDS für empfindliche Fälle) pro Liter lauem Wasser (Körpertemperatur). Darmirrigatoren fassen normalerweise ungefähr 2 Liter.
	Man füllt den Irrigator mit Wasser und bereitet die Tropfen in einem separaten Glas vor. Nach der Aktivierung mischt man sie mit dem Wasser des Irrigators. Auf die Spitze trägt man ein bisschen Vaseline oder Creme auf, während man ihn in den After einführt.</div></div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/14" }, {}, {})}`;
});
const css$l = {
  code: "div.svelte-1xqtbil{margin-top:1.25rem;margin-bottom:1.25rem\n}",
  map: null
};
const F = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$l);
  return `<div class="svelte-1xqtbil" data-svelte-h="svelte-16p3gpx">1 Dosis: 1ml CDS alle 15 Minuten 1 Stunde und 45 Minuten lang mit acht Einnahmen = 8ml CDS in einem Liter Wasser. Man kann 8ml 0,3 %iges CDS in eine Flasche mit einem Liter Wasser (destilliertes oder Mineralwasser) geben, die Flasche in 8 gleiche Teile einteilen und diese mit Linien markieren, um alle fünfzehn Minuten bis zu einer Markierung zu trinken.</div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/15" }, {}, {})}`;
});
const css$k = {
  code: "div.svelte-a0cypm{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-a0cypm{font-weight:500;--tw-text-opacity:1;color:rgb(37 99 235 / var(--tw-text-opacity))\n}a.svelte-a0cypm:hover{text-decoration-line:underline\n}@media(prefers-color-scheme: dark){a.svelte-a0cypm{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n    }}",
  map: null
};
const G = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$k);
  return `<div class="svelte-a0cypm" data-svelte-h="svelte-1mxaq1k">Dieses Protokoll kann man auf verschiedene Arten für große und kleine Flächen benutzen:

	<div class="svelte-a0cypm">👉 <a class="link svelte-a0cypm" href="https://t.me/cdl_protokolle/19">1. Gasprotokoll</a> bei einer kleinen Fläche: Man kann die Substanz in einem Glas aktivieren, um kleine Flächen zu behandeln oder Teile des Körpers zu desinfizieren.</div> <div class="svelte-a0cypm">👉 <a href="https://t.me/cdl_protokolle/20" class="svelte-a0cypm">2. Sackprotokoll</a> bei großen Flächen: Man kann es in einem Gefäß in einem großen Sack aktivieren, um große Hautflächen oder sogar den ganzen Körper zu behandeln.</div></div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/16" }, {}, {})}`;
});
const css$j = {
  code: "div.svelte-1xqtbil{margin-top:1.25rem;margin-bottom:1.25rem\n}",
  map: null
};
const H = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$j);
  return `<div class="svelte-1xqtbil" data-svelte-h="svelte-11j2bva">Das Hausprotokoll zur Verhinderung von Ansteckung und Lungenleiden: Man aktiviert 6-12 Tropfen, je nach der Größe des Zimmers zu Hause, in einem trockenen Glas ohne Wasser und stellt es ins Schlafzimmer, wo es langsam verdampft. Seine Wirkung ist sehr hilfreich gegen Ansteckungen des Partners, wenn dieser neben Ihnen schläft oder mehr als 1 Kind im gleichen Zimmer schläft. Stellen Sie das CD in 2 Metern Entfernung zur kranken Person auf. Je heißer es im Zimmer ist, umso schneller verdampft es. Wenn man die Verdampfung verlangsamen möchte, kann man einen Esslöffel Wasser zur Mischung geben.</div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "" }, {}, {})}`;
});
const css$i = {
  code: "div.svelte-a0cypm{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-a0cypm{font-weight:500;--tw-text-opacity:1;color:rgb(37 99 235 / var(--tw-text-opacity))\n}a.svelte-a0cypm:hover{text-decoration-line:underline\n}@media(prefers-color-scheme: dark){a.svelte-a0cypm{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n    }}",
  map: null
};
const I = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$i);
  return `<div class="svelte-a0cypm" data-svelte-h="svelte-jsjowu">Dieses Protokoll hat der Autor Andreas Kalcker leider nicht für die Online Publikation freigegeben. 
Sie finden dieses und viele andere wertvolle Informationen in seinem Buch <a href="/buecher/4" class="svelte-a0cypm">📕 Gesundheit verboten</a>. 

</div>`;
});
const css$h = {
  code: "div.svelte-1xqtbil{margin-top:1.25rem;margin-bottom:1.25rem\n}",
  map: null
};
const J = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$h);
  return `<div class="svelte-1xqtbil" data-svelte-h="svelte-wa9yrh">Dosis: 10ml CDS in einem Glas mit 200ml Wasser. Spülen Sie anfangs den Mund aus und gurgeln Sie 3 Minuten lang 3- bis 4-mal am Tag, später nur einmal am Tag. Eine
    Vorgehensweise ist, mit der Zahnbürste die Zähne zu putzen und das Zahnfleisch zu massieren. Bei tiefen Entzündungen gibt man 1ml DMSO (siehe weiter unten) in die Mischung.
    Zum Schluss ist es wichtig den Mund mit Wasser auszuspülen.</div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/22" }, {}, {})}`;
});
const css$g = {
  code: "div.svelte-1bhw60t{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-1bhw60t{font-weight:500;--tw-text-opacity:1;color:rgb(37 99 235 / var(--tw-text-opacity))\n}a.svelte-1bhw60t:hover{text-decoration-line:underline\n}@media(prefers-color-scheme: dark){a.svelte-1bhw60t{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n    }}",
  map: null
};
const K = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$g);
  return `<div class="svelte-1bhw60t" data-svelte-h="svelte-11nyutj"><div class="svelte-1bhw60t">Anwendungsprotokoll: Bei fast allen Hautkrankheiten wie Akne, Schuppenflechte, Ausschlag, Fußpilz, Wunden usw., wendet man aktiviertes CD normalerweise direkt auf der Haut an und anschließend <a href="https://bit.ly/3zwb7Gp" class="svelte-1bhw60t">👉 DMSO</a>  stündlich bis zu 10-mal am Tag. Hierzu mischt man 20 Tropfen aktiviertes CD mit 50ml Wasser in einer Sprühflasche. Diese stabilen Lösungen halten mehrere Tage, bis zu einer Woche und länger, wenn man sie kühl und im Dunkeln aufbewahrt, in Kristallbehältern sogar Monate. Anschließend werden drei Teelöffel DMSO + ein Teelöffel Wasser in ein kleines Glas gegeben. Es sollten keine ABS- oder PET-Plastikflaschen oder Gummihandschuhe verwendet werden, da sich diese durch das DMSO auflösen könnten und so über die Haut aufgenommen werden! PE- oder HDPE-Flaschen sind richtig. CD wird bis zu maximal 10-mal am Tag angewendet. Man sprüht es dazu auf die Haut und reibt das verdünnte DMSO danach mit der Hand ein. Bei einer weitläufigeren Behandlung wechselt man jede Stunde den Teil der Haut, der behandelt wird. Dieser Vorgang wird 3 Tage die Woche durchgeführt und anschließend gibt man der Haut 4 Tage, um sich zu regenerieren. Sollte die Haut übermäßig aus-trocknen, muss man die Lösungen stärker verdünnen oder die Haut mit Aloe Vera oder nativem Olivenöl einreiben, um sie zu beruhigen. Sollte die Haut zu trocken sein und ein Ausschlag auftreten, reduzieren Sie die Dosis oder unterbrechen Sie die Behandlung.</div> <div class="svelte-1bhw60t">DMSO sollte auf keinen Fall in Flaschen mit einer Gummiaufsatz aufbewahrt werden, da es diesen auflöst und die Lösung verunreinigt.</div> <div class="svelte-1bhw60t">Man benutzt es nicht für Einläufe, da ansonsten die vorhandenen Giftstoffe im Darm reabsorbiert würden.</div></div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/23" }, {}, {})}`;
});
const css$f = {
  code: "div.svelte-1xqtbil{margin-top:1.25rem;margin-bottom:1.25rem\n}",
  map: null
};
const L = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$f);
  return `<div class="svelte-1xqtbil" data-svelte-h="svelte-r3jn81">Vorgehensweise:
    
    <div class="svelte-1xqtbil">1. Die Badewanne gut putzen. Man darf keine Seife oder andere chemische Produkte in das Wasser geben.</div> <div class="svelte-1xqtbil">2. 30-60 Tropfen CD mit 4 %igem HCl Aktivator in einem Glas aktivieren, je nachdem, wie viel Wasser man benutzt. Je mehr Wasser, umso mehr Chlordioxid.</div> <div class="svelte-1xqtbil">3. Die Badewanne mit Wasser in Körpertemperatur füllen. Weder Seife, Parfüm, Shampoo noch Kinderspielzeuge hinzugeben und für eine gute Belüftung des Badezimmers sorgen.</div> <div class="svelte-1xqtbil">4. Das aktivierte CD in die Wanne geben und mischen, damit es sich gut verteilt. Die Menge des Wassers verringert nicht die Menge des ClO2 Gases, das freigesetzt wird.</div> <div class="svelte-1xqtbil">5. Beim Bad wird der ganze Körper befeuchtet, einschließlich des Kopfes und der Kopfhaut. Man braucht sich keine Sorgen zu machen, falls Wasser in die Augen kommt, da CD in dieser verdünnten Dosis nicht schädlich ist.</div> <div class="svelte-1xqtbil">6. Anschließend kann man mehr warmes Wasser hinzufügen, da die Wärme die Poren öffnet und der Organismus aufnahmefähiger wird.</div></div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/24" }, {}, {})}`;
});
const css$e = {
  code: "div.svelte-1xrz5wz{margin-top:1.25rem;margin-bottom:1.25rem\n}li.svelte-1xrz5wz{list-style-type:none\n}",
  map: null
};
const M = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$e);
  return `<div class="svelte-1xrz5wz" data-svelte-h="svelte-110c3gd">Anleitung: 

    <div class="svelte-1xrz5wz">Die Vorgehensweise bei akuter Malaria bei Erwachsenen besteht darin, lediglich zwei hohe Dosen mit je 15 Tropfen aktiviertem CD mit ein bis zwei Stunden Abstand zu
        nehmen. Die meisten Symptome sollten etwa drei Stunden nach der zweiten Dosis verschwunden sein. Falls die Symptome anhalten, werden danach 3 Tropfen pro Stunde
        angewendet. Bei Übelkeit wird die Dosis reduziert. Die Be-handlung wird mit nicht mehr als 3 Tropfen pro Stunde fortgesetzt. Bei Kindern nimmt man bis zu einem Tropfen je 4 Kilo
        Körpergewicht. Falls der erwachsene Patient sehr geschwächt ist, kann man auch ein alternatives, weiterentwickeltes Protokoll anwenden:</div> <ul></ul> <li class="svelte-1xrz5wz">💧8 Tropfen MMS bei der ersten Einnahme</li> <li class="svelte-1xrz5wz">💧5 Tropfen MMS in der zweiten Stunde</li> <li class="svelte-1xrz5wz">💧5 Tropfen MMS in der vierten Stunde</li> <li class="svelte-1xrz5wz">💧6 Tropfen MMS in der sechsten Stunde</li> <li class="svelte-1xrz5wz">💧8 Tropfen MMS in der achten Stunden</li> <li class="svelte-1xrz5wz">💧8 Tropfen MMS zum Schlafengehen</li> <div class="svelte-1xrz5wz">Am Tag insgesamt: 40 Tropfen. Falls der Patient nach dieser Anwendung immer noch krank ist, liegt es nicht an Malaria, sondern an einer anderen Krankheit. Denguefieber wird oft mit Malaria verwechselt, da auch dies von Moskitos übertragen wird. Während es sich bei Malaria jedoch um einen Parasiten handelt, ist die Ursache von Dengue ein Virus und das passende Protokoll ist das Protokoll F (Das häufige Protokoll, das alte CDS 115.)</div></div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "" }, {}, {})}`;
});
const css$d = {
  code: "div.svelte-1xqtbil{margin-top:1.25rem;margin-bottom:1.25rem\n}",
  map: null
};
const N = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$d);
  return `<div class="svelte-1xqtbil" data-svelte-h="svelte-mco4lj"><div class="svelte-1xqtbil"><ul><li>💧Das Protokoll „Wie Kinder und Jugendliche“ basiert auf Erfahrungen und Zeugenberichten vieler Mütter.</li> <li>💧CDS wird normalmalerweise besser vertragen und man benutzt 1ml pro Jahr des Kindes 0,3 %iges CDS (3000ppm) auf 1Liter Wasser am Auf den Tag auf 6 -10 Dosen verteilt .</li> <li>💧Bevor wir mit irgendeinem Protokoll anfangen, überprüfen wir zunächst die Kompatibilität, um Nebenwirkungen zu vermeiden.</li> <li>💧Die Tropfen werden immer im Verhältnis 1:1 aktiviert, indem man 100 bis 200ml Wasser hinzugibt.</li> <li>💧Man muss das Verhalten des Minderjährigen im Auge behalten, falls Müdigkeit, Übelkeit, Bauchschmerzen, Erbrechen usw. auftreten, damit die Dosis nach Bedarf angepasst werden kann.</li> <li>💧Man kann die Lösung mit Reismilch mischen.</li> <li>💧Normalerweise gilt, dass es am besten ist, keinerlei Medikamente oder Behandlungen bis zum ersten Lebensjahr zuzulassen, wenn diese nicht zwingend nötig sind.</li> <li>💧Antioxidationsmittel und Vitamin C vermeiden.</li> <li>💧Die Produkte müssen für Kinder unzugänglich aufbewahrt werden.</li> <li>💧Behälter mit Schraubverschlüssen mit Kindersicherung sind zu bevorzugen.</li></ul></div> <div class="svelte-1xqtbil">Anleitung von aktivierten CD Tropfen:
    <ul><li>Körpergewicht von 5 Kilo – 3 Tropfen am Tag auf 10 Einnahmen verteilt.</li> <li>Körpergewicht von 15 Kilo – 6 Tropfen am Tag auf 10 Einnahmen verteilt.</li> <li>Körpergewicht von 30 Kilo – 8 Tropfen am Tag auf 10 Einnahmen verteilt.</li> <li>Körpergewicht von 40 Kilo – 12 Tropfen am Tag auf 10 Einnahmen verteilt.</li> <li>Körpergewicht von 60 Kilo – Erwachsenendosis</li></ul></div></div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/26" }, {}, {})}`;
});
const css$c = {
  code: "div.svelte-1xqtbil{margin-top:1.25rem;margin-bottom:1.25rem\n}",
  map: null
};
const O = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$c);
  return `<div class="svelte-1xqtbil" data-svelte-h="svelte-1mbc650">Anleitung: <br><br> <ul><li>💧50ml isotonische Kochsalzlösung</li> <li>💧5ml CDS</li> <li>💧3ml DMSO</li></ul> <div class="svelte-1xqtbil">Man wendet alle zwei Stunden 5 Tropfen im betroffenen Auge an.</div></div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/27" }, {}, {})}`;
});
const css$b = {
  code: "div.svelte-12kvwf5{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-12kvwf5{font-weight:500;--tw-text-opacity:1;color:rgb(37 99 235 / var(--tw-text-opacity))\n}a.svelte-12kvwf5:hover{text-decoration-line:underline\n}@media(prefers-color-scheme: dark){a.svelte-12kvwf5{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n    }}",
  map: null
};
const P = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$b);
  return `<div class="svelte-12kvwf5" data-svelte-h="svelte-9hzc2v"><div class="svelte-12kvwf5">Behandlung:</div> <div class="svelte-12kvwf5">Hinweis: Diese Behandlung verwendet keine systemischen Medikamente gegen Parasiten, die vom Körper aufgenommen werden. Hierfür ist ein hochkarätiger Zapper wie der Biotrohn® besser, da er die Parasiten im Blut ohne Vergiftungen beseitigt. Dieses Protokoll wurde entwickelt, um auch bei Kindern aufgrund der Dauer und Dosis Anwendung zu finden, ohne eine übermäßige toxische Ladung im Blut oder im Körper zu verursachen. Man darf Mebendazol nicht mit Albendazol (Albenza) verwechseln, da dieses sehr wohl systemisch eingesetzt wird und eine ärztliche Verschreibung benötigt. Wenn Sie von einem eindeutigen Parasitenbefall im Blut ausgehen, sollten Sie das zur Bestätigung mit einem Arzt besprechen, und nur dann die systemischen Anti-Parasitenmittel anwenden, die – je nach Einschätzung des Arztes – vom Blut aufgenommen werden würden.</div> <div class="svelte-12kvwf5"><div class="svelte-12kvwf5">Tag 1</div> <ul><li>💧Pyrantel-Pamoat (eine einzige Dosis morgens) 10mg/kg, die in einer einzigen Einnahme mit irgendeiner Flüssigkeit verabreicht wird. Falls es in flüssiger Form vorhanden ist, enthält ein Teelöffel mit 5ml 250mg (für 60kg 3 Teelöffel mit 5ml). In Form von Pillen nimmt man 3 bei 60kg.</li> <li>💧Kieselalgenerde (zwei Dosen): Ein Teelöffel zweimal am Tag mit dem Essen, am besten flüssig. Morgens und nachmittags.</li></ul></div> <div class="svelte-12kvwf5"><p>Tag 2</p> <ul><li>💧Mebendazol (zwei Dosen) 100mg alle 12 Stunden. Eine Pille morgens und eine abends.</li> <li>💧Kieselalgenerde (zwei Dosen): Ein Teelöffel zweimal am Tag mit dem Essen, am besten flüssig. Morgens und nachmittags.</li> <li>💧Einlauf: Zusätzliche Ausstattung erforderlich (2 Liter Einlauf)</li></ul></div> <div class="svelte-12kvwf5"><p>Tag 3</p> <ul><li>💧 <a href="https://www.kopp-verlag.de/a/kopp-vital-rizinusoel-nativ-ph.-eur.-250-ml-3?&6=28189485&otpcytokenid=28189485" class="svelte-12kvwf5">👉 Rizinusöl</a>, 2 Suppenlöffel (geschmacklos aus der Apotheke) auf nüchternen Magen.</li> <li>💧Mebendazol (2 Dosen) 100mg alle 12 Stunden. Eine Pille morgens und eine abends.</li> <li>💧Kieselalgenerde (zwei Dosen): Ein Teelöffel zweimal am Tag mit dem Essen, am besten flüssig morgens und nachmittags.</li> <li>💧Einlauf.</li></ul></div> <div class="svelte-12kvwf5"><p>Tag 4</p> <ul><li>💧Mebendazol (zwei Dosen) 100mg alle 12 Stunden. Eine Pille morgens und eine abends.</li> <li>💧Kieselalgenerde (2 Dosen): Ein Teelöffel zweimal am Tag mit dem Essen, am besten flüssig morgens und nachmittags.</li> <li>💧Einlauf.</li></ul></div> <div class="svelte-12kvwf5"><p>Tag 5</p> <ul><li>💧Pyrantel-Pamoat (eine einzige Dosis) 10mg/kg, die in einer einzigen Einnahme mit irgendeiner Flüssigkeit verabreicht wird. Falls es in flüssiger Form vorhanden ist, enthält ein Teelöffel mit 5ml 250mgr (für 60kg 3 Teelöffel mit 5ml). In Form von Pillen nimmt man 3 bei 60kg.</li> <li>💧Kieselalgenerde (2 Dosen): Ein Teelöffel zweimal am Tag mit dem Essen, am besten flüssig morgens und nachmittags.</li> <li>💧Einlauf</li></ul></div> <div class="svelte-12kvwf5"><p>Tag 6</p> <ul><li>💧 <a href="https://www.kopp-verlag.de/a/kopp-vital-rizinusoel-nativ-ph.-eur.-250-ml-3?&6=28189485&otpcytokenid=28189485" class="svelte-12kvwf5">👉 Rizinusöl</a>, 2 Suppenlöffel (geschmacklos aus der Apotheke) auf nüchternen Magen.</li> <li>💧Mebendazol (2 Dosen) 100mg alle 12 Stunden. Eine Pille morgens und eine abends.</li> <li>💧Kieselalgenerde (zwei Dosen): Ein Teelöffel zweimal am Tag mit dem Essen, am besten flüssig morgens und nachmittags.</li> <li>💧Einlauf.</li></ul></div> <div class="svelte-12kvwf5"><p>Tag 7</p> <ul><li>💧Mebendazol 100mg alle 12 Stunden. Eine Pille morgens und eine abends.</li> <li>💧Kieselalgenerde: Ein Teelöffel zweimal am Tag mit dem Essen, am besten flüssig morgens und nachmittags.</li> <li>💧Einlauf.</li></ul></div> <div class="svelte-12kvwf5"><p>Tag 8</p> <ul><li>💧Mebendazol 100mg alle 12 Stunden. Eine Pille morgens und eine abends.</li> <li>💧Kieselalgenerde: Ein Teelöffel zweimal am Tag mit dem Essen, am besten flüssig morgens und nachmittags.</li> <li>💧Einlauf.</li></ul></div> <div class="svelte-12kvwf5"><p>Tag 9 bis 18 (Erster Monat)</p> <ul><li>💧 <a href="https://www.kopp-verlag.de/a/kopp-vital-rizinusoel-nativ-ph.-eur.-250-ml-3?&6=28189485&otpcytokenid=28189485" class="svelte-12kvwf5">👉 Rizinusöl</a>, 2 Suppenlöffel (geschmacklos aus der Apotheke) auf nüchternen Magen.  Je nach Bedarf der einzelnen Person wiederholen. Bei ununterbrochenem Durchfall auslassen.</li> <li>💧Kieselalgenerde: Ein Teelöffel zweimal am Tag mit dem Essen, am besten flüssig morgens und nachmittags.</li> <li>💧Niemaufguss (Azadirachta Indica) (9 Tage). 3 gestrichene Teelöffel in einem Liter Wasser. 5 Minuten lang kochen und den ganzen Tag über trinken. Sie können auch Niemkapseln benutzen, da der Aufguss sehr bitter ist.</li> <li>💧Einläufe so ununterbrochen wie möglich</li></ul></div></div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/28" }, {}, {})}`;
});
const css$a = {
  code: "div.svelte-12kvwf5{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-12kvwf5{font-weight:500;--tw-text-opacity:1;color:rgb(37 99 235 / var(--tw-text-opacity))\n}a.svelte-12kvwf5:hover{text-decoration-line:underline\n}@media(prefers-color-scheme: dark){a.svelte-12kvwf5{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n    }}",
  map: null
};
const Pzwei = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$a);
  return `<div class="svelte-12kvwf5" data-svelte-h="svelte-1lvkqrx"><div class="svelte-12kvwf5">Tag 9 bis 18 (Zweiter Monat)</div> <div class="svelte-12kvwf5"><ul><li>💧 <a href="https://www.kopp-verlag.de/a/kopp-vital-rizinusoel-nativ-ph.-eur.-250-ml-3?&6=28189485&otpcytokenid=28189485" class="svelte-12kvwf5">👉 Rizinusöl</a> , 2 Suppenlöffel (geschmacklos aus der Apotheke) auf nüchternen Magen.</li> <li>💧Je nach Bedarf der einzelnen Person wiederholen. Bei ununterbrochenem Durchfall auslassen.</li> <li>💧Kieselalgenerde: Ein Teelöffel zweimal am Tag mit dem Essen, am besten flüssig morgens und nachmittags.</li> <li>💧Epazotenaufguss (Dysphania ambrosioides/Mexikanischer Drüsengänsfuß) (3 Tage). 1 oder 2 Esslöffel der Blätter in einem Liter Wasser 10 Minuten lang kochen, ziehen lassen und filtern. 1 Tasse auf nüchternen Magen 3 aufeinander folgende Tage lang trinken.</li> <li>💧Die restlichen Tage Aloe Vera Gel mit Saft oder Wasser auf nüchternen Magen trinken.</li> <li>💧Einläufe so ununterbrochen wie möglich.</li></ul></div> <div class="svelte-12kvwf5"><div class="svelte-12kvwf5">Tag 9 bis 18 (Dritter Monat)</div> <ul><li>💧<a href="https://www.kopp-verlag.de/a/kopp-vital-rizinusoel-nativ-ph.-eur.-250-ml-3?&6=28189485&otpcytokenid=28189485" class="svelte-12kvwf5">👉 Rizinusöl</a>, 2 Suppenlöffel (geschmacklos aus der Apotheke) auf nüchternen Magen. Je nach Bedarf der einzelnen Person wiederholen. Bei ununterbro-chenem Durchfall auslassen.</li> <li>💧Kieselalgenerde: Ein Teelöffel zweimal am Tag mit dem Essen, am besten flüssig morgens und nachmittags.</li> <li>💧Niemaufguss. 9 Tage lang oder ein alternativer Anti-Parasitentee.</li> <li>💧Einläufe so ununterbrochen wie möglich.</li> <li>💧Falls nach dem dritten Monat immer noch Parasiten oder große Mengen an Schleim ausgeschieden werden, kann man mit dem Protokoll fortfahren und nochmal bei Monat 2 anfangen.</li></ul></div> <div class="svelte-12kvwf5"><p>❗️Beachten Sie folgende Hinweise:</p> <p class="m-5">Mebendazol (Vermox) zeigt keine Wechselwirkungen mit Chlordioxid, aber wohl mit den folgenden Arzneimitteln:</p> <ul class="list-disc mt-5 ml-20"><li>Tagamet (Cimetidin)</li> <li>Ethotoin</li> <li>Penizillin</li> <li>Zithromax (Azithromycin)</li> <li>Amoxicillin</li> <li>Mephenytoin</li> <li>Carbamazepin</li> <li>Flagyl (Metronidazol)</li></ul></div></div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/30" }, {}, {})}`;
});
const css$9 = {
  code: "div.svelte-1xqtbil{margin-top:1.25rem;margin-bottom:1.25rem\n}",
  map: null
};
const Q = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$9);
  return `<div class="svelte-1xqtbil" data-svelte-h="svelte-1huka7c"><div class="svelte-1xqtbil">Protokoll Q: Wie Quaddel, Brandwunden, Verbrennungen und Sonnenbrand</div> <div class="svelte-1xqtbil">Anleitung mit Chlordioxid: Es gibt zwei Behandlungsmöglichkeiten: Wenn es sich um schwere Verbrennungen handelt, wendet man am besten 0,3 %iges CD (3000 ppm) direkt inForm von Spray auf der Verbrennung an. Normalerweise spürt man schon durch diese Anwendung sofortige Linderung. Man kann auch ein Tuch in CDS tränken und es auf der
    betroffenen Stelle liegen lassen. Der Vorteil hierbei ist, dass man diesen Vorgang mehrmals wiederholen kann und es nicht erforderlich ist, sich danach zu waschen, da die Substanz
    keine chemische Verbrennung durch den pH-Wert auslöst.</div></div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/31" }, {}, {})}`;
});
const css$8 = {
  code: "div.svelte-1xqtbil{margin-top:1.25rem;margin-bottom:1.25rem\n}",
  map: null
};
const R = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$8);
  return `<div class="svelte-1xqtbil" data-svelte-h="svelte-1bf0iai"><div class="svelte-1xqtbil">Protokoll R: Wie Rektal</div> <p>Anleitung: Man aktiviert 6 Tropfen CD in einem Wasserglas und gibt 150ml Wasser mit Körpertemperatur hinzu. Mit eine Birnspritze saugt man es auf, entfernt die Luft im Inneren
        und trägt Vaseline oder ein Gleitmittel an der Spitze auf. Anschließend führt man sie in den After ein und leert die Spritze ganz. Die Flüssigkeit sollte ungefähr 3 Minuten einbehalten
        werden, bevor sie ausgeschieden wird.</p></div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/32" }, {}, {})}`;
});
const css$7 = {
  code: "div.svelte-1xqtbil{margin-top:1.25rem;margin-bottom:1.25rem\n}",
  map: null
};
const S = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$7);
  return `<div class="svelte-1xqtbil" data-svelte-h="svelte-fwi7u9"><h2>Protokoll S: Wie Sensibel, leichte Dosierungen nach und nach</h2> <p>Anleitung: Hierzu nimmt man 1ml CDS auf 500ml Wasser auf den ersten Tag verteilt. Am zweiten Tag nimmt man 2ml CDS in 1 Liter Wasser. Sollte es keine Zwischenfälle geben (und
        normalerweise ist das auch nicht der Fall), kann man die Dosis von hieran jeden Tag auf 1ml zusätzlich pro Liter erhöhen, bis man 10ml CDS pro Liter Wasser erreicht hat.</p></div> ${validate_component(Fraguns, "Fraguns").$$render($$result, { link: "https://t.me/cdl_protokolle/33" }, {}, {})}`;
});
const css$6 = {
  code: "div.svelte-a0cypm{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-a0cypm{font-weight:500;--tw-text-opacity:1;color:rgb(37 99 235 / var(--tw-text-opacity))\n}a.svelte-a0cypm:hover{text-decoration-line:underline\n}@media(prefers-color-scheme: dark){a.svelte-a0cypm{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n    }}",
  map: null
};
const T = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$6);
  return `<div class="svelte-a0cypm" data-svelte-h="svelte-jsjowu">Dieses Protokoll hat der Autor Andreas Kalcker leider nicht für die Online Publikation freigegeben. 
Sie finden dieses und viele andere wertvolle Informationen in seinem Buch <a href="/buecher/4" class="svelte-a0cypm">📕 Gesundheit verboten</a>. 

</div>`;
});
const css$5 = {
  code: "div.svelte-a0cypm{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-a0cypm{font-weight:500;--tw-text-opacity:1;color:rgb(37 99 235 / var(--tw-text-opacity))\n}a.svelte-a0cypm:hover{text-decoration-line:underline\n}@media(prefers-color-scheme: dark){a.svelte-a0cypm{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n    }}",
  map: null
};
const U = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$5);
  return `<div class="svelte-a0cypm" data-svelte-h="svelte-jsjowu">Dieses Protokoll hat der Autor Andreas Kalcker leider nicht für die Online Publikation freigegeben. 
Sie finden dieses und viele andere wertvolle Informationen in seinem Buch <a href="/buecher/4" class="svelte-a0cypm">📕 Gesundheit verboten</a>. 

</div>`;
});
const css$4 = {
  code: "div.svelte-a0cypm{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-a0cypm{font-weight:500;--tw-text-opacity:1;color:rgb(37 99 235 / var(--tw-text-opacity))\n}a.svelte-a0cypm:hover{text-decoration-line:underline\n}@media(prefers-color-scheme: dark){a.svelte-a0cypm{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n    }}",
  map: null
};
const V = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$4);
  return `<div class="svelte-a0cypm" data-svelte-h="svelte-jsjowu">Dieses Protokoll hat der Autor Andreas Kalcker leider nicht für die Online Publikation freigegeben. 
Sie finden dieses und viele andere wertvolle Informationen in seinem Buch <a href="/buecher/4" class="svelte-a0cypm">📕 Gesundheit verboten</a>. 

</div>`;
});
const css$3 = {
  code: "div.svelte-a0cypm{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-a0cypm{font-weight:500;--tw-text-opacity:1;color:rgb(37 99 235 / var(--tw-text-opacity))\n}a.svelte-a0cypm:hover{text-decoration-line:underline\n}@media(prefers-color-scheme: dark){a.svelte-a0cypm{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n    }}",
  map: null
};
const W = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$3);
  return `<div class="svelte-a0cypm" data-svelte-h="svelte-jsjowu">Dieses Protokoll hat der Autor Andreas Kalcker leider nicht für die Online Publikation freigegeben. 
Sie finden dieses und viele andere wertvolle Informationen in seinem Buch <a href="/buecher/4" class="svelte-a0cypm">📕 Gesundheit verboten</a>. 

</div>`;
});
const css$2 = {
  code: "div.svelte-a0cypm{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-a0cypm{font-weight:500;--tw-text-opacity:1;color:rgb(37 99 235 / var(--tw-text-opacity))\n}a.svelte-a0cypm:hover{text-decoration-line:underline\n}@media(prefers-color-scheme: dark){a.svelte-a0cypm{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n    }}",
  map: null
};
const X = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `<div class="svelte-a0cypm" data-svelte-h="svelte-jsjowu">Dieses Protokoll hat der Autor Andreas Kalcker leider nicht für die Online Publikation freigegeben. 
Sie finden dieses und viele andere wertvolle Informationen in seinem Buch <a href="/buecher/4" class="svelte-a0cypm">📕 Gesundheit verboten</a>. 

</div>`;
});
const css$1 = {
  code: "div.svelte-a0cypm{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-a0cypm{font-weight:500;--tw-text-opacity:1;color:rgb(37 99 235 / var(--tw-text-opacity))\n}a.svelte-a0cypm:hover{text-decoration-line:underline\n}@media(prefers-color-scheme: dark){a.svelte-a0cypm{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n    }}",
  map: null
};
const Y = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<div class="svelte-a0cypm" data-svelte-h="svelte-jsjowu">Dieses Protokoll hat der Autor Andreas Kalcker leider nicht für die Online Publikation freigegeben. 
Sie finden dieses und viele andere wertvolle Informationen in seinem Buch <a href="/buecher/4" class="svelte-a0cypm">📕 Gesundheit verboten</a>. 

</div>`;
});
const css = {
  code: "div.svelte-a0cypm{margin-top:1.25rem;margin-bottom:1.25rem\n}a.svelte-a0cypm{font-weight:500;--tw-text-opacity:1;color:rgb(37 99 235 / var(--tw-text-opacity))\n}a.svelte-a0cypm:hover{text-decoration-line:underline\n}@media(prefers-color-scheme: dark){a.svelte-a0cypm{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n    }}",
  map: null
};
const Z = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="svelte-a0cypm" data-svelte-h="svelte-jsjowu">Dieses Protokoll hat der Autor Andreas Kalcker leider nicht für die Online Publikation freigegeben. 
Sie finden dieses und viele andere wertvolle Informationen in seinem Buch <a href="/buecher/4" class="svelte-a0cypm">📕 Gesundheit verboten</a>. 

</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Accordion, "Accordion").$$render($$result, { activeClass: "bg-white" }, {}, {
    default: () => {
      return `${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
        header: () => {
          return `<span slot="header" data-svelte-h="svelte-go5fba">Protokoll A: Wie Amateur, für alle Anfänger</span>`;
        },
        default: () => {
          return `<div>${validate_component(A, "A").$$render($$result, {}, {}, {})}</div>`;
        }
      })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
        header: () => {
          return `<span slot="header" data-svelte-h="svelte-95nshk">📢 NEU! AI-Protokoll  der Comusav</span>`;
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
          return `<span slot="header" data-svelte-h="svelte-1pybp8">Protokoll D: Wie Dermatologisch, für die Haut</span>`;
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
          return `<span slot="header" data-svelte-h="svelte-1jajw9m">Protokoll U: Wie Urgency , das alte “Claras 6+6 Protokoll”   (Seite. 176)</span>`;
        },
        default: () => {
          return `<div>${validate_component(U, "U").$$render($$result, {}, {}, {})}</div>`;
        }
      })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
        header: () => {
          return `<span slot="header" data-svelte-h="svelte-1xi5v0y">Protokoll V: Wie Vaginalspülung   (Seite. 177)</span>`;
        },
        default: () => {
          return `<div>${validate_component(V, "V").$$render($$result, {}, {}, {})}</div>`;
        }
      })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
        header: () => {
          return `<span slot="header" data-svelte-h="svelte-1dw2syw">Protokoll W: Wie Wau, kann auch für ... verwendet werden   (Seite. 178)</span>`;
        },
        default: () => {
          return `<div>${validate_component(W, "W").$$render($$result, {}, {}, {})}</div>`;
        }
      })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
        header: () => {
          return `<span slot="header" data-svelte-h="svelte-opwju8">Protokoll X: Wie DetoX, also für die Entgiftung von Schwermetalle   (Seite. 179)</span>`;
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
export {
  Page as default
};
