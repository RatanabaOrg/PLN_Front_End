import React, { useState } from "react";
import logo from "../../assets/logo2.png";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
// import "./index.css";

function SignIn() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/cadastro/usuario", {
        name: name,
        email: email,
        telephone: phone,
        password: password,
        approved: false,
        role: ""
      });

      if (response.status === 200) {
        toast.success("Conta criada com sucesso! Espere ser aprovado.");
        setName('');
        setPhone('');
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      toast.error("Erro ao criar a conta. Verifique os dados");
      console.error("Erro no cadastro:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="signin-container">
      <div className="login-box">
        <div className="login-logo">
          <img src={logo} alt="Logo" />
        </div>
        <h2>Criar uma conta</h2>
        <p>Preencha os campos abaixo para começar</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="phone">Telefone</label>
            <input
              type="tel"
              id="phone"
              placeholder="(00) 0 0000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
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
            Criar conta
          </button>
        </form>

        <div className="create-account">
          <span>Já possui uma conta? </span>
          <Link to="/" className="create">Entrar</Link>
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

export default SignIn;
