import { useState, useContext } from "react";
import axios from "axios";
import Header from "../../../components/header";
import NavBar from "../../../components/navBar";
import { AuthContext } from "../../../contexts/authContext";
import "./index.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegistryArea() {
  const [name, setName] = useState("");
  const [securityLevel, setSecurityLevel] = useState("");
  const [areaCode, setAreaCode] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const { logout } = useContext(AuthContext);
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    const formData = {
      name,
      security: securityLevel,
      code: areaCode,
      location,
      description,
    };

    console.log(formData);

    try {
      const response = await axios.post(
        "http://3.212.163.76:8080/cadastro/area",
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
            validateStatus: () => true
        }) 

        if (response.status === 401 || response.status === 400) {
          logout()
        } else {
          toast.success("Dados salvos com sucesso.");
          resetForm();
        }
      
    } catch (error) {
      console.error("Erro ao salvar os dados:", error.response ? error.response.data : error.message);
      toast.error("Erro ao salvar os dados.");
    }
  };

  const resetForm = () => {
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
              <div className="input-div-areas2">
                <div className="form-group">
                  <label htmlFor="name">Nome</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="area-code">Código da área</label>
                  <input
                    type="text"
                    id="area-code"
                    name="area-code"
                    placeholder="Código"
                    value={areaCode}
                    onChange={(e) => setAreaCode(e.target.value)}
                  />
                </div>
                <div className="form-group location">
                  <label htmlFor="location">Localização</label>
                  <textarea
                    id="location"
                    name="location"
                    placeholder="Localização"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="input-div-areas2">
                <div className="form-group">
                  <label htmlFor="security-level">Nível de segurança</label>
                  <select
                    id="security-level"
                    name="security-level"
                    value={securityLevel}
                    onChange={(e) => setSecurityLevel(e.target.value)}
                  >
                    <option value="" disabled>
                      Selecione
                    </option>
                    <option value="Baixo">Baixo</option>
                    <option value="Medio">Médio</option>
                    <option value="Alto">Alto</option>
                  </select>
                </div>
                <div className="form-group description">
                  <label htmlFor="description">Descrição</label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div id="button-div">
              <button type="submit" className="submit-button">
                Salvar
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default RegistryArea;
