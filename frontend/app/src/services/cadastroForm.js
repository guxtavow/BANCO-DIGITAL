export default async function CadastroAPI(usuario) {
    const response = await fetch(`http://127.0.0.1:5000/cadastro`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })

    const data = await response.json() 

    if (!response.ok) {
        const errorMessage = data.mensagem || (data[0] && data[0].mensagem) || "Erro desconhecido"
        throw new Error(errorMessage)
    }

    return data
}
