import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="w-full border-b bg-navy text-ivory">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <Link href='/' className="text-xl font-bold"><h1>Handcrafted Haven</h1></Link>
                <h2>Where artisans and admirers come together</h2>
            <div className="flex gap-6 test-sm font-medium">
                <Link href="/" className="hover:text-terracotta">Home</Link>
                <Link href="/" className="hover:text-terracotta">Search</Link>
                <Link href="/" className="hover:text-terracotta">Products</Link>
                <Link href="/" className="hover:text-terracotta">Artists</Link>
                <Link href="/" className="hover:text-terracotta">Join</Link>
                </div>
                </div>
    </nav>
    )
}