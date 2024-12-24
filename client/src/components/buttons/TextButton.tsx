import { ButtonProps } from "../../types/button-props";

export default function TextButton({ children, onClick }: ButtonProps) {
    return (
        <button onClick={onClick} className="rounded-md border border-transparent py-1.5 px-2.5 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
            {children}
        </button>
    )
}
