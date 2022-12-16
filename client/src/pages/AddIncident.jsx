import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Axios from 'axios';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

function AddIncident() {
    const [eventDate,setEvent] = useState('')
    const [description,setDesc] = useState('')
    const [officerName,setOfficer] = useState('')
    const [policeReportDate,setReportDate] = useState('')
    const [policeReportId,setReportId] = useState('')
    

    const navigate = useNavigate();

  const postData = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("http://localhost:8080/incident/insert", {
        eventDate,
        description,
        officerName,
        policeReportDate,
        policeReportId
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
        label="Event date"
        type="text"
        onChange={(e) => {
              setEvent(e.target.value);
          }}
        />
        <TextField
        label="Description"
        type="text"
        onChange={(e) => {
            setDesc(e.target.value);
        }}
        />
        <TextField
           label="Officer name "
           type="text"
           onChange={(e) => {
               setOfficer(e.target.value);
           }}
        />
        <TextField
           label="Report date"
           type="text"
           onChange={(e) => {
               setReportDate(e.target.value);
           }}
        />
        <TextField
           label="Report #"
           type="text"
           onChange={(e) => {
               setReportId(e.target.value);
           }}
        />
         
      </div>
        <Button onClick={postData}size="large" variant="contained">Submit</Button>
        <Box textAlign='center'>
         <Button variant="outlined" size="large" startIcon={<HomeIcon/>}>
         <Link to="/" color="inherit">
             Go back 
        </Link>
        </Button>
      </Box>
    </Box>
  );
}
export default AddIncident