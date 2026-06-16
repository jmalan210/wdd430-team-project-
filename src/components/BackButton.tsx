"use client"
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function BackButton() {
    const router = useRouter();

    return (
        <button onClick={() => router.back()}
            className="hover:scale-110 transition-transform"
            aria-label="Go back">
           
                <Image
                src="/images/arrow.svg"
                alt="back"
                width={30}
                height={30}
                className="rotate-180"
                    
                    />
        </button>
    )
}