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
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

const EmptyProps = () => {
  const [emptyList, setEmpty] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProperty();
  }, []);

  const getProperty = async () => {
    const response = await axios.get(
      "http://localhost:8080/property/empty/get"
    );
    setEmpty(response.data);
  };

  const onDelete = async (propertyId) => {
    try {
      console.log(propertyId);
      await axios.delete(`http://localhost:8080/property/delete/${propertyId}`);
      getProperty();
    } catch (error) {
      console.log(error);
    }
  };

  function refresh(){
    window.location.reload(true);

  };

  const handleClick = (propId) => {
    const url = "/AddResident/" + propId;
    navigate(url);
  }

  return (
    <div>
      <h1>Unoccupied properties</h1>
      <TableContainer component={Paper}>
        <Table style={{ width: 1200 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Apartment Number</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">Bedrooms</TableCell>
              <TableCell align="left">Sq.Feet</TableCell>
              <TableCell align="left">Rent</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {emptyList.map((data, id) => (
              <TableRow key={id}>
                <TableCell>{data.apartmentNum}</TableCell>
                <TableCell>{data.address}</TableCell>
                <TableCell>{data.bedrooms}</TableCell>
                <TableCell>{data.sqFeet}</TableCell>
                <TableCell>{data.rent}</TableCell>

                <TableCell size="string" size="medium" align="left">
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<PersonAddAlt1Icon />}
                  >
                    <Link
                      color="inherit"
                      state={{ propId: data.propertyId }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick(data.propertyId);
                      }}
                    >
                      Add new Resident
                    </Link>
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => 
                      {onDelete(data.propertyId); 
                      refresh();
                    }}
                    size="small"
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
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
export default EmptyProps;
