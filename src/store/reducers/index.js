import { combineReducers } from 'redux';
import employeeReducer from './employeeSlice';
import riderReducer from './riderSlice';
import authReducer from './authSlice';
import loadingSlice from './loadingSlice';


const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingSlice,
  employees: employeeReducer,
  riders: riderReducer
});

export default rootReducer;