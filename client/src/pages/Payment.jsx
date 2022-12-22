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
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import HomeIcon from "@mui/icons-material/Home";

export default function Payment() {
  const [paymentList, setPaymentList] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8080/payment`).then((response) => {
      console.log(response.data);
      setPaymentList(response.data);
    });
  }, []);

  return (
    <div>
      <h1> Payment Records</h1>
      <TableContainer component={Paper}>
        <Table style={{ width: 1200 }} aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Apartment number</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">Amount</TableCell>
              <TableCell align="left">Receipt number</TableCell>
              <TableCell align="left">Payment date</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paymentList.map((data, id) => (
              <TableRow key={id}>
                <TableCell>{data.apartmentNum}</TableCell>
                <TableCell>{data.address}</TableCell>
                <TableCell>{data.amount}</TableCell>
                <TableCell>{data.receiptNum}</TableCell>
                <TableCell>{data.paymentDate}</TableCell>
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
