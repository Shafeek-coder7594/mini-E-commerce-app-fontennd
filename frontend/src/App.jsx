import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/products/ProductsPage";
import AddProduct from "./pages/add-product/AddProduct";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
    <div>
      <Navbar />
    </div>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
