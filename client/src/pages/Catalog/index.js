import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Filter from "../../components/Filter";
import NavButton from "../../components/NavButton";
import Header from "../../components/Header";
import CatalogObject from "./components/CatalogObject";

const Catalog = () => {
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
  const headerLabels = ["ID", "Type", "Name", "Options"];
  const navButtonInfo = { name: "+ Catalog Object", link: "form" };

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
          <NavButton {...navButtonInfo} />
        </Col>
      </Row>
      <Row className="g-3 pt-3 row-cols-1">
        <Col>
          <Header labels={headerLabels} />
        </Col>
        {!data
          ? "No results found"
          : data.map((catalogObject) => {
              return (
                <Col>
                  <CatalogObject key={catalogObject.id} {...catalogObject} />
                </Col>
              );
            })}
      </Row>
    </Container>
  );
};

export default Catalog;
