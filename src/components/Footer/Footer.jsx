export default function Footer() {
  return (
    <footer 
      style={{ backgroundColor: "#0f1a5a" }} 
      className="text-white mt-auto pt-5 pb-4 fs-6"
    >
      <div className="container">

        <div className="row text-start">

          {/* Identidad institucional */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold text-uppercase mb-3">Medicina Integral</h5>

            <p className="small opacity-75 mb-1">
              Sistema de salud orientado a brindar atención médica integral,
            </p>
            <p className="small opacity-75 mb-3">
              acompañamiento y servicios para cada etapa de la vida.
            </p>

            <p className="small mb-1"><strong>Teléfono:</strong> 011-1212-1212</p>
            <p className="small mb-1"><strong>Email:</strong> contacto@medicinaintegral.com</p>
            <p className="small mb-0">
              <strong>Dirección:</strong> Centro Médico 12 – Av. Profesional 012, CABA
            </p>
          </div>

          {/* Servicios con iconos suaves */}
          <div className="col-md-4 mb-4 px-md-5">
            <h6 className="fw-bold mb-3 text-uppercase">Servicios disponibles</h6>

            <ul className="list-unstyled small opacity-75">
              <li className="mb-2 d-flex align-items-start gap-2">
                <i className="bi bi-calendar-check"></i>  
                Solicitud de turnos médicos
              </li>
              <li className="mb-2 d-flex align-items-start gap-2">
                <i className="bi bi-arrow-repeat"></i>
                Reintegros y seguimiento
              </li>
              <li className="mb-2 d-flex align-items-start gap-2">
                <i className="bi bi-file-earmark-medical"></i>
                Recetas electrónicas
              </li>
              <li className="mb-2 d-flex align-items-start gap-2">
                <i className="bi bi-journal-medical"></i>
                Cartilla de prestadores
              </li>
              <li className="mb-2 d-flex align-items-start gap-2">
                <i className="bi bi-check2-circle"></i>
                Autorizaciones médicas
              </li>
            </ul>
          </div>

          {/* Información institucional */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold mb-3 text-uppercase">Información institucional</h6>

            <ul className="list-unstyled small opacity-75 mb-4">
              <li className="mb-2">Términos y condiciones vigentes</li>
              <li className="mb-2">Política de privacidad</li>
              <li className="mb-2">Atención al usuario</li>
              <li className="mb-2">Defensa del consumidor</li>
            </ul>

            {/* Iconos decorativos alineados */}
            <div className="d-flex gap-3 opacity-75">
              <i className="bi bi-shield-check fs-4"></i>
              <i className="bi bi-heart-pulse fs-4"></i>
              <i className="bi bi-people fs-4"></i>
            </div>
          </div>

        </div>

        <hr className="border-light opacity-50" />

        {/* Franja inferior */}
        <div className="text-center mt-3">
          <p className="small mb-1 opacity-75">
            © MedicinaIntegral {new Date().getFullYear()} — Todos los derechos reservados — 
            Universidad Nacional de Hurlingham
          </p>

          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="btn btn-outline-light btn-sm mt-2 px-3 py-1 rounded-pill"
          >
            Volver arriba
          </button>
        </div>

      </div>
    </footer>
  );
}
