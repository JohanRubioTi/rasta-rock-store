-- Drop existing tables if they exist
DROP TABLE IF EXISTS refunds CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS shipments CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS orders CASCADE;

-- Create the products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    name TEXT NOT NULL,
    description TEXT,
    price FLOAT NOT NULL CHECK (price > 0),
    image_urls TEXT[],
    category TEXT,
    has_size BOOLEAN,
    has_color BOOLEAN,
    sizes TEXT[],
    colors TEXT[],
    inventory INTEGER
);

-- Create the categories table
CREATE TABLE categories (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    name TEXT NOT NULL
);

-- Create the orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    items JSONB,
    buyer_name TEXT,
    buyer_address TEXT,
    payment_status TEXT,
    transaction_id TEXT,
    order_status TEXT,
    shipment_tracking_code TEXT,
    shipment_tracking_link TEXT,
    refundStatus TEXT
);

-- Create the shipments table
CREATE TABLE shipments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    order_id UUID REFERENCES orders(id),
    status TEXT,
    tracking_number TEXT,
    tracking_url TEXT,
    shipped_date TIMESTAMP WITH TIME ZONE
);

-- Create the inventory table
CREATE TABLE inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL,
    reorder_threshold INTEGER,
    last_updated TIMESTAMP WITH TIME ZONE
);

-- Create the refunds table
CREATE TABLE refunds (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    customer TEXT,
    amount FLOAT,
    status TEXT
);
