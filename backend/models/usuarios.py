from sqlalchemy import create_engine, Column, Integer, String, DateTime, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from flask_bcrypt import Bcrypt

DATABASE_URL = "postgresql://postgres:gusta@localhost:5432/postgres"
engine = create_engine(DATABASE_URL)
Base = declarative_base()
Session = sessionmaker(bind=engine)

class Usuarios(Base):
    __tablename__ = 'usuario'

    id = Column(Integer, primary_key=True)
    nome = Column(String)
    email = Column(String)
    senha = Column(String)
    celular = Column(Integer)
    data_cadastro = Column(DateTime, default=func.now(), nullable=False)  # Registra a data automaticamente
    ultimo_login = Column(DateTime, onupdate=func.now())  # Atualiza no login

    
    def get_todos_dados(self):
        return{
            "ID": self.id,
            "Nome": self.nome,
            "Email": self.email,
            "Celular": self.celular,
            "DATACADASTRO": self.data_cadastro,
            "ULTIMOLOGIN": self.ultimo_login
        }
    
    
    @classmethod
    def criar_usuarios(cls, session, nome, email, senha, celular, bcrypt):
        senha_hash = bcrypt.generate_password_hash(senha).decode('utf-8')
        novo_usuario = cls(
            nome=nome,
            email=email,
            senha=senha_hash,
            celular=celular,
            data_cadastro=datetime.now(),
            ultimo_login=datetime.now()  
        )

        session.add(novo_usuario)
        session.commit()
        return novo_usuario        
        
