export default function UnderConstruction({ title }: { title: string }) {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center font-body">
            <h1 className="font-heading text-4xl text-navy">{title}</h1>
            <p className="mt-4 text-lg text-sage">We're crafting something beautiful here!</p>
        </div>
    )
}