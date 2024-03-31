import cheerio from 'cheerio';
import fs from 'fs'
import path from 'path'
import axios from 'axios';
import iconv from 'iconv-lite'

async function getHtmlFromUrl(url) {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const html = iconv.decode(response.data, 'iso-8859-1');
        return html;
    } catch (error) {
        console.error('Fehler beim Abrufen der HTML-Seite:', error);
        return null;
    }
}


export async function getProductDataFromShop(url: string){
    const html = await getHtmlFromUrl(url);
    const $ = cheerio.load(html, { decodeEntities: false, xmlMode: true });

    // titel holen
    const title  = $('h1').text();
    console.log('titel ist ', title);

    // preis holen
    const priceElement = $('p.pr--price');
    const price = priceElement.attr('content'); // Den Wert des "content"-Attributs extrahieren

    // bild link holen
    const imgElement = $('div.productbox--image--zoom img')
    const imageUrl = 'https://www.kopp-verlag.de/' + imgElement.attr('data-src')

    // bild im Ordner speichern
    // Dateinamen aus der Bild-URL extrahieren
    const fileName = path.basename(imageUrl);

    // Pfad zum Zielordner definieren
    const rootfolder = "/home/han/projects/sveltekit/cdlprotokolle"
    const targetFolder = path.join(rootfolder, 'static', 'images', 'products', 'kopp');

    // Pfad zur Zieldatei definieren
    const targetFilePath = path.join(targetFolder, fileName);

    // Überprüfen, ob der Zielordner existiert. Wenn nicht, erstellen Sie ihn.
    if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder, { recursive: true });
    }

    // Bild herunterladen und speichern
    axios({
        method: 'get',
        url: imageUrl,
        responseType: 'stream' // Stellen Sie sicher, dass die Antwort als Stream behandelt wird, um große Dateien zu handhaben
    })
    .then(response => {
        response.data.pipe(fs.createWriteStream(targetFilePath)); // Bild in die Zieldatei schreiben
    })
    .catch(error => {
        console.error('Fehler beim Herunterladen und Speichern des Bildes:', error);
    });

    const image = `/kopp/${fileName}`
    console.log('image url ', image);

    // affiliate link generieren
    const afflink = 'https://c.kopp-verlag.de/kopp,verlag_4.html?1=546&3=0&4=&5=&d=' + url
    console.log("afflink ", afflink );

    // beschreibung holen
    const descElement = $('div#collapse-descr div.card-body ').html();
    console.log('desc Element ', descElement);


    return {
        id: title, 
        name: title, 
        price, 
        image, 
        link: afflink, 
        description: descElement
    }

}