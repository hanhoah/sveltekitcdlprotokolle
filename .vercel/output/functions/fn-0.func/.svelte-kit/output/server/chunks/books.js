import { s as supabase } from "./supabaseClient.js";
async function getBookIdsFromHashtagIds(hashtagIds) {
  let similarBooksIds = [];
  const { data: bookIds, error } = await supabase.from("books_hashtags").select("book_id").in("hashtag_id", hashtagIds);
  if (error)
    ;
  else {
    similarBooksIds = [...new Set(bookIds.map((row) => row.book_id))];
  }
  return similarBooksIds;
}
async function getBookIdsFromCatId(catId) {
  let catBookIds = [];
  const { data: bookIds, error } = await supabase.from("books_categories").select("book_id").eq("category_id", catId);
  if (error) {
    console.log("Fehler beim Abrufen der BookIds(catId)");
  } else {
    console.log("Keine Fehler");
    catBookIds = [...new Set(bookIds.map((row) => row.book_id))];
  }
  return catBookIds;
}
async function getCategoryNameById(catId) {
  console.log("funktion call getCategoryNameById");
  const { data } = await supabase.from("categories").select("name").eq("id", catId);
  console.log("data ", data);
  return data[0].name;
}
async function getBooksFromIds(ids) {
  const { data, error: books_err } = await supabase.from("books").select().in("id", ids);
  if (books_err) {
    return null;
  } else {
    return data;
  }
}
async function getBookCategories() {
  const { data, error: categories_err } = await supabase.from("categories").select();
  if (categories_err) {
    console.log("Fehler in der Abfrage");
    return null;
  } else {
    return data;
  }
}
export {
  getBooksFromIds as a,
  getBookIdsFromCatId as b,
  getCategoryNameById as c,
  getBookCategories as d,
  getBookIdsFromHashtagIds as g
};
