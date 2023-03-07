import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import React, { useState } from 'react';

function MenuPerfil() {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleCerrarSesionClick = () => {
    localStorage.removeItem('token');
    window.location.href = "http://localhost:3000";
  };

  return (
    <nav>
      <button onClick={handleMenuToggle}><ArrowDropDownIcon></ArrowDropDownIcon></button>
      {showMenu && (
        <ul>
          <li><button>Perfil</button></li>
          <li><button href="/cerrar-sesion" onClick={handleCerrarSesionClick}>Cerrar sesión</button></li>
        </ul>
      )}
    </nav>
  );
}

export default MenuPerfil;
