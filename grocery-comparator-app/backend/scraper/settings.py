# Enable proxy middleware
DOWNLOADER_MIDDLEWARES = {
    'scrapy.downloadermiddlewares.httpproxy.HttpProxyMiddleware': 1,
    'scraper.middlewares.ProxyMiddleware': 100,  # Custom ProxyMiddleware
}

# Load proxies dynamically from a file
def load_proxies_from_file(file_path):
    with open(file_path, 'r') as file:
        proxies = [line.strip() for line in file.readlines()]
    return proxies

# List of proxies to rotate (can also be read from a file)
PROXY_LIST = load_proxies_from_file('backend/scraper/proxies.txt')

# Optional: Retry settings (if proxies fail)
RETRY_ENABLED = True
RETRY_TIMES = 3  # Number of retries
RETRY_HTTP_CODES = [500, 502, 503, 504, 408]  # Retry on these HTTP codes

# Optional: Configure download delay to prevent being blocked
DOWNLOAD_DELAY = 2  # Delay between requests in seconds

# Optional: User-agent rotation to avoid detection
USER_AGENT_LIST = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Firefox/92.0',
    # Add more user agents here
]

# Optional: Middleware for rotating user-agent
DOWNLOADER_MIDDLEWARES.update({
    'scrapy.downloadermiddlewares.useragent.UserAgentMiddleware': None,  # Disable default UA middleware
    'scraper.middlewares.UserAgentMiddleware': 400  # Custom user-agent middleware
})

# Logging settings for debugging
LOG_LEVEL = 'INFO'  # Adjust log level as needed (e.g., 'DEBUG', 'INFO')
LOG_FILE = 'scraper_log.txt'  # Output log to a file
