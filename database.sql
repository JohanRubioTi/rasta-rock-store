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
