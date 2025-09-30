// Función para descargar una receta como archivo .txt
export const handleDescargar = (receta) => {
  const contenido = `
Receta Médica
-----------------------
Paciente: ${receta.paciente}
Medicamento: ${receta.nombre}
Estado: ${receta.estado}
Observaciones: ${receta.observaciones || "Ninguna"}
  `;

  const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `Receta_${receta.id}.txt`; // nombre del archivo
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // Limpiar memoria
  URL.revokeObjectURL(url);
};
