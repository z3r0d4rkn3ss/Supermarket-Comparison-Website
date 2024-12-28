from flask import Blueprint, jsonify, request
from models import db, Supermarket, Price, Product
from datetime import datetime

api_routes = Blueprint('api', __name__)

# Route to fetch all supermarkets
@api_routes.route('/supermarkets', methods=['GET'])
def get_supermarkets():
    try:
        supermarkets = Supermarket.query.all()
        if not supermarkets:
            return jsonify({'message': 'No supermarkets found'}), 404
        return jsonify([{
            'supermarket_id': supermarket.supermarket_id,
            'name': supermarket.name,
            'url': supermarket.url,
            'affiliate_id': supermarket.affiliate_id
        } for supermarket in supermarkets]), 200
    except Exception as e:
        return jsonify({'message': f'Error fetching supermarkets: {str(e)}'}), 500

# Route to fetch product prices for a specific product ID
@api_routes.route('/product_prices/<int:product_id>', methods=['GET'])
def get_product_prices(product_id):
    try:
        prices = Price.query.filter_by(product_id=product_id).all()
        if not prices:
            return jsonify({'message': f'No prices found for product ID {product_id}'}), 404

        product_prices = []
        for price in prices:
            supermarket = Supermarket.query.get(price.supermarket_id)
            if supermarket:
                product_prices.append({
                    'supermarket': supermarket.name,
                    'price': str(price.price),
                    'date_scraped': price.date_scraped.isoformat()  # Format date in ISO 8601
                })

        return jsonify(product_prices), 200
    except Exception as e:
        return jsonify({'message': f'Error fetching product prices: {str(e)}'}), 500

# Route to compare prices for multiple products
@api_routes.route('/compare_prices', methods=['POST'])
def compare_prices():
    try:
        # Input validation for product_ids
        product_ids = request.json.get('product_ids', [])
        if not product_ids or not all(isinstance(pid, int) for pid in product_ids):
            return jsonify({'message': 'Invalid product_ids. Please provide a list of integers.'}), 400

        product_prices = []

        for product_id in product_ids:
            prices = Price.query.filter_by(product_id=product_id).all()
            if not prices:
                product_prices.append({
                    'product_id': product_id,
                    'message': f'No prices found for product ID {product_id}'
                })
                continue

            for price in prices:
                supermarket = Supermarket.query.get(price.supermarket_id)
                if supermarket:
                    product_prices.append({
                        'product_id': product_id,
                        'supermarket': supermarket.name,
                        'price': str(price.price),
                        'date_scraped': price.date_scraped.isoformat()  # Format date in ISO 8601
                    })

        # Sort by price to show the cheapest first
        product_prices.sort(key=lambda x: float(x['price']) if 'price' in x else float('inf'))

        return jsonify(product_prices), 200

    except Exception as e:
        return jsonify({'message': f'Error comparing prices: {str(e)}'}), 500
