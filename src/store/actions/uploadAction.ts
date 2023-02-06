import axios from '../../utils/axios';
import {globalToasterError} from '../../utils/helper';

export const uploadFile = async (file: any) => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append('folderName', 'cms');
    bodyFormData.append('file', file);
    const config = {
      headers: {'Content-Type': 'multipart/form-data'},
    };
    const {data} = await axios.post('/v2/static-upload/file', bodyFormData, config);
    return data.data;
  } catch (error) {
    globalToasterError(error);
  }
};
export const uploadWebp = async (file: any) => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append('folderName', 'cms');
    bodyFormData.append('file', file);
    const config = {
      headers: {'Content-Type': 'multipart/form-data'},
    };
    const {data} = await axios.post('/v2/static-upload/file/webp', bodyFormData, config);
    return data.data;
  } catch (error) {
    globalToasterError(error);
  }
};
