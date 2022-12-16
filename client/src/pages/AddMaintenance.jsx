
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Axios from 'axios';
import { Link, useNavigate } from "react-router-dom";


function AddMaintenance() {
    const [mainDate,setDate] = useState('')
    const [description,setDesc] = useState('')
    const [charge,setCharge] = useState('')
    const [contractorName,setContractorName ] = useState('')


  const navigate = useNavigate();

  const postMain = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("http://localhost:8080/maintenance/insert", {
        mainDate,
        description,
        charge,
        contractorName,
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
        label="Date of Maintenance"
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
        <button onClick={postMain}>Submit</button>
    </Box>
  );
}
export default AddMaintenance