import Link from "next/link"

export default function AttributionsPage() {
    return (
        <main>
            <div className="text-center mb-2">
                <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-l from-navy via-sage to-terracotta text-ivory py-2 rounded-lg my-4">Attributions</h1>
                <div>
                <p><Link href="https://stock.adobe.com/">Adobe Stock Photos</Link></p>
                <p><Link href="https://www.flaticon.com/">Flaticon</Link></p>
                <p><Link href="https://www.svgrepo.com/">SVG Repo</Link></p>
                    <p><Link href="https://unsplash.com/">Unsplash</Link></p>
                    </div>
            </div>
</main>
    )
}