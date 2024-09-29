import React, { useState, useEffect } from 'react';
import './index.css';
import axios from "axios";

function DelModalUser({ user, onClose }) {
    const [name, setName] = useState(user?.name || '');

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name
        };

        try {
            const response = await axios.del(`http://localhost:3000/visualizar/usuario/${user.id}`, formData);
            console.log(response.data);
        } catch (error) {
            console.error("Erro ao pegar os dados:", error);
        }

        setName('');
        onClose();
    };

    const handleRefuse = (e) => {
        e.preventDefault();
        onClose();
    };

    return (
        <div id="del-modal">
            <div id="del-modal-content">
                <p>Você tem certeza que deseja apagar o usuário?</p>
                    <div id="buttons-expanded-modal">
                        <button id="goback-modal" onClick={handleRefuse}>Voltar</button>
                        <button id="del-modal-button">Deletar</button>
                    </div>
            </div>
        </div>
    );
}

export default DelModalUser;
