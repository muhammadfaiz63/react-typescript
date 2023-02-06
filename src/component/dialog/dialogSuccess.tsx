import {Box, Button, Dialog, styled, Typography, useMediaQuery} from '@mui/material';
import React from 'react';
import {PropsSuccess} from './dto/dialogDetail.interface';
import ilustration from '../../assets/checklist.svg';
const Image = styled('img')({
  width: '66px',
  height: '66px',
});
export default function DialogSuccess({open, onClose, title}: PropsSuccess) {
  const matches = useMediaQuery('(max-width:769px)');
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        padding={matches ? '2rem' : '3rem'}
      >
        <Image src={ilustration} alt="ilustration delete" />
        <Typography variant="h5" fontWeight="bold" mt={2} textAlign="center">
          Data Berhasil {title}
        </Typography>
        <Typography variant="body1" mt={2} mb={5} textAlign="center">
          Data yang Anda masukkan berhasil {title} disistem.
        </Typography>
        <Button variant="contained" onClick={onClose} sx={{height: '52px'}} fullWidth>
          Tutup
        </Button>
      </Box>
    </Dialog>
  );
}
