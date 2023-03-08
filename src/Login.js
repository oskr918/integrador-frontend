import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import swal from 'sweetalert';

const Login = () => {
  const [nickname, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { nickname, password };
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    localStorage.setItem('token', result.token);
    console.log(localStorage.getItem('token'));
  
    // Si el token es válido, redirige a la página de inicio
    if (result.token) {
      window.location.href = "/";
    }else{
      swal("Acceso denegado", "Los datos ingresados son incorrectos.", "warning");
    }
  };
  

  return (
    <>
      <div class="container">
        <div class="abs-center">
          <div class="card">
            <img src="../img/Login.png" class="card-img" alt="img" />
            <div class="card-img-overlay">
              <Form onSubmit={handleSubmit} id="izq">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Nickname</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter nickname"
                    value={nickname}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Form.Group>
                <br />
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Form.Group>
                <br />
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
