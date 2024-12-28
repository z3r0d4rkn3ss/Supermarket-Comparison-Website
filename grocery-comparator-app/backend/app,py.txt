from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Configure the database (PostgreSQL in this case)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/grocery_comparator'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Supermarket model
class Supermarket(db.Model):
    __tablename__ = 'supermarkets'
    supermarket_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    affiliate_id = db.Column(db.String(100))

# Product model
class Product(db.Model):
    __tablename__ = 'products'
    product_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(100))

# Price model
class Price(db.Model):
    __tablename__ = 'prices'
    price_id = db.Column(db.Integer, primary_key=True)
    supermarket_id = db.Column(db.Integer, db.ForeignKey('supermarkets.supermarket_id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.product_id'), nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    date_scraped = db.Column(db.DateTime, default=db.func.current_timestamp())

if __name__ == '__main__':
    db.create_all()  # Creates the database tables
    app.run(debug=True)
