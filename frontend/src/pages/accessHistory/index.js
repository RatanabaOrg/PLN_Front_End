import Header from '../../components/header'
import './index.css'

function AccessHistory() {
  let list;
    return (
      <>
        <Header/>
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
                        {/* {typeof list !== 'undefined' && list.map((value) => {
                            return !value.envio ? */}
                                    <tbody>
                                        <tr>
                                          <td data-label="Data">15/09/2024 23:00:00</td>

                                          <td data-label="Nome">Lara Caires</td>

                                          <td data-label="Área">Área 3</td>
                                        </tr>
                                        <tr>
                                          <td data-label="Data">15/09/2024 23:00:00</td>

                                          <td data-label="Nome">Fábio Rodrigues</td>

                                          <td data-label="Área">Área 2</td>
                                        </tr>
                                    </tbody>
                            {/* :null */}
                        {/* })} */}
                    </table>
        </div>
      </>
    );
  }
  
export default AccessHistory;