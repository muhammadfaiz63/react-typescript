import {Box} from '@mui/system';
import {Toolbar, AppBar, useMediaQuery, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const matches = useMediaQuery('(min-width:769px)');
  return (
    <AppBar
      color="secondary"
      position={matches ? 'static' : 'fixed'}
      sx={{borderBottomLeftRadius: matches ? 10 : 0, borderBottomRightRadius: matches ? 10 : 0, padding: 1}}
      square
    >
      <Toolbar>
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{width: '100%'}}>
          <Box>
            <Typography variant="h5" color="primary" fontWeight="bold" textAlign="left">
              Vimi Home Work Task
            </Typography>
          </Box>
          <Box display="flex" sx={{cursor: 'pointer'}} onClick={() => navigate('/app/profile')}>
            <Box ml={2}>
              <Typography variant="body1" color="primary" fontWeight="bold" textAlign="left">
                Faiz
              </Typography>
              <Typography variant="body2" fontWeight="normal" textAlign="left">
                Software Engineer
              </Typography>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
