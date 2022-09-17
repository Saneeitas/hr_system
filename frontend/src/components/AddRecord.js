import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import PeopleIcon from "@mui/icons-material/People";
import { Button, AppBar, Typography } from "@mui/material";
import classes from "./index.module.css";

const AddRecord = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [address, setAddress] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const url = "http://localhost:5000/";

  const saveRecord = async (e) => {
    e.preventDefault();
    const addRecord = await axios
      .post(`${url}records/add-record`, {
        fullname: fullname,
        email: email,
        phone_number: phone_number,
        address: address,
        position: position,
        salary: salary,
      })
      .then((res) => {
        const allRecords = res.data;
        console.log(allRecords);
      })
      .catch((error) => console.log(`Error: ${error}`));
    if (addRecord) {
      setSuccess("Product Added");
    } else {
      setErrMsg("Input required");
    }
    navigate("/records");
  };

  return (
    <Container fixed maxWidth="sm">
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
              Add New Worker Records
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <form onSubmit={saveRecord}>
        <TextField
          id="standard-basic"
          label="Fullname"
          size="small"
          className={classes.field}
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
          gutterBottom
          fullWidth
        />
        <TextField
          id="standard-basic"
          label="Email"
          size="small"
          className={classes.field}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <TextField
          id="standard-basic"
          label="Phone Number"
          size="small"
          className={classes.field}
          value={phone_number}
          onChange={(e) => setPhone_number(e.target.value)}
          required
          fullWidth
        />
        <TextField
          id="standard-basic"
          label="Address"
          size="small"
          className={classes.field}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          fullWidth
        />
        <TextField
          id="standard-basic"
          label="Position"
          size="small"
          className={classes.field}
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
          fullWidth
        />
        <TextField
          id="standard-basic"
          label="Salary"
          size="small"
          className={classes.field}
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
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
          Save
        </Button>
        <p>{success}</p>
      </form>
    </Container>
  );
};

export default AddRecord;
