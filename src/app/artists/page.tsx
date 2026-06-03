import ArtistCard from "@/components/ArtistCard";
import QueryDropDown from "@/components/QueryDropdown";
import CheckboxFilter from "@/components/CheckboxFilter";
import { getArtistMediums, getArtists } from "@/lib/artists";

export default async function ArtistsPage({ searchParams, }: {
    
   searchParams: {
        sort?: string;
        medium?: string | string[]
    };
}) {
    const params = await searchParams;
    const sort = searchParams.sort || "id";
    
   
    const mediums = 
        typeof params.medium === "string"
            ? [params.medium]
            : params.medium ?? [];
    
    const artists = await getArtists(sort, mediums);
    const allMediums = await getArtistMediums();
    

    return (
        <main className="p-8">

            <h1 className="text-4xl font-bold mb-6" >Artists</h1>
            <QueryDropDown
                paramName="sort"
                defaultLabel="Sort Artists"
                defaultValue=""
                            options={[
                                { label: "Artist Name", value: "last_name" },
                                { label: "Business Name", value: "business_name"},
                                   
                                
                ]} />
            <CheckboxFilter
                title="Mediums"
                paramName="medium"
                options={allMediums.map((medium) => ({
                    label: medium,
                    value: medium
            }))}
           />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                {artists.map((artist: any)=> (
                <ArtistCard key={artist.id} artist={artist} />
                 ))}
            </div>
            
        </main>
    )
}