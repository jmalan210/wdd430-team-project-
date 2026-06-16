export default function RatingDisplay({
    rating, count,
}: {
        rating: number;
        count: number;
    }) {
    return (
        <div className="flex flex-col gap-2 overflow-x-auto align-middle justify-center items-center">
                    <div >
                        <span className=" text-amber-700 text 2xl">{"★".repeat(Math.round(rating))}</span>
                        <span className=" text-navy text 2xl">{"☆".repeat(5-Math.round(rating))}</span>
                    </div>
                    <p>{Number(rating).toFixed(1)} ({count} reviews)
            </p>
            </div>
    )
}