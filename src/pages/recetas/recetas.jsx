import "./recetas.css";

const recetasData = [
    {
        id: 1,
        nombre: "Paracetamol 500 mg, Comprimidos × 15",
        paciente: "Juan Salvo",
        estado: "Pendiente",
    },
    {
        id: 2,
        nombre: "Ibuprofeno 600 mg, Comprimidos × 30",
        paciente: "Juan Salvo",
        estado: "Pendiente",
    },
    {
        id: 3,
        nombre: "Amoxicilina 250 mg, Jarabe × 1 Unidad",
        paciente: "Juan Salvo",
        estado: "Entregada",
    },
    {
        id: 4,
        nombre: "Calcitriol, 0.25 mcg Cápsulas × 30",
        paciente: "Juan Salvo",
        estado: "Entregada",
    },
    {
        id: 5,
        nombre: "Vitamina D, 20 mg Comprimidos × 30",
        paciente: "Juan Salvo",
        estado: "Pendiente",
    },
    {
        id: 6,
        nombre: "Vitamina A, 20 mg Comprimidos × 15",
        paciente: "Juan Salvo",
        estado: "Entregada",
    },
];

export default function Recetas() {
    return (
        <div className="recetas-page d-flex">
            <div className="recetas-content flex-grow-1 p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="tituloRecetas">MIS RECETAS - Juan Salvo</h2>
                    <button className="miBoton">+ Nueva Receta</button>
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
                    {recetasData.map((receta) => (
                        <div key={receta.id} className="col-md-6 mb-4">
                            <div className="card recetaCard h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{receta.nombre}</h5>
                                    <p className="text-muted">{receta.paciente}</p>

                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <span
                                            className={`badge badge-pendiente px-3 py-2 ${receta.estado === "Pendiente"
                                                ? "badge-pendiente"
                                                : "badge-entregada"
                                                }`}
                                        >
                                            {receta.estado}
                                        </span>

                                        <div>
                                            <button className="BotonVerReceta">Ver</button>
                                            <button className="BotonRenovar">Renovar</button>
                                            <button className="BotonDescargar"> Descargar</button>
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
