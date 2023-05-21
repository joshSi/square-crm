import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import CatalogItem from "../CatalogObjectForm/components/CatalogItem";
import CatalogModifierList from "../CatalogObjectForm/components/CatalogModifierList";
import CatalogTax from "../CatalogObjectForm/components/CatalogTax";

const CatalogObject = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.replace("/catalog/", "");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [disabled, setDisabled] = useState(true);

  const fetchCatalogObject = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/catalog/${id}`, {
        method: "GET",
      });
      return await response.json();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const updateCatalogObject = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/catalog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const deleteCatalogObject = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/catalog/${id}`, {
        method: "DELETE",
      });
      return await response.json();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleUpdate = async () => {
    const catalogObject = await updateCatalogObject();
    setData(catalogObject);
    setDisabled(true);
  };

  const handleDelete = async () => {
    const response = await deleteCatalogObject(id);
    navigate("/catalog");
    console.log(response);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const catalogObject = await fetchCatalogObject(id);
        setData(catalogObject);
        setLoading(false);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Container>Loading...</Container>;
  if (!data.itemData && !data.modifierListData && !data.taxData)
    return <Container>No result found</Container>;

  return (
    <Container className="pt-3">
      {data.type === "ITEM" ? (
        <CatalogItem
          item={data}
          setItem={setData}
          disabled={disabled}
          setDisabled={setDisabled}
          handleDelete={handleDelete}
          handleSubmit={handleUpdate}
        />
      ) : data.type === "MODIFIER_LIST" ? (
        <CatalogModifierList
          modifierList={data}
          setModifierList={setData}
          disabled={disabled}
          setDisabled={setDisabled}
          handleDelete={handleDelete}
          handleSubmit={handleUpdate}
        />
      ) : data.type === "TAX" ? (
        <CatalogTax
          tax={data}
          setTax={setData}
          disabled={disabled}
          setDisabled={setDisabled}
          handleDelete={handleDelete}
          handleSubmit={handleUpdate}
        />
      ) : (
        "No result found"
      )}
    </Container>
  );
};

export default CatalogObject;
