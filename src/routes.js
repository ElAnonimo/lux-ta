import React from "react";
import { Route, Switch } from "react-router-dom";
import AddUser from "./pages/AddUser";
import UserList from "./pages/UserList";
import UserItem from "./pages/UserItem";

export const ADD_USER_ROUTE = "ADD_USER_ROUTE";
export const LIST_USERS_ROUTE = "LIST_USERS_ROUTE";
export const LOAD_USER_ROUTE = "LOAD_USER_ROUTE";

export const routes = [
  {
    id: ADD_USER_ROUTE,
    path: "/",
    exact: true,
    component: AddUser
  },
  {
    id: LIST_USERS_ROUTE,
    path: "/users",
    exact: false,
    component: UserList
  },
  {
    id: LOAD_USER_ROUTE,
    path: "/user/:id",
    exact: false,
    component: UserItem
  }
];

export const getRouteConfig = id => {
  const route = routes.find(r => r.id === id);

  if (route) {
    const { component, ...rest } = route;
    return rest;
  }
};

const Routes = () => {
  return (
    <Switch>
      {routes.map(r => {
        const { id, ...props } = r;

        return (
          <Route key={id} {...props} />
        );
      })}
    </Switch>
  );
};

export default Routes;
