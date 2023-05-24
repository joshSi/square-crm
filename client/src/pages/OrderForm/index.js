import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import OrderFormComponent from "./components/Order";

const OrderForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ customers: [], items: [] });
  const [order, setOrder] = useState({
    customerId: "",
    lineItems: [
      {
        quantity: "",
        catalogObjectId: "",
        modifiers: [
          {
            catalogObjectId: "",
          },
        ],
      },
    ],
  });

  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/customers", {
        method: "GET",
      });
      return await response.json();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const fetchCatalogItems = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/catalog/items", {
        method: "GET",
      });
      return await response.json();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const createOrder = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      return await response.json();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [customers, items] = await Promise.all([
          fetchCustomers(),
          fetchCatalogItems(),
        ]);

        setData({ customers, items });
        setLoading(false);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    const { id } = await createOrder();
    navigate(`/orders/${id}`);
  };

  if (loading) return <Container>Loading...</Container>;
  if (!data) return <Container>No result found</Container>;

  return (
    <Container className="pt-3">
      <OrderFormComponent
        customers={data.customers}
        items={data.items}
        order={order}
        setOrder={setOrder}
        disabled={false}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default OrderForm;
