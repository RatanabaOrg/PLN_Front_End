import React, { useState, useEffect } from 'react';
import './index.css';
import axios from "axios";

function ViewModalUser({ user, onClose }) {
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [cpf, setCpf] = useState(user?.cpf || '');
    const [telephone, setTelephone] = useState(user?.telephone || '');

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setCpf(user.cpf);
            setTelephone(user.telephone);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name,
            email,
            cpf,
            telephone
        };

        try {
            const response = await axios.post(`http://localhost:3000/visualizar/usuario/${user.id}`, formData);
            console.log(response.data);
        } catch (error) {
            console.error("Erro ao pegar os dados:", error);
        }

        setName('');
        setEmail('');
        setCpf('');
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
                <form id="form" onSubmit={handleSubmit}>
                    <div className='input-div'>
                        <label htmlFor="name">Nome:</label>
                        <input
                            type="text"
                            id="name"
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
                        <label htmlFor="cpf">CPF:</label>
                        <input
                            type="text"
                            id="cpf"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
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
