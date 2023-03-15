import Home from './Home';
import Menu from './Menu';
import Cursos from './Cursos';
import Login from './Login';
import AlumnoList from './alumno/AlumnoList';
import AlumnoGest from './alumno/AlumnoGest';
import CursoList from './curso/CursoList';
import CursoGest from './curso/CursoGest';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <div className='container'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/alumno/list" element={<AlumnoList />} />
        <Route path="/alumno/gest/:id" element={<AlumnoGest />} />
        <Route path="/alumno/gest" element={<AlumnoGest />} />
        <Route path="/curso/list" element={<CursoList />} />
        <Route path="/curso/gest/:id" element={<CursoGest />} />
        <Route path="/curso/gest" element={<CursoGest />} />
      </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;