import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@material-ui/core";
import Cookies from "js-cookie";
import ConstantsList from "../../ConstantRepository/ConstantsList";
import { Login } from "../../ConstantRepository/api/UserApi";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const body = {
        username: username,
        password: password,
      };
      Login(body)
        .then((data) => data.json())
        .then((response) => {
          if (response.status != 404 && response.status != 401) {
            Cookies.set("JWT", response);
          } else {
            alert("Login or password is incorrect");
          }
          navigate(`/${ConstantsList.ROUTE_MAIN_PAGE}`);
        });
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <form onSubmit={handleSubmit}>
        <Typography variant="h4">Login</Typography>
        {error && <p>{error}</p>}
        <Box display="flex" flexDirection="column" alignItems="center">
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default LoginPage;
