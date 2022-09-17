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
import PeopleIcon from "@mui/icons-material/People";
import { Button, AppBar,Typography } from "@mui/material";

import classes from "./index.module.css"

const Records = () => {
  //get data from API
  const [records, getRecords] = useState([]);
   const navigate = useNavigate();
  const url = "http://localhost:5000";

  useEffect(() => {
    getAllRecords();
  }, []);

  const getAllRecords = () => {
    axios.get(`${url}/records/allrecords`)
      .then((response) => {
        const allRecords = response.data;
        //add data to our state
        getRecords(allRecords)
        
      })
      .catch(error => console.log(`Error: ${error}`));
   
  };

  const deleteRecord = (id) => {
    axios
      .delete(`${url}/records/delete/${id}`)
      .then((response) => {
        getAllRecords();
      })
      .catch((error) => console.log(`Error: ${error}`));
      
  };

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
              <PeopleIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Human Resources System
            </Typography>
            <Link className={classes.btn} to="/add-record">
              <Typography variant="h6" component="body2" sx={{ flexGrow: 1 }}>
                Add Record
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 250 }} aria-label="simple table">
          <TableHead className={classes.appbar}>
            <TableRow>
              <TableCell>S/N</TableCell>
              <TableCell align="left">FULL NAME</TableCell>
              <TableCell align="left">EMAIL</TableCell>
              <TableCell align="left">PHONE NUMBER</TableCell>
              <TableCell align="left">ADDRESS</TableCell>
              <TableCell align="left">POSITION</TableCell>
              <TableCell align="left">SALARY</TableCell>
              <TableCell align="left">DELETE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record, index) => (
              <TableRow
                key={record.id}
                sx={{ "&:last-child td, &:last-child th": { border: -1 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{record.fullname}</TableCell>
                <TableCell align="left">{record.email}</TableCell>
                <TableCell align="left">{record.phone_number}</TableCell>
                <TableCell align="left">{record.address}</TableCell>
                <TableCell align="left">{record.position}</TableCell>
                <TableCell align="left">{record.salary} Naira</TableCell>
                <TableCell align="left">
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => deleteRecord(record.id)}
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

export default Records;
