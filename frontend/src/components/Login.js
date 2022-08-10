import { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";


import classes from "./index.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const url = "http://localhost:5000/users";
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${url}/login`, {
        email: username,
        userpassword: userpassword,
      });
      if (response.status === 200) {
        navigate('/products')
        console.log("Login successfully")
      }
    } catch (err) {
       if (err.response?.status === 400) {
         console.log("Invalid output");
         setErrMsg("*Invalid input")
       } else if (err.response?.status === 401) {
         console.log("Incorrect credentials");
         setErrMsg("*Incorrect credentials");
       } else {
         console.log("Login failed")
         setErrMsg("Login failed");
       }
      
    }
    
  };

  return (
    <Container
      fixed
      maxWidth="sm"
      sx={{
        "& .MuiTextField-root": { m: 2, width: "40ch" },
      }}
    >
      <Typography
        sx={{ m: 2 }}
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Log in your account
      </Typography>
      <p className={classes.err}>
        <i>
          <b>{errMsg}</b>
        </i>
      </p>
      <form noValidate autoComplete="off" onSubmit={loginUser}>
        <TextField
          required
          label="Email address"
          className={classes.field}
          fullWidth
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          required
          label="Password"
          type="password"
          autoComplete="current-password"
          className={classes.field}
          fullWidth
          onChange={(e) => setUserpassword(e.target.value)}
        />
        <Button
          sx={{ m: 2, mt: 1, width: 320, height: 40 }}
          type="submit"
          variant="contained"
          className={classes.btnColor}
        >
          Login
        </Button>
        <Typography
          variant="p"
          color="textSecondary"
          component="body2"
          gutterBottom
          fontSize="medium"
          display="block"
          sx={{ m: 2, mt: -1 }}
        >
          <i>
            <b>You don't have an account?</b>
          </i>{" "}
          <Link href="./Register" underline="always" fontSize="medium">
            Sign up
          </Link>
        </Typography>
      </form>
    </Container>
  );
};

export default Login;
