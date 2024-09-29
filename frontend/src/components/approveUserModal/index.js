import React, { useState, useEffect } from 'react';
import './index.css';
import axios from "axios";

function ApproveUserModal({ user, onClose }) {
    const [name, setName] = useState(user?.name || '');

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user]);

    const handleAdm = async (e) => {
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

    const handleFunc = (e) => {
        e.preventDefault();
        onClose();
    };

    return (
        <div id="del-modal">
            <div id="del-modal-content">
                <p>O usuário possui qual cargo?</p>
                    <div id="buttons-expanded-modal">
                        <button id="func-modal" onClick={handleFunc}>Porteiro</button>
                        <button onClick={handleAdm} id="adm">Adminstrador</button>
                    </div>
            </div>
        </div>
    );
}

export default ApproveUserModal;
