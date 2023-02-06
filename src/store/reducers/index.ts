import {combineReducers} from 'redux';
import authReducer from './authReducer';
import projectReducer from './projectReducer';
export default combineReducers({
  authReducer,
  project: projectReducer,
});
