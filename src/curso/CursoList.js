import React from 'react';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class CursoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cursoAEliminar: {},
      modalConfirmarEliminacion: false,
      cursos: []
    };
    this.onDelete = this.onDelete.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleClose() {
    this.setState({
      modalConfirmarEliminacion: false
    });
  }
  handleOpen(curso) {
    this.setState({
      cursoAEliminar: curso,
      modalConfirmarEliminacion: true
    });
  }

  onDelete() {
    let request = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Accept": 'application/json'
      }
    };

    fetch(`http://localhost:5000/api/curso/${this.state.cursoAEliminar.id}`, request)
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
    let request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Accept": 'application/json',
        "authorization": sessionStorage.getItem('token')
      }
    };
    fetch("http://localhost:5000/api/curso", request)
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
            cursos: result.body
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
            cursos: [],
            modalConfirmarEliminacion: false
          });
        }
      )
  }
  debugger
  render() {
    let rowsTable = this.state.cursos.map((curso, index) => {
      return (
        <>
          <tr key={index}>
            <td>{curso.id}</td>
            <td>{curso.nombre}</td>
            <td>{curso.descripcion}</td>
            <td>{curso.anio}</td>
            <th>
            <Link to={`/curso/gest/${curso.id}`}>
                <Button variant="primary" type="button">
                <i class="fa-solid fa-gears"></i>
                </Button>
              </Link>
            </th>
            <th>
              <Button variant="danger" type="button" onClick={() => this.handleOpen(curso)}>
              <i class="fa-solid fa-delete-left"></i>
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
            <img src="../img/ListaCurso.png" class="card-img" alt="img" />
            <div class="card-img-overlay">
              <Link to={`/curso/gest`}>
                <Button type="submit" id="add">
                  Crear curso
                </Button>
              </Link>
              <table className="table table-striped" id="ListaAl">
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

        <Modal
          show={this.state.modalConfirmarEliminacion}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton className="dark-content">
            <Modal.Title>Confirmar eliminacion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Esta seguro que desea eliminar el curso: <strong>{this.state.cursoAEliminar.nombre}</strong>
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

export default CursoList;  