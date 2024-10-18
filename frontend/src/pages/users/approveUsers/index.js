import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../components/header";
import NavBar from "../../../components/navBar";
import { FaTrash } from "react-icons/fa";
import { GoCheckCircleFill } from "react-icons/go";
// import "./index.css";
import ApproveUserModal from "../../../components/approveUserModal";
import DelModalUser from "../../../components/delModalUser";

function ApproveUsers() {
  const [list, setList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/visualizar/usuariosParaAprovar', {
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

  const handleViewClick = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleViewClick2 = (user) => {
    setSelectedUser(user);
    setIsModalVisible2(true);
  };

  const handleModalClose = async () => {
    setIsModalVisible(false);
    setSelectedUser(null);
    await fetchData(); 
  };

  const handleModalClose2 = async () => {
    setIsModalVisible2(false);
    setSelectedUser(null);
    await fetchData(); 
  };

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:3000/visualizar/usuariosParaAprovar', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setList(response.data);
    } catch (error) {
      console.error("Erro ao buscar o histórico de acessos:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <NavBar />
        <div id="visualize-areas-container">
          <h1 id="visualize-areas-title">Aprovar conta</h1>
          {list && list.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th id="name-area" scope="col">Nome</th>
                  <th className="icons-area" scope="col">Aprovar</th>
                  <th className="icons-area" scope="col">Excluir</th>
                </tr>
              </thead>
              <tbody>
                {list.map((value) => (
                  !value.envio && (
                    <tr key={value.id}>
                      <td id="name-area" data-label="Nome">{value.name}</td>
                      <td className="icons-area" onClick={() => handleViewClick(value)} data-label="Aprovar">
                        <GoCheckCircleFill color={'#44A754'} size={35} />
                      </td>
                      <td className="icons-area" onClick={() => handleViewClick2(value)} data-label="Excluir">
                        <FaTrash color={'#D01A1A'} size={30} />
                      </td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
          ) : (
            <tr>
              <td colSpan="3">Nenhum usuário cadastrado.</td>
            </tr>
          )}
        </div>
        {isModalVisible && (
          <ApproveUserModal user={selectedUser} onClose={handleModalClose} />
        )}
        {isModalVisible2 && (
          <DelModalUser user={selectedUser} onClose={handleModalClose2} />
        )}
      </div>
    </>
  );
}

export default ApproveUsers;
