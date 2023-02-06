import {Box, Paper} from '@mui/material';
import styled from 'styled-components';

export const Form = styled.form`
  height: 16rem;
  width: 100%;
  max-width: 100%;
  text-align: center;
  position: relative;
`;
export const Label = styled.label`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-radius: 1rem;
  border-style: dashed;
  border-color: #cbd5e1;
  background-color: #f8fafc;
`;

export const BoxElement = styled(Box)`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;
export const PaperCard = styled(Paper)`
  padding: 1rem;
`;
export const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
`;
