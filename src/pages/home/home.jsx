import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">Bienvenido a Medicina Integral</h1>
      <p className="text-center mb-5">
        Aquí podés ver un resumen de tu información y acceder rápidamente a tus turnos y recetas.
      </p>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-lg h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Próximo turno</h5>
              <p className="card-text">
                <strong>Médico:</strong> Dr. Alejandra Pizarn.<br />
                <strong>Especialidad:</strong> Psicóloga clínica.<br />
                <strong>Fecha:</strong> Lunes 21 de Septiembre.<br />
                <strong>Hora:</strong> 10:00 AM
              </p>
              <button 
                onClick={() => navigate("/turnos")} 
                className="btn btn-blue mt-auto align-self-center"
              >
                Ir a Turnos
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-lg h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Última receta</h5>
              <p className="card-text">
                <strong>Emitida:</strong> Jueves 1 de Septiembre.<br />
                <strong>Medicamento:</strong> Ibuprofeno 600mg.<br />
                <strong>Dosis:</strong> Cada 8 horas.
              </p>
              <button 
                onClick={() => navigate("/recetas")} 
                className="btn btn-blue mt-auto align-self-center"
              >
                Ir a Recetas
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-lg h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Último Reintegro</h5>
              <p className="card-text">
                <strong>Aprobada:</strong> Jueves 11 de septiembre.<br />
                <strong>Especialidad:</strong> Neurocirugia<br />
                <strong>Reintegro:</strong> $160.000.
              </p>
              <button 
                onClick={() => navigate("/reintegros")} 
                className="btn btn-blue mt-auto align-self-center"
              >
                Ir a Reintegros
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-lg h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Última Autorizacion</h5>
              <p className="card-text">
                <strong>Fecha:</strong> Lunes 21 de septiembre.<br />
                <strong>Paciente:</strong> Franco Cantero<br />
                <strong>Lugar de Prestacion:</strong> Hospital municipal de Hurlingham
              </p>
              <button 
                onClick={() => navigate("/autorizaciones")} 
                className="btn btn-blue mt-auto align-self-center"
              >
                Ir a Autorización
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
