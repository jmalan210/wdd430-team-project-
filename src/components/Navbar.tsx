import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="w-full border-b-8 border-sage bg-ivory text-navy">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                    <img src="/images/logo.svg" alt="Handcrafted Haven Logo" className="h-20 w-auto" />
                    <div className="leading-tight">
                    <Link href='/' className="text-4xl font-bold font-heading tracking-wide">Handcrafted Haven</Link>
                    <p className="text-s font-style: italic">Where artisans and admirers come together</p>
                    </div>
                </div>
                
                
            <div className="flex gap-6 text-xl font-medium">
                <Link href="/" className="nav-link">Home</Link>
                <Link href="/" className="nav-link">Search</Link>
                <Link href="/" className="nav-link">Products</Link>
                <Link href="/" className="nav-link">Artists</Link>
                <Link href="/" className="nav-link">Join</Link>
                </div>
                </div>
    </nav>
    )
}