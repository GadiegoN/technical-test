import { CheckCheck } from "lucide-react";
import { ChangeEvent } from "react";

interface CustomCheckboxProps {
    label: string;
    checked?: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Checkbox({ label, checked = false, onChange }: CustomCheckboxProps) {
    return (
        <label className="relative block pl-8 mb-3 text-xl cursor-pointer select-none">
            <p className="text-base text-gray-400">{label}</p>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="absolute opacity-0 cursor-pointer h-0 w-0 peer"
            />
            <span className="absolute top-0 left-0 h-6 w-6 border border-gray-400 peer-checked:bg-primary peer-hover:border-primary rounded-lg"></span>
            {checked && (
                <span className="absolute top-0 left-0 h-6 w-6 flex items-center justify-center text-gray-200">
                    <CheckCheck />
                </span>
            )}
        </label>
    )
}