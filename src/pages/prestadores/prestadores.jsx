import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import PrestadorFilters from "./PrestadorFilters";
import PrestadorList from "./PrestadorList";
import PrestadorModal from "./PrestadorModal";

export default function Prestadores() {
  const [prestadores, setPrestadores] = useState([]);
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");
  const [zona, setZona] = useState("");
  const [selectedPrestador, setSelectedPrestador] = useState(null);

  useEffect(() => {
    const fetchPrestadores = async () => {
      try {
        const params = new URLSearchParams();
        if (search) params.append("nombre", search);
        if (specialty) params.append("especialidad", specialty);
        if (location) params.append("location", location);
        if (zona) params.append("zona", zona);

        const url = `http://localhost:3000/provider?${params.toString()}`;
        const response = await fetch(url);
        const data = await response.json();
        setPrestadores(data);
      } catch (error) {
        console.error("Error al cargar prestadores:", error);
      }
    };
    fetchPrestadores();
  }, [search, specialty, location, zona]);

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Prestadores</h2>

      <PrestadorFilters
        search={search} setSearch={setSearch}
        specialty={specialty} setSpecialty={setSpecialty}
        location={location} setLocation={setLocation}
        zona={zona} setZona={setZona}
      />

      <PrestadorList prestadores={prestadores} onSelect={setSelectedPrestador} />

      <PrestadorModal prestador={selectedPrestador} onClose={() => setSelectedPrestador(null)} />
    </Container>
  );
}
