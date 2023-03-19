import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';

class InscripACurso extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         Cursos: [],
         Alumnos: [],
         AlumnoEnCurso: [],
         GuardarDatos: {
            curso: null,
            inscribir: []
         }
      };
      this.buscarEnCurso = this.buscarEnCurso.bind(this);
      this.onAdd = this.onAdd.bind(this);
      this.onDelete = this.onDelete.bind(this);
      this.guardarDatos = this.guardarDatos.bind(this);
   }

   guardarDatos() {

      this.setState({
         GuardarDatos : {
            curso: this.state.GuardarDatos.curso,
            inscribir: this.state.AlumnoEnCurso
         }
      })


      console.log(this.state.GuardarDatos);
   }

   onAdd(alumno) {
      const newAlumnoEnCurso = [...this.state.AlumnoEnCurso, alumno];

      this.setState({
         AlumnoEnCurso: newAlumnoEnCurso
      })

      this.setState({
         GuardarDatos : {
            curso: this.state.GuardarDatos.curso,
            inscribir: [...this.state.AlumnoEnCurso]
         }
      })
   }

   onDelete(alumno) {
      const elimAlumnoEnCurso = this.state.AlumnoEnCurso.filter(a => a.id !== alumno.id);

      this.setState({
         AlumnoEnCurso: elimAlumnoEnCurso
      })

   }


   buscarEnCurso(curso) {

      this.setState({
         GuardarDatos: {
            curso: curso.id,
            inscribir: []
         }
      });

      //Peticion de alumnos que estan inscriptos en ese curso
      fetch(`http://localhost:5000/api/curso/isncrip/${curso.id}`)
         .then(res => res.json())
         .then(result => {
            console.log(result);
            this.setState({
               AlumnoEnCurso: result
            });
         },
            (error) => {
               console.log(error);
               this.setState({
                  error,
                  AlumnoEnCurso: []
               });
            }
         );


      //Peticion de todos los Alumnos
      fetch("http://localhost:5000/api/alumno")
         .then(res => res.json())
         .then(result => {
            //console.log(result);
            this.setState({
               Alumnos: result
            });
         },
            (error) => {
               console.log(error);
               this.setState({
                  error,
                  Alumnos: []
               })
            }
         );
   }

   componentDidMount() {
      // Peticion de Cursos
      fetch("http://localhost:5000/api/curso")
         .then(res => res.json())
         .then(result => {
            //console.log(result);
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
         );
   }

   render() {

      let rowsTable = this.state.Cursos.map((curso, index) => {
         return (
            <tr key={index}>
               <td className="align-middle"> {curso.id} </td>
               <td className="align-middle"> {curso.nombre} </td>
               <td className="align-middle">
                  <Button variant="warning" type="submit" onClick={() => this.buscarEnCurso(curso)}>
                     <i className="fa-solid fa-list"></i>
                  </Button>
               </td>
            </tr>
         )
      });

      let rowsAlumnos = this.state.Alumnos.map((alumno, index) => {
         //console.log(this.state.AlumnoEnCurso);
         let inscripto = this.state.AlumnoEnCurso.findIndex(item => item.id === alumno.id) !== -1;

         //console.log(inscripto);
         return (
            <tr key={index} className={inscripto ? "table-success" : ""}>
               <td className="align-middle"> {alumno.nombre} </td>
               <td className="align-middle"> {alumno.apellido} </td>
               <td className="align-middle"> {alumno.dni} </td>
               <td className="align-middle">
                  {inscripto ? (
                     <Button variant="danger" type="submit" onClick={() => this.onDelete(alumno)}>
                        <i className="fa-solid fa-xmark"></i>
                     </Button>
                  ) : (
                     <Button variant="primary" type="submit" onClick={() => this.onAdd(alumno)}>
                        <i className="fa-solid fa-plus"></i>
                     </Button>
                  )}
               </td>
            </tr>
         )
      })

      return (
         <>
            <div className="row mt-2">
               <div className="col-lg-4 col-md-12">
                  <div className="card">
                     <div className="card-header text-center p-4">

                        Lista de Cursos

                     </div>
                     <table className="table text-center justify-content-center">
                        <thead>
                           <tr>
                              <th>ID</th>
                              <th>Nombre</th>
                              <th>Inscribir</th>
                           </tr>
                        </thead>
                        <tbody>
                           {rowsTable}
                        </tbody>
                     </table>
                  </div>
               </div>
               <div className="col-lg-8 col-md-12">
                  <div className="card">
                     <div className="card-header d-flex justify-content-between align-items-center">

                        Alumnos disponibles

                        {this.state.GuardarDatos.inscribir.length != 0 && this.state.GuardarDatos.curso != null ? (
                           <Button variant="success" type="submit" className="col-lg-2" onClick={() => this.guardarDatos()}>
                              <i className="fa-solid fa-floppy-disk"></i>
                           </Button>
                        ) : (
                           <Button variant="success" type="submit" className="col-lg-2" disabled>
                              <i className="fa-solid fa-floppy-disk"></i>
                           </Button>
                        )
                        }
                     </div>
                     <table className="table text-center align-items-center">
                        <thead>
                           <tr>
                              <th>Nombre</th>
                              <th>Apeliido</th>
                              <th>DNI</th>
                              <th>Accion</th>
                           </tr>
                        </thead>
                        <tbody>
                           {rowsAlumnos}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </>
      );
   }
}

export default InscripACurso;