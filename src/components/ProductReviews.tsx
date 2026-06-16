export default function ProductReviews({ reviews }: any) {
    return (
        <div>
            <h2 className="font-bold text-3xl text-center">Reviews</h2>
            {reviews.map((review: any) => (
                <div
                    key={review.id}
                    className="m-4">
                    <p className="font-bold text-l">{review.firstname} {review.lastname}</p>
                    <p>Rating: {review.rating}<span className="text-xl text-amber-700">★</span></p>
                    <p className="italic">{review.review_text}</p>
                </div>
            ))}
        </div>
    );
}