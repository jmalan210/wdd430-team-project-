"use client"
import { useState } from "react"

export default function ProductEditForm({ product }: any) {
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);

    const handleSave = async () => {
        const response = await fetch(
            `/api/products/${product.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    description
                })
            }
        );
        if (response.ok) {
            alert("Product udpated!");

        } else {
            alert("Update failed")
        }
    };

    return (
        <main>
            <h1>
                Edit Product Listing
            </h1>
            <div className="flex flex-col lg:w-1/2">
                <label htmlFor="name">Product Name</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-2 p-2" />

                <label htmlFor="description">Description</label>
                <textarea value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border-2 p-2" />
                
                <button
                    onClick={handleSave}
                className="mt-4 rounded bg-terracotta px-4 py-2 text-ivory">Save Changes</button>
            </div>
          
        </main>
    );
}
