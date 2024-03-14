import { s as supabase } from "../../../chunks/supabaseClient.js";
async function load() {
  const title = "Buchempfehlungen. Wähle eine der Kategorien um schneller das passende Buch zu finden. ";
  const { data } = await supabase.from("books").select().eq("active", true);
  return {
    title,
    streamed: {
      books: data
    }
  };
}
export {
  load
};
