import Image from "next/image"
import Link from "next/link"

type Product = {
    id: string;
    name: string;
    price: number;
    description: string;
    images?: string[];
    artist_id: number;
    business_name: string
};

type Props = {
    product: Product;
    
}

export default function ProductCard({ product }: Props) {
    return (
        <Link 
            href={`/products/${product.id}`}
        className="block h-full"
        >

        <div className="flex flex-col shadow-xl rounded-lg p-4 bg-ivory">
       
            <div >
            <h3 className="text-2xl bold">{product.name}</h3>
            <p className="text-terracotta pb-2">by {product.business_name}</p>
            <p className="italic pb-2">${product.price}</p>
            </div>
            
            <div className="relative h-72 w-full">
                 {product.images?.map((url: string, index: number) => (
                    <Image
                        key={index}
                        src={`/${url}`}
                        alt={product.name}
                        fill
                        className="object-cover rounded-lg"
                    />
                ))}
            </div>
            
            <div className="flex gap-2 overflow-x-auto align-middle justify-center">
                <p className="justify-center align-middle line-clamp-3">{product.description}</p>
               
            </div>
        </div>
        </Link>
    );
}