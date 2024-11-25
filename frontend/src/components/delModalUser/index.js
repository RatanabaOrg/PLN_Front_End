import React, { useState, useEffect, useContext } from 'react';
// import './index.css';
import axios from "axios";
import { AuthContext } from "../../contexts/authContext";

function DelModalUser({ user, onClose }) {
    const [name, setName] = useState('');
    const { logout } = useContext(AuthContext);

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
            const response = await axios.delete(`http://3.212.163.76:8080/deletar/usuario/${user._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                    validateStatus: () => true
                }) 

                if (response.status === 401 || response.status === 400) {
                    logout()
                } else {
                    console.log("Usuário deletado:", response.data);
                    onClose(); 
                } 
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
                <p>Você tem certeza que deseja apagar o usuário <b>{name}</b>?</p>
                <div id="buttons-expanded-modal">
                    <button id="goback-modal" onClick={handleRefuse}>Voltar</button>
                    <button id="del-modal-button" onClick={handleSubmit}>Deletar</button>
                </div>
            </div>
        </div>
    );
}

export default DelModalUser;
