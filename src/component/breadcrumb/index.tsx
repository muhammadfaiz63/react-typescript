import {NavigateNext} from '@mui/icons-material';
import {Breadcrumbs, Typography} from '@mui/material';

const Breadcrumb = () => {
  const breadcrumbs = window.location.pathname.split('/').filter((item) => item !== '');
  return (
    <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
      {breadcrumbs.map((item, i) => {
        return (
          <Typography color="text.primary" key={i}>
            {item}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
};
export default Breadcrumb;
