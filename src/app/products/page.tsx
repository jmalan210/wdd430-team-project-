import ProductCard from "@/components/ProductCard";
import { getAllProductsWithImage } from "@/lib/products";


export default async function ProductsPage({ searchParams, }: {
    searchParams: { sort?: string };
}) {
    const products = await getAllProductsWithImage();

    return (
        <main className="p-8">
        
                    <h1 className="text-4xl font-bold mb-6" >Artists</h1>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                        {products.map((product: any)=> (
                        <ProductCard key={product.id} product={product} />
                         ))}
                    </div>
                    
                </main>
    )
    
}