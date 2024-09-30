import React from 'react';
import './index.css';
import axios from "axios";

function DelModalArea({ user, onClose }) {
    console.log(user);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await axios.delete(`http://localhost:3000/deletar/area/${user._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("Área deletada com sucesso:", response.data);
            // Você pode adicionar lógica adicional aqui, como uma atualização do estado ou uma notificação
        } catch (error) {
            console.error("Erro ao deletar a área:", error);
            alert("Erro ao tentar deletar a área. Por favor, tente novamente."); // Feedback para o usuário
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
