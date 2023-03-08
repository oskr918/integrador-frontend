import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Perfil from './Perfil';

function MenuPerfil() {
  const handleCerrarSesionClick = () => {
    localStorage.removeItem('token');
    window.location.href = "http://localhost:3000";
  }
return (
  <>
  <ButtonGroup>
      <DropdownButton as={ButtonGroup} title="Sesión iniciada" id="bg-nested-dropdown">
        <Dropdown.Item eventKey="1">  <li><a class="dropdown-item" href="/Perfil"><i class="fa-solid fa-user"></i> Perfil</a></li></Dropdown.Item>
        <Dropdown.Item eventKey="2"><li><a class="dropdown-item" href="/cerrar-sesion" onClick={handleCerrarSesionClick}><i class="fa-solid fa-right-from-bracket"></i> Cerrar sesión</a></li></Dropdown.Item>
      </DropdownButton>
    </ButtonGroup>
  <Perfil/>
    </>
  );
}


export default MenuPerfil;
