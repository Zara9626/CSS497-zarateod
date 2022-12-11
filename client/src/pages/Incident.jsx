import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Link from '@mui/material/Link'
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';


function Incident() {
  const[incidentList,setIncidentList] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8080/incident`)
        .then((response) => {
            console.log(response.data)
            setIncidentList(response.data);
        })
}, []);
 
  return (
    <div>
        <h1> Incidents</h1>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead >
                <TableRow>
                    <TableCell align="left" >Incident date</TableCell>
                    <TableCell align="left" >Description</TableCell>
                    <TableCell align="left">Property address</TableCell>
                    <TableCell align="left" >Apartment #</TableCell>
                    <TableCell align="inherit" >Police report date</TableCell>
                    <TableCell align="justify" >Officer name </TableCell>
                    <TableCell align="left" >Police report</TableCell>
                    
                </TableRow>
            </TableHead>
            <TableBody>
            
                {incidentList.map((data,id) =>(
                    <TableRow key = {id} 
                    >
                        <TableCell component="th" scope="row">
                            {data.id}
                        </TableCell>
                        <TableCell align="left">{data.eventDate}</TableCell>
                        <TableCell align="left">{data.description}</TableCell>
                        <TableCell align="left">{data.adress}</TableCell>
                        <TableCell align="left">{data.apartmentNum}</TableCell>
                        <TableCell align="left">{data.reportDate}</TableCell>
                        <TableCell align="left">{data.officer}</TableCell>
                        <TableCell align="left">{data.reportDesc}</TableCell>
                        </TableRow>
                        ))}
            </TableBody>
        </Table>
        </TableContainer>
        <Box sx={{ '& button': { m: 8 } }}>
        <Box textAlign='center'>
         <Button variant="contained" size="large" startIcon={<AddCircleIcon/>}>
         <Link href="/AddIncident" color="inherit">
             Add new incident
        </Link>
        </Button>
        
        </Box>
        </Box>
    </div>
    
);
};
export default Incident;