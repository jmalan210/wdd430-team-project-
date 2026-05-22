"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname()

    const linkClass = (path: string) => {
       return pathname === path
            ? "text-terracotta font-semibold border-b-2 border-terracotta pb-1"
            : "border-b-2 border-transparent hover:text-terracotta pb-1"
    }

    
    return (
        <nav className="w-full border-b-8 border-sage bg-ivory text-navy">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                    <img src="/images/logo.svg" alt="Handcrafted Haven Logo" className="h-20 w-auto" />
                    <div className="leading-tight">
                    <Link href='/' className="text-4xl font-bold font-heading tracking-wide">Handcrafted Haven</Link>
                    <p className="text-sm italic">Where artisans and admirers come together</p>
                    </div>
                </div>
                
                
            <div className="flex gap-6 text-xl font-medium">
                <Link href="/" className={linkClass("/")}>Home</Link>
                <Link href="/search" className={linkClass("/search")}>Search</Link>
                <Link href="/products" className={linkClass("/products")}>Products</Link>
                <Link href="/artists" className={linkClass("/artists")}>Artists</Link>
                <Link href="/join" className={linkClass("/join")}>Join</Link>
                </div>
                </div>
    </nav>
    )
}