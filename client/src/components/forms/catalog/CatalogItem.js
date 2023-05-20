import React from "react";
import {
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  CloseButton,
  Button,
} from "react-bootstrap";

const CatalogItem = (props) => {
  const { item, setItem, disabled, setDisabled, handleSubmit } = props;
  const variations = props.item.itemData.variations;

  const handleChangeItem = (event, index) => {
    const names = event.target.name.split(".");

    if (names[0] === "item") {
      // item
      if (names[1] !== "itemData") {
        // type, id
        return setItem({
          ...item,
          [names[1]]: event.target.value,
        });
      }
      // itemData
      // name, description, abbreviation
      return setItem({
        ...item,
        itemData: {
          ...item.itemData,
          [names[2]]: event.target.value,
        },
      });
    }

    if (names[0] === "variation") {
      // item variation
      if (names[1] !== "itemVariationData") {
        // type, id
        return setItem({
          ...item,
          itemData: {
            ...item.itemData,
            variations: [
              ...variations.slice(0, index),
              { ...variations[index], [names[1]]: event.target.value },
              ...variations.slice(index + 1),
            ],
          },
        });
      }
      // itemVariationData
      if (names[2] !== "pricingType" && names[2] !== "priceMoney") {
        // itemId, name
        return setItem({
          ...item,
          itemData: {
            ...item.itemData,
            variations: [
              ...variations.slice(0, index),
              {
                ...variations[index],
                itemVariationData: {
                  ...variations[index].itemVariationData,
                  [names[2]]: event.target.value,
                },
              },
              ...variations.slice(index + 1),
            ],
          },
        });
      }
      if (names[2] === "pricingType") {
        if (event.target.value === "VARIABLE_PRICING") {
          const { priceMoney, ...rest } =
            item.itemData.variations[index].itemVariationData;
          return setItem({
            ...item,
            itemData: {
              ...item.itemData,
              variations: [
                ...variations.slice(0, index),
                {
                  ...variations[index],
                  itemVariationData: {
                    ...rest,
                    pricingType: event.target.value,
                  },
                },
                ...variations.slice(index + 1),
              ],
            },
          });
        }
        if (event.target.value === "FIXED_PRICING") {
          const priceMoney = { amount: "", currency: "USD" };
          return setItem({
            ...item,
            itemData: {
              ...item.itemData,
              variations: [
                ...variations.slice(0, index),
                {
                  ...variations[index],
                  itemVariationData: {
                    ...variations[index].itemVariationData,
                    pricingType: event.target.value,
                    priceMoney,
                  },
                },
                ...variations.slice(index + 1),
              ],
            },
          });
        }
      }
      if (names[2] === "priceMoney") {
        // priceMoney
        return setItem({
          ...item,
          itemData: {
            ...item.itemData,
            variations: [
              ...variations.slice(0, index),
              {
                ...variations[index],
                itemVariationData: {
                  ...variations[index].itemVariationData,
                  priceMoney: {
                    ...variations[index].itemVariationData.priceMoney,
                    [names[3]]: parseInt(event.target.value),
                  },
                },
              },
              ...variations.slice(index + 1),
            ],
          },
        });
      }
    }
  };

  const addItemVariation = () => {
    let id = variations[variations.length - 1].id.replace(/\d+/, (n) => ++n);
    if (id[0] !== "#") id = "#" + id;
    const itemVariation = {
      type: "ITEM_VARIATION",
      id,
      itemVariationData: {
        itemId: item.id,
        name: "",
        pricingType: "VARIABLE_PRICING",
      },
    };
    return setItem({
      ...item,
      itemData: {
        ...item.itemData,
        variations: [...variations, itemVariation],
      },
    });
  };

  const removeItemVariation = (index) => {
    return setItem({
      ...item,
      itemData: {
        ...item.itemData,
        variations: [
          ...variations.slice(0, index),
          ...variations.slice(index + 1),
        ],
      },
    });
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
                    name="item.type"
                    value={item.type}
                    disabled
                  />
                </Col>
                <Col>
                  <Form.Label className="text-muted">Id *</Form.Label>
                  <Form.Control
                    type="text"
                    name="item.id"
                    value={item.id}
                    onChange={handleChangeItem}
                    placeholder="i.e. #coffee"
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
                    name="item.itemData.name"
                    value={item.itemData.name}
                    onChange={handleChangeItem}
                    placeholder="i.e. Coffee"
                    disabled={disabled}
                  />
                </Col>
                <Col>
                  <Form.Label className="text-muted">Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="item.itemData.description"
                    value={item.itemData.description}
                    onChange={handleChangeItem}
                    placeholder="i.e. Coffee drink"
                    disabled={disabled}
                  />
                </Col>
                <Col>
                  <Form.Label className="text-muted">Abbreviation</Form.Label>
                  <Form.Control
                    type="text"
                    name="item.itemData.abbreviation"
                    value={item.itemData.abbreviation}
                    onChange={handleChangeItem}
                    placeholder="i.e. Co"
                    disabled={disabled}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        {variations.map((variation, index) => {
          return (
            <Col key={variation.id}>
              <Card>
                <Card.Header>
                  <Row className="g-3 row-cols-2">
                    <Col>
                      <Form.Label className="text-muted">Type *</Form.Label>
                      <Form.Control
                        type="text"
                        name="variation.type"
                        value={variation.type}
                        disabled
                      />
                    </Col>
                    <Col>
                      <Row className="g-3 row-cols-auto justify-content-between">
                        <Form.Label className="text-muted">Id *</Form.Label>
                        {variations.length > 1 ? (
                          <Col className="col-auto">
                            <CloseButton
                              onClick={() => removeItemVariation(index)}
                              disabled={disabled}
                            />
                          </Col>
                        ) : (
                          ""
                        )}
                      </Row>
                      <Form.Control
                        type="text"
                        name="variation.id"
                        value={variation.id}
                        disabled
                      />
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  <Row className="g-3 row-cols-2">
                    <Col>
                      <Form.Label className="text-muted">Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="variation.itemVariationData.name"
                        value={variation.itemVariationData.name}
                        onChange={(e) => handleChangeItem(e, index)}
                        placeholder="i.e. Small"
                        disabled={disabled}
                      />
                    </Col>
                    <Col>
                      <Form.Label className="text-muted">
                        Pricing Type *
                      </Form.Label>
                      <Form.Select
                        name="variation.itemVariationData.pricingType"
                        value={variation.itemVariationData.pricingType}
                        onChange={(e) => handleChangeItem(e, index)}
                        disabled={disabled}
                      >
                        <option value="VARIABLE_PRICING">Variable</option>
                        <option value="FIXED_PRICING">Fixed</option>
                      </Form.Select>
                    </Col>
                    {variation.itemVariationData.pricingType ===
                    "FIXED_PRICING" ? (
                      <Col>
                        <Form.Label className="text-muted">
                          Price Money *
                        </Form.Label>
                        <InputGroup>
                          <Form.Control
                            type="number"
                            name="variation.itemVariationData.priceMoney.amount"
                            value={
                              variation.itemVariationData.priceMoney.amount
                            }
                            onChange={(e) => handleChangeItem(e, index)}
                            placeholder="i.e. 300"
                            disabled={disabled}
                          />
                          <InputGroup.Text>
                            {variation.itemVariationData.priceMoney.currency}
                          </InputGroup.Text>
                        </InputGroup>
                      </Col>
                    ) : (
                      ""
                    )}
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
          <>
            <Col className="col-auto">
              <Button onClick={() => setDisabled(false)}>Update</Button>
            </Col>
            <Col className="col-auto">
              <Button onClick={props.handleDelete}>Delete</Button>
            </Col>
          </>
        ) : (
          <>
            <Col className="col-auto">
              <Button onClick={addItemVariation}>+ Item Variation</Button>
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

export default CatalogItem;
