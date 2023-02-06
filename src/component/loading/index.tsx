import {Skeleton} from '@mui/material';
import React from 'react';

export default function Loading() {
  return (
    <>
      {[1, 2, 3].map((item) => {
        return (
          <Skeleton
            key={item}
            variant="rectangular"
            width={'100%'}
            height={118}
            sx={{borderRadius: '10px', marginBottom: '1rem'}}
          />
        );
      })}
    </>
  );
}
