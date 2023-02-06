import {useEffect, useState, ReactNode} from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import {PropsTransferList} from './dto/type';
import {ChevronLeft, ChevronRight, KeyboardArrowDown, KeyboardArrowUp} from '@mui/icons-material';
import {useMediaQuery} from '@mui/material';

export default function TransferList({value, onChange, valueEdit = []}: PropsTransferList) {
  const matches = useMediaQuery('(min-width:769px)');

  const [checked, setChecked] = useState<readonly number[]>([]);
  const [left, setLeft] = useState<readonly number[]>([]);
  const [right, setRight] = useState<readonly number[]>([]);

  let ignore = false;
  useEffect(() => {
    if (!ignore) {
      setLeft(value);
      if (valueEdit?.length > 0) {
        const valueDetailRoleRight = value.filter((obj: any) => valueEdit.includes(obj._id));
        setRight(valueDetailRoleRight);
        const valueDetailRoleLeft = value.filter((obj: any) => !valueEdit.includes(obj._id));
        setLeft(valueDetailRoleLeft);
      }
    }
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ignore = true;
    };
  }, []);
  useEffect(() => {
    onChange?.(right);
  }, [right, onChange]);
  function not(a: readonly number[], b: readonly number[]) {
    return a.filter((value) => b.indexOf(value) === -1);
  }

  function intersection(a: readonly number[], b: readonly number[]) {
    return a.filter((value) => b.indexOf(value) !== -1);
  }

  function union(a: readonly number[], b: readonly number[]) {
    return [...a, ...not(b, a)];
  }

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items: readonly number[]) => intersection(checked, items).length;

  const handleToggleAll = (items: readonly number[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = async () => {
    await Promise.all([
      setRight(right.concat(leftChecked)),
      setLeft(not(left, leftChecked)),
      setChecked(not(checked, leftChecked)),
    ]);
  };

  const handleCheckedLeft = async () => {
    await Promise.all([
      setLeft(left.concat(rightChecked)),
      setRight(not(right, rightChecked)),
      setChecked(not(checked, rightChecked)),
    ]);
  };
  // const handleChange =

  const customList = (title: ReactNode, items: readonly number[]) => (
    <Card>
      <CardHeader
        sx={{px: 2, py: 1}}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          height: 230,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value: any) => {
          const labelId = `transfer-list-all-item-${value?.name}-label`;
          return (
            <ListItem key={value?._id} role="listitem" onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.name}`} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Grid container spacing={2} mt={1}>
      <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
        {customList('Choices', left)}
      </Grid>
      <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
        <Button
          variant="outlined"
          onClick={handleCheckedRight}
          disabled={leftChecked.length === 0}
          aria-label="move selected right"
          fullWidth
        >
          {matches ? <ChevronRight /> : <KeyboardArrowDown />}
        </Button>
        <Button
          sx={{marginTop: 1}}
          variant="outlined"
          onClick={handleCheckedLeft}
          disabled={rightChecked.length === 0}
          aria-label="move selected left"
          fullWidth
        >
          {matches ? <ChevronLeft /> : <KeyboardArrowUp />}
        </Button>
      </Grid>
      <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
        {customList('Chosen', right)}
      </Grid>
    </Grid>
  );
}
