import { useState } from "react";
import axios from "axios";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";

import classes from "./index.module.css";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");
  const url = "http://localhost:5000/users";

  const createUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${url}/create`, {
        fullname: fullname,
        email: email,
        userpassword: userpassword,
      });
      if (response.status === 201 || response.status === 200) {
        console.log("Account created");
        setSuccess("Account created Kindly login..");
      }
      setFullname("");
      setEmail("");
      setUserpassword("");
    } catch (err) {
      if (err.response?.status === 400) {
        console.log("Invalid output");
        setErrMsg("*Invalid input");
      } else if (err.response?.status === 401) {
        setErrMsg("*User exists");
      } else {
        console.log("Registration failed");
        setErrMsg("Registration failed");
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
        Create Your Account
      </Typography>
      <p className={classes.err}>
        <b>
          <i>{errMsg}</i>
        </b>
      </p>
      <form noValidate autoComplete="off" onSubmit={createUser}>
        <TextField
          require
          label="Fullname"
          className={classes.field}
          fullWidth
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <TextField
          required
          label="Email address"
          className={classes.field}
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          label="Password"
          type="password"
          className={classes.field}
          fullWidth
          value={userpassword}
          onChange={(e) => setUserpassword(e.target.value)}
        />
        <Button
          sx={{ m: 2, mt: -1, width: 325, height: 40 }}
          type="submit"
          variant="contained"
          className={classes.btnColor}
        >
          Create account
        </Button>
        <p>{success}</p>
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
            <b>Already have an account?</b>
          </i>{" "}
          <Link href="./login" underline="always" fontSize="medium">
            Login
          </Link>
        </Typography>
      </form>
    </Container>
  );
};

export default Register;
