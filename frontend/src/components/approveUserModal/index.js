import React, { useState, useEffect } from 'react';
import './index.css';
import axios from "axios";

function ApproveUserModal({ user, onClose }) {
    const [name, setName] = useState(user?.name || '');
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user]);

    const handleUserUpdate = async (role) => {
        console.log(user);
        
        const token = localStorage.getItem('token');

        try {
            const response = await axios.put(`http://localhost:3000/atualizar/usuario/${user._id}`, 
                {
                    "approved": true,
                    "role": role
                }, 
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            console.log(response.data);
            onClose(); 
        } catch (error) {
            console.error("Erro ao atualizar o usuário:", error);
            setError("Erro ao atualizar o usuário. Tente novamente.");
        }
    };

    return (
        <div id="del-modal">
            <div id="del-modal-content">
                <p>O usuário possui qual cargo?</p>
                <div id="buttons-expanded-modal">
                    <button id="func-modal" onClick={() => handleUserUpdate("funcionario")}>Porteiro</button>
                    <button onClick={() => handleUserUpdate("adm")} id="adm">Administrador</button>
                </div>
            </div>
        </div>
    );
}

export default ApproveUserModal;
