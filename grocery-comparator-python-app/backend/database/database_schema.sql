-- Create Supermarkets Table
CREATE TABLE IF NOT EXISTS supermarkets (
    supermarket_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    url VARCHAR(255) NOT NULL,
    affiliate_id VARCHAR(100) NULL,  -- affiliate_id is optional
    CONSTRAINT unique_name_url UNIQUE (name, url)  -- Ensures no duplicates for name and url combination
);

COMMENT ON TABLE supermarkets IS 'Table storing information about supermarkets';
COMMENT ON COLUMN supermarkets.supermarket_id IS 'Primary key for the supermarket';
COMMENT ON COLUMN supermarkets.name IS 'Name of the supermarket';
COMMENT ON COLUMN supermarkets.url IS 'URL of the supermarket website';
COMMENT ON COLUMN supermarkets.affiliate_id IS 'Affiliate ID for the supermarket, if available';

-- Create Products Table
CREATE TABLE IF NOT EXISTS products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    CONSTRAINT unique_name_category UNIQUE (name, category)  -- Ensures no duplicates for the same product in the same category
);

COMMENT ON TABLE products IS 'Table storing information about products';
COMMENT ON COLUMN products.product_id IS 'Primary key for the product';
COMMENT ON COLUMN products.name IS 'Name of the product';
COMMENT ON COLUMN products.category IS 'Category of the product, e.g., Dairy, Bakery';

-- Create Prices Table
CREATE TABLE IF NOT EXISTS prices (
    price_id SERIAL PRIMARY KEY,
    supermarket_id INT REFERENCES supermarkets(supermarket_id) ON DELETE CASCADE ON UPDATE CASCADE,
    product_id INT REFERENCES products(product_id) ON DELETE CASCADE ON UPDATE CASCADE,
    price DECIMAL(10, 2) NOT NULL,
    date_scraped TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE prices IS 'Table storing price information for products from supermarkets';
COMMENT ON COLUMN prices.price_id IS 'Primary key for the price entry';
COMMENT ON COLUMN prices.supermarket_id IS 'Foreign key to the supermarket';
COMMENT ON COLUMN prices.product_id IS 'Foreign key to the product';
COMMENT ON COLUMN prices.price IS 'Price of the product at the supermarket';
COMMENT ON COLUMN prices.date_scraped IS 'Timestamp of when the price was scraped';

-- Index for fast querying of prices by supermarket and product
CREATE INDEX IF NOT EXISTS idx_prices_supermarket_product ON prices(supermarket_id, product_id);

-- Sample Insert Data for Supermarkets
INSERT INTO supermarkets (name, url, affiliate_id)
VALUES
    ('ASDA', 'https://groceries.asda.com', 'ASDA_AFF_ID'),
    ('Sainsbury\'s', 'https://www.sainsburys.co.uk/gol-ui/groceries', 'SAINSBURYS_AFF_ID'),
    ('Aldi', 'https://groceries.aldi.co.uk', 'ALDI_AFF_ID'),
    ('Tesco', 'https://www.tesco.com/groceries', 'TESCO_AFF_ID'),
    ('Iceland', 'https://www.iceland.co.uk', 'ICELAND_AFF_ID'),
    ('Morrisons', 'https://groceries.morrisons.com', 'MORRISONS_AFF_ID');

-- Sample Insert Data for Products
INSERT INTO products (name, category)
VALUES
    ('Milk', 'Dairy'),
    ('Bread', 'Bakery'),
    ('Eggs', 'Dairy'),
    ('Chicken', 'Meat'),
    ('Rice', 'Grains');

-- Sample Insert Data for Prices
INSERT INTO prices (supermarket_id, product_id, price, date_scraped)
VALUES
    (1, 1, 1.25, NOW()),  -- ASDA, Milk, £1.25
    (2, 2, 1.10, NOW()),  -- Sainsbury's, Bread, £1.10
    (3, 3, 1.50, NOW()),  -- Aldi, Eggs, £1.50
    (4, 4, 5.00, NOW()),  -- Tesco, Chicken, £5.00
    (5, 5, 2.30, NOW());  -- Iceland, Rice, £2.30
