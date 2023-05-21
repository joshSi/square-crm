import React from "react";
import { Row, Col, Card } from "react-bootstrap";

const Header = (props) => {
  return (
    <Card>
      <Card.Header>
        <Row className={`g-3 row-cols-${props.labels.length}`}>
          {props.labels.map((label) => {
            return <Col className="text-muted">{label}</Col>;
          })}
        </Row>
      </Card.Header>
    </Card>
  );
};

export default Header;
