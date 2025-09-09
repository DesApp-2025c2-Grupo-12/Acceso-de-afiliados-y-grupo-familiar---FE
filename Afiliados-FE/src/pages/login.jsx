import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../components/Form";

export default function Login() {
    const navigate = useNavigate();

    //función para redireccionar el home
    const handleLogin = (e) => { 
    e.preventDefault(); // evitar que el formulario recargue la pagina
    navigate("/home");
  };

  return (
    <>
      <Form
        title="Bienvenido"
        subtitle="Iniciar sesión en el Portal Afiliado"
        buttonText="Iniciar sesión"
        onSubmit={handleLogin}
      />
      <div className="text-center mt-2">
        <p>
          <a href="#">¿Olvidaste tu nombre de usuario o contraseña?</a>
        </p>
        <p>
          ¿No tienes una cuenta? <Link to="/register">Crear una cuenta</Link>
        </p>
        


      {/*BOTON TEMPORAL PARA VER RECETAS*/}
         <div className="mt-3">
          <Link to="/recetas" className="btn btn-success">
            Ir a Recetas
          </Link>
        </div>

        
      </div>
    </>
  );
}