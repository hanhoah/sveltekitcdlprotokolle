import { s as supabase } from "../../../chunks/supabaseClient.js";
const prerender = false;
async function getBooks(q) {
  let anzahl = q.split(" ").length;
  if (anzahl > 1)
    q = q.split(" ").join(" & ");
  const { data } = await supabase.from("books").select().textSearch("fts", q, { config: "german" }).limit(30);
  if (data !== null && typeof data !== "undefined") {
    return data;
  } else {
    console.log("Die Buchsuche ergab kein Ergebnis.");
    return [];
  }
}
async function getProducts(q) {
  let anzahl = q.split(" ").length;
  if (anzahl > 1)
    q = q.split(" ").join(" & ");
  const { data } = await supabase.from("products").select().textSearch("fts", q, { config: "german" }).limit(30);
  if (data !== null && typeof data !== "undefined") {
    return data;
  } else {
    console.log("Die Produktsuche ergab kein Ergebnis.");
    return [];
  }
}
async function load({ params, url }) {
  let q = url.searchParams.get("q");
  const books = await getBooks(q);
  const products = await getProducts(q);
  return { q, books, products };
}
export {
  load,
  prerender
};
