import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import UserForm from "../components/common/UserForm";
import { UPDATE_USER_DETAILS } from "../redux/reducers/userDetails/actions";

const UserItem = () => {
  const { id, ...userDetails } = useSelector(state => state.userDetails.data);
  const dispatch = useDispatch();

  const onSubmit = data => {
    dispatch({
      type: UPDATE_USER_DETAILS,
      payload: { id, ...data }
    });
  };

  return (
    <Container component="main" maxWidth="md">
      <UserForm onSubmit={onSubmit} initialValues={{ ...userDetails }} />
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
          <ArrowBackIcon
            sx={{
              fontSize: "1rem",
              mr: 1
            }}
          />
          Back To All Users
        </Button>
      </Box>
    </Container>
  );
};

export default UserItem;
