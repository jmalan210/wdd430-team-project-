import ProductCard from "@/components/ProductCard";
import QueryDropDown from "@/components/QueryDropdown";
import { getAllProducts } from "@/lib/products";


export default async function ProductsPage({ searchParams, }: {
    searchParams: Promise<{ sort?: string }>;
}) {
    
    const { sort } = await searchParams;
    const finalSort = sort || "id";
    const products = await getAllProducts(finalSort);

    return (
        <main className="p-8">
        
            <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-l from-navy via-sage to-terracotta text-ivory py-2" >Products</h1>
            <p>Sort by</p>
            <QueryDropDown
                options={[
                    { label: "Name", value: "name" },
                    { label: "Price ↑", value: "price_asc" },
                    { label: "Price ↓", value: "price_desc" },
                    { label: "Medium", value: "medium" },
                    { label: "Business Name", value: "business_name"},
                       
                    
                ]}/>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                        {products.map((product: any)=> (
                        <ProductCard key={product.id} product={product} />
                         ))}
                    </div>
                    
                </main>
    )
    
}