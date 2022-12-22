import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import Link from "@mui/material/Link";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import EditIcon from "@mui/icons-material/Edit";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Residents() {
  const [residentList, setresidentList] = useState([]);
  useEffect(() => {
    getResident();
  }, []);

  const getResident = async () => {
    const response = await axios.get("http://localhost:8080/resident");
    console.log(response.data)
    setresidentList(response.data);
  };

  const onDelete = async (residentId) => {
    try {
      await axios.delete(`http://localhost:8080/resident/delete/${residentId}`);
      getResident();
    } catch (error) {
      console.log(error);
    }
  };

  function refresh(){
    window.location.reload(true);

  };

  return (
    <div>
      <h1> Residents list</h1>
      <TableContainer component={Paper}>
        <Table style={{ width: 1600 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">First name</TableCell>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">SSN</TableCell>
              <TableCell align="left">Phone</TableCell>
              <TableCell align="left">Credit score</TableCell>
              <TableCell align="left">Previous address</TableCell>
              <TableCell align="left">Employer contact</TableCell>
              <TableCell align="left">Emergency Contact</TableCell>
              <TableCell align="left">Income per year</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {residentList.map((data, id) => (
              <TableRow key={id}>
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
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<EditIcon />}
                  >
                    <Link href={`/UpdateResident/${data.residentId}`} color="inherit">
                      Update
                    </Link>
                  </Button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => 
                  {onDelete(data.residentId);
                    refresh();
                    }}
                    size="small"
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack
        mt={6}
        spacing={{ xs: 6, sm: 6, md: 20 }}
        direction="row"
        justifyContent="center"
      >
        <Button variant="contained" size="medium" startIcon={<HomeIcon />}>
          <Link href="/Property" color="inherit">
            Go to Properties
          </Link>
        </Button>
      </Stack>
    </div>
  );
}
