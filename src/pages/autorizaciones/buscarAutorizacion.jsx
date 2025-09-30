import React from "react";

export default function BuscarAutorizacion({ searchTerm, setSearchTerm }) {
  return (
    <div className="d-flex mb-3">
      <input
        className="form-control"
        type="search"
        placeholder="Buscar por paciente o médico..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="btn btn-primary ms-2">Buscar</button>
    </div>
  );
}
