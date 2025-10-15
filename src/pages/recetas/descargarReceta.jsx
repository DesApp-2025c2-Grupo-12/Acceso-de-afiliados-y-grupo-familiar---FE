export const handleDescargar = (receta, setAlertaDescarga) => {
  if (receta.estado !== "Aprobada") {
   
    setAlertaDescarga("Solo se pueden descargar recetas aprobadas.");
    setTimeout(() => setAlertaDescarga(""), 3000); // desaparece después de 3s
    return;
  }

  const contenido = `
Receta Médica
-----------------------
ID: ${receta.id}
Paciente: ${receta.paciente}
Medicamento: ${receta.nombreDelMedicamento}
Presentación: ${receta.presentacion}
Cantidad: ${receta.cantidad}
Fecha de Emisión: ${receta.fechaDeEmision}
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
