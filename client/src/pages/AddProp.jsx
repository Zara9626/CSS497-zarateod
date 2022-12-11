import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Axios from 'axios';

function AddProp() {
    const [apartment_num,setnum] = useState('')
    const [address,setAdr] = useState('')
    const [bedrooms,setBed] = useState('')
    const [sq_feet,setSquare ] = useState('')
    const [monthly_rent,setRent] = useState('')
    const [leaseStart,setStart] = useState('')
    const [leaseEnd,setEnd] = useState('')
    const [damage,setDamage] = useState('')

    
    const postData = () => {
        Axios.post('http://localhost:8080/property/insert', {
        apartment_num:apartment_num,
        address:address,
        bedrooms:bedrooms,
        square_feet:sq_feet,
        monthly_rent:monthly_rent,
        leaseStart:leaseStart,
        leaseEnd:leaseEnd,
        damage:damage
    })
}


/*const handleSubmit = event =>{
    event.preventDefault();
    alert("Added succesfully");
};*/
 
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
        onChange={(e) => {
              setnum(e.target.value);
          }}
        />
        <TextField
        label="Address"
        type="text"
        onChange={(e) => {
            setAdr(e.target.value);
        }}
        />
        <TextField
           label="Bedrooms"
           type="text"
           onChange={(e) => {
               setBed(e.target.value);
           }}
        />
        <TextField
           label="Sq.Feet"
           type="text"
           onChange={(e) => {
               setSquare(e.target.value);
           }}
        />
        <TextField
           label="Rent amount"
           type="text"
           onChange={(e) => {
               setRent(e.target.value);
           }}
        />
        <TextField
           label="Lease start"
           type="text"
           onChange={(e) => {
               setStart(e.target.value);
           }}
        />
         <TextField
           label="Lease end"
           type="text"
           onChange={(e) => {
               setEnd(e.target.value);
           }}
        />
        <TextField
           id="outlined-multiline-flexible"
           label="Damages"
           type="text"
           onChange={(e) => {
               setDamage(e.target.value);
           }}
        />
         
      </div>
        <button onClick={postData}>Submit</button>
    </Box>
  );
}
export default AddProp