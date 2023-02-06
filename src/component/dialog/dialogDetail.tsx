import {Box, Button, Dialog, Grid, Typography, useMediaQuery} from '@mui/material';
import moment from 'moment';
import React from 'react';
import {ContentType} from '../../utils/enum';
import {formatCash} from '../../utils/helper';
import {Props} from './dto/dialogDetail.interface';

export default function DialogDetail({data, header, open, onClose}: Props) {
  const matches = useMediaQuery('(min-width:769px)');
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth fullScreen={!matches}>
      <Box padding="2rem">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h5" fontWeight="bold">
            Detail
          </Typography>
        </Box>
        <Box padding="1rem" sx={{backgroundColor: '#E2E5E8'}}>
          {header.map((val, index) => {
            const key = val?.value.split('.');
            const value =
              data &&
              key.reduce((a: any, b: any) => {
                if (a === null || a === undefined) {
                  return '-';
                } else {
                  const returnVal = a[b];

                  let formattedValue = null;
                  switch (val.type) {
                    case ContentType.date:
                      formattedValue = returnVal ? <div>{moment(returnVal).format('LLL')}</div> : '-';
                      break;
                    case ContentType.boolean:
                      formattedValue = returnVal === true ? 'Ya' : 'Tidak';
                      break;
                    case ContentType.idr:
                      formattedValue = `Rp. ${formatCash(returnVal)}`;
                      break;
                    case ContentType.html:
                      formattedValue = <div dangerouslySetInnerHTML={{__html: returnVal}} />;
                      break;
                    case ContentType.publish:
                      formattedValue = returnVal ? 'Diterbitkan' : 'Draft';
                      break;
                    case ContentType.mobile:
                      formattedValue = returnVal ? 'Mobile' : 'Web';
                      break;
                    case ContentType.image:
                      formattedValue = <img src={returnVal} alt="icon menu" style={{width: '20%'}} />;
                      break;
                    default:
                      formattedValue = returnVal;
                      break;
                  }

                  return formattedValue;
                }
              }, data);
            return (
              <Grid container key={index} my={1}>
                <Grid item xs={3} sm={3}>
                  <Typography variant="body1" fontWeight="bold">
                    {val?.label}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={value?.length > 25 ? 12 : 9}
                  sm={value?.length > 25 ? 12 : 9}
                  mt={value?.length > 25 ? 1 : 0}
                >
                  {/* <Typography
                    variant="body1"
                    dangerouslySetInnerHTML={{__html: val?.type === 'date' ? moment(value).format('LLL') : value}}
                  /> */}
                  <Typography variant="body1">{value}</Typography>
                </Grid>
              </Grid>
            );
          })}
        </Box>
        <Button variant="contained" color="primary" sx={{marginTop: 2}} fullWidth onClick={onClose}>
          Tutup
        </Button>
      </Box>
    </Dialog>
  );
}
