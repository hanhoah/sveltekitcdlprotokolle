console.log('adding Book');

import { fail } from "@sveltejs/kit";
import supabase from "$lib/supabaseClient";
import { Request } from "@sveltejs/kit";

async function extractFormData(formData: FormData){
    const title = String(formData.get('title'))
    const img = new Array(String(formData.get('img')))
    const desc = String(formData.get('desc'))
    const label = String(formData.get('label'))
    const link = String(formData.get('link'))
    const tag = String(formData.get('tag'))
    // Erstelle ein leeres Array für die Kategorien
    const category = Number(formData.get('category'));

    return {title, img, desc, label, link, tag, category}

}

async function checkData(formData: FormData){
    let isValid = true;
    const {title, img, desc, label, link, tag, category} = await extractFormData(formData)


    if(!title || !img || !desc || !label || !link || !tag || !category){
        console.log('not valid');
        isValid = false
    }

    return isValid
}

async function getNewId(table){
    console.log('neue id ermitteln');
    const { data: maxid, error } = await supabase
  .from(table)
  .select('id')
  .order('id', { ascending: false })
  .limit(1).single();
  if(error){
      console.log('es gab einen fehler bei der ermittlung der id ', error);
        return fail(400) 
  }
  const id = Number(maxid.id) + 1;
  console.log('neue id ist ', table, id );
    return id

}

async function createBook(formData: FormData){
    const {title, img, desc} = await extractFormData(formData) 
    const id = await getNewId('books')
    const {data, error} = await supabase.from('books').insert({
        id, title, img, desc, active: true,
    }).select()
    if(error)
        console.log('There was an error creating the book', error);
    console.log('data is ', data);
    return id 

}

async function addBookToCategories(formData: FormData, bookid: number){
    const id = await getNewId('books_categories')
    const { category } = await extractFormData(formData)

    const { data, error } = await supabase.from('books_categories').insert({
        id, book_id: bookid, category_id: category
    })
    if(error) {
        console.log('Fehler in addBookToCategories ', error)
        return fail(404)
    }
    else return true;
}

async function addBookLink(formData: FormData, bookid: number){
    const id = await getNewId('booklinks')
    const {label, link} = await extractFormData(formData)
    const { data, error } = await supabase.from('booklinks').insert({
        id, book_id: bookid, label, link
    })
    if(error){
        console.log('Fehler in addBookLink ', error);
        return fail(404)
    }
    else return true;
}

export const actions = {
    addBook: async({request})=>{
        const formData = await request.formData()
        if(await checkData(formData) == false){
            console.log('fehlerhafte daten');
            return fail(400)
        }
        const id = await createBook(formData);
        addBookToCategories(formData, id);
        addBookLink(formData, id)
        // addBookHashTags() if the Hashtags are already in the Hashtag Table
        // createNewHashTag and addBookHashTags otherwise

        console.log('neu erzeugte book id: ', id);
    }
}