import React, { useRef, useState } from 'react';
import { useModal } from '../../contexts/modal';
import './index.css'

function AlertModal() {
    const { hideModal, expandModal, collapseModal, isExpanded, currentVideoIndex, videosList } = useModal(); 
    const videoRef = useRef(null);
    const [name, setName] = useState('');
    const [area, setArea] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Nome: ${name}`);
        console.log(`Área: ${area}`);
    };

    const handleRefuse = (e) => {
        e.preventDefault();
        handleClose()
        
    };

    const handleClose = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
        collapseModal(); 
        hideModal();    
    };

    return (
        <div id={isExpanded ? 'expanded-modal' : 'modal'}>
            <div id={isExpanded ? "expanded-modal-content" : "modal-content"}>      
                <video id={isExpanded? 'big-video': 'small-video'} controls autoPlay muted loop >
                    <source src={videosList[currentVideoIndex]} type="video/mp4" alt="Vídeo com o rosto de uma pessoa olhando para a câmera"/>
                    Seu navegador não suporta o elemento de vídeo.
                </video>
                {!isExpanded ?
                    <div id="buttons-modal">
                        <button id="close-modal" onClick={handleClose}>Fechar</button>
                        <button id="vizualize-modal" onClick={expandModal}>Vizualizar</button> 
                    </div>: 
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
                            <label htmlFor="area">Área:</label>
                            <input
                            type="text"
                            id="area"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            />
                        </div>
                        <div id="buttons-expanded-modal">
                            <button id="refuse-modal" onClick={handleRefuse}>Recusar</button>
                            <button id="submit-modal" type="submit">Aceitar</button>
                        </div>
                    </form>
                }
              
                
            </div>
        </div>
    );
};

export default AlertModal;