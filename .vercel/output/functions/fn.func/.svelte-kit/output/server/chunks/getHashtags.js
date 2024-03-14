import { s as supabase } from "./supabaseClient.js";
async function getHashtag(id) {
  const { data, error } = await supabase.from("hashtags").select("tag").eq("id", id).limit(1).single();
  if (error) {
    throw new Error("Fehler beim Abrufen des Hashtag Namens: " + error.message);
  }
  return data;
}
async function getHashtagIds(bookId) {
  const { data: hashtagsData, error } = await supabase.from("books_hashtags").select("hashtag_id").eq("book_id", bookId);
  if (error) {
    throw new Error("Fehler beim Abrufen der Hashtags: " + error.message);
  }
  const hashtagIds = hashtagsData.map((row) => row.hashtag_id);
  return hashtagIds;
}
async function hashtagIdsToText(hashtagIds) {
  const { data: hashtags, error: hashtagError } = await supabase.from("hashtags").select("tag").in("id", hashtagIds);
  if (hashtagError) {
    throw new Error("Fehler beim Abrufen der Hashtags: " + hashtagError.message);
  }
  return hashtags;
}
export {
  getHashtag as a,
  getHashtagIds as g,
  hashtagIdsToText as h
};
