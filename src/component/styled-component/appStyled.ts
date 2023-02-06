import {Card} from '@mui/material';
import styled from 'styled-components';

export const ImageLocation = styled.img`
  width: 40%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
export const LogCard = styled(Card)`
  padding: 1rem;
  margin-bottom: 1rem;
`;
