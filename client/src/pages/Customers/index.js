import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Filter from "../../components/Filter";
import NavButton from "../../components/NavButton";
import Header from "../../components/Header";
import Customer from "./components/Customer";

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

  const headerLabels = ["ID", "Name", "Phone", "Locality"];
  const navButton1Info = { name: "+ Customer", link: "form" };
  const navButton2Info = {
    name: "-> Customer Groups",
    link: "/customergroups",
  };

  return (
    <Container className="pt-3">
      <Row className="g-3 justify-content-start">
        <Col className="col-auto">
          <Filter
            name="Customer Groups"
            data={data.groups}
            state={filter.groupIds}
            handleChange={handleChange}
          />
        </Col>
        <Col className="col-auto">
          <NavButton {...navButton1Info} />
        </Col>
        <Col className="col-auto">
          <NavButton {...navButton2Info} />
        </Col>
      </Row>
      <Row className="g-3 pt-3 row-cols-1">
        <Col>
          <Header labels={headerLabels} />
        </Col>
        {!data.customers
          ? "No results found"
          : data.customers.map((customer) => {
              return (
                <Col>
                  <Customer key={customer.id} {...customer} />
                </Col>
              );
            })}
      </Row>
    </Container>
  );
};

export default Customers;
