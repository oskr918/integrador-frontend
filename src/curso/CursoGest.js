import React from "react";
import {toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";

class InternalCursoGest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      nombre: '',
      descripcion: '',
      anio: ''
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

      fetch(`http://localhost:5000/api/curso/${this.props.params.id}`, request)
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
              descripcion: result.body.descripcion,
              anio: result.body.anio,
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
        descripcion: '',
        anio: ''
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
      descripcion: this.state.descripcion,
      anio: this.state.anio
    };

    let request = {
      method: this.props.params.id ? 'PUT' : 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        "Accept": 'application/json'
      }
    };

    const url = this.props.params.id?`http://localhost:5000/api/curso/${this.props.params.id}`:"http://localhost:5000/api/curso";

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
          this.props.navigate("/curso/list");
        } else {
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
          this.props.navigate("/curso/list");
        }
      },
        (error) => {
          console.log(error);
        }
      );
  }

  render() {
    return (
      <div className="container">
      <div className="abs-center">
      <div className="card">
          <img src="../../img/Gestion.png" className="card-img" alt="img" />
          <div className="card-img-overlay">
          <h2 id="hh">{this.props.params.id ? "Modificando el curso " + this.state.nombre : "Creando curso..."}</h2>
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
              <label htmlFor="descripcion" className="form-label">Descripción:</label>
              <input type="text" className="form-control" id="descripcion" name="descripcion" value={this.state.descripcion} onChange={this.handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="anio" className="form-label">Año:</label>
              <input type="text" className="form-control" id="anio" name="anio" value={this.state.anio} onChange={this.handleChange} />
            </div>
            <button type="submit">
                Guardar
            </button> 
          </form>
        </div>
      </div>
      </div>
        </div>
      </div>
      </div>
    );
  }
}


export function CursoGest(props) {
  const navigate = useNavigate();
  const params = useParams(); 
  return <InternalCursoGest navigate={navigate} params={params} />
}

export default CursoGest;