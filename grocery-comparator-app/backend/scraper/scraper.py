import random
import requests
from bs4 import BeautifulSoup

# List of proxies (you can also store this in proxies.txt)
PROXY_LIST = [
    'http://your-proxy-server1.com:PORT',
    'http://your-proxy-server2.com:PORT',
    'http://your-proxy-server3.com:PORT',
    # Add more proxies if needed
]

def get_proxy():
    """Randomly select a proxy from the list"""
    return random.choice(PROXY_LIST)

def scrape_supermarket(url):
    """Scrape a supermarket's website with a proxy"""
    proxy = get_proxy()  # Get a random proxy from the list
    proxies = {
        'http': proxy,
        'https': proxy,
    }

    # Request the page using the proxy
    response = requests.get(url, proxies=proxies)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        return soup
    else:
        print(f"Failed to retrieve {url}. Status code: {response.status_code}")
        return None

if __name__ == "__main__":
    # Example: Scraping ASDA's website
    url = 'https://groceries.asda.com'
    soup = scrape_supermarket(url)
    if soup:
        # Process the scraped data
        print(soup.prettify())  # Print the page content for now
