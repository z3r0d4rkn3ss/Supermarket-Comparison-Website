from flask import Blueprint, jsonify, request
from models import db, Supermarket, Price, Product
from datetime import datetime

api_routes = Blueprint('api', __name__)

# Route to fetch all supermarkets
@api_routes.route('/supermarkets', methods=['GET'])
def get_supermarkets():
    supermarkets = Supermarket.query.all()
    return jsonify([{
        'supermarket_id': supermarket.supermarket_id,
        'name': supermarket.name,
        'url': supermarket.url,
        'affiliate_id': supermarket.affiliate_id
    } for supermarket in supermarkets])

# Route to fetch product prices for a specific product ID
@api_routes.route('/product_prices/<int:product_id>', methods=['GET'])
def get_product_prices(product_id):
    prices = Price.query.filter_by(product_id=product_id).all()
    product_prices = []
    for price in prices:
        supermarket = Supermarket.query.get(price.supermarket_id)
        product_prices.append({
            'supermarket': supermarket.name,
            'price': str(price.price),
            'date_scraped': price.date_scraped
        })
    return jsonify(product_prices)

# Route to compare prices for multiple products
@api_routes.route('/compare_prices', methods=['POST'])
def compare_prices():
    product_ids = request.json.get('product_ids', [])
    product_prices = []
    
    for product_id in product_ids:
        prices = Price.query.filter_by(product_id=product_id).all()
        for price in prices:
            supermarket = Supermarket.query.get(price.supermarket_id)
            product_prices.append({
                'product_id': product_id,
                'supermarket': supermarket.name,
                'price': str(price.price),
                'date_scraped': price.date_scraped
            })
    
    # Sort by price to show the cheapest first
    product_prices.sort(key=lambda x: float(x['price']))
    return jsonify(product_prices)
