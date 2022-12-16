import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import Stack from "@mui/material/Stack";


function AddProp() {
  const [apartmentNum,setnum] = useState('')
  const [address,setAdr] = useState('')
  const [bedrooms,setBed] = useState('')
  const [sqFeet,setSquare ] = useState('')
  const [rent,setRent] = useState('')
  const [leaseStart,setStart] = useState('')
  const [leaseEnd,setEnd] = useState('')

  const navigate = useNavigate();

  const saveAdd = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("http://localhost:8080/property/post", {
        apartmentNum,
        address,
        bedrooms,
        sqFeet,
        rent,
        leaseStart,
        leaseEnd
      });
      navigate("/EmptyProps",{replace:true});
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
        label="Apartment number"
        type="text"
        onChange={(e) => setnum(e.target.value)}
        
        />
        <TextField
        label="Address"
        type="text"
        onChange={(e) => setAdr(e.target.value)}
      
        />
        <TextField
           label="Bedrooms"
           type="text"
           onChange={(e) => setBed(e.target.value)}
        
        />
        <TextField
           label="Sq.Feet"
           type="text"
           onChange={(e) => setSquare(e.target.value)}
          
        />
        <TextField
           label="Rent amount"
           type="text"
           onChange={(e) => setRent(e.target.value)}
        
        />
        <TextField
           label="Lease start"
           type="text"
           onChange={(e) => setStart(e.target.value)}
        
        />
         <TextField
           label="Lease end"
           type="text"
           onChange={(e) => setEnd(e.target.value)}
          
        />
      
      <Button onClick={saveAdd} size="large" variant="outlined">
                Submit
            </Button>
            <Stack
        mt={6}
        spacing={{ xs: 6, sm: 6, md: 20 }}
        direction="row"
        justifyContent="center"
      >
         <Button variant="outlined" size="large" startIcon={<HomeIcon/>}>
         <Link to="/" color="inherit">
             Go back 
        </Link>
        </Button>
        </Stack>

    </div>
    </Box>
  );
  };

export default AddProp