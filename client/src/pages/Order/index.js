import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import OrderFormComponent from "../OrderForm/components/Order";

const Order = () => {
  const location = useLocation();
  const id = location.pathname.replace("/orders/", "");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const fetchOrder = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/orders/${id}`, {
        method: "GET",
      });
      return await response.json();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const updateOrder = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleUpdate = async () => {
    const order = await updateOrder();
    setData(order);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const order = await fetchOrder(id);
        setData(order);
        setLoading(false);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Container>Loading...</Container>;
  if (!data.lineItems) return <Container>No result found</Container>;

  return (
    <Container className="pt-3">
      <OrderFormComponent
        order={data}
        setOrder={setData}
        disabled={true}
        handleSubmit={handleUpdate}
      />
    </Container>
  );
};

export default Order;
