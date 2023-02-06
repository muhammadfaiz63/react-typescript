import {Search} from '@mui/icons-material';
import {Grid, InputAdornment, Button, TextField, useMediaQuery} from '@mui/material';
import Page from '../../component/page';
import TableDesktop from '../../component/table/tableDesktop';
import TableMobile from '../../component/table/tableMobile';
import {ContentType} from '../../utils/enum';
import {useEffect, useState} from 'react';
import {selectProjectList} from '../../store/selectors/projectSelector';
import {fetchProjectAsync} from '../../store/actions/projectAction';
import {useAppSelector, useAppDispatch} from '../../hook';
import FilterListIcon from '@mui/icons-material/FilterList';
import _ from 'lodash';

export default function Dashboard() {
  const matches = useMediaQuery('(min-width:769px)');
  const dataProject = useAppSelector(selectProjectList);
  const dispatch: any = useAppDispatch();
  const [limit, setLimit] = useState(10);
  const [filterProject, setFilterProject] = useState([]);
  const [page, setPage] = useState(1);
  const [ordered, setOrdered] = useState('asc');
  const headerTable = [
    {
      label: 'no',
      value: 'no',
      type: ContentType.text,
    },
    {
      label: 'name',
      value: 'name',
      type: ContentType.text,
    },
    {
      label: 'type',
      type: ContentType.text,
      value: 'type',
    },
    {
      label: 'status',
      type: ContentType.text,
      value: 'status',
    },
    {
      label: 'created',
      type: ContentType.date,
      value: 'createdOn',
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      const filterdata = await dispatch(fetchProjectAsync(``));
      setFilterProject(filterdata);
    };
    fetchData();
  }, []);

  const handleNext = () => {
    if (page < Math.round(filterProject.length / limit)) {
      setPage(page + 1);
    }
  };
  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleLimit = (e: any) => {
    setLimit(Number(e.target.value));
  };

  const handleSearch = (value: string) => {
    const searchQuery = value.toString().toLowerCase();
    const listdata = ['name', 'type', 'status', 'created'].map((x, i) => {
      return dataProject.filter((el: any) => {
        if (el[x]) {
          return el[x].toString().toLowerCase().indexOf(searchQuery) !== -1;
        }
      });
    });
    const dataset = _.maxBy(listdata, function (o) {
      return o.length;
    });
    setFilterProject(dataset);
  };
  const handlePage = (e: any) => {
    if (e.target.value > 0 && e.target.value <= Math.round(filterProject.length / limit)) {
      setPage(e.target.value);
    }
  };
  const handleOrder = async () => {
    if (ordered === 'asc') {
      setOrdered('desc');
      const result = await _.orderBy(filterProject, ['createdOn'], ['desc']);
      const customData: any = await result.map((item: any, index: any) => {
        item.no = index + 1;
        return item;
      });
      setFilterProject(customData);
    } else {
      setOrdered('asc');
      const result = await _.orderBy(filterProject, ['createdOn'], ['asc']);
      const customData: any = await result.map((item: any, index: any) => {
        item.no = index + 1;
        return item;
      });
      setFilterProject(customData);
    }
  };

  return (
    <Page title="Dashboard">
      <Grid container spacing={3} mb={5} alignItems="center">
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <TextField
            fullWidth
            placeholder="Pencarian"
            onChange={(e) => handleSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={5} lg={5} xl={5}></Grid>
        <Grid item xs={6} sm={6} md={1} lg={1} xl={1}>
          <Button color="primary" variant="contained" onClick={handleOrder}>
            <FilterListIcon sx={{rotate: ordered === 'asc' ? '180deg' : 'unset'}} />
          </Button>
        </Grid>
      </Grid>
      {matches ? (
        <TableDesktop
          header={headerTable}
          data={filterProject}
          page={page}
          totalPage={Math.round(filterProject.length / limit)}
          limit={limit}
          count={limit}
          handleNext={handleNext}
          handlePage={handlePage}
          handlePrev={handlePrev}
          handleLimit={handleLimit}
        />
      ) : (
        <TableMobile
          header={headerTable}
          data={filterProject}
          page={page}
          totalPage={Math.round(filterProject.length / limit)}
          limit={limit}
          count={limit}
          handleNext={handleNext}
          handlePrev={handlePrev}
          handleLimit={handleLimit}
        />
      )}
    </Page>
  );
}
