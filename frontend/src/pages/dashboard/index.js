import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/header";
import NavBar from "../../components/navBar";
import "./index.css";
import LineGraph from "../../components/graphic";

function Dashboard() {
  const [filter, setFilter] = useState("todos");
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("todas");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/visualizar/areas",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAreas(response.data);
      } catch (error) {
        console.error("Erro ao visualizar areas:", error);
      }
    };
    fetchData();
  }, []);

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
            <h1 id="access-history-title">Dashboard</h1>
            <div className="filter-container">
              <select id="filter" value={filter} onChange={handleFilterChange}>
                <option value="">Todas as áreas</option>
                {areas.map((area) => (
                  <option key={area._id} value={area.name}>
                    {area.name}
                  </option>
                ))}
              </select>
            </div>
          
          </div>
          <div className="dashboard">
            <div className="dashboard-left">
               <LineGraph/>
            </div>
            <div className="dashboard-right">
                <h2 className="dashboard-right-title"> Tempo sem acesso:</h2>
                <div className="time">
                  <p id="number"> 2 </p>
                  <p> dias </p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
