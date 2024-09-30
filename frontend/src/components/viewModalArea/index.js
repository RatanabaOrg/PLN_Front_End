import React, { useState, useEffect } from 'react';
import './index.css';
import axios from "axios";

function ViewModalArea({ user, onClose }) {
    console.log(user);
    
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [security, setSecurity] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const token = localStorage.getItem('token');
    const role = localStorage.getItem("role");

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setCode(user.code || '');
            setSecurity(user.security || '');
            setLocation(user.location || '');
            setDescription(user.description || '');
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name,
            code,
            security,
            location,
            description
        };

        try {
            const response = await axios.put(`http://localhost:3000/atualizar/area/${user._id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            resetForm();
            onClose();
        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
        }
    };

    const handleRefuse = (e) => {
        e.preventDefault();
        onClose();
    };

    const resetForm = () => {
        setName('');
        setCode('');
        setSecurity('');
        setLocation('');
        setDescription('');
    };

    return (
        <div id="expanded-modal">
            <div id="expanded-modal-content">
                <form id="form-area-modal" onSubmit={handleSubmit}>
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
                        <label htmlFor="code">Código:</label>
                        <input
                            type="text"
                            id="code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>
                    <div className='input-div'>
                        <label htmlFor="security">Nível de segurança:</label>
                        {role === "adm" ? (
                            <select
                                id="security"
                                name="security"
                                value={security}
                                onChange={(e) => setSecurity(e.target.value)}
                            >
                                <option value="" disabled>
                                    Selecione
                                </option>
                                <option value="Baixo">Baixo</option>
                                <option value="Medio">Médio</option>
                                <option value="Alto">Alto</option>
                            </select>
                        ) : (
                            <input
                                type="text"
                                id="security"
                                value={security}
                                onChange={(e) => setSecurity(e.target.value)} 
                            />
                        )}
                    </div>
                    <div className='input-div'>
                        <label htmlFor="location">Localização:</label>
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <div className='input-div'>
                        <label htmlFor="description">Descrição:</label>
                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div id="buttons-expanded-modal">
                        <button id="refuse-modal" onClick={handleRefuse}>Voltar</button>
                        {role === "adm" && (
                            <button id="submit-modal" type="submit">Salvar</button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ViewModalArea;