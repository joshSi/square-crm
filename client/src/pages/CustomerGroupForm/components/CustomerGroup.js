import React from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";

const CustomerGroup = (props) => {
  const {
    customerGroup,
    setCustomerGroup,
    disabled,
    setDisabled,
    handleSubmit,
  } = props;

  const handleChangeCustomerGroup = (event) => {
    return setCustomerGroup({ [event.target.name]: event.target.value });
  };

  return (
    <Form>
      <Row className="g-3 pt-3 row-cols-1 row-cols-lg-2">
        <Col className="col-lg-12">
          <Card>
            <Card.Body>
              <Row className="g-3 row-cols-4">
                <Col>
                  <Form.Label className="text-muted">Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={customerGroup.name}
                    onChange={handleChangeCustomerGroup}
                    placeholder="i.e. Loyal Customers"
                    disabled={disabled}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <hr />
      <Row className="g-3 justify-content-end">
        <Col>* Required</Col>
        {disabled ? (
          <>
            <Col className="col-auto">
              <Button onClick={() => setDisabled(false)}>Update</Button>
            </Col>
            <Col className="col-auto">
              <Button onClick={props.handleDelete}>Delete</Button>
            </Col>
          </>
        ) : (
          <Col className="col-auto">
            <Button onClick={handleSubmit}>Submit</Button>
          </Col>
        )}
      </Row>
    </Form>
  );
};

export default CustomerGroup;
