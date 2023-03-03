import Home from './Home';
import Menu from './Menu';
import Cursos from './Cursos';
import Login from './Login';
import ListarAlumno from './alumno/ListarAlumno';
import EditarAlumno from './alumno/EditarAlumno';
import ListarCurso from './curso/ListarCurso';
import EditarCurso from './curso/EditarCurso';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Cursos" element={<Cursos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/alumno/list" element={<ListarAlumno />} />
        <Route path="/alumno/edit" element={<EditarAlumno />} />
        <Route path="/curso/list" element={<ListarCurso />} />
        <Route path="/curso/edit" element={<EditarCurso />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;