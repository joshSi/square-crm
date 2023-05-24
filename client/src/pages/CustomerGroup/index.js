import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import CustomerGroupFormComponent from "../CustomerGroupForm/components/CustomerGroup";

const CustomerGroup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.replace("/customergroups/", "");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [disabled, setDisabled] = useState(true);

  const fetchCustomerGroup = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/customergroups/${id}`,
        { method: "GET" }
      );
      return await response.json();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const updateCustomerGroup = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/customergroups/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ group: data }),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const deleteCustomerGroup = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/customergroups/${id}`,
        { method: "DELETE" }
      );
      return await response.json();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleUpdate = async () => {
    const customerGroup = await updateCustomerGroup();
    setData(customerGroup);
    setDisabled(true);
  };

  const handleDelete = async () => {
    const response = await deleteCustomerGroup(id);
    navigate("/customergroups");
    console.log(response);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const customerGroup = await fetchCustomerGroup(id);
        setData(customerGroup);
        setLoading(false);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Container>Loading...</Container>;
  if (!data) return <Container>No result found</Container>;

  return (
    <Container className="pt-3">
      <CustomerGroupFormComponent
        customerGroup={data}
        setCustomerGroup={setData}
        disabled={disabled}
        setDisabled={setDisabled}
        handleDelete={handleDelete}
        handleSubmit={handleUpdate}
      />
    </Container>
  );
};

export default CustomerGroup;
