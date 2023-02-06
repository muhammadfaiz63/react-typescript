import {Box, Button, Dialog, Grid, styled, Typography} from '@mui/material';
import React from 'react';
import {PropsDelete} from './dto/dialogDetail.interface';
import ilustration from '../../assets/ilustration-delete.svg';
const Image = styled('img')(({theme}) => ({
  width: '75%',
  [theme.breakpoints.down('md')]: {
    width: '50%',
  },
}));
export default function DialogDelete({open, onDelete, onClose, title}: PropsDelete) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="center" padding="2rem">
        <Image src={ilustration} alt="ilustration delete" />
        <Typography
          variant="h5"
          fontWeight="bold"
          mt={2}
          textAlign="center"
          dangerouslySetInnerHTML={{__html: `Apakah anda yakin ingin menghapus ${title} ini?`}}
        />
        <Typography variant="body1" mt={2} textAlign="center">
          Data yang sudah terhapus tidak dapat dikembalikan seperti semula lagi.
        </Typography>
        <Grid container spacing={3} mt={3} mb={3}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Button variant="outlined" onClick={onClose} sx={{height: '52px'}} fullWidth>
              Tidak, Batal
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Button variant="contained" onClick={onDelete} sx={{height: '52px'}} fullWidth>
              Ya, hapus
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}
