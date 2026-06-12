import Link from "next/link"
import Image from "next/image"

export default function ArtistCard({artist}: any) {
    return (
            <Link href={`storefront/${artist.id}`} className="block h-full" >
            <div className="h-full flex flex-col border rounded-xl p-4 shadow-lg  bg-ivory">
                <div className="flex justify-between">
                   
                <div className="flex flex-col pl-3 justify-center text-left">
                        <h2 className="text-2xl font-bold text-navy">{artist.first_name} {artist.last_name}</h2>
                        <h3 className="text-lg font-semibold text-terracotta">{artist.business_name}</h3>
                        <h4 className="text-sm italic text-sage">{artist.medium}</h4>
                    </div>

                     <div className="relative w-36 h-36 shrink-0">
                        <Image src={artist.image_url}
                            alt={`${artist.first_name} ${artist.last_name}`}
                            fill
                            sizes="(max-width: 768px) 100vs, 33vw"
                            className="object-cover rounded-lg shadow-lg border-4 border-white" />
                    </div>    
                    
                    </div>
                <div className="mt-4">
                    
                  
                        <p className="text-navy line-clamp-3 ">{artist.bio}</p>
                        </div>
            
                
            </div>
            </Link>
                )}
           
