import React, { useState, useEffect } from 'react';
import './index.css';
import axios from "axios";

function ViewModalArea({ user, onClose }) {
    const [name, setName] = useState(user?.name || '');
    const [code, setCode] = useState(user?.code || '');
    const [security, setSecurity] = useState(user?.security || '');
    const [location, setLocation] = useState(user?.location || ''); 
    const [description, setDescription] = useState(user?.description || '');

    useEffect(() => {
        if (user) {
            setName(user.name);
            setCode(user.code);
            setSecurity(user.security);
            setLocation(user.location);
            setDescription(user.description);
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
            const response = await axios.post(`http://localhost:3000/visualizar/usuario/${user.id}`, formData);
            console.log(response.data);
        } catch (error) {
            console.error("Erro ao pegar os dados:", error);
        }

        setName('');
        setCode('');
        setSecurity('');
        setLocation('');
        setDescription('');
        onClose();
    };

    const handleRefuse = (e) => {
        e.preventDefault();
        onClose();
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
                        <select
                            id="security"
                            name="security"
                            value={security}
                            onChange={(e) => setSecurity(e.target.value)}
                        >
                            <option value="" disabled selected>
                                Selecione
                            </option>
                            <option value="Baixo">Baixo</option>
                            <option value="Medio">Médio</option>
                            <option value="Alto">Alto</option>
                        </select>
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
                        <button id="submit-modal" type="submit">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ViewModalArea;
