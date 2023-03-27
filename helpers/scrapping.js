const puppeteer = require("puppeteer");

async function searchGoogle() {
  // Se abre el chromium.

  const browser = await puppeteer.launch({
    headless: false,
  });

  // Abre una nueva página/pestaña en el navegador.
  const page = await browser.newPage();

  // Para ir a una página en concreto.
  await page.goto("https://www.sensacine.com");

  // Para hacer click al mensaje de cookies.
  await page.click("#didomi-notice-agree-button");

  //Acceder al buscador de amazon por su selector. ('Selector','Búsqueda').

  await page.click("#didomi-notice-agree-button");


  await page.type("#header-search-input", "batman y robin");

  //Click del botón de la búsqueda.
  await page.click("a[title=Buscar]");

  //Esperamos que se cargue la página, ya que sino no encuentra nada.
  await page.waitForNavigation();

  //Click en la foto 
  await page.click(".thumbnail-img b-loaded");

  //Click en critica de usuarios
  await page.click("a[title=Críticas de usuarios]");

  //Recogemos en un array de las imágenes de los libros.
  // const urlImg = await page.$$eval("img.s-image", (urlImg) =>
  //   urlImg.map((img) => img.src)
  // );

  //Recogemos en un array los títulos.
  const review = await page.$$eval(".content-txt review-card-content", (review) =>
  review.map((review) => review.innerHTML)
  );

  //Recogemos en un array el precio.
  // const precios = await page.$$eval(".a-price-whole", (precios) =>
  //   precios.map((precio) => precio.innerHTML)
  // );

  const arrayOpiniones = [];

  for (let i = 0; i < review.length; i++) {
    const opniones = {
      review: review[i],
      
    };
    arrayOpiniones.push(opniones);
  }
  console.log(arrayOpiniones);

  //Se cierra el navegador.
  //await browser.close();
}
searchGoogle();