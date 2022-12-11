import React, { useState} from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Axios from 'axios';
import DropdownEx from "./Dropdown/DropdownEx";

function AddResident() {
    const [first,setFirst] = useState('')
    const [last,setLast] = useState('')
    const [ssn,setSsn] = useState('')
    const [phone,setPho] = useState('')
    const [credit,setCredit] = useState('')
    const [prevAdress,setPrev ] = useState('')
    const [emp,setEmp] = useState('')
    const [emer,setEmer] = useState('')
    const [income,setIncome] = useState('')

  
    const postResident = () => {
        Axios.post('http://localhost:8080/addresident', {
        first:first,
        last:last,
        ssn:ssn,
        phone:phone,
        credit:credit,
        prevAdress:prevAdress,
        emp:emp,
        emer: emer,
        income:income
    })
}

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
      label="Resident first name"
      type="text"
      onChange={(e) => {
            setFirst(e.target.value);
        }}
      />
      <TextField
      label="Resident Last name"
      type="text"
      onChange={(e) => {
          setLast(e.target.value);
      }}
      />
      <TextField
         label="SSN"
         type="text"
         onChange={(e) => {
             setSsn(e.target.value);
         }}
      />
      <TextField
         label="Phone number"
         type="text"
         onChange={(e) => {
             setPho(e.target.value);
         }}
      />
      <TextField
         label="Credit score"
         type="text"
         onChange={(e) => {
             setCredit(e.target.value);
         }}
      />
      <TextField
         label="Previous address"
         type="text"
         onChange={(e) => {
             setPrev(e.target.value);
         }}
      />
       <TextField
         label="Employer contact"
         type="text"
         onChange={(e) => {
             setEmp(e.target.value);
         }}
      />
      <TextField
         id="outlined-multiline-flexible"
         label="Emergency contact"
         type="text"
         onChange={(e) => {
             setEmer(e.target.value);
         }}
      />
      <TextField
         id="outlined-multiline-flexible"
         label="Yearly income"
         type="text"
         onChange={(e) => {
             setIncome(e.target.value);
         }}
        />
        </div>
        <div>
        <DropdownEx />{" "}
      </div>
      <button onClick={postResident}>Submit</button>
      </Box>
  );

}
export default AddResident