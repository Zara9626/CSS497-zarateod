import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import HomeIcon from "@mui/icons-material/Home";
import { useParams } from "react-router";
import EditIcon from "@mui/icons-material/Edit";

function ResidentRep() {
  const [resList, setResList] = useState([]);

  const { propertyId } = useParams();

  useEffect(() => {
    getResById();
    // eslint-disable-next-line
  }, []);

  const getResById = async () => {
    const response = await axios.get(
      `http://localhost:8080/resident/get/${propertyId}`
    );
    setResList(response.data);
  };

  return (
    <div>
      <h1>Resident </h1>
      <TableContainer component={Paper}>
        <Table style={{ width: 1600 }} size="small" aria-label="a dense table">
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
            </TableRow>
          </TableHead>
          <TableBody>
            {resList.map((data, id) => (
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
export default ResidentRep;
