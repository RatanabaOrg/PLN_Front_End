import React, { createContext, useState, useEffect } from 'react';
import AlertModal from "../components/alertModal"
import v1 from "../assets/v1.mp4"
import v2 from "../assets/v2.mp4"
import v3 from "../assets/v3.mp4"
import v4 from "../assets/v4.mp4"
import v5 from "../assets/v5.mp4"

const ModalContext = createContext();

export default function ModalProvider ({ children }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const token = localStorage.getItem("token");  

    const videosList = [v1, v2, v3, v4, v5]

    useEffect(() => {
        const interval = setInterval(() => {
            if (token != null) {
                setIsModalVisible(true);
            }
        }, 10 * 1000); 

        return () => clearInterval(interval);
    }, []);

    const hideModal = () => {
        setIsModalVisible(false);
        setIsExpanded(false);
    };
    const expandModal = () => setIsExpanded(true);
    const collapseModal = () => setIsExpanded(false);

    const nextVideo = () => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videosList.length);
    };

    useEffect(() => {
        if (isModalVisible) {
            nextVideo();
        }
    }, [isModalVisible]);

    return (
        <ModalContext.Provider value={{ isModalVisible, hideModal, expandModal, collapseModal, isExpanded, currentVideoIndex, videosList}}>
            {children}
            {isModalVisible && <AlertModal />}
        </ModalContext.Provider>
    );
};

export const useModal = () => React.useContext(ModalContext);
