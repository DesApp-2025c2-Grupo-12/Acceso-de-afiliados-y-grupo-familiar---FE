import { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
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
  "Traumatología",
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
  const [errorNombre, setErrorNombre] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleNombreChange = (value) => {
    const valueTrimmed = value.trim();
    if (/^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]*$/.test(valueTrimmed)) {
      if (valueTrimmed.length <= 50) {
        setSearch(valueTrimmed);
        setErrorNombre("");
      } else {
        setErrorNombre("Máximo 50 caracteres.");
      }
    } else {
      setErrorNombre("Solo se permiten letras y espacios.");
    }
  };

  
  useEffect(() => {
    const fetchPrestadores = async () => {
      setLoading(true);
      setFetchError("");

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

        if (!response.ok) {
          throw new Error("Error al obtener los prestadores");
        }

        const data = await response.json();
        setPrestadores(data);
      } catch (error) {
        setFetchError(error.message);
        setPrestadores([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPrestadores();
  }, [search, specialty, location, zona, errorNombre]);

  return (
    <Container className="my-5">

      <div className="d-flex justify-content-between align-items-center mb-4 flex-nowrap">
        <h2 className="fw-bold text-dark fs-3 mb-0">PRESTADORES</h2>
      </div>

      <PrestadorFilters
        search={search}
        setSearch={handleNombreChange}
        specialty={specialty}
        setSpecialty={setSpecialty}
        location={location}
        setLocation={setLocation}
        zona={zona}
        setZona={setZona}
        errorNombre={errorNombre}
      />

      {loading && <p className="text-center">Cargando prestadores...</p>}
      {fetchError && <p className="text-danger text-center">{fetchError}</p>}

{!loading && !fetchError && prestadores.length === 0 && (
  <Card className="text-center my-4 p-4 border-0 shadow-sm bg-light">
    <Card.Body>

      <Card.Text
        className="fst-italic"
        style={{
          color: "#001F87", 
          fontWeight: "500",
          fontSize: "1.1rem",
          border: "1px solid #001F87",
          borderRadius: "50px",
          padding: "0.8rem 1.5rem",
          display: "inline-block",
          backgroundColor: "white",
        }}
      >
        No se encontraron prestadores que coincidan con tu búsqueda.
      </Card.Text>
    </Card.Body>
  </Card>
)}


      <PrestadorList prestadores={prestadores} onSelect={setSelectedPrestador} />

      <PrestadorModal
        prestador={selectedPrestador}
        onClose={() => setSelectedPrestador(null)}
      />
    </Container>
  );
}
