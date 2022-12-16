import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const UpdateResident = () => {
  const [phone, setPhone] = useState("");
  const [employerContact, setEmp] = useState("");
  const [emergencyContact, setEmer] = useState("");
  const [income, setIncome] = useState("");
  const { residentId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getResidentById();
  }, []);
  const updateResident = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:8080/property/put/${residentId}`, {
        phone,
        employerContact,
        emergencyContact,
        income,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const getResidentById = async (residentId) => {
    const response = await axios.get(
      `http://localhost:8080/resident/put/${residentId}`
    );
    setPhone(response.data.phone);
    setEmp(response.data.employerContact);
    setEmer(response.data.emergencyContact);
    setIncome(response.data.setIncome);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          label="Phone number"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <TextField
          label="Employer"
          onChange={(e) => {
            setEmp(e.target.value);
          }}
        />
      </div>
      <div>
        <TextField
          label="Emergency contact"
          onChange={(e) => {
            setEmer(e.target.value);
          }}
        />
        <TextField
          label="Income"
          onChange={(e) => {
            setIncome(e.target.value);
          }}
        />

        <Button
          onClick={() => updateResident()}
          size="large"
          variant="contained"
        >
          Update
        </Button>
      </div>
    </Box>
  );
};

export default UpdateResident;
