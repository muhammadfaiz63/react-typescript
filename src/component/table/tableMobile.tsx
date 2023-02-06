import {ArrowLeft, ArrowRight, Delete, Edit, Visibility} from '@mui/icons-material';
import {Box, Button, Grid, IconButton, MenuItem, TextField, Typography} from '@mui/material';
import moment from 'moment';
import {ImageTableMobile, PaperTableCard} from '../styled-component/tableMobile';
import {PropsMobile} from './dto/type';
import React from 'react';
import {ContentType} from '../../utils/enum';
import Notfound from '../../assets/notfound.svg';
import {formatCash} from '../../utils/helper';
export default function TableMobile({
  data,
  header,
  page,
  totalPage,
  handleNext,
  handlePrev,
  handleLimit,
  handleDetail,
  handleDelete,
  handleEdit,
  handleEditMultiple,
  multipleId,
  limit,
  count,
}: PropsMobile) {
  return (
    <Box>
      {data.length > 0 ? (
        data.map((item, i) => {
          return (
            <PaperTableCard key={i} square>
              {header.map((val, index) => {
                const key = val.value.split('.');
                const value = key.reduce((a: any, b: any) => {
                  if (a === null || a === undefined) {
                    return '';
                  } else {
                    return a[b];
                  }
                }, item);

                let formattedValue = null;
                switch (val.type) {
                  case ContentType.date:
                    formattedValue = moment(value).format('LLL');
                    break;
                  case ContentType.boolean:
                    formattedValue = value === true ? 'Ya' : 'Tidak';
                    break;
                  case ContentType.idr:
                    formattedValue = `Rp. ${formatCash(value)}`;
                    break;
                  case ContentType.html:
                    formattedValue = <div dangerouslySetInnerHTML={{__html: value}} />;
                    break;
                  case ContentType.publish:
                    formattedValue = value ? 'Diterbitkan' : 'Draft';
                    break;
                  case ContentType.mobile:
                    formattedValue = value ? 'Mobile' : 'Web';
                    break;
                  case ContentType.image:
                    formattedValue = <img src={value} alt="icon menu" style={{width: '10%'}} />;
                    break;
                  default:
                    formattedValue = value;
                    break;
                }

                return (
                  <Grid container key={index} my={1}>
                    <Grid item xs={3} sm={3}>
                      <Typography variant="body1" fontWeight="bold">
                        {val.label}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={value?.length > 25 ? 12 : 9}
                      sm={value?.length > 25 ? 12 : 9}
                      mt={value?.length > 25 && val?.type !== 'image' ? 1 : 0}
                      style={{maxWidth: '60%'}}
                    >
                      <Typography variant="body1">{formattedValue}</Typography>
                    </Grid>
                  </Grid>
                );
              })}
              <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{marginRight: 1}}
                  fullWidth
                  startIcon={<Visibility />}
                  onClick={() => handleDetail?.(item)}
                >
                  Lihat
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{marginRight: 1}}
                  fullWidth
                  startIcon={<Edit />}
                  onClick={() => (multipleId ? handleEditMultiple?.(item) : handleEdit?.(item.id || item._id))}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<Delete />}
                  onClick={() => handleDelete?.(item)}
                >
                  Hapus
                </Button>
              </Box>
            </PaperTableCard>
          );
        })
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" my={4}>
          <ImageTableMobile src={Notfound} />
          <Typography variant="h4" fontWeight="bold" mt={2} textAlign="center">
            Data Tidak Ditemukan!
          </Typography>
          <Typography variant="body1" mt={2} textAlign="center">
            Data yang anda cari tidak ditemukan, silahkan coba lagi.
          </Typography>
          <Typography variant="body1" mt={1} textAlign="center">
            Jika data yang anda cari tidak ada, silahkan tambahkan data baru
          </Typography>
        </Box>
      )}
      <Box display="flex" alignItems="center">
        <Typography variant="body1" width="50%">
          Total {count}
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          sx={{marginLeft: '1rem'}}
          select
          fullWidth
          value={limit}
          onChange={handleLimit}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </TextField>
      </Box>
      <Box display="flex" alignItems="center" mt={2}>
        <Typography variant="body1" width="100%">
          Halaman {page} dari {totalPage}
        </Typography>
        <IconButton
          onClick={handlePrev}
          disabled={page === 1}
          sx={{
            backgroundColor: '#00479B',
            width: '30px',
            height: '30px',
            borderRadius: '5px',
            '&:hover': {backgroundColor: '#00479B'},
            '&:disabled': {backgroundColor: '#ADB4BC'},
          }}
        >
          <ArrowLeft sx={{color: 'white'}} />
        </IconButton>
        <Typography variant="body1" mx={2}>
          {page}
        </Typography>
        <IconButton
          onClick={handleNext}
          disabled={page === totalPage}
          sx={{
            backgroundColor: '#00479B',
            width: '30px',
            height: '30px',
            borderRadius: '5px',
            '&:hover': {backgroundColor: '#00479B'},
            '&:disabled': {backgroundColor: '#ADB4BC'},
          }}
        >
          <ArrowRight sx={{color: 'white'}} />
        </IconButton>
      </Box>
    </Box>
  );
}
