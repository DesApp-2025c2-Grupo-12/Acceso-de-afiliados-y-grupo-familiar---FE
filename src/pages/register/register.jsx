import React, { useState, useEffect } from "react";
import Form from "../../components/Form/Form";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    // Validación de contraseñas
    if (password !== confirmPassword) {
      setErrorMessage("❌ Las contraseñas no coinciden");
      setSuccessMessage(false);
      return;
    }

    // Si pasa la validación
    setErrorMessage("");
    setSuccessMessage(true);
  };

  // Redirigir después de 3 segundos si se registró bien
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        navigate("/"); // redirige al inicio
      }, 3000);
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
            {/* Campo Contraseña */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Contraseña"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Campo Confirmar Contraseña */}
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirma la contraseña"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </>
        }
      />

      {/* Mensaje de error */}
      {errorMessage && (
        <div className="d-flex justify-content-center mt-3">
          <div className="alert alert-danger d-flex align-items-center" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            <div>{errorMessage}</div>
          </div>
        </div>
      )}

      {/* Mensaje de éxito */}
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
