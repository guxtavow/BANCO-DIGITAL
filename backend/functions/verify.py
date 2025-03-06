def VerifyCadastro(name, email, password, repeat_password, cel, repeat_email):
    if not all([name, email, password, repeat_password, cel]):  
        return {"mensagem": "Todos os campos devem ser preenchidos"}, 400
    elif len(password) < 8:
        return {"mensagem": "A senha deve ter pelo menos 8 caracteres"}, 400
    elif password != repeat_password:
        return {"mensagem": "As senhas não coincidem"}, 400
    elif '@' not in email or '.com' not in email:
        return {"mensagem": "Digite um email válido"}, 400
    elif len(cel) < 11 or len(cel) > 13:
        return {"mensagem": "Digite um celular válido"}, 400
    elif repeat_email is not None:
        return {"mensagem": "Email já cadastrado"}, 400
    else:
        return None

def VerifyLogin(email, password):
    if not all([email, password]):
        return {"mensagem": "Todos os campos devem ser preenchidos"}, 400
    elif '@' not in email or '.com' not in email:
        return {"mensagem": "Digite um email válido"}, 400
    elif not email:
        return {"mensagem": "Digite um email!"}, 400
    elif not password:
        return {"mensagem": "Digite uma senha!"}, 400
    else:
        return None