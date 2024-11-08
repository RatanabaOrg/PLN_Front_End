import { React, useContext } from 'react';
import './index.css';
import axios from "axios";
import { AuthContext } from "../../contexts/authContext";

function DelModalArea({ user, onClose }) {
    const { logout } = useContext(AuthContext);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await axios.delete(`http://localhost:3000/deletar/area/${user._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                    validateStatus: () => true
                }) 

                if (response.status == 401 || response.status == 400) {
                    logout()
                } else {
                    console.log("Área deletada com sucesso:", response.data);
                }
        } catch (error) {
            console.error("Erro ao deletar a área:", error);
            alert("Erro ao tentar deletar a área. Por favor, tente novamente.");
        }

        onClose();
    };

    const handleRefuse = (e) => {
        e.preventDefault();
        onClose();
    };

    return (
        <div id="del-modal">
            <div id="del-modal-content">
                <p>Você tem certeza que deseja apagar a área?</p>
                <div id="buttons-expanded-modal">
                    <button id="goback-modal" onClick={handleRefuse}>Voltar</button>
                    <button id="del-modal-button" onClick={handleSubmit}>Deletar</button>
                </div>
            </div>
        </div>
    );
}

export default DelModalArea;
