import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";

const Customer = (props) => {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col sm={3}>
            <Link to={`${props.id}`}>
              <Card.Title>
                {props.givenName} {props.familyName}
              </Card.Title>
            </Link>
            <Card.Subtitle className="mb-2 text-muted">
              {props.phoneNumber}
            </Card.Subtitle>
          </Col>
          <Col sm={3}>
            <Card.Text>
              {props.address.locality},{" "}
              {props.address.administrativeDistrictLevel1}
            </Card.Text>
          </Col>
          <Col sm={6}>
            <Card.Text>{props.note}</Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Customer;
