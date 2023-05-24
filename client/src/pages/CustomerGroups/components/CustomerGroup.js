import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";

const CustomerGroup = (props) => {
  return (
    <Card>
      <Card.Body>
        <Row className="g-3 row-cols-2">
          <Col>
            <Link to={`${props.id}`}>
              <Card.Text>{props.id}</Card.Text>
            </Link>
          </Col>
          <Col>
            <Card.Text>{props.name}</Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CustomerGroup;
