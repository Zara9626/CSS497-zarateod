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
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const [paymentList, setPaymentList] = useState([]);
  const { propertyId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPayById();
  }, []);
  const getPayById = async () => {
    const response = await axios.get(
      `http://localhost:8080/payment/get/${propertyId}`
    );
    setPaymentList(response.data);
  };

  return (
    <div>
      <h1> Payment Records</h1>
      <TableContainer component={Paper}>
        <Table style={{ width: 1200 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Amount</TableCell>
              <TableCell align="left">Receipt number</TableCell>
              <TableCell align="left">Payment date</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paymentList.map((data, id) => (
              <TableRow key={id}>
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
