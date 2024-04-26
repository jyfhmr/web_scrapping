//   divs De cada item:  clase: Z8fK3b

//   TITULOS DE LAS AGENCIAS: NrDZNb

//   numero: usdlKText

//  sitio donde aparece como llegar y si tiene siito web .Rwjeuc

let ciudad = "Ciudad de España"
let pais = "España"

const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const ExcelJS = require('exceljs');

async function scrapeGoogleMaps() {
    const browser = await puppeteer.launch({
        headless: false // Puedes cambiar esto a "true" si no deseas que se abra el navegador de forma visible
    });
    const page = await browser.newPage();

    try {
        const url = `https://www.google.com/maps/search/agencias+de+marketing+en+${ciudad}+${pais}`;
        await page.goto(url, { waitUntil: 'load' }); // Espera hasta que la página esté completamente cargada

        // Espera a que hagas el scroll manualmente y aparezca el elemento .PbZDve
        await page.waitForSelector('.PbZDve', { timeout: 300000 });

        const content = await page.content();
        const $ = cheerio.load(content);

        const combinedArray = [];



        $('.Z8fK3b').each((index, parentElement) => {
            const textObject = {};

            // Busca el texto del elemento .NrDZNb dentro del elemento padre .Z8fK3b
            const nrDZNbText = $(parentElement).find('.NrDZNb').text().trim();
            textObject.Nombre = nrDZNbText || 'NOCONOCIDO';

            // Busca el texto del elemento .UsdlK dentro del elemento padre .Z8fK3b
<<<<<<< HEAD
            const usdlKText = $(parentElement).find('.UsdlK').text().trim();
            var cleanedText = (usdlKText.replace(/\s+/g, '').replace(/\+/g, '')) + ",";
            if (cleanedText == ",") { cleanedText = "584123091835," }
            textObject.Tlf = cleanedText;

=======
           const usdlKText = $(parentElement).find('.UsdlK').text().trim();
var cleanedText = usdlKText.replace(/[+\s-]/g, '') + ",";
if (cleanedText === ",") {
  cleanedText = "584123091835,";
}
textObject.Tlf = cleanedText;

        
>>>>>>> a205520a305fc45bd334056c46bbf75c37035697
            // Busca el primer elemento de la clase .Rwjeuc
            const rwjeucElement = $(".Rwjeuc").eq(index);

            // Busca el elemento 'a' dentro de rwjeucElement
            const urlSitioElement = rwjeucElement.find('a');

            // Obtiene el atributo 'href' del elemento 'a'
            const urlSitio = urlSitioElement.length ? urlSitioElement.attr('href') : 'NOCONOCIDO';

            textObject.urlSitio = urlSitio;

            combinedArray.push(textObject);
        });



        console.log(combinedArray);
        console.log(combinedArray.length)

        // Genera un archivo Excel
        await generateExcel(combinedArray);


    } catch (error) {
        console.error('Error occurred:', error);
    } finally {
        await browser.close();
    }
}

async function generateExcel(data) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Agencias de Marketing');

    // Agregar encabezados de columna
    sheet.addRow(['Nombre', 'Teléfono', 'URL Sitio']);

    // Agregar datos a las filas
    data.forEach(item => {
        sheet.addRow([item.Nombre, item.Tlf, item.urlSitio]);
    });

    // Guardar el archivo Excel
    await workbook.xlsx.writeFile(`agencias_de_marketing_${pais}_${ciudad}.xlsx`);
    console.log('Archivo Excel generado correctamente.');
}

scrapeGoogleMaps();


