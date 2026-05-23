import Image from "next/image"
import Link from "next/link"

export default function ProductSpotlightCard() {
    return (
        <div className="flex flex-col shadow-xl rounded-lg bg-white text-navy border-2 border-navy m-2 p-2">
            <h3>Product Spotlight</h3>
            <div className="flex items-start gap-4 m-2">
                <Image src="/images/pottery.webp" alt="pottery" width={500} height={500} className="rounded-sm h-auto"/>
                <p>Potter's Pottery jugs and vases are just the touch of rustic you need for your home. </p>
            </div>
            <Link href="/" className="text-terracotta text-xl">Learn More</Link>
        </div>
    )
}