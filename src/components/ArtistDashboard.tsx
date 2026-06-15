"use client"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CreateProductForm from "@/components/CreateProductForm"

export default function ArtistDashboard({ artist, products, }: any) {
    const [bio, setBio] = useState(artist.bio || "");
    const [image, setImage] = useState<File | null>(null);
    console.log("products:", products);

    const [medium, setMedium] = useState(artist.medium || "");
    const [businessName, setBusinessName] = useState(artist.business_name || "");
    
    const handleSave = async () => {
        let imgUrl = artist.image_url;
        try {
            if (image) {
                const formData = new FormData();
                formData.append("file", image);

                const uploadRes = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                const uploadData = await uploadRes.json();

                if (!uploadRes.ok) {
                    alert("Image upload failed");
                    return;
                }

                imgUrl = uploadData.url;
            }
        
            const response = await fetch(
                "/api/artist/profile",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        bio, medium, businessName, image_url: imgUrl
                    }),
                }
            );
            if (response.ok) {
                alert("Saved!");

            }
        } catch (err) {
            console.error(err);
        }
    };
    
        return (
            <main className="p-10">
                <h1 className="text-center text-4xl p-2">Artist Dashboard</h1>
                <Link
                    href={`/storefront/${artist.id}`} className=" flex justify-center text-terracotta underline ">View Public Storefront</Link>
            

                <div className="flex flex-col">
           
                    {/*div with image and form*/}
                    <div className="flex flex-col lg:flex-row gap-6 items-center ">

                        <div className="shrink-0">
                            <Image
                                src={artist.image_url}
                                alt={`${artist.first_name} ${artist.last_name}`}
                                width={300}
                                height={300}
                                className="rounded-lg shadow-xl mb-2" />
                        </div>

                        <div className="flex flex-col border-2 border-navy p-2 mt-4 rounded-lg w-full lg:flex-1">
                            <h2 className="text-center text-xl font-bold">Edit Profile Details</h2>
                        
                            <label className="font-bold">Profile Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files?.[0] || null)}
                            />

                            <label htmlFor="business-name" className="font-bold">Business Name</label>
                            <input value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)} className="border-2 p-2" />
            
                            <label htmlFor="medium" className="font-bold">Medium</label>
                            <input value={medium}
                                onChange={(e) => setMedium(e.target.value)} className="border-2 p-2" />
            
                            <label htmlFor="bio" className="font-bold">Bio</label>
                            <textarea value={bio}
                                onChange={(e) => setBio(e.target.value)} className="border-2 p-2" />
                
                            <button onClick={handleSave} className="bg-terracotta text-ivory p-2 rounded-lg mt-4 max-w-2xl self-center">Save Changes</button>
                        </div>
                    </div>
                

                    <div>
                        <div className="border-2 border-navy rounded-lg p-2 mt-4">
                            <h2 className="text-center text-xl font-bold">Current Products</h2>
                            {products.map((product: any) => (
                                <div
                                    key={product.id}
                                    className="my-8">
                                
                                    <p className="font-bold">{product.name}</p>
                                    <div className="shrink-0">
                                    
                                        <Image
                                            src={product.images[0]}
                                            alt={product.name}
                                            width={150}
                                            height={150}
                                            className="rounded-lg shadow-xl mb-2" />
                                    </div>
               
                                    <p className="italic">{product.description}</p>
                                    <Link href={`/products/edit/${product.id}`} className="text-terracotta underline">Edit Product Description</Link>
                                </div>
                            ))}
               
                        </div>
                    </div>
                    <CreateProductForm artistId={artist.id} />
                </div>
            </main>
        )
    }
