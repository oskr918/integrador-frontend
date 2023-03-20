import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class AlumnoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alumnoAEliminar:{},
      modalConfirmarEliminacion:false,
      alumnos : []
    };
    this.onDelete = this.onDelete.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleClose(){
    this.setState({
      modalConfirmarEliminacion: false
    });
  }
  handleOpen(alumno){
    this.setState({
      alumnoAEliminar: alumno,
      modalConfirmarEliminacion: true
    });
  }

  onDelete() {
    const token = localStorage.getItem('token');
    let request = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Accept": 'application/json',
        "Authorization": `Bearer ${token}` 
      }
    };

    fetch(`http://localhost:5000/api/alumno/${this.state.alumnoAEliminar.id}`, request)
      .then(res => {
        return res.json().then(body => {
          return {
            status: res.status,
            ok: res.ok,
            headers: res.headers,
            body: body
          };
        });
      })
      .then(result => {
        if (result.ok) {
          toast.success(result.body.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          this.componentDidMount();
        } else {
          toast.error(result.body.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    let request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Accept": 'application/json',
        "Authorization": `Bearer ${token}` 
      }
    }; 
    fetch("http://localhost:5000/api/alumno", request)
    .then(res => {
      return res.json().then(body => {
        return {
          status: res.status,
          ok: res.ok,
          headers: res.headers,
          body: body
        };
      });
    })
      .then(result => {
        if (result.ok) {
          this.setState({
            modalConfirmarEliminacion: false,
            alumnos : result.body
          });
        } else {
          toast.error(result.body.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        
      },
    
        (error) => {
          console.log(error);
          this.setState({ 
            error,
            alumnos : [],
            modalConfirmarEliminacion: false
          });
        }
      )
  }
  render() {
    let rowsTable = this.state.alumnos.map((alumno, index) => {
      return (
        <>
        <tr key={index}>
        <td>{alumno.id}</td>
        <td>{alumno.nombre}</td>
        <td>{alumno.apellido}</td>
        <td>{alumno.dni}</td>
        <th>
            <Link to={`/alumno/gest/${alumno.id}`}>
            <Button variant="primary" type="button">
            <i class="fa-solid fa-user-gear"></i>
              </Button>
            </Link>
          </th>
          <th>
              <Button variant="danger" type="button"  onClick={() => this.handleOpen(alumno)}>
                <i class="fa-solid fa-user-xmark"></i>
              </Button>
          </th>
        </tr>
        </>
      )
    });

    return (
      <>
          <div class="container">
          <div class="card">
            <img src="../img/ListarAlumno.png" class="card-img" alt="img" />
            <div class="card-img-overlay">
            <Link to={`/alumno/gest`}>
                <Button type="submit" id="add">
                  Agregar nuevo alumno/a
                </Button>
              </Link>
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
        <Modal
          show={this.state.modalConfirmarEliminacion}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton className="dark-content">
            <Modal.Title>Confirmar eliminación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Está seguro que desea eliminar al alumno/a: <strong>{this.state.alumnoAEliminar.apellido} {this.state.alumnoAEliminar.nombre}?</strong>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleClose}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={this.onDelete}>Eliminar</Button>
          </Modal.Footer>
        </Modal>
      </>

    );
  }
}

export default AlumnoList;  