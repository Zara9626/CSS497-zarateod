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
import { useNavigate } from "react-router-dom";

const Property = () => {
  const [propertyList, setPropertyList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProperty();
    // eslint-disable-next-line
  }, []);

  const getProperty = async () => {
    const response = await axios.get("http://localhost:8080/property/get/");
    setPropertyList(response.data);
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
      <h1>Occupied properties</h1>
      <TableContainer component={Paper}>
        <Table style={{ width: 1800 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Apartment Number</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">Bedrooms</TableCell>
              <TableCell align="left">Sq.Feet</TableCell>
              <TableCell align="left">Rent</TableCell>
              <TableCell align="left">Lease start</TableCell>
              <TableCell align="left">Lease end</TableCell>
              <TableCell align="left">Damage</TableCell>
              <TableCell align="left">Resident first name</TableCell>
              <TableCell align="left">Resident last Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {propertyList.map((data, id) => (
              <TableRow key={id}>
                <TableCell>
                  <Link href={`/ReportProp/${data.propertyId}`}>
                    {data.apartmentNum}
                  </Link>
                  </TableCell>
                <TableCell>{data.address}</TableCell>
                <TableCell>{data.bedrooms}</TableCell>
                <TableCell>{data.sqFeet}</TableCell>
                <TableCell>{data.rent}</TableCell>
                <TableCell>{data.leaseStart}</TableCell>
                <TableCell>{data.leaseEnd}</TableCell>
                <TableCell>{data.damage}</TableCell>
                <TableCell>
                  <Link href={`/ReportResident/${data.propertyId}`}>
                    {data.first}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/ReportResident/${data.propertyId}`}>
                    {data.last}
                  </Link>
                </TableCell>
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
    </div>
  );
};
export default Property;
