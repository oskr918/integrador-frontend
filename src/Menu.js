import Nav from 'react-bootstrap/Nav';
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import MenuPerfil from './MenuPerfil';
import { NavItem } from 'react-bootstrap';

function Menu() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt_decode(token);
      setUser(decoded);
    }
  }, []);
  console.log(user)
  return (
    <>
      <body background="../img/foto.png">

        <h3 class="encabezado">
          PORTAL SILICON WEB FULL STACK
        </h3>
          <div class="abs-center" id="navvar">
            <Nav justify variant="tabs" href="/">
              {user ? (
                <>
                  <Nav.Item>
                    <Nav.Link href="/">Home<br/><i class="fa-solid fa-house"></i></Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/curso/list">Gestión de cursos<br/><i class="fa-solid fa-list-ol"></i></Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="/alumno/list" href="/alumno/list">Gestión de alumnos<br/><i class="fa-solid fa-list"></i></Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                  <MenuPerfil />
                  </Nav.Item>
                </>
              ) : (
                <>
                  <Nav.Item>
                    <Nav.Link href="/">Home<br/><i class="fa-solid fa-house"></i></Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/cursos">Cursos<br/><i class="fa-solid fa-graduation-cap"></i></Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/login">Login<br/><i class="fa-solid fa-right-to-bracket"></i></Nav.Link>
                  </Nav.Item>
                </>
              )}
            </Nav>
          </div>
      </body>
    </>
  );
}

export default Menu;
