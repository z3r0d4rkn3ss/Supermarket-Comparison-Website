import requests
from bs4 import BeautifulSoup
from datetime import datetime
import json

def load_proxies_from_file(file_path):
    """Load proxies from a text file"""
    with open(file_path, 'r') as file:
        proxies = [line.strip() for line in file.readlines()]
    return proxies

PROXY_LIST = load_proxies_from_file('backend/scraper/proxies.txt')

# Scraper for ASDA
def scrape_asda():
    asda_url = "https://groceries.asda.com"
    response = requests.get(asda_url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # This is a simplified example; you need to inspect the website structure
    products = []
    for product in soup.find_all("div", class_="product"):
        product_name = product.find("span", class_="product-title").text.strip()
        price = product.find("span", class_="price").text.strip()
        
        # Formatting prices for uniformity
        price = float(price.replace("£", "").strip())
        
        products.append({
            "name": product_name,
            "price": price,
            "supermarket": "ASDA",
            "url": asda_url,
            "date_scraped": datetime.now().isoformat()
        })
    return products

# Scraper for Sainsbury's
def scrape_sainsburys():
    sainsburys_url = "https://www.sainsburys.co.uk/gol-ui/groceries"
    response = requests.get(sainsburys_url)
    soup = BeautifulSoup(response.text, 'html.parser')

    products = []
    for product in soup.find_all("li", class_="product"):
        product_name = product.find("div", class_="product-title").text.strip()
        price = product.find("span", class_="price").text.strip()

        price = float(price.replace("£", "").strip())

        products.append({
            "name": product_name,
            "price": price,
            "supermarket": "Sainsbury's",
            "url": sainsburys_url,
            "date_scraped": datetime.now().isoformat()
        })
    return products

# Scraper for Aldi
def scrape_aldi():
    aldi_url = "https://groceries.aldi.co.uk"
    response = requests.get(aldi_url)
    soup = BeautifulSoup(response.text, 'html.parser')

    products = []
    for product in soup.find_all("div", class_="product"):
        product_name = product.find("span", class_="product-title").text.strip()
        price = product.find("span", class_="price").text.strip()

        price = float(price.replace("£", "").strip())

        products.append({
            "name": product_name,
            "price": price,
            "supermarket": "Aldi",
            "url": aldi_url,
            "date_scraped": datetime.now().isoformat()
        })
    return products

# Scraper for Tesco
def scrape_tesco():
    tesco_url = "https://www.tesco.com/groceries"
    response = requests.get(tesco_url)
    soup = BeautifulSoup(response.text, 'html.parser')

    products = []
    for product in soup.find_all("div", class_="product"):
        product_name = product.find("span", class_="product-title").text.strip()
        price = product.find("span", class_="price").text.strip()

        price = float(price.replace("£", "").strip())

        products.append({
            "name": product_name,
            "price": price,
            "supermarket": "Tesco",
            "url": tesco_url,
            "date_scraped": datetime.now().isoformat()
        })
    return products

# Scraper for Iceland
def scrape_iceland():
    iceland_url = "https://www.iceland.co.uk"
    response = requests.get(iceland_url)
    soup = BeautifulSoup(response.text, 'html.parser')

    products = []
    for product in soup.find_all("div", class_="product"):
        product_name = product.find("span", class_="product-title").text.strip()
        price = product.find("span", class_="price").text.strip()

        price = float(price.replace("£", "").strip())

        products.append({
            "name": product_name,
            "price": price,
            "supermarket": "Iceland",
            "url": iceland_url,
            "date_scraped": datetime.now().isoformat()
        })
    return products

# Scraper for Morrisons
def scrape_morrisons():
    morrisons_url = "https://groceries.morrisons.com"
    response = requests.get(morrisons_url)
    soup = BeautifulSoup(response.text, 'html.parser')

    products = []
    for product in soup.find_all("div", class_="product"):
        product_name = product.find("span", class_="product-title").text.strip()
        price = product.find("span", class_="price").text.strip()

        price = float(price.replace("£", "").strip())

        products.append({
            "name": product_name,
            "price": price,
            "supermarket": "Morrisons",
            "url": morrisons_url,
            "date_scraped": datetime.now().isoformat()
        })
    return products

# Main scraper function to scrape all supermarkets
def scrape_all_supermarkets():
    all_products = []

    # Scrape each supermarket
    all_products += scrape_asda()
    all_products += scrape_sainsburys()
    all_products += scrape_aldi()
    all_products += scrape_tesco()
    all_products += scrape_iceland()
    all_products += scrape_morrisons()

    # Optionally save the products to a JSON file for later processing
    with open('scraped_data.json', 'w') as f:
        json.dump(all_products, f, indent=4)

    return all_products

if __name__ == '__main__':
    scraped_data = scrape_all_supermarkets()
    print(f"Scraped data from all supermarkets: {len(scraped_data)} products")
