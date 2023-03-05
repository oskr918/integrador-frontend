import React from 'react';
class Cursos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Cursos: []
    };
  }
  componentDidMount() {
    const token = localStorage.getItem('token'); // obtener el token del almacenamiento local
    const headers = { 'Authorization': `Bearer ${token}` }; // crear el encabezado de autorización
  console.log("token", token)
    fetch("http://localhost:5000/api/curso", { headers })
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
        <div className="container">
          <div className="card">
            <img src="../img/Cursos.png" className="card-img" alt="img" />
            <div className="card-img-overlay">
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