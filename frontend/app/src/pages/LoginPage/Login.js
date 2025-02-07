import './Login.css'
import LogoHeader from './imgs/bytebank_logo.png'
import LogoPicture from './imgs/bytebank_pic.png'

export default function Login() {
    return (
        <div className="loginPage">
            <div className="loginContainer">
                <img src={LogoHeader} alt="Logo Bytebank" />
                <div className="loginForm">
                    <img src={LogoPicture} alt="Logo Bytebank" style={{width: 100}}/>
                    <section className="userplaceholder">Usuário <input type="text" placeholder="Digite aqui seu nome de usuario" id="loginUser"/></section>
                    <section className="userplaceholder">Senha <input type="password" placeholder="Digite aqui sua Senha" id="loginUser"/></section>
                    <button type="submit">Entrar</button>
                </div>
            </div>
        </div>
    );
}