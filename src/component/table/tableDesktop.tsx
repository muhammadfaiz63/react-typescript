import {ArrowDropDown, ArrowDropUp, ArrowLeft, ArrowRight, Delete, Edit, Visibility} from '@mui/icons-material';
import {IconButton, MenuItem, TextField, Typography} from '@mui/material';
import {Box} from '@mui/system';
import moment from 'moment';
import {ContentType} from '../../utils/enum';
import {Content, ImageTableDesktop, PaperTableBody, PaperTableHead} from '../styled-component/table';
import {PropsDesktop} from './dto/type';
import Notfound from '../../assets/notfound.svg';
import {formatCash} from '../../utils/helper';
export default function TableDesktop({
  data,
  header,
  page,
  totalPage,
  handleNext,
  handlePrev,
  handleLimit,
  handlePage,
  handleSort,
  handleDetail,
  handleDelete,
  handleEdit,
  handleEditMultiple,
  multipleId,
  limit,
  count,
}: PropsDesktop) {
  console.log('data', data);
  return (
    <Box sx={{width: '100%'}}>
      <PaperTableHead elevation={1} square>
        {header.map((item, i) => {
          return (
            <Content theme={{size: item.size, align: item.align}} key={i}>
              <Box
                display="flex"
                alignItems="center"
                sx={{cursor: 'pointer'}}
                onClick={() => handleSort?.(item?.value)}
              >
                <Typography textTransform="uppercase" variant="body1">
                  {item.label}
                </Typography>
                {item.sort ? <ArrowDropUp /> : <ArrowDropDown />}
              </Box>
            </Content>
          );
        })}
        <Content theme={{align: 'center'}}>
          <Typography textTransform="uppercase" variant="body1">
            Aksi
          </Typography>
        </Content>
      </PaperTableHead>
      {data.length > 0 && page !== undefined && limit !== undefined ? (
        data.slice((page - 1) * limit, (page - 1) * limit + limit)?.map((item, index) => {
          return (
            <PaperTableBody elevation={0} square key={index}>
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
                    formattedValue = value ? moment(value).format('LLL') : '-';
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
                    formattedValue = <img src={value} alt="icon menu" style={{width: '20%'}} />;
                    break;
                  default:
                    formattedValue = value;
                    break;
                }
                return (
                  <Content theme={{size: val.size, align: val.align}} key={index}>
                    <Typography variant="body1">{formattedValue}</Typography>
                  </Content>
                );
              })}
              <Content theme={{align: 'center'}}>
                <IconButton onClick={() => handleDetail?.(item)}>
                  <Visibility />
                </IconButton>
                <IconButton
                  onClick={() => (multipleId ? handleEditMultiple?.(item) : handleEdit?.(item.id || item._id))}
                >
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete?.(item)}>
                  <Delete />
                </IconButton>
              </Content>
            </PaperTableBody>
          );
        })
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" my={4}>
          <ImageTableDesktop src={Notfound} />
          <Typography variant="h4" fontWeight="bold" mt={2}>
            Data Tidak Ditemukan!
          </Typography>
          <Typography variant="body1" mt={2}>
            Data yang anda cari tidak ditemukan, silahkan coba lagi.
          </Typography>
          <Typography variant="body1" mt={1}>
            Jika data yang anda cari tidak ada, silahkan tambahkan data baru
          </Typography>
        </Box>
      )}
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <Typography variant="body1">Total {count}</Typography>
        <TextField
          variant="outlined"
          size="small"
          sx={{width: '68px', marginLeft: '1rem', marginRight: '1rem'}}
          select
          value={limit ? limit : 10}
          onChange={handleLimit}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </TextField>
        <Typography variant="body1">Halaman</Typography>
        <TextField
          variant="outlined"
          size="small"
          sx={{width: '68px', marginLeft: '1rem', marginRight: '1rem'}}
          type="number"
          InputProps={{inputProps: {min: 0}}}
          value={page ? page : 1}
          onChange={handlePage}
        />
        <Typography variant="body1" mr={2}>
          dari {totalPage}
        </Typography>
        <IconButton
          onClick={handlePrev}
          disabled={page === 1}
          sx={{
            backgroundColor: '#00479B',
            width: '30px',
            height: '30px',
            borderRadius: '5px',
            marginRight: '0.5rem',
            '&:hover': {backgroundColor: '#00479B'},
            '&:disabled': {backgroundColor: '#ADB4BC'},
          }}
        >
          <ArrowLeft sx={{color: 'white'}} />
        </IconButton>
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
