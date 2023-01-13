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
import AddCircleIcon from "@mui/icons-material/AddCircle";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";

const Lease = () => {
  const [leaseList, setLease] = useState([]);
  const [select, setSelected] = useState({});
  
  const navigate = useNavigate();

  const { propertyId } = useParams();

  useEffect(() => {
    getLease();
    getRes();
    // eslint-disable-next-line
  }, []);

  const getLease = async () => {
    const response = await axios.get(`http://localhost:8080/lease/get`);
    console.log(response.data);
    setLease(response.data);
  };

  const getRes = async () => {
    const response = await axios.get(`http://localhost:8080/resident/get/all`);
    setSelected(response.data);
  };
  const handleChange = (e) => {
    console.log(e.target.value);
    setSelected(e.target.value);
  };

  const handleClick = (leaId) => {
    const url = "/AddResident/" + leaId;
    navigate(url);
  };
  return (
    <div>
      <h1>Leases</h1>
      <TableContainer component={Paper}>
        <Table style={{ width: 1200 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Apartment Number</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">Bedrooms</TableCell>
              <TableCell align="left">Sq.Feet</TableCell>
              <TableCell align="left">Lease start</TableCell>
              <TableCell align="left">Lease end</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaseList.map((data, id) => (
              <TableRow key={id}>
                <TableCell>{data.apartmentNum}</TableCell>
                <TableCell>{data.address}</TableCell>
                <TableCell>{data.bedrooms}</TableCell>
                <TableCell>{data.sqFeet}</TableCell>
                <TableCell>{data.leaseStart}</TableCell>
                <TableCell>{data.leaseEnd}</TableCell>

                <TableCell size="string">
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<PersonAddAlt1Icon />}
                  >
                    <Link
                      color="inherit"
                      state={{ propId: data.leaseId }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick(data.leaseId);
                      }}
                    >
                      Add new resident
                    </Link>
                  </Button>
                </TableCell>
                <TableCell>
                  <select onChange={handleChange}>
                    {select &&
                      select.map((resident) => (
                        <option key={resident.id} value={resident.id}>
                          {resident.last}
                        </option>
                      ))}
                  </select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack
        mt={2}
        spacing={{ xs: 6, sm: 6, md: 20 }}
        direction="row"
        justifyContent="center"
      >
        <Button variant="contained" size="medium" startIcon={<AddCircleIcon />}>
          <Link href="/AddProp" color="inherit">
            Add new property
          </Link>
        </Button>
      </Stack>
    </div>
  );
};
export default Lease;
