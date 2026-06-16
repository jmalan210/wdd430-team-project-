import Link from "next/link"

export default function Footer() {
    return (
        <footer className="w-full bg-gradient-to-r from-navy via-sage to-terracotta text-ivory text-center">
            
            <div className="flex gap-6 align-middle justify-center p-3">
                <Link href="https://facebook.com"><img src="/images/facebook.svg" alt="facebook logo" className="w-10 h-auto" /></Link>
                <Link href="https://instagram.com"><img src="/images/instagram.svg" alt="instagram logo" className="w-10 h-auto" /></Link>
                <Link href="https://pinterest.com"><img src="/images/pinterest.svg" alt="pinterest logo" className="w-10 h-auto" /></Link>
            </div>

            <p className="p-3">&copy; {new Date().getFullYear()} Jennifer Malan for BYUI WDD 430</p>
            <Link href="/attributions" className="underline">Attributions</Link>
        </footer>

    )
}