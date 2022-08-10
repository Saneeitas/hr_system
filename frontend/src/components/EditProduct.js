import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField, Container, Typography } from "@mui/material";

import classes from "./index.module.css";

const EditProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const url = "http://localhost:5000/";

  const updateProduct = (e) => {
    try {
      e.preventDefault();
      axios.put(`${url}products/${id}`, {
        title: title,
        price: Number(price),
      });
    } catch (error) {
      console.log(error.message);
    }
    navigate("/products");
  };

  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = async () => {
    const response = await axios.get(`${url}products/${id}`);
    setTitle(response.data.title);
    setPrice(response.data.price);
  };

  return (
    <Container fixed maxWidth="sm">
      <form onSubmit={updateProduct}>
        <Typography
          sx={{ m: 2 }}
          variant="h6"
          color="textecondary"
          component="h4"
          gutterBottom
        >
          UPDATE PRODUCT
        </Typography>
        <TextField
          id="standard-basic"
          label="Product name"
          size="small"
          className={classes.field}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          id="standard-basic"
          label="Price"
          size="small"
          className={classes.field}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          type="submit"
          className={classes.btnColor}
          fullWidth
        >
          Update
        </Button>
      </form>
    </Container>
  );
};

export default EditProduct;
