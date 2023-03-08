import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

class InscripACurso extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         Cursos: [],
         Alumnos: [],
         AlumnoEnCurso: {}
      };
      this.buscarEnCurso = this.buscarEnCurso.bind(this);
   }

   buscarEnCurso(curso) {   
      //Peticion de alumnos que estan inscriptos en ese curso
      fetch(`http://localhost:5000/api/curso/${curso.id}`)
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
               AlumnoEnCurso: {}
            });
         }
      );
      //Peticion de todos los Alumnos
      fetch("http://localhost:5000/api/alumno")
         .then(res => res.json())
         .then(result => {
            console.log(result);
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
               <td> {curso.id} </td>
               <td> {curso.nombre} </td>
               <td>
                  <Button variant="warning" type="submit" onClick={() => this.buscarEnCurso(curso)}>
                     <i className="fa-solid fa-list"></i>
                  </Button>
               </td>
            </tr>
         )
      });

      let rowsAlumnos = this.state.Alumnos.map((alumno, index) => {
         let inscripto = this.state.AlumnoEnCurso.findIndex(x => x.id === alumno.id) !== -1;

         console.log(inscripto);
         return (
            <tr key={index} className={inscripto?"table-success": ""}>
               <td> {alumno.nombre} </td>
               <td> {alumno.apellido} </td>
               <td> {alumno.dni} </td>
               <td>
                  {inscripto ? (
                     <Button variant="danger" type="submit">
                        <i className="fa-solid fa-delete-left"></i>
                     </Button>
                  ) : (
                     <Button variant="primary" type="submit">
                        <i className="fa-solid fa-file"></i>
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
                     <div className="card-header text-center">
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
                     <div className="card-header text-center">
                        Alumnos disponibles
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