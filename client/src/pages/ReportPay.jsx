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

export default function Payment() {
  const [paymentList, setPaymentList] = useState([]);
  const { propertyId } = useParams();
  const [list, setList] = useState([]);
  const [total, setTotal] = useState([]);

  useEffect(() => {
    getPayById();
    getList();
    getTotal();
    // eslint-disable-next-line
  }, []);
  const getPayById = async () => {
    const response = await axios.get(
      `http://localhost:8080/payment/get/${propertyId}`
    );
    setPaymentList(response.data);
  };
  const getList = async () => {
    const response = await axios.get(
      `http://localhost:8080/property/get/${propertyId}`
    );
    setList(response.data);
  };
  const getTotal = async () => {
    const response = await axios.get(
      `http://localhost:8080/payment/get/total/${propertyId}`
    );
    setTotal(response.data);
  };

  return (
    <div>
      <h1> Payment history for </h1>
      {list.map((id) => (
        <span key={id}>
          {" "}
          Apartment : {id.apartmentNum} <br />
          Adress : {id.address} <br />
          <br />
        </span>
      ))}
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
                <TableCell> $ {data.amount}</TableCell>
                <TableCell>{data.receiptNum}</TableCell>
                <TableCell>{data.paymentDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {total.map((id) => (
        <span key={id}>
          {" "}
          <h1> Total : $ {id.totalAmount}</h1>
        </span>
      ))}
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
