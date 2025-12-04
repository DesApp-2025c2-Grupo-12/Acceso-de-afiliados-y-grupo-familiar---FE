import { useState, useEffect, useRef } from "react";
import CardReceta from "./cardReceta";
import NuevaReceta from "./nuevaReceta";
import VerReceta from "./verReceta";
import RenovarReceta from "./renovarReceta";
import BuscarReceta from "./buscarReceta";
import { handleDescargar } from "./descargarReceta";
import { calcularEdad } from "../../utils/utils";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function Recetas() {
    const [integrantesCuenta, setIntegrantesCuenta] = useState([]);
    const [recetas, setRecetas] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState({
        paciente: "",
        nombreDelMedicamento: "",
        cantidad: 1,
        presentacion: "",
        observaciones: "",
    });
    const [hoverGuardar, setHoverGuardar] = useState(false);
    const [hoverNueva, setHoverNueva] = useState(false);
    const [hoverBuscar, setHoverBuscar] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [alertaDescarga, setAlertaDescarga] = useState("");
    const [recetaSeleccionada, setRecetaSeleccionada] = useState(null);
    const [recetaRenovar, setRecetaRenovar] = useState(null);
    const [desactivarBotonMenorDeEdad, setDesactivarBotonMenorDeEdad] = useState(null)



    const [estadoFilter, setEstadoFilter] = useState("Todos los estados");

    const nuevaRecetaRef = useRef(null);

    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado") || "null");

    const fetchRecetas = async () => {
            try {

                const responsePropio = await fetch(`http://localhost:3000/recipes/affiliateId/${usuarioLogueado.id}`);

                if (!responsePropio.ok) throw new Error("Error al cargar recetas Propias");
                const dataPropia = await responsePropio.json();


                const responseHijos = await fetch(`http://localhost:3000/recipes/childrensAffiliate/${usuarioLogueado.id}`);

                if (!responseHijos.ok) throw new Error("Error al cargar recetas Hijos");
                const datahijos = await responseHijos.json();


                const recetasAMostrar = [...dataPropia, ...datahijos]
                setRecetas(recetasAMostrar);

                localStorage.setItem("recetasCache", JSON.stringify(recetasAMostrar));
            } catch (err) {
                console.error("Error fetching recetas:", err);
                setError("No se pudieron cargar las recetas");
            }
        };

    useEffect(() => {
        
        fetchRecetas();

        const grupoFamiliar = JSON.parse(localStorage.getItem("grupoFamiliar")) || [];
        setIntegrantesCuenta(grupoFamiliar);
        if (calcularEdad(usuarioLogueado.fechaDeNacimiento) <= 16) {
            setDesactivarBotonMenorDeEdad(true)
        } else {
            setDesactivarBotonMenorDeEdad(false)
        }
    }, []);

    useEffect(() => { if (error) { const t = setTimeout(() => setError(""), 3000); return () => clearTimeout(t); } }, [error]);
    useEffect(() => { if (success) { const t = setTimeout(() => setSuccess(""), 3000); return () => clearTimeout(t); } }, [success]);
    useEffect(() => { if (alertaDescarga) { const t = setTimeout(() => setAlertaDescarga(""), 3000); return () => clearTimeout(t); } }, [alertaDescarga]);


    ////////////////////////////////////////////////////////////////////////////////////////


    const esFechaValida = (fechaString) => {
        if (!fechaString) return false;


        const normalized = typeof fechaString === "string" ? fechaString.replace(/\//g, "-") : fechaString;

        const fecha = new Date(normalized);
        if (isNaN(fecha)) return false;

        const limite = new Date();
        limite.setMonth(limite.getMonth() - 6);

        return fecha >= limite;
    };


    const recetasFiltradas = recetas.filter((receta) => {


        const fechaParaValidar =
            receta.fechaDeAprobacion ||
            receta.fechaDeEmision ||
            null;


        if (fechaParaValidar && !esFechaValida(fechaParaValidar)) {
            return false;
        }

        const termino = searchTerm.trim().toLowerCase();
        const nombreMedicamento = (receta.nombreDelMedicamento || "").toLowerCase();
        const nombrePaciente = (receta.paciente || "").toLowerCase();
        const estadoReceta = (receta.estado || "").toLowerCase();

        const coincideTexto =
            termino === "" ||
            nombreMedicamento.includes(termino) ||
            nombrePaciente.includes(termino);

        const coincideEstado =
            estadoFilter === "Todos los estados" ||
            estadoReceta === estadoFilter.toLowerCase();

        return coincideTexto && coincideEstado;
    });

    ///////////////////////////////////////////////////////////////////////////

    const abrirModalNuevaReceta = () => nuevaRecetaRef.current?.show();
    const abrirModalVer = (receta) => setRecetaSeleccionada(receta);


    const abrirModalRenovar = (receta) => setRecetaRenovar(receta ? { ...receta } : null);

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-nowrap">
                <h2 className="fw-bold text-dark fs-3 mb-0">MIS RECETAS</h2>
                {desactivarBotonMenorDeEdad ? (
                    <OverlayTrigger
                        placement="top"
                        overlay={
                            <Tooltip>
                                Debes ser mayor de 16 años de edad para crear una nueva receta
                            </Tooltip>
                        }
                    >
                        <span className="d-inline-block">
                            <button
                                disabled={desactivarBotonMenorDeEdad}
                                className="btn text-white px-4 py-2 fs-5"
                                style={{ backgroundColor: hoverNueva ? "#b0b0b0" : "#132074" }}
                                onMouseEnter={() => setHoverNueva(true)}
                                onMouseLeave={() => setHoverNueva(false)}
                                onClick={abrirModalNuevaReceta}
                            >
                                + Nueva Receta
                            </button>
                        </span>
                    </OverlayTrigger>
                ) : (
                    <button
                        className="btn text-white px-4 py-2 fs-5"
                        style={{ backgroundColor: hoverNueva ? "#2b47b9" : "#132074" }}
                        onMouseEnter={() => setHoverNueva(true)}
                        onMouseLeave={() => setHoverNueva(false)}
                        onClick={abrirModalNuevaReceta}
                    >
                        + Nueva Receta
                    </button>
                )}
            </div>


            {error && <div className="alert alert-danger text-center">{error}</div>}
            {success && <div className="alert alert-success text-center">{success}</div>}
            {alertaDescarga && <div className="alert alert-warning text-center">{alertaDescarga}</div>}



            <BuscarReceta
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                estadoFilter={estadoFilter}
                setEstadoFilter={setEstadoFilter}
                hoverBuscar={hoverBuscar}
                setHoverBuscar={setHoverBuscar}
            />



            <div className="row">
                {recetasFiltradas.length === 0 ? (
                    <div className="col-12 d-flex flex-column align-items-center mt-4">



                        <div
                            className="fst-italic text-center"
                            style={{
                                color: "#001F87",
                                fontWeight: "500",
                                fontSize: "1.1rem",
                                border: "1px solid #001F87",
                                borderRadius: "50px",
                                padding: "0.8rem 1.5rem",
                                backgroundColor: "white",
                                display: "inline-block",
                            }}
                        >
                            No se encontraron recetas que coincidan con tu búsqueda.
                        </div>
                    </div>
                ) : (
                    recetasFiltradas.map((receta) => (
                        <CardReceta
                            key={receta.id}
                            receta={receta}
                            handleVer={abrirModalVer}
                            handleRenovar={abrirModalRenovar}
                            handleDescargar={(r) => handleDescargar(r, setAlertaDescarga)}
                        />
                    ))
                )}
            </div>



            <NuevaReceta
                refModal={nuevaRecetaRef}
                integrantesCuenta={integrantesCuenta}
                formData={formData}
                setFormData={setFormData}
                setRecetas={setRecetas}
                error={error}
                setError={setError}
                success={success}
                setSuccess={setSuccess}
                hoverGuardar={hoverGuardar}
                setHoverGuardar={setHoverGuardar}
            />

            <VerReceta
                receta={recetaSeleccionada}
                setRecetaSeleccionada={setRecetaSeleccionada}
                setSuccess={setSuccess}
                setError={setError}
            />


            <RenovarReceta
                receta={recetaRenovar}
                setRecetaRenovar={setRecetaRenovar}
                formData={formData}
                setFormData={setFormData}
                setRecetas={setRecetas}
                error={error}
                setError={setError}
                success={success}
                setSuccess={setSuccess}
                hoverGuardar={hoverGuardar}
                setHoverGuardar={setHoverGuardar}
                fetchRecetas={fetchRecetas}
            />
        </div>
    );
}
