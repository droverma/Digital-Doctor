import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { SidebarData } from './SideBarData'
import Toolbar from '@mui/material/Toolbar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import { useNavigate } from "react-router-dom";
import './SideBar.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

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
                <img src="../Digital_doctor_logo.png" className='image' />
            </div>
            <Toolbar />
            <Divider />
            <List>
                {
                    SidebarData.map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon className='icon'>
                                {text.icon}
                            </ListItemIcon>
                            <ListItemText primary={text.title} onClick={() => { return navigate(text.path) }}
                                className="text" />
                        </ListItem>
                    ))
                }
            </List>
            <Divider />
        </div>
    )
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box component="nav"
            aria-label="mailbox folders"
        >
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
        </Box>
    )
}

export default ResponsiveDrawer;