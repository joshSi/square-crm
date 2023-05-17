import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Card, ListGroup, Row, Col } from "react-bootstrap";

const Customer = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ customer: {} });

  const fetchCustomer = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/customers/${id}`);
      return await response.json();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    console.log("useEffect");
    const id = location.pathname.replace("/customers/", "");
    const fetchData = async () => {
      try {
        setLoading(true);
        const customer = await fetchCustomer(id);
        setData({ customer });
        setLoading(false);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Container>Loading...</Container>;
  if (!data.customer) return <Container>No result found</Container>;

  const { givenName, familyName, phoneNumber, emailAddress, address, groups } =
    data.customer;

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>
            {givenName} {familyName}
          </Card.Title>
        </Card.Body>
      </Card>
      <Row>
        <Col sm={4}>
          <Card>
            <Card.Header>Contact</Card.Header>
            <Card.Body>
              <div className="mb-2 text-muted">Photo</div>
              <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <div className="mb-2 text-muted">Phone</div>
                {!phoneNumber ? "None" : phoneNumber}
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="mb-2 text-muted">Email</div>
                {!emailAddress ? "None" : emailAddress}
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="mb-2 text-muted">Address</div>
                {!address ? (
                  "None"
                ) : (
                  <>
                    {address.addressLine1}
                    <br />
                    {address.addressLine2}
                    <br />
                    {address.locality}, {address.administrativeDistrictLevel1}{" "}
                    {address.postalCode}
                  </>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
          <Card>
            <Card.Header>Groups</Card.Header>
            <Card.Body>
              {!groups
                ? "None"
                : groups.map((group) => {
                    return (
                      <Card.Link
                        key={group.id}
                        href={`/customers?groupIds=${group.id}`}
                      >
                        {group.name}
                      </Card.Link>
                    );
                  })}
            </Card.Body>
          </Card>
        </Col>
        <Col sm={8}>
          <Card>
            <Card.Header>Orders</Card.Header>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Customer;
