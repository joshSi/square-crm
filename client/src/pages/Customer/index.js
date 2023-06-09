import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import CustomerFormComponent from "../CustomerForm/components/Customer";

const Customer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.replace("/customers/", "");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [disabled, setDisabled] = useState(true);

  const fetchCustomer = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/customers/${id}`,
        { method: "GET" }
      );
      return await response.json();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const updateCustomer = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/customers/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/customers/${id}`,
        { method: "DELETE" }
      );
      return await response.json();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleUpdate = async () => {
    const customer = await updateCustomer();
    setData(customer);
    setDisabled(true);
  };

  const handleDelete = async () => {
    const response = await deleteCustomer(id);
    navigate("/customers");
    console.log(response);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const customer = await fetchCustomer(id);
        setData(customer);
        setLoading(false);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Container>Loading...</Container>;
  if (!data.address) return <Container>No result found</Container>;

  return (
    <Container className="pt-3">
      <CustomerFormComponent
        customer={data}
        setCustomer={setData}
        disabled={disabled}
        setDisabled={setDisabled}
        handleDelete={handleDelete}
        handleSubmit={handleUpdate}
      />
    </Container>
  );
};

export default Customer;
