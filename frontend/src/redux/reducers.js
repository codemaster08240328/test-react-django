import { combineReducers } from 'redux';
import companyReducer from './company/reducer';
import officeReducer from './office/reducer';

const combinedReducer = combineReducers({
  company: companyReducer,
  office: officeReducer,
})

export default combinedReducer
