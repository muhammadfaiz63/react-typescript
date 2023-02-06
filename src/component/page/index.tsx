import React, {forwardRef, useEffect} from 'react';
import {Box, Paper, useMediaQuery} from '@mui/material';
import Header from '../header/index';
import SimpleBottomNavigation from '../header/bottomNavigation';

interface PageProps {
  children: React.ReactNode;
  title: string;
}

export type Ref = HTMLDivElement;
const Page = forwardRef<Ref, PageProps>(({children, title = '', ...rest}, ref) => {
  const matches = useMediaQuery('(min-width:769px)');
  useEffect(() => {
    document.title = 'OSS - ' + title;
  });

  return (
    <Box ref={ref} {...rest}>
      <Header />
      {matches ? (
        <Box sx={{p: '2rem'}}>
          <Paper
            elevation={3}
            sx={{
              marginTop: '3rem',
              padding: '2rem',
              borderRadius: '10px',
            }}
            square
          >
            {children}
          </Paper>
        </Box>
      ) : (
        <Box
          sx={{
            marginTop: matches ? '3rem' : '6rem',
            marginBottom: matches ? 0 : '5rem',
            padding: matches ? '2rem' : '1rem',
            borderRadius: '10px',
          }}
        >
          {children}
        </Box>
      )}

      {matches ? null : <SimpleBottomNavigation />}
    </Box>
  );
});

export default Page;
