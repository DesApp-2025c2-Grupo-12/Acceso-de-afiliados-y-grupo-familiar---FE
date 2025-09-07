import './App.css'
import Navbar from './components/Navbar'
import Form from './components/Form'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  
  return (
    <Router>
      <Navbar/> 
      <div className='container mt-4'>
        <Routes>
          <Route path='/' element={<h1>Bienvenido a Medicina Integral</h1>}/>
          <Route path="/login" element={<Form />} />
          <Route path='/register' element={<p>Registro, aca tendria que estar el otro formulario pero de registro</p>}/>
          <Route path="/home" element={<p>Home, aca tendria que estar el dashboard creo</p>} />
          <Route path="/about" element={<p>Contacto, aca tendriamos que meter el footer</p>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
