import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Admin from "./Pages/Admin";
import AddProduct from "./Components/AddProduct/AddProduct";
import ListProduct from "./Components/ListProduct/ListProduct";
import EditProduct from "./Components/EditProduct/EditProduct";

const App = () => {
  return (
    <Routes>
      <Route path="/admin" element={<Admin />}>
        <Route path="addproduct" element={<AddProduct />} />
        <Route path="listproduct" element={<ListProduct />} />
        <Route path="editproduct/:id" element={<EditProduct />} />
      </Route>
    </Routes>
  );
};

export default App;
