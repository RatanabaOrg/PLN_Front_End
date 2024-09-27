import "./index.css";
import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { GoClock, GoGraph, GoListUnordered } from 'react-icons/go';
import { BsArrowLeftRight } from 'react-icons/bs';
import { IoAddCircleOutline, IoPersonAddOutline } from 'react-icons/io5';
import { PiUserSquare } from 'react-icons/pi';

function NavBar() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  const handleHover = (item) => {

      setActiveItem(item);
    
  };

  return (
    <div id="navBar">
      <div className="menu-section">
        <p className="menu-title">ACESSOS</p>
        <ul className="menu-list">
          <li
            className={activeItem === '/ultimosacessos' ? 'active' : ''}
            onClick={() => handleHover('/ultimosacessos')}
          >
            <Link to="/ultimosacessos" className="menu-link">
              <GoClock size={23} /> Últimos
            </Link>  
          </li>
          <li
            className={activeItem === '/historico' ? 'active' : ''}
            onClick={() => handleHover('/historico')}
          >
            <Link to="/historico" className="menu-link">
              <BsArrowLeftRight size={22} /> Histórico
            </Link>
          </li>
          <li
            className={activeItem === 'dashboard' ? 'active' : ''}
            onClick={() => handleHover('dashboard')}
          >
            <GoGraph size={23} /> Dashboard
          </li>
        </ul>
      </div>
      <hr className="header-horizontal-line" />
      <div className="menu-section">
        <p className="menu-title">ÁREAS</p>
        <ul className="menu-list">
          <li
            className={activeItem === '/cadastrararea' ? 'active' : ''}
            onClick={() => handleHover('/cadastrararea')}
          >
            <Link to="/cadastrararea" className="menu-link">
              <IoAddCircleOutline size={26} /> Cadastrar
            </Link>
          </li>
          <li
            className={activeItem === 'visualizar-areas' ? 'active' : ''}
            onClick={() => handleHover('visualizar-areas')}
          >
            <GoListUnordered size={25} /> Visualizar
          </li>
        </ul>
      </div>
      <hr className="header-horizontal-line" />
      <div className="menu-section">
        <p className="menu-title">USUÁRIOS</p>
        <ul className="menu-list">
          <li
            className={activeItem === 'cadastrar-usuarios' ? 'active' : ''}
            onClick={() => handleHover('cadastrar-usuarios')}
          >
            <IoPersonAddOutline size={24} /> Cadastrar
          </li>
          <li
            className={activeItem === 'visualizar-usuarios' ? 'active' : ''}
            onClick={() => handleHover('visualizar-usuarios')}
          >
            <PiUserSquare size={27} /> Visualizar
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;