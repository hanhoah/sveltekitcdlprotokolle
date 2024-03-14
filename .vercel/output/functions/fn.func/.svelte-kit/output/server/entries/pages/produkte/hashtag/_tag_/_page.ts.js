import { s as supabase } from "../../../../../chunks/supabaseClient.js";
import { a as getHashtag } from "../../../../../chunks/getHashtags.js";
async function getProductsByName(name) {
  console.log("getProductsByName", name);
  const { data, error } = await supabase.from("products").select("*").ilike("name", "%" + name + "%").order("name");
  if (error) {
    console.log("Fehler beim Abrufen getProductsByName");
  } else
    return data;
}
async function load({ params }) {
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
export {
  load
};
