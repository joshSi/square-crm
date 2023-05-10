import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Customers from "./components/Customers";
import Catalog from "./components/Catalog";

const App = () => {
  return (
    <div>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="customers" element={<Customers />} />
          <Route path="catalog" element={<Catalog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
