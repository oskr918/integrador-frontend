import Home from './Home';
import Menu from './Menu';
import Cursos from './Cursos';
import Login from './Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
 return (
   <BrowserRouter>
        <Menu />
     <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/Cursos" element={<Cursos />} /> 
       <Route path="/login" element={<Login/>} /> 
     </Routes>
   </BrowserRouter>
 );
}

export default App;