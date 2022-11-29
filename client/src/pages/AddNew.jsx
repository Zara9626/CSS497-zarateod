import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'



function AddNew() {
    const [firstName,setfirstName] = useState('');
    const [lastName,setlastName] = useState('');
    const [apartmentNum] = useState('');
    const [adress] = useState('');
    const [bedrooms] = useState('');
    const [squareFeet ] = useState('');
    const [rentAmount] = useState('');

    const postData = () => {
        console.log(firstName);  //// sent post request to'http://localhost:3000/properties'
        console.log(lastName);
        console.log(apartmentNum);
        console.log(adress);
        console.log(bedrooms);
        console.log(squareFeet);
        console.log(rentAmount);

    }
    return (
        <div>
    <Form className = "create-form">
        <Form.Field>
            <label>First Name</label>
            <input placeholder='First Name' on change= {(e)=>setfirstName(e.target.value)}/>
        </Form.Field>
        <Form.Field>
            <label>Last Name</label>
            <input placeholder='Last Name' on change = {(e)=> setlastName(e.target.value)}/>
        </Form.Field>
        <Form.Field>
            <label>Apartment Number</label>
            <input placeholder='Number' />
        </Form.Field>
        <Form.Field>
            <label>Adress</label>
            <input placeholder='Adress' />
        </Form.Field>
        <Form.Field>
            <label>Bedrooms</label>
            <input placeholder='Bedrooms' />
        </Form.Field>
        <Form.Field>
            <label>Square feet </label>
            <input placeholder='Sq feet ' />
        </Form.Field>
        <Form.Field>
            <label>Rent amount </label>
            <input placeholder='Amount in $$' />
        </Form.Field>
        <Form.Field>
            <label>Move out date</label>
            <input placeholder='Move in-move out dates' />
        </Form.Field>
        
        <Button type='submit'>Submit</Button>
    </Form>
    </div>
);
}

export default AddNew;
