import './Login.css'
import { useState } from 'react'
import LogoHeader from './imgs/bytebank_logo.png'
import LogoPicture from './imgs/bytebank_pic.png'
import loginAPI from '../../services/loginForm'
import CadastroAPI from '../../services/cadastroForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'


export default function Login() {
    const [loginEmail, setLoginEmail] = useState("")
    const [loginSenha, setLoginSenha] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [exibirSenha, setExibirSenha] = useState(false) //mostrar ou não digitar senha
    const [Cadastro, setCadastro] = useState(false)
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmar_senha: '',
        celular: ''
    })
    const [loading, setLoading] = useState(false)

    /* ---------------------------- LOGIN DE USUARIO ---------------------------- */
    const LoginUsuario = async (e) => {
        e.preventDefault()
        setLoading(true)
        if(loginEmail === '' || loginSenha === '') {
            setLoading(false)
            setError('Todos os campos devem ser preenchidos!')
        }
        try {
            const response = await loginAPI(loginEmail, loginSenha)
            console.log(response)
            if (response.logado === true) {
                setLoading(false)    
                setSuccess(response.mensagem)
                //localStorage.setItem("logado","true")
            }else{
                setLoading(false)    
                setError("Email ou senha incorretos!")
                response.logado = false
            }
            
        } catch (err) {
            setError(err.message)
        }
    }

    const mudarExibirSenha = () => {
        setExibirSenha(!exibirSenha)
    }


    /* -------------------------- CADASTRO DE USUARIO ------------------------- */
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const CadastroUsuario = async (e) => {
        e.preventDefault()
        if(formData.nome === '' || formData.email === '' || formData.senha === '' || formData.confirmar_senha === '' || formData.celular === '') {
            setError('Todos os campos devem ser preenchidos')            
        }
        if (formData.senha.length <= 8) {
            setError('A senha deve ter pelo menos 8 caracteres')
        }
        if (formData.senha !== formData.confirmar_senha) {
            setError('As senhas não coincidem')
            return
        }
        try {
            const response = await CadastroAPI(formData)
            setSuccess(response.mensagem)
        } catch (err) {
            setSuccess(err.message)
        }
    }

    return (
        <div className="loginPage">
            <div className="loginContainer">
                <img src={LogoHeader} alt="Logo Bytebank Sidebar" />
                <div className="loginForm">
                    {Cadastro ? (
                        /* -------------------------------- CADASTRO -------------------------------- */
                        <div className='cadastroForm'>
                            <form onSubmit={CadastroUsuario}>
                                <section className="userplaceholder">
                                    Nome <input type="text" placeholder="Digite seu nome completo" name="nome" value={formData.nome} onChange={handleChange} />
                                </section>
                                <section className="userplaceholder">
                                    Email <input type="text" placeholder="Digite seu email" name="email" value={formData.email} onChange={handleChange} />
                                </section>
                                <section className="userplaceholder">
                                    Senha <input type={exibirSenha ? "password" : "text"} placeholder="Digite aqui sua Senha de acesso" name="senha" value={formData.senha} onChange={handleChange} />
                                    <FontAwesomeIcon 
                                    icon={exibirSenha ? faEye : faEyeSlash} onClick={mudarExibirSenha} 
                                    style={{ cursor: 'pointer', display:'inline-flex',justifyContent:'center', alignItems:'center' }}
                                    />
                                </section>
                                <section className="userplaceholder">
                                    Confirmar Senha <input type={exibirSenha ? "password" : "text"} placeholder="Digite novamente sua senha" name="confirmar_senha" value={formData.confirmar_senha} onChange={handleChange} />
                                    <FontAwesomeIcon 
                                    style={{ cursor: 'pointer', display:'inline-flex',justifyContent:'center', alignItems:'center', position:'absolute' }}
                                    />
                                </section>
                                <section className="userplaceholder">
                                    Celular <input type="text" placeholder="Digite aqui seu Celular" name="celular" value={formData.celular} onChange={handleChange} />
                                </section>
                                <button className='botaologin' type="button" onClick={() => setCadastro(false)}>Voltar ao Login</button>
                                <button className='botaologin' type="submit">Cadastrar</button>
                            </form>
                        </div>
                    ) : (
                        /* ---------------------------------- LOGIN --------------------------------- */
                        <div>
                            {loading ?                             
                            <>
                                <img src={LogoPicture} alt="Logo_Bytebank" style={{ width: 100 }} /><br />
                                <div className="spinner-grow text-primary" role="status" style={{ width: '3rem', height: '3rem', margin:'20px' }}>
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </>
                            :
                            <>
                                <img src={LogoPicture} alt="Logo_Bytebank" style={{ width: 100 }} />
                                <form onSubmit={LoginUsuario}>
                                    <section className="userplaceholder">
                                        Email <input type="text" placeholder="Digite aqui seu email de usuário" name="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}/>
                                    </section>
                                    <section className="userplaceholder">
                                        Senha <input type={exibirSenha ? "password" : "text"} placeholder="Digite aqui sua Senha" name="senha" value={loginSenha} onChange={(e) => setLoginSenha(e.target.value)} /> 
                                        <FontAwesomeIcon 
                                        icon={exibirSenha ? faEyeSlash : faEye} onClick={mudarExibirSenha} 
                                        style={{ cursor: 'pointer', display:'inline-flex',justifyContent:'center', alignItems:'center', fontSize:'1rem' }}
                                        />
                                    </section>
                                    {success && <p style={{ color: 'green', width:'auto'}}>{success}</p>}
                                    {error && <p style={{ color: 'red', width:'auto'}}>{error}</p>}
                                    <button className='botaologin' type="submit">Entrar</button>
                                    <button className='botaologin' type="button" onClick={() => setCadastro(true)}>Cadastrar</button>
                                </form>
                            </>
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
