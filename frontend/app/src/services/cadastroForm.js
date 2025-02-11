export default async function CadastroAPI(usuario) {
    const response = await fetch(`http://127.0.0.1:5000/cadastro`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })

    const data = await response.json() 

    if(!response.ok) {
        throw new Error(data.error || 'Não foi possível realizar o cadastro')
    }

    return data
}
