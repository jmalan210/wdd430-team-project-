import { pool } from "./db";



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

export async function getAllProducts(sort: string = "id") {
    
    const orderBy = getOrderBy(sort);
        
        const result = await pool.query(
            `SELECT
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
        
         ORDER BY ${orderBy}
        `,
            
        );

        return result.rows;
    }
    
export async function getProductsByIds(productIds: number[]) {
    if (!productIds.length) return [];

    const result = await pool.query(
        `SELECT
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
         
        WHERE p.id = ANY($1)`,
        [productIds]

    );
    return result.rows;
}

