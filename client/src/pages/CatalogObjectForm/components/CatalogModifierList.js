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

const CatalogModifierList = (props) => {
  const { modifierList, setModifierList, disabled, setDisabled, handleSubmit } =
    props;
  const modifiers = props.modifierList.modifierListData.modifiers;

  const handleChangeModifierList = (event, index) => {
    const names = event.target.name.split(".");

    if (names[0] === "modifierList") {
      // modifierList
      if (names[1] !== "modifierListData") {
        // type, id
        return setModifierList({
          ...modifierList,
          [names[1]]: event.target.value,
        });
      }
      // modifierListData
      // name
      return setModifierList({
        ...modifierList,
        modifierListData: {
          ...modifierList.modifierListData,
          [names[2]]: event.target.value,
        },
      });
    }

    if (names[0] === "modifier") {
      // modifier
      if (names[1] !== "modifierData") {
        // type, id
        return setModifierList({
          ...modifierList,
          modifierListData: {
            ...modifierList.modifierListData,
            modifiers: [
              ...modifiers.slice(0, index),
              { ...modifiers[index], [names[1]]: event.target.value },
              ...modifiers.slice(index + 1),
            ],
          },
        });
      }
      // modifierData
      if (names[2] !== "priceMoney") {
        // modifierListId, name
        return setModifierList({
          ...modifierList,
          modifierListData: {
            ...modifierList.modifierListData,
            modifiers: [
              ...modifiers.slice(0, index),
              {
                ...modifiers[index],
                modifierData: {
                  ...modifiers[index].modifierData,
                  [names[2]]: event.target.value,
                },
              },
              ...modifiers.slice(index + 1),
            ],
          },
        });
      }
      // priceMoney
      return setModifierList({
        ...modifierList,
        modifierListData: {
          ...modifierList.modifierListData,
          modifiers: [
            ...modifiers.slice(0, index),
            {
              ...modifiers[index],
              modifierData: {
                ...modifiers[index].modifierData,
                priceMoney: {
                  ...modifiers[index].modifierData.priceMoney,
                  [names[3]]: parseInt(event.target.value),
                },
              },
            },
            ...modifiers.slice(index + 1),
          ],
        },
      });
    }
  };

  const addModifier = () => {
    let id = modifiers[modifiers.length - 1].id.replace(/\d+/, (n) => ++n);
    if (id[0] !== "#") id = "#" + id;
    const modifier = {
      type: "MODIFIER",
      id,
      modifierData: {
        modifierListId: modifierList.id,
        name: "",
        priceMoney: {
          amount: "",
          currency: "USD",
        },
      },
    };
    return setModifierList({
      ...modifierList,
      modifierListData: {
        ...modifierList.modifierListData,
        modifiers: [...modifiers, modifier],
      },
    });
  };

  const removeModifier = (index) => {
    return setModifierList({
      ...modifierList,
      modifierListData: {
        ...modifierList.modifierListData,
        modifiers: [
          ...modifiers.slice(0, index),
          ...modifiers.slice(index + 1),
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
                    name="modifierList.type"
                    value={modifierList.type}
                    disabled
                  />
                </Col>
                <Col>
                  <Form.Label className="text-muted">Id *</Form.Label>
                  <Form.Control
                    type="text"
                    name="modifierList.id"
                    value={modifierList.id}
                    onChange={handleChangeModifierList}
                    placeholder="i.e. #milk_options"
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
                    name="modifierList.modifierListData.name"
                    value={modifierList.modifierListData.name}
                    onChange={handleChangeModifierList}
                    placeholder="i.e. Milk Options"
                    disabled={disabled}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        {modifiers.map((modifier, index) => {
          return (
            <Col key={modifier.id}>
              <Card>
                <Card.Header>
                  <Row className="g-3 row-cols-2">
                    <Col>
                      <Form.Label className="text-muted">Type *</Form.Label>
                      <Form.Control
                        type="text"
                        name="modifier.type"
                        value={modifier.type}
                        disabled
                      />
                    </Col>
                    <Col>
                      <Row className="g-3 row-cols-auto justify-content-between">
                        <Form.Label className="text-muted">Id *</Form.Label>
                        {modifiers.length > 1 ? (
                          <Col className="col-auto">
                            <CloseButton
                              onClick={() => removeModifier(index)}
                              disabled={disabled}
                            />
                          </Col>
                        ) : (
                          ""
                        )}
                      </Row>
                      <Form.Control
                        type="text"
                        name="modifier.id"
                        value={modifier.id}
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
                        name="modifier.modifierData.name"
                        value={modifier.modifierData.name}
                        onChange={(e) => handleChangeModifierList(e, index)}
                        placeholder="i.e. Whole Milk"
                        disabled={disabled}
                      />
                    </Col>
                    <Col>
                      <Form.Label className="text-muted">
                        Price Money *
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="number"
                          name="modifier.modifierData.priceMoney.amount"
                          value={modifier.modifierData.priceMoney.amount}
                          onChange={(e) => handleChangeModifierList(e, index)}
                          placeholder="i.e. 100"
                          disabled={disabled}
                        />
                        <InputGroup.Text>
                          {modifier.modifierData.priceMoney.currency}
                        </InputGroup.Text>
                      </InputGroup>
                    </Col>
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
              <Button onClick={addModifier}>+ Modifier</Button>
            </Col>
            <Col className="col-auto">
              <Button onClick={() => handleSubmit(modifierList.type)}>
                Submit
              </Button>
            </Col>
          </>
        )}
      </Row>
    </Form>
  );
};

export default CatalogModifierList;
