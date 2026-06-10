export default function ProductReviews({ reviews }: any) {
    return (
        <div>
            <h2>Reviews</h2>
            {reviews.map((review: any) => (
                <div
                    key={review.id}>
                    <p>{review.firstname} {review.lastname}</p>
                    <p>Rating: {review.rating}/5</p>
                    <p>{review.review_text}</p>
                </div>
            ))}
        </div>
    );
}