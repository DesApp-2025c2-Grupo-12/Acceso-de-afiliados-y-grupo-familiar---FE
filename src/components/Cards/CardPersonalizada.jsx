import React from "react";
import { Card, Button } from "react-bootstrap";

export default function CardPersonalizada({
  header,
  title,
  subtitle,
  tipo,
  contenidoAdicional,
  detalles,
  botonTexto,
  onClick,

  //props para personalizar la card
  headerClassName = "",
  titleClassName = "",
  subtitleClassName = "",
  tipoClassName = "",
  detallesClassName = "",
  cardClassName = "",
  bodyClassName = "",
}) {
  return (
    <Card className={`shadow-sm rounded-3 h-100 border ${cardClassName}`}>
      {header && (
        <Card.Header className={`h5 mb-2 text-uppercase ${headerClassName}`}>
          {header}
        </Card.Header>
      )}
      <Card.Body className={`d-flex flex-column ${bodyClassName}`}>
        <Card.Title className={`h5 mb-2 ${titleClassName}`}>{title}</Card.Title>
        <Card.Subtitle className={`text-muted mb-2 ${subtitleClassName}`}>{subtitle}</Card.Subtitle>

        {tipo && (
          <Card.Text className={`text-primary fw-semibold mb-3 ${tipoClassName}`}>
            {tipo}
          </Card.Text>
        )}

        {detalles.map((item, index) => (
          <Card.Text key={index} className={detallesClassName}>
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
