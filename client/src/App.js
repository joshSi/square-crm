import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import CatalogObject from "./pages/CatalogObject";
import CatalogObjectForm from "./pages/CatalogObjectForm";
import Customers from "./pages/Customers";
import Customer from "./pages/Customer";
import CustomerForm from "./pages/CustomerForm";
import CustomerGroups from "./pages/CustomerGroups";
import CustomerGroup from "./pages/CustomerGroup";
import CustomerGroupForm from "./pages/CustomerGroupForm";
import Orders from "./pages/Orders";
import Order from "./pages/Order";
import OrderForm from "./pages/OrderForm";

const App = () => {
  return (
    <div>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/form" element={<CatalogObjectForm />} />
          <Route path="/catalog/:id" element={<CatalogObject />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/form" element={<CustomerForm />} />
          <Route path="/customers/:id" element={<Customer />} />
          <Route path="/customergroups" element={<CustomerGroups />} />
          <Route path="/customergroups/form" element={<CustomerGroupForm />} />
          <Route path="/customergroups/:id" element={<CustomerGroup />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/form" element={<OrderForm />} />
          <Route path="/orders/:id" element={<Order />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
