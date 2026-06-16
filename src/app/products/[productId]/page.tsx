import Image from "next/image";
import Link from "next/link";
import ProductReviews from "@/components/ProductReviews";
import ReviewForm from "@/components/ReviewForm";
import { auth } from "@/auth";
import { getProductsById } from "@/lib/products";
import { getProductReviews, getUserReview } from "@/lib/reviews";
import RatingDisplay from "@/components/RatingDisplay";



export default async function Page({
    params,
}: {
    params: Promise<{ productId: string }>;
    }) { 
    const session = await auth();
    const { productId } = await params

    const product = await getProductsById(Number(productId));
    if (!product) {
        return <p>Product not found</p>
    }

    const reviews = await getProductReviews(Number(productId));

    const userReview = await getUserReview(
        Number(productId),
        session?.user?.id

        
    )
    
    return (
        <main >
            <div className="p-4">
                <Link
                    href="/products"
                >
                <Image
                src="/images/arrow.svg"
                alt="back arrow icon"
                width={30}
                height={30}
                className="rotate-180"
                    
                    />
                    </Link>
            </div >
            <div className="grid md:grid-cols-3 gap-4 m-4">
            <div className="border-2 border-navy rounded-lg col-span-2 ">
            <h1 className="text-center text-3xl">{product.name}</h1>
            <h2 className="text-center text-xl text-terracotta">by {product.first_name} {product.last_name} of {product.business_name}</h2>
            
                <div className="flex flex-col items-center p-4">
                    
                
                <Image src={product.image_url || "/images/placeholder.svg"} alt={product.alt_text} width={300} height={300} className="w-full h-auto max-w-md" />
                <p className="italic">{`$${product.price}`}</p>
                <RatingDisplay
                    rating={product.average_rating}
                    count={product.review_count} />
                <p className="justify-center align-middle line-clamp-3">{product.description}</p>
              </div>
            
            </div>


            <div className="flex flex-col gap-4 border-2 border-navy rounded-lg flex-1">
                
                <ProductReviews reviews={reviews} />
                {session ? (
                    <ReviewForm productId={Number(productId)} existingReview={userReview} />
                ) : (
                        <p className="mt-4 p-4">Please <Link href="/login" className="font-bold text-terracotta underline">log in </Link> to leave a review</p>
               )}
                               
                               
                
                </div>
            </div>
            
           
            


        </main>
    )

}