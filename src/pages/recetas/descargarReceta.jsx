import { jsPDF } from "jspdf";

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

  const doc = new jsPDF();

  // Encabezado
  doc.setFontSize(16);
  doc.text("Receta Médica", 105, 20, { align: "center" });
  doc.setFontSize(12);
  doc.line(20, 25, 190, 25); // línea horizontal debajo del título

  // Contenido de la receta
  let y = 40; // posición vertical inicial
  const lineHeight = 10;

  const campos = [
    ["ID", receta.id],
    ["Paciente", receta.paciente],
    ["Documento", receta.numeroDeDocumento],
    ["Medicamento", receta.nombreDelMedicamento],
    ["Presentación", receta.presentacion],
    ["Cantidad", receta.cantidad],
    ["Fecha de Emisión", formatFecha(receta.fechaDeEmision)],
    ["Estado", receta.estado],
    ["Observaciones", receta.observaciones || "Ninguna"],
  ];

  campos.forEach(([label, valor]) => {
    doc.text(`${label}: ${valor}`, 20, y);
    y += lineHeight;
  });

  // Guardar PDF
  doc.save(`Receta_${receta.paciente}_${receta.id}.pdf`);
};
