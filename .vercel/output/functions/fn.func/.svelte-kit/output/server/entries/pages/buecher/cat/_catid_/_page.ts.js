import { b as getBookIdsFromCatId, c as getCategoryNameById, d as getBookCategories, a as getBooksFromIds } from "../../../../../chunks/books.js";
async function load({ params }) {
  const catid = params.catid;
  const bookIds = await getBookIdsFromCatId(parseInt(catid));
  const catname = await getCategoryNameById(parseInt(catid));
  const bookcategories = getBookCategories();
  const title = catname + " Bücher | cdl-protokolle.com";
  const metaDescription = `Entdecken Sie eine Vielzahl von Büchern auf cdl-protokolle.com`;
  const data = { catid, catname, bookcategories, title, metaDescription };
  return {
    data,
    streamed: {
      books: getBooksFromIds(bookIds)
    }
  };
}
export {
  load
};
