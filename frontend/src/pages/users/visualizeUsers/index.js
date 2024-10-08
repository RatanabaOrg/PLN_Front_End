import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../components/header";
import NavBar from "../../../components/navBar";
import ViewModalUser from "../../../components/viewModalUser";
import DelModalUser from "../../../components/delModalUser";
import { FiFileText } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import "./index.css";

function VisualizeUsers() {
  const [list, setList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/visualizar/usuarios", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
        );
        setList(response.data);
      } catch (error) {
        console.error("Erro ao buscar o histórico de acessos:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, [isModalVisible]);

  const handleViewClick = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
    console.log(selectedUser);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const handleViewClick2 = (user) => {
    setSelectedUser(user);
    setIsModalVisible2(true);
  };

  const handleModalClose2 = () => {
    setIsModalVisible2(false);
    setSelectedUser(null);
  };

  return (
    <>
      <Header />
      <div className="container">
        <NavBar />
        <div id="visualize-users-container">
          <h1 id="visualize-users-title">Visualizar Usuários</h1>
          {list && list.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th id="name-area" scope="col">
                    Nome
                  </th>
                  <th className="icons-area" scope="col">
                    Visualizar
                  </th>
                  <th className="icons-area" scope="col">
                    Excluir
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.map(
                  (value) =>
                    !value.envio && (
                      <tr key={value.id}>
                        <td id="name-area" data-label="Nome">
                          {value.name}
                        </td>
                        <td
                          className="icons-area"
                          data-label="Visualizar"
                          onClick={() => handleViewClick(value)}
                          style={{ cursor: 'pointer' }}
                        >
                          <FiFileText
                            className="icon-file-text"
                            color={"#0A8FEF"}
                            size={25}
                          />
                        </td>
                        <td
                          className="icons-area"
                          data-label="Excluir"
                          onClick={() => handleViewClick2(value)}
                          style={{ cursor: 'pointer' }}
                        >
                          <FaTrash color={"#D01A1A"} size={25} />
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          ) : (
            <tr>
              <td colSpan="3">Nenhum usuário cadastrado.</td>
            </tr>
          )}

          {isModalVisible && (
            <ViewModalUser user={selectedUser} onClose={handleModalClose} />
          )}

          {isModalVisible2 && (
            <DelModalUser user={selectedUser} onClose={handleModalClose2} />
          )}
        </div>
      </div>
    </>
  );
}

export default VisualizeUsers;
