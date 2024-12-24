export function setToken(token: string) {
    localStorage.setItem('x_token', token)
}

export function getToken(): string | null {
    return localStorage.getItem('x_token')
}

export function removeToken() {
    localStorage.removeItem('x_token')
}

export function hasToken(): boolean {
    return !!localStorage.getItem('x_token')
}

