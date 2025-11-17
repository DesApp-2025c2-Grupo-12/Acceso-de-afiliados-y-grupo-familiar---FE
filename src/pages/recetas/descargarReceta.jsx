import { jsPDF } from "jspdf";

export const handleDescargar = async (receta, setAlertaDescarga) => {
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

  const doc = new jsPDF({
    unit: "pt",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  let y = 40;

  // ============================
  // ENCABEZADO
  // ============================
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(18);
  doc.text(
    `Receta Médica: ${receta.paciente} – ${receta.numeroDeDocumento}`,
    40,
    y
  );
  y += 35;

  // ============================
  // ESTADO + FECHA DE APROBACIÓN
  // ============================
  doc.setFontSize(14);
  doc.setFont("Helvetica", "bold");
  doc.text("Estado:", 40, y);

  if (receta.estado === "Aprobado") {
    doc.setTextColor(40, 167, 69);
  } else {
    doc.setTextColor(0, 0, 0);
  }

  doc.text(receta.estado, 110, y);

  doc.setTextColor(0, 0, 0);

  y += 20;

  doc.text("Fecha de aprobación:", 40, y);
  doc.setFont("Helvetica", "normal");
  doc.text(formatFecha(receta.fechaDeAprobacion), 180, y);

  y += 30;

  doc.setLineWidth(1);
  doc.line(40, y, pageWidth - 40, y);

  y += 30;

  // ============================
  // MEDICAMENTO
  // ============================
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Medicamento:", 40, y);

  y += 25;

  doc.setFontSize(16);
  doc.text(
    `${receta.nombreDelMedicamento} x ${receta.cantidad}`,
    40,
    y
  );

  y += 25;

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(12);
  doc.text(
    `(Presentación: ${receta.presentacion} — Cantidad: ${receta.cantidad})`,
    40,
    y
  );

  y += 25;

  // ============================
  // OBSERVACIONES
  // ============================
  doc.setFont("Helvetica", "bold");
  doc.text("Observaciones:", 40, y);

  y += 18;

  doc.setFont("Helvetica", "normal");
  doc.text(receta.observaciones || "Ninguna", 40, y, {
    maxWidth: pageWidth - 80,
  });

  y += 30;

  doc.line(40, y, pageWidth - 40, y);
  y += 30;

  // ============================
  // FIRMA DIGITAL
  // ============================
  doc.setFont("Helvetica", "bold");
  doc.text("Firma digital:", 40, y);
  y += 18;

  doc.setFont("Helvetica", "normal");
  doc.text(
    "Esta receta fue firmada digitalmente por el profesional prescriptor conforme a la normativa vigente. " +
      "La firma digital garantiza la autenticidad del emisor, la integridad del documento y su validez legal en todo el territorio nacional.",
    40,
    y,
    { maxWidth: pageWidth - 80 }
  );

  y += 60;

  // ============================
  // VIGENCIA
  // ============================
  doc.setFont("Helvetica", "bold");
  doc.text("Vigencia:", 40, y);
  y += 18;

  doc.setFont("Helvetica", "normal");
  doc.text(
    "Esta receta tiene una vigencia de 30 días corridos a partir de la fecha de emisión, salvo indicación contraria según normativa sanitaria.",
    40,
    y,
    { maxWidth: pageWidth - 80 }
  );

  y += 60;

  // ============================
  // LECTRA
  // ============================
  doc.setFont("Helvetica", "bold");
  doc.text("Lectura obligatoria:", 40, y);
  y += 18;

  doc.setFont("Helvetica", "normal");
  doc.text(
    "Esta receta fue creada por un emisor inscripto y validada en el Registro de Recetarios Electrónicos del Ministerio de Salud de la Nación.",
    40,
    y,
    { maxWidth: pageWidth - 80 }
  );

  // =========================================
  // LOGO CENTRADO AL FINAL DE LA PÁGINA
  // =========================================
  const logoURL = "/logoPDF/LogoPDF.jpeg";

  try {
    const img = await fetch(logoURL);
    const blob = await img.blob();
    const reader = new FileReader();

    await new Promise((resolve) => {
      reader.onloadend = resolve;
      reader.readAsDataURL(blob);
    });

    const logoWidth = 120;
    const logoHeight = 120;

    const centradoX = (pageWidth - logoWidth) / 2;
    const posY = pageHeight - logoHeight - 40;

    doc.addImage(reader.result, "JPEG", centradoX, posY, logoWidth, logoHeight);
  } catch (error) {
    console.warn("No se pudo cargar el logo para el PDF:", error);
  }

  // ============================
  // GUARDAR
  // ============================
  doc.save(`Receta_${receta.paciente}_${receta.numeroDeDocumento}.pdf`);
};
