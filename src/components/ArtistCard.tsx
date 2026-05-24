import Link from "next/link"
import Image from "next/image"

export default function ArtistCard({artist}: any) {
    return (
                    <div className="border rounded-xl p-4 shadow-lg bg-ivory">
                        <h2 className="text-2xl font-bold text-navy">{artist.first_name} {artist.last_name}</h2>
                        <h3 className="text-lg font-semibold text-terracotta">{artist.business_name}</h3>
                        <h4 className="text-sm italic text-sage">{artist.medium}</h4>

                        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
                            <img src={artist.image_url} alt={`${artist.first_name} ${artist.last_name}`} className=" h-48 aspect-square object-cover object-center rounded-lg shadow-lg border-8 border-white" />
                            <p className="text-navy mt-2">{artist.bio}</p>
                        </div>
                        
                    </div>
                )}
           
