from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# Initialize Flask and the SQLAlchemy object
app = Flask(__name__)

# Configure the database URI, it is better to use environment variables for sensitive information
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/grocery_comparator'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy with the Flask app
db = SQLAlchemy(app)

# Supermarket model
class Supermarket(db.Model):
    __tablename__ = 'supermarkets'
    supermarket_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    affiliate_id = db.Column(db.String(100), nullable=True)

    # Relationships
    products = db.relationship('Product', backref='supermarket', lazy=True)

# Product model
class Product(db.Model):
    __tablename__ = 'products'
    product_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(100))
    price_history = db.relationship('Price', backref='product', lazy=True)

    # Foreign key reference to the Supermarket table
    supermarket_id = db.Column(db.Integer, db.ForeignKey('supermarkets.supermarket_id'), nullable=False)
    link = db.Column(db.String(255), nullable=True)

# Price model (to store historical price data)
class Price(db.Model):
    __tablename__ = 'prices'
    price_id = db.Column(db.Integer, primary_key=True)
    supermarket_id = db.Column(db.Integer, db.ForeignKey('supermarkets.supermarket_id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.product_id'), nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    date_scraped = db.Column(db.DateTime, default=db.func.current_timestamp())

    # Relationships
    supermarket = db.relationship('Supermarket', backref='prices', lazy=True)
    product = db.relationship('Product', backref='prices', lazy=True)

# Function to create the database tables (if they don't exist)
def create_db():
    db.create_all()

if __name__ == '__main__':
    create_db()  # This will create the tables when you run the app
    app.run(debug=True)
