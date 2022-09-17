import {  Routes, Route } from "react-router-dom";

import Records from "./components/Records";
import AddRecord from "./components/AddRecord";
import Login from "./components/Login";

const App = () =>{
    return (
      <div>
        <Routes>
          <Route path="/records" element={<Records />}></Route>
          <Route path="/add-record" element={<AddRecord/>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </div>
    );
};

export default App;
