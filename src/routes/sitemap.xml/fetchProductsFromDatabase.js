// fetchProductsFromDatabase.js

import supabase from '../../lib/supabaseClient.js';
import fs from 'fs';

async function fetchProducts() {
  try {
    const { data: products, error } = await supabase.from('products').select(`id, updated_at`);
  
    if (error) {
      throw new Error('Fehler beim Abrufen der Produkt-Daten aus der Datenbank');
    }

    fs.writeFileSync('products.json', JSON.stringify(products));
    console.log('Produktdaten erfolgreich in products.json exportiert.');
  } catch (error) {
    console.error(error);
  }
}

fetchProducts();
