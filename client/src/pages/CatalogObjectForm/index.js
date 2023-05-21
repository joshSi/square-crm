import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import CatalogItem from "./components/CatalogItem";
import CatalogModifierList from "./components/CatalogModifierList";
import CatalogTax from "./components/CatalogTax";

const CatalogObjectForm = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [item, setItem] = useState({
    type: "ITEM",
    id: "#item1",
    itemData: {
      name: "",
      description: "",
      abbreviation: "",
      variations: [
        {
          type: "ITEM_VARIATION",
          id: "#variation1",
          itemVariationData: {
            itemId: "#item1",
            name: "",
            pricingType: "VARIABLE_PRICING",
          },
        },
      ],
    },
  });
  const [modifierList, setModifierList] = useState({
    type: "MODIFIER_LIST",
    id: "#modifierlist1",
    modifierListData: {
      name: "",
      modifiers: [
        {
          type: "MODIFIER",
          id: "#modifier1",
          modifierData: {
            name: "",
            priceMoney: {
              amount: "",
              currency: "USD",
            },
            modifierListId: "#modifierlist1",
          },
        },
      ],
    },
  });
  const [tax, setTax] = useState({
    type: "TAX",
    id: "#tax1",
    taxData: {
      name: "",
      calculationPhase: "TAX_SUBTOTAL_PHASE",
      inclusionType: "ADDITIVE",
      percentage: "",
    },
  });

  const createCatalogObject = async (requestObject) => {
    try {
      const response = await fetch("http://localhost:3000/api/catalog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestObject),
      });
      return await response.json();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleSubmit = async (type) => {
    const requestObject =
      type === "ITEM"
        ? item
        : type === "MODIFIER_LIST"
        ? modifierList
        : type === "TAX"
        ? tax
        : "";
    const { id } = await createCatalogObject(requestObject);
    navigate(`/catalog/${id}`);
  };

  return (
    <Container className="pt-3">
      <Form.Select onChange={handleChange}>
        <option>Select catalog type</option>
        <option value="Item">Item</option>
        <option value="ModifierList">Modifier List</option>
        <option value="Tax">Tax</option>
      </Form.Select>
      {type === "Item" ? (
        <CatalogItem
          item={item}
          setItem={setItem}
          disabled={false}
          handleSubmit={handleSubmit}
        />
      ) : type === "ModifierList" ? (
        <CatalogModifierList
          modifierList={modifierList}
          setModifierList={setModifierList}
          disabled={false}
          handleSubmit={handleSubmit}
        />
      ) : type === "Tax" ? (
        <CatalogTax
          tax={tax}
          setTax={setTax}
          disabled={false}
          handleSubmit={handleSubmit}
        />
      ) : (
        ""
      )}
    </Container>
  );
};

export default CatalogObjectForm;
