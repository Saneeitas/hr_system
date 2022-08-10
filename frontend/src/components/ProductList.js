import { useState, useEffect } from "react";
import axios from "axios";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, AppBar,Typography } from "@mui/material";

import classes from "./index.module.css"

const ProductList = () => {
  //get data from API
  const [products, getProducts] = useState([]);
   const navigate = useNavigate();
  const url = "http://localhost:5000";

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    axios.get(`${url}/products`)
      .then((response) => {
        const allProducts = response.data;
        //add data to our state
        getProducts(allProducts)
        
      })
      .catch(error => console.log(`Error: ${error}`));
   
  };

  const deleteProduct = (id) => {
    axios
      .delete(`${url}/products/${id}`)
      .then((response) => {
        getAllProducts();
      })
      .catch((error) => console.log(`Error: ${error}`));
      
  };

  const logout = () => {
    navigate("/login");
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Product Record Keeper
            </Typography>
            <Button color="error" onClick={() => logout()}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Link className={classes.btn} to="/add-product">
        <Typography variant="h6" component="body2" sx={{ flexGrow: 1 }}>
          New Product
        </Typography>
      </Link>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 250 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="left">Product Name</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow
                key={product.id}
                sx={{ "&:last-child td, &:last-child th": { border: -1 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{product.title}</TableCell>
                <TableCell align="left">N {product.price}</TableCell>
                <TableCell align="left">{product.createdAT}</TableCell>
                <TableCell align="left">
                  <Link className={classes.link} to={`/edit/${product.id}`}>
                    Edit
                  </Link>{" "}
                  {"  "}
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductList;
