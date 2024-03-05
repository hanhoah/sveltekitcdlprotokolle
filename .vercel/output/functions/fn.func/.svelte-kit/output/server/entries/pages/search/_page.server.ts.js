import { s as supabase } from "../../../chunks/supabaseClient.js";
const prerender = false;
async function getBooks(q) {
  const { data } = await supabase.from("books").select().textSearch("title", q);
  return data;
}
async function getProducts(q) {
  const { data } = await supabase.from("products").select().textSearch("name", q);
  return data;
}
const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const q = formData.get("search");
    const books = await getBooks(q);
    const products = await getProducts(q);
    return { q, books, products };
  }
};
export {
  actions,
  prerender
};
