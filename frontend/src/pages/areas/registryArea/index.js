import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../components/header";
import NavBar from "../../../components/navBar";
import "./index.css";

function RegistryArea() {

  const [name, setName] = useState("");
  const [securityLevel, setSecurityLevel] = useState("");
  const [areaCode, setAreaCode] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      "name": name,
      "security": securityLevel,
      "area": areaCode,
      "location": location,
      "description": description,
    };

    console.log(formData);


    try {
      const response = await axios.post("http://localhost:3000/cadastro/area", formData);
      console.log("Dados salvos com sucesso:", response.data);
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
    }

    setName('');
    setSecurityLevel('');
    setAreaCode('');
    setLocation('');
    setDescription('');
  };

  return (
    <>
      <Header />
      <div className="container">
        <NavBar />
        <div id="registry-areas-container">
          <form id="form-area" onSubmit={handleSubmit}>
            <div className="input-div-areas">
              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input type="text" id="name" name="name" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="security-level">Nível de segurança</label>
                <select id="security-level" name="security-level" value={securityLevel} onChange={(e) => setSecurityLevel(e.target.value)}>
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
                    value={areaCode}
                    onChange={(e) => setAreaCode(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="location">Localização</label>
                  <textarea
                    id="location"
                    name="location"
                    placeholder="Localização"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="form-group description">
                <label htmlFor="description">Descrição</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Descrição"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div id="button-div">
              <button type="submit" className="submit-button">
                Salvar 
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegistryArea;
