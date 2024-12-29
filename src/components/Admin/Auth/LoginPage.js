import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
  CssBaseline,
} from "@mui/material";
import { login } from "../../../api/backend";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errorMsg, setErrorMsg] = useState({state :false,msg:""});
  const navigation = useNavigate();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response = await login({
        username: formData.email,
        password: formData.password,
      });
      if (response.msg === "Connected") {
        setErrorMsg({state:false,msg:""});
        const localUser={
          user: "admin",
          date: new Date().toISOString().split("T")[0],
        };
        localStorage.setItem("user",JSON.stringify(localUser));
        navigation("/sabrina-bio/admin/dashboard");
      } else {
        setErrorMsg({state:true,msg:response.msg});
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CssBaseline />
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            fontSize: "2rem",
            marginBottom: 2,
          }}
        >
          <div className="logo">
            <h4>
              Sabrina <span>Bio</span>
            </h4>
          </div>
        </Typography>
        {errorMsg.state && (
          <Typography
            variant="h1"
            sx={{
              fontWeight: "bold",
              fontSize: "1rem",
              marginBottom: 2,
                color:"red"
            }}
          >
            {errorMsg.msg} 
          </Typography>
        )}
        <form onSubmit={handleSubmit} sx={{ width: "100%", marginTop: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ccc", // default border color
                },
                "&:hover fieldset": {
                  borderColor: "#2fcb00", // border color when hovering
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2fcb00", // border color when focused
                },
              },
              "& .MuiInputLabel-root": {
                color: "#000", // default label color
              },
              "& .Mui-focused .MuiInputLabel-root": {
                color: "#000", // label color when focused
              },
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ccc", // default border color
                },
                "&:hover fieldset": {
                  borderColor: "#2fcb00", // border color when hovering
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2fcb00", // border color when focused
                },
              },
              "& .MuiInputLabel-root": {
                color: "#000", // default label color
              },
              "& .Mui-focused .MuiInputLabel-root": {
                color: "#000", // label color when focused
              },
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={formData.rememberMe}
                onChange={handleChange}
                name="rememberMe"
                style={{ color: "#2fcb00" }}
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ background: "#2fcb00" }}
            sx={{ marginTop: 3, marginBottom: 2 }}
          >
            LogIn
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
