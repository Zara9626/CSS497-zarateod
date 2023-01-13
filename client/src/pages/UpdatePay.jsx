import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useNavigate } from "react-router-dom";

const UpdateMain = () => {
  const [description, setDescription] = useState("");
  const [charge, setCharge] = useState("");

  let { eventId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getMain();
  }, []);
  const updMain = async (e) => {
    try {
      await axios.put(`http://localhost:8080/maintenance/put/${eventId}`, {
        description,
        charge,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getMain = async (eventId) => {
    const response = await axios.get(
      `http://localhost:8080/maintenance/put/${eventId}`
    );
    setDescription(response.data.description);
    setCharge(response.data.charge);
  };
  function refresh() {
    window.location.reload(true);
  }
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
            setDescription(e.target.value);
          }}
        />
        <TextField
          label="Charge $$"
          onChange={(e) => {
            setCharge(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            updMain();
            navigate("/Maintenance");
            refresh();
          }}
          size="large"
          variant="contained"
        >
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

export default UpdateMain;
