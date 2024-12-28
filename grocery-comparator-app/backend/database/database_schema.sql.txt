-- Create Supermarkets Table
CREATE TABLE IF NOT EXISTS supermarkets (
    supermarket_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    url VARCHAR(255) NOT NULL,
    affiliate_id VARCHAR(100)
);

-- Create Products Table
CREATE TABLE IF NOT EXISTS products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100)
);

-- Create Prices Table
CREATE TABLE IF NOT EXISTS prices (
    price_id SERIAL PRIMARY KEY,
    supermarket_id INT REFERENCES supermarkets(supermarket_id),
    product_id INT REFERENCES products(product_id),
    price DECIMAL(10, 2) NOT NULL,
    date_scraped TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for fast querying of prices by supermarket and product
CREATE INDEX idx_prices_supermarket_product ON prices(supermarket_id, product_id);

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
