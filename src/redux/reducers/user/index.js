import {
  ADD_USER_FAIL,
  ADD_USER_SUCCESS,
  ADD_USER,
  LIST_USERS,
  LIST_USERS_SUCCESS,
  LIST_USERS_FAIL,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL
} from "./actions";

const initialState = {
  loading: false,
  users: [],
  error: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
    case LIST_USERS:
    case DELETE_USER:
      return {
        ...state,
        loading: true
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [action.payload, ...state.users]
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter(item => item.id !== action.payload)
      };
    case LIST_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload
      };
    case ADD_USER_FAIL:
    case LIST_USERS_FAIL:
    case DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
