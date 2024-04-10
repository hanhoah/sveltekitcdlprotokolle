import { fail } from "@sveltejs/kit";
import supabase from "$lib/supabaseClient";
import { getProductDataFromKopp } from "$lib/functions/shops/kopp.ts";
import { getProductDataFromBioApo } from "$lib/functions/shops/bio-apo.js";

interface ProductData {
    id: string, 
    name: string, 
    price: number, 
    image: string, 
    link: string, 
    description: string
}

async function extractFormData(formData: FormData){
    const url = String(formData.get('url'))
    const category = Number(formData.get('category'))
    return {url, category}
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

async function insertCategory(category: number, productData: ProductData){
    const id = await getNewId('products_categories')
    console.log('neue id: ', id);
    const newcatentry = {
        id,
        product_id: productData.id,
        category_id: category,
    }
    console.log('newcatentry ', newcatentry);
    const {error} = await supabase.from('products_categories').insert(newcatentry)
    if(error)
        console.log('error in insertCategory ', error);
    return true
}

async function insertProductData(productData: ProductData){
    const { error } = await supabase.from('products').insert(productData)
    if (error)
        console.log('there was an error adding the new product', error);
    return true;
}

async function getProductData(url: string, shop: sring){
    let productData 
    console.log('getproductData()', '\n',url, '\n', shop);
    switch(shop){
        case "kopp-verlag":
            productData = await getProductDataFromKopp(url)
            break;
        case "bio-apo":
            console.log('bio apo gefunden');
            productData = await getProductDataFromBioApo(url)
            break;
    }

    return productData

}

async function getCategories(){
    let categories = []
    const {data, error } = await supabase.from('categories').select('id, name').order('name')
    if(error)
        console.log('there was an error in getCategories: ', error);
    else return data
}

export async function load(){
    const categories = await getCategories()
    return {categories}
}

export const actions = {
    addProduct: async({request})=>{
        const formData  = await request.formData()
        const { url, category } = await extractFormData(formData)
        // ermittle den Shop anhand der URL
        const shop = url.split('.')[1]
        // hole name, preis, bild aus dem ordner kopp verlag speichern, affiliate link, beschreibung
        // nur im dev mode 
        const productData = await getProductData(url, shop)
        // console.log('received productData is: ', productData);
        console.log(await insertProductData(productData)); 
        console.log(await insertCategory(category, productData));
        


    }
}