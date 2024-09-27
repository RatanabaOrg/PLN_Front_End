import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../components/header";
import NavBar from "../../../components/navBar";
import { FiFileText } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import "./index.css";

function VisualizeAreas() {
  const [list, setList] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/visualizar/areas');
      setList(response.data);
    } catch (error) {
      console.error("Erro ao buscar o histórico de acessos:", error);
    }
  };

  const deleteArea = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/deletar/area/${id}`);
      fetchData();
      console.log(`Área com ID ${id} excluída com sucesso.`);
    } catch (error) {
      console.error(`Erro ao excluir a área com ID ${id}:`, error);
    }
  };

  useEffect(() => {
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
          <h1 id="visualize-areas-title">Visualizar Áreas</h1>
          {list && list.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th id="name-area" scope="col">Nome</th>
                  <th className="icons-area" scope="col">Visualizar</th>
                  <th className="icons-area" scope="col">Excluir</th>
                </tr>
              </thead>
              <tbody>
                {list.map((value) => (
                  !value.envio && (
                    <tr key={value.id}>
                      <td id="name-area" data-label="Nome">{value.name}</td>
                      <td className="icons-area" data-label="Visualizar">
                        <FiFileText className="icon-file-text" color={'#0A8FEF'} size={25} />
                      </td>
                      <td className="icons-area" data-label="Excluir">
                        <FaTrash 
                          color={'#D01A1A'} 
                          size={25} 
                          onClick={() => deleteArea(value._id)} 
                          style={{ cursor: 'pointer' }} 
                        />
                      </td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
          ) : (
            <tr>
              <td colSpan="3">Nenhuma área cadastrada.</td>
            </tr>
          )}
        </div>
      </div>
    </>
  );
}

export default VisualizeAreas;
