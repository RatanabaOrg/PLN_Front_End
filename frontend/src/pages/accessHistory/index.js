import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/header";
import "./index.css";

function AccessHistory() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/visualizar');
        console.log(response);
        
        setList(response.data);
      } catch (error) {
        console.error("Erro ao buscar o histórico de acessos:", error);
      }
    };

    fetchData();
  }, []); 

  return (
    <>
      <Header />
      <div id="access-history-container">
        <h1 id="access-history-title">Histórico de acessos</h1>
        <table>
          <thead>
            <tr>
              <th scope="col">Data</th>
              <th scope="col">Nome</th>
              <th scope="col">Área</th>
            </tr>
          </thead>
          <tbody>
            {list.length > 0 ? (
              list.map((value) => (
                !value.envio && (
                  <tr key={value.id}>
                    <td data-label="Data">{value.data}</td>
                    <td data-label="Nome">{value.nome}</td>
                    <td data-label="Área">{value.area}</td>
                  </tr>
                )
              ))
            ) : (
              <tr>
                <td colSpan="3">Nenhum histórico encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AccessHistory;



//   [
//   {
//     id: 1,
//     nome: "Lara Caires",
//     datatime: "15/09/2024 23:00:00",
//     area: "Área 3",
//   },
//   {
//     id: 2,
//     nome: "Fábio Rodrigues",
//     datatime: "15/09/2024 23:00:00",
//     area: "Área 2",
//   },
//   {
//     id: 3,
//     nome: "Marcos Paulo Lobo",
//     datatime: "15/09/2024 23:00:00",
//     area: "Área 1",
//   },
// ];