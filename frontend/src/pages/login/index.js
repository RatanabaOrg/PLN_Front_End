import React from "react";
import "./index.css";
import logo from "../../assets/logo2.png";
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <img src={logo} alt="Logo" />
        </div>
        <h2>Login</h2>
        <p>Entre com suas credenciais para acessar sua conta.</p>
        <form>
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
          <span>Não possui uma conta? </span>
          <Link to="/criarconta" className="create">Criar</Link>
        </div>
      </div>
      <footer>
        <p>&copy; 2024 Ratanaba</p>
        <p>Altave</p>
      </footer>
    </div>
  );
}

export default Login;
