import { useState } from "react";
import CardAutorizacion from "./cardAutorizacion";
import NuevaAutorizacion from "./nuevaAutorizacion";
import VerAutorizacion from "./verAutorizacion";
import BuscarAutorizacion from "./buscarAutorizacion";

// Datos de prueba
const autorizacionesData = [
  {
    id: 1,
    fecha: "Lunes 21 de Septiembre",
    medico: "Kenzo Tenma",
    lugar: "Hospital municipal de Hurlingham",
    especialidad: "Cardiologia",
    internacion: "8 dias",
    paciente: "Franco Cantero",
    tipodeAF: "Hijo, Menor de edad",
    observaciones: "Observaciones ejemplo",
    estado: "Pendiente",
  },
  {
    id: 2,
    fecha: "Miercoles 12 de Agosto",
    medico: "Fiodor Poe",
    lugar: "Hospital municipal de Hurlingham",
    especialidad: "Dermatologia",
    internacion: "Sin internacion",
    paciente: "Franco Cantero",
    tipodeAF: "Hijo, Menor de edad",
    observaciones: "",
    estado: "Pendiente",
  },
  {
    id: 3,
    fecha: "Martes 13 de Junio",
    medico: "Kenzo Tenma",
    lugar: "Sanatorio Trinidad",
    especialidad: "Pediatria",
    internacion: "14 dias",
    paciente: "Bianca Margarita",
    tipodeAF: "Titular",
    observaciones: "Observaciones ejemplo",
    estado: "Aprobado",
  },
];

export default function Autorizaciones() {
  const [autorizaciones, setAutorizaciones] = useState(autorizacionesData);
  const [hoverNueva, setHoverNueva] = useState(false);
  const [hoverGuardar, setHoverGuardar] = useState(false);
  const [hoverBuscar, setHoverBuscar] = useState(false);
  const [formData, setFormData] = useState({
    fecha: "",
    integrante: "",
    medico: "",
    especialidad: "",
    lugar: "",
    internacion: 1,
    observaciones: "",
    tipodeAF: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [autorizacionSeleccionada, setAutorizacionSeleccionada] = useState(null);

  // Filtrado por paciente o médico
  const autorizacionesFiltradas = autorizaciones.filter(
    (a) =>
      a.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.medico.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-nowrap">
        <h2 className="fw-bold text-dark fs-3 mb-0">MIS AUTORIZACIONES</h2>
        <button
          className="btn text-white px-4 py-2 fs-5"
          style={{ backgroundColor: hoverNueva ? "#b0b0b0" : "#132074" }}
          onMouseEnter={() => setHoverNueva(true)}
          onMouseLeave={() => setHoverNueva(false)}
          data-bs-toggle="modal"
          data-bs-target="#nuevaAutorizacionModal"
        >
          + Nueva Autorización
        </button>
      </div>

      {success && (
        <div className="alert alert-success text-center mb-4" role="alert">
          {success}
        </div>
      )}

      <BuscarAutorizacion
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        hoverBuscar={hoverBuscar}
        setHoverBuscar={setHoverBuscar}
      />

      <div className="row">
        {autorizacionesFiltradas.map((auto) => (
          <CardAutorizacion
            key={auto.id}
            autorizacion={auto}
            setAutorizacionSeleccionada={setAutorizacionSeleccionada}
          />
        ))}
      </div>

      <NuevaAutorizacion
        formData={formData}
        setFormData={setFormData}
        autorizaciones={autorizaciones}
        setAutorizaciones={setAutorizaciones}
        hoverGuardar={hoverGuardar}
        setHoverGuardar={setHoverGuardar}
        error={error}
        setError={setError}
        success={success}
        setSuccess={setSuccess}
      />

      {autorizacionSeleccionada && (
        <VerAutorizacion
          autorizacion={autorizacionSeleccionada}
          setAutorizacionSeleccionada={setAutorizacionSeleccionada}
        />
      )}
    </div>
  );
}
