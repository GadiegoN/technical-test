import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string
    variant?: "default" | "outline"
    onClick: () => void
}

export function Button({ title, onClick, variant = "default" }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`${variant === "outline"
                ? "w-full h-10 bg-transparent text-primary border border-primary rounded-lg font-medium"
                : "w-full bg-primary text-white h-10 rounded-lg font-medium"}`}
        >
            {title}
        </button>
    )
}