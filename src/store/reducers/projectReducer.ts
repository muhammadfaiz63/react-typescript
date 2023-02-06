import {Action} from '../interfaces/actionInterface';
import {ProjectActionTypes as actionTypes} from '../types/projectType';

export const INITIAL_STATE = {
  list: [],
  data: null,
  isLoading: false,
  error: {
    add: null,
    delete: null,
    fetch: null,
    edit: null,
  },
};

const projectReducer = (state = INITIAL_STATE, action: Action = {type: ''}) => {
  const {type, payload} = action;

  switch (type) {
    case actionTypes.SET_LIST_DATA:
      return {...state, list: payload};
    case actionTypes.SET_DATA:
      return {...state, data: payload};
    case actionTypes.ON_PROCESS_SUBMIT:
      return {...state, isLoading: true};
    case actionTypes.ON_SUCCESS_FETCH:
      return {...state, isLoading: false, error: {fetch: false}};
    case actionTypes.ON_SUCCESS_ADD:
      return {...state, isLoading: false, error: {add: false}};
    case actionTypes.ON_SUCCESS_DELETE:
      return {...state, isLoading: false, error: {delete: false}};
    case actionTypes.ON_SUCCESS_EDIT:
      return {...state, isLoading: false, error: {edit: false}};
    case actionTypes.ON_FAILURE_SUBMIT:
      return {...state, isLoading: false, error: true};
    case actionTypes.ON_FINISH_SUBMIT:
      return {...state, isLoading: false, error: {add: null, delete: null, fetch: null, edit: null}};
    default:
      return state;
  }
};

export default projectReducer;
