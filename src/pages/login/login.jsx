import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../../components/Form/Form";

export default function Login() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Función para redireccionar al home
  const handleLogin = (e) => { 
    e.preventDefault(); // evitar que el formulario recargue la página
    navigate("/home");
  };

  return (
    <>
      <Form
        title="Bienvenido"
        subtitle="Iniciar sesión en el Portal Afiliado"
        buttonText="Iniciar sesión"
        onSubmit={handleLogin}
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