import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/header";
import NavBar from "../../components/navBar";
import "./index.css";

function AccessHistory() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      var token = localStorage.getItem('token');

      try {
        const response = await axios.get('http://localhost:3000/visualizar/historico', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
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
        <div id="access-history-container">
          <h1 id="access-history-title">Histórico de acessos</h1>
          {list && list.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th scope="col">Data</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Área</th>
                  <th scope="col">Autorização</th>
                </tr>
              </thead>
              <tbody>
                  {list.map((value) => (
                    !value.envio && (
                      <tr key={value.id}>
                        <td data-label="Data">{value.data}</td>
                        <td data-label="Nome">{value.name}</td>
                        <td data-label="Área">{value.area}</td>
                        <td data-label="Área">{value.authorization}</td>
                      </tr>
                    )
                  ))}
              </tbody>
            </table>): (
              <tr>
                <td colSpan="3">Nenhum acesso realizado.</td>
              </tr>
            )}
        </div>
      </div>
    </>
  );
}

export default AccessHistory;