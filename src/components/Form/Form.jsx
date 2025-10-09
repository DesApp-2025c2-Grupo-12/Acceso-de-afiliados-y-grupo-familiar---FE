import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./Form.css";

export default function Form({ title, subtitle, buttonText, onSubmit, extraFields, documento, setDocumento }) {
  return (
    <>
      {title && <h1>{title}</h1>}
      {subtitle && <h3>{subtitle}</h3>}
      <div className="form-container">
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              {/* Input documento */}
              <div className="mb-3">
                <label htmlFor="credential" className="form-label">
                  N° de documento
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="credential"
                  placeholder="Ingresa tu documento"
                  required
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                />
              </div>

              {/* Campos adicionales */}
              {extraFields}

              <button type="submit" className="btn btn-primary w-100 mt-2">
                {buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
