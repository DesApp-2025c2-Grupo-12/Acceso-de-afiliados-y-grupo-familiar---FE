import React from "react";
import { Card, Button } from "react-bootstrap";

export default function CardPersonalizada({
  title,
  subtitle,
  tipo,
  contenidoAdicional,
  detalles,
  botonTexto,
  onClick,
}) {
  return (
    <Card className="shadow-sm rounded-3 h-100 border">
      <Card.Body className="d-flex flex-column">
        <Card.Title className="h5 mb-2">{title}</Card.Title>
        <Card.Subtitle className="text-muted mb-2">{subtitle}</Card.Subtitle>

        {tipo && (
          <Card.Text className="text-primary fw-semibold mb-3">
            {tipo}
          </Card.Text>
        )}

        {detalles.map((item, index) => (
          <Card.Text key={index}>
            <strong>{item.label}:</strong> {item.value}
          </Card.Text>
        ))}

        {contenidoAdicional && (
          <div className="mt-3">
            {contenidoAdicional}
          </div>
        )}

        {botonTexto && (
          <Button
            variant="success"
            size="sm"
            onClick={onClick}
            className="mt-auto align-self-end"
          >
            {botonTexto}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
