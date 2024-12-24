import { ButtonProps } from "../../types/button-props";

export default function DestructiveButton({ children, onClick }: ButtonProps) {
    return (
        <button onClick={onClick} className="rounded-md border border-transparent py-1.5 px-2.5 text-center text-sm transition-all text-red-600 hover:bg-red-100 focus:bg-red-100 active:bg-red-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
            {children}
        </button>
    )
}
