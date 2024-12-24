import { ButtonProps } from "../../types/button-props";

export default function OutlinedButton({ onClick, children }: ButtonProps) {
    return (
        <button onClick={onClick} className="rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
            {children}
        </button>
    )
}
