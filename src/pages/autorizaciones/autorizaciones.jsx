import { useState, useEffect } from "react";
import CardAutorizacion from "./cardAutorizacion";
import NuevaAutorizacion from "./nuevaAutorizacion";
import VerAutorizacion from "./verAutorizacion";
import BuscarAutorizacion from "./buscarAutorizacion";
import EditarAutorizacion from "./editarAutorizacion";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { calcularEdad } from "../../utils/utils";
export default function Autorizaciones() {
  const [autorizaciones, setAutorizaciones] = useState([]);
  const [hoverNueva, setHoverNueva] = useState(false);
  const [hoverBuscar, setHoverBuscar] = useState(false);
  const [integrantesCuenta, setIntegrantesCuenta] = useState([]);
  const [formData, setFormData] = useState({
    fecha: "",
    paciente: "",
    pacienteId: "",
    medico: "",
    especialidad: "",
    lugar: "",
    internacion: 0,
    observaciones: "",
    tipodeAF: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [autorizacionSeleccionada, setAutorizacionSeleccionada] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado") || "null");
  const grupoFamiliar = JSON.parse(localStorage.getItem("grupoFamiliar") || "[]");
  const integrantesCuentaStorage = usuarioLogueado ? [usuarioLogueado, ...grupoFamiliar] : [];
  const [desactivarBotonMenorDeEdad, setDesactivarBotonMenorDeEdad] = useState(null)


  // ESTADOS NUEVOS para el modal de confirmación de borrado y modificacion
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [autorizacionAEliminar, setAutorizacionAEliminar] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [autorizacionParaVer, setAutorizacionParaVer] = useState(null);



  useEffect(() => {
    if (!usuarioLogueado) return;

    const fetchAutorizaciones = async () => {
      try {
        const res = await fetch(`http://localhost:3000/authorization?numeroDeDocumento=${usuarioLogueado.numeroDeDocumento}`);
        if (!res.ok) throw new Error("Error al obtener las autorizaciones");

        const data = await res.json();

        const lista = data.map(item => {
          const fechaOriginal = item.fechaDePrestacion;
          let fechaFormateada = fechaOriginal;
          if (fechaOriginal && fechaOriginal.includes("-")) {
            const [yyyy, mm, dd] = fechaOriginal.split("-");
            fechaFormateada = `${dd}/${mm}/${yyyy}`;
          }

          return {
            id: item.id,
            fecha: fechaFormateada,
            paciente: item.nombreDelAfiliado,
            medico: item.nombreDelMedico,
            especialidad: item.especialidad,
            lugar: item.lugarDePrestacion,
            internacion: item.diasDeInternacion,
            observaciones: item.observaciones,
            estado: item.estado || "Pendiente",
          };
        });

        setAutorizaciones(lista);
      } catch (error) {
        console.error(error);
        setError("No se pudieron cargar las autorizaciones");
      }
    };

    fetchAutorizaciones();
    if (calcularEdad(usuarioLogueado.fechaDeNacimiento) <= 16) {
      setDesactivarBotonMenorDeEdad(true)
    } else {
      setDesactivarBotonMenorDeEdad(false)
    }
  }, [usuarioLogueado?.numeroDeDocumento]);



  useEffect(() => {
    const fetchIntegrantes = async () => {
      try {
        const res = await fetch("http://localhost:3000/affiliate");
        if (!res.ok) throw new Error("Error al obtener afiliados");
        const data = await res.json();

        const userDoc = (localStorage.getItem("documentoUsuario") || "").trim();
        if (!userDoc) {
          //   console.warn("No se encontró el documento del usuario logueado");
          return;
        }
        // solo familiares, excluye el titular aunque tenga perteneceA igual a su documento
        const familiares = data.filter((afiliado) => {
          const perteneceA = String(afiliado.perteneceA || "").trim();
          const doc = String(afiliado.numeroDeDocumento || "").trim();
          return perteneceA === userDoc && doc !== perteneceA;
        });

        setIntegrantesCuenta(familiares);
      } catch (error) {
        console.error("Error al cargar integrantes:", error);
      }
    };

    fetchIntegrantes();
  }, []);

  const autorizacionesFiltradas = autorizaciones.filter(
    (a) =>
      a.paciente?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.medico?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //  FUNCIÓN para abrir el modal al presionar el tachito
  const handleRequestDelete = (autorizacion) => {
    setAutorizacionAEliminar(autorizacion);
    setShowDeleteModal(true);
  };

  const onRequestEdit = (autorizacion) => {
    setAutorizacionSeleccionada(autorizacion);
    setShowEditModal(true);
  };


  //  FUNCIÓN para cancelar el modal
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setAutorizacionAEliminar(null);
  };

  const handleUpdateAuthorization = (updated) => {
    setAutorizaciones(prev =>
      prev.map(a => a.id === updated.id ? updated : a)
    );
  };

  //  FUNCIÓN para confirmar y ejecutar el DELETE
  const handleConfirmDelete = async () => {
    if (!autorizacionAEliminar) return;

    try {
      const res = await fetch(
        `http://localhost:3000/authorization/${autorizacionAEliminar.id}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Error al eliminar la autorización");

      // quitar del estado local
      setAutorizaciones((prev) =>
        prev.filter((a) => a.id !== autorizacionAEliminar.id)
      );

      setSuccess("Autorización eliminada correctamente.");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error(err);
      setError("No se pudo eliminar la autorización.");
      setTimeout(() => setError(""), 3000);
    } finally {
      setShowDeleteModal(false);
      setAutorizacionAEliminar(null);
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-nowrap">
        <h2 className="fw-bold text-dark fs-3 mb-0">MIS AUTORIZACIONES</h2>

        {desactivarBotonMenorDeEdad ? (
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                Debes ser mayor de edad para crear una nueva autorización
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
                onClick={() => setShowModal(true)}
              >
                + Nueva Autorización
              </button>
            </span>
          </OverlayTrigger>
        ) : (
          <button
            className="btn text-white px-4 py-2 fs-5"
            style={{ backgroundColor: hoverNueva ? "#b0b0b0" : "#132074" }}
            onMouseEnter={() => setHoverNueva(true)}
            onMouseLeave={() => setHoverNueva(false)}
            onClick={() => setShowModal(true)}
          >
            + Nueva Autorización
          </button>
        )}
      </div>

      {error && <div className="alert alert-danger text-center mb-4">{error}</div>}
      {success && <div className="alert alert-success text-center mb-4">{success}</div>}

      <BuscarAutorizacion
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        hoverBuscar={hoverBuscar}
        setHoverBuscar={setHoverBuscar}
      />

      <div className="row">
        {autorizacionesFiltradas.length > 0 ? (
          autorizacionesFiltradas.map((auto) => (
            <CardAutorizacion
              key={auto.id}
              autorizacion={auto}
              setAutorizacionParaVer={setAutorizacionParaVer}
              onRequestDelete={handleRequestDelete} // pasamos la función al card
              onRequestEdit={onRequestEdit}  // se lo paso a la card
            />
          ))
        ) : (
          <p className="text-center text-muted mt-4">
            No se encontraron autorizaciones.
          </p>
        )}
      </div>

      <NuevaAutorizacion
        showModal={showModal}
        setShowModal={setShowModal}
        integrantesCuenta={(() => {
          const lista = integrantesCuenta.length > 0 ? integrantesCuenta : integrantesCuentaStorage;
          // eliminar duplicados por documento o id
          const vistos = new Set();
          return lista.filter((i) => {
            const doc = i.numeroDeDocumento || i.documento || "";
            if (vistos.has(doc)) return false;
            vistos.add(doc);
            return true;
          });
        })()}
        formData={formData}
        setFormData={setFormData}
        autorizaciones={autorizaciones}
        setAutorizaciones={setAutorizaciones}
        error={error}
        setError={setError}
        success={success}
        setSuccess={setSuccess}
      />

      {autorizacionParaVer && (
        <VerAutorizacion
          autorizacion={autorizacionParaVer}
          setAutorizacionParaVer={setAutorizacionParaVer}
          setSuccess={setSuccess}
          setAutorizaciones={setAutorizaciones}
          autorizaciones={autorizaciones}
        />
      )}

      {/*  MODAL de confirmación de borrado */}
      {showDeleteModal && autorizacionAEliminar && (
        <>
          <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>

          <div
            className="modal d-block"
            tabIndex="-1"
            role="dialog"
            style={{ zIndex: 1050 }}
            onClick={handleCancelDelete}
          >
            <div
              className="modal-dialog modal-dialog-centered"
              role="document"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirmar eliminación</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={handleCancelDelete}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    ¿Querés eliminar la autorización de{" "}
                    <strong>{autorizacionAEliminar.paciente}</strong> con fecha{" "}
                    <strong>{autorizacionAEliminar.fecha}</strong>?
                  </p>
                  <p className="text-muted small">
                    Esta acción no se puede deshacer.
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancelDelete}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleConfirmDelete}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {showEditModal && autorizacionSeleccionada && (
        <EditarAutorizacion
          showModal={showEditModal}
          setShowModal={setShowEditModal}
          data={autorizacionSeleccionada}
          integrantesCuenta={(() => {
            const lista = integrantesCuenta.length > 0 ? integrantesCuenta : integrantesCuentaStorage;
            // eliminar duplicados por documento o id
            const vistos = new Set();
            return lista.filter((i) => {
              const doc = i.numeroDeDocumento || i.documento || "";
              if (vistos.has(doc)) return false;
              vistos.add(doc);
              return true;
            });
          })()}
          onUpdate={handleUpdateAuthorization}
          setSuccess={setSuccess}
          setError={setError}
        />
      )}


    </div>
  );
}
