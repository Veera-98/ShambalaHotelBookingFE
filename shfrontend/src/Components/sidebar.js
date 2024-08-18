/*
<li>
                    <Link to="/updateRoomPage">Update Room</Link>
                </li>
                <li>
                    <Link to="/addRoomPage">Add Room</Link>
                </li>
                 <li>
                    <Link to="/addRoomPage">Add Room</Link>
                </li>
                <li>
                    <Link to="/deleteRoomPage">Delete Room</Link>
                </li>         
*/

import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';

//import './Sidebar.css';

const Sidebar = () => {

    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/staffDashboard">
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/viewRoomsPage">
                        <ListItemText primary="View Rooms" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/Staffbooking">
                        <ListItemText primary="Search Rooms" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/Viewbookings">
                        <ListItemText primary="Bookings" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/Billsandinvoice">
                        <ListItemText primary="Bills and Invoice" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/addStaff">
                        <ListItemText primary="Add Staff" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/Report">
                        <ListItemText primary="Report" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/login">
                        <ListItemText primary="Log out" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div className="Sidebar">
            <MenuIcon onClick={toggleDrawer("left", true)} />
            <Drawer
                anchor="left"
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
            >
                {list("left")}
            </Drawer>
        </div>
    )
}

export default Sidebar;