import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../../components/Form/Form";

export default function Login() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [documento, setDocumento] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    // Limpiar mensajes previos
    setErrorMessage("");
    setSuccessMessage(false);

    // Validar que ingrese un documento 
    if (!documento.trim()) {
      setErrorMessage("❌ Debés ingresar un documento");
      return;
    }
    // Validar que se ingrese una contraseña
    if (!password.trim()) {
      setErrorMessage("❌ Debés ingresar una contraseña");
      return;
    }

    //  Validar que el documento tenga 8 caracteres
    if (documento.length !== 8) {
      setErrorMessage("❌ El número de documento debe tener exactamente 8 caracteres");
      return; // 
    }

    // Validar que el documento sean solo números
    if (!/^\d+$/.test(documento)) {
      setErrorMessage("❌ El documento debe contener solo números");
      return;
    }
    // validar que la contraseña tenga al menos 8 caracteres
    if (password.length < 8) {
      setErrorMessage("❌ La contraseña debe tener al menos 8 caracteres");
      return;
    }

    try {
      // Verificar documento
      const resDoc = await fetch(`http://localhost:3000/affiliate/verificar-documento/${documento}`);
      if (!resDoc.ok) {
        const errorData = await resDoc.json();
        throw new Error(errorData.error || "Error al verificar el documento");
      }
      const dataDoc = await resDoc.json();
      if (!dataDoc.existe) {
        throw new Error("❌ Este documento no pertenece a un afiliado dado de alta");
      }

      // Verificar si el afiliado está registrado
      const resPass = await fetch(`http://localhost:3000/affiliate/verificar-password/${documento}`);
      console.log("resPass:", resPass);
      console.log("resPass.ok:", resPass.ok);
      console.log("resPass.status:", resPass.status);
      if (!resPass.ok) {
        const errorData = await resPass.json();
        throw new Error(errorData.error || "Error al verificar la contraseña");
      }
      const dataPass = await resPass.json()
      if (!dataPass.existe) {
        throw new Error("❌ El Afiliado no está registrado")
      }

      // Verificar contraseña
      /*encodeURIComponent(password) INVESTIGAR SI CONVIENE USAR,HABRIA QUE CAMBIAR COSAS EN EL BACK CALCULO */
      const resVerPass = await fetch(`http://localhost:3000/affiliate/es-su-contrasena/${documento}/${password}`);
      if (!resVerPass.ok) {
        const errorData = await resVerPass.json();
        throw new Error(errorData.error || "Error al verificar la contraseña");
      }
      const dataVerPass = await resVerPass.json()
      if (!dataVerPass.existe) {
        throw new Error("❌ La contraseña no es correcta");
      }

      // Obtener datos del afiliado
      const resAfil = await fetch(`http://localhost:3000/affiliate/afiliado-por-documento/${documento}`)
      if (!resAfil.ok) throw new Error("Error en el login. Vuelve a intentarlo")
      const dataAfil = await resAfil.json()

      // Guardar en localStorage
      localStorage.setItem("usuarioLogueado", JSON.stringify(dataAfil))
      const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"))

      // Obtener grupo familiar
      const resGrupoFam = await fetch(`http://localhost:3000/affiliate/grupo-familiar/${usuario.numeroDeDocumento}`)
      if (!resGrupoFam.ok) throw new Error("Error al obtener grupo familiar")
      const dataGrupFam = await resGrupoFam.json()

      localStorage.setItem("grupoFamiliar", JSON.stringify(dataGrupFam))
      const grupoFami = JSON.parse(localStorage.getItem("grupoFamiliar"))


      setErrorMessage("");
      setSuccessMessage(true);
      setTimeout(() => navigate("/home"), 3000);

    } catch (err) {
      setErrorMessage(err.message);
      setSuccessMessage(false);
    }
  };

  return (
    <>
      <Form
        title="Bienvenido"
        subtitle="Iniciar sesión en el Portal Afiliado"
        buttonText="Iniciar sesión"
        onSubmit={handleLogin}
        documento={documento}
        setDocumento={setDocumento}
        extraFields={
          <>
            {/* Contraseña */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder="Ingresa tu contraseña"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                </span>
              </div>
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
            <div className="bi bi-check-circle-fill me-2" role="status"></div>
            <div>¡Usuario Logeado correctamente!</div>
          </div>
        </div>)}

      <div className="text-center mt-2">
        <p>
          ¿No tienes una cuenta? <Link to="/register">Crear una cuenta</Link>
        </p>
        <p>
          <a href="#">¿Olvidaste tu nombre de usuario o contraseña?</a>
        </p>

      </div>
    </>
  );
}