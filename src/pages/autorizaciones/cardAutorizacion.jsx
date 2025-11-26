import React from "react";
import CardPersonalizada from "../../components/Cards/CardPersonalizada";
import { OverlayTrigger, Tooltip } from "react-bootstrap"; 
import { calcularEdad } from "../../utils/utils";


export default function CardAutorizacion({
  autorizacion,
  setAutorizacionParaVer,
  onRequestDelete,
  onRequestEdit,
}) {

  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado") || "null");
  const desactivarBotonMenorDeEdad = calcularEdad(usuarioLogueado?.fechaDeNacimiento) <= 16;
  // Colores del estado
  const estadoColores = {
    "Recibido": { backgroundColor: "#90BFEA", color: "black" },
    "En análisis": { backgroundColor: "#c57020ff", color: "black" },
    "Observada": { backgroundColor: "#d1c629ff", color: "black" },
    "Aprobada": { backgroundColor: "#469F5E", color: "black" },
    "Rechazada": { backgroundColor: "#aa3737ff", color: "black" },
    "Pendiente": { backgroundColor: "#c5c5c5ff", color: "black" },
  };

  const detalles = [
    { label: "Fecha", value: autorizacion.fecha },
    { label: "Afiliado", value: autorizacion.paciente },
    { label: "Médico", value: autorizacion.medico },
    { label: "Especialidad", value: autorizacion.especialidad },
  ];

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      {/* Estilos inline para los efectos hover */}
      <style>{`
        .boton-editar:hover {
          background-color: #ffc107 !important;
          color: black !important;
        }
        .boton-eliminar:hover {
          background-color: #dc3545 !important;
          color: white !important;
        }
        .ver-detalle-btn:hover {
          background-color: #c5c5c5ff !important;
        }
      `}</style>
      
      <div className="h-100 position-relative" style={{ border: "1px solid #ccc" }}>

        {/* ENCABEZADO CON ESTADO */}
        <div
          style={{
            ...estadoColores[autorizacion.estado],
            fontWeight: "bold",
            textTransform: "uppercase",
            padding: "0.5rem 1rem",
            borderTopLeftRadius: "0.375rem",
            borderTopRightRadius: "0.375rem",
          }}
        >
          {autorizacion.estado}
        </div>

        {/* CONTENIDO */}
        <div className="card-body text-center">

          <CardPersonalizada
            title={null}
            subtitle={null}
            tipo={null}
            detalles={detalles}
            botonTexto={null}
            contenidoAdicional={
              <div className="d-flex justify-content-center mt-3 mb-2">

                <button
                  className="btn btn-sm rounded-pill ver-detalle-btn"
                  style={{
                    border: "1px solid black",
                    color: "black",
                    backgroundColor: "white",
                    borderRadius: "50px",
                    padding: "3px 12px",
                    fontSize: "0.9rem",
                    transition: "all 0.2s ease-in-out",
                  }}
                  onClick={() => setAutorizacionParaVer(autorizacion)}
                >
                  Ver detalle
                </button>

              </div>
            }

            disableCardClick={true}
            cardOnClick={false}
            cardClassName="border-0"
            bodyClassName="border-0"
          />

        </div>

        {/* BOTONES EDITAR / BORRAR */}
        {autorizacion.estado === "Recibido" && (
          <div
            style={{
              position: "absolute",
              bottom: "12px",
              left: "12px",
              display: "flex",
              gap: "8px",
              zIndex: 300,
              pointerEvents: "auto",
            }}
          >
            {desactivarBotonMenorDeEdad ? (
              <>
                {/* Botón Editar Deshabilitado */}
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip>
                      Debes ser mayor de 16 años de edad para editar autorizaciones
                    </Tooltip>
                  }
                >
                  <span className="d-inline-block">
                    <button
                      type="button"
                      className="btn btn-outline-warning btn-sm d-flex align-items-center gap-1"
                      style={{
                        opacity: 0.6,
                        cursor: "not-allowed",
                      }}
                      disabled
                    >
                      <i className="bi bi-pencil-square" />
                    </button>
                  </span>
                </OverlayTrigger>

                {/* Botón Eliminar Deshabilitado */}
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip>
                      Debes ser mayor de 16 años de edad para eliminar autorizaciones
                    </Tooltip>
                  }
                >
                  <span className="d-inline-block">
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
                      style={{
                        opacity: 0.6,
                        cursor: "not-allowed",
                      }}
                      disabled
                    >
                      <i className="bi bi-trash3" />
                    </button>
                  </span>
                </OverlayTrigger>
              </>
            ) : (
              <>
                {/* Botón Editar Habilitado */}
                <button
                  type="button"
                  className="btn btn-outline-warning btn-sm d-flex align-items-center gap-1 boton-editar"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRequestEdit(autorizacion);
                  }}
                  style={{
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  <i className="bi bi-pencil-square" />
                </button>

                {/* Botón Eliminar Habilitado */}
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1 boton-eliminar"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRequestDelete(autorizacion);
                  }}
                  style={{
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  <i className="bi bi-trash3" />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}