import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";

const Order = (props) => {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col sm={9}>
            <Link to={`${props.id}`}>
              <Card.Title>
                {props.lineItems[0].quantity} x{" "}
                {props.lineItems[0].variationName} {props.lineItems[0].name}
              </Card.Title>
            </Link>
            <Card.Subtitle className="mb-2 text-muted">
              {props.lineItems[0].modifiers[0].quantity} x{" "}
              {props.lineItems[0].modifiers[0].name}
            </Card.Subtitle>
          </Col>
          <Col sm={3}>
            <Card.Text>
              {props.netAmounts.totalMoney.amount}{" "}
              {props.netAmounts.totalMoney.currency}
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Order;
