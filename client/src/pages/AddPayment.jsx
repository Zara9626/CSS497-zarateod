import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Axios from "axios";
import { Link} from "react-router-dom";
import { useParams } from "react-router";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import { useState, useEffect } from "react";

function AddPayment() {
  const [amount, setAmount] = useState("");
  const [receiptNum, setReceipt] = useState("");
  const [paymentDate, setPayment] = useState("");

  const [proList, setProList] = useState([]);

  useEffect(() => {
    getProById();
    // eslint-disable-next-line
  }, []);

  let { propertyId } = useParams();

  const postPayment = async (e) => {
    e.preventDefault();
    try {
      await Axios.post(`http://localhost:8080/payment/post/${propertyId}`, {
        amount,
        receiptNum,
        paymentDate,
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
        <h1> Add new payment for :</h1>
        {proList.map((id) => (
          <span key={id}>
            {" "}
            Apartment : {id.apartmentNum} <br />
            Adress : {id.address} <br />
          </span>
        ))}
        <TextField
          label="Amount paid "
          type="text"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
        <TextField
          label="Receipt number "
          type="text"
          onChange={(e) => {
            setReceipt(e.target.value);
          }}
        />
        <TextField
          label="Payment date in YYYY-MM-DD"
          type="text"
          onChange={(e) => {
            setPayment(e.target.value);
          }}
        />
      </div>
      <Button onClick={postPayment} size="large" variant="contained">
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
export default AddPayment;
