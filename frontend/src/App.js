import {  Routes, Route } from "react-router-dom";

import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () =>{
    return (
      <div>
        <Routes>
          <Route path="/products" element={<ProductList />}></Route>
          <Route path="/add-product" element={<AddProduct/>}></Route>
          <Route path="/edit/:id" element={<EditProduct />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </div>
    );
};

export default App;
