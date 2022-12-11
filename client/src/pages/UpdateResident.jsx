import { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const Update = () => {
    
    const [apartmentNum,setnum] = useState('')
    const [address,setAdr] = useState('')
    const [bedrooms,setBed] = useState('')
    const [sqFeet,setSquare ] = useState('')
    const [rent,setRent] = useState('')
    const [leaseStart,setStart] = useState('')
    const [leaseEnd,setEnd] = useState('')
    const [damage, setDamage] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        setnum(localStorage.getItem('Apartment number'));
        setAdr(localStorage.getItem('Adress'));
        setBed(localStorage.getItem('Bedrooms'));
        setSquare(localStorage.getItem('Sq.Feet'));
        setRent(localStorage.getItem('Rent'));
        setStart(localStorage.getItem('Lease start'));
        setEnd(localStorage.getItem('Lease end'));
        setDamage(localStorage.getItem('Damage description'));
       
        
    }, []);

    const updateData = (id) => {
        axios.put(`http://localhost:8080/property/get/${id}`,{
            apartmentNum,
            address,
            bedrooms,
            sqFeet,
            rent,
            leaseStart,leaseEnd,
            damage
        }).then(() => {
            navigate.push('/Property')
        })
    }
    
    return (
        <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
        <TextField
          id="outlined-required"
          label="Apartment number"
          onChange={(e) =>{
              setnum(e.target.value);
          }}
        />
        <TextField
          id="outlined-required"
          label="Address"
          onChange={(e) =>{
              setAdr(e.target.value);
          }}
        />
        </div>
        <div>
        <TextField
          id="outlined-required"
          label="Bedrooms"
          onChange={(e) =>{
              setBed(e.target.value);
          }}
        />
        <TextField
          id="outlined-required"
          label="Sq.feet"
          onChange={(e) =>{
              setSquare(e.target.value);
          }}
          />
        </div>
        <div>
        <TextField
          id="outlined-required"
          label="Rent"
          onChange={(e) =>{
              setRent(e.target.value);
          }}
          
        />
        <TextField
          id="outlined-required"
          label="Lease start"
          onChange={(e) =>{
              setStart(e.target.value);
          }}
          
        />
        </div>
        <div>
        <TextField
          id="outlined-required"
          label="Lease end"
          onChange={(e) =>{
              setEnd(e.target.value);
          }}
          
        />
        <TextField
          id="outlined-required"
          label="Damage description"
          onChange={(e) =>{
              setDamage(e.target.value);
          }}
          
        />
                
        <button onClick={updateData}>Update</button>
            
        </div>
        </Box>
    )
};
 
export default Update