import { useState } from "react";

export default function Recetas() {
  const [hoverNueva, setHoverNueva] = useState(false);
  const [hoverBuscar, setHoverBuscar] = useState(false);

  const recetasData = [
    { id: 1, nombre: "Paracetamol 500 mg, Comprimidos × 15", paciente: "Juan Salvo", estado: "Pendiente" },
    { id: 2, nombre: "Ibuprofeno 600 mg, Comprimidos × 30", paciente: "Juan Salvo", estado: "Pendiente" },
    { id: 3, nombre: "Amoxicilina 250 mg, Jarabe × 1 Unidad", paciente: "Juan Salvo", estado: "Entregada" },
    { id: 4, nombre: "Calcitriol, 0.25 mcg Cápsulas × 30", paciente: "Juan Salvo", estado: "Entregada" },
    { id: 5, nombre: "Vitamina D, 20 mg Comprimidos × 30", paciente: "Juan Salvo", estado: "Pendiente" },
    { id: 6, nombre: "Vitamina A, 20 mg Comprimidos × 15", paciente: "Juan Salvo", estado: "Entregada" },
  ];

  return (
    <div className="bg-light min-vh-100 p-4">
      <div className="container">

        <div className="d-flex justify-content-between align-items-center mb-4 flex-nowrap">
          <h2 className="fw-bold text-dark fs-3 mb-0">MIS RECETAS - Juan Salvo</h2>

          <button
            className="btn text-white px-4 py-2 fs-5"
            style={{ backgroundColor: hoverNueva ? "#b0b0b0" : "#132074" }}
            onMouseEnter={() => setHoverNueva(true)}
            onMouseLeave={() => setHoverNueva(false)}
          >
            + Nueva Receta
          </button>
        </div>


        <div className="d-flex align-items-center mb-4 flex-nowrap" style={{ gap: "8px" }}>
          <input
            className="form-control"
            type="search"
            placeholder="Buscar..."
            aria-label="Buscar"
          />
          <button
            className="btn text-white"
            style={{ backgroundColor: hoverBuscar ? "#b0b0b0" : "#132074" }}
            onMouseEnter={() => setHoverBuscar(true)}
            onMouseLeave={() => setHoverBuscar(false)}
          >
            Buscar
          </button>
        </div>

    
        <div className="row">
          {recetasData.map((receta) => (
            <div key={receta.id} className="col-md-6 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{receta.nombre}</h5>
                  <p className="text-muted mb-2">{receta.paciente}</p>

                  <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
        
                    <span
                      className={`badge px-3 py-2 fs-6 ${
                        receta.estado === "Pendiente"
                          ? "bg-warning text-dark"
                          : "bg-success text-dark"
                      }`}
                    >
                      {receta.estado}
                    </span>

                 
                    <div className="mt-2 mt-md-0">
                      <button className="btn btn-outline-dark btn-sm me-2">Ver</button>
                      <button className="btn btn-outline-dark btn-sm me-2">Renovar</button>
                      <button className="btn btn-outline-dark btn-sm">Descargar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
