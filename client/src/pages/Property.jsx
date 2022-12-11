
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


function Property() {
  const[propertyList,setPropertyList] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8080/property/get`)
        .then((response) => {
            console.log(response.data)
            setPropertyList(response.data);
        })
}, []);
 

const onDelete = async(id) => {
  axios.delete(`http://localhost:8080/api/delete/${id}`)
  
};

  return (
    <div>
        <h1> List of properties</h1>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead >
                <TableRow>
                    <TableCell align="left" >Apartment Number</TableCell>
                    <TableCell align="left" >Address</TableCell>
                    <TableCell align="left">Bedrooms</TableCell>
                    <TableCell align="left" >Sq.Feet</TableCell>
                    <TableCell align="inherit" >Rent</TableCell>
                    <TableCell align="justify" >Lease start</TableCell>
                    <TableCell align="left" >Lease end</TableCell>
                    <TableCell align="left">Damage</TableCell>
                    <TableCell align="left" >Resident first name</TableCell>
                    <TableCell align="left" >Resident last Name</TableCell>
                    
                </TableRow>
            </TableHead>
            <TableBody>
            
                {propertyList.map((data,id) =>(
                    <TableRow key = {id} 
                    
                    >
                        <TableCell component="th" scope="row">
                            {data.id}
                        </TableCell>
                        <TableCell align="left">{data.apartmentNum}</TableCell>
                        <TableCell align="left">{data.address}</TableCell>
                        <TableCell align="left">{data.bedrooms}</TableCell>
                        <TableCell align="left">{data.sqFeet}</TableCell>
                        <TableCell align="left">{data.rent}</TableCell>
                        <TableCell align="left">{data.leaseStart}</TableCell>
                        <TableCell align="left">{data.leaseEnd}</TableCell>
                        <TableCell align="left">{data.damage}</TableCell>
                        <TableCell align="left">{data.first}</TableCell>
                        <TableCell align="left">{data.last}</TableCell>

                        <TableCell>
                        <Button variant="contained" size="large" startIcon={<EditIcon/>}>
                        <Link href="/Update" color="inherit">
                             Update
                        </Link>
                        </Button>
                        </TableCell>
                        <TableCell>
                            <Button size="small" startIcon={<DeleteIcon/>}>
                                <Button onClick={() => onDelete(data.propertyId)}></Button>
                                </Button>
                        </TableCell>
                            
                        </TableRow>
                        ))}
            </TableBody>
        </Table>
        </TableContainer>
        <Box sx={{ '& button': { m: 8 } }}>
        <Box textAlign='center'>
         <Button variant="contained" size="large" startIcon={<AddCircleIcon/>}>
         <Link href="/AddProp" color="inherit">
             Add new property
        </Link>
        </Button>
        
        </Box>
        </Box>
    </div>
    
);
};
export default Property;