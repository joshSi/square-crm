import React from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";

const Customer = (props) => {
  const { customer, setCustomer, disabled, setDisabled, handleSubmit } = props;

  const handleChangeCustomer = (event) => {
    const names = event.target.name.split(".");

    if (names[0] === "customer") {
      // customer
      if (names[1] !== "address") {
        // givenName, familyName, companyName, nickname, emailAddress, phoneNumber, referenceId, note, birthday
        return setCustomer({
          ...customer,
          [names[1]]: event.target.value,
        });
      }
      // address
      // addressLine1, addressLine2, locality, administrativeDistrictLevel1, postalCode, country
      return setCustomer({
        ...customer,
        address: {
          ...customer.address,
          [names[2]]: event.target.value,
        },
      });
    }
  };

  return (
    <Form>
      <Row className="g-3 pt-3 row-cols-1 row-cols-lg-2">
        <Col className="col-lg-12">
          <Card>
            <Card.Body>
              <Row className="g-3 row-cols-4">
                <Col>
                  <Form.Label className="text-muted">First Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="customer.givenName"
                    value={customer.givenName}
                    onChange={handleChangeCustomer}
                    placeholder="i.e. Amelia"
                    disabled={disabled}
                  />
                </Col>
                <Col>
                  <Form.Label className="text-muted">Last Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="customer.familyName"
                    value={customer.familyName}
                    onChange={handleChangeCustomer}
                    placeholder="i.e. Earhart"
                    disabled={disabled}
                  />
                </Col>
                <Col>
                  <Form.Label className="text-muted">Company Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="customer.companyName"
                    value={customer.companyName}
                    onChange={handleChangeCustomer}
                    placeholder="i.e. Google"
                    disabled={disabled}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Row className="g-3 row-cols-2">
                <Col>
                  <Form.Label className="text-muted">
                    Email Address *
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="customer.emailAddress"
                    value={customer.emailAddress}
                    onChange={handleChangeCustomer}
                    placeholder="i.e. Amelia.Earhart@example.com"
                    disabled={disabled}
                  />
                </Col>
                <Col>
                  <Form.Label className="text-muted">Phone Number *</Form.Label>
                  <Form.Control
                    type="text"
                    name="customer.phoneNumber"
                    value={customer.phoneNumber}
                    onChange={handleChangeCustomer}
                    placeholder="i.e. +1-212-555-4240"
                    disabled={disabled}
                  />
                </Col>
                <Col className="col-lg-12">
                  <Form.Label className="text-muted">Address 1</Form.Label>
                  <Form.Control
                    type="text"
                    name="customer.address.addressLine1"
                    value={customer.address.addressLine1}
                    onChange={handleChangeCustomer}
                    placeholder="i.e. 500 Electric Ave"
                    disabled={disabled}
                  />
                </Col>
                <Col className="col-lg-12">
                  <Form.Label className="text-muted">Address 2</Form.Label>
                  <Form.Control
                    type="text"
                    name="customer.address.addressLine2"
                    value={customer.address.addressLine2}
                    onChange={handleChangeCustomer}
                    placeholder="i.e. Suite 600"
                    disabled={disabled}
                  />
                </Col>
                <Col>
                  <Form.Label className="text-muted">City</Form.Label>
                  <Form.Control
                    type="text"
                    name="customer.address.locality"
                    value={customer.address.locality}
                    onChange={handleChangeCustomer}
                    placeholder="i.e. New York"
                    disabled={disabled}
                  />
                </Col>
                <Col>
                  <Form.Label className="text-muted">State</Form.Label>
                  <Form.Control
                    type="text"
                    name="customer.address.administrativeDistrictLevel1"
                    value={customer.address.administrativeDistrictLevel1}
                    onChange={handleChangeCustomer}
                    placeholder="i.e. NY"
                    disabled={disabled}
                  />
                </Col>
                <Col>
                  <Form.Label className="text-muted">
                    Postal / Zip Code
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="customer.address.postalCode"
                    value={customer.address.postalCode}
                    onChange={handleChangeCustomer}
                    placeholder="i.e. 10003"
                    disabled={disabled}
                  />
                </Col>
                <Col>
                  <Form.Label className="text-muted">Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="customer.address.country"
                    value={customer.address.country}
                    onChange={handleChangeCustomer}
                    placeholder="i.e. US"
                    disabled={disabled}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Row className="g-3 row-cols-2">
                <Col>
                  <Form.Label className="text-muted">Nickname</Form.Label>
                  <Form.Control
                    type="text"
                    name="customer.nickname"
                    value={customer.nickname}
                    onChange={handleChangeCustomer}
                    placeholder="i.e. Amy"
                    disabled={disabled}
                  />
                </Col>
                <Col>
                  <Form.Label className="text-muted">Birthday</Form.Label>
                  <Form.Control
                    type="text"
                    name="customer.birthday"
                    value={customer.birthday}
                    onChange={handleChangeCustomer}
                    placeholder="i.e. YYYY-MM-DD"
                    disabled={disabled}
                  />
                </Col>
                <Col>
                  <Form.Label className="text-muted">Reference Id</Form.Label>
                  <Form.Control
                    type="text"
                    name="customer.referenceId"
                    value={customer.referenceId}
                    onChange={handleChangeCustomer}
                    placeholder="i.e. YOUR_REFERENCE_ID"
                    disabled={disabled}
                  />
                </Col>
                <Col className="col-lg-12">
                  <Form.Label className="text-muted">Note</Form.Label>
                  <Form.Control
                    type="text"
                    name="customer.note"
                    value={customer.note}
                    onChange={handleChangeCustomer}
                    placeholder="i.e. a customer"
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
        <Col>* At least one required</Col>
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

export default Customer;
