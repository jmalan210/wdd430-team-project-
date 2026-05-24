async function getArtists() {
    const res = await fetch("http://localhost:3000/api/artists", {
        cache: "no-store",
    });
    return res.json()
}

export default async function ArtistsPage() {

    const artists = await getArtists();

    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold mb-6">Artists</h1>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm: grid-cols-1 gap-4">
                {artists.map((artist: any) => (
                    <div
                        key={artist.id} className="border rounded-xl p-4 shadow-lg bg-ivory">
                        <h2 className="text-2xl font-bold text-navy">{artist.first_name} {artist.last_name}</h2>
                        <h3 className="text-lg font-semibold text-terracotta">{artist.business_name}</h3>
                        <h4 className="text-sm italic text-sage">{artist.medium}</h4>

                        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
                            <img src={artist.image_url} alt={`{artist.first_name} {artist.last_name}`} className=" h-48 aspect-square object-cover object-center rounded-lg shadow-lg border-8 border-white" />
                            <p className="text-gray-600 mt-2">{artist.bio}</p>
                        </div>
                        
                    </div>
                ))}
            </div>

        </main>
    )
}