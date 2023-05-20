import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import Filter from "../components/Filter";
import CatalogObject from "../components/CatalogObject";

const Catalog = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({ objectTypes: {} });

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

  const fetchCatalog = useCallback(async () => {
    try {
      setLoading(true);
      const query = createQuery();
      const response = await fetch(
        `http://localhost:3000/api/catalog?${query}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error: ", error);
    }
  }, [createQuery]);

  useEffect(() => {
    fetchCatalog();
  }, [fetchCatalog]);

  const handleChange = (event) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      objectTypes: {
        ...prevFilter.objectTypes,
        [event.target.name]: event.target.checked,
      },
    }));
  };

  if (loading) return <Container>Loading...</Container>;

  const objectTypes = [
    { id: "ITEM", name: "ITEM" },
    { id: "MODIFIER_LIST", name: "MODIFIER_LIST" },
    { id: "TAX", name: "TAX" },
  ];

  return (
    <Container className="pt-3">
      <Row className="g-3 justify-content-start">
        <Col className="col-auto">
          <Filter
            name="Types"
            data={objectTypes}
            state={filter.objectTypes}
            handleChange={handleChange}
          />
        </Col>
        <Col className="col-auto">
          <Button onClick={() => navigate("form")}>+ Catalog Object</Button>
        </Col>
      </Row>
      {!data
        ? "No results found"
        : data.map((catalogObject) => {
            return <CatalogObject key={catalogObject.id} {...catalogObject} />;
          })}
    </Container>
  );
};

export default Catalog;
