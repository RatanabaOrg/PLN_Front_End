import React, { useRef } from 'react';
import { useModal } from '../../contexts/modal';
import './index.css'

function AlertModal() {
    const { hideModal, expandModal, collapseModal, isExpanded, currentVideoIndex, videosList } = useModal(); 
    const videoRef = useRef(null);

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
                    <>
                        <button id="close-modal" onClick={handleClose}>Fechar</button>
                        {/* <label for=""></label>
                        <input placeholder='nome'>oi</input>
                        <label for=""></label>
                        <input placeholder='área'></input> */}
                    </>
                }
              
                
            </div>
        </div>
    );
};

export default AlertModal;
