import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../contexts/authContext";

import './index.css';
import axios from "axios";

function ViewModalUser({ user, onClose }) {
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [telephone, setTelephone] = useState(user?.telephone || '');
    const token = localStorage.getItem('token');
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setTelephone(user.telephone);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name,
            email,
            telephone
        };

        try {
            const response = await axios.put(`http://localhost:8080/atualizar/usuario/${user._id}`, formData,        {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                    validateStatus: () => true
            }) 

            if (response.status === 401 || response.status === 400) {
                logout()
            } else {
                console.log(response.data);
            }
        } catch (error) {
            console.error("Erro ao pegar os dados:", error);
        }

        setName('');
        setEmail('');
        setTelephone('');
        onClose();
    };

    const handleRefuse = (e) => {
        e.preventDefault();
        onClose();
    };

    return (
        <div id="expanded-modal">
            <div id="expanded-modal-content">
                <form id="form-user-modal" onSubmit={handleSubmit}>
                    <div className='input-div'>
                        <label htmlFor="name">Nome:</label>
                        <input
                            type="text"
                            id="nameUser"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='input-div'>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='input-div'>
                        <label htmlFor="telephone">Telefone:</label>
                        <input
                            type="text"
                            id="telephone"
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                        />
                    </div>
                    <div id="buttons-expanded-modal">
                        <button id="refuse-modal" onClick={handleRefuse}>Voltar</button>
                        <button id="submit-modal" type="submit">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ViewModalUser;
