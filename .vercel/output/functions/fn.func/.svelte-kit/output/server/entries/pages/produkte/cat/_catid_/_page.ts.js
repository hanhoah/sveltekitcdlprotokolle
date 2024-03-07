import { s as supabase } from "../../../../../chunks/supabaseClient.js";
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
async function getProductsByCategoryId(catid) {
  const { data, error } = await supabase.from("productswithcategory").select("*").eq("category_id", catid).order("name");
  if (error) {
    console.log(
      "Fehler beim Abrufen von Produkten getProductsByCategoryId lib/functions/products.ts"
    );
  } else
    return data;
}
async function getProductsByCategoryIdWithPagination(catid, page, pageSize) {
  console.log("page ist ", page);
  const offset = (page - 1) * pageSize;
  const { data, error } = await supabase.from("productswithcategory").select("*").eq("category_id", catid).order("name").range(offset, offset + pageSize - 1);
  if (error) {
    console.error("Error fetching products:", error.message);
    return null;
  }
  return data;
}
function getCategories() {
  const categories = [
    { id: 5, name: "Ayurveda" },
    { id: 6, name: "Aphrodisiaka" }
  ];
  return categories;
}
async function countProductsByCategory(cat) {
  const { count } = await supabase.from("products_categories").select("*", { count: "exact", head: true }).eq("category_id", cat);
  return count;
}
async function getCategoryNameById(catId) {
  const { data } = await supabase.from("categories").select("name").eq("id", catId);
  return data[0].name;
}
const prerender = false;
async function fetchProducts(catid, paginate, page) {
  if (paginate) {
    return getProductsByCategoryIdWithPagination(catid, page, 50);
  } else {
    return getProductsByCategoryId(catid);
  }
}
async function load({ params, url }) {
  const page = url.searchParams.get("page") || 1;
  const catid = params.catid;
  const productQty = await countProductsByCategory(parseInt(catid));
  const catname = await getCategoryNameById(parseInt(catid));
  const productcategories = getCategories();
  const description = await getCategoryDescription(parseInt(catid));
  const title = `${catname} - CDL Protokolle`;
  const metaDescription = description || `Entdecken Sie eine Vielzahl von Produkten in der Kategorie ${catname} auf CDL Protokolle.`;
  const paginate = productQty > 50;
  const products = await fetchProducts(parseInt(catid), paginate, page);
  const data = {
    catid,
    catname,
    productcategories,
    productQty,
    description,
    title,
    metaDescription,
    page
  };
  return {
    data,
    streamed: {
      products
    }
  };
}
export {
  load,
  prerender
};
