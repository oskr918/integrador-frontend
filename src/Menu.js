import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";

function Menu() {
  return (
    <>
      <body background="../img/foto.png">
        <h3 class="encabezado">
          PORTAL SILICON WEB FULL STACK
        </h3>
          <div class="abs-center" id="navvar">
            <Nav justify variant="tabs" href="/">
              <Nav.Item>
                <Nav.Link href="/">Home<br /><i class="fa-solid fa-house"></i></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/curso/list">Lista de cursos<br /><i class="fa-solid fa-list-ol"></i></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="/alumno/list" href="/alumno/list"> Lista de alumnos<br /><i class="fa-solid fa-list"></i></Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
    

      </body>
    </>
  );
}

export default Menu;