import React from 'react';
import Box from '@mui/material/Box';
import {Outlet} from 'react-router-dom';
function Layouts() {
  return (
    <Box sx={{display: 'flex'}}>
      <Box sx={{width: '100%'}}>
        <Outlet />
      </Box>
    </Box>
  );
}
export default Layouts;
