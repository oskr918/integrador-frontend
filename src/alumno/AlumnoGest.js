import React from "react";
import {toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";

class InternalAlumnoGest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      nombre: '',
      apellido: '',
      dni: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.params.id) {
      let request = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Accept": 'application/json'
        }
      };

      fetch(`http://localhost:5000/api/alumno/${this.props.params.id}`, request)
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
              id: result.body.id,
              nombre: result.body.nombre,
              apellido: result.body.apellido,
              dni: result.body.dni,
            });
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
        })
    } else {
      this.setState({
        id: '',
        nombre: '',
        apellido: '',
        dni: ''
      });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = {
      id: this.state.id,
      nombre: this.state.nombre,
      apellido: this.state.apellido,
      dni: this.state.dni
    };

    let request = {
      method: this.props.params.id ? 'PUT' : 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        "Accept": 'application/json',
        "authorization": sessionStorage.getItem('token')
      }
    };

    const url = this.props.params.id?`http://localhost:5000/api/alumno/${this.props.params.id}`:"http://localhost:5000/api/alumno";

    fetch(url, request)
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
          this.props.navigate("/alumno/list");
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
      },
        (error) => {
          console.log(error);
        }
      );
  }

  render() {
    return (
      <>
      <div class="container">
      <div class="abs-center">
        <div class="card">
          <img src="../../img/Gestion.png" class="card-img" alt="img" />
          <div class="card-img-overlay">
          <h2 id="hh">{this.props.params.id ? "Modificando alumno/a: " + this.state.nombre : "Creando alumno..."}</h2>
          </div>
          <div class="card-img-overlay" id="gest">
      <div className="row">
        <div className="col">
          <form onSubmit={this.handleSubmit} method="POST">
            <div className="mb-3">
              <label htmlFor="dni" className="form-label">ID:</label>
              <input type="text" className="form-control" id="id" name="id" value={this.state.id} onChange={this.handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre:</label>
              <input type="text" className="form-control" id="nombre" name="nombre" value={this.state.nombre} onChange={this.handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="apellido" className="form-label">Apellido:</label>
              <input type="text" className="form-control" id="apellido" name="apellido" value={this.state.apellido} onChange={this.handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="dni" className="form-label">DNI:</label>
              <input type="text" className="form-control" id="dni" name="dni" value={this.state.dni} onChange={this.handleChange} />
            </div>
            <button type="submit" variant="primary" id="bu">
                Guardar
            </button> 
          </form>
        </div>
      </div>
      </div>
          </div>
        </div>
      </div>
      </>
    );
  }
}


export function AlumnoGest(props) {
  const navigate = useNavigate();
  const params = useParams(); 
  return <InternalAlumnoGest navigate={navigate} params={params} />
}

export default AlumnoGest;