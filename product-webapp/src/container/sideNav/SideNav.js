import MenuIcon from '@mui/icons-material/Menu';
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
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { DoctorSidebarData } from "./DoctorSideBarData";
import { PatientSidebarData } from "./PatientSideBarData";
import './SideBar.css';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("Profile");

  const navigate = useNavigate();


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleTab = (path, title) => {
    setActiveTab(title)
    navigate(path)

  };

  const drawer = (
    <div>
      <div>
        <img src="../Digital_doctor_logo.png" alt='not found' className='image' onClick={() => navigate('/')} />
      </div>
      <Toolbar />
      <Divider />
      <List>
        <>
          {localStorage.getItem('role') === 'patient' ?

            PatientSidebarData.map((text, index) => (
              <ListItem button key={index} onClick={(e) => handleTab(text.path, text.title)} className={activeTab ? 'bg-color' : ''}>
                <ListItemIcon className='icon'>
                  {text.icon}
                </ListItemIcon>
                <ListItemText primary={text.title}
                  className="text" />
              </ListItem>

            ))
            :

            DoctorSidebarData.map((text, index) => (
              <ListItem button key={index} onClick={(e) => handleTab(text.path, text.title)} className={activeTab ? 'bg-color' : ''}>
                <ListItemIcon className='icon'>
                  {text.icon}
                </ListItemIcon>
                <ListItemText primary={text.title}
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
              PaperProps={{
                sx: {
                  backgroundColor: "rgb(42, 210, 217)",
                  color: "red",
                }
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
              PaperProps={{
                sx: {
                  backgroundColor: "rgb(42, 210, 217)",
                  color: "red",
                }
              }}
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
