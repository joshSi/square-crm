import React, { useEffect, useState, useCallback } from "react";
import { Container } from "react-bootstrap";
import Order from "./Order";
import Filter from "./Filter";

const Orders = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ orders: [], customers: [] });
  const [filter, setFilter] = useState({ customerIds: {} });

  const fetchCustomers = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/api/customers", {
        method: "GET",
      });
      return await response.json();
    } catch (error) {
      console.error("Error: ", error);
    }
  }, []);

  const createQuery = useCallback(() => {
    let query = "";

    for (const category in filter) {
      const categoryObj = filter[category];

      if (Object.keys(categoryObj).length === 0) continue;

      for (const item in categoryObj) {
        if (!categoryObj[item]) continue;

        if (query !== "") query += "&";
        query += `${category}=${item}`;
      }
    }

    console.log("query: ", query);
    return query;
  }, [filter]);

  const fetchOrders = useCallback(async () => {
    try {
      const query = createQuery();
      const response = await fetch(
        `http://localhost:3000/api/orders?${query}`,
        {
          method: "GET",
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error: ", error);
    }
  }, [createQuery]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [orders, customers] = await Promise.all([
          fetchOrders(),
          fetchCustomers(),
        ]);

        setData({ orders, customers });
        setLoading(false);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchData();
  }, [fetchOrders, fetchCustomers]);

  const handleChange = (event) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      customerIds: {
        ...prevFilter.customerIds,
        [event.target.name]: event.target.checked,
      },
    }));
  };

  if (loading) return <Container>Loading...</Container>;

  return (
    <Container>
      <Filter
        name="Customers"
        data={data.customers}
        state={filter.customerIds}
        handleChange={handleChange}
      />
      {!data.orders
        ? "No results found"
        : data.orders.map((order) => {
            return <Order key={order.id} {...order} />;
          })}
    </Container>
  );
};

export default Orders;
