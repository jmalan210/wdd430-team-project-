import ArtistCard from "@/components/ArtistCard";
import SideBar from "@/components/Sidebar";
import QueryDropDown from "@/components/QueryDropdown";
import CheckboxFilter from "@/components/CheckboxFilter";
import { getArtistMediums, getArtists } from "@/lib/artists";

export default async function ArtistsPage({ searchParams, }: {
    
   searchParams: Promise<{
        sort?: string;
        medium?: string | string[]
    }>;
}) {
    const params = await searchParams;
    const sort = params.sort || "id";
    
   
    const mediums = 
        typeof params.medium === "string"
            ? [params.medium]
            : params.medium ?? [];
    
    const artists = await getArtists(sort, mediums);
    const allMediums = await getArtistMediums();
    

    return (
        
        <main className="p-8">
           
          
            <h1 className="text-4xl font-bold mb-6 text-center bg-sage text-white m-0 p-2" >Artists</h1>
             <div className="flex flex-col md:flex-row gap-6">
            <SideBar>
                <h2>Filters</h2>
           
            
            <QueryDropDown
            
                paramName="sort"
                defaultLabel="Sort By"
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
                </SideBar>
               <div className="flex-1">
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4">
                {artists.map((artist: any)=> (
                <ArtistCard key={artist.id} artist={artist} />
                 ))}
            </div>
           </div> 
    </div>
        </main>
    )
}