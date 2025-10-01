import React from "react";

export default function buscarReceta({ searchTerm, setSearchTerm, hoverBuscar, setHoverBuscar }) {

  return (
    <div className="d-flex align-items-center mb-4 flex-nowrap" style={{ gap: "8px" }}>
      
      {/* Input de búsqueda */}
      <input
        className="form-control"
        type="search"
        placeholder="Buscar por nombre de medicamento..."
        aria-label="Buscar"
        value={searchTerm}                
        onChange={(e) => setSearchTerm(e.target.value)} 
      />

      
    </div>
  );
}
