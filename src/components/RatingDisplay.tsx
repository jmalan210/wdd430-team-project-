export default function RatingDisplay({
    rating, count,
}: {
        rating: number;
        count: number;
    }) {
    return (
        <div className="flex flex-col gap-2 overflow-x-auto align-middle justify-center items-center">
                    <div className=" text-yellow-500 text xl">
                        {"★".repeat(Math.round(rating))}
                        {"☆".repeat(5-Math.round(rating))}
                    </div>
                    <p>{Number(rating).toFixed(1)}
                        ({count} reviews)
            </p>
            </div>
    )
}