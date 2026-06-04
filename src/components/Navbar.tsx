"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
    const pathname = usePathname()
    const [menuOpen, setMenuOpen] = useState(false);
    useEffect(() => {
    setMenuOpen(false);
    }, [pathname]); //closes menu after user clicks a link

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMenuOpen(false)
            }
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize)
        };
    }, []); //closes menu on window resize even if it was open before

    
    const linkClass = (path: string) => {
       return pathname === path
            ? "md:text-terracotta font-semibold border-b-2 border-terracotta pb-1"
            : "border-b-2 border-transparent hover:text-terracotta pb-1"
    }

    const mobileLinkClass = (path: string) => {
        return pathname === path
        ?"text-white bg-terracotta p-3 font-semibold px-4 py3"
        : "px-4 py-3 hover:bg-terracotta hover:text-white"
    }

    
    return (
        <nav className="w-full border-b-8 border-sage bg-ivory text-navy">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                    <Image src="/images/logo.svg" alt="Handcrafted Haven Logo" width={80} height={80} className="h-20 w-auto" />
                    <div className="leading-tight">
                    <Link href='/' className="text-3xl md:text-5xl lg:text-6xl font-bold font-heading tracking-wide">Handcrafted Haven</Link>
                    <p className="hidden md:block text-sm italic">Where artisans and admirers come together</p>
                    </div>
                </div>
                
                <button
                    className="lg:hidden text-3xl"
                    onClick={() => setMenuOpen(!menuOpen)
                        
                    }
                >
                    {menuOpen ? "✕" : "☰"}
                   
                </button>
            <div className="hidden lg:flex gap-6 text-xl font-medium">
                <Link href="/" className={linkClass("/")}>Home</Link>
                <Link href="/artists" className={linkClass("/artists")}>Artists</Link>
                <Link href="/products" className={linkClass("/products")}>Products</Link>
                <Link href="/join" className={linkClass("/join")}>Join</Link>
                </div>
            </div>
            
            {menuOpen && (
                
                <div className="lg:hidden border-t border-sage bg-ivory">
                    <div className="flex flex-col px-6 py-4 space-y-4 text-lg">
                        <Link href="/" className={`px-6 py3 ${mobileLinkClass("/")}`}>Home</Link>
                <Link href="/artists" className={`px-6 py3 ${mobileLinkClass("/artists")}`}>Artists</Link>
                <Link href="/products" className={`px-6 py3 ${mobileLinkClass("/products")}`}>Products</Link>
                <Link href="/join" className={`px-6 py3 ${mobileLinkClass("/join")}`}>Join</Link>
                    </div>
                </div>
            )}
    </nav>
    )
}