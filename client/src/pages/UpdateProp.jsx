import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useNavigate } from "react-router-dom";

const UpdateProp = () => {
  const [rent, setRent] = useState("");
  const [leaseStart, setStart] = useState("");
  const [leaseEnd, setEnd] = useState("");
  const [damage, setDamage] = useState("");

  const { propertyId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getPropById();
  }, []);
  const updateData = async (e) => {
    e.preventDefault();
    try {
      console.log("updateData", propertyId);
      await axios.patch('http://localhost:8080/property/put/${propertyId}', {
        rent,
        leaseStart,
        leaseEnd,
        damage,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const getPropById = async (propertyId) => {
    const response = await axios.get(
      'http://localhost:8080/property/put/${propertyId}'
    );
    setRent(response.data.rent);
    setEnd(response.data.leaseEnd);
    setDamage(response.data.damage);
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
          label="Rent"
          onChange={(e) => {
            setRent(e.target.value);
          }}
        />
        <TextField
          label="Lease start"
          onChange={(e) => {
            setStart(e.target.value);
          }}
        />
      </div>
      <div>
        <TextField
          label="Lease end"
          onChange={(e) => {
            setEnd(e.target.value);
          }}
        />
        <TextField
          label="Damage description"
          onChange={(e) => {
            setDamage(e.target.value);
          }}
        />

        <Button
          onClick={() => updateData()}
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

export default UpdateProp;
