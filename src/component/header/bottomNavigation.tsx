import React, {useState} from 'react';
import {Person, Widgets, ExpandLess, ExpandMore, DashboardCustomize} from '@mui/icons-material';
import {
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material';
import {Box} from '@mui/system';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';

const drawerBleeding = 56;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}
const Icon = styled('img')({
  width: '1.5rem',
});
export default function SimpleBottomNavigation({window}: Props) {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [list, setList] = useState<Array<any>>([]);
  const profile = useSelector((state: any) => state.authReducer.profile);
  const handleList = (index: string) => {
    if (list.includes(index)) {
      setList(list.filter((item: string) => item !== index));
    } else {
      setList([...list, index]);
    }
  };
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <>
      <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            showLabel
            label="Dashboard"
            icon={<DashboardCustomize />}
            onClick={() => navigate('/app/dashboard')}
          />
          <BottomNavigationAction
            label="Menu"
            showLabel={false}
            onClick={toggleDrawer(true)}
            sx={{
              position: 'relative',
              boxSizing: 'border-box',
              '&::before': {
                content: '""',
                position: 'absolute',
                background: '#f4f6f8',
                top: 0,
                borderRadius: '100%',
                transform: 'translatey(-50%)',
              },
              '&::focus': {},
            }}
            icon={
              <Box
                sx={{
                  backgroundColor: '#00479B',
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  position: 'absolute',
                  bottom: 30,
                }}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Widgets sx={{color: '#fff', fontSize: 40}} />
              </Box>
            }
          />
          <BottomNavigationAction
            showLabel
            label="Profile"
            icon={<Person />}
            onClick={() => navigate('/app/profile')}
          />
        </BottomNavigation>
      </Paper>

      <SwipeableDrawer
        PaperProps={{square: true, sx: {borderRadius: '20px 20px 0 0', height: '80%'}}}
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={true}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box display="flex" justifyContent="center" mt={1}>
          <Box sx={{width: 73, height: 5, backgroundColor: 'gray', borderRadius: 5}} />
        </Box>

        <List>
          {profile?.role?.menu?.map((text: any, index: number) => (
            <>
              <ListItem key={index} disablePadding sx={{display: 'block'}}>
                <ListItemButton
                  selected={open && list.includes(text._id)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={() => handleList(text?._id)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon src={text?.icon} alt={text?.name} />
                  </ListItemIcon>
                  <ListItemText primary={text?.name} sx={{opacity: open ? 1 : 0}} />
                  {open && list.includes(text._id) ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              {text?.sub_menu?.map((sub: any, index: number) => {
                return (
                  <Collapse in={open && list.includes(text._id)} timeout="auto" unmountOnExit key={index}>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{pl: 4}} onClick={() => navigate(`/app${text.path}${sub.path}`)}>
                        <ListItemText primary={sub?.name} />
                      </ListItemButton>
                    </List>
                  </Collapse>
                );
              })}
            </>
          ))}
        </List>
      </SwipeableDrawer>
    </>
  );
}
