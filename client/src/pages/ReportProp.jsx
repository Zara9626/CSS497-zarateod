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
import Button from "@mui/material/Button";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import PaidIcon from "@mui/icons-material/Paid";
import Stack from "@mui/material/Stack";
import HomeIcon from "@mui/icons-material/Home";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

export default function ReportProp() {
  const [reportList, setList] = useState([]);
  const [propList, setPropList] = useState([]);
  const navigate = useNavigate();

  const { propertyId } = useParams();
 
  useEffect(() => {
    getList();
    getProById();
    // eslint-disable-next-line
  }, []);

  const getList = async () => {
    const response = await axios.get(
      `http://localhost:8080/property/get/info/${propertyId}`
    );
    setList(response.data);
  };
  const getProById = async () => {
    const response = await axios.get(
      `http://localhost:8080/property/get/${propertyId}`
    );
    setPropList(response.data);
  };

  const handleInc = (propId) => {
    const url = "/AddIncident/" + propId;
    navigate(url);
  };

  const handlePay = (propId) => {
    const url = "/AddPayment/" + propId;
    navigate(url);
  };
  
  return (
    <div>
      <h1> General info </h1>
      {propList.map((id) => (
        <span key={id}>
          {" "}
          Apartment : {id.apartmentNum} <br />
          Adress : {id.address} <br />
          SqFeet: {id.sqFeet} <br/>
          Bedrooms : {id.bedrooms} <br/>
          <br />
        </span>
      ))}
      <TableContainer component={Paper}>
        <Table style={{ width: 1200 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Incidents</TableCell>
              <TableCell align="left">Lease start</TableCell>
              <TableCell align="left">Lease end </TableCell>
              <TableCell align="left">Resident first</TableCell>
              <TableCell align="left">Resident last</TableCell>
              <TableCell align="left">Rent $$</TableCell>
              <TableCell align="left">Damages</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportList.map((data, id) => (
              <TableRow key={id}>
                <TableCell>{data.happened}</TableCell>
                <TableCell>{data.leaseStart}</TableCell>
                <TableCell>{data.leaseEnd}</TableCell>
                <TableCell>{data.first }</TableCell>
                <TableCell>{data.last}</TableCell>
                <TableCell>{data.rent}</TableCell>
                <TableCell>{data.damage}</TableCell>
              <TableCell size="small">
              <Button
                variant="contained"
                size="small"
                startIcon={<EditIcon />}
              >
                <Link
                  href={`/UpdateProp/${data.propertyId}`}
                  color="inherit"
                >
                  Update
                </Link>
              </Button>
            </TableCell>
            <TableCell size="string">
              <Button variant="contained" size="small">
                <Link
                  href={`/ReportIncident/${data.propertyId}/${data.incidentId}`}
                  color="inherit"
                >
                  Incidents
                </Link>
              </Button>
            </TableCell>
            <TableCell size="string">
              <Button
                variant="contained"
                size="small"
                startIcon={<HomeRepairServiceIcon />}
              >
                <Link
                  href={`/ReportMain/${data.propertyId}`}
                  color="inherit"
                >
                  Maintenance records
                </Link>
              </Button>
            </TableCell>
            <TableCell size="small">
              <Button
                variant="contained"
                size="small"
                startIcon={<PaidIcon />}
              >
                <Link
                  href={`/ReportPay/${data.propertyId}`}
                  color="inherit"
                >
                  Payments
                </Link>
              </Button>
            </TableCell>
            <TableCell size="string">
              <Button variant="contained" size="small">
                <Link
                  color="inherit"
                  state={{ propId: data.propertyId }}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePay(data.propertyId);
                  }}
                >
                  Add payment
                </Link>
              </Button>
            </TableCell>
            <TableCell>
              <Button variant="contained" size="small">
                <Link
                  color="inherit"
                  state={{ propId: data.propertyId }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleInc(data.propertyId);
                  }}
                >
                  Add new incident
                </Link>
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
