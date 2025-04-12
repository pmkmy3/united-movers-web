import { combineReducers } from 'redux';
import employeeReducer from './employeeSlice';
import riderReducer from './riderSlice';
import authReducer from './authSlice';


const rootReducer = combineReducers({
  auth: authReducer,
  employees: employeeReducer,
  riders: riderReducer
});

export default rootReducer;