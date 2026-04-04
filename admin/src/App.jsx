import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Admin from "./Pages/Admin";
import AddProduct from "./Components/AddProduct/AddProduct";
import ListProduct from "./Components/ListProduct/ListProduct";
import EditProduct from "./Components/EditProduct/EditProduct";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Admin />}>

        <Route index element={<Navigate to="list-product" replace />} />

        <Route path="add-product" element={<AddProduct />} />
        <Route path="list-product" element={<ListProduct />} />
        <Route path="edit-product/:id" element={<EditProduct />} />

      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;