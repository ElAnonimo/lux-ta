import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DELETE_USER } from "../redux/reducers/user/actions";

const UserList = () => {
  const userList = useSelector(state => state.userList.users);

  const dispatch = useDispatch();

  const onDeleteClick = id => {
    dispatch({
      type: DELETE_USER,
      payload: id
    });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Button
          size="small"
          component={Link}
          to="/"
          variant="contained"
          sx={{
            mt: 2
          }}
        >
          Add User
        </Button>
      </Box>
      <Container
        component="main"
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          mt: 2,
          mb: 2
        }}
      >
        {userList?.length > 0 && userList.map(item => (
          <Card
            key={item.id}
            sx={{
              width: 345,
              "+ .MuiCard-root": {
                mt: 2
              },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Name: {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Status: {item.status}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: {item.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Gender: {item.gender}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to={`/user/${item.id}`}>
                <EditIcon
                  sx={{
                    fontSize: "1rem",
                    mr: 1
                  }}
                />
                Edit
              </Button>
              <Button
                size="small"
                sx={{
                  color: "#990000",
                  ml: 2
                }}
                onClick={() => onDeleteClick(item.id)}
              >
                <DeleteOutlineIcon
                  sx={{
                    fontSize: "1rem",
                    mr: 1
                  }}
                />
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default UserList;
