import React from "react";
import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";

const CatalogTax = (props) => {
  const { tax, setTax, disabled, setDisabled, handleSubmit } = props;

  const handleChangeTax = (event) => {
    const names = event.target.name.split(".");

    if (names[0] === "tax") {
      // tax
      if (names[1] !== "taxData") {
        // type, id
        return setTax({
          ...tax,
          [names[1]]: event.target.value,
        });
      }
      // taxData
      // name, calculationPhase, inclusiveType, percentage
      return setTax({
        ...tax,
        taxData: {
          ...tax.taxData,
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
            <Card.Header>
              <Row className="g-3 row-cols-4">
                <Col>
                  <Form.Label className="text-muted">Type *</Form.Label>
                  <Form.Control
                    type="text"
                    name="tax.type"
                    value={tax.type}
                    disabled
                  />
                </Col>
                <Col>
                  <Form.Label className="text-muted">Id *</Form.Label>
                  <Form.Control
                    type="text"
                    name="tax.id"
                    value={tax.id}
                    onChange={handleChangeTax}
                    placeholder="i.e. #sales_tax"
                    disabled
                  />
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Row className="g-3 row-cols-4">
                <Col>
                  <Form.Label className="text-muted">Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="tax.taxData.name"
                    value={tax.taxData.name}
                    onChange={handleChangeTax}
                    placeholder="i.e. Drink Tax"
                    disabled={disabled}
                  />
                </Col>
                <Col>
                  <Form.Label className="text-muted">
                    Calculation Phase *
                  </Form.Label>
                  <Form.Select
                    name="tax.taxData.calculationPhase"
                    value={tax.taxData.calculationPhase}
                    onChange={handleChangeTax}
                    disabled={disabled}
                  >
                    <option value="TAX_SUBTOTAL_PHASE">Subtotal</option>
                    <option value="TAX_TOTAL_PHASE">Total</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label className="text-muted">
                    Inclusion Type *
                  </Form.Label>
                  <Form.Select
                    name="tax.taxData.inclusionType"
                    value={tax.taxData.inclusionType}
                    onChange={handleChangeTax}
                    disabled={disabled}
                  >
                    <option value="ADDITIVE">Additive</option>
                    <option value="INCLUSIVE">Inclusive</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label className="text-muted">Percentage *</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      name="tax.taxData.percentage"
                      value={tax.taxData.percentage}
                      onChange={handleChangeTax}
                      placeholder="i.e. 8"
                      disabled={disabled}
                    />
                    <InputGroup.Text>%</InputGroup.Text>
                  </InputGroup>
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
            <Button onClick={() => handleSubmit(tax.type)}>Submit</Button>
          </Col>
        )}
      </Row>
    </Form>
  );
};

export default CatalogTax;
