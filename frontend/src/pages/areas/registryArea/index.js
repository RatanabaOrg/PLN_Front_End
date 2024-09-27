import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../components/header";
import NavBar from "../../../components/navBar";
import "./index.css";

function RegistryArea() {
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/visualizar");
    } catch (error) {
      console.error("Erro ao buscar o histórico de acessos:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <NavBar />
        <div id="registry-areas-container">
          <form id="form-area">
            <div className="input-div-areas">
              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input type="text" id="name" name="name" placeholder="Nome" />
              </div>

              <div className="form-group">
                <label htmlFor="security-level">Nível de segurança</label>
                <select id="security-level" name="security-level">
                  <option value="" disabled selected>
                    Selecione
                  </option>
                  <option value="1">Baixo</option>
                  <option value="2">Médio</option>
                  <option value="3">Alto</option>
                </select>
              </div>
            </div>

            <div className="input-div-areas">
              <div className="input-div-left">
                <div className="form-group">
                  <label htmlFor="area-code">Código da Área</label>
                  <input
                    type="text"
                    id="area-code"
                    name="area-code"
                    placeholder="Código"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="location">Localização</label>
                  <textarea
                    id="location"
                    name="location"
                    placeholder="Localização"
                  ></textarea>
                </div>
              </div>
              <div className="form-group description">
                <label htmlFor="description">Descrição</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Descrição"
                ></textarea>
              </div>
            </div>
            <div id="button-div">
              <button type="submit" className="submit-button">
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegistryArea;
