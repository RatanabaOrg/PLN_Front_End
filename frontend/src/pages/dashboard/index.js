import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Header from "../../components/header";
import NavBar from "../../components/navBar";
import LineGraph from "../../components/graphic";
import { AuthContext } from "../../contexts/authContext";
import "./index.css";

function Dashboard() {
  const [filter, setFilter] = useState("todos");
  const [areas, setAreas] = useState([]);
  const [historicos, setHistoricos] = useState([]);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [diaSemAcesso, setDiaSemAcesso] = useState();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch areas
        const responseAreas = await axios.get("http://3.212.163.76:8080/visualizar/areas", {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          validateStatus: () => true
        });

        if (responseAreas.status === 401 || responseAreas.status === 400) {
          logout();
        } else {
          setAreas(responseAreas.data);
        }

        // Fetch historico
        const responseHistorico = await axios.get("http://3.212.163.76:8080/visualizar/historico", {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          validateStatus: () => true
        });

        if (responseHistorico.status === 401 || responseHistorico.status === 400) {
          logout();
        } else {
          setHistoricos(responseHistorico.data);
        }

        // Fetch days without access based on filter
        let response;
        console.log(filter);
        if (filter === "todos") {
          console.log(token);
          
          response = await axios.get(`http://3.212.163.76:8080/maiorTempoSemAcesso`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response);
          console.log(response.data.diasSemAcesso);
          setDiaSemAcesso(response.data.diasSemAcesso);

        } else {
          response = await axios.post(
            `http://3.212.163.76:8080/diasSemAcesso/`,
            { area: filter },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          console.log(response);
          console.log(response.data.diasSemAcesso);
          setDiaSemAcesso(response.data.diasSemAcesso);
        }


      } catch (error) {
        console.error("Erro ao visualizar áreas:", error);
      }
    };

    fetchData();

    const hoje = new Date();
    const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    const diaAtual = new Date();

    setDataInicio(primeiroDia.toISOString().substring(0, 10));
    setDataFim(diaAtual.toISOString().substring(0, 10));

  }, [filter]);


  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDataInicioChange = (event) => {
    const selectedDate = event.target.value;
    if (dataFim && selectedDate > dataFim) {
      alert("A data de início não pode ser maior que a data de fim.");
    } else {
      setDataInicio(selectedDate);
    }
  };

  const handleDataFimChange = (event) => {
    const selectedDate = event.target.value;
    const currentDate = new Date().toISOString().split("T")[0];
    if (selectedDate > currentDate) {
      alert("A data de fim não pode ser maior que a data atual.");
    } else if (dataInicio && selectedDate < dataInicio) {
      alert("A data de fim não pode ser menor que a data de início.");
    } else {
      setDataFim(selectedDate);
    }
  };

  const filteredHistoricos = filter === "todos"
    ? historicos
    : historicos.filter((historico) => historico.area === filter);

  function contarAcessosPorDia(logs) {
    const contagemPorDia = {};
    const inicio = new Date(dataInicio);
    inicio.setDate(inicio.getDate() + 1);
    const fim = new Date(dataFim);
    fim.setDate(fim.getDate() + 1);

    logs.forEach(log => {
      const [dataStr] = log.data.split(' ');
      const [dia, mes, ano] = dataStr.split('/');
      const dataLog = new Date(`${ano}-${mes}-${dia}`);

      if (dataLog >= inicio && dataLog <= fim) {
        const dataFormatada = `${dia}/${mes}`;
        contagemPorDia[dataFormatada] = (contagemPorDia[dataFormatada] || 0) + 1;
      }
    });

    const dadosCompletos = [];
    let currentDate = new Date(inicio);

    while (currentDate <= fim) {
      const dia = String(currentDate.getDate()).padStart(2, '0');
      const mes = String(currentDate.getMonth() + 1).padStart(2, '0');
      const dataFormatada = `${dia}/${mes}`;

      dadosCompletos.push({
        data: dataFormatada,
        acessos: contagemPorDia[dataFormatada] || 0,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dadosCompletos;
  }

  const log = contarAcessosPorDia(filteredHistoricos);
  const dadosOrdenados = log.sort((a, b) => {
    const [diaA, mesA] = a.data.split('/').map(Number);
    const [diaB, mesB] = b.data.split('/').map(Number);

    return mesA !== mesB ? mesA - mesB : diaA - diaB;
  });

  return (
    <>
      <Header />
      <div className="container">
        <NavBar />
        <div id="access-history-container">
          <div className="title-filter dash">
            <h1 id="access-history-title">Acessos ao longo do tempo</h1>
            <div className="filter-dash-container">
              <select id="filter" value={filter} onChange={handleFilterChange}>
                <option value="todos">Todas as áreas</option>
                {areas.map((area) => (
                  <option key={area._id} value={area.name}>
                    {area.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="filter-dash-container">
            <form className="filter-form">
              <div className="filter-content">
                <label htmlFor="start-date">Data de Início:</label>
                <input
                  type="date"
                  id="filter"
                  name="start-date"
                  value={dataInicio}
                  onChange={handleDataInicioChange}
                />
              </div>
              <div className="filter-content">
                <label htmlFor="end-date">Data de Fim:</label>
                <input
                  type="date"
                  id="filter"
                  name="end-date"
                  value={dataFim}
                  onChange={handleDataFimChange}
                />
              </div>
            </form>
          </div>
          <div className="dashboard">
            <div className="dashboard-left">
              <LineGraph data={dadosOrdenados} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
