import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavButton from "../../components/NavButton";
import Header from "../../components/Header";
import CustomerGroup from "./components/CustomerGroup";

const CustomerGroups = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchCustomerGroups = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/customergroups", {
        method: "GET",
      });
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    fetchCustomerGroups();
  }, []);

  if (loading) return <Container>Loading...</Container>;

  const headerLabels = ["ID", "Name"];
  const navButtonInfo = { name: "+ Customer Group", link: "form" };

  return (
    <Container className="pt-3">
      <Row className="g-3 justify-content-start">
        <Col className="col-auto">
          <NavButton {...navButtonInfo} />
        </Col>
      </Row>
      <Row className="g-3 pt-3 row-cols-1">
        <Col>
          <Header labels={headerLabels} />
        </Col>
        {!data
          ? "No results found"
          : data.map((customerGroup) => {
              return (
                <Col>
                  <CustomerGroup key={customerGroup.id} {...customerGroup} />
                </Col>
              );
            })}
      </Row>
    </Container>
  );
};

export default CustomerGroups;
