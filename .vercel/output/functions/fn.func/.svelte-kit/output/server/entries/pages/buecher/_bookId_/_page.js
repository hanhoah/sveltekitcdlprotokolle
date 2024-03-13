import { s as supabase } from "../../../../chunks/supabaseClient.js";
import { g as getBookIdsFromHashtagIds, a as getBooksFromIds } from "../../../../chunks/books.js";
import { g as getHashtagIds, h as hashtagIdsToText } from "../../../../chunks/getHashtags.js";
async function getBookDetails(bookId) {
  try {
    const { data } = await supabase.from("books").select("*").eq("id", bookId).limit(1).single();
    return { data };
  } catch (error) {
    return {};
  }
}
async function getBooklinks(bookid) {
  try {
    const { data } = await supabase.from("booklinks").select("label, link").eq("book_id", bookid);
    return data;
  } catch (error) {
    return {};
  }
}
async function load({ params }) {
  let buchid = parseInt(params.bookId);
  let { data } = await getBookDetails(buchid);
  let hashtagIds = await getHashtagIds(buchid);
  let booklist = await getBookIdsFromHashtagIds(hashtagIds);
  return {
    data,
    streamed: {
      links: getBooklinks(buchid),
      similarBooks: getBooksFromIds(booklist),
      hashtags: hashtagIdsToText(hashtagIds)
    }
  };
}
export {
  load
};
