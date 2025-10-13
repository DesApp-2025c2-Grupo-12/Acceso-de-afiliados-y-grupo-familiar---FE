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

  // Función para redireccionar al home
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!documento.trim()) {
      setErrorMessage("❌ Debés ingresar un documento");
      return;
    }
    if (!password.trim()) {
      setErrorMessage("❌ Debés ingresar una contraseña");
      return;
    }

    try {

      const resDoc = await fetch(`http://localhost:3000/affiliate/verificar-documento/${documento}`);
      if (!resDoc.ok) throw new Error("Error al verificar el documento");
      const dataDoc = await resDoc.json();
      if (!dataDoc.existe) {
        throw new Error("❌ Este documento no pertenece a un afiliado dado de alta");
      }


      const resPass = await fetch(`http://localhost:3000/affiliate/verificar-password/${documento}`);
      console.log("resPass:", resPass);
      console.log("resPass.ok:", resPass.ok);
      console.log("resPass.status:", resPass.status);
      if (!resPass.ok) throw new Error("Error al verificar la contraseña");
      const dataPass = await resPass.json()
      if (!dataPass.existe) { throw new Error("❌ El Afiliado no esta registrado11") }

      /*encodeURIComponent(password) INVESTIGAR SI CONVIENE USAR,HABRIA QUE CAMBIAR COSAS EN EL BACK CALCULO */
      const resVerPass = await fetch(`http://localhost:3000/affiliate/es-su-contrasena/${documento}/${password}`);
      if (!resVerPass.ok) throw new Error("Error al verificar la contraseña")
      const dataVerPass = await resVerPass.json()
      if (!dataVerPass.existe) {
        throw new Error("❌ La Contraseña no es correcta");
      }


      const resAfil = await fetch(`http://localhost:3000/affiliate/afiliado-por-documento/${documento}`)
      if (!resAfil.ok) throw new Error("Error en el login,Vuelve a intentarlo")

      const dataAfil = await resAfil.json()

      

      localStorage.setItem("usuarioLogueado", JSON.stringify(dataAfil))
      const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"))
    


      const resGrupoFam = await fetch(`http://localhost:3000/affiliate/grupo-familiar/${documento}`)
      if(!resGrupoFam.ok) throw  new Error("error GF")
      const dataGrupFam = await resGrupoFam.json()
      
      localStorage.setItem("grupoFamiliar", JSON.stringify(dataGrupFam))
      const grupoFami = JSON.parse(localStorage.getItem("grupoFamiliar"))
      console.log(grupoFami)

      
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
            <div className="spinner-border spinner-border-sm me-2" role="status"></div>
            <div>¡Usuario Logeado correctamente!</div>
          </div>
        </div>)}

      <div className="text-center mt-2">
        <p>
          <a href="#">¿Olvidaste tu nombre de usuario o contraseña?</a>
        </p>
        <p>
          ¿No tienes una cuenta? <Link to="/register">Crear una cuenta</Link>
        </p>
      </div>
    </>
  );
}