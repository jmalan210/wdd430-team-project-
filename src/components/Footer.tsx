export default function Footer() {
    return (
        <footer className="bg-ivory w-full text-center border-t-8 border-sage p-1 text-navy">
            
            <div className="flex gap-6 align-middle justify-center p-3">
                <a href="https://facebook.com"><img src="images/facebook.svg" alt="facebook logo" className="w-10 h-auto" /></a>
                <a href="https://instagram.com"><img src="images/instagram.svg" alt="instagram logo" className="w-10 h-auto" /></a>
                <a href="https://pinterest.com"><img src="images/pinterest.svg" alt="pinterest logo" className="w-10 h-auto" /></a>
            </div>

            <p className="p-3">&copy; {new Date().getFullYear()} Jennifer Malan for BYUI WDD 430</p>
        </footer>

    )
}