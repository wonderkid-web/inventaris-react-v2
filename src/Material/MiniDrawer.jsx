import { useState, useContext } from 'react'
import { Typography, Button, TextField } from '@mui/material'
import { BroweserRouter as router, Navigate, Link } from 'react-router-dom'
import { Routes, Route } from 'react-router'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
// ICONS
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
// Routes
import {Dashboard} from '../Components/Dashboard'
import {Product} from '../Components/Product'
import {Kategori} from '../Components/Kategori'
import {Atk} from '../Components/Atk'
import {Elektronik} from '../Components/Elektronik'
import { Akun } from '../Components/Akun'
import { TambahAkun } from '../Components/TambahAkun'
// Context

import {LoginContext, RolesContext} from '../Hooks/useHooks'

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export const MiniDrawer = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const {logged, setLogged} = useContext(LoginContext)
  const {role, setRole} = useContext(RolesContext)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
   ( logged ? 
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
             Dashboard Inventaris PTPN IV
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          {role === 'admin' ? 
            <List>
             <Link to={`/Dashboard`} style={{textDecoration: 'none', color: 'grey'}}>
              <ListItem key={"Dashboard"} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                   <DashboardOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Dashboard"} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Link>
            </List>
            :
            <span></span>
          } 
          <Divider />
          <List>
            <Link to="List-Produk" key="Product List" style={{ textDecoration: 'none', color: 'grey' }}>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <Inventory2OutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Product List" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Link>
            {role==='admin' ? 
            <Link to="Kategori" key="Kategori" style={{textDecoration: 'none', color: 'grey'}}>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <CategoryOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Kategori" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Link>
            :
            <span></span>
            }
          </List>
          <Divider />
          {role === 'admin' ?
            <List>
              <Link to="akun" key="Pengelola Akun" style={{ textDecoration: 'none', color: 'grey' }}>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <FolderSharedOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Pengelola Akun" sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
            :
            <span></span>
          }
          {role === 'admin' ?
            <List>
              <Link to="tambah-akun" key="Tambah akun" style={{ textDecoration: 'none', color: 'grey' }}>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <GroupAddOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Tambah akun" sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
            :
            <span></span>
          }
        </Drawer>
         <Box sx={{
              marginTop: 5,
              width: '100vw',
              height: '93.5vh',
          background: '#eee',
              padding: 1,
              overflow: 'auto'
            }}>
              <Routes>
                  <Route path="Dashboard" element={<Dashboard />} />
            <Route path="/List-Produk" element={<Product />} />
                  <Route path="/Kategori" element={<Kategori />}>
                    <Route path="Atk" element={<Atk />}/>
                    <Route path="Elektronik" element={<Elektronik />}/>
                  </Route>
            <Route path="/Akun" element={<Akun />} />
            <Route path="/Tambah-akun" element={<TambahAkun />} />

               </Routes>       
              {/*{logged ? <h1>Kamu sudah login!</h1> : <h1>Kamu belum login!</h1>}*/}
            </Box>
        </Box>
      :
      <Navigate to="/login" />
   )
  );
}
