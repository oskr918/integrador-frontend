import Nav from 'react-bootstrap/Nav';

function Menu () {
  return (
    <>
    <h3 class="encabezado">
    <img src="../img/silicon transparente.png" class="imgcabecera" />
    PORTAL SILICON WEB FULL STACK
   </h3>
    <Nav justify variant="tabs" defaultActiveKey="/" id="navvar">
      <Nav.Item>
        <Nav.Link href="/">Home<br/><i class="fa-solid fa-house"></i></Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/Cursos">Cursos<br/><i class="fa-solid fa-graduation-cap"></i></Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/Login">Login<br/><i class="fa-solid fa-right-to-bracket"></i></Nav.Link>
      </Nav.Item>
    </Nav>
    </>
  );
}

export default Menu;