import Image from "next/image"
import Link from "next/link"

type Product = {
    id: string;
    name: string;
    price: number;
    description: string;
    images?: string[];
};

type Props = {
    product: Product;
    
}

export default function ProductCard({ product }: Props) {
    return (
        <div className="flex flex-col shadow-xl rounded-lg bg-ivory p-4">
            <h3 className="text-2xl bold pb-2">{product.name}</h3>
            <p>by {product.business_name}</p>
            <p className="italic pb-2">${product.price}</p>
            
            
            <div className="flex gap-2 overflow-x-auto align-middle justify-center">
                <p className="justify-center align-middle">{product.description}</p>
                {product.images?.map((url: string, index: number) => (
                    <Image
                        key={index}
                        src={`/${url}`}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="rounded-lg shadow-lg border-8 border-white"
                    />
                ))}
                
            </div>
        </div>
    );
}