import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Header from "../../components/header";
import NavBar from "../../components/navBar";
import { AuthContext } from "../../contexts/authContext";
import "./index.css";

function AccessHistory() {
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState("todos");
  const { logout } = useContext(AuthContext);

  localStorage.setItem('historico', 'true');

  useEffect(() => {
    const fetchData = async () => {
      var token = localStorage.getItem('token');

      const url = filter === "todos"
        ? 'http://3.212.163.76:8080/visualizar/historico'
        : 'http://3.212.163.76:8080/visualizar/ultimos/acessos';

      try {
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
            ,
            validateStatus: () => true
          }) 
  
          if (response.status === 401 || response.status === 400) {
            logout()
          } else {
            setList(response.data);
          }
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
            <h1 id="access-history-title">Histórico de acessos</h1>
            <div className="filter-container">
              <select id="filter" value={filter} onChange={handleFilterChange}>
                <option value="todos">Todos</option>
                <option value="ultimos">Últimos</option>
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
                      <td data-label="Autorização" style={{
                          color: value.authorization === "Não autorizado" ? "#D01A1A" : 
                          value.authorization === "Autorizado" ? "#44A754" :
                          "#000000"
                        }} >{value.authorization}</td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
            </div>
          ) : (
            <tr>
              <td colSpan="4">Nenhum acesso realizado.</td>
            </tr>
          )}
        </div>
      </div>
    </>
  );
}

export default AccessHistory;
