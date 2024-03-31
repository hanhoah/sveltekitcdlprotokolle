import cheerio from 'cheerio';
import axios from 'axios';
import iconv from 'iconv-lite';

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

export async function getProductDataFromShop(url: string) {
    const html = await getHtmlFromUrl(url);
    const $ = cheerio.load(html, { decodeEntities: false, xmlMode: true });

    // titel holen
    const title = $('h1').text();
    console.log('titel ist ', title);

    // preis holen
    const priceElement = $('p.pr--price');
    const price = priceElement.attr('content'); // Den Wert des "content"-Attributs extrahieren

    // bild link holen
    const imgElement = $('div.productbox--image--zoom img');
    const imageUrl = 'https://www.kopp-verlag.de/' + imgElement.attr('data-src');

    // bild im Ordner speichern
    // Dateinamen aus der Bild-URL extrahieren
    const fileName = imageUrl.split('/').pop();

    // Pfad zur Zieldatei definieren
    const targetFilePath = `static/images/products/kopp/${fileName}`;

    // Bild herunterladen und speichern
    try {
        const response = await axios.get(imageUrl, { responseType: 'stream' });
        response.data.pipe(writer);
    } catch (error) {
        console.error('Fehler beim Herunterladen und Speichern des Bildes:', error);
    }

    const image = `/kopp/${fileName}`;
    console.log('image url ', image);

    // affiliate link generieren
    const afflink = `https://c.kopp-verlag.de/kopp,verlag_4.html?1=546&3=0&4=&5=&d=${encodeURIComponent(url)}`;
    console.log("afflink ", afflink);

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
    };
}

