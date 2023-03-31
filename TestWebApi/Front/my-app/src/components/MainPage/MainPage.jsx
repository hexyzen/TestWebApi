import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { GetTests } from "../../ConstantRepository/api/TestApi";
import ConstantsList from "../../ConstantRepository/ConstantsList";
import Cookies from "js-cookie";

const MainPage = () => {
  const [open, setOpen] = useState(false);
  const [tests, setTests] = useState([]);
  const [test, setTest] = useState({});
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    GetTests()
      .then((response) => response.json())
      .then((data) => setTests(data));
  }, [tests]);

  const handleTestClick = (test) => {
    setTest(test);
    setOpen(true);
  };

  const handleProceedClick = (testId) => {
    navigate(`/${ConstantsList.ROUTE_TESTNAV_PAGE + testId}`);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckboxChange = (event) => {
    setAgreed(event.target.checked);
  };

  function logOutButton() {
    navigate(`/${ConstantsList.ROUTE_LOGIN_PAGE}`);
    Cookies.remove("JWT");
  }

  return (
    <>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Typography variant="h4">Hello Guest</Typography>
        <Button
          variant="outlined"
          size="large"
          color="error"
          style={{ marginLeft: "20px" }}
          onClick={logOutButton}
        >
          Exit
        </Button>
      </Box>
      <List component="nav" aria-label="tests list">
        {tests.map((test) => (
          <ListItem key={test.testId}>
            <ListItemText
              primary={test.testTitle}
              secondary={test.testDescription}
            />
            <Button onClick={() => handleTestClick(test)} variant="primary">
              Start
            </Button>
          </ListItem>
        ))}
      </List>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{test.testTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{test.testDescription}</DialogContentText>
          <div>
            <Checkbox checked={agreed} onChange={handleCheckboxChange} />
            <span>I agree to start</span>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => handleProceedClick(test.testId)}
            disabled={!agreed}
          >
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MainPage;
