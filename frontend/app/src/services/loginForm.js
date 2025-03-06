export default async function LoginAPI(email, senha) {
    const response = await fetch(`http://127.0.0.1:5000/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, senha})
    })

    const data = await response.json() 
    console.log(data)
    if (!response.ok) {
        const errorMessage = data.mensagem || (data[0] && data[0].mensagem) || "Erro desconhecido"
        throw new Error(errorMessage)
    }

    return data
}
