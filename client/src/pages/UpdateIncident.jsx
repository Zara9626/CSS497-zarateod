import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useNavigate } from "react-router-dom";

const UpdateIncident = () => {
  const [happened, setHap] = useState("");
  const [officerName, setOfficer] = useState("");
  const [policeReportDate, setPoliceDate] = useState("");
  const [policeReportId, setPoliceId] = useState("");

  let { propertyId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getInc();
  }, []);
  const updInc = async (e) => {
    try {
      console.log("updateData", propertyId);
      await axios.put(`http://localhost:8080/incident/put/${propertyId}`, {
        happened,
        officerName,
        policeReportDate,
        policeReportId,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getInc = async (propertyId) => {
    const response = await axios.get(
      `http://localhost:8080/incident/put/${propertyId}`
    );
    setHap(response.data.happened);
    setOfficer(response.data.officerName);
    setPoliceDate(response.data.policeReportDate);
    setPoliceId(response.data.policeReportId);
  };
  function refresh(){
    window.location.reload(true);

  };
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          label="Description"
          onChange={(e) => {
            setHap(e.target.value);
          }}
        />
        <TextField
          label="Officer name"
          onChange={(e) => {
            setOfficer(e.target.value);
          }}
        />
      </div>
      <div>
        <TextField
          label="Police report Date in YYYY-MM-DD"
          onChange={(e) => {
            setPoliceDate(e.target.value);
          }}
        />
        <TextField
          label="Police report #"
          onChange={(e) => {
            setPoliceId(e.target.value);
          }}
        />
        <Button onClick={() => {updInc();
        navigate('/Incident');refresh()
        }}
        size="large" variant="contained">
          Update
        </Button>
        <Box textAlign="center">
          <Button variant="outlined" size="large" startIcon={<HomeIcon />}>
            <Link to="/" color="inherit">
              Go back
            </Link>
          </Button>
        </Box>
      </div>
    </Box>
  );
};

export default UpdateIncident;
