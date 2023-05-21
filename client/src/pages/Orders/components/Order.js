import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";

const Order = (props) => {
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
            <Card.Text>{props.state}</Card.Text>
          </Col>
          <Col>
            {props.lineItems.map((lineItem) => {
              return (
                <Card.Text>
                  {lineItem.quantity} x {lineItem.variationName} {lineItem.name}
                </Card.Text>
              );
            })}
          </Col>
          <Col>
            <Card.Text>
              {props.netAmountDueMoney.amount}{" "}
              {props.netAmountDueMoney.currency}
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Order;
