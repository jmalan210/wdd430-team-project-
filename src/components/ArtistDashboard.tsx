export default function ArtistDashboard({ artist }: any) {

    console.log("artist:", artist)
    return (
        <main className="p-10">
            <h1>My Profile</h1>
            <p>name: {artist.first_name} {artist.last_name}</p>
            <p>bio: {artist.bio}</p>
            <p>medium: {artist.medium}</p>
        </main>
    )
}