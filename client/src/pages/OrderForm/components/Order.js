import React from "react";
import { Row, Col, Card, Form, CloseButton, Button } from "react-bootstrap";

const Order = (props) => {
  const { customers, items, order, setOrder, disabled, handleSubmit } = props;

  const handleChangeOrder = (event, index, index2) => {
    const names = event.target.name.split(".");

    if (names[0] === "order") {
      // order
      // customerId
      return setOrder({
        ...order,
        [names[1]]: event.target.value,
      });
    }

    if (names[0] === "lineItem") {
      // lineItem
      // quantity, catalogObjectId
      return setOrder({
        ...order,
        lineItems: [
          ...order.lineItems.slice(0, index),
          { ...order.lineItems[index], [names[1]]: event.target.value },
          ...order.lineItems.slice(index + 1),
        ],
      });
    }

    if (names[0] === "modifier") {
      // modifier
      // catalogObjectId
      return setOrder({
        ...order,
        lineItems: [
          ...order.lineItems.slice(0, index),
          {
            ...order.lineItems[index],
            modifiers: [
              ...order.lineItems[index].modifiers.slice(0, index2),
              {
                ...order.lineItems[index].modifiers[index2],
                [names[1]]: event.target.value,
              },
              ...order.lineItems[index].modifiers.slice(index2 + 1),
            ],
          },
          ...order.lineItems.slice(index + 1),
        ],
      });
    }
  };

  const addLineItem = () => {
    const lineItem = {
      quantity: "",
      catalogObjectId: "",
      modifiers: [
        {
          catalogObjectId: "",
        },
      ],
    };
    return setOrder({
      ...order,
      lineItems: [...order.lineItems, lineItem],
    });
  };

  const removeLineItem = (index) => {
    return setOrder({
      ...order,
      lineItems: [
        ...order.lineItems.slice(0, index),
        ...order.lineItems.slice(index + 1),
      ],
    });
  };

  return (
    <Form>
      <Row className="g-3 pt-3 row-cols-1 row-cols-lg-2">
        <Col className="col-lg-12">
          <Card>
            <Card.Body>
              <Row className="g-3 row-cols-4">
                <Col>
                  <Form.Label className="text-muted">Customer *</Form.Label>
                  {disabled ? (
                    <Form.Control
                      type="text"
                      name="order.customerId"
                      value={order.customerId}
                      disabled
                    />
                  ) : (
                    <Form.Select
                      name="order.customerId"
                      value={order.customerId}
                      onChange={handleChangeOrder}
                    >
                      <option>Select customer</option>
                      {customers.map((customer) => {
                        return (
                          <option value={customer.id}>
                            {customer.givenName} {customer.familyName}
                          </option>
                        );
                      })}
                    </Form.Select>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        {order.lineItems.map((lineItem, index) => {
          return (
            <Col>
              <Card>
                <Card.Header className="text-muted">
                  <Row className="g-3 row-cols-auto justify-content-between">
                    <Col>Line Item</Col>
                    {disabled ? (
                      ""
                    ) : order.lineItems.length > 1 ? (
                      <Col className="col-auto">
                        <CloseButton onClick={() => removeLineItem(index)} />
                      </Col>
                    ) : (
                      ""
                    )}
                  </Row>
                </Card.Header>
                <Card.Body>
                  <Row className="g-3 row-cols-2">
                    <Col>
                      <Form.Label className="text-muted">
                        Item Variation *
                      </Form.Label>
                      {disabled ? (
                        <Form.Control
                          type="text"
                          name="lineItem.catalogObjectId"
                          value={`${lineItem.variationName} ${lineItem.name}`}
                          disabled
                        />
                      ) : (
                        <Form.Select
                          name="lineItem.catalogObjectId"
                          value={lineItem.catalogObjectId}
                          onChange={(e) => handleChangeOrder(e, index)}
                        >
                          <option>Select item variation</option>
                          {items.map((item) => {
                            return item.itemData.variations.map((variation) => {
                              return (
                                <option value={variation.id}>
                                  {variation.itemVariationData.name}{" "}
                                  {item.itemData.name}
                                </option>
                              );
                            });
                          })}
                        </Form.Select>
                      )}
                    </Col>
                    <Col>
                      <Form.Label className="text-muted">Quantity *</Form.Label>
                      {disabled ? (
                        <Form.Control
                          type="text"
                          name="lineItem.quantity"
                          value={lineItem.quantity}
                          disabled
                        />
                      ) : (
                        <Form.Control
                          type="text"
                          name="lineItem.quantity"
                          value={lineItem.quantity}
                          onChange={(e) => handleChangeOrder(e, index)}
                          placeholder="i.e. 1"
                        />
                      )}
                    </Col>
                    {lineItem.modifiers.map((modifier, index2) => {
                      return (
                        <Col className="col-lg-12">
                          <Form.Label className="text-muted">
                            Modifier
                          </Form.Label>
                          {disabled ? (
                            <Form.Control
                              type="text"
                              name="modifier.catalogObjectId"
                              value={modifier.catalogObjectId}
                              disabled
                            />
                          ) : (
                            <Form.Control
                              type="text"
                              name="modifier.catalogObjectId"
                              value={modifier.catalogObjectId}
                              onChange={(e) =>
                                handleChangeOrder(e, index, index2)
                              }
                              placeholder="i.e. CATALOG_OBJECT_ID"
                            />
                          )}
                        </Col>
                      );
                    })}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <hr />
      <Row className="g-3 justify-content-end">
        <Col>* Required</Col>
        {disabled ? (
          <Col className="col-auto">
            <Button>Update</Button>
          </Col>
        ) : (
          <>
            <Col className="col-auto">
              <Button onClick={addLineItem}>+ Line Item</Button>
            </Col>
            <Col className="col-auto">
              <Button onClick={handleSubmit}>Submit</Button>
            </Col>
          </>
        )}
      </Row>
    </Form>
  );
};

export default Order;
