import { useState } from "react";

export default function Recetas() {

  // Array con integrantes de la cuenta (ejemplo)
  const integrantesCuenta = ["Juan Salvo", "Ana Salvo", "María Salvo"];

  // Array con datos de prueba
  const recetasAfiliado = [
    { id: 1, nombre: "Paracetamol 500 mg, Comprimidos × 15", paciente: "Juan Salvo", estado: "Pendiente", observaciones: "Tomar después de comer" },
    { id: 2, nombre: "Ibuprofeno 600 mg, Comprimidos × 30", paciente: "Juan Salvo", estado: "Pendiente", observaciones: "" },
    { id: 3, nombre: "Amoxicilina 250 mg, Jarabe × 1 Unidad", paciente: "Juan Salvo", estado: "Entregada", observaciones: "Conservar en heladera" },
  ];

  const [recetas, setRecetas] = useState(recetasAfiliado);

  // para la búsqueda de recetas
  const [searchTerm, setSearchTerm] = useState(""); 

  // Datos del form
  const [formData, setFormData] = useState({
    integrante: "",
    nombre: "",
    cantidad: 1,
    presentacion: "",
    observaciones: "",
  });

  // hovers para los botones
  const [hoverGuardar, setHoverGuardar] = useState(false);
  const [hoverNueva, setHoverNueva] = useState(false);
  const [hoverBuscar, setHoverBuscar] = useState(false);

  // estado para errores
  const [error, setError] = useState(""); 

  // Maneja cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Guardar receta nueva (tope 2 en cantidad) y campos obligatorios
  const handleGuardar = () => {
    const cantidadNum = parseInt(formData.cantidad);

    // Validaciones
    if (!formData.integrante || !formData.nombre || !formData.presentacion) {
      setError("Todos los campos obligatorios deben completarse");
      return;
    }

    if (cantidadNum < 1 || cantidadNum > 2) {
      setError("La cantidad debe ser 1 o 2");
      return;
    }

    const nuevaReceta = {
      id: recetas.length + 1,
      nombre: `${formData.nombre}, ${formData.presentacion} × ${formData.cantidad}`,
      paciente: formData.integrante || "Juan Salvo",
      estado: "Pendiente",
      observaciones: formData.observaciones || "",
    };

    setRecetas([...recetas, nuevaReceta]);

    // limpiar form
    setFormData({
      integrante: "",
      nombre: "",
      cantidad: 1,
      presentacion: "",
      observaciones: "",
    });

    setError(""); // limpia errores

    // cierra modal
    const modalEl = document.getElementById("nuevaRecetaModal");
    if (modalEl) {
      modalEl.classList.remove("show");
      modalEl.setAttribute("aria-hidden", "true");
      modalEl.style.display = "none";
      document.body.classList.remove("modal-open");
    }

    
  };

  // funcion para descargar la receta
  const handleDescargar = (receta) => {
    const contenido = `
Receta Médica
-----------------------
Paciente: ${receta.paciente}
Medicamento: ${receta.nombre}
Estado: ${receta.estado}
Observaciones: ${receta.observaciones || "Ninguna"}
    `;

    const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `Receta_${receta.id}.txt`; // nombre del archivo
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url); // limpia memoria
  };

  // Filtra la receta
  const recetasFiltradas = recetas.filter((receta) =>
    receta.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
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

      {/* busca receta */}
      <div className="d-flex align-items-center mb-4 flex-nowrap" style={{ gap: "8px" }}>
        <input
          className="form-control"
          type="search"
          placeholder="Buscar..."
          aria-label="Buscar"
          value={searchTerm}                
          onChange={(e) => setSearchTerm(e.target.value)} 
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

      {/* Listado de recetas filtradas para usar en el buscador*/}
      <div className="row">
        {recetasFiltradas.map((receta) => (
          <div key={receta.id} className="col-md-6 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{receta.nombre}</h5>
                <p className="text-muted mb-2">{receta.paciente}</p>

                <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                  <span
                    className={`badge px-3 py-2 fs-6 ${receta.estado === "Pendiente" ? "bg-warning text-dark" : "bg-success text-dark"}`}
                  >
                    {receta.estado}
                  </span>
                  <div className="mt-2 mt-md-0">
                    <button className="btn btn-outline-dark btn-sm me-2">Ver</button>
                    <button className="btn btn-outline-dark btn-sm me-2">Renovar</button>
                    <button
                      className="btn btn-outline-dark btn-sm"
                      onClick={() => handleDescargar(receta)}
                    >
                      Descargar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para la nueva receta */}
      <div className="modal fade" id="nuevaRecetaModal" tabIndex="-1" aria-labelledby="nuevaRecetaModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header" style={{ backgroundColor: "#132074", color: "white" }}>
              <h5 className="modal-title" id="nuevaRecetaModalLabel">Nueva Receta</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              {/* Mensaje de error */}
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {/* opciones para integrante */}
              <div className="mb-3">
                <label className="form-label">Seleccionar integrante</label>
                <select
                  className="form-select"
                  name="integrante"
                  value={formData.integrante}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar...</option>
                  {integrantesCuenta.map((integrante, index) => (
                    <option key={index} value={integrante}>
                      {integrante}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Nombre de medicamento</label>
                <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label className="form-label">Cantidad</label>
                <input type="number" className="form-control" name="cantidad" value={formData.cantidad} onChange={handleChange} min={1} max={2} />
              </div>

              {/* opciones para presentación */}
              <div className="mb-3">
                <label className="form-label">Presentación</label>
                <select
                  className="form-select"
                  name="presentacion"
                  value={formData.presentacion}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar...</option>
                  <option value="Comprimidos">Comprimidos</option>
                  <option value="Jarabe">Jarabe</option>
                  <option value="Gotas">Gotas</option>
                  <option value="Otros">Otro</option>
                </select>
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
  );
}
