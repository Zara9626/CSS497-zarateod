import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Axios from "axios";
import HomeIcon from "@mui/icons-material/Home";
import { Link} from "react-router-dom";
import Button from "@mui/material/Button";
import { useParams } from "react-router";
import { useState, useEffect } from "react";

function AddIncident() {
  const [eventDate, setEvent] = useState("");
  const [happened, setHap] = useState("");
  const [officerName, setOfficer] = useState("");
  const [policeReportDate, setReportDate] = useState("");
  const [policeReportId, setReportId] = useState("");

  const [proList, setProList] = useState([]);
  const { propertyId } = useParams();

  useEffect(() => {
    getProById();
    // eslint-disable-next-line
  }, []);

  const postIncident = async (e) => {
    e.preventDefault();
    try {
      await Axios.post(`http://localhost:8080/incident/post/${propertyId}`, {
        eventDate,
        happened,
        officerName,
        policeReportDate,
        policeReportId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getProById = async () => {
    const response = await Axios.get(
      `http://localhost:8080/property/get/${propertyId}`
    );
    setProList(response.data);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "50ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <h1> Add new incident for :</h1>
        {proList.map((id) => (
          <span key={id}>
            {" "}
            Apartment : {id.apartmentNum} <br />
            Adress : {id.address} <br />
          </span>
        ))}
        <TextField
          label="Event date YYYY-MM-DD"
          type="text"
          onChange={(e) => {
            setEvent(e.target.value);
          }}
        />
        <TextField
          label="Description"
          type="text"
          onChange={(e) => {
            setHap(e.target.value);
          }}
        />
        <TextField
          label="Police officer name "
          type="text"
          onChange={(e) => {
            setOfficer(e.target.value);
          }}
        />
        <TextField
          label="Report date in YYYY-MM-DD"
          type="text"
          onChange={(e) => {
            setReportDate(e.target.value);
          }}
        />
        <TextField
          label="Report #"
          type="text"
          onChange={(e) => {
            setReportId(e.target.value);
          }}
        />
      </div>
      <Button onClick={postIncident} size="large" variant="contained">
        Submit
      </Button>
      <Box textAlign="center">
        <Button variant="outlined" size="large" startIcon={<HomeIcon />}>
          <Link to="/" color="inherit">
            Go back
          </Link>
        </Button>
      </Box>
    </Box>
  );
}
export default AddIncident;
