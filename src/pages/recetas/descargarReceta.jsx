export const handleDescargar = (receta, setAlertaDescarga) => {
  if (receta.estado !== "Aprobado") {
  setAlertaDescarga("Solo se pueden descargar recetas aprobadas.");
  setTimeout(() => setAlertaDescarga(""), 3000);
  return;
}


  const formatFecha = (fechaStr) => {
    if (!fechaStr) return "-";
    const fecha = new Date(fechaStr);
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
  };

  const contenido = `
Receta Médica
-----------------------
ID: ${receta.id}
Paciente: ${receta.paciente}
Medicamento: ${receta.nombreDelMedicamento}
Presentación: ${receta.presentacion}
Cantidad: ${receta.cantidad}
Fecha de Emisión: ${formatFecha(receta.fechaDeEmision)}
Estado: ${receta.estado}
Observaciones: ${receta.observaciones || "Ninguna"}
Documento: ${receta.numeroDeDocumento}
  `.trim();

  const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `Receta_${receta.paciente}_${receta.id}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
};

