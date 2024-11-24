import React, { useRef, useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../contexts/authContext";
import { useModal } from '../../contexts/modal';
import './index.css';
import axios from 'axios';
import { IoIosAlert } from "react-icons/io";
import { IoClose } from "react-icons/io5";

function AlertModal() {
    const { hideModal, expandModal, handleActionAndClose, collapseModal, isExpanded, currentVideoIndex, videosList } = useModal();
    const videoRef = useRef(null);
    const [name, setName] = useState('');
    const [area, setArea] = useState('');
    const [showAlertOptions, setShowAlertOptions] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [areas, setAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState("");
    const { logout } = useContext(AuthContext);
    const [showCloseButton, setShowCloseButton] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    "http://localhost:8080/visualizar/areas",
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                        validateStatus: () => true
                    })

                if (response.status === 401 || response.status === 400) {
                    logout()
                } else {
                    setAreas(response.data)
                }
            } catch (error) {
                console.error("Erro ao visualizar areas:", error);
            }
        }
        fetchData()
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const formData = {
            "name": name,
            "area": selectedArea,
            "authorization": "Autorizado",
            "alert": "" // Envia o tipo de alerta
        };

        try {
            const response = await axios.post(
                'http://localhost:8080/cadastro/instancia',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    validateStatus: () => true
                })

            if (response.status === 401 || response.status === 400) {
                logout()
            } else {
                console.log('Dados salvos com sucesso:', response.data);
            }
        } catch (error) {
            console.error('Erro ao salvar os dados:', error);
        }

        setName('');
        setArea('');
        setAlertType('');
        handleClose();
    };

    const handleRefuse = (e) => {
        e.preventDefault();
        setShowAlertOptions(true);
        setShowCloseButton(false);
    };

    const handleAlertSelection = async (selectedAlert) => {
        const token = localStorage.getItem('token');
        const formData = {
            "name": name,
            "area": selectedArea,
            "authorization": "Não autorizado",
            "alert": selectedAlert
        };

        try {
            const response = await axios.post(
                'http://localhost:8080/cadastro/instancia',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log('Alerta enviado com sucesso:', response.data);
        } catch (error) {
            console.error('Erro ao enviar o alerta:', error);
        }

        setShowAlertOptions(false);
        setAlertType('');
        handleClose();
    };

    const handleClose = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
        collapseModal();
        handleActionAndClose()
    };

    return (
        <div id={isExpanded ? 'expanded-modal' : 'modal'}>
            <div id={isExpanded ? "expanded-modal-content-alert" : "modal-content"}>

                {!isExpanded ? (
                    <div id="buttons-modal">
                        <IoIosAlert onClick={expandModal} size={40} color="white" />
                    </div>
                ) : (
                    <>
                        {showCloseButton && (
                            <IoClose id="btn-close" size={40} onClick={hideModal} color="black" />
                        )}
                        <video id={isExpanded ? 'big-video' : 'small-video'} controls autoPlay muted loop >
                            <source src={videosList[currentVideoIndex]} type="video/mp4" alt="Vídeo com o rosto de uma pessoa olhando para a câmera" />
                            Seu navegador não suporta o elemento de vídeo.
                        </video>
                        <form id="form" onSubmit={handleSubmit}>
                            <div className="input-div">
                                <label htmlFor="name">Nome:</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />

                                <label htmlFor="area">Área:</label>
                                <select
                                    id="area"
                                    value={selectedArea}
                                    onChange={(e) => setSelectedArea(e.target.value)}
                                >
                                    <option value="">Selecione uma área</option>
                                    {areas.map((area) => (
                                        <option key={area._id} value={area.name}>
                                            {area.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div id="buttons-expanded-modal">
                                <button id="notauthorized-modal" onClick={handleRefuse}>Não autorizado</button>
                                <button id="submit-modal" onClick={handleActionAndClose} type="submit">Autorizado</button>
                            </div>
                        </form>
                    </>
                )}

                {showAlertOptions && (
                    <div id="alert-options">
                        <h3>Selecione o tipo de alerta:</h3>
                        <div id="alert-buttons">
                            <button onClick={() => handleAlertSelection('Moderado')}>Moderado</button>
                            <button onClick={() => handleAlertSelection('Alto')}>Alto</button>
                            <button onClick={() => handleAlertSelection('Crítico')}>Crítico</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AlertModal;
