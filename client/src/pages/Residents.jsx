import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import Link from '@mui/material/Link'
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function Residents() {

  const[residentList,setresidentList] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8080/resident`)
        .then((response) => {
            console.log(response.data)
            setresidentList(response.data);
        })
}, []);
 

  const setData = (data) => {
    let {id,first,last,ssn,phone,credit,prevAdress,employerContact,emergencyContact,income } = data;
    localStorage.setItem('ID',id);
    localStorage.setItem('First Name', first);
    localStorage.setItem('Last Name', last);
    localStorage.setItem('SSN number',ssn);
    localStorage.setItem('Phone Number',phone);
    localStorage.setItem('Credit score', credit);
    localStorage.setItem('Previous adress', prevAdress);
    localStorage.setItem('Employer contact number',employerContact);
    localStorage.setItem('Emergency contact number', emergencyContact);
    localStorage.setItem('Income', income );

}

const onDelete = async(id) => {
  axios.delete(`http://localhost:8080/deleteResident/${id}`)
};

  return (
    <div>
        <h1> Resident List</h1>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead >
                <TableRow>
                    <TableCell align="left" >First name</TableCell>
                    <TableCell align="left" >Last Name</TableCell>
                    <TableCell align="left">SSN</TableCell>
                    <TableCell align="left" >Phone</TableCell>
                    <TableCell align="left" >Credit score</TableCell>
                    <TableCell align="left" >Previous address</TableCell>
                    <TableCell align="left" >Employer contact</TableCell>
                    <TableCell align="left">Emergency Contact</TableCell>
                    <TableCell align="left" >Income per year</TableCell>
                    <TableCell align="left" >Actions</TableCell>
                    
                </TableRow>
            </TableHead>

            <TableBody>
                {residentList.map((data,id) => (
                    <TableRow key = {id} 
                    
                    >
                    <TableCell>{data.first}</TableCell>
                    <TableCell>{data.last}</TableCell>
                    <TableCell>{data.ssn}</TableCell>
                    <TableCell>{data.phone}</TableCell>
                    <TableCell>{data.credit}</TableCell>
                    <TableCell>{data.prevAdress}</TableCell>
                    <TableCell>{data.employerContact}</TableCell>
                    <TableCell>{data.emergencyContact}</TableCell>
                    <TableCell>{data.income}</TableCell>      
                    <TableCell> 
                        <Button variant="contained" size="large" startIcon={<EditIcon/>}>
                        <Link href="/UpdateResident" color="inherit">
                             Update
                        </Link>
                        </Button>
                    </TableCell>
                            <TableCell>
                                <Button onClick={() => onDelete(data.propertyId)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                       ))}
            </TableBody>
        </Table>
        </TableContainer>
        <Box sx={{ '& button': { m: 8 } }}>
        <Box textAlign='center'>
         <Button variant="contained" size="large" startIcon={<AddCircleIcon/>}>
         <Link href="/AddResident" color="inherit">
             Add new resident
        </Link>
        </Button>
        </Box>
        </Box>
    </div>
    );
};