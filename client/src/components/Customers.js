import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Customer from "./Customer";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/customers", {
        method: "GET",
      });
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  });

  return (
    <Container>
      {customers.map((customer) => {
        return <Customer key={customer.id} {...customer} />;
      })}
    </Container>
  );
};

export default Customers;
