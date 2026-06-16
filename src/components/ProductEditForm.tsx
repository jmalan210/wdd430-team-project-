"use client"
import { useRouter } from "next/navigation";
import { useState } from "react"
import { toast } from "sonner";

export default function ProductEditForm({ product }: any) {
    const router = useRouter();

    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price)
    const [description, setDescription] = useState(product.description);
    const [image, setImage] = useState<File | null>(null);

    const handleSave = async () => {
        
        let imageUrl = product.images?.[0] || product.image_url || "";
            

        try {
            if (image) {
                const formData = new FormData();
                formData.append("file", image);

                const uploadRes = await fetch("/api/upload",
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                if (!uploadRes.ok) {
                    toast.error("Image upload failed");
                    return;
                }
                const uploadData = await uploadRes.json();
                imageUrl = uploadData.url;
            }
        
            const response = await fetch(
                `/api/products/${product.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        description, 
                        price,
                        image_url: imageUrl
                    })
                }
            );
            if (response.ok) {
                toast.success("Product udpated!")
                router.push(`/artists/dashboard`);
                    

            } else {
                toast.error("Update failed")
            }
        } catch (err) {
            console.error(err);
            toast.error("Update failed");
        }
    };

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmed) return;

        const response = await fetch(
            `/api/products/${product.id}`,
            {
                method: "DELETE",
            }
        );

        if (response.ok) {
            router.push("/artists/dashboard");
        }
        else {
            toast.error("Delete failed")
        }
    };

    return (
        <main>
            <div className="m-4">
            <h1 className="text-center text-3xl">
                Edit Product Listing
            </h1>
            <div className="flex flex-col lg:w-1/2 mx-auto my-4">
                
                <label>Product Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                />

                <label htmlFor="name">Product Name</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-2 p-2" />
                
                <label>Price</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border-2 p-2"
                    />

                <label htmlFor="description">Description</label>
                <textarea value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows= {5}
                    className="border-2 p-2" />
                
                <button
                    onClick={handleSave}
                    className="mt-4 rounded bg-terracotta px-4 py-2 text-ivory">Save Changes</button>
                <button
                    onClick={handleDelete}
                className="mt-4 rounded bg-red-700 px-4 py-2 text-ivory">Permanently Delete Product</button>
            </div>
          </div>
        </main>
    );
}
