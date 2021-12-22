import {
  UPDATE_USER_DETAILS,
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_FAIL,
  LOAD_USER_DETAILS,
  LOAD_USER_DETAILS_SUCCESS,
  LOAD_USER_DETAILS_FAIL
} from "./actions";

const initialState = {
  data: {},
  error: {},
  loading: false
};

const userDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_DETAILS:
    case UPDATE_USER_DETAILS:
      return {
        ...state,
        loading: true
      };
    case LOAD_USER_DETAILS_SUCCESS:
    case UPDATE_USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case LOAD_USER_DETAILS_FAIL:
    case UPDATE_USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default userDetailReducer;
