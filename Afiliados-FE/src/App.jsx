import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Header from './components/Header'
import Login from './pages/login'
import Register from './pages/register'
import Home from './pages/home'
import 'bootstrap-icons/font/bootstrap-icons.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
 return (
  <Router>
    <div className="d-flex flex-column min-vh-100">
      <Header/>
      <main className="container my-5 flex-grow-1">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register/>} />
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

