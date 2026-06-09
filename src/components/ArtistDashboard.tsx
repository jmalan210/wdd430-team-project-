"use client"
import { useState } from "react";

export default function ArtistDashboard({ artist }: any) {
    const [bio, setBio] = useState(artist.bio || "");
    const [medium, setMedium] = useState(artist.medium || "");
    const [businessName, setBusinessName] = useState(artist.business_name || "");

    const handleSave = async () => {
        const response = await fetch(
            "/api/artist/profile",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    bio, medium, businessName
                }),
            }
        );
        if (response.ok) {
            alert("Saved!");
        }
    }
    
    return (
        <main className="p-10">
            <h1 className="text-center text-4xl p-2">My Profile</h1>
            <div className="flex flex-col">
            <label htmlFor="business-name" >Business Name</label>
            <input value={businessName}
                onChange={(e) => setBusinessName(e.target.value)} className="border-2 p-2"/>
            
             <label htmlFor="medium">Medium</label>
            <input value={medium}
                onChange={(e) => setMedium(e.target.value)} className="border-2 p-2"/>
            
             <label htmlFor="bio">Bio</label>
            <textarea value={bio}
                    onChange={(e) => setBio(e.target.value)} className="border-2 p-2" />
                
                <button onClick={handleSave}  className="bg-terracotta text-ivory p-2 rounded-lg w-1/4">Save Changes</button>
            </div>
        </main>
    )
}