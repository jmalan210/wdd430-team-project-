import ProductCard from "@/components/ProductCard";
import QueryDropDown from "@/components/QueryDropdown";
import SideBar from "@/components/Sidebar";
import CheckboxFilter from "@/components/CheckboxFilter";
import { getArtistMediums } from "@/lib/artists";
import { getAllProducts } from "@/lib/products";


export default async function ProductsPage({
    searchParams,

}: { searchParams: Promise<{
        sort?: string;
        medium?: string | string[]
    }>;
})
    {
    const params = await searchParams;   
    const sort = params?.sort || "id";
    
    const mediums =
        typeof params?.medium === "string"
        ? [params.medium]
        : params?.medium ?? [];
                
    const products = await getAllProducts(sort, mediums);
    const allMediums = await getArtistMediums();

    return (
        <main className="p-8">
        
            <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-l from-navy via-sage to-terracotta text-ivory py-2 rounded-lg" >Products</h1>
             <div className="flex flex-col md:flex-row gap-6">
            <SideBar>
                    <h2>Sort</h2>
                    
            <QueryDropDown
                options={[
                    { label: "Name", value: "name" },
                    { label: "Price ↑", value: "price_asc" },
                    { label: "Price ↓", value: "price_desc" },
                    {label: "Highest Rated", value: "rating_desc"},
                    { label: "Business Name", value: "business_name"},
                       
                    
                ]} />
            <CheckboxFilter
                            title="Mediums"
                            paramName="medium"
                            options={allMediums.map((medium) => ({
                                label: medium,
                                value: medium
                        }))}
                    />
                    </SideBar>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 flex-1">
                        {products.map((product: any)=> (
                        <ProductCard key={product.id} product={product} />
                         ))}
                    </div>
                    </div>
                </main>
    )
    
}