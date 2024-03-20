import * as fs from 'fs';
import supabase from '../../lib/supabaseClient.js';

const {data: products, error } = await supabase.from('products').select(`id, updated_at`)
if (error)
    console.log('error getting products data from database ', error);
else console.log('data ist ', products);
const jsonContent = JSON.stringify(products);

fs.writeFile("./products.json", jsonContent, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
