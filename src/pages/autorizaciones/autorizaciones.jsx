import { useState } from "react";

const autorizacionesData = [
    {
        id: 1,
        fecha: "Lunes 21 de Septiembre",
        medico: "Kenzo Tenma",
        lugar: "Hospital municipal de Hurlingham",
        especialidad: "Cardiologia",
        internacion: "8 dias",
        paciente: "franco cantero",
        tipodeAF: "Hijo,Menor de edad",
        estado: "Pendiente",
    },
    {
        id: 2,
        fecha: "Miercoles 12 de Agosto",
        medico: "Kenzo Tenma",
        lugar: "Hospital municipal de Hurlingham",
        especialidad: "Dermatologia",
        internacion: "Sin internacion",
        paciente: "franco cantero",
        tipodeAF: "Hijo,Menor de edad",
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
        tipodeAF: "titular",
        estado: "Aprobado",
    },
    {
        id: 4,
        fecha: "Lunes 21 de Mayo",
        medico: "Kenzo Tenma",
        lugar: "Sanatorio Trinidad",
        especialidad: "Pediatria",
        internacion: "Sin internacion",
        paciente: "Bianca Margarita",
        tipodeAF: "titular",
        estado: "Aprobado",
    },
    {
        id: 5,
        fecha: "Lunes 21 de Septiembre",
        medico: "Kenzo Tenma",
        lugar: "Clinica Modelo de Moron",
        especialidad: "Pediatria",
        internacion: "3 dias",
        paciente: "Bianca Margarita",
        tipodeAF: "titular",
        estado: "Pendiente",
    },
    {
        id: 6,
        fecha: "Lunes 21 de Enero",
        medico: "Kenzo Tenma",
        lugar: "Clinica Modelo de Moron",
        especialidad: "Pediatria",
        internacion: "Sin internacion",
        paciente: "Bianca Margarita",
        tipodeAF: "titular",
        estado: "Aprobado",
    },
];

export default function Autorizaciones() {
    const [hoverNueva, setHoverNueva] = useState(false);
    const [hoverGuardar, setHoverGuardar] = useState(false);
    const [autorizaciones, setAutorizaciones] = useState(autorizacionesData);
    const [formData, setFormData] = useState({
        fecha: "",
        medico: "",
        lugar: "",
        especialidad: "",
        internacion: 1,
        paciente: "",
        tipodeAF: ""
    });

    // Handle change in form fields
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    // Function to handle saving a new authorization
    const handleGuardar = () => {
        const nuevaAutorizacion = {
            id: autorizaciones.length + 1, 
            fecha: formData.fecha,
            medico: formData.medico,
            lugar: formData.lugar,
            especialidad: formData.especialidad,
            internacion: formData.internacion,
            paciente: formData.paciente || "Juan Salvo", 
            tipodeAF: formData.tipodeAF,
            estado: "Pendiente",
        };

        setAutorizaciones([...autorizaciones, nuevaAutorizacion]);
        
        setFormData({
            fecha: "",
            medico: "",
            lugar: "",
            especialidad: "",
            internacion: 1,
            paciente: "",
            tipodeAF: ""
        });
    };

    return (
        <>
            <div className="autorizaciones-page d-flex">
                <div className="autorizaciones-content flex-grow-1 p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="tituloAtorizaciones">MIS AUTORIZACIONES</h2>
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
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button className="botonBusqueda ms-2" type="submit">
                            Buscar
                        </button>
                    </div>

                    <div className="row">
                        {autorizaciones.map((auto) => (
                            <div key={auto.id} className="col-md-6 mb-4">
                                <div className="card recetaCard h-100">
                                    <div className="card-body p-3">
                                        <h5 className="card-title text-start mb-3">Fecha: {auto.fecha}</h5>
                                        <h5 className="card-title text-start mb-3">Medico: {auto.medico}</h5>
                                        <h5 className="card-title text-start mb-3">Lugar: {auto.lugar}</h5>
                                        <h5 className="card-title text-start mb-3">Especialidad: {auto.especialidad}</h5>
                                        <h5 className="card-title text-start mb-3">Internacion: {auto.internacion}</h5>
                                        <h5 className="card-title text-start mb-3">Paciente: {auto.paciente}</h5>
                                        <h5 className="card-title text-start mb-3">Tipo De AF: {auto.tipodeAF}</h5>
                                        <h5 className="card-title text-start mb-3">Estado: {auto.estado}</h5>
                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <span
                                                className={`badge badge-pendiente px-3 py-2 ${auto.estado === "Pendiente"
                                                    ? "badge-pendiente"
                                                    : "badge-entregada"
                                                    }`}
                                            >
                                                {auto.estado}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal Nueva Autorización */}
            <div className="modal fade" id="nuevaAutorizacionModal" tabIndex="-1" aria-labelledby="nuevaAutorizacionModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header" style={{ backgroundColor: "#132074", color: "white" }}>
                            <h5 className="modal-title" id="nuevaAutorizacionModalLabel">Nueva Autorización</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Fecha</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="fecha"
                                    value={formData.fecha}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Médico</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="medico"
                                    value={formData.medico}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Lugar</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="lugar"
                                    value={formData.lugar}
                                    onChange={handleChange}
                                    min={1}
                                    max={2}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Especialidad</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="especialidad"
                                    value={formData.especialidad}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Internación</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="internacion"
                                    value={formData.internacion}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Tipo de AF</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="tipodeAF"
                                    value={formData.tipodeAF}
                                    onChange={handleChange}
                                />
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
        </>
    );
}
