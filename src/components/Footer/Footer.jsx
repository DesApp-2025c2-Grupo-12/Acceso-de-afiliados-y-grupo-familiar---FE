import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer mt-auto text-white py-4">
            <div className="container">
                <div className="row align-items-center">

                

                    <div className="col-md-4 d-flex flex-column align-items-start border-end pe-4">
                        <h5 className="fw-bold text-uppercase">Medicina Integral</h5>
                        <p className="small mb-0">Atención médica integral</p>
                        <p className="small">para cada etapa de tu vida.</p>
                    </div>

          

                    <div className="col-md-8 text-center mt-3 mt-md-0">
                        <p className="small mb-1">
                            &copy; MedicinaIntegral {new Date().getFullYear()} - Todos los derechos reservados - 
                            <a
                                href="https://unahur.edu.ar"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white text-decoration-underline ms-1"
                            >
                                Universidad Nacional de Hurlingham - Buenos Aires
                            </a>
                        </p>

                        <a
                            href="#top"
                            className="btn btn-outline-light btn-sm mt-2"
                            role="button"
                        >
                            VOLVER ARRIBA
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
