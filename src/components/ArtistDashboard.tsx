"use client"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ArtistDashboard({ artist, products, }: any) {
    const [bio, setBio] = useState(artist.bio || "");
    const [medium, setMedium] = useState(artist.medium || "");
    const [businessName, setBusinessName] = useState(artist.business_name || "");
    
    const handleSave = async () => {
        const response = await fetch(
            "/api/artist/profile",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    bio, medium, businessName
                }),
            }
        );
        if (response.ok) {
            alert("Saved!");
        }
    }
    
    return (
        <main className="p-10">
            <h1 className="text-center text-4xl p-2">Artist Dashboard</h1>
            <Link
                href={`/storefront/${artist.id}`} className=" flex justify-center text-terracotta underline ">View Public Storefront</Link>
            <Image 
                src={artist.image_url} 
                alt={`${artist.first_name} ${artist.last_name}`}
                width={300}
                height={300}
                className="rounded-lg shadow-xl mb-2" />
            <div className="flex gap-4">

            <div className="flex flex-col border-2 border-navy p-2 mt-4 lg:w-1/2 rounded-lg">
                <h2 className="text-center text-xl">Edit Profile Details</h2>
            <label htmlFor="business-name" >Business Name</label>
            <input value={businessName}
                onChange={(e) => setBusinessName(e.target.value)} className="border-2 p-2"/>
            
             <label htmlFor="medium">Medium</label>
            <input value={medium}
                onChange={(e) => setMedium(e.target.value)} className="border-2 p-2"/>
            
             <label htmlFor="bio">Bio</label>
            <textarea value={bio}
                    onChange={(e) => setBio(e.target.value)} className="border-2 p-2" />
                
                <button onClick={handleSave} className="bg-terracotta text-ivory p-2 rounded-lg mt-4">Save Changes</button>
                </div>
                
                         <div className="border-2 border-navy rounded-lg p-2 mt-4">
                        <h2 className="text-center text-xl">Current Products</h2>
                        {products.map((product: any) => (
                            <div
                                key={product.id}>
                                <p className="">{product.name}</p>
                                <p className="italic">{product.description}</p>
                                <Link href={`/products/edit/${product.id}`}className="text-terracotta underline">Edit Product Description</Link>
                            </div>
                        ))}
               
                </div>
                </div>
        </main>
    )
}