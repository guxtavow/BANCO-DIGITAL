from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from models.usuarios import Usuarios, Session
from datetime import datetime
from flask_bcrypt import Bcrypt
from functions.verify import VerifyCadastro, VerifyLogin

app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/', methods=['GET'])
def user():
    session = Session()
    usuarios = session.query(Usuarios).all()
    session.close()
    
    return jsonify([usuario.get_todos_dados() for usuario in usuarios])
        
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    senha_digitada = data.get('senha')
    
    session = Session()
    
    usuario = session.query(Usuarios).filter_by(email=email).first()
    
    error_response = VerifyLogin(email, senha_digitada)
            
    
    if usuario and bcrypt.check_password_hash(usuario.senha, senha_digitada):
        # ----------------------------- datetime atualizing ---------------------------- #
        usuario.ultimo_login = datetime.now()
        
        login_data = usuario.ultimo_login
        try:
            session.commit()
            session.close()
        except:
            session.rollback()
            session.close()
        # ----------------------------- datetime atualizing ---------------------------- #

        return jsonify({
            'mensagem': 'Login bem-sucedido!',
            "login_data": login_data,
            "logado":True
            }), 200
    else:
        if error_response:
            session.close()
            return jsonify(error_response),400
        else:
            session.close()
            return jsonify({
                "logado":False,
                'mensagem': 'Email ou senha incorretos!'
                }), 401
        
@app.route('/cadastro', methods=['POST'])
def cadastro():
    data = request.get_json()
    nome = data.get('nome')
    email = data.get("email")
    senha = data.get("senha")
    confirmar_senha = data.get("confirmar_senha")
    celular = data.get("celular")
    
    session = Session()

    email_check = session.query(Usuarios).filter_by(email=email).first()
    
    error_response = VerifyCadastro(nome, email, senha, confirmar_senha, celular, email_check) #Verify required fields
    
    if error_response:
        session.close()
        return jsonify(error_response),400
    else:
        Usuarios.criar_usuarios(session, nome, email, senha, celular, bcrypt)
        session.close()
            
        return jsonify({
            "mensagem": "Cadastro realizado com sucesso"
        }),200

if __name__ == '__main__':
    app.run(debug=True)

    