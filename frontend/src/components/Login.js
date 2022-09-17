import { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import PeopleIcon from "@mui/icons-material/People";
import { AppBar } from "@mui/material";


import classes from "./index.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const url = "http://localhost:5000/admin";
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${url}/login`, {
        username: username,
        userpassword: userpassword,
      });
      if (response.status === 200) {
        navigate('/records')
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
              <PeopleIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Human Resource System Admin
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Typography
        sx={{ m: 2 }}
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Log in as admin
      </Typography>
      <p className={classes.err}>
        <i>
          <b>{errMsg}</b>
        </i>
      </p>
      <form noValidate autoComplete="off" onSubmit={loginUser}>
        <TextField
          required
          label="Admin Username"
          variant="outlined"
          className={classes.field}
          fullWidth
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          required
          variant="outlined"
          label="Admin Password"
          type="password"
          autoComplete="current-password"
          className={classes.field}
          fullWidth
          onChange={(e) => setUserpassword(e.target.value)}
        />
        <Button
          sx={{ m: 2, mt: 1, width: 320, height: 40 }}
          type="submit"
          variant="outlined"
          className={classes.btnColor}
        >
          Login as Admin
        </Button>
        <Typography
          variant="p"
          color="textSecondary"
          component="body2"
          gutterBottom
          fontSize="medium"
          display="block"
          sx={{ m: 2, mt: -1 }}
        ></Typography>
      </form>
    </Container>
  );
};

export default Login;
