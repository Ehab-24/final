
type Props = {
    children: React.ReactNode
    className?: string | null
}

export default function SubmitButton({ children, className }: Props) {
    return (
        <button type="submit" className={`rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all hover:border-slate-700 border-[1.5px] border-white focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:text-slate-700 hover:bg-white active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${className ?? ""}`}>
            {children}
        </button>
    )
}

