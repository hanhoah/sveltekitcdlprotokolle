import { s as supabase } from "../../../../chunks/supabaseClient.js";
async function load({ params }) {
  let pid = params.productid;
  let select = `id, name, image, description, link, products_categories(category_id)`;
  let { data } = await supabase.from("products").select(select).eq("id", pid).limit(1).single();
  let name = data.name;
  console.log("product: ", name, "id: ", pid);
  data.description || `Entdecken Sie eine Vielzahl von Produkten auf cdl-protokolle.com`;
  async function getSearchTerm(name2) {
    let tempArray = name2.split(" ");
    tempArray = tempArray.slice(0, 3);
    let searchTerm = tempArray.join(" ");
    return searchTerm;
  }
  let searchterm = await getSearchTerm(name);
  let kid = data.products_categories[0].category_id;
  async function getSimilarProductIds(kid2, pid2) {
    let { data: data2 } = await supabase.from("products_categories").select("product_id").eq("category_id", kid2).range(0, 9);
    let similarProducts = data2.map((obj) => obj.product_id);
    similarProducts = similarProducts.filter((product) => product != pid2);
    return similarProducts;
  }
  async function getProductsFromIds(spids2) {
    let { data: data2 } = await supabase.from("products").select().in("id", spids2);
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
export {
  load
};
