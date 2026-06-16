import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


const headingFont = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description: "A community for artisans",
  keywords: [
    "handmade",
    "artisan",
    "crafts",
    "marketplace",
    "artists",
    "photograpy",
    "painting",
    "jewelry",
    "fiber art",
    "fabric art",
    "sculpture",
    "metalwork", 
    "glassblowing",
    "ceramics",
    "pottery",
    "clothing",
    "home goods",
    "housewares",
    "art",
    "dishes",
    "lithograph",
    "knit",
    "crochet"

  ]
};

export default function RootLayout({ children, }: {
  children: React.ReactNode
}) { 
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="font-body text-navy bg-ivory">
        <Providers>
        <Navbar />
        {children}
          <Footer />
          </Providers>
      </body>
    </html>
  )
}
