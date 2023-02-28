import Nav from 'react-bootstrap/Nav';

function Menu() {
  return (
    <>
      <body background="../img/foto.png">
        <h3 class="encabezado">
          PORTAL SILICON WEB FULL STACK
        </h3>
        <div class="container" id="navvar">
          <div class="abs-center" >
            <Nav justify variant="tabs" href="/">
              <Nav.Item>
                <Nav.Link href="/">Home<br /><i class="fa-solid fa-house"></i></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/Cursos">Cursos<br /><i class="fa-solid fa-graduation-cap"></i></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="/Login" href="/Login">Login<br /><i class="fa-solid fa-right-to-bracket"></i></Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </div>

      </body>
    </>
  );
}

export default Menu;