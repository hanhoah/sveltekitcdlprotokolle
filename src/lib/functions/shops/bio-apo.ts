import * as cheerio from 'cheerio';
import axios from 'axios';
import iconv from 'iconv-lite';
// import fs from 'fs';

async function getHtmlFromUrl(url) {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const html = iconv.decode(response.data, 'utf-8');
        return html;
    } catch (error) {
        console.error('Fehler beim Abrufen der HTML-Seite:', error);
        return null;
    }
}

export async function getProductDataFromBioApo(url: string) {
    const html = await getHtmlFromUrl(url);
    const $ = cheerio.load(html, { decodeEntities: false }); // Option decodeEntities auf true setzen

    // titel holen
    let title = $('meta[property="og:title"]').attr('content')
    if(title?.length>0){
        title = title.replace(/&nbsp;/g, ' ');
    }else {
        console.log('kein Titel gefunden');
    }

    let price = 0;
    // preis holen
    const priceElement = $('div.text-xl.font-semibold.text-grey-darkest');
    if (priceElement.length > 0) {
        // Das Element existiert, daher können wir den Preis extrahieren
        const priceText = priceElement.text().trim();
        // Entferne &nbsp; und alle überflüssigen Leerzeichen
        const priceCleaned = priceText.replace(/&nbsp;/g, '').trim();
        // Entferne Euro-Symbol und Komma, konvertiere in Dezimalformat
        price = parseFloat(priceCleaned.replace(/[^\d.,]/g, '').replace(',', '.')).toFixed(2);
        // console.log('Preis aus dem Element:', price);
    } else {
        console.log('Das <div> Element mit der Klasse "text-xl font-semibold text-grey-darkest" wurde nicht gefunden.');
    }
    
    // bild link holen
    const imgElement = $('img.w-full.h-full.object-contain.swiper-lazy');
    let imageUrl = ""
    if (imgElement.length > 0) {
        // Das Element existiert, daher können wir die Bild-URL extrahieren
        imageUrl = 'https://www.bio-apo.de' + imgElement.attr('src');
        // console.log('Bild URL:', imageUrl);
    } else {
        console.log('Das <img> Element mit den angegebenen Klassen wurde nicht gefunden.');
    }

    // bild im Ordner speichern
    // Dateinamen aus der Bild-URL extrahieren
    const fileName = imageUrl.split('/').pop();
    
    // Pfad zur Zieldatei definieren
    const targetFilePath = `static/images/products/bio-apo/${fileName}`;
    
// Bild herunterladen und speichern
try {
    const response = await axios.get(imageUrl, { responseType: 'stream' });
    // const writer = fs.createWriteStream(targetFilePath);
    response.data.pipe(writer);
    // console.log('Bild wurde erfolgreich heruntergeladen und gespeichert:', targetFilePath);
} catch (error) {
    console.error('Fehler beim Herunterladen und Speichern des Bildes:', error);
}

    
    const image = `/bio-apo/${fileName}`;
    // console.log('image url ', image);
    
    // affiliate link generieren ?p=1458807  anhängen unnötig weil url bereits den code enthält
    // const afflink = `${encodeURIComponent(url)}`;
    // console.log("afflink ", url);

    // beschreibung holen
    const childElements = $('div.wysiwyg').children();

    let descHtml = '';
    childElements.each((index, element) => {
        // HTML-Inhalt jedes Kind-Elements extrahieren und an die Beschreibung anhängen
        descHtml += "<p>" + $(element).html()+"</p>";
    });
    
    console.log('Beschreibung HTML ohne das <div class="wysiwyg">-Element:', descHtml);
    

    return {
        id: title,
        name: title,
        price,
        img: image,
        link: url,
        description: descHtml
    };
}

