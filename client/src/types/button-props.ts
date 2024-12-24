export type ButtonProps = { onClick: () => void, className?: string | null, children: React.ReactNode } 

export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E }

