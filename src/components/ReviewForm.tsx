"use client"
import { useState } from "react"
import { useRouter } from "next/navigation";

export default function ReviewForm({ productId, existingReview }: { productId: number; existingReview?: any }) {
    const [rating, setRating] = useState(existingReview?.rating || 0);
    const [reviewText, setReviewText] = useState(existingReview?.review_text || "");
    const [hoveredStar, setHoveredStar] = useState(0);

    const router = useRouter();
    const isEdit = !!existingReview;

    const handleSave = async () => {
         if (rating === 0) {
            alert("Please select a rating");
            return
        }
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
        
        if (response.ok) {
            alert("Review Submitted!");
            setReviewText("");
            setRating(0);
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
               

                <div className="flex gap-1 text-4xl">
                    {[1, 2, 3, 4, 5].map((star) => {
                        const filled = star <= (hoveredStar || rating);
                        return (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoveredStar(star)}
                                onMouseLeave={() => setHoveredStar(0)}
                                className={filled ? "cursor-pointer text-yellow-500" : "cursor-pointer text-gray-300"}
                            >
                                {star <= (hoveredStar || rating)
                                    ? "★"
                                    : "☆"}
                            </button>
                        );
                    })}
                </div>
                <p>{rating} out of 5 stars</p>

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
