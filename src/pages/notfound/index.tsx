import {Box, Container, Typography} from '@mui/material';
import Page from '../../component/page/index';
// import image from 'src/assets/underconstruction.png'

const NotFoundView = () => {
  return (
    <Page title="404">
      <Box display="flex" flexDirection="column" height="100%" justifyContent="center">
        <Container maxWidth="md">
          <Typography align="center" color="textPrimary" variant="h1">
            404: The page you are looking for isn’t here
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle2">
            You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation
          </Typography>
          <Box textAlign="center">
            {/* <img
              alt='Under development'
              className={classes.image}
              src={image}
            /> */}
          </Box>
        </Container>
      </Box>
    </Page>
  );
};

export default NotFoundView;
