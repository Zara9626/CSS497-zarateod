import { useParams } from "react-router";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";

function AddMaintenance() {
  const [mainDate, setDate] = useState("");
  const [description, setDesc] = useState("");
  const [charge, setCharge] = useState("");
  const [contractorName, setContractorName] = useState("");

  let { incidentId } = useParams();

  const postMain = async (e) => {
    e.preventDefault();
    try {
      await Axios.post(`http://localhost:8080/maintenance/post/${incidentId}`, {
        mainDate,
        description,
        charge,
        contractorName,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "50ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <h1> Add new maintenance </h1>
        <TextField
          label="Date of Maintenance YYYY-MM-DD"
          type="text"
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <TextField
          label="Description of work "
          type="text"
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
        <TextField
          label="Charge in $$"
          type="text"
          onChange={(e) => {
            setCharge(e.target.value);
          }}
        />
        <TextField
          label="Contractor name"
          type="text"
          onChange={(e) => {
            setContractorName(e.target.value);
          }}
        />
      </div>
      <Button onClick={postMain}
      size="large" variant="contained">
        Submit
      </Button>
      <Box textAlign="center">
        <Button variant="outlined" size="large" startIcon={<HomeIcon />}>
          <Link to="/" color="inherit">
            Go back
          </Link>
        </Button>
      </Box>
    </Box>
  );
}
export default AddMaintenance;
