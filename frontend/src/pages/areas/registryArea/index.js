import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../components/header";
import NavBar from "../../../components/navBar";
import "../../accessHistory/index.css";

function RegistryArea() {
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/visualizar");
        } catch (error) {
            console.error("Erro ao buscar o histórico de acessos:", error);
        }
        };

        fetchData();
    }, []);

    return (
        <>
        <Header />
        <div className="container">
            <NavBar />
            Nome Código Descrição Localização Nivel de segurança
        </div>
        </>
    );
}

export default RegistryArea;
