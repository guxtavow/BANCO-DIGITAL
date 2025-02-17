import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Login from '../pages/LoginPage/Login'
import LoginAPI from '../services/loginForm'

jest.mock('../services/loginForm', () => jest.fn()) //declare a mock function OBS: always out of describe

describe('Test Login component', () => {
    it('Render itens', () => {
        render(<Login />)
        const logo = screen.getByAltText("Logo Bytebank Sidebar") //aside logo on page
        expect(logo).toBeInTheDocument()
        expect(screen.getByAltText('Logo_Bytebank')).toBeInTheDocument() //logo on the login form
        expect(screen.getByText('Email')).toBeInTheDocument(
            screen.getByPlaceholderText('Digite aqui seu email de usuário')
        )
        expect(screen.getByText('Senha')).toBeInTheDocument(
            screen.getByPlaceholderText('Digite aqui sua Senha')
        )
        expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Cadastrar' })).toBeInTheDocument()
    })

    it('Error if no data is filled', () => {
        render(<Login />)
        const button = screen.getByRole('button', { name: 'Entrar' })
        fireEvent.click(button)
        expect(screen.getByText('Todos os campos devem ser preenchidos!')).toBeInTheDocument()
    })

    it('Testing wrong data fill', async () => {
        //Note: not using setTimeout if you to test async. JEST tests is syncronous meanwhile setTimeout is async
        LoginAPI.mockResolvedValueOnce({ logado: false })

        render(<Login />)

        fireEvent.change(screen.getByPlaceholderText('Digite aqui seu email de usuário'), { target: { value: 'email_teste@gmail.com' } })
        fireEvent.change(screen.getByPlaceholderText('Digite aqui sua Senha'), { target: { value: '123456' } })
        const button = screen.getByRole('button', { name: 'Entrar' })
        fireEvent.click(button)

        await waitFor(() => 
            expect(screen.getByText('Email ou senha incorretos!')).toBeInTheDocument()
        )
    })

    it("Testing right data fill", async () => {
        LoginAPI.mockResolvedValueOnce({ logado: true, mensagem: 'Login bem-sucedido!' })

        render(<Login />)

        fireEvent.change(screen.getByPlaceholderText('Digite aqui seu email de usuário'), { target: { value: 'email_teste@gmail.com' } })
        fireEvent.change(screen.getByPlaceholderText('Digite aqui sua Senha'), { target: { value: 'teste' } })
        fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))

        await waitFor(() => 
            expect(screen.getByText('Login bem-sucedido!')).toBeInTheDocument()
        )
    })

})
