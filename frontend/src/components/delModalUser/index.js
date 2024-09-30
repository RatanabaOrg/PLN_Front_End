import React, { useState, useEffect } from 'react';
import './index.css';
import axios from "axios";

function DelModalUser({ user, onClose }) {
    const [name, setName] = useState('');

    useEffect(() => {
        console.log(user);
        
        if (user) {
            setName(user.name);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await axios.delete(`http://localhost:3000/deletar/usuario/${user._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("Usuário deletado:", response.data);
            onClose(); 
        } catch (error) {
            console.error("Erro ao deletar o usuário:", error.response ? error.response.data : error.message);
        }
    };

    const handleRefuse = (e) => {
        e.preventDefault();
        onClose();
    };

    return (
        <div id="del-modal">
            <div id="del-modal-content">
                <p>Você tem certeza que deseja apagar o usuário {name}?</p>
                <div id="buttons-expanded-modal">
                    <button id="goback-modal" onClick={handleRefuse}>Voltar</button>
                    <button id="del-modal-button" onClick={handleSubmit}>Deletar</button>
                </div>
            </div>
        </div>
    );
}

export default DelModalUser;
