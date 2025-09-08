import './App.css'
import Navbar from './components/Navbar'
import Form from './components/Form'
import Footer from './components/Footer'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
 return (
  <Router>
    <div className="d-flex flex-column min-vh-100">
      <Navbar/>
      <main className="container my-5 flex-grow-1">
        <Routes>
          <Route path='/' element={<h1>Bienvenido a Medicina Integral</h1>} />
          <Route path="/login" element={<Form />} />
          <Route path='/register' element={<p>Registro...</p>} />
          <Route path="/home" element={<p>Home...</p>} />
          <Route path="/about" element={<p>Contacto...</p>} />
        </Routes>
      </main>
      <Footer/>
    </div>
  </Router>
)

}

export default App

