import "./index.css";
import React, { useState, useContext } from 'react';
import { AuthContext } from "../../contexts/authContext";
import { useLocation, Link } from 'react-router-dom';
import { GoClock, GoListUnordered } from 'react-icons/go';
import { BsArrowLeftRight } from 'react-icons/bs';
import { IoAddCircleOutline, IoPersonAddOutline } from 'react-icons/io5';
import { PiUserSquare } from 'react-icons/pi';
import { ImExit } from "react-icons/im";
import { FiMenu, FiX } from "react-icons/fi";

function NavBar() {
  const { logout } = useContext(AuthContext);
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const role = localStorage.getItem("role");

  const handleHover = (item) => {
    setActiveItem(item);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderAdminMenu = () => (
    <div className={`menu-bar-container ${isMenuOpen ? "open" : ""}`}>
      <div className="menu-bar">
        <div>
          <div className="menu-section">
            <p className="menu-title">ACESSOS</p>
            <ul className="menu-list">
              <li className={activeItem === '/alertas' ? 'active' : ''} onClick={() => handleHover('/alertas')}>
                <Link to="/alertas" className="menu-link">
                  <GoClock size={23} /> Alertas
                </Link>
              </li>
              <li className={activeItem === '/historico' ? 'active' : ''} onClick={() => handleHover('/historico')}>
                <Link to="/historico" className="menu-link">
                  <BsArrowLeftRight size={22} /> Histórico
                </Link>
              </li>
            </ul>
          </div>
          <hr className="header-horizontal-line" />
          <div className="menu-section">
            <p className="menu-title">ÁREAS</p>
            <ul className="menu-list">
              <li className={activeItem === '/cadastrararea' ? 'active' : ''} onClick={() => handleHover('/cadastrararea')}>
                <Link to="/cadastrararea" className="menu-link">
                  <IoAddCircleOutline size={26} /> Cadastrar
                </Link>
              </li>
              <li className={activeItem === '/visualizarareas' ? 'active' : ''} onClick={() => handleHover('/visualizarareas')}>
                <Link to="/visualizarareas" className="menu-link">
                  <GoListUnordered size={25} /> Visualizar
                </Link>
              </li>
            </ul>
          </div>
          <hr className="header-horizontal-line" />
          <div className="menu-section">
            <p className="menu-title">USUÁRIOS</p>
            <ul className="menu-list">
              <li className={activeItem === '/aprovarusuarios' ? 'active' : ''} onClick={() => handleHover('/aprovarusuarios')}>
                <Link to="/aprovarusuarios" className="menu-link">
                  <IoPersonAddOutline size={24} /> Aprovar
                </Link>
              </li>
              <li className={activeItem === '/visualizarusuarios' ? 'active' : ''} onClick={() => handleHover('/visualizarusuarios')}>
                <Link to="/visualizarusuarios" className="menu-link">
                  <PiUserSquare size={27} /> Visualizar
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="logout-section" onClick={logout}>
          <p className="logout-link" title="Sair">
            <ImExit size={24} />
          </p>
        </div>
      </div>
      <div className="vertical-line"></div>
    </div>
  );

  const renderUserMenu = () => (
    <div className={`menu-bar-container ${isMenuOpen ? "open" : ""}`}>
      <div className="menu-bar">
        <div>
          <div className="menu-section">
            <p className="menu-title">ACESSOS</p>
            <ul className="menu-list">
              <li className={activeItem === '/ultimosacessos' ? 'active' : ''} onClick={() => handleHover('/ultimosacessos')}>
                <Link to="/ultimosacessos" className="menu-link">
                  <GoClock size={23} /> Últimos
                </Link>
              </li>
              <li className={activeItem === '/historico' ? 'active' : ''} onClick={() => handleHover('/historico')}>
                <Link to="/historico" className="menu-link">
                  <BsArrowLeftRight size={22} /> Histórico
                </Link>
              </li>
            </ul>
          </div>
          <hr className="header-horizontal-line" />
          <div className="menu-section">
            <p className="menu-title">ÁREAS</p>
            <ul className="menu-list">
              <li className={activeItem === '/visualizarareas' ? 'active' : ''} onClick={() => handleHover('/visualizarareas')}>
                <Link to="/visualizarareas" className="menu-link">
                  <GoListUnordered size={25} /> Visualizar
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="logout-section" onClick={logout}>
          <p className="logout-link">
            <ImExit size={24} />
          </p>
        </div>
      </div>
      <div className="vertical-line"></div>
    </div>
  );

  return (
    <div id="navBar">
      <div className="hamburger" onClick={toggleMenu}>
        {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
      </div>
      {role === "adm" ? renderAdminMenu() : renderUserMenu()}
    </div>
  );
}

export default NavBar;
