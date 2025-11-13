import React, { useState } from "react";
import Form from "../../components/Form/Form";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [documento, setDocumento] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validaciones locales
    if (!documento.trim()) {
      setErrorMessage("❌ Debés ingresar un documento");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("❌ Las contraseñas no coinciden");
      setSuccessMessage(false);
      return;
    }

    try {

      const resDoc = await fetch(`http://localhost:3000/affiliate/verificar-documento/${documento}`);
      if (!resDoc.ok) {
        const errorData = await resDoc.json();
        throw new Error(errorData.error || "Error al verificar el documento");
      }
      const dataDoc = await resDoc.json();
      if (!dataDoc.existe) {
        throw new Error("❌ Este documento no pertenece a un afiliado dado de alta");
      }


      const resPass = await fetch(`http://localhost:3000/affiliate/verificar-password/${documento}`);
      if (!resPass.ok) {
        const errorData = await resPass.json();
        throw new Error(errorData.error || "Error al verificar la contraseña");
      }

      const dataPass = await resPass.json();

      
      if (!dataPass.existe) {
        
        const resAgregar = await fetch(`http://localhost:3000/affiliate/agregar-password/${documento}/${password}`, {
          method: 'PUT'
        });

        if (!resAgregar.ok) {
          const errorData = await resAgregar.json();
          throw new Error(errorData.error || "Error al agregar la contraseña");
        }
      }

        setErrorMessage("");
        setSuccessMessage(true);
        setTimeout(() => navigate("/"), 3000);

      } catch (err) {

        setErrorMessage(err.message);
        setSuccessMessage(false);

      }
    };


    return (
      <>
        <Form
          title="Crear cuenta"
          subtitle="Completa tus datos"
          buttonText="Registrarse"
          onSubmit={handleRegister}
          documento={documento}
          setDocumento={setDocumento}
          extraFields={
            <>
              {/* Contraseña */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
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

              {/* Confirmar Contraseña */}
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
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
        <button
          type="button"
          className="btn btn-primary mt-2"
          style={{ color: "white", textDecoration: "none", cursor: "pointer" }}
          onClick={() => { navigate("/"); }}
        >Volver al Login
        </button>
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
              <div className="bi bi-check-circle-fill me-2" role="status"></div>
              <div>¡Usuario registrado correctamente!</div>
            </div>
          </div>
        )}
      </>
    );
  }
