import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Container, TextField, Typography } from "@mui/material";
import classes from "./index.module.css";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const url = "http://localhost:5000/";

  const saveProduct = async (e) => {
    e.preventDefault();
    const addProduct = await axios
      .post(`${url}products`, {
        title: title,
        price: price,
      })
      .then((res) => {
        const allProducts = res.data;
        console.log(allProducts);
      })
      .catch((error) => console.log(`Error: ${error}`));
    setPrice("");
    setTitle("");
    if (addProduct) {
      setSuccess("Product Added");
    } else {
      setErrMsg("Input required");
    }
    navigate("/products");
  };

  return (
    <Container fixed maxWidth="sm">
      <form onSubmit={saveProduct}>
        <Typography
          sx={{ m: 2 }}
          variant="h6"
          color="textecondary"
          component="h4"
        >
          ADD NEW PRODUCTS
        </Typography>
        <TextField
          id="standard-basic"
          label="Product name"
          size="small"
          className={classes.field}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          gutterBottom
          fullWidth
        />
        <TextField
          id="standard-basic"
          label="Price"
          size="small"
          className={classes.field}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          fullWidth
        />
        <p>{errMsg}</p>
        <Button
          variant="contained"
          type="submit"
          className={classes.btnColor}
          fullWidth
        >
          Add
        </Button>
        <p>{success}</p>
      </form>
    </Container>
  );
};

export default AddProduct;
