import axios from 'axios';
import {
  SAVE_PERSONAL_INFORMATION_REQUEST,
  SAVE_PERSONAL_INFORMATION_SUCCESS,
  SAVE_PERSONAL_INFORMATION_FAILURE
} from '../actionTypes';

const savePersonalInformationRequest = () => ({
  type: SAVE_PERSONAL_INFORMATION_REQUEST
});

const savePersonalInformationSuccess = (data) => ({
  type: SAVE_PERSONAL_INFORMATION_SUCCESS,
  payload: data
});

const savePersonalInformationFailure = (error) => ({
  type: SAVE_PERSONAL_INFORMATION_FAILURE,
  payload: error
});

export const savePersonalInformation = (formData) => async (dispatch) => {
  dispatch(savePersonalInformationRequest());
  try {
    const response = await axios.post('/api/savePersonalInformation', formData);
    dispatch(savePersonalInformationSuccess(response.data));
  } catch (error) {
    dispatch(savePersonalInformationFailure(error.message));
  }
};