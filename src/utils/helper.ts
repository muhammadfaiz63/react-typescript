import {get} from 'lodash';
import toast from 'react-hot-toast';
export const globalToasterError = (error: any) => {
  console.log('error?.response?.message', error);
  toast.error(
    typeof error?.response?.data?.message === 'string' || Array.isArray(error?.response?.data?.message)
      ? get(
          error,
          'response.data.message',
          typeof error?.response?.data?.error === 'string'
            ? error.response.data.error
            : error?.message || 'Unhandled Error',
        )
      : 'Unhandled Error',
  );
};
export const formatCash = (n: number) => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'Ribu';
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'Juta';
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'Miliar';
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'Triliun';
};
