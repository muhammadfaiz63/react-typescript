import {Paper} from '@mui/material';
import styled from 'styled-components';
export const PaperTableHead = styled(Paper)`
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  background: #fafbfb 0% 0% no-repeat padding-box;
  border: 0.5px solid #00479b;
  border-radius: 15px;
  opacity: 1;
`;
export const PaperTableBody = styled(Paper)`
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 0.5px solid #adb4bc;
  border-radius: 15px;
  opacity: 1;
`;
export const Content = styled.div`
  width: ${(props) => (props.theme.size !== undefined ? props.theme.size : '100%')};
  margin: 0 2rem 0 2rem;
  text-align: ${(props) => (props.theme.align !== undefined ? props.theme.align : 'left')};
`;
export const ImageTableDesktop = styled.img`
  width: 20%;
`;
