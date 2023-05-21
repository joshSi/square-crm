import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";

const CatalogObject = (props) => {
  return (
    <Card>
      <Card.Body>
        {props.type === "ITEM" ? (
          <Row className="g-3 row-cols-4">
            <Col>
              <Link to={`${props.id}`}>
                <Card.Text>{props.id}</Card.Text>
              </Link>
            </Col>
            <Col>
              <Card.Text>{props.type}</Card.Text>
            </Col>
            <Col>
              <Card.Text>{props.itemData.name}</Card.Text>
            </Col>
            <Col>
              <Card.Text>
                {props.itemData.variations.reduce((accumulator, variation) => {
                  let prefix = "";
                  if (accumulator) prefix = ", ";
                  return (
                    accumulator + prefix + variation.itemVariationData.name
                  );
                }, "")}
              </Card.Text>
            </Col>
          </Row>
        ) : props.type === "MODIFIER_LIST" ? (
          <Row className="g-3 row-cols-4">
            <Col>
              <Link to={`${props.id}`}>
                <Card.Text>{props.id}</Card.Text>
              </Link>
            </Col>
            <Col>
              <Card.Text>{props.type}</Card.Text>
            </Col>
            <Col>
              <Card.Text>{props.modifierListData.name}</Card.Text>
            </Col>
            <Col>
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
          <Row className="g-3 row-cols-4">
            <Col>
              <Link to={`${props.id}`}>
                <Card.Text>{props.id}</Card.Text>
              </Link>
            </Col>
            <Col>
              <Card.Text>{props.type}</Card.Text>
            </Col>
            <Col>
              <Card.Text>{props.taxData.name}</Card.Text>
            </Col>
            <Col>
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
