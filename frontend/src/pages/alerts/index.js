import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/header";
import NavBar from "../../components/navBar";
// import "./index.css";

function Alerts() {
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState("todos");

  useEffect(() => {
    const fetchData = async () => {
      var token = localStorage.getItem('token');
      const url = `http://localhost:3000/visualizar/historico/alerta/${filter}`
      
      try {
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data)
        setList(response.data);
      } catch (error) {
        console.error("Erro ao buscar o histórico de acessos:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, [filter]); 

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <Header />
      <div className="container">
        <NavBar />
        <div id="access-history-container">
          <div class="title-filter">
            <h1 id="access-history-title">Alertas</h1>
            <div className="filter-container">
              <select id="filter" value={filter} onChange={handleFilterChange}>
                <option value="todos">Todos</option>
                <option value="Moderado">Moderado</option>
                <option value="Alto">Alto</option>
                <option value="Crítico">Crítico</option>
              </select>
            </div>
          </div>

          {list && list.length > 0 ? (
            <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th scope="col">Data</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Área</th>
                  <th scope="col">Alerta</th>
                </tr>
              </thead>
              <tbody>
                {list.map((value) => (
                  !value.envio && (
                    <tr key={value.id}>
                      <td data-label="Data">{value.data}</td>
                      <td data-label="Nome">{value.name}</td>
                      <td data-label="Área">{value.area}</td>
                      <td data-label="Alerta" style={{
                          color: value.alert === "Moderado" ? "#4A90E2" :
                          value.alert === "Alto" ? "#FFA500" :
                          value.alert === "Crítico" ? "#D01A1A" :
                          "#000000"
                        }} >{value.alert}</td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
            </div>
          ) : (
            <tr>
              <td colSpan="4">Nenhum alerta emitido.</td>
            </tr>
          )}
        </div>
      </div>
    </>
  );
}

export default Alerts;
