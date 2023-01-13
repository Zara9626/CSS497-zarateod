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

  const [proList, setProList] = useState([]);

  let { propertyId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getPropById();
    getProById();
    // eslint-disable-next-line
  }, []);

  const updateData = async (e) => {
    try {
      await axios.put(`http://localhost:8080/property/put/${propertyId}`, {
        rent,
        leaseStart,
        leaseEnd,
        damage,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getPropById = async (propertyId) => {
    const response = await axios.get(
      `http://localhost:8080/property/put/${propertyId}`
    );
    setRent(response.data.rent);
    setEnd(response.data.leaseEnd);
    setDamage(response.data.damage);
  };

  function refresh() {
    window.location.reload(true);
  }
  const getProById = async () => {
    const response = await axios.get(
      `http://localhost:8080/property/get/${propertyId}`
    );
    setProList(response.data);
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
        <h1> Update property details for :</h1>
        {proList.map((id) => (
          <span key={id}>
            {" "}
            Apartment : {id.apartmentNum} <br />
            Adress : {id.address} <br />
          </span>
        ))}
        <TextField
          label="Rent"
          onChange={(e) => {
            setRent(e.target.value);
          }}
        />
        <TextField
          label="Lease start in YYYY-MM-DD"
          onChange={(e) => {
            setStart(e.target.value);
          }}
        />
      </div>
      <div>
        <TextField
          label="Lease end in YYYY-MM-DD"
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
          onClick={() => {
            updateData();
            navigate("/Property");
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

export default UpdateProp;
