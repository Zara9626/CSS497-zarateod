import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Axios from "axios";
import HomeIcon from "@mui/icons-material/Home";
import { Link} from "react-router-dom";
import Button from "@mui/material/Button";
import { useParams } from "react-router";
import { useState, useEffect } from "react";

function AddLease() {
  const [leaseStart, setStart] = useState("");
  const [leaseEnd, setEnd] = useState("");
  const [rent, setRent] = useState("");
  
  const [proList, setProList] = useState([]);
  const { propertyId } = useParams();


  useEffect(() => {
    getProById();
    // eslint-disable-next-line
  }, []);

  const postLease = async (e) => {
    e.preventDefault();
    try {
      await Axios.post(`http://localhost:8080/lease/post/${propertyId}`, {
          leaseStart,
          leaseEnd,
          rent
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getProById = async () => {
    const response = await Axios.get(
      `http://localhost:8080/property/get/${propertyId}`
    );
    setProList(response.data);
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
        <h1> Add new lease for :</h1>
        {proList.map((id) => (
          <span key={id}>
            {" "}
            Apartment : {id.apartmentNum} <br />
            Adress : {id.address} <br />
          </span>
        ))}
        <TextField
          label="Lease start in YYYY-MM-DD"
          type="text"
          onChange={(e) => {
            setStart(e.target.value);
          }}
        />
        <TextField
          label="Lease end in YYYY-MM-DD"
          type="text"
          onChange={(e) => {
            setEnd(e.target.value);
          }}
        />
        <TextField
          label="Rent amount "
          type="text"
          onChange={(e) => {
            setRent(e.target.value);
          }}
        />
      </div>
      <Button onClick={postLease} size="large" variant="contained">
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
export default AddLease;
