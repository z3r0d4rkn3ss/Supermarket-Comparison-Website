import random
import requests
from bs4 import BeautifulSoup
import logging

# List of proxies (you can also store this in proxies.txt)
PROXY_LIST = [
    'http://your-proxy-server1.com:PORT',
    'http://your-proxy-server2.com:PORT',
    'http://your-proxy-server3.com:PORT',
    # Add more proxies if needed
]

# User-agent list to avoid detection
USER_AGENT_LIST = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Firefox/92.0',
    # Add more user agents if needed
]

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_proxy():
    """Randomly select a proxy from the list"""
    return random.choice(PROXY_LIST)

def get_user_agent():
    """Randomly select a user agent from the list"""
    return random.choice(USER_AGENT_LIST)

def scrape_supermarket(url):
    """Scrape a supermarket's website with a proxy and a random user-agent"""
    proxy = get_proxy()  # Get a random proxy from the list
    proxies = {
        'http': proxy,
        'https': proxy,
    }

    headers = {
        'User-Agent': get_user_agent(),
    }

    try:
        # Request the page using the proxy and random user-agent
        response = requests.get(url, proxies=proxies, headers=headers, timeout=10)
        
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            logger.info(f"Successfully scraped {url} using proxy: {proxy}")
            return soup
        else:
            logger.warning(f"Failed to retrieve {url}. Status code: {response.status_code}")
            return None
    except requests.exceptions.RequestException as e:
        # Catch any network-related errors such as connection errors or timeout
        logger.error(f"Error while scraping {url} with proxy {proxy}: {e}")
        return None

if __name__ == "__main__":
    # Example: Scraping ASDA's website
    url = 'https://groceries.asda.com'
    soup = scrape_supermarket(url)
    if soup:
        # Process the scraped data
        logger.info("Scraping successful. Here's the content:")
        print(soup.prettify())  # Print the page content for now
    else:
        logger.error("Scraping failed.")
