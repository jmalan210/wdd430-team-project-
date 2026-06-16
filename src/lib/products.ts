import { pool } from "./db";

const PRODUCT_BASE_QUERY = `
SELECT
        p.id,
        p.name,
        p.price,
        p.artist_id,
        p.description,
        a.business_name,
        a.medium,

        COALESCE(img.images, ARRAY[]::text[]) AS images,
        COALESCE(rev.average_rating, 0) AS average_rating,
        COALESCE(rev.review_count, 0) AS review_count

         FROM products p
         JOIN artists a
         on p.artist_id = a.id

         LEFT JOIN (
         SELECT product_id,
         ARRAY_AGG(image_url) AS images
         FROM product_images
         GROUP BY product_id) img
        ON img.product_id = p.id

         LEFT JOIN (
         SELECT
            product_id,
            ROUND(AVG(rating)::numeric, 1) AS average_rating,
            COUNT(*)::int AS review_count
            FROM reviews
            GROUP BY product_id) rev
            ON rev.product_id=p.id
        `



export async function getArtistProducts(artistId: number) {
    const result = 
        await pool.query(  `
        ${PRODUCT_BASE_QUERY}
        WHERE p.artist_id = $1
        ORDER BY p.created_at Desc`, [artistId]
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

export async function getAllProducts(sort: string = "id", mediums: string[] = []) {
    
    const orderBy = getOrderBy(sort);
        
    let query = PRODUCT_BASE_QUERY;
    const values: any[] = []

    if (mediums.length > 0) {
        query += `where a.medium = ANY($1)`;
        values.push(mediums)

        }
    
    query += `
            ORDER BY ${orderBy}
        `;
            
    const result = await pool.query(query, values);
    console.log("mediums received:", mediums);
    console.log("query:", query);
    console.log("values:", values);

        return result.rows;
    }
    
export async function getProductsByIds(productIds: number[]) {
    if (!productIds.length) return [];

    const result = await pool.query(
        `${PRODUCT_BASE_QUERY}
         
        WHERE p.id = ANY($1)`,
        [productIds]

    );
    
    return result.rows;
}

export async function getProductsById(productId: number) {
    
    const result = await pool.query(
    `
    SELECT p.*,
    a.first_name,
    a.last_name,
    a.business_name,
    pi.image_url,
    pi.alt_text,
    COALESCE(AVG(r.rating), 0):: float as average_rating,
    COUNT(r.id)::integer as review_count
    FROM products p
    LEFT JOIN product_images pi
    on p.id = pi.product_id
    JOIN artists a
    ON p.artist_id = a.id
    LEFT JOIN reviews r
    on p.id = r.product_id
    WHERE p.id = $1
    GROUP BY
        p.id,
        a.first_name,
        a.last_name,
        a.business_name,
        pi.image_url,
        pi.alt_text

   
    `, [productId]
    );
    return result.rows[0] ?? null;
}

export async function createProduct({ artistId, name, description, price, imageUrl
}: {
        artistId: number; name: string; description: string; price: number; imageUrl: string
    }) {
    
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        if (!imageUrl) {
            imageUrl = "/images/placeholder.svg";
        }
        const productResult = await client.query(
            `
            INSERT INTO products(
            artist_id, name, description, price)
            VALUES ($1, $2, $3, $4)
            RETURNING *            `,
            [artistId, name, description, price]
        );

        const product = productResult.rows[0];

        await client.query(
            `INSERT INTO product_images (
            product_id, image_url, alt_text)
            VALUES ($1, $2, $3)`, [product.id, imageUrl, name,]
        );

        await client.query("COMMIT");

        return product;
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
    
}

   
