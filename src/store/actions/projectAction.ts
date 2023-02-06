import axios from '../../utils/axios';
import {globalToasterError} from '../../utils/helper';
import {createAction} from './createAction';
import {ProjectActionTypes as actionTypes} from '../types/projectType';

export const setListProject = (data: any) => createAction(actionTypes.SET_LIST_DATA, data);
export const setDataProject = (data: any) => createAction(actionTypes.SET_DATA, data);
export const onProcessProject = () => createAction(actionTypes.ON_PROCESS_SUBMIT, {});
export const onSuccessFetchProject = () => createAction(actionTypes.ON_SUCCESS_FETCH, {});
export const onSuccessAddProject = () => createAction(actionTypes.ON_SUCCESS_ADD, {});
export const onSuccessDeleteProject = () => createAction(actionTypes.ON_SUCCESS_DELETE, {});
export const onSuccessEditProject = () => createAction(actionTypes.ON_SUCCESS_EDIT, {});
export const onFailureProject = (e: any) => createAction(actionTypes.ON_FAILURE_SUBMIT, {error: e.stack});
export const onFinishProject = () => createAction(actionTypes.ON_FINISH_SUBMIT, {});

export const fetchProjectAsync = (params: string) => async (dispatch: any) => {
  try {
    const {data} = await axios.get(`/projects?${params}`);
    const customData = await data.map((item: any, index: any) => {
      item.no = index + 1;
      return item;
    });
    dispatch(setListProject(customData));
    return customData;
  } catch (error) {
    globalToasterError(error);
  }
};

export const createProjectAsync = (body: any) => async (dispatch: any) => {
  try {
    dispatch(onProcessProject());
    const {data} = await axios.post(`/projects`, body);
    dispatch(onSuccessAddProject());
    return data;
  } catch (error) {
    dispatch(onFailureProject(error));
    globalToasterError(error);
  }
};

export const deleteProjectAsync = (id: any) => async (dispatch: any) => {
  try {
    dispatch(onProcessProject());
    await axios.delete(`/projects/${id}`);
    dispatch(onSuccessDeleteProject());
  } catch (error) {
    dispatch(onFailureProject(error));
    globalToasterError(error);
  }
};

export const fetchByIdProjectAsync = (id: any) => async (dispatch: any) => {
  try {
    dispatch(onProcessProject());
    const {data} = await axios.get(`/projects/${id}`);
    dispatch(setDataProject(data));
    dispatch(onSuccessFetchProject());
    return data;
  } catch (error) {
    globalToasterError(error);
  }
};

export const updateByIdProjectAsync = (id: any, body: any) => async (dispatch: any) => {
  try {
    dispatch(onProcessProject());
    await axios.patch(`/projects/${id}`, body);
    dispatch(onSuccessEditProject());
  } catch (error) {
    globalToasterError(error);
  }
};

export const closeDialog = () => (dispatch: any) => {
  dispatch(onFinishProject());
};
