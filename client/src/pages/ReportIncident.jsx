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
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Stack from "@mui/material/Stack";
import HomeIcon from "@mui/icons-material/Home";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import { useParams } from "react-router";

const ReportIncident = () => {
  const [reportList, setReport] = useState([]);
  const { propertyId } = useParams();

  useEffect(() => {
    getIncidentById();
  }, []);
  const getIncidentById = async (propertyId) => {
    const response = await axios.get(
      'http://localhost:8080/incident/get/${propertyId}'
    );
    setReport(response.data);
  };

  return (
    <div>
      <h1> Incidents</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Incident date</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Property address</TableCell>
              <TableCell align="left">Apartment #</TableCell>
              <TableCell align="left">Police report date</TableCell>
              <TableCell align="left">Officer name </TableCell>
              <TableCell align="left">Police report #</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportList.map((data, id) => (
              <TableRow key={id}>
                <TableCell>{data.eventDate}</TableCell>
                <TableCell>{data.desc}</TableCell>
                <TableCell>{data.address}</TableCell>
                <TableCell>{data.apartmentNum}</TableCell>
                <TableCell>{data.policeReportDate}</TableCell>
                <TableCell>{data.officerName}</TableCell>
                <TableCell>{data.policeReportId}</TableCell>
                <TableCell size="string">
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<HomeRepairServiceIcon />}
                  >
                    <Link href="/ReportMain" color="inherit">
                      Add maintenance
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
        <Button variant="contained" size="medium" startIcon={<AddCircleIcon />}>
          <Link href="/AddProp" color="inherit">
            Add new incident to this property
          </Link>
        </Button>
        <Button variant="contained" size="medium" startIcon={<HomeIcon />}>
          <Link href="/Property" color="inherit">
            Go to Properties
          </Link>
        </Button>
      </Stack>
    </div>
  );
};
export default ReportIncident;
