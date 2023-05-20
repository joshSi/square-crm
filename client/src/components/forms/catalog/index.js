import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import CatalogItem from "./CatalogItem";

const CatalogForm = () => {
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

  const createCatalogObject = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/catalog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      return await response.json();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleSubmit = async () => {
    const { id } = await createCatalogObject();
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
        "CatalogModifierList"
      ) : type === "Tax" ? (
        "CatalogTax"
      ) : (
        ""
      )}
    </Container>
  );
};

export default CatalogForm;
