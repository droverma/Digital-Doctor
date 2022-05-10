import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { PatientSidebarData } from "./PatientSideBarData";
import { DoctorSidebarData } from "./DoctorSideBarData";
import { useNavigate } from "react-router-dom";
import './SideBar.css'
import Header from '../header/Header';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div>
        <img src="../Digital_doctor_logo.png" className='image' onClick={() => navigate('/')} />
      </div>
      <Toolbar />
      <Divider />
      <List>
        <>
          {localStorage.getItem('role') === 'patient' ?

            PatientSidebarData.map((text, index) => (
              <ListItem button key={index}>
                <ListItemIcon className='icon'>
                  {text.icon}
                </ListItemIcon>
                <ListItemText primary={text.title} onClick={() => { return navigate(text.path) }}
                  className="text" />
              </ListItem>
            ))
            :

            DoctorSidebarData.map((text, index) => (
              <ListItem button key={index}>
                <ListItemIcon className='icon'>
                  {text.icon}
                </ListItemIcon>
                <ListItemText primary={text.title} onClick={() => { return navigate(text.path) }}
                  className="text" />
              </ListItem>
            ))
          }
        </>
      </List>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      {localStorage.getItem('jwt-token') ?

        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
            }}
          >

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </AppBar>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
          >
          </Box>
        </Box> : null}
    </>
  );
}
export default ResponsiveDrawer;
