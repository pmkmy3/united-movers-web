import { combineReducers } from 'redux';
import personalInformationReducer from './personalInformationReducer';

const rootReducer = combineReducers({
  personalInformation: personalInformationReducer
});

export default rootReducer;