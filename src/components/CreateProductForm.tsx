"use client"
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation";



export default function ProductForm({
    artistId,
   }: {
        artistId: number;
       
    }) {
    const router = useRouter();
    
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const [image, setImage]
        = useState<File | null>(null);
    const [error, setError] = useState("");
   

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

        let imageUrl = "";

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
                    setError("Image upload failed")
                        return;

                }

                imageUrl = uploadData.url;
            }

            const res = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    description,
                    price,
                    image_url: imageUrl,
                    artist_id: artistId
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Failed to save product");
                return;
            }

            router.push("/products");
            router.refresh();
        } catch (err) {
            setError("Something went wrong");
        }
   }
            
       

        
    return (
        <main>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-4"
            >
            <div className="border-2 border-sage/25 rounded-lg shadow-lg my-4 p-4">
            <h2 className="text-center text-xl font-bold my-2">
                Create a New Product
            </h2>
            <div className="flex flex-col items-center">
                <label>Product Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border-p2 w-full"/>

                <label>Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="border-p2 w-full"
                        />

                <label>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={5}
                            className="border-2 p-2 w-full"
                        />

                <label>Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files?.[0] || null)

                            }
                        />

                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                )}
                <button
                  type="submit"
                    className="mt-4 rounded bg-terracotta px-4 py-2 text-ivory w-1/2 self-center my-4">
                   
                    Create Product</button>
                    </div>
            </div>
          
            </form>
        </main>
    );
}