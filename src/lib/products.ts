import { pool } from "./db";

export async function getProducts() {
    const result = await pool.query(
        "SELECT * FROM products ORDER BY name DESC"
    )
    return result.rows;
}

export async function getProductsWithImages(productIds: number[], sort: string = "id") {
    if (!productIds.length) return [];
    const orderBy = getOrderBy(sort);
    const result = await pool.query( `
        SELECT
        p.id,
        p.name,
        p.price,
        p.artist_id,
        p.description,
        a.business_name,
        a.medium,
        COALESCE(
        ARRAY_AGG(pi.image_url) FILTER (WHERE pi.image_url IS NOT NULL),
        ARRAY[]::text[]
        ) AS images
         FROM products p
         JOIN artists a
         on p.artist_id = a.id
         LEFT JOIN product_images pi
         on p.id = pi.product_id
         WHERE p.id = ANY($1)
         GROUP BY p.id, p.name, p.price, p.artist_id, description, a.business_name, a.medium
         ORDER BY ${orderBy}
    `, [productIds]
    );
    return result.rows
}

export async function getArtistProducts(artistId: number) {
    const result = 
        await pool.query( `
        SELECT
        p.id,
        p.name,
        p.price,
        p.artist_id,
        p.description,
        a.business_name,
        COALESCE(img.images, ARRAY[]::text[]) AS images
         FROM products p
         JOIN artists a
         on p.artist_id = a.id
         LEFT JOIN (
         SELECT product_id,
         ARRAY_AGG(image_url) AS images FROM product_images
         GROUP BY product_id)
         img ON img.product_id = p.id
         WHERE p.artist_id =$1
         order by p.created_at desc;
    `, [artistId]
    );
    return result.rows;
}

function getOrderBy(sort?: string) {
    switch (sort) {
        case "price_asc":
            return "p.price ASC";
        case "price_desc":
            return "p.price DESC";
        case "name":
            return "p.name ASC";
        case "medium":
            return "a.medium ASC";
        case "business_name":
            return "a.business_name ASC"
        default:
            return "p.id ASC"
        
    }
}

export async function getAllProductsWithImage() {
    const result = await pool.query(
        `SELECT
        p.id,
        p.name,
        p.price,
        p.artist_id,
        p.description,
        a.business_name,
        a.medium,
        COALESCE(
        ARRAY_AGG(pi.image_url) FILTER (WHERE pi.image_url IS NOT NULL),
        ARRAY[]::text[]
        ) AS images
         FROM products p
         JOIN artists a
         on p.artist_id = a.id
         LEFT JOIN product_images pi
         on p.id = pi.product_id       
         GROUP BY p.id, p.name, p.price, p.artist_id, description, a.business_name, a.medium
         ORDER BY p.id ASC
        `
    );

    return result.rows;
}