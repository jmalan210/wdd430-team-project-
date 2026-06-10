"use client"
import { useState } from "react"
import { useRouter } from "next/navigation";

export default function ReviewForm({ productId, existingReview }: { productId: number; existingReview?: any }) {
    const [rating, setRating] = useState(existingReview?.rating || 5);
    const [reviewText, setReviewText] = useState(existingReview?.review_text || "");

    const router = useRouter();
    const isEdit = !!existingReview;

    const handleSave = async () => {
        const url = isEdit
            ? `/api/reviews/${productId}`
            : `/api/reviews`;
        
        const method = isEdit? "PUT" : "POST"
        const response = await fetch(url, {
            method,
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

        const data = await response.json();
        
        if (response.status === 201) {
            alert("Review Submitted!");
            setReviewText("");
            setRating(5);
            router.refresh();

        } else if (response.status === 403) {
            alert(data.message)
        } else if (response.status === 400) {
            alert(data.message)
        }
         else {
            alert("Something went wrong");
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
                    className="mt-4 rounded bg-terracotta px-4 py-2 text-ivory">
                    {isEdit ? "Update Review" : "Submit Review"}
                    </button>
            </div>
          
            
        </main>
    );
}
