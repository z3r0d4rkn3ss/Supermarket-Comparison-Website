# grocery-comparator-python-gui/api_service.py
import requests

BASE_URL = 'http://your-backend-api-url.com'  # Replace with your backend API URL

# Fetch products from the backend API
def get_products():
    response = requests.get(f'{BASE_URL}/api/products')
    return response.json() if response.status_code == 200 else []

# Get product details
def get_product_details(product_id):
    response = requests.get(f'{BASE_URL}/api/products/{product_id}')
    return response.json() if response.status_code == 200 else {}

# Fetch the current user's basket (if needed)
def get_basket():
    response = requests.get(f'{BASE_URL}/api/basket')
    return response.json() if response.status_code == 200 else []
