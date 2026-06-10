"use client"
import { useState } from "react"
import { useRouter } from "next/navigation";

export default function ReviewForm({ productId, }: { productId: number; }) {
    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState("");

    const router = useRouter();

    const handleSave = async () => {
        const response = await fetch("/api/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productId,
                rating,
                reviewText,
            }),
        }
            
        );
        if (response.ok) {
            alert("Review Submitted!");
            setReviewText("");
            setRating(5);
            router.refresh();

        } else {
            
            console.log(response.status);
            console.log(await response.text());
            
            alert("Failed to submit review");
        }
    };

    return (
        <main>
            <h2>
                Leave a Review
            </h2>
            <div className="flex flex-col lg:w-1/2">
                <label htmlFor="rating">Rating</label>
                <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="border p-2"
                >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Stars</option>
                </select>

                <label htmlFor="review">Review</label>
                <textarea value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={5}
                    className="border-2 p-2" />
                
                <button
                    onClick={handleSave}
                className="mt-4 rounded bg-terracotta px-4 py-2 text-ivory">Submit Review</button>
            </div>
          
            
        </main>
    );
}
