"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation";

type FilterOption = {
    label: string;
    value: string;
};

type Props = {
    options: FilterOption[];
    paramName: string; 
    title: string;
};

export default function CheckboxFilter({ title, paramName, options }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const selectedValues = searchParams.getAll(paramName);

    function handleChange(value: string, checked: boolean) {
        const params = new URLSearchParams(searchParams.toString());

        const currentValues = params.getAll(paramName);

        let newValues: string[];

        if (checked) {
            newValues = [...currentValues, value];
        } else {
            newValues = currentValues.filter((v) => v !== value);
        }

        params.delete(paramName);

       
        
        newValues.forEach((v) => params.append(paramName, v));
        router.push(`${pathname}?${params.toString()}`);
    }
    return (
        <div className="flex mb-4">
            <div className="grid grid-cols-1 gap-2 mb-4">
            <h3 className="font-semibold mb-2">{title}</h3>
            {options.map((option) => (
                <label
                    key={option.value}
                    className="flex items-center gap-2"
                >
                    <input
                       
                        type="checkbox"
                        checked={selectedValues.includes(option.value)}
                        onChange={(e) =>
                        handleChange(option.value, e.target.checked)
                        }
                    />
                    {option.label}
                </label>
            ))}
            </div>
            </div>
    );
    

}