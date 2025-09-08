import React from "react";
import "./Form.css";

export default function Form({ title, subtitle, buttonText, onSubmit }) {
  return (
    <>
      {title && <h1>{title}</h1>}
      {subtitle && <h3>{subtitle}</h3>}
      <div className="form-container">
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="credential" className="form-label">Usuario</label>
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
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Ingresa tu contraseña"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">{buttonText}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}