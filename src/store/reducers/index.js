import { combineReducers } from 'redux';
import employeeReducer from './employeeSlice';


const rootReducer = combineReducers({
  employees: employeeReducer
});

export default rootReducer;