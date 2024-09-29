import React from "react";
import "./index.css";
import logo from "../../assets/logo2.png";
import { Link } from 'react-router-dom';

function SignIn() {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <img src={logo} alt="Logo" />
        </div>
        <h2>Criar uma conta</h2>
        <p>Preencha os campos abaixo para começar</p>
        <form>
          <div className="input-group">
            <label htmlFor="name">Nome</label>
            <input type="text" id="name" placeholder="Nome" />
          </div>
          <div className="input-group">
            <label htmlFor="phone">Telefone</label>
            <input type="tel" id="phone" placeholder="(00) 0 0000-0000" />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Email" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" placeholder="Senha" />
          </div>
          <button type="submit" className="btn-login">
            Entrar
          </button>
        </form>

        <div className="create-account">
          <span>Já possui uma conta? </span>
          <Link to="/entrar" className="create">Entrar</Link>
        </div>
      </div>
      <footer>
        <p>&copy; 2024 Ratanaba</p>
        <p>Altave</p>
      </footer>
    </div>
  );
}

export default SignIn;
