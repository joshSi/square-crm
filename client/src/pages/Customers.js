import React, { useEffect, useState, useCallback } from "react";
import { Container } from "react-bootstrap";
import Customer from "../components/Customer";
import Filter from "../components/Filter";

const Customers = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ customers: [], groups: [] });
  const [filter, setFilter] = useState({ groupIds: {} });

  const fetchGroups = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/api/customergroups", {
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

  const fetchCustomers = useCallback(async () => {
    try {
      const query = createQuery();
      const response = await fetch(
        `http://localhost:3000/api/customers?${query}`,
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
        const [customers, groups] = await Promise.all([
          fetchCustomers(),
          fetchGroups(),
        ]);

        setData({ customers, groups });
        setLoading(false);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchData();
  }, [fetchCustomers, fetchGroups]);

  const handleChange = (event) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      groupIds: {
        ...prevFilter.groupIds,
        [event.target.name]: event.target.checked,
      },
    }));
  };

  if (loading) return <Container>Loading...</Container>;

  return (
    <Container>
      <Filter
        name="Groups"
        data={data.groups}
        state={filter.groupIds}
        handleChange={handleChange}
      />
      {!data.customers
        ? "No results found"
        : data.customers.map((customer) => {
            return <Customer key={customer.id} {...customer} />;
          })}
    </Container>
  );
};

export default Customers;
