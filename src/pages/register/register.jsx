import React, { useState, useEffect } from "react";
import Form from "../../components/Form/Form";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setSuccessMessage(true);
  };

  // Cuando successMessage cambia a true, arranca el temporizador
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000); // 3 segundos
      return () => clearTimeout(timer);
    }
  }, [successMessage, navigate]);

  return (
    <>
      <Form
        title="Crear cuenta"
        subtitle="Completa tus datos"
        buttonText="Registrarse"
        onSubmit={handleRegister}
        extraFields={
          <>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Confirma la contraseña"
                required
              />
            </div>
          </>
        }
      />

      {successMessage && (
        <div className="d-flex justify-content-center mt-3">
          <div className="alert alert-success d-flex align-items-center" role="alert">
            <div className="spinner-border spinner-border-sm me-2" role="status"></div>
            <div>¡Usuario registrado correctamente!</div>
          </div>
        </div>
      )}
    </>
  );
}
