import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaQuestion, FaPaperPlane, FaSpinner } from "react-icons/fa";
import axios from "axios";
import "./styles.css";

export default function Chat() {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [questionTooltipVisible, setQuestionTooltipVisible] = useState(false);

  const textAreaRef = useRef(null);

  useEffect(() => {
    setMessages([
      {
        type: "bot",
        text: "Seja bem vindo! Aqui você pode adicionar camadas de dados.",
      },
      {
        type: "bot",
        text: "Aonde eu ...",
      },
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
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
      >
        <FaBars />
      </button>

      {tooltipVisible && <div className="tooltip">ChatBoot para observação de dados</div>}

      <button
        id="questionButton"
        className="question-btn"
        onMouseEnter={() => setQuestionTooltipVisible(true)}
        onMouseLeave={() => setQuestionTooltipVisible(false)}
      >
        <FaQuestion />
      </button>

      {questionTooltipVisible && (
        <div className="questionTooltip">Clique para aprender a usar</div>
      )}

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
                    <FaSpinner className="spinner" />
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
                rows="2"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleTextAreaKeyDown}
              ></textarea>
              <input type="file" id="fileInput" name="image" accept="image/*" />
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
