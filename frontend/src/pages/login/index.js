import React, { useState } from "react";
import "./index.css";
import axios from "axios";
import logo from "../../assets/logo2.png";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';          

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  console.log(localStorage.getItem("historico"))
  if (localStorage.getItem("historico")) {
    localStorage.clear();
  }
   
  if (localStorage.getItem("role")) {
    localStorage.clear();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const loginResponse = await axios.post("http://localhost:3000/login/usuario", {
        email: email,
        password: password,
      });

      if (loginResponse.status === 200) {
        const token = loginResponse.data;

        localStorage.setItem('token', token);

        const userResponse = await axios.get('http://localhost:3000/visualizar/usuarios', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        let userLoged;

        userResponse.data.map(user => {
          if (user.email === email) {
            userLoged = user;
          }
        });
        
        localStorage.setItem('role', userLoged.role);

        if (userLoged.approved) {
          navigate("/historico");
        } else {
          toast.warn("Usuário ainda não foi aprovado.");  
        }
      }
    } catch (error) {
      toast.error("Email ou senha estão incorretos.");  
      console.error("Erro ao fazer login ou visualizar usuários:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <img src={logo} alt="Logo" />
        </div>
        <h2>Login</h2>
        <p>Entre com suas credenciais para acessar sua conta.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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

      {/* Adicionando o ToastContainer para exibir os toasts */}
      <ToastContainer />
    </div>
  );
}

export default Login;
