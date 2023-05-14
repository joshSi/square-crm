import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Customer from "./Customer";
import Filter from "./Filter";

const Customers = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ customers: [], groups: [] });
  const [filter, setFilter] = useState({ groupIds: {} });

  const createQuery = () => {
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
  };

  const fetchCustomers = async () => {
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
  };

  const fetchGroups = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/customergroups", {
        method: "GET",
      });
      return await response.json();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      const [customers, groups] = await Promise.all([
        await fetchCustomers(),
        await fetchGroups(),
      ]);

      setData({ customers, groups });
      setLoading(false);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleChange = (event) => {
    setFilter({
      ...filter,
      groupIds: {
        ...filter.groupIds,
        [event.target.name]: event.target.checked,
      },
    });
    createQuery();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Container>Loading...</Container>
      ) : (
        <Container>
          <Filter
            name="Groups"
            data={data.groups}
            state={filter.groupIds}
            handleChange={handleChange}
          />
          {data.customers.map((customer) => {
            return <Customer key={customer.id} {...customer} />;
          })}
        </Container>
      )}
    </>
  );
};

export default Customers;
