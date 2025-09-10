import React from "react";
import Form from "../../components/Form/Form";
import { Navigate, useNavigate } from "react-router-dom";


export default function Register() {
  //función para redireccionar a registro

  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault(); // para que el formulario no recargue la pagina
    navigate("/")
  };

  return (
    <Form
      title="Crear cuenta"
      subtitle="Completa tus datos"
      buttonText="Registrarse"
      onSubmit={handleRegister}
      extraFields={
        <>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Confirmar Contraseña</label>
            <input type="password" className="form-control" id="password" placeholder="Confirma la contraseña" required />
          </div>
        </>
      }
    />
  );
}