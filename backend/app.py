from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from models.usuarios import Usuarios, Session
import datetime

app = Flask(__name__)
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
    senha = data.get('senha')
    
    session = Session()
    
    usuario = session.query(Usuarios).filter_by(email=email, senha=senha).first()
    
    session.close()
    
    if usuario and usuario.senha == senha:
        session = Session()
        ultimo_login = datetime.datetime.now()
        usuario.ultimo_login = ultimo_login
        session.commit()
        session.close()
        return jsonify({
            'mensagem': 'Login bem-sucedido',
            "login_data": usuario.ultimo_login,
            "logado":True
            }), 200
    else:
        return jsonify({
            "logado":False,
            'mensagem': 'Usuario ou senha inválida'
            }), 401
        
@app.route('/cadastro', methods=['POST'])
def cadastro():
    data = request.get_json()
    nome = data.get('nome')
    email = data.get("email")
    senha = data.get("senha")
    confirmar_senha = data.get("confirmar_senha")
    celular = data.get("celular")
    
    if senha != confirmar_senha:
        return jsonify({
            "mensagem": "As senhas não coincidem"
        }), 400
        
    
    
    session = Session()
    
    novo_usuario = Usuarios(
        nome=nome,
        email=email,
        senha=senha,
        celular=celular,
        data_cadastro=datetime.datetime.now(),
        ultimo_login=datetime.datetime.now()  
    )
    
    session.add(novo_usuario)
    session.commit()
    session.close()
    
    return jsonify({
        "mensagem": "Cadastro realizado com sucesso"
    })

if __name__ == '__main__':
    app.run(debug=True)

    