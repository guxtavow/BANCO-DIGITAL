export default async function LoginAPI(email, senha) {
    const response = await fetch(`http://127.0.0.1:5000/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, senha})
    })

    const data = await response.json() 

    return data
}
