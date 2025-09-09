import React, { useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./Form.css";

export default function Form({ title, subtitle, buttonText, onSubmit, extraFields }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      {title && <h1>{title}</h1>}
      {subtitle && <h3>{subtitle}</h3>}
      <div className="form-container">
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="credential" className="form-label">N° de documento</label>
                <input
                  type="text"
                  className="form-control"
                  id="credential"
                  placeholder="Ingresa tu documento"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    placeholder="Ingresa contraseña"
                    required
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
              {extraFields}
              <button type="submit" className="btn btn-primary w-100">{buttonText}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}