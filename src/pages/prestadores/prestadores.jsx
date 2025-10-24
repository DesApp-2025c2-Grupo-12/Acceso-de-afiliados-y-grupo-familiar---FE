import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import PrestadorFilters from "./PrestadorFilters";
import PrestadorList from "./PrestadorList";
import PrestadorModal from "./PrestadorModal";

const ESPECIALIDADES = [
  "Cardiología",
  "Pediatría",
  "Dermatología",
  "Clínica Médica",
  "Ginecología",
  "Neurología",
  "Traumatología"
];

const UBICACIONES = ["CABA", "Buenos Aires", "Córdoba", "Santa Fe", "Mendoza"];
const ZONAS = ["Norte", "Sur", "Este", "Oeste"];

export default function Prestadores() {
  const [prestadores, setPrestadores] = useState([]);
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");
  const [zona, setZona] = useState("");
  const [selectedPrestador, setSelectedPrestador] = useState(null);

  // Errores de validación
  const [errorNombre, setErrorNombre] = useState("");

  // Validación del input nombre
  const handleNombreChange = (value) => {
    if (/^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]*$/.test(value)) {
      if (value.length <= 50) {
        setSearch(value);
        setErrorNombre("");
      } else {
        setErrorNombre("Máximo 50 caracteres.");
      }
    } else {
      setErrorNombre("Solo se permiten letras y espacios.");
    }
  };

  // Fetch con validaciones de filtros
  useEffect(() => {
    const fetchPrestadores = async () => {
      try {
        const params = new URLSearchParams();

        if (search && !errorNombre) params.append("nombre", search);
        if (specialty && ESPECIALIDADES.includes(specialty))
          params.append("especialidad", specialty);
        if (location && UBICACIONES.includes(location))
          params.append("location", location);
        if (zona && ZONAS.includes(zona)) params.append("zona", zona);

        const url = `http://localhost:3000/provider?${params.toString()}`;
        const response = await fetch(url);
        const data = await response.json();
        setPrestadores(data);
      } catch (error) {
        console.error("Error al cargar prestadores:", error);
      }
    };

    fetchPrestadores();
  }, [search, specialty, location, zona, errorNombre]);

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Prestadores</h2>

      <PrestadorFilters
        search={search}
        setSearch={handleNombreChange} // usamos la validación
        specialty={specialty}
        setSpecialty={setSpecialty}
        location={location}
        setLocation={setLocation}
        zona={zona}
        setZona={setZona}
        errorNombre={errorNombre} // se puede mostrar mensaje en el input
      />

      <PrestadorList prestadores={prestadores} onSelect={setSelectedPrestador} />

      <PrestadorModal
        prestador={selectedPrestador}
        onClose={() => setSelectedPrestador(null)}
      />
    </Container>
  );
}
