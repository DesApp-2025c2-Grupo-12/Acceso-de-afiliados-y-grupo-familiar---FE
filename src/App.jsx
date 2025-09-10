import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Login from './pages/login/login'
import Register from './pages/register/register'
import Home from './pages/home/home'
import Recetas from './pages/recetas/recetas'  
import Turnos from './pages/turnos/turnos'
import 'bootstrap-icons/font/bootstrap-icons.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reintegros from './pages/reintegros/reintegros'

function App() {
 return (
  <Router>
    <div className="d-flex flex-column min-vh-100">
      <Header/>
      <main className="container my-5 flex-grow-1">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/about" element={<p>Contacto...</p>} />
          <Route path="/recetas" element={<Recetas />} />
          <Route path="/turnos" element={<Turnos />} />
          <Route path="/reintegros" element={<Reintegros />} />
        </Routes>
      </main>
      <Footer/>
    </div>
  </Router>
)

}

export default App

