import { useState } from "react";

export default function Recetas() {
  const recetasData = [
    { id: 1, nombre: "Paracetamol 500 mg, Comprimidos × 15", paciente: "Juan Salvo", estado: "Pendiente" },
    { id: 2, nombre: "Ibuprofeno 600 mg, Comprimidos × 30", paciente: "Juan Salvo", estado: "Pendiente" },
    { id: 3, nombre: "Amoxicilina 250 mg, Jarabe × 1 Unidad", paciente: "Juan Salvo", estado: "Entregada" },
  ];

  const [recetas, setRecetas] = useState(recetasData);
  const [formData, setFormData] = useState({
    integrante: "",
    nombre: "",
    cantidad: 1,
    presentacion: "",
    observaciones: "",
    imagen: null,
  });

  const [hoverGuardar, setHoverGuardar] = useState(false);
  const [hoverNueva, setHoverNueva] = useState(false);
  const [hoverBuscar, setHoverBuscar] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleGuardar = () => {
    // con tope de 2
    const cantidadNum = parseInt(formData.cantidad);
    if (cantidadNum < 1 || cantidadNum > 2) {
      alert("La cantidad debe ser 1 o 2");
      return;
    }

    const nuevaReceta = {
      id: recetas.length + 1,
      nombre: `${formData.nombre}, ${formData.presentacion} × ${formData.cantidad}`,
      paciente: formData.integrante || "Juan Salvo",
      estado: "Pendiente",
    };

    setRecetas([...recetas, nuevaReceta]);
    setFormData({
      integrante: "",
      nombre: "",
      cantidad: 1,
      presentacion: "",
      observaciones: "",
      imagen: null,
    });

    
    const modalEl = document.getElementById("nuevaRecetaModal");
    const modal = window.bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  };

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
            data-bs-toggle="modal"
            data-bs-target="#nuevaRecetaModal"
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
          {recetas.map((receta) => (
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

     
        <div className="modal fade" id="nuevaRecetaModal" tabIndex="-1" aria-labelledby="nuevaRecetaModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header" style={{ backgroundColor: "#132074", color: "white" }}>
                <h5 className="modal-title" id="nuevaRecetaModalLabel">Nueva Receta</h5>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Integrante</label>
                  <input type="text" className="form-control" name="integrante" value={formData.integrante} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Cantidad</label>
                  <input type="number" className="form-control" name="cantidad" value={formData.cantidad} onChange={handleChange} min={1} max={2} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Presentación</label>
                  <input type="text" className="form-control" name="presentacion" value={formData.presentacion} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Observaciones</label>
                  <textarea className="form-control" name="observaciones" value={formData.observaciones} onChange={handleChange} />
                </div>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button
                  type="button"
                  className="btn text-white"
                  style={{ backgroundColor: hoverGuardar ? "#b0b0b0" : "#132074" }}
                  onMouseEnter={() => setHoverGuardar(true)}
                  onMouseLeave={() => setHoverGuardar(false)}
                  onClick={handleGuardar}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
