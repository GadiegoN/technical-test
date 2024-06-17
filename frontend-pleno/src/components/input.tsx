import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholder: string
    icon?: ReactNode
}

export function Input({ placeholder, icon, ...props }: InputProps) {

    return (
        <div className="w-full flex h-10 relative rounded-lg bg-slate-500/10">
            <input
                placeholder={placeholder}
                className="flex h-10 w-full text-lg bg-transparent rounded-md pl-3 pr-10 py-2"
                {...props}
            />
            {icon !== null && (
                <span className="absolute text-primary top-2 bottom-2 right-2">{icon}</span>
            )}
        </div>
    )
}