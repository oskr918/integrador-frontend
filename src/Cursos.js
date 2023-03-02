import React from 'react';
import { Link } from "react-router-dom";

class Cursos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Cursos: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/api/curso")
      .then(res => res.json())
      .then(result => {
        console.log(result);
        this.setState({
          Cursos: result
        });
      },
        (error) => {
          console.log(error);
          this.setState({
            error,
            Cursos: []
          });
        }
      )
  }
  render() {
    let rowsTable = this.state.Cursos.map((curso, index) => {
      return (
        <tr key={index}>
          <td>{curso.id}</td>
          <td>{curso.nombre}</td>
          <td>{curso.descripcion}</td>
          <td>{curso.anio}</td>
        </tr>
      )
    });

    return (
      <>
        <div class="container">
          <div class="card">
            <img src="../img/Cursos.png" class="card-img" alt="img" />
            <div class="card-img-overlay">
              <table className="table table-striped" id="Lista">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Año</th>
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

export default Cursos;  