import Link from "next/link"
import Image from "next/image"

export default function ArtistCard() {
    return (
        <div className="flex flex-col shadow-xl rounded-lg bg-white text-navy border-2 border-navy m-2 p-2">
            <h3>Wendy Graham</h3>
            <div className="flex gap-6 m-2">
                <Image src="/images/wendy-graham.webp" alt="Wendy Graham" width={200} height={200} className="rounded-sm h-auto" />
                <p>Wendy has been doing fiber arts since she learned from her grandmother at a very young age. Her specialties include weaving and felting. </p>
            </div>
            <Link href="/" className="text-terracotta text-xl">Learn More</Link>
        </div>
    )
}