import Image from "next/image"
import Link from "next/link"
import RatingDisplay from "./RatingDisplay";

type Product = {
    id: string;
    name: string;
    price: number;
    description: string;
    images?: string[];
    artist_id: number;
    business_name: string
    average_rating: number
    review_count: number
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
            
        <div className="flex flex-col shadow-xl rounded-lg p-4 bg-ivory h-full">
       
            <div >
            <h3 className="text-2xl
        font-bold
        overflow-hidden
        [display:-webkit-box]
        [-webkit-box-orient:vertical]
        [-webkit-line-clamp:2]">{product.name}</h3>
            <p className="text-terracotta pb-2">by {product.business_name}</p>
            <p className="italic pb-2">${product.price}</p>
            </div>
            
            <div className="relative h-72 w-full">
                    {(product.images?.length
                        ? product.images
                        : ["/images/placeholder.svg"])
                        .map((url: string, index: number) => (
                    <Image
                        key={index}
                        src={url}
                        alt={product.name}
                         fill
                         sizes="(max-width: 768px) 100vw 33vw"
                        className="object-contain rounded-lg"
                    />
                ))}
            </div>
            <div className="mt-auto">
                <RatingDisplay
                    rating= {product.average_rating}
                        count={product.review_count} />
                    </div>
        </div>
        </Link>
    );
}