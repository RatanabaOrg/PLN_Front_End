import './index.css'
import logo from '../../assets/logo2.png';

function Header() {
    return (
      <div className="header">
        <div id="header-title">
            <div id="logo-div" >
              <img src={logo} id="logo" alt="Logo Ratanaba: uma lupa examinando uma planta"/>
            </div>
            <h1>Ratanaba</h1>
        </div>
        <hr id="header-horizontal-line"></hr>
      </div>
    );
  }
  
export default Header;