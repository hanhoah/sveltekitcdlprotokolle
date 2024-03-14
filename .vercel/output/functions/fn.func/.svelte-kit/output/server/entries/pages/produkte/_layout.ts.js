import { s as supabase } from "../../../chunks/supabaseClient.js";
let cachedCategories = null;
async function fetchCategories() {
  if (!cachedCategories) {
    console.log("getting Categories from supabase");
    const { data: categories } = await supabase.from("productcategories").select("*").order("name");
    console.log("speichere Katgorien im Cache um zukünftige Anfragen zu beschleunigen");
    cachedCategories = categories;
    return categories;
  }
  console.log("Getting Categories from Cache");
  return cachedCategories;
}
console.log("Produkt Layout wird initialisiert...");
async function load() {
  const { count } = await supabase.from("products").select("*", { count: "exact", head: true });
  const categories = await fetchCategories();
  return {
    count,
    categories
  };
}
export {
  load
};
