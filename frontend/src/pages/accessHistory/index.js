import Header from "../../components/header";
import "./index.css";

function AccessHistory() {
  let list = [
    {
      id: 1,
      nome: "Lara Caires",
      datatime: "15/09/2024 23:00:00",
      area: "Área 3",
    },
    {
      id: 2,
      nome: "Fábio Rodrigues",
      datatime: "15/09/2024 23:00:00",
      area: "Área 2",
    },
    {
      id: 3,
      nome: "Marcos Paulo Lobo",
      datatime: "15/09/2024 23:00:00",
      area: "Área 1",
    },
  ];

  return (
    <>
      <Header />
      <div id="access-history-container">
        <h1 id="access-history-title">Histórico de acessos </h1>
        <table>
          <thead>
            <tr>
              <th scope="col">Data</th>
              <th scope="col">Nome</th>
              <th scope="col">Área</th>
            </tr>
          </thead>
          <tbody>
            {typeof list !== "undefined" &&
              list.map((value) => {
                return !value.envio ? (
                  <tr key={value.id}>
                    <td data-label="Data">{value.datatime}</td>

                    <td data-label="Nome">{value.nome}</td>

                    <td data-label="Área">{value.area}</td>
                  </tr>
                ) : null;
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AccessHistory;
