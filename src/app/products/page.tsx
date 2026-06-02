import ProductCard from "@/components/ProductCard";
import { getAllProductsWithImages } from "@/lib/products";


export default async function ProductsPage({ searchParams, }: {
    searchParams: Promise<{ sort?: string }>;
}) {
    
    const { sort } = await searchParams;
    const finalSort = sort || "id";
    const products = await getAllProductsWithImages(finalSort);

    return (
        <main className="p-8">
        
            <h1 className="text-4xl font-bold mb-6" >Products</h1>
            <div className="flex gap-4 mb-4">
                <a href="/products?sort=name">Name</a>
                <a href="/products?sort=price_asc">Price ↑</a>
                <a href="/products?sort=price_desc">Price ↓</a>
                <a href="/products?sort=medium">Medium</a>
                <a href="/products">Reset</a>
            </div>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                        {products.map((product: any)=> (
                        <ProductCard key={product.id} product={product} />
                         ))}
                    </div>
                    
                </main>
    )
    
}