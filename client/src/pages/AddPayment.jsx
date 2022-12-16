import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function AddPayment() {
    const [amount,setAmount] = useState('')
    const [receiptNum,setReceipt] = useState('')
    const [paymentDate,setPayment] = useState('')


  const navigate = useNavigate();

  const postPayment = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("http://localhost:8080/payment/insert", {
        amount,
        receiptNum,
        paymentDate
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
        '& .MuiTextField-root': { m: 1, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
        label="Amount paid "
        type="text"
        onChange={(e) => {
              setAmount(e.target.value);
          }}
        />
        <TextField
        label="Receipt date "
        type="text"
        onChange={(e) => {
            setReceipt(e.target.value);
        }}
        />
        <TextField
           label="Payment date"
           type="text"
           onChange={(e) => {
               setPayment(e.target.value);
           }}
        />
       
      </div>
        <button onClick={postPayment}>Submit</button>
    </Box>
  );
}
export default AddPayment