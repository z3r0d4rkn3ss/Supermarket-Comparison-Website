import random
import logging
from scrapy.exceptions import NotConfigured

class ProxyMiddleware:
    def __init__(self, proxy_list=None):
        """Initialize with optional proxy list."""
        if proxy_list is None:
            raise NotConfigured("Proxy list is not configured.")
        self.proxy_list = proxy_list

    def process_request(self, request, spider):
        """Rotate proxies for each request."""
        if not self.proxy_list:
            spider.logger.error("Proxy list is empty. No proxy can be used.")
            return
        
        # Randomly choose a proxy from the list
        proxy = random.choice(self.proxy_list)
        request.meta['proxy'] = proxy
        
        # Log the selected proxy for debugging
        spider.logger.info(f"Using proxy: {proxy}")

        # Optionally, you can add a test to ensure the proxy is working
        # For example, check connectivity by making a quick request
        # Here, we can assume that failing to connect would raise an exception
        
        try:
            # This is a placeholder; you can implement actual connectivity checks here
            self.test_proxy(proxy)  # Assuming this method checks proxy validity
        except Exception as e:
            spider.logger.error(f"Failed to connect using proxy {proxy}: {e}")
            # You could consider removing the proxy from the list or retrying with a different one

    def test_proxy(self, proxy):
        """Test if a proxy is functional."""
        # Placeholder method for proxy testing (e.g., check if proxy can connect)
        # You can implement logic like sending a small request to a known URL (e.g., Google)
        # and checking if it succeeds.
        pass

    @classmethod
    def from_crawler(cls, crawler, *args, **kwargs):
        """Initialize the middleware with proxy list from crawler settings."""
        proxy_list = crawler.settings.get('PROXY_LIST', [])
        return cls(proxy_list)
