const axios = require('axios');
const cheerio = require('cheerio');

// Scrape ASDA prices (example)
async function scrapeAsdaPrices() {
  const response = await axios.get('https://groceries.asda.com');
  const $ = cheerio.load(response.data);
  const products = [];

  $('some-product-selector').each((i, element) => {
    const product = $(element).text();
    const price = $(element).find('.price').text();
    products.push({ product, price });
  });

  return products;
}

module.exports = { scrapeAsdaPrices };
