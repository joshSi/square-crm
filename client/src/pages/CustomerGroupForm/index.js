import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import CustomerGroupFormComponent from "./components/CustomerGroup";

const CustomerGroupForm = () => {
  const navigate = useNavigate();
  const [customerGroup, setCustomerGroup] = useState({ name: "" });

  const createCustomerGroup = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/customergroups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ group: customerGroup }),
      });
      return await response.json();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleSubmit = async () => {
    const { id } = await createCustomerGroup();
    navigate(`/customergroups/${id}`);
  };

  return (
    <Container className="pt-3">
      <CustomerGroupFormComponent
        customerGroup={customerGroup}
        setCustomerGroup={setCustomerGroup}
        disabled={false}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default CustomerGroupForm;
