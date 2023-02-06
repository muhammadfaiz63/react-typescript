import {orderBy} from 'lodash';

export const selectProjectList = (state: any) => state.project.list;
export const selectProject = (state: any) => state.project.data;
export const selectSuccessAddProject = (state: any) => state.project.error.add;
export const selectSuccessDeleteProject = (state: any) => state.project.error.delete;
export const selectSuccessFetchProject = (state: any) => state.project.error.fetch;
export const selectSuccessEditProject = (state: any) => state.project.error.edit;
export const selectLoadingProject = (state: any) => state.project.isLoading;
export const selectProjectOptions = (state: any) => {
  const data = state.project.list;
  const optionArray: any[] = [];

  data.forEach((val: any) => {
    const optionName = `${val.kode}`;
    const optionId = val.id;
    optionArray.push({
      label: optionName,
      id: optionId,
    });
  });

  return orderBy(optionArray, 'label', 'asc');
};
