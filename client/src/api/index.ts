
export async function login(username: string, password: string): Promise<any | null> {
    try {
        const response = await fetch(apiURL('login/'), {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.json()
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function register(username: string, password: string): Promise<any | null> {
    try {
        let response = await fetch(apiURL('register/'), {
            method: 'POST',
            body: JSON.stringify({
                username, password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return await response.json()
    } catch (error) {
        console.log(error)
        return null
    }
}

function apiURL(path: string): string {
    return `http://127.0.0.1:8000/${path}`
}
