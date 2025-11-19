import React from "react";

export default function BuscarAutorizacion({ searchTerm, setSearchTerm}) {
  return (
    <div className="d-flex align-items-center mb-4 flex-nowrap" style={{ gap: "8px" }}>
      
      {/* Input de búsqueda */}
      <input
        className="form-control"
        type="search"
        placeholder="Buscar por nombre de paciente o médico..."
        aria-label="Buscar"
        value={searchTerm}                
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
    </div>
  );
}

