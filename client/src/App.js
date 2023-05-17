import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import CatalogObject from "./pages/CatalogObject";
import Customers from "./pages/Customers";
import Customer from "./pages/Customer";
import Orders from "./pages/Orders";
import Order from "./pages/Order";

const App = () => {
  return (
    <div>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<CatalogObject />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/:id" element={<Customer />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<Order />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
