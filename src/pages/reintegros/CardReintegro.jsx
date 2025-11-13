import React from "react";
import CardPersonalizada from "../../components/Cards/CardPersonalizada";

export default function CardReintegro({ reintegroFiltrado, seleccionarReintegro, abrirModalDetalle }) {

  const handleVerDetalle = (reintegro) => {
    seleccionarReintegro(reintegro);
    abrirModalDetalle(true);
  };

  const detalles = [
    { label: "Médico", value: reintegroFiltrado.nombreDelMedico },
    { label: "Especialidad", value: reintegroFiltrado.especialidad },
    { label: "Fecha facturación", value: reintegroFiltrado.facturacion_Fecha }
  ];

  const contenidoAdicional = (
    <div className="h4 text-success fw-bold text-center mt-2">
      ${reintegroFiltrado.facturacion_ValorTotal}
    </div>
  );

  return (
    <CardPersonalizada
      title={reintegroFiltrado.nombreDelAfiliado}
      subtitle={`Estado: Pendiente`}
      tipo="Reintegro"
      detalles={detalles}
      contenidoAdicional={contenidoAdicional}
      botonTexto="Ver detalle"
      onClick={() => handleVerDetalle(reintegroFiltrado)}
    />
  );
}