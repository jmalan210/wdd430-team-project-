"use client";

import { useState } from "react";

type Props = {
    children: React.ReactNode;
};

export default function SideBar({ children }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            {/*Mobile button */}
            <button
                onClick={() => setOpen(true)}
                className="md:hidden border rounded px-4 py-2 mb-4">
                ☰ Filter & Sort
            </button>
            {/* {Desktop sidebar} */}
            <aside className="hidden md:block w-64 shrink-0 border rounded-lg p-4">
                {children}
            </aside>
            {/* {Mobile drawer} */}
            {open && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="absolute inset-0 bg-black/50"
                        onClick={() => setOpen(false)} />
                    <div className="absolute left-0 top-0 h-full w-72 bg-white p-4 shadow-lg">
                        <button
                            onClick={() => setOpen(false)}
                            className="mb-4">
                            ✕ Close
                        </button>
                        {children}
                    </div>
                </div>
                
            )}
        </div>
    );
}