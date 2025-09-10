

const AutorizacionesData = [
    {
        id: 1,
        fecha: "Lunes 21 de Septiembre",
        medico: "Kenzo Tenma",
        especialidad: "Cardiologia",
        lugar: "Hospital municipal de Hurlingham",
        internacion: "8 dias",
        paciente: "franco cantero",
        tipodeAF: "Hijo,Menor de edad",
        estado: "Pendiente",
    },
    {
        id: 2,
        fecha: "Miercoles 12 de Agosto",
        medico: "Kenzo Tenma",
        especialidad: "Dermatologia",
        lugar: "Hospital municipal de Hurlingham",
        internacion: "Sin internacion",
        paciente: "franco cantero",
        tipodeAF: "Hijo,Menor de edad",
        estado: "Pendiente",
    },
    {
        id: 3,
        fecha: "Martes 13 de Junio",
        especialidad: "Pediatria",
        medico: "Kenzo Tenma",
        lugar: "Sanatorio Trinidad",
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
        especialidad: "Pediatria",
        lugar: "Clinica Modelo de Moron",
        internacion: "3 dias",
        paciente: "Bianca Margarita",
        tipodeAF: "titular",
        estado: "Pendiente",
    },
    {
        id: 6,
        fecha: "Lunes 21 de Enero",
        medico: "Kenzo Tenma",
        especialidad: "Pediatria",
        lugar: "Clinica Modelo de Moron",
        internacion: "Sin internacion",
        paciente: "Bianca Margarita",
        tipodeAF: "titular",
        estado: "Aprobado",
    },
];

export default function Recetas() {
    return (
        <div className="autorizaciones-page d-flex">
            <div className="autorizaciones-content flex-grow-1 p-4">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="tituloAtorizaciones">MIS AUTORIZACIONES</h2>
                    <button className="miBoton">+ Nueva Autorizacion</button>
                </div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                <input
                    className="form-control"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                />
                <button className="botonBusqueda ms-2" type="submit">Buscar</button>
            </div>

                <div className="row">
                    {AutorizacionesData.map((auto) => (
                        <div key={auto.id} className="col-md-6 mb-4">
                            <div className="card recetaCard h-100">
                                <div className="card-body p-3">
                                    <h5 className="card-title text-start mb-2"> Fecha: {auto.fecha}</h5>
                                    <h5 className="card-title text-start mb-3"> Paciente: {auto.paciente}</h5>
                                    <p className="text-start text-muted mb-1">Tipo de Afiliado: {auto.tipodeAF}</p>
                                    <p className="text-start text-muted mb-1">Medico: {auto.medico}</p>
                                    <p className="text-start text-muted mb-1">Especialidad: {auto.especialidad}</p>
                                    <p className="text-start text-muted mb-1">Lugar de Prestacion: {auto.lugar}</p>
                                    <p className="text-start text-muted mb-1">Dias de Internacion: {auto.internacion}</p>

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
    );
}
