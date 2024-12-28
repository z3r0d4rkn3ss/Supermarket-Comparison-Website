import requests
from bs4 import BeautifulSoup
from datetime import datetime
import json
import random

def load_proxies_from_file(file_path):
    """Load proxies from a text file"""
    with open(file_path, 'r') as file:
        proxies = [line.strip() for line in file.readlines()]
    return proxies

# Load proxies from a file
PROXY_LIST = load_proxies_from_file('backend/scraper/proxies.txt')

def get_proxy():
    """Return a random proxy from the list"""
    return random.choice(PROXY_LIST) if PROXY_LIST else None

def fetch_page(url):
    """Fetch a page with optional proxy support"""
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    }

    proxy = get_proxy()
    proxies = {'http': proxy, 'https': proxy} if proxy else None

    try:
        response = requests.get(url, headers=headers, proxies=proxies, timeout=10)
        response.raise_for_status()  # Raises an HTTPError if the response code was 4xx/5xx
        return response.text
    except requests.RequestException as e:
        print(f"Error fetching {url}: {e}")
        return None

def scrape_supermarket(url, supermarket_name):
    """Generic scraper for each supermarket"""
    print(f"Scraping {supermarket_name}...")

    page_content = fetch_page(url)
    if not page_content:
        return []

    soup = BeautifulSoup(page_content, 'html.parser')
    products = []

    # Customize the scraping logic based on the supermarket's HTML structure
    for product in soup.find_all("div", class_="product"):
        product_name = product.find("span", class_="product-title").text.strip()
        price = product.find("span", class_="price").text.strip()

        price = float(price.replace("£", "").strip())

        products.append({
            "name": product_name,
            "price": price,
            "supermarket": supermarket_name,
            "url": url,
            "date_scraped": datetime.now().isoformat()
        })

    return products

def scrape_all_supermarkets():
    """Scrape all supermarkets and return the combined results"""
    all_products = []

    # List of supermarkets and their URLs
    supermarkets = [
        {"url": "https://groceries.asda.com", "name": "ASDA"},
        {"url": "https://www.sainsburys.co.uk/gol-ui/groceries", "name": "Sainsbury's"},
        {"url": "https://groceries.aldi.co.uk", "name": "Aldi"},
        {"url": "https://www.tesco.com/groceries", "name": "Tesco"},
        {"url": "https://www.iceland.co.uk", "name": "Iceland"},
        {"url": "https://groceries.morrisons.com", "name": "Morrisons"}
    ]

    # Scrape each supermarket
    for supermarket in supermarkets:
        products = scrape_supermarket(supermarket['url'], supermarket['name'])
        all_products.extend(products)

    # Optionally save the products to a JSON file for later processing
    with open('scraped_data.json', 'w') as f:
        json.dump(all_products, f, indent=4)

    return all_products

if __name__ == '__main__':
    scraped_data = scrape_all_supermarkets()
    print(f"Scraped data from all supermarkets: {len(scraped_data)} products")
