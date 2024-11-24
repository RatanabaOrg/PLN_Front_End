import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaPaperPlane, FaSpinner } from "react-icons/fa";
import axios from "axios";
import "./styles.css";

export default function Chat() {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const textAreaRef = useRef(null);

  useEffect(() => {
    setMessages([
      {
        type: "bot",
        text: "Seja bem vindo! Aqui você pode fazer perguntas de como utilizar o sistema.",
      }
    ]);
  }, []);

  const handleTextAreaKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { type: "user", text }]);
    setText("");

    const loadingMessage = { type: "bot-loading" };
    setMessages((prev) => [...prev, loadingMessage]);

    try {
      const response = await axios.post("http://localhost:5502/add", { text });
      const botText =
        response.data.response === "camada"
          ? "Qual camada você gostaria?"
          : response.data.response === "especificar"
            ? "Não entendi sua mensagem. Poderia reformular de maneira mais objetiva, por favor?"
            : response.data.response;

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { type: "bot", text: botText },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { type: "bot", text: "Desculpe, algo deu errado! Por favor, tente novamente." },
      ]);
    }
  };

  return (
    <div>
      <button
        id="menuButton"
        className="menu-btn"
        onClick={() => setSideMenuOpen(!sideMenuOpen)}
        title="Chatbot auxiliador"
      >
        <FaBars />
      </button>

      {sideMenuOpen && (
        <div id="sideMenu" className={`side-menu ${sideMenuOpen ? "open" : ""}`}>
          <button className="close-btn" id="closeBtn" onClick={() => setSideMenuOpen(false)}>
            &times;
          </button>

          <div id="chat-content" className="chat-content">
            <div id="mensages">
            {messages.map((msg, index) =>
                msg.type === "bot-loading" ? (
                  <div key={index} className="botDivLoading">
                    <FaSpinner className="fa-spinner" />
                  </div>
                ) : (
                  <div
                    key={index}
                    className={msg.type === "user" ? "userDiv" : "botDiv"}
                  >
                    <p
                      className={
                        msg.type === "user" ? "userParagraph" : "botParagraph"
                      }
                    >
                      {msg.text}
                    </p>
                  </div>
                )
              )}
            </div>

            <form className="typeBox" onSubmit={(e) => e.preventDefault()}>
              <textarea
                id="textArea"
                ref={textAreaRef}
                placeholder="Digite sua mensagem..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleTextAreaKeyDown}
              ></textarea>
              
              <button id="sendButton" type="button" onClick={sendMessage}>
                <FaPaperPlane />
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
