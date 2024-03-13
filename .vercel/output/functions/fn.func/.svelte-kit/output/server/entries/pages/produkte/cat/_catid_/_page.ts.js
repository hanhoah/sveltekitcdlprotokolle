import { s as supabase } from "../../../../../chunks/supabaseClient.js";
async function getCategoryNameById(catid) {
  console.log("getCategoryNameById: ", catid);
  const { data, error } = await supabase.from("categories").select("name").eq("id", catid).single();
  return data?.name;
}
async function getCategoryDescription(catid) {
  const { data, error } = await supabase.from("categories").select("description").eq("id", catid).single();
  try {
    if (data && data.description) {
      return data.description;
    } else {
      return null;
    }
  } catch (error2) {
    return null;
  }
}
const prerender = "false";
async function load({ params }) {
  const catid = params.catid;
  console.log("Lade Cat Parameter ...", catid);
  const category = await getCategoryNameById(parseInt(catid));
  const description = await getCategoryDescription(parseInt(catid));
  console.log("desc", description);
  const { data: products, error } = await supabase.from("productswithcategory").select().eq("category_id", catid).order("name");
  const length = products?.length;
  return {
    catid,
    length,
    category,
    description,
    products
  };
}
export {
  load,
  prerender
};
