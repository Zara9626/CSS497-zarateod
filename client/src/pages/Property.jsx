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

const Property = () => {
  const [propertyList, setPropertyList] = useState([]);

  useEffect(() => {
    getProperty();
  }, []);

  const getProperty = async () => {
    const response = await axios.get("http://localhost:8080/property/get");
    setPropertyList(response.data);
  };

  return (
    <div>
      <h1>List of properties</h1>
      <TableContainer component={Paper}>
        <Table style={{ width: 1600 }} size="small" aria-label="a dense table">
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
                <TableCell>{data.apartmentNum}</TableCell>
                <TableCell>{data.address}</TableCell>
                <TableCell>{data.bedrooms}</TableCell>
                <TableCell>{data.sqFeet}</TableCell>
                <TableCell>{data.rent}</TableCell>
                <TableCell>{data.leaseStart}</TableCell>
                <TableCell>{data.leaseEnd}</TableCell>
                <TableCell>{data.damage}</TableCell>
                <TableCell>{data.first}</TableCell>
                <TableCell>{data.last}</TableCell>
                <TableCell size="small">
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<EditIcon />}
                  >
                    <Link href="/UpdateProp" color="inherit">
                      Update
                    </Link>
                  </Button>
                </TableCell>
                <TableCell size="string">
                  <Button variant="contained" size="small">
                    <Link href="/ReportIncident" color="inherit">
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
                    <Link href="/ReportMain" color="inherit">
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
                    <Link href="/ReportPay" color="inherit">
                      Payments
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
