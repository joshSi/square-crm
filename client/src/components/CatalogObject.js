import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";

const CatalogObject = (props) => {
  return (
    <Card>
      <Card.Body>
        {props.type === "ITEM" ? (
          <Row>
            <Col sm={3}>
              <Link to={`${props.id}`}>
                <Card.Title>{props.itemData.name}</Card.Title>
              </Link>
              {props.itemData.variations.map((variation) => {
                return (
                  <Card.Subtitle key={variation.id} className="mb-2 text-muted">
                    {variation.itemVariationData.name}
                  </Card.Subtitle>
                );
              })}
            </Col>
            <Col sm={3}>
              <Card.Text>{props.type}</Card.Text>
            </Col>
            <Col sm={6}>
              <Card.Text>{props.itemData.description}</Card.Text>
            </Col>
          </Row>
        ) : props.type === "MODIFIER_LIST" ? (
          <Row>
            <Col sm={3}>
              <Card.Title>{props.modifierListData.name}</Card.Title>
            </Col>
            <Col sm={3}>
              <Card.Text>{props.type}</Card.Text>
            </Col>
            <Col sm={6}>
              <Card.Text>
                {props.modifierListData.modifiers.reduce(
                  (accumulator, modifier) => {
                    let prefix = "";
                    if (accumulator) prefix = ", ";
                    return accumulator + prefix + modifier.modifierData.name;
                  },
                  ""
                )}
              </Card.Text>
            </Col>
          </Row>
        ) : props.type === "TAX" ? (
          <Row>
            <Col sm={3}>
              <Card.Title>{props.taxData.name}</Card.Title>
            </Col>
            <Col sm={3}>
              <Card.Text>{props.type}</Card.Text>
            </Col>
            <Col sm={6}>
              <Card.Text>{props.taxData.percentage}</Card.Text>
            </Col>
          </Row>
        ) : (
          "Other type"
        )}
      </Card.Body>
    </Card>
  );
};

export default CatalogObject;
