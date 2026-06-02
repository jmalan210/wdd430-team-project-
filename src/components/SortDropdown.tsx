"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

type SortOption = {
    label: string;
    value: string;
};

type Props = {
    options: SortOption[];
    paramName?: string; //default: "sort"
};

export default function SortDropDown({
    options,
    paramName = "sort",
}: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathName = usePathname();

    const current = searchParams.get(paramName) || "id";

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value;

        const params = new URLSearchParams();
        const current = Object.fromEntries(searchParams.entries())

        Object.entries(current).forEach(([key, val]) => {
            if (key !== paramName) {
                params.set(key, val);
            }
        });
        if (value !== "id") {
          
            params.set(paramName, value);
        }
        router.push(`${pathName}?${params.toString()}`);
    }
    return (
        <select
            value={current}
            onChange={handleChange}
            className="border p-s rounded mb-4"
        >
            <option value="id">Default</option>
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
}