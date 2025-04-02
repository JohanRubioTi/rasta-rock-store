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

CREATE OR REPLACE FUNCTION array_append_unique(arr anyarray, element anyelement)
RETURNS anyarray AS $$
BEGIN
    IF arr IS NULL THEN
        RETURN ARRAY[element];
    ELSIF NOT arr @> ARRAY[element] THEN
        RETURN arr || element;
    END IF;
    RETURN arr;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

CREATE OR REPLACE FUNCTION append_image_to_product(product_id uuid, new_image_url text)
RETURNS void AS $$
BEGIN
    UPDATE products 
    SET image_urls = array_append_unique(image_urls, new_image_url)
    WHERE id = product_id;
END;
$$ LANGUAGE plpgsql;
