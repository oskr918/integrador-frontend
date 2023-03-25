import React from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

class InscripACurso extends React.Component {
   constructor(props) {
      super(props);
      /*
      Estados:
       Curso[] -> almacenara todos los curos en el sistema
       Alumnos[] -> Almecenara todos los alumnos en el sistema
       AlumnoEnCurso[] -> Almacenara solamente los *alumnos existentes* en el *curso elegido*
       GuardarDatos{int, []} -> Almacenara el curso y una lista de alumnos que queramos guardar en la DB *alumno_curso*
      */
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

   // Una vez elegido el curso y la lista de alumnos a inscribir
   // Esta funcion tendria que hacer el POST (guardado)
   guardarDatos() {

      // Separando los "id" de los objetos "alumnos" entro del estado "GuardarDatos.inscribir"
      const listIdAlumnos = this.state.GuardarDatos.inscribir.map(
         alumno => alumno.id
      );

      let data = {
         idCurso: this.state.GuardarDatos.curso,
         idAlumnos: listIdAlumnos
      }

      const token = localStorage.getItem('token');
      let request = {
         method: 'POST',
         body: JSON.stringify(data),
         headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
         }
      }

      fetch('http://localhost:5000/api/curso/alumCurso/', request)
         .then(res => {
            return res.json().then(body => {
               return {
                  status: res.status,
                  ok: res.ok,
                  headers: res.headers,
                  body: body
               }
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
                  theme: "light"
               });
               console.log("Resultado OK");
               window.location.reload();
               //this.props.navigate("/inscripcion");
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
               console.log("Resultado ERROR");
               window.location.reload();
               //this.props.navigate("/inscripcion");
            }
         },
            (error) => {
               console.log("resultado FUNCION ERROR");
               console.log(error);
            }

         );
   }

   onAdd(alumno) {
      const newAlumnoEnCurso = [...this.state.GuardarDatos.inscribir, alumno];

      this.setState({
         GuardarDatos: {
            curso: this.state.GuardarDatos.curso,
            inscribir: newAlumnoEnCurso
         }
      })
   }

   onDelete(alumno) {
      const elimAlumnoEnCurso = this.state.GuardarDatos.inscribir.filter(a => a.id !== alumno.id);

      this.setState({
         GuardarDatos: {
            curso: this.state.GuardarDatos.curso,
            inscribir: elimAlumnoEnCurso
         }
      })

   }

   buscarEnCurso(curso) {

      this.setState({
         GuardarDatos: {
            curso: curso.id,
            inscribir: []
         }
      });

      //Peticion de alumnos que estan inscriptos en ese curso elegido
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

         const select = curso.id === this.state.GuardarDatos.curso ? "table-primary": "";
         return (
            <tr key={index} className={select}>
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
         
         //console.log(this.state.AlumnoEnCurso.detail);
         if (this.state.AlumnoEnCurso.detail === "sin alumno") {
            /*
               Con "enLista" hacemos exsactamente los mismo que con "inscripto" pero a hora ma mostrar
               botones de "añadir" y de "eliminar" de la lista...
            */
            let enLista = this.state.GuardarDatos.inscribir.findIndex(dato => dato.id === alumno.id) !== -1;

            return (
               <tr key={index}>
                  <td className="align-middle"> {alumno.nombre} </td>
                  <td className="align-middle"> {alumno.apellido} </td>
                  <td className="align-middle"> {alumno.dni} </td>
                  <td className="align-middle">

                     {enLista ? (
                        <Button variant="danger" type="submit" onClick={() => this.onDelete(alumno)}>
                           <i className="fa-solid fa-plus"></i>
                        </Button>
                     ) : (
                        < Button variant="primary" type="submit" onClick={() => this.onAdd(alumno)}>
                           <i className="fa-solid fa-plus"></i>
                        </Button>
                     )}
                  </td>
               </tr >
            )
         }
         /*
            Mapeo el estado "alumnos" para luego comparar con "AlumnoEnCurso"
            findIndex se usa para buscar un elemento en un array, devolviendo -1 si el elemento no exciste
            o un valor diferente a -1 (!== -1) si se encuentra. En este caso devolvera true si se encuentra
            y false si no esta.
         */
         let inscripto = this.state.AlumnoEnCurso.findIndex(item => item.id === alumno.id) !== -1;
         /*
            Con "enLista" hacemos exsactamente los mismo que con "inscripto" pero a hora ma mostrar
            botones de "añadir" y de "eliminar" de la lista...
         */
         let enLista = this.state.GuardarDatos.inscribir.findIndex(dato => dato.id === alumno.id) !== -1;

         return (
            <tr key={index} className={inscripto ? "table-success" : ""}>
               <td className="align-middle"> {alumno.nombre} </td>
               <td className="align-middle"> {alumno.apellido} </td>
               <td className="align-middle"> {alumno.dni} </td>
               <td className="align-middle">
                  {/*
                     Usamos la variable "inscripto". Para mostrar los que ya estan en la DB,
                     estos no podran ser modificados en "esta página"...
                  */}
                  {inscripto ? (
                     <Button variant="light" type="submit" disabled>
                        <i className="fa-solid fa-database fa-lg"></i>
                     </Button>
                  ) : (
                     /*
                        Y con la variables "enLista"... mostramos añadir (+) y si no esta delete (-).
                        En lista de alumnos a "guardar en la DB".
                     */
                     enLista ? (
                        <Button variant="danger" type="submit" onClick={() => this.onDelete(alumno)}>
                           <i className="fa-solid fa-plus"></i>
                        </Button>
                     ) : (
                        < Button variant="primary" type="submit" onClick={() => this.onAdd(alumno)}>
                           <i className="fa-solid fa-plus"></i>
                        </Button>
                     )
                  )}
               </td>
            </tr >
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

                        {this.state.GuardarDatos.inscribir.length !== 0 && this.state.GuardarDatos.curso !== null ? (
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
                              <th>Apellido</th>
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

export function InscripcionACurso(props) {
   const navigate = useNavigate();
   const params = useParams();
   return <InscripACurso navigate={navigate} params={params} />
}


export default InscripcionACurso;