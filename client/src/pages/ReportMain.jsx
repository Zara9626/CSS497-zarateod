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

function Maintenance() {
  const [maintenanceList, setMaintenanceList] = useState([]);

  const { propertyId } = useParams();

  useEffect(() => {
    getMainById();
  }, []);

  const getMainById = async () => {
    const response = await axios.get(
      `http://localhost:8080/maintenance/get/${propertyId}`
    );
    setMaintenanceList(response.data);
  };

  return (
    <div>
      <h1>Maintenance records </h1>
      <TableContainer component={Paper}>
        <Table style={{ width: 1600 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Maintenance date</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Incident date</TableCell>
              <TableCell align="left">Incident description</TableCell>
              <TableCell align="left">Charges</TableCell>
              <TableCell align="left">Contractor name </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {maintenanceList.map((data, id) => (
              <TableRow key={id}>
                <TableCell align="left">{data.mainDate}</TableCell>
                <TableCell align="left">{data.description}</TableCell>
                <TableCell align="left">{data.eventDate}</TableCell>
                <TableCell align="left">{data.happened}</TableCell>
                <TableCell align="left">{data.charge}</TableCell>
                <TableCell align="left">{data.contractorName}</TableCell>
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
export default Maintenance;
