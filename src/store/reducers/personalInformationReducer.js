import {
  SAVE_PERSONAL_INFORMATION_REQUEST,
  SAVE_PERSONAL_INFORMATION_SUCCESS,
  SAVE_PERSONAL_INFORMATION_FAILURE
} from '../actionTypes';

const initialState = {
  loading: false,
  data: null,
  error: null
};

const personalInformationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PERSONAL_INFORMATION_REQUEST:
      return {
        ...state,
        loading: true
      };
    case SAVE_PERSONAL_INFORMATION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case SAVE_PERSONAL_INFORMATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default personalInformationReducer;