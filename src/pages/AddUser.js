import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import UserForm from "../components/common/UserForm";
import { ADD_USER } from "../redux/reducers/user/actions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const AddUser = () => {
  const dispatch = useDispatch();

  const onSubmit = data => {
    dispatch({
      type: ADD_USER,
      payload: data
    });
  };

  return (
    <Container component="main" maxWidth="md">
      <UserForm onSubmit={onSubmit} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Button
          size="small"
          component={Link}
          to="/users"
          variant="contained"
          sx={{
            mt: 2
          }}
        >
          Go To All Users
        </Button>
      </Box>
    </Container>
  );
};

export default AddUser;
