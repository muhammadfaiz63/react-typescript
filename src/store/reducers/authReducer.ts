import {REQUEST_PROFILE_LOG_SUCCESS, REQUEST_PROFILE_SUCCESS} from '../globalTypeStore';

const initialState = {
  profile: null,
  log: [],
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case REQUEST_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action?.data,
      };
    case REQUEST_PROFILE_LOG_SUCCESS:
      return {
        ...state,
        log: action?.data,
      };

    default:
      return state;
  }
};
export default authReducer;
