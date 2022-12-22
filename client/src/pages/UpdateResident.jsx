import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const UpdateResident = () => {
  const [phone, setPhone] = useState("");
  const [employerContact, setEmp] = useState("");
  const [emergencyContact, setEmer] = useState("");
  const [income, setIncome] = useState("");

  let { residentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getResidentById();
  }, []);
  const updateResident = async (e) => {
    try {
      await axios.put(`http://localhost:8080/resident/put/${residentId}`, {
        phone,
        employerContact,
        emergencyContact,
        income,
      });
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

  function refresh() {
    window.location.reload(true);
  }

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
        <h1> Update resident data</h1>
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
          onClick={() => {
            updateResident();
            navigate("/Residents");
            refresh();
          }}
          size="large"
          variant="contained"
        >
          Update
        </Button>
        <Box textAlign="center">
          <Button variant="outlined" size="large" startIcon={<HomeIcon />}>
            <Link to="/" color="inherit">
              Go back
            </Link>
          </Button>
        </Box>
      </div>
    </Box>
  );
};

export default UpdateResident;
