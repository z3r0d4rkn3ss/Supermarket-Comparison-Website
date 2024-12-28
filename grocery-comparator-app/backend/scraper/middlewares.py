import random

class ProxyMiddleware:
    def process_request(self, request, spider):
        """Rotate proxies for each request"""
        proxy = random.choice(spider.settings.get('PROXY_LIST'))
        request.meta['proxy'] = proxy
        spider.logger.info(f"Using proxy: {proxy}")
