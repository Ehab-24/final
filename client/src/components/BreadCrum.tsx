export default function BreadCrum({ bgColor, children }: { bgColor: string, children: React.ReactNode }) {
    return (
        <span className={
            `${bgColor} text-blue-800 text-xs font-semibold me-2 px-2 py-0.5 rounded hidden sm:flex`
        }>
            {children}
        </span>
    )
}
