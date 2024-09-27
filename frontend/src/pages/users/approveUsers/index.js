import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../components/header";
import NavBar from "../../../components/navBar";
import { FaTrash } from "react-icons/fa";
import { GoCheckCircleFill } from "react-icons/go"
import "./index.css";

function ApproveUsers() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/visualizar/usuariosParaAprovar');
        setList(response.data);
      } catch (error) {
        console.error("Erro ao buscar o histórico de acessos:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []); 

  return (
    <>
      <Header />
      <div className="container">
        <NavBar />
        <div id="visualize-areas-container">
          <h1 id="visualize-areas-title">Aprovar conta</h1>
          {list && list.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th id="name-area"scope="col">Nome</th>
                  <th className="icons-area" scope="col">Aprovar</th>
                  <th className="icons-area" scope="col">Excluir</th>
                </tr>
              </thead>
              <tbody>
                  {list.map((value) => (
                    !value.envio && (
                      <tr key={value.id}>
                        <td id="name-area" data-label="Nome">{value.name}</td>
                        <td className="icons-area" data-label="Visualizar"><GoCheckCircleFill color={'#44A754'} size={35}/></td>
                        <td className="icons-area" data-label="Excluir"><FaTrash color={'#D01A1A'} size={30}/></td>
                      </tr>
                    )
                  ))}
              </tbody>
            </table>): (
              <tr>
                <td colSpan="3">Nenhuma área cadastrada.</td>
              </tr>
            )}
        </div>
      </div>
    </>
  );
}

export default ApproveUsers;