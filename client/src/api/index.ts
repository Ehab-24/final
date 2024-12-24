
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

export async function register(username: string, password: string): Promise<any> {
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
        return { error }
    }
}

export async function tasks(token: string): Promise<any> {
    try {
        let response = await fetch(apiURL('tasks/'), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        return await response.json()
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function task(token: string, id: string): Promise<any> {
    try {
        let response = await fetch(apiURL(`tasks/${id}`), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        return await response.json()
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function removeTask(token: string, id: string): Promise<any> {
    try {
        let response = await fetch(apiURL(`tasks/${id}`), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        return await response.json()
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function createTask(token: string, heading: string, description: string, status: string): Promise<any> {
    try {
        let response = await fetch(apiURL('tasks/'), {
            method: 'POST',
            body: JSON.stringify({
                heading, description, status,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        return await response.json()
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function updateTask(token: string, task: any): Promise<any> {
    try {
        let response = await fetch(apiURL(`tasks/${task._id}`), {
            method: 'PUT',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
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
