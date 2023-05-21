import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";

const Customer = (props) => {
  return (
    <Card>
      <Card.Body>
        <Row className="g-3 row-cols-4">
          <Col>
            <Link to={`${props.id}`}>
              <Card.Text>{props.id}</Card.Text>
            </Link>
          </Col>
          <Col>
            <Card.Text>
              {props.givenName} {props.familyName}
            </Card.Text>
          </Col>
          <Col>
            <Card.Text>{props.phoneNumber}</Card.Text>
          </Col>
          <Col>
            <Card.Text>
              {props.address.locality},{" "}
              {props.address.administrativeDistrictLevel1}
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Customer;
