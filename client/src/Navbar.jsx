
import { autocompleteClasses } from "@mui/material";
import React from "react";
import {BrowserRouter, Route , Link} from "react-router-dom";
import './App.css';

function Navbar () {
    return (
        
        <nav> 
            <ul>
                <li>
                    <Link to= "/">Dashboard</Link>
                </li>
                <li>
                    <Link to= "/Residents">Residents</Link>
                </li>
                <li>
                    <Link to= "/AddNew"> Add new properties</Link>

                </li>
                <li>
                    <Link to= "/Contractors">Contractors</Link>

                </li>
                <li>
                    <Link to= "/Incidents">Incidents</Link>

                </li>
                <li>
                    <Link to= "/Police">Police reports</Link>

                </li>
                <li>
                    <Link to= "/SignIn">Log out</Link>

                </li>
            </ul>
        </nav>
        
    );
}

export default Navbar;