import { s as supabase } from "../../../chunks/supabaseClient.js";
async function load() {
  const { count } = await supabase.from("products").select("*", { count: "exact", head: true });
  const { data: categories } = await supabase.from("productcategories").select("*").order("name");
  return {
    count,
    categories
  };
}
export {
  load
};
