import React from 'react';
import { Link } from "react-router-dom";
import Menu from '../Menu';
import Button from 'react-bootstrap/Button';

class ListarAlumno extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alumnos: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/api/alumno")
      .then(res => res.json())
      .then(result => {
        console.log(result);
        this.setState({
          alumnos: result
        });
      },
        (error) => {
          console.log(error);
          this.setState({
            error,
            alumnos: []
          });
        }
      )
  }
  render() {
    let rowsTable = this.state.alumnos.map((alumno, index) => {
      return (
        <tr key={index}>
          <td>{alumno.id}</td>
          <td>{alumno.nombre}</td>
          <td>{alumno.apellido}</td>
          <td>{alumno.dni}</td>
          <th>
            <Link to={`./Home`}>
              <Button variant="primary" type="submit">
                <i class="fa-solid fa-user-pen"></i>
              </Button>
            </Link>
          </th>
          <th>
            <Link to={`./Home`}>
              <Button variant="danger" type="submit">
                <i class="fa-solid fa-user-xmark"></i>
              </Button>
            </Link>
          </th>
        </tr>
      )
    });
    return (
      <>
        <div class="container">
          <div class="card">
            <img src="../img/ListarAlumno.png" class="card-img" alt="img" />
            <div class="card-img-overlay">
              <table className="table table-striped" id="ListaAl">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>DNI</th>
                  </tr>
                </thead>
                <tbody>
                  {rowsTable}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ListarAlumno;  