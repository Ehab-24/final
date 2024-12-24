export default function H2({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="relative mt-20 mb-4 text-3xl text-gray-500 font-bold tracking-wide leading-relaxed">
            {children}
            <div className="hidden md:block md:absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white/70 to-transparent" />
        </h2>
    )
}
