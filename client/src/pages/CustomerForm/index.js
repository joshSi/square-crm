import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import CustomerFormComponent from "./components/Customer";

const CustomerForm = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    givenName: "",
    familyName: "",
    companyName: "",
    nickname: "",
    emailAddress: "",
    address: {
      addressLine1: "",
      addressLine2: "",
      locality: "",
      administrativeDistrictLevel1: "",
      postalCode: "",
      country: "",
    },
    phoneNumber: "",
    referenceId: "",
    note: "",
    birthday: "",
  });

  const createCustomer = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
      });
      return await response.json();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleSubmit = async () => {
    const { id } = await createCustomer();
    navigate(`/customers/${id}`);
  };

  return (
    <Container className="pt-3">
      <CustomerFormComponent
        customer={customer}
        setCustomer={setCustomer}
        disabled={false}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default CustomerForm;
