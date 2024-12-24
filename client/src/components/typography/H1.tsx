export default function H1({ children }: { children: React.ReactNode }) {
    return (
        <h1 className="text-3xl font-bold text-gray-800">
            {children}
            <div className="hidden md:block md:absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white/70 to-transparent" />
        </h1>
    )
}
