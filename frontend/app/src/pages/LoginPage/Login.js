import './Login.css'
import { useState } from 'react'
import LogoHeader from './imgs/bytebank_logo.png'
import LogoPicture from './imgs/bytebank_pic.png'
import CadastroAPI from '../../services/cadastroForm'

export default function Login() {
    const [Cadastro, setCadastro] = useState(false)
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmar_senha: '',
        celular: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const CadastroUsuario = async (e) => {
        e.preventDefault()

        if (formData.senha !== formData.confirmar_senha) {
            alert('As senhas não coincidem')
            return
        }

        try {
            const response = await CadastroAPI(formData)
            alert(response.mensagem)
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <div className="loginPage">
            <div className="loginContainer">
                <img src={LogoHeader} alt="Logo Bytebank" />
                <div className="loginForm">
                    {Cadastro ? (
                        <div className='cadastroForm'>
                            <form onSubmit={CadastroUsuario}>
                                <section className="userplaceholder">
                                    Nome <input type="text" placeholder="Digite seu nome completo" name="nome" value={formData.nome} onChange={handleChange} />
                                </section>
                                <section className="userplaceholder">
                                    Email <input type="text" placeholder="Digite seu email" name="email" value={formData.email} onChange={handleChange} />
                                </section>
                                <section className="userplaceholder">
                                    Senha <input type="password" placeholder="Digite aqui sua Senha de acesso" name="senha" value={formData.senha} onChange={handleChange} />
                                </section>
                                <section className="userplaceholder">
                                    Confirmar Senha <input type="password" placeholder="Digite novamente sua senha" name="confirmar_senha" value={formData.confirmar_senha} onChange={handleChange} />
                                </section>
                                <section className="userplaceholder">
                                    Celular <input type="text" placeholder="Digite aqui seu Celular" name="celular" value={formData.celular} onChange={handleChange} />
                                </section>
                                <button type="button" onClick={() => setCadastro(false)}>Voltar ao Login</button>
                                <button type="submit">Cadastrar</button>
                            </form>
                        </div>
                    ) : (
                        <div>
                            <img src={LogoPicture} alt="Logo Bytebank" style={{ width: 100 }} />
                            <section className="userplaceholder">
                                Email <input type="text" placeholder="Digite aqui seu nome de usuário" name="email" />
                            </section>
                            <section className="userplaceholder">
                                Senha <input type="password" placeholder="Digite aqui sua Senha" name="senha" />
                            </section>
                            <button type="submit">Entrar</button>
                            <button type="button" onClick={() => setCadastro(true)}>Cadastrar</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
