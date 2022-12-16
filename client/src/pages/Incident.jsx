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
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import Button from "@mui/material/Button";
import CachedIcon from "@mui/icons-material/Cached";
import Stack from "@mui/material/Stack";
import HomeIcon from "@mui/icons-material/Home";

function Incident() {
  const [incidentList, setIncidentList] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8080/incident`).then((response) => {
      console.log(response.data);
      setIncidentList(response.data);
    });
  }, []);

  return (
    <div>
      <h1> Incidents</h1>
      <TableContainer component={Paper}>
        <Table style={{ width: 1400 }} aria-label="a dense table">
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
            {incidentList.map((data, id) => (
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
                <TableCell size="string">
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<CachedIcon />}
                  >
                    <Link href="/ReportMain" color="inherit">
                      Update
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
export default Incident;
