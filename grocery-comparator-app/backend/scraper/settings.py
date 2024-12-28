# Enable proxy middleware
DOWNLOADER_MIDDLEWARES = {
    'scrapy.downloadermiddlewares.httpproxy.HttpProxyMiddleware': 1,
    'scraper.middlewares.ProxyMiddleware': 100,  # Custom ProxyMiddleware
}

# List of proxies to rotate (can also be read from a file)
PROXY_LIST = [
    'http://your-proxy-server1.com:PORT',
    'http://your-proxy-server2.com:PORT',
    'http://your-proxy-server3.com:PORT',
    # Add more proxies if needed
]
