import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import { reducer as formReducer } from "redux-form";
import userReducer from "./user";
import userDetailReducer from "./userDetails";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  form: formReducer,
  router: connectRouter(history),
  userList: userReducer,
  userDetails: userDetailReducer
});

export default rootReducer;
