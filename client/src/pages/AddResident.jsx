import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import axios from "axios";
import React, { useState } from "react";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useParams } from "react-router";
import { useNavigate } from "react-router-dom";

function AddResident() {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [ssn, setSsn] = useState("");
  const [phone, setPho] = useState("");
  const [credit, setCredit] = useState("");
  const [prevAdress, setPrev] = useState("");
  const [emp, setEmp] = useState("");
  const [emer, setEmer] = useState("");
  const [income, setIncome] = useState("");

  // const {propertyId} = useParams();
  let { id } = useParams();

  const navigate = useNavigate();

  console.log("AddResident - propertyId:", id);

  const postResident = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/resident/post/${propertyId}', {
        first,
        last,
        ssn,
        phone,
        credit,
        prevAdress,
        emp,
        emer,
        income,
      });
      navigate("/");
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
        <TextField
          label="Resident first name"
          type="text"
          onChange={(e) => {
            setFirst(e.target.value);
          }}
        />
        <TextField
          label="Resident Last name"
          type="text"
          onChange={(e) => {
            setLast(e.target.value);
          }}
        />
        <TextField
          label="SSN"
          type="text"
          onChange={(e) => {
            setSsn(e.target.value);
          }}
        />
        <TextField
          label="Phone number"
          type="text"
          onChange={(e) => {
            setPho(e.target.value);
          }}
        />
        <TextField
          label="Credit score"
          type="text"
          onChange={(e) => {
            setCredit(e.target.value);
          }}
        />
        <TextField
          label="Previous address"
          type="text"
          onChange={(e) => {
            setPrev(e.target.value);
          }}
        />
        <TextField
          label="Employer contact"
          type="text"
          onChange={(e) => {
            setEmp(e.target.value);
          }}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Emergency contact"
          type="text"
          onChange={(e) => {
            setEmer(e.target.value);
          }}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Yearly income"
          type="text"
          onChange={(e) => {
            setIncome(e.target.value);
          }}
          />
      </div>

      <Button
          onClick={postResident}
          size="small" variant="contained"
          startIcon={<AddCircleIcon/>}
        >
          Submit
        </Button>
    </Box>
  );
}
export default AddResident;
